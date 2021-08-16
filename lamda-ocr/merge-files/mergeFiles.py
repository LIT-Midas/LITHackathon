from PyPDF2 import PdfFileReader, PdfFileWriter, PdfFileMerger
import json
import boto3
import os
import requests
import dateparser
from borb.pdf.canvas.layout.page_layout import SingleColumnLayout
from borb.pdf.canvas.layout.text.paragraph import Paragraph
from borb.pdf.canvas.layout.table import Table
from borb.io.read.types import Decimal
from borb.pdf.document import Document
from borb.pdf.page.page import Page
from borb.pdf.pdf import PDF


def lambda_handler(event, context):
    s3 = boto3.client('s3')
    bucket = s3.Bucket('midas-storage')

    eventDetails = (json.loads(json.dumps(event))['body']['key']).split('/')[0]

    docDetails = {}
    orderedFiles = []

    for object_summary in bucket.objects.filter(Prefix="test/"):
        objectKey = object_summary.key
        response = requests.post('https://26b8cf35526e.ngrok.io/documents/key', data={
            'key': objectKey
        })
        docDetails[objectKey] = response.json()['data']
        orderedFiles.append(
            [objectKey, dateparser.parse(docDetails['form_data']['date'])])

    orderedFiles.sort(key=lambda x: int(x[1]))

    tableDetails = {' ': ['Date', 'Company', 'Ref', 'Total']}

    # create document
    pdf = Document()
    # add page
    page = Page()
    pdf.append_page(page)
    # set layout
    layout = SingleColumnLayout(page)

    for aFile in orderedFiles:
        tableDetails[aFile[0]] = [docDetails[aFile[0]]['date'], docDetails[aFile[0]]
                                  ['company'], docDetails[aFile[0]]['ref'], docDetails[aFile[0]]['total']]

    table = Table(number_of_rows=len(orderedFiles), number_of_columns=5)
    table.add(Paragraph(" "))
    for h in tableDetails[" "]:
        table.add(Paragraph(text=h, font="Helvetica-Bold", font_size=Decimal(12)))

    for name, row in [(k, v) for k, v in tableDetails.items() if k != " "]:
        table.add(Paragraph(name))
        for v in row:
            table.add(Paragraph(str(v)))
    layout.add(table)

    with open("/tmp/index.pdf", "wb") as in_file_handle:
        PDF.dumps(in_file_handle, pdf)

    merger = PdfFileMerger()

    for aFile in orderedFiles:
        merger.append(PdfFileReader(open(aFile, 'rb')))

    merger.write("document-output.pdf")

    return {
        'statusCode': 200}

def test():

    eventDetails = 'test/0.pdf'.split('/')[0]

    docDetails = {}
    orderedFiles = []

    for object_summary in bucket.objects.filter(Prefix=eventDetails):
        objectKey = object_summary.key
        response = requests.post('https://8169f98443ef.ngrok.io/documents/key', data={
            'key': objectKey
        })
        docDetails[objectKey] = response.json()['data']
        orderedFiles.append(
            [objectKey, dateparser.parse(docDetails['form_data']['date'])])

    orderedFiles.sort(key=lambda x: int(x[1]))

    tableDetails = {' ': ['Date', 'Company', 'Ref', 'Total']}

    # create document
    pdf = Document()
    # add page
    page = Page()
    pdf.append_page(page)
    # set layout
    layout = SingleColumnLayout(page)

    for aFile in orderedFiles:
        tableDetails[aFile[0]] = [docDetails[aFile[0]]['date'], docDetails[aFile[0]]
                                  ['company'], docDetails[aFile[0]]['ref'], docDetails[aFile[0]]['total']]

    table = Table(number_of_rows=len(orderedFiles), number_of_columns=5)
    table.add(Paragraph(" "))
    for h in tableDetails[" "]:
        table.add(Paragraph(text=h, font="Helvetica-Bold", font_size=Decimal(12)))

    for name, row in [(k, v) for k, v in tableDetails.items() if k != " "]:
        table.add(Paragraph(name))
        for v in row:
            table.add(Paragraph(str(v)))
    layout.add(table)

    with open("/tmp/index.pdf", "wb") as in_file_handle:
        PDF.dumps(in_file_handle, pdf)

    merger = PdfFileMerger()

    for aFile in orderedFiles:
        merger.append(PdfFileReader(open(aFile, 'rb')))

    merger.write("document-output.pdf")

    return {
        'statusCode': 200}
