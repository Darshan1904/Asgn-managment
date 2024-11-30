# Project Setup and Running Instructions

## Prerequisites
Before getting started, ensure you have the following installed on your system:

- Node.js - Version 14.x or later (for running JavaScript/TypeScript applications)
- MongoDB - Local or cloud database service (e.g., MongoDB Atlas)
- Git - For cloning the repository if you're working with version control

## Step 1: Clone the Repository
If you haven't already, clone the repository to your local machine:

```bash
git clone https://github.com/Darshan1904/Asgn-managment.git
cd Asgn-managment
```

## Step 2: Install Dependencies
Navigate to your project directory and install the required dependencies using npm:

```bash
npm install
```

## Step 3: Set Up Environment Variables
You will need to set up environment variables that contain sensitive information, such as your MongoDB URI, JWT Secret, etc.

Create a `.env` file in the root of your project and add the following variables:

```
PORT=3000               # The port your server will run on
DB_URI=mongodb://localhost:27017/yourdb    # MongoDB connection URI (change it for MongoDB Atlas or local MongoDB)
JWT_SECRET=your_jwt_secret_key  # Secret key for signing JWT tokens
JWT_EXPIRES_IN=1h  # Expiration time for JWT tokens
```

Note: Make sure to replace `yourdb` with your actual database name, and `your_jwt_secret_key` with a secret string that will be used for signing JWT tokens.

## Step 4: TypeScript Configuration
Ensure that TypeScript is correctly configured by verifying the `tsconfig.json` file. It should look like this:

```json
{
  "compilerOptions": {
    "target": "es2016",                 
    "module": "commonjs",               
    "rootDir": "./src",               
    "outDir": "./dist",                
    "strict": true,                     
    "esModuleInterop": true,            
    "skipLibCheck": true,               
    "forceConsistentCasingInFileNames": true 
  },
  "include": ["src"],                   
  "exclude": ["node_modules"]           
}
```

## Step 5: Start the Development Server

Now that everything is set up, you can run the server. Use the following command to start the development server:

```bash
npm run dev
```

This will start the application using ts-node and watch for changes in TypeScript files.

## API Documentation

### 1. Public Endpoints

#### POST api/auth/register
- **Description**: Register a new user.
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin/user"
}
```

#### POST api/auth/login
- **Description**: User login to get a JWT token.
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. User Endpoints

#### POST api/users/upload
- **Description**: Upload an assignment.
- **Headers**: 
  `Authorization: Bearer <JWT Token>`
- **Body**:
```json
{
  "task": "Finish api creation",
  "assignedAdminEmail": "Admin.doe@example.com"
}
```

### 3. Admin Endpoints

#### GET api/admins/assignments
- **Description**: View all assignments tagged to the admin.
- **Headers**: 
  `Authorization: Bearer <JWT Token>`

#### PUT api/admins/assignments/:id/accept
- **Description**: Accept an assignment.
- **Headers**: 
  `Authorization: Bearer <JWT Token>`

#### PUT api/admins/assignments/:id/reject
- **Description**: Reject an assignment.
- **Headers**: 
  `Authorization: Bearer <JWT Token>`
