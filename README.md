# MERN-backend-boilerplate
Unified Backend

To setup:
- Create an account on MongoDB Atlas. Create a new project and a new cluster.
- Create a .env file in the project next to the app.js file.
- Copy the connection url from MongoDB Atlas cluster to the .env file as such:

DB_CONNECTION=mongodb+srv://<username>:<password>@projectname-ttylt.mongodb.net/test
TOKEN_SECRET=98cf24448fb17ac9739567c7a5b32c20 // Any hash key

- Save the file and run: npm install
- Run: npm start
- Hit localhost:3000/. If you get a message saying Access Denied, it worked.
