           BM-Finance
           
BM-Finance is a finance management web application designed to help users track their financial transactions,

view their current balance, and analyze weekly expenses through an intuitive dashboard. 

The app provides user authentication, a protected dashboard, and seamless transaction management with MongoDB as the backend database.


    Project Structure

BM-Finance/
├── finance-backend/ 
│   ├── index.js 
│   ├── node_modules/ 
│   ├── models/Transaction.js 
│   ├── User_model/User.js 
│   ├── package-lock.json 
│   └── package.json

├── finance-frontend/
│   ├── assets/svg/
│   ├── components/
│   ├── SingleComponent/
│   └── imagess/
│   ├── App.tsx
│   ├── main.tsx
│   ├── context/
│   ├── index.html
│   ├── package-lock.json
│   └── package.json
└── README.md



    Features
User Authentication:

Sign-up and login functionality to ensure secure access.

    Dashboard:

Displays the user's current balance.

Shows a list of the 5 most recent transactions.

Allows users to add new transactions (income/expense).

    Data Visualization:

Responsive Design: Optimized for desktop, tablet, and mobile views.

    Technologies Used

Frontend

ReactJS with Vite

TypeScript

Chakra UI for UI components

Tailwind CSS for custom styling

Backend

Node.js with Express.js

MongoDB for database management (MongoDB Atlas)

    Database Structure

Database Name: transactions

    Collections:

trans: Stores all transaction data.

my_users: Stores user information for authentication and monitoring.

    Connection Strings
MongoDB Atlas:  "mongodb+srv://teba-mern:kALwuL0ntUKsXZQs@mycluster.w2t9z.mongodb.net/transactions?retryWrites=true&w=majority";

MongoDB Atlas Cluster: myCluster

How to Run the Project

    Prerequisites

Node.js and npm installed

MongoDB running online or an Atlas cluster connection

Vite installed globally (optional)

Steps

    Clone the repository:

git clone:  https://github.com/teba-sol/Bm_Finance/

cd BM-Finance

Install dependencies for both frontend and backend:


    # Install backend dependencies
cd backend

npm install

    # Install frontend dependencies
    
cd ../frontend

npm install

cd backend

npm run dev

Start the frontend development server:

cd frontend

npm run dev


     Why npm run dev?

For both the frontend and backend, npm run dev is used because:

Frontend: Running npm run dev starts the Vite development server, which provides fast Hot Module Replacement (HMR) for a better development experience.

The frontend is served on http://localhost:5173 by default.

Backend: npm run dev ensures that the backend server restarts automatically whenever changes are made to the code (using tools like nodemon). 

This improves the development workflow by eliminating the need to restart the server manually after every update.


Open your browser and navigate to http://localhost:3000.

Future Improvements

Add user-specific transaction filtering.

Include category-wise breakdowns of expenses.

Add notifications for significant expense trends.



