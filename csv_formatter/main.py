import pandas as pd
import numpy as np
import re
pd.set_option('display.max_rows', None)

#the cols we need to export from the csv
cols_export = ['ID','Item Type','Publication Year','Author','Relevance','Title','Publication Title','ISSN','DOI','Url','Abstract Note','Pages','Issue','Volume','Journal Abbreviation','Article type','Field of research','Genius species identifier','Strains invastigated','Medium/Matrix used','pH range invastigated','Acid type used']

cols_converters = {
    'pH range invastigated': lambda x: (re.sub(r'[^0-9. ]+', ' ', x)),
}

data = pd.read_csv("../DB/db.csv", header=0, usecols=cols_export ,converters=cols_converters, keep_default_na=False) 

data = data.replace(r'^\s*$', 'Unspecified', regex=True)
data = data.replace(r'[/]$', 'Unspecified', regex=True)
data = data.replace(r'[\n]', ',', regex=True)


data = data[data['Item Type'] != 'Item Type']

# print(data)

data.to_csv(r'../DB/clean_db.csv',index=False)