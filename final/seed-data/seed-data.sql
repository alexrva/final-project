-- Create the seed data from week 09.01 Activity 9
-- NOTE: IMPORTANT: YOU MUST HAVE A PRIMARY KEY OR SQLALCHEMY WILL NOT WORK

DROP TABLE IF EXISTS citydata;
CREATE TABLE  citydata (
    id  SERIAL PRIMARY KEY,
    ranking INT,
    city VARCHAR(64),
    statecode VARCHAR(64),
    avg_sal NUMERIC,
    med_h NUMERIC,
    med_r NUMERIC,
    avg_h_temp NUMERIC,
    avg_l_temp NUMERIC,
    med_age NUMERIC,
    unemp NUMERIC,
    avg_price NUMERIC,
    salary NUMERIC,
    positions NUMERIC,
    Lat NUMERIC,
    Long NUMERIC,
    mtg30 VARCHAR(64),
    mtg_by_sal VARCHAR(64),
    mbs VARCHAR(64),
    rent12 VARCHAR(64),
    rent_by_sal VARCHAR(64),
    rbs VARCHAR(64),
    rent_mtg_avg VARCHAR(64),
    rma_weight VARCHAR(64),
    our_rank VARCHAR(64),
    combined_score VARCHAR(64),
    weighted_score VARCHAR(64),
    rank INT
);

COPY citydata(id,ranking,city,statecode,avg_sal,med_h,med_r,avg_h_temp,avg_l_temp,med_age,unemp,avg_price,salary,positions,Lat,Long,mtg30,mtg_by_sal,mbs,rent12,rent_by_sal,rbs,rent_mtg_avg,rma_weight,our_rank,combined_score,weighted_score,rank) 
FROM '/Users/greg/students/final-project/final/seed-data/CityDataFinal.csv' DELIMITER ',' CSV HEADER;

select * from citydata;

DROP TABLE IF EXISTS stateabbr;
CREATE TABLE  stateabbr (
    id  SERIAL PRIMARY KEY,
    state VARCHAR(64),
    abbr VARCHAR(64)
);

COPY stateabbr(id,state,abbr) 
FROM '/Users/greg/students/final-project/final/seed-data/state-abbr.csv' DELIMITER ',' CSV HEADER;

select * from stateabbr;

DROP TABLE IF EXISTS href;
CREATE TABLE  href (
    id  SERIAL PRIMARY KEY,
    state VARCHAR(64),
    city VARCHAR(64),
    href VARCHAR(1024)
);

COPY href(id,state,city,href) 
FROM '/Users/greg/students/final-project/final/seed-data/href.csv' DELIMITER ',' CSV HEADER;

select * from href;

DROP TABLE IF EXISTS search;
CREATE TABLE search (
    id  SERIAL PRIMARY KEY,
    cityrank INT,
    city VARCHAR(64),
    state VARCHAR(64),
    averagesalary VARCHAR(64),
    medianhousingcost VARCHAR(64),
    medianrent VARCHAR(64),
    unemploymentrate VARCHAR(64)
);

COPY search(id,cityrank,city,state,averagesalary,medianhousingcost,medianrent,unemploymentrate) 
FROM '/Users/greg/students/final-project/final/seed-data/search.csv' DELIMITER ',' CSV HEADER;


select * from search;

select cityrank,search.city,search.state,averagesalary,medianhousingcost,medianrent,unemploymentrate,href,abbr from search, href, stateabbr
where lower(search.state) = lower(href.state)
and lower(search.city) = lower(href.city)
and lower(stateabbr.state) = lower(href.state)
order by cityrank;
