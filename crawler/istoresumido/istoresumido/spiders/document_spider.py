import scrapy
import os
import colorlog
import yaml
from scrapy.loader import ItemLoader
from scrapy.http import FormRequest
from urllib.parse import urljoin
from istoresumido.items import IstoresumidoItem
from dotenv import load_dotenv
from scrapy.utils.log import SpiderLoggerAdapter
import logging

#TODO centralize this initial setup into a file / function /....

# Read the (YAML) configuration file 
file_path = '../config.yaml'
with open(file_path, 'r') as file:
    config = yaml.safe_load(file)

# Avoid old environment variables (only changes in the python environment)
if 'DEBUG' in os.environ:
    del os.environ['DEBUG']

# Load the pretended credentials
load_dotenv("../.env")
debug_value = os.getenv("DEBUG")
DEBUG = debug_value == 'True'

# Define custom logging level (STATS)
# (NOT defined in settings.py to make it specific only to this spider)
STATS_LEVEL = 15 # between INFO (10) and DEBUG (20)
logging.addLevelName(STATS_LEVEL, "STATS")

# Now set up logging globally for the Scrapy Spider
#TODO define this in the class only
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Set up a color formatter
color_formatter = colorlog.ColoredFormatter(
    '%(log_color)s%(levelname)-5s%(reset)s %(yellow)s[%(asctime)s]%(reset)s %(white)s%(name)s %(funcName)s %(bold_purple)s:%(lineno)d%(reset)s %(log_color)s%(message)s%(reset)s',
    datefmt='%y-%m-%d %H:%M:%S',
    log_colors={'DEBUG': '', 'INFO': '', 'WARNING': '', 'ERROR': '', 'CRITICAL': 'red,bg_white', 'STATS': 'bold,green'}
)

# Attaching formater to console handler + adding it to the logger
console_handler = logging.StreamHandler()
console_handler.setFormatter(color_formatter)
logger.addHandler(console_handler)

"""
Spider for scraping files (PDFs, ZIPs, JPGs) from the Fenix platform.

Logs into the Fenix portal, extracts course and file URLs, and yields them for download.

Attributes:
    TODO

Methods:
    TODO

"""

#TODO fazer versão autenticada para conseguir conteúdo apenas para alunos
class DocumentSpider(scrapy.Spider):
    name = "document_spider"
    START_URL = "https://conselhopedagogico.tecnico.ulisboa.pt/" #TODO use the yaml config
    XPATH_SIDEBAR = "//div//ul//li//a[starts-with(@href, 'http')]/@href"
    XPATH_FILES = "//a[contains(@href, '.pdf')]"
    allowed_domains = [
        'tecnico.ulisboa.pt',                   # main page of ISTécnico
        'conselhopedagogico.tecnico.ulisboa.pt' # page with regulations and detailed information
    ]

    def start_requests(self):
        yield scrapy.Request(url=self.START_URL, callback=self.extract_sidebar_urls)  # yield allows lazy evaluation

    def extract_sidebar_urls(self, response):
        urls_sidebar = response.xpath(self.XPATH_SIDEBAR).getall()
        urls_sidebar.append(self.START_URL) # considers PDFs that may already be in the home page (and NOT in subpages)
        for url in urls_sidebar:
            yield scrapy.Request(url=url, callback=self.extract_file_urls)
    
    # Downloads all the available files from the provided URL
    def extract_file_urls(self, response):

        # Skip non-text responses
        if not response.headers.get('Content-Type', b'').startswith(b'text/html'):
            self.logger.warning(f"Skipping non-HTML response: {response.url}")
            #TODO download this
            #TODO count the amount of URLs with impeded access (for stats, counting the 302)
            return  

        # Filter the URLs from PDF files
        for url in response.xpath(self.XPATH_FILES):
            file_url = url.xpath("@href").get() #TODO CONTINUE FROM HERE
            if file_url:
                file_url = urljoin(response.url, file_url)
                filename = file_url.split('/')[-1]
                
                # Download the files using the FilesPipeline (Scrapy's default functionality)
                self.logger.info(f"File URL found: {file_url}")
                loader = ItemLoader(item=IstoresumidoItem(), selector=response) #TODO CONTINUE FROM HERE
                loader.add_value('file_name', filename)
                loader.add_value('file_urls', file_url)

                yield loader.load_item()
                self.logger.stats_logs(f"Downloaded: {filename}")

  # Summarize stats when the spider finishes (with a custom logger method attached to this spider)
    def closed(self, reason):
        self.summarize_stats(reason)
    
    #TODO consider moving this down below (near other similar configurations)
    # Ensure verbose method is attached to SpiderLoggerAdapter
    def stats_logs(self, message, *args, **kwargs):
        if self.isEnabledFor(STATS_LEVEL):
            self._log(STATS_LEVEL, message, args, **kwargs)
    SpiderLoggerAdapter.stats_logs = stats_logs

    def summarize_stats(self, reason):
        downloaded_count = self.crawler.stats.get_value('file_status_count/downloaded', 0)
        self.logger.stats_logs(f"Number of files downloaded: {downloaded_count}")
        