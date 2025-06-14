# blog-backend
 A Rest API for my blog web application.
 
## Installation
### 1. Clone the repository
Get a copy of the repo
### 2. Install dependencies
In the root directory
```
npm install
```
## 3. Frontend Application
For the frontend web application to use . 

https://github.com/andreimandrique/blog-frontend

### 3.Set up environment variables: 
Create .env file in the root directory and add the following 
```
DATABASE_URL="postgresql://<db role>:<db password>@<db host>/<db name>?sslmode=require"
JWT_SECRET="<Your JWT secret>"
FRONTEND="<Your frontend web application>"
```
### 4. Generate Prisma client
In the root folder run
```
npx prisma generate
```
### 5. Start the server
In development
```
npm run dev
```
In production
```
npm run start
```
### 6. Access the application
Open your browser and navigate to http://localhost:3000
## Features
### Basic Features
* Log in 
* Sign up
* Verify
* View Blog
* Add Blog
* Edit Blog
* Delete Blog
* View All Blog
* View Specific Blog
