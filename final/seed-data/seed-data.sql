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

COPY citydata(ranking,city,statecode,avg_sal,med_h,med_r,avg_h_temp,avg_l_temp,med_age,unemp,avg_price,salary,positions,Lat,Long,mtg30,mtg_by_sal,mbs,rent12,rent_by_sal,rbs,rent_mtg_avg,rma_weight,our_rank,combined_score,weighted_score,rank) 
FROM '/Users/greg/students/final-project/final/seed-data/CityDataFinal.csv' DELIMITER ',' CSV HEADER;

select * from citydata;