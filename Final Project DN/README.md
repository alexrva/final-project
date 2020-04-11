# Data Visualization Starter Code: Project 2

This project will act as a starting point for Data Viz Project 2

# `starter/` folder

This is a starting point for any Python/Flask application

The `server.py` is a simple server. You can modify it to suit your needs.

The `index.html` is in the `templates/` folder. It is a basic `Bootstrap` template that you can replace with one of your choosing - or you can use this one as a kicking-off point. There are many free templates on the internet. Google `bootstrap free templates` to get started. 

All static files are under `static/` (`js/`, `css/`, `images/`)

The `static/js/app.js` file is the main application JavaScript. There are example `d3.json` calls for getting JSON data from your `server.py` as well as `Plotly` calls to create a simple line graph and a simple table from the returned JSON data.

There are two "transformation" methods that will transform SQL resultsets in JSON format to something the Line and Table `Plotly` calls can use. These can be modified by you for other transformations if needed.

Feel free to `steal like a Banshee` and manipulate this to your needs.

The `results.html` shows how you might implement passing parameters (ala forms) from your page to the `server.py` and then back to the next page for results

Party on!