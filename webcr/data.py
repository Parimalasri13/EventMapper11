# import pandas as pd

# # Load dataset (replace 'your_dataset.csv' with your actual dataset file)
# df = pd.read_csv('data.csv')
import pandas as pd

# Specify the path to your CSV file
file_path = 'data.csv'
df = pd.read_csv(file_path)
print(df.head())  # Print the first few rows to verify

