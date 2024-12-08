# Task Management API

This is a RESTful API for managing tasks, built with Node.js, Express, and MongoDB. It supports creating, retrieving, updating, and deleting tasks, with features such as filtering, sorting, and pagination.

## Features
- Add a new task
- Get all tasks with filtering, sorting, and pagination
- Retrieve a task by ID
- Update a task by ID
- Delete a task by ID

## Setup Instructions


1.Install Dependencies 
- Node.js
- mongodb
- express.js
- joi 
- dotenv 

2.configuring the environment variable 
- crete an .env file in the root directory 
- add the mongo url MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database-name>?retryWrites=true&w=majority 

3.start the application 
- run npm start 
-  once server running correctleServer is running on http://localhost:3000
   Connected to MongoDB successfully!

4.Test the  API 
- GET http://localhost:3000/tasks 
    ex-data: {
    "title": "New Task",
    "description": "Task details",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2024-12-15"
   }

