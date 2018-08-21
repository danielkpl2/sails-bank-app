This project was build with the Sails.js framework.
I used a sails-react-webpack boilerplate (sails-react-webpack [project-name]) and combined with a fresh sails 1.0 installation (sails new [project-name]) to reenable some things sails-react-webpack disabled such as grunt.
Requires node version >= 8.11
https://sailsjs.com/get-started
https://www.npmjs.com/package/sails-react-webpack
https://github.com/markmur/sails-react-webpack

Run npm install to install all the modules.
To run the project: 'npm start' starts the sails application and the frontend webpack dev server 
To build and run the project in production mode:
'npm run dist' builds the frontend react bundles then 'sails lift --prod' starts the production server.
Go to localhost:3000 on development build or localhost:1337 on production build.

Description: 
Click on the Bambooleans link in the top right hand corner or on the link on the front page. Create a few accounts and make a few transfers between users. Use the Account ID displayed for each user. User balance gets updated straight away and a transaction entry gets created. The receiving user will also have a transaction entry. Try entering a negative value, zero, less than 0.01, more than the available amount, sending money to yourself or sending money to non existing account. An appropriate success or failure message gets displayed.


Most of the app code is located in the 'api' and the 'assets' directories.

Some points worth mentioning:
- The bamboolean 'policy' ensures that only logged in users have access to the portal.
- The flash policy is for storing a flash message to be displayed only once 
- CSRF isn't taken care of
- Input parameters aren't sanitised or validated
- Very little validation and error handling was implemented due to time constraints.
- I copied over the user creation/login functionality from one of my other projects. It's designed to handle multiple user roles. You may notice that it's written with callbacks and not async/awaits or promises.
- A file based database is used instead of a real one. Since all data access is managed via an ORM called 'Waterline', everything would work the same with a real database.
- I'm only using a single controller with multiple actions because the project is quite small
- I haven't written any unit tests due to time constraints
- Passwords are encrypted with bcrypt. Password strength isn't enforced.

