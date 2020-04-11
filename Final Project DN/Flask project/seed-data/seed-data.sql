-- Create the seed data from week 09.01 Activity 9
-- NOTE: IMPORTANT: YOU MUST HAVE A PRIMARY KEY OR SQLALCHEMY WILL NOT WORK

DROP TABLE IF EXISTS matches;
CREATE TABLE matches (
    id  SERIAL PRIMARY KEY,
    loser_age REAL,
    loser_id INT,
    loser_name VARCHAR(64),
    loser_rank INT,
    winner_age REAL,
    winner_id INT,
    winner_name VARCHAR(64),
    winner_rank INT
);

DROP TABLE IF EXISTS players;
CREATE TABLE players (
    id  SERIAL PRIMARY KEY,
	player_id INT,
	first_name VARCHAR,
	last_name VARCHAR,
	hand VARCHAR,
	country_code VARCHAR
);

-- 'import' the .csv files
-- BE SURE TO UPDATE THE PATH TO YOUR FULLY QUALIFIED PATH
-- BE SURE TO UPDATE THE COLUMN NAMES TO MATCH YOUR TABLE
COPY matches(loser_age,loser_id,loser_name,loser_rank,winner_age,winner_id,winner_name,winner_rank) 
FROM '/Users/greg/git/DVProject2/starter/seed-data/matches.csv' DELIMITER ',' CSV HEADER;

COPY players(player_id,first_name,last_name,hand,country_code) 
FROM '/Users/greg/git/DVProject2/starter/seed-data/players.csv' DELIMITER ',' CSV HEADER;

