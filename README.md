# Note-Taking App

This is a school assignment for an API course. The aim of this assignment is to create an headless app where users can login and create, edit, and delete notes. The notes are presented with a WYSIWYG editing mode that includes the option to set/edit text color and text background. The app is built using a MySQL database. To install project, please read README.md in backend and frontend.

## Features

- Note creation: Users can create new notes.
- Note editing: Users can edit existing notes.
- Note deletion: Users can delete notes they no longer need.
- WYSIWYG editing mode: Notes are presented in a what-you-see-is-what-you-get (WYSIWYG) editing mode, with the option to set/edit text color and text background.

## User Login

To use the Note-Taking App, users must log in using a username and password. Please note that the safety of this login is currently low, as passwords are not encrypted. The reason why the password encryption is not implemented is because this app was created for a school assignment and the goal was to create a headless app that could be demonstrated to users. I wanted users to have the experience of being able to log in and use the app, even if it is not currently designed for full-scale use.

When a user attempts to log in, the app checks the database to confirm that the username and password are correct. If the login credentials are valid, the user is granted access and given a visual feedback indicating that they are logged in. However, if the login credentials are incorrect, the user will receive a visual feedback indicating that they cannot log in.

## Limitations

Please note that this app is currently a demo and should not be used to post any sensitive or personal information. While data privacy is taken seriously, the current implementation lacks robust security features such as password encryption. As such, it is recommended that users avoid using sensitive or personal information when creating notes or logging into the app.

## Tech Stack

🌐 Axios | 📝 TinyMCE |
🔒 CORS | 🚀 Express |
🌐 HTML | 🗃️ MySQL2 |
🔄 Nodemon | 🎨 Sass |
🟢 Node.js | 🟦 TypeScript |
🚀 Vite | 🦜 Rome
