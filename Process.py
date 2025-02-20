import json
import re
from bs4 import BeautifulSoup
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Load JSON data
with open('webcr/out.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Extract text content from each object
text_data = [obj['text_content'] for obj in data]

# Function to clean text
def clean_text(text):
    # Remove \r and \n characters
    cleaned_text = re.sub(r'[\r\n]', '\n', text)
    # Remove HTML tags
    cleaned_text = BeautifulSoup(cleaned_text, 'html.parser').get_text()
    # Remove non-alphanumeric characters
    cleaned_text = re.sub(r'[^a-zA-Z\s]', '', cleaned_text)
    # Convert to lowercase
    cleaned_text = cleaned_text.lower()
    # Tokenize
    tokens = word_tokenize(cleaned_text)
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    # Stemming
    stemmer = PorterStemmer()
    stemmed_tokens = [stemmer.stem(token) for token in tokens]
    # Join tokens back into text
    cleaned_text = ' '.join(stemmed_tokens)
    return cleaned_text

# Clean text data
cleaned_text_data = [clean_text(text) for text in text_data]

# Write cleaned data to a new JSON file
with open('webcr/cleaned_out.json', 'w', encoding='utf-8') as file:
    json.dump(cleaned_text_data, file)

print("Data preprocessing completed.")
