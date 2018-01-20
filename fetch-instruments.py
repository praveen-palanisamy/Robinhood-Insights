#!/usr/bin/env/python3
import requests
import json
import sqlite3

db = sqlite3.connect('instruments.sqlite')#, isolation_level = None)

url= "https://api.robinhood.com/instruments/"
response = requests.get(url)
response = response.json()

data = response['results']
columns=list(data[0].keys())
# Create a table in the sqlite3 db
create_instruments_table = """ create table if not exists instruments (
                               url text PRIMARY KEY,
                               min_tick_size text,
                               type text NOT NULL,
                               splits text, 
                               margin_initial_ratio REAL,
                               quote text,
                               tradability text,
                               bloomberg_unique text,
                               list_date text,
                               name text,
                               symbol text,
                               fundamentals text,
                               state text,
                               country text,
                               day_trade_ratio REAL,
                               tradeable text,
                               maintenance_ratio REAL,
                               id text,
                               market text,
                               simple_name text
                               );
                            """
c = db.cursor()
c.execute(create_instruments_table)


query = "insert into instruments ({0}) values (?{1})"
query = query.format(",".join(columns), ",?" * (len(columns)-1))

for item in data:
    values = tuple(item[key] for key in columns)
    c = db.cursor()
    c.execute(query,values)
    c.close()
page = 0
while response['next'] is not 'None':
    page+=1
    response = requests.get(response['next']).json()
    data = response['results']
    for item in data:
        values = tuple(item[key] for key in columns)
        c = db.cursor()
        c.execute(query, values)
        db.commit()
        c.close()
    print("Stored page{} into the db".format(page), end='\r')

