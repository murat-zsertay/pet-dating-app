# Pet Dating

An app for pet owners who are looking for playdates, walks, or just some good company for their furry friend. The app
makes it easy for users to connect with other pet lovers in their area. This app is a two week project in our final 11th
and 12th weeks of the MakersAcademy bootcamp.

## Features

A user can:

- Sign up
- Sign in
- Sign out
- View eligible pets to date with

## Technologies

Here's an overview of the technologies used to build this template application.

### **M** is for MongoDB

[MongoDB](https://www.mongodb.com/) is a _NoSQL_ database program that stores data in collections of documents (in a
format similar to JSON), rather than in tables. The application interacts with MongoDB using a tool called Mongoose.

### **E** is for Express

[Express](https://expressjs.com/) is the Javascript equivalent of Sinatra. The structure of this application will feel
quite different to what you're used to but the principles are the same.

### **R** is for React

[React](https://reactjs.org/) is a hugely popular tool that is used to build engaging front ends. The basic principle is
that the front end is split up into _components_, each of which _could_ include some logic, template structure (HTML)
and styling (CSS).

### **N** is for Node

Java script was originally designed to run exclusively in browsers, such as Chrome. [Node](https://nodejs.org/en/) is a
tool that allows you to run Javascript outside the browser and its invention made it possible to build full stack
Javascript apps.

We also used...

- [Jest](https://jestjs.io/) for unit testing on the back end
- [Cypress](https://www.cypress.io/) for end-to-end testing and component testing, on the front end
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [Handlebars](https://handlebarsjs.com/) for the `home` template.
- [ESLint](https://eslint.org) for linting.
- [pm2](https://pm2.keymetrics.io/) to reload the server automatically.

## Architecture

This application is comprised of two distinct pieces.

- A backend API built with Express
- A front end built with React

The React front end sends HTTP requests to the backend API and receives JSON in response body, rather than a whole page
of HTML.

For example, the React front end would send this request to retrieve the entire `Post` collection.

```
GET "/posts"
```

And the body of the response would look like this.

```
{
    "posts": [
        {
            "_id": "62f8ef0e6c1ffcf74cbbb181",
            "message": "Hello, this is my first Pet Dating post!",
            "__v": 0
        },
        {
            "_id": "62f8ef366c1ffcf74cbbb188",
            "message": "Welcome to Pet Dating! Have an woofing time :)",
            "__v": 0
        },
        {
            "_id": "62f8f08af1cffef85a7426ae",
            "message": "Thank you :D",
            "__v": 0
        }
    ]
}
```

Once received by the React FE, the JSON in the response body is used to render a list of posts on the page.

This architectural pattern is quite popular because it allows teams to build multiple front ends, all of which use the
same backend API. You could, for example, go on to build a mobile app without needing to create another backend API.

## Authentication

Here's the authentication flow for this application

1. A registered user submits their email address and password via the React front end.
2. The Express backend receives the data and tries to find a user in the DB with the same email address.
3. If a user is found, the password in the database is compared to the password that was submitted.
4. If the passwords match, a JSON Web Token is generated and returned, as part of the response.
5. The React front end receives the token and holds on to it.
6. Every request to an authenticated endpoint must include a valid token (which is checked by the backend).
7. When the user logs out, the front end discards the token.

### What is a JSON Web Token?

A JSON Web Token, or JWT, is a token that comprises three parts

- A header, which contains information about how the token was generated.
- A signature, which is used to verify the token.
- A payload, which you can use to store some **non-sensitive data** like a user id. Note that the payload is not secure
  and can be decoded very easily.

The signature is created using a 'secret', which must be kept private (i.e. not put on GitHub) otherwise nefarious
internet users could start to issue tokens for your application.

Here, we've used an environment variable called `JWT_SECRET`, which you'll see used in the commands to start the
application and run the tests (below). You can change the value of that environment variable to anything you like.

## Quickstart

### Install Node.js

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), currently `18.1.0`.
   ```
   nvm install 18
   ```

### Set up your project

3. Clone this repository
4. Install Node.js dependencies for both FE and BE (API)
   ```
   ; cd backend
   ; npm install
   ; cd ../frontend
   ; npm install
   ```
5. Install an ESLint plugin for your editor. For example: [`linter-eslint`](https://github.com/AtomLinter/linter-eslint)
   for Atom.
6. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```
   _Note:_ If you see a message that says `If you need to have mongodb-community@5.0 first in your PATH, run:`, follow
   the instruction. Restart your terminal after this.
7. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```
8. Create and populate initial .env files on the backend for testing and development
   ```
   cd backend
    touch .env.development.local .env.production.local .env.test.local
   echo "JWT_SECRET=SUPER_SECRET\nMONGODB_URL='mongodb://0.0.0.0/pet_test'\nPORT=8080" >> .env.test.local
   echo "JWT_SECRET=SUPER_SECRET\nMONGODB_URL='mongodb://0.0.0.0/pet_development'\nPORT=8080" >> .env.development.local
   ```
9.

```sh 
npm i pm2 -g
```

### Start (React Frontend and Express Backend)

1. Start both servers
   **NB depending on the environment you would like setup then you will need to pass in that particular environment
   name, all have been listed below, these variables are listed in the ecosystem.config.js file at the project root**
2.
```sh
pm2 start ecosystem.config.cjs --env development
```

  ```sh
   pm2 start ecosystem.config.cjs --env test
   ```

quick test

  ```sh
   pm2 start ecosystem.config.cjs --env production
   ```

You should now be able to open your browser and go to `http://localhost:3000/signup` to create a new user.

Then, after signing up, you should be able to log in by going to `http://localhost:3000/login`.

After logging in, you won't see much but you can create posts using PostMan and they should then show up in the browser
if you refresh the page.

### Testing

#### The Backend (API)

**Note the use of an environment variable for the JWT secret**

**Note Environment variables (e.g. JWT secret) are set in the .env.test.local file**

Start the server in test mode (so that it connects to the test DB)
**NB the mongoDB server is defined in the .env.test.local file**

```sh
cd backend
npm run start:test
```

#### The frontend (React)

**Note the use of an environment variable for the JWT secret**

**NB the environment variables for dev and testing are currently stored in the ecosystem.config.js**

Start the server in test mode (so that it connects to the test DB)

```
; cd frontend
; npm run start:test
```

## MongoDB Connection Errors?

Some people occasionally experience MongoDB connection errors when running the tests or trying to use the application.
Here are some tips which might help resolve such issues.

- Check that MongoDB is installed using `mongo --version`
- Check that it's running using `brew services list`

If you have issues that are not resolved by these tips, please reach out to a coach and, once the issue is resolved, we
can add a new tip!

FYI - In the package.json dont try to audit fix the issues, it will flip to have from 6 to 80 vunerabilities
and then if you audit fix again it will flip back to again it will go back to having 6 vunerabilities.






<!-- BEGIN GENERATED SECTION DO NOT EDIT -->

Charlie Jess Murat Oana
