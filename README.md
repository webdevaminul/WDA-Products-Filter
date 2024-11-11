# [WDA-Products-Filter](https://wda-products-filter.vercel.app)

## Demo

![WDA-Products-Filter-Demo-1](/frontend/src/assets/products-filter-demo.png)

## Overview

This is a simple application built with ReactJS. It allows users to view and filter products by searching, filter by categories, price and rating. The app also features pagination.

## Technologies Used

- ReactJS
- Tailwind CSS
- DaisyUI
- MongoDB
- ExpressJS
- NodeJS

## Features

- **Responsive Design:** The application is fully responsive and works on all devices.
- **Product Listing Page:** Display all available products with image, name, price etc.
- **Category Filter:** Products can be filtered by category.
- **Sort By Filter:** Products can be sorted by price and rating.
- **Search Box:** User can search for products by name.

## Setup and Running the Project

To run this project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/webdevaminul/WDA-Products-Filter.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd WDA-Products-Filter
   ```

3. **Project Structure**: After cloning, you will see two main folders:

   - frontend: Contains the client-side code (React application).
   - backend: Contains the server-side code (Express, MongoDB).

4. **Running the Backend**:

   - Open a new terminal and navigate to the backend folder:

   ```bash
   cd backend
   ```

   - Install the required dependencies:

   ```bash
    npm install
   ```

   - Setup .env:
     Create a .env file in the backend folder and configure any necessary environment variables (e.g., MongoDB URI).

   - Start the backend server:

   ```bash
   npm run dev
   ```

5. **Running the Frontend**:

   - Open a new terminal and navigate to the frontend folder:

   ```bash
   cd frontend
   ```

   - Install the required dependencies:

   ```bash
   npm install
   ```

   - Setup .env:
     Create a .env file in the frontend folder and configure any necessary environment variables (e.g., NODE_ENV).

   - Start the React App:

   ```bash
    npm run dev
   ```

## Important

Ensure both the backend and frontend servers are running and you have the required environment variables set up in the .env file for smooth operation.

## Creadit & Contributions

Contributions are welcome! Please fork the repository and submit a pull request for any feature additions or bug fixes.  
For any questions or inquiries, please contact [webdev.aminul@gmail.com].  
Happy coding
