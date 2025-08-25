# Linkify

## Project Description

This is a web application built with Laravel, React.js, and Inertia, designed to provide a robust platform for managing and organizing links.

## Features

*   User authentication
*   Link creation, editing, and deletion
*   Categorization of links
*   Search and filtering of links

## Setup Instructions

To get this project up and running on your local machine, follow these steps:

### Prerequisites

Make sure you have the following installed:

*   PHP >= 8.0
*   Composer
*   Node.js >= 16.0
*   NPM or Yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/linkify.git
    cd linkify
    ```

2.  **Install PHP dependencies:**

    ```bash
    composer install
    ```

3.  **Install Node.js dependencies:**

    ```bash
    npm install # or yarn install
    ```

4.  **Copy the environment file:**

    ```bash
    cp .env.example .env
    ```

5.  **Generate application key:**

    ```bash
    php artisan key:generate
    ```

6.  **Configure your database:**

    Open the `.env` file and update the database connection details (DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD).

7.  **Run database migrations and seeders:**

    ```bash
    php artisan migrate --seed
    ```

8.  **Compile frontend assets:**

    ```bash
    npm run dev # or yarn dev
    ```

9.  **Start the development server:**

    ```bash
    php artisan serve
    ```

    The application will be available at `http://127.0.0.1:8000`.

## Technology Stack

*   **Backend:** Laravel
*   **Frontend:** React, Inertia.js
*   **Database:** MySQL (default, configurable)

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.
 
