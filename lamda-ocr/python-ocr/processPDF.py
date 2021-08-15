from PyPDF2 import PdfFileReader, PdfFileWriter
from io import BytesIO
import os
import json
import urllib.parse
import boto3
import requests

print('Loading function')

s3 = boto3.client('s3')


def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(
        event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        contentType = response['ContentType']
        if (contentType == 'application/pdf'):
            print(response)
            processPDF(bucket, key)
        print("CONTENT TYPE: " + response['ContentType'])
        return response['ContentType']
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e


def processPDF(bucket, key):
    s3 = boto3.resource('s3')
    obj = s3.Object(bucket, key)
    fs = obj.get()['Body'].read()
    input_file = PdfFileReader(BytesIO(fs))
    docArray = []
    for i in range(input_file.numPages):
        output = PdfFileWriter()
        output.addPage(input_file.getPage(i))
        with open('/tmp/{0}_{1}.pdf'.format(key, i), 'wb') as outputStream:
            output.write(outputStream)
        outputDocName = '{0}/{1}.pdf'.format(key.rstrip('.pdf'), i)
        s3.Bucket(bucket).upload_file(
            '/tmp/{0}_{1}.pdf'.format(key, i), outputDocName)
        docArray.append(outputDocName)

    client = boto3.client('textract')
    requestData = []
    for aFile in docArray:
        print(aFile)
        # process using S3 object
        jobId = client.start_document_analysis(DocumentLocation={
            'S3Object': {
                'Bucket': bucket,
                'Name': aFile,
            }
        },
            FeatureTypes=[
            'FORMS'
        ],
            JobTag='pdf',
            NotificationChannel={
            'SNSTopicArn': 'arn:aws:sns:us-east-2:284884261677:ocr-result',
            'RoleArn': 'arn:aws:iam::284884261677:role/textract-sns'
        })
        print(jobId)
        requestData.append({
            'file_name': aFile,
            'job_id': jobId['JobId']
        })

    print(requestData)
    r = requests.post('https://26b8cf35526e.ngrok.io/documents/bootstrap', data={
        "parent": key,
        "type": 'application/pdf',
        "data": requestData
    })
