from PyPDF2 import PdfFileReader, PdfFileWriter
import os
import json
import urllib.parse
import boto3

print('Loading function')

s3 = boto3.client('s3')

def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
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
  print(bucket)
  print(key)
  input_file = os.path.join(bucket,key)
  for i in range(input_file.numPages):
    output = PdfFileWriter()
    output.addPage(input_file.getPage(i))
    with open('/tmp/{0}_{1}.pdf'.format(key, i), 'wb') as outputStream:
      output.write(outputStream)
    s3.Bucket(bucket).upload_file('/tmp/{0}_{1}.pdf'.format(key, i), 'key/{0}_{1}.pdf'.format(key, i))



# pdf_file_path = 'Unknown.pdf'
# file_base_name = pdf_file_path.replace('.pdf', '')

# pdf = PdfFileReader(pdf_file_path)

# pages = [0, 2, 4] # page 1, 3, 5
# pdfWriter = PdfFileWriter()

# for page_num in pages:
#     pdfWriter.addPage(pdf.getPage(page_num))

# with open('{0}_subset.pdf'.format(file_base_name), 'wb') as f:
#     pdfWriter.write(f)
#     f.close()