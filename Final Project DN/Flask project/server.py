from flask import Flask, jsonify, render_template, request
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, create_engine, MetaData
from sqlalchemy.ext.automap import automap_base
import json

### create a flask instance
app = Flask(__name__)

### database Parameters
HOSTNAME="127.0.0.1"
PORT="5432"
USER="postgres"
PASSWORD="postgres"
DATABASE="techjobmarket"
SCHEMA = "public"

def DatabaseConnection():
    ### Database connection
    global cities, citydata, engine
    rds_connection_string = f"{USER}:{PASSWORD}@{HOSTNAME}:{PORT}/{DATABASE}"
    print(rds_connection_string)
    engine = create_engine(f'postgresql://{rds_connection_string}')

    ### Map the engine to the Database
    Base = automap_base(bind=engine)
    Base.prepare(engine, reflect=True)
    keys = Base.classes.keys()
    print(Base.classes.keys())

    ### Get the database tables
    Cities = Base.classes.cities
    Data = Base.classes.citydata
    print("Connected")

### an api to get all the Matches from the database
@app.route("/api/cities")
def get_me_all_cities():
    global Cities, engine
    results = []
    session = Session(engine)
    query = session.query(Matches)
    rows = query.statement.execute().fetchall()
    for row in rows:
        city = dict(row)
        results.append(city)
    return jsonify(results)

@app.route("/api/filtered_cities")
def get_me_filtered_cities():
    global Cities, engine
    print(request.args)
    city=request.args['city']
    results = []
    session = Session(engine)
    query = session.query(Cities)
    rows = engine.execute(f"select city as city, statecode as statecode from cities where {city} = {city} order by city")
    for row in rows:
        city = dict(row)
        results.append(city)
    return jsonify(results)

### the 'home' route. 
### NOTE: This allows sending data to the HTML through templating
## But you'll likely not need it since most of what you're doing is AJAX APIs
@app.route("/")
def home():
    message = "Hello, World"
    return render_template('index.html', message=message)

@app.route("/results")
def results():
    city=request.args['city']
    return render_template('citypage.html', city=city)
 

### A required way of saying "Start the server"
if __name__ == "__main__":
    DatabaseConnection()
    app.run(debug=True)
