# Postman Collection: [Link](https://www.postman.com/avionics-candidate-79611380/workspace/public/collection/29490491-fccf0064-c682-4db4-952f-6114a04b752d?action=share&creator=29490491)

# Instructions

- Copy contents of env.example into .env, and update with your credentials

# Problem Definition

Create REST API using NodeJS/Express with MySQL as DB, generate a Postman collection for the same

Use the .env file to store database credentials.

1. Authentication:

    -Create a login and register APIs. Register with Fields: name, email, password. Login with email/password. Password have to be encrypted before saving in the db.

    -Use JWT token for authorization

2. Task CRUD: (fields: title, due date, attachment (file), user)

    -Create Task API- Create a task with the above-mentioned fields and assign it to the current logged-in user with it in the DB.

    -Task list API- get tasks of the logged-in user

    -Edit Task- similar to create a task but on a given task ID

    -Delete Task- delete a task by ID.

    ( Only logged-in users can perform the CRUD operations for his/her tasks.Upload a CSV file for multiple tasks and import it to the database. )
