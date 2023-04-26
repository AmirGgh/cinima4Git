# Cinima Manager 
A web application based on two Rest API servers and a client side in React.js. The architecture of the system was divided according to Business and Data layers

Server side: The servers were developed using express and node. All calls between the servers are made using Rest API calls based on CRUD. The servers manage databases realized by mongoDB and the modeling of the objects was done with the help of Mongoose. The routers on the servers were realized and secured by using jwt with express.

Client side: developed in React.js, loading performance and state management have been improved using Redux, the design is implemented using MUI. The distribution of permissions in the application allows only existing users to perform actions according to the limitations defined for them by admin.

## Main Points:
- The Cinima has Users for authentication and autorizetion which connected to members that could activate in the site
- Each member can see, add, edit, and delete moveis and subscriptions (subscriptions canot be deleted) as their user's permissions.

## Installetion -> run npm start by order.
### server-subscription:
In the server file run 'npm i' to install all the packages. then run 'npm start' to start the server at 'http://localhost:8080'
### server-cinima:
In the server file run 'npm i' to install all the packages. then run 'npm start' to start the server at 'http://localhost:8000'
### Client:
In the client file runs 'npm i' to install all the packages. then run 'npm start' to start the server at 'http://localhost:3000'  

## Log in
- In log in you have 1000 min as an Admin with all permissions, and 200 min as a user with view movies and subscriptions and add subscriptions.
- To add new user, the Admin need to create one in menage users - "Add new user". Then when the new user makes a first login at - "create account"  he fills the username that he got from Admin and creates his password.

## Pages
### movise
- display all the movies in the cinima site. 
- Members and Admin can edit and add movies - depend on their permissions.

### subscriptions 
- display all the subscriptions in the cinima site.
- Members and Admin can  add subscriptions - depend on their permissions.

### user management 
- display all the users-members data in the cinima site just for Admin.
- This page allowd Admin to add, edit, delete users.

### USERS FOR LOGIN:
- username: admin password: ad1234
- username: Leanne password: Graham
- username: Ervin password: Howell
- username: Clementine  password: Bauch
