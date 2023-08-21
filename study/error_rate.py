import pandas as pd
import re
import matplotlib.pyplot as plt

# Load the CSV file into a DataFrame
df = pd.read_csv('/content/vlat_pilot.csv')

# Provided base column names
base_columns = [
    'ACQ1', 'ACQ2', 'ACQ3', 'ACQ4', 'BCQ1', 'BCQ2','BCQ3', 'BCQ4', 'BuCQ1','BuCQ2', 'BuCQ3', 'BuCQ4', 'BuCQ5', 'BuCQ6', 'BuCQ7',
    'CCQ1', 'CCQ2', 'CCQ3', 'HCQ1', 'HCQ2', 'HCQ3', 'LCQ1', 'LCQ2', 'LCQ3', 'LCQ4','LCQ5', 'PCQ1', 'PCQ2', 'PCQ3',
    'SAQ1', 'SAQ2', 'SAQ3', 'SAQ4', 'SAQ5','SAQ6', 'SAQ7', 'SB100Q1', 'SB100Q2', 'SB100Q3', 'SB100Q4',
    'SBQ1', 'SBQ2', 'SBQ3', 'SBQ4', 'SBQ5', 'SPQ1', 'SPQ2','SPQ3', 'SPQ4', 'SPQ5', 'SPQ6', 'TMQ1','TMQ2','TMQ3'
]

# Create a regex pattern to match base column names followed by optional underscore and numbers
pattern_name = re.compile(r'^(?:' + '|'.join(base_columns) + r')(_\d+)?$')
# Filter columns based on the pattern
filtered_columns = df.columns[df.columns.str.match(pattern_name)]
# Store the column names as a list
column_names_list = filtered_columns.tolist()


pattern_annotate = re.compile(r'^(?:' + '|'.join(base_columns) + r' - Annotate_Id$)')
filtered_df = df.loc[:, df.columns[df.columns.str.match(pattern_annotate)]]


# Remove the first two rows from the dataframe
df_filtered = filtered_df.iloc[2:]

# Find columns in the dataset that contain the keyword "Annotate"
annotate_related_columns1 = [col for col in df_filtered.columns if "Annotate_Id" in col]
annotate_related_columns2 = [col for col in df_filtered.columns if "annotate_Id" in col]
# Merge two cases
annotate_related_columns = annotate_related_columns1 + annotate_related_columns2


# Integrated code to compute correctness rates for each question

# Dictionary to store the correctness rates
integrated_correctness_rates = {}
Upletter = ['BuCQ1',
 'BuCQ2',
 'BCQ1',
 'BCQ2',
 'BCQ3',
 'BCQ4',
 'ACQ1',
 'ACQ2',
 'ACQ3',
 'ACQ4']

# Loop through each question column
for question_col in column_names_list:

    # Remove "_?" from question_col for Annotate_Id column
    base_question_col = question_col.split('_')[0]

    # Construct the Annotate_Id column name
    if base_question_col in Upletter:
      annotate_id_col = f"{ base_question_col} - Annotate_Id"
    else:
      annotate_id_col = f"{ base_question_col} - annotate_Id"
    
    # If the question column and annotate_id_col both exist in the dataset
    if question_col in df_filtered.columns and annotate_id_col in df_filtered.columns:

        # Criteria for correct answers
        correct_criteria = (df_filtered[question_col].notna()) & (df_filtered[annotate_id_col].isna())
        
        # Count the number of correct answers based on the given criteria
        correct_count = correct_criteria.sum()

        # Total answers for the question
        total_answers = df_filtered[question_col].notna().sum()
    
        # Correctness rate
        correctness_rate = correct_count / total_answers if total_answers != 0 else 0
        integrated_correctness_rates[question_col] = correctness_rate
        # print(correct_count , total_answers)





## Plot Bar chart
# Assuming integrated_correctness_rates has been computed
correctness_rates_series = pd.Series(integrated_correctness_rates)

# Sort values for better visualization
correctness_rates_series = correctness_rates_series.sort_values()

# Plot
plt.figure(figsize=(15,8))
correctness_rates_series.plot(kind='bar', color='skyblue')

plt.title('Correctness Rates for Each Question')
plt.xlabel('Questions')
plt.ylabel('Correctness Rate')
plt.xticks(rotation=45)
plt.grid(axis='y')

plt.tight_layout()
plt.show()





## TIME PLOT
time_page_submit_cols = [col for col in df_filtered.columns if any(base_col in col for base_col in base_columns) and "time_Page Submit" in col and "explain" not in col]

# Convert "time_Page Submit" columns to numbers
for time_col in time_page_submit_cols:
    df_filtered[time_col] = pd.to_numeric(df_filtered[time_col], errors='coerce')

plt.figure(figsize=(15, 10))

# Get the base column names in the order of sorted correctness rates
sorted_base_columns = correctness_rates_series.index.str.split('_').str[0].tolist()

# Loop through each sorted base_column and its corresponding "time_Page Submit" column
for base_col in sorted_base_columns:
    time_col = base_col + " - time_Page Submit"  # Constructing the time column name
    if time_col in df_filtered.columns:
        non_nan_data = df_filtered[time_col].dropna()
        plt.scatter([base_col] * len(non_nan_data), non_nan_data, label=base_col)

# Calculate global minimum and maximum across the relevant columns
y_min = min(df_filtered[time_col].min() for time_col in time_page_submit_cols)
y_max = max(df_filtered[time_col].max() for time_col in time_page_submit_cols)

plt.xlabel('Question Names')
plt.ylabel('Time(s)')
plt.title('Variation in time_Page Submit Columns excluding "explain time_Page Submit"')
plt.xticks(rotation=45)
plt.grid(True, which='both', linestyle='--', linewidth=0.5)
plt.ylim(y_min, y_max)  # Setting y-axis limits dynamically
plt.tight_layout()
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.show()


