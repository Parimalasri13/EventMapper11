
import scrapy
import json
from scrapy.exporters import CsvItemExporter

class MySpider(scrapy.Spider):
    name = 'quotes'
    start_urls = ['https://www.geeksforgeeks.org/java/',
                  'http://quotes.toscrape.com/']

    def __init__(self):
        self.data = []

    def parse(self, response):
        # Extracting the text content of the page
        text_content = response.xpath('string(//body)').get()  # Get the text content of the body
        
        # Store the URL and text content in a dictionary
        page_data = {'url': response.url, 'text_content': text_content}
        
        # Append the dictionary to the data list
        self.data.append(page_data)
        
        self.log(f"Text content extracted for URL: {response.url}")

    def closed(self, reason):
        filename = 'text1_data.csv'
        with open(filename, 'wb') as f:
            exporter = CsvItemExporter(f, encoding='utf-8')
            exporter.start_exporting()
            for item in self.data:
                exporter.export_item(item)
            exporter.finish_exporting()
        
        self.log(f"Text data has been written to {filename}")
