# Employee-tracker
## Description
- A command-line application to manage employee databases,using node.js,mysql.
## Table of contents
- Installation
- License 
- Github page 
- Demonstrate video
- Code snippet
## Installation
- This application is required node.js, inquirer, console.table and mysql2. To run the application run command line npm start.
## license
![Github licence](http://img.shields.io/badge/license-MIT-blue.svg)
This project is licensed under MIT
## Github page
- deployed page : https://nghia314.github.io/Employee-tracker/
- github repo: https://github.com/Nghia314/Employee-tracker
## Demonstrate video
- https://www.youtube.com/watch?v=M2EO5Upv7Ng
## Code snippet
the following code is show how I create connection to mysql database
```
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Nlee390815a',
    database: 'employee_db'
});
```
