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

## Usage

### Admin

### User
