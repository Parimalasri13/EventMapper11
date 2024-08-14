# # import scrapy
# # import json

# # class MySpider(scrapy.Spider):
# #     name = 'quotes'
# #     start_urls = [
# #                 # 'https://www.iitm.ac.in/happenings/past-events'
# #                 #   'https://home.iitd.ac.in/events-all.php',
# #                 #   'https://www.iitk.ac.in/new/news-archives',
# #                 #   'https://www.iitk.ac.in/new/announcements-archives',
# #                 #   'https://www.iitk.ac.in/new/list-of-research-highlights',
# #                 #   'https://www.nitt.edu/',
# #                   'https://nitw.ac.in/main/'
# #                 #   'https://nitc.ac.in/',
# #                 #   'https://www.iiit.ac.in/'
# #                 ]

# #     def __init__(self):
# #         self.data = []

# #     def parse(self, response):
# #         # Extracting the text content of the page
# #         text_content = response.xpath('string(//body)').get()  # Get the text content of the body
        
# #         # Store the URL and text content in a dictionary
# #         page_data = {'url': response.url, 'text_content': text_content}
        
# #         # Append the dictionary to the data list
# #         self.data.append(page_data)
        
# #         self.log(f"Text content extracted for URL: {response.url}")

# #     def closed(self, reason):
# #         # Write the list of dictionaries to a JSON file
# #         filename = 'text1_data.json'
# #         with open(filename, 'a', encoding='utf-8') as f:
# #             json.dump(self.data, f, ensure_ascii=False, indent=4)
        
# #         self.log(f"Text data has been written to {filename}")


# import scrapy
# import json
# import os

# class MySpider(scrapy.Spider):
#     name = 'quotes'
#     start_urls = [
#         #'https://www.iitm.ac.in/happenings/past-events',
#          #'https://www.iiit.ac.in/'
#         #'https://www.iitk.ac.in/new/news-archives',
#         #'https://www.iitk.ac.in/new/announcements-archives',
#         'https://www.iitk.ac.in/new/list-of-research-highlights',
#         'https://www.nitt.edu/',
#         'https://nitw.ac.in/main/'#(not able to extract data as it is not ableto compile js)
#         'https://nitc.ac.in/',
#         #'https://home.iitd.ac.in/events-all.php'
        
#     ]

#     def __init__(self):
#         self.data = {}

#     def parse(self, response):
#         # Extracting the text content of the page
#         text_content = response.xpath('string(//body)').get()  # Get the text content of the body
        
#         # Store the URL and text content in a dictionary
#         page_data = {'url': response.url, 'text_content': text_content}
        
#         # Use the hostname as the key to store data
#         hostname = response.url.split('/')[2]
#         if hostname not in self.data:
#             self.data[hostname] = []
#         self.data[hostname].append(page_data)
        
#         self.log(f"Text content extracted for URL: {response.url}")

#     def closed(self, reason):
#         # Create a directory for storing JSON files if it does not exist
#         if not os.path.exists('data'):
#             os.makedirs('data')

#         # Write the data to separate JSON files based on the hostname
#         for hostname, pages in self.data.items():
#             filename = 'text4_data.json'
#             with open(filename, 'w', encoding='utf-8') as f:
#                 json.dump(pages, f, ensure_ascii=False, indent=4)
#             self.log(f"Text data has been written to {filename}")


# import scrapy

# class EventsSpider(scrapy.Spider):
#     name = "events"
#     start_urls = [
#         'https://nitc.ac.in/upcoming-events'  # Replace with the URL containing your HTML content
#     ]

#     def parse(self, response):
#         for event in response.xpath('//li/div[@class="xc-calendar-list-item"]'):
#             date = event.xpath('.//div[@class="xc-date"]/p[@class="c-name"]/text()').get()
#             title = event.xpath('.//div[@class="xc-title"]/p[@class="c-name"]/text()').get()
#             link = event.xpath('.//a[@class="xc-w-100"]/@href').get()

#             yield {
#                 'date': date,
#                 'title': title,
#                 'link': link,
#             }



import scrapy
import csv
import os

class EventsSpider(scrapy.Spider):
    name = "events"
    start_urls = [
        'https://nitc.ac.in/upcoming-events'
    ]

    # Define the CSV file name
    filename = 'data_NITC.csv'

    def parse(self, response):
        # Check if the file exists
        file_exists = os.path.isfile(self.filename)

        # Open the file in append mode
        with open(self.filename, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)

            # Write headers if the file is new
            if not file_exists:
                writer.writerow([ EventTitle, Date,Time,Location,link])

            # Parse each event and write to the CSV file
            for event in response.xpath('//li/div[@class="xc-calendar-list-item"]'):
                EventTitle = event.xpath('.//div[@class="xc-title"]/p[@class="c-name"]/text()').get()
                Date = event.xpath('.//div[@class="xc-date"]/p[@class="c-name"]/text()').get()
                Time= "NULL"
                Location="NITC"
                link = event.xpath('.//a[@class="xc-w-100"]/@href').get()


                writer.writerow([ EventTitle, Date,Time,Location,link])

        self.log(f"Data has been written to {self.filename}")

