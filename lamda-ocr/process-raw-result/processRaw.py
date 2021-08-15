import json
import boto3
import os
import requests

keywordRepo = {
    'hospital': "company",
    'pte': "company",
    'ltd': "company",
    'invoice date': "date",
    'bill date': "date",
    'gst reg no': "ref",
    'ref.no': "ref",
    'total due': "total",
    'total amount payable': "total",
    'total': 'total',
    'amount payable': "total"
}


def getJobResults(jobId):

    pages = []

    textract = boto3.client('textract')
    response = textract.get_document_analysis(JobId=jobId)

    pages.append(response)

    nextToken = None
    if('NextToken' in response):
        nextToken = response['NextToken']

    while(nextToken):

        response = textract.get_document_analysis(
            JobId=jobId, NextToken=nextToken)

        pages.append(response)
        nextToken = None
        if('NextToken' in response):
            nextToken = response['NextToken']

    return pages


def lambda_handler(event, context):
    notificationMessage = json.loads(json.dumps(event))[
        'Records'][0]['Sns']['Message']

    pdfTextExtractionStatus = json.loads(notificationMessage)['Status']
    pdfTextExtractionJobTag = json.loads(notificationMessage)['JobTag']
    pdfTextExtractionJobId = json.loads(notificationMessage)['JobId']
    pdfTextExtractionDocumentLocation = json.loads(notificationMessage)[
        'DocumentLocation']

    pdfTextExtractionS3ObjectName = json.loads(json.dumps(
        pdfTextExtractionDocumentLocation))['S3ObjectName']
    pdfTextExtractionS3Bucket = json.loads(json.dumps(
        pdfTextExtractionDocumentLocation))['S3Bucket']

    print(pdfTextExtractionJobTag + ' : ' + pdfTextExtractionStatus)

    pdfText = ''

    if(pdfTextExtractionStatus == 'SUCCEEDED'):
        response = getJobResults(pdfTextExtractionJobId)

        keyValuePair = {}
        result = {}
        values = {}
        words = {}
        extractedKeyPairs = {}
        for resultPage in response:
            for item in resultPage['Blocks']:
                if item['BlockType'] == 'WORD':
                    words[item['Id']] = item['Text']
                elif item['BlockType'] == 'KEY_VALUE_SET':
                    if 'KEY' in item['EntityTypes']:
                        keyId = item['Id']
                        keyValuePair[keyId] = {}
                        for aRelationship in item['Relationships']:
                            if aRelationship['Type'] == 'VALUE':
                                keyValuePair[keyId]['value'] = aRelationship['Ids']
                            if aRelationship['Type'] == 'CHILD':
                                keyValuePair[keyId]['child'] = aRelationship['Ids']
                    elif 'VALUE' in item['EntityTypes']:
                        keyId = item['Id']
                        values[keyId] = {}
                        if 'Relationships' in item.keys():
                            for aRelationship in item['Relationships']:
                                if aRelationship['Type'] == 'CHILD':
                                    values[keyId]['child'] = aRelationship['Ids']
                        else:
                            values[keyId]['child'] = []
        print(keyValuePair)
        print(words)
        print(values)
    for key in values.keys():
        valueWord = ''
        for childWord in values[key]['child']:
            valueWord += words[childWord] + ' '
        valueWord = valueWord.strip()
        values[key] = valueWord

    for key in keyValuePair.keys():
        keyWord = ''
        for childWord in keyValuePair[key]['child']:
            if (childWord in words.keys()):
                keyWord += words[childWord] + ' '
        keyWord = keyWord.strip()
        result[keyWord] = values[keyValuePair[key]['value'][0]]
        for aTargetKey in keywordRepo.keys():
            if aTargetKey in keyWord.lower():
                extractedKeyPairs[keywordRepo[aTargetKey]] = result[keyWord]
                break
    print(result)
    print(extractedKeyPairs)

    r = requests.post('https://8169f98443ef.ngrok.io/documents/formdata', data={
        'job_id': pdfTextExtractionJobId,
        'form_data': [extractedKeyPairs]
    })

    # s3 = boto3.client('s3')

    # outputTextFileName = os.path.splitext(
    #     pdfTextExtractionS3ObjectName)[0] + '.txt'
    # s3.put_object(Body=pdfText, Bucket=pdfTextExtractionS3Bucket,
    #               Key=outputTextFileName)


# name: s3objectkey
# form_data: key value pairs
# raw: array str
# job_id: string
