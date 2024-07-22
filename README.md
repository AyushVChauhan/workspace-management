# Workspace Management System

## Description

The Workspace Management System is a web application built using the MERN stack, Tailwind CSS, and PrimeReact. It
provides a platform for users to book workspaces and rooms with various amenities, while admins can manage workspaces,
view insights, and monitor bookings. Authentication and authorization are handled using JWT (JSON Web Tokens), with
distinct roles for users and admins.

## Features

### Admin

-   **Create Workspace:** Admins can create and manage workspaces, including rooms and amenities.
-   **View Insights:** Admins can view insights and analytics for each workspace.
-   **View Bookings:** Admins can see all bookings made by users.

### User

-   **View Workspaces:** Users can browse through a list of available workspaces.
-   **View Available Rooms:** Users can check the availability of rooms in each workspace.
-   **Book a Room:** Users can book rooms with or without additional amenities (amenities incur extra charges).

## Tech Stack

-   **Frontend:**
    -   React
    -   Tailwind CSS
    -   PrimeReact
-   **Backend:**
    -   Node.js
    -   Express.js
-   **Database:**
    -   MongoDB
-   **Authentication & Authorization:**
    -   JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites

-   Node.js (v14 or later)
-   MongoDB

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/AyushVChauhan/workspace-management
    cd workspace-management

    ```

2.  **Install dependencies for both client and server:**

    ```bash
    # For client
    cd client-web
    npm install

    # For server
    cd server
    npm install

    ```

3.  **Create a .env file in the server directory and add the following environment variables:**

    `PORT`, `MONGODB_URI_DEVELOPMENT`, `MONGODB_URI`, `ENVIRONMENT`, `JWT_SECRET`, `STRIPE_API_SRECRET_KEY`,
    `EMAIL_USER`, `EMAIL_PASSWORD`

4.  **add google.json in server/firebase**

    ```
    {
        "type": "service_account",
        "project_id": "",
        "private_key_id": "",
        "private_key": "",
        "client_email": "",
        "client_id": "",
        "auth_uri": "",
        "token_uri": "",
        "auth_provider_x509_cert_url": "",
        "client_x509_cert_url": "",
        "universe_domain": ""
    }
    ```

5.  **Run the application:**

    ```bash
    # For client
    cd client-web
    npm run dev

    # For server
    cd server
    npm start

    ```

6.  **Access the application:**

    ```bash
    Open your browser and go to http://localhost:5173
    ```

# Usage

## Admin
### Dashboard
![admin-1](https://github.com/user-attachments/assets/67b1fe40-eeb6-476d-8b44-b0a536381a3f)
### Workspaces
![admin-2](https://github.com/user-attachments/assets/05173bd2-1669-4bc7-b796-8aec6c3760c4)
![admin-3](https://github.com/user-attachments/assets/ff8f72fa-829a-4373-b232-c714132b9d53)
![admin-7](https://github.com/user-attachments/assets/6c3686f8-19bc-4350-be7a-f48777ec89ce)
![admin-8](https://github.com/user-attachments/assets/cc05d327-b217-4046-9655-53b9c1133eb8)

### Insights
![admin-4](https://github.com/user-attachments/assets/85316c0d-39c1-4c89-b824-c7b3af614cc0)
### Room Status
![admin-5](https://github.com/user-attachments/assets/3e9090a5-8703-435c-8a36-71f9f0d25728)
![admin-10](https://github.com/user-attachments/assets/9ca08449-9473-473b-b4b0-14f26279062f)
### User Bookings
![admin-6](https://github.com/user-attachments/assets/1fdfef4e-8ddd-4ebc-8e50-8cd39c65c79c)

## User
### Login
![1](https://github.com/user-attachments/assets/a0fae06d-2305-4958-8546-d4e80c88098b)
### Register
![2](https://github.com/user-attachments/assets/ef59944e-fdee-4d50-8207-6a6044860d1e)
### Home
![3](https://github.com/user-attachments/assets/bef78be0-3485-4053-984f-aacb86eebff7)
### Booking
![4](https://github.com/user-attachments/assets/234cca98-08d4-40f4-8955-1ed1db330175)
![5](https://github.com/user-attachments/assets/dd1fdcdb-de06-4132-a990-7c868fd9035f)
![6](https://github.com/user-attachments/assets/7c0df838-c285-4d39-9c7c-d1136a6e09d7)
![7](https://github.com/user-attachments/assets/700e7fc9-b503-4f06-b5b4-13f4096777ea)
### History
![8](https://github.com/user-attachments/assets/ad7f1549-0bed-4e23-a2e7-829e18045b30)
![9](https://github.com/user-attachments/assets/3ab663cd-0607-40c2-bf03-a80b88612065)
