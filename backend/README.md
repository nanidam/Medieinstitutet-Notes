# Backend Installation Guide

## Requirements

- MAMP (or any similar tool that can run a local server with MySQL and PHP)
- Node.js and npm (Node.js package manager)

## Instructions

    1. Download and install MAMP from the official website.
    2. Open MAMP and start the local server.
    3. Open your web browser and go to the PHPMyAdmin page (usually at http://localhost/phpmyadmin).
    4. Create a new database by clicking on the "New" button in the left sidebar. Give it a name.
    5. Import the database file (provided in folder exampleDb) to the newly created database in PHPMyAdmin.
    6. Create a new user with the given username and password in the repository, or with your own username and password.
       Remember to change the connection details in 'connections.ts' to
       match the new user credentials and name of your database.
    7. Open a terminal or command prompt and navigate to the backend directory of the project.
    8. Run 'npm install' to install the required Node.js packages.
    9. Run 'npm run dev' to start the backend server.

    The backend server should now be running on your local machine, ready to serve the frontend or accept API requests.
