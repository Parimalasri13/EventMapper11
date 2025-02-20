import re



# Read the text file
with open('webcr/text_data.json', 'r', encoding='utf-8') as file:
    text_content = file.read()

# Apply the regular expression to remove unnecessary symbols
 # Step 1: Remove \r and \n characters
cleaned_text = re.sub(r'[\r\n]', '', text_content)

# Step 2: Remove JavaScript comments and scripts
cleaned_text = re.sub(r'\/\/.*?\n|\/\*.*?\*\/', '', cleaned_text)
cleaned_text = re.sub(r'<script.*?</script>', '', cleaned_text, flags=re.DOTALL)

# Step 3: Remove HTML tags
cleaned_text = re.sub(r'<.*?>', '', cleaned_text)

# Step 4: Remove extra whitespace
cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
    

# Write the modified text content back to the file
with open('webcr/out.json', 'w', encoding='utf-8') as file:
    file.write(cleaned_text)

# Optionally, you can print a message to indicate the operation is completed
print("File content replaced successfully!")
