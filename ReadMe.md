# WanderSTAY 🏨

### [Live Demo 🔗](https://wanderstay-production.up.railway.app/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Built with Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![Database: MongoDB](https://img.shields.io/badge/MongoDB-4.4-green.svg)](https://www.mongodb.com/)

WanderSTAY is a full-stack web application inspired by Airbnb, built from the ground up using the MVC (Model-View-Controller) architecture. It allows users to discover, list, and book unique accommodations around the world. This project demonstrates a comprehensive understanding of backend development, database management, and client-side interactivity without relying on a front-end framework.

## ✨ Key Features

* **User Authentication:** Secure user registration and login system using Passport.js.
* **Full CRUD Functionality:** Users can create, read, update, and delete their own listings.
* **Image Uploads:** Seamless image handling with cloud storage via the Cloudinary API.
* **Interactive Maps:** Geocoding and map displays for each listing using the Mapbox API.
* **Booking System:** Users can select dates using a date picker and book listings.
* **Payment Integration:** Secure payment processing implemented with the PayPal API & Manual Booking Also .
* **Wishlist:** Users can add or remove listings from their personal wishlist.
* **Reviews and Ratings:** Authenticated users can post reviews and star ratings on listings.
* **Responsive Design:** A clean and modern UI built with Bootstrap 5 that works on all devices.
* **Flash Messages:** Provides user feedback for actions like successful login or error notifications.

## 🛠️ Tech Stack

This project uses a classic SSR (Server-Side Rendering) setup with EJS for templating.

* **Backend:** Node.js, Express.js
* **Frontend:** EJS (Embedded JavaScript templates), HTML5, CSS3, Bootstrap 5, Client-side JavaScript
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** Passport.js, Passport-Local, `express-session`, `connect-mongo`
* **Image Hosting:** Cloudinary, Multer
* **Mapping:** Mapbox API
* **Payments:** PayPal API
* **Security:**  `joi` for schema validation
* **Other Tools:** `connect-flash`, `method-override`, `dotenv`

## 📂 File Structure

The project follows the Model-View-Controller (MVC) architectural pattern to ensure a clean separation of concerns, making the codebase organized and scalable.
```
├── 📂 controllers/      # Contains logic to handle requests and interact with models.
├── 📂 models/           # Defines Mongoose schemas for the database.
├── 📂 public/           # Static assets (client-side CSS and JavaScript).
├── 📂 routes/           # Express routers to define URL endpoints.
├── 📂 utils/            # Utility functions (error handling, etc.).
├── 📂 views/            # EJS templates for the user interface.
├── .env                 # Environment variables (API keys, secrets).
├── app.js               # The main application entry point.
├── middleware.js        # Custom middleware functions (e.g., isLoggedIn).
└── package.json         # Project metadata and dependencies.
```

## 🚀 Getting Started

Follow these steps to run the project on your local machine.

### Prerequisites

Make sure you have the following installed:
* [Node.js](https://nodejs.org/) (v18.x or later)
* [npm](https://www.npmjs.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone (https://github.com/Anmol-Mittal30/WanderStay.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd WanderStay
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Create a `.env` file** in the root of the project and add the following environment variables. You must replace the placeholder values with your own API keys and secrets.
    ```env
    # MongoDB Connection URL (local or from Atlas)
    MONGO_URL=mongodb://127.0.0.1:27017/wanderlust

    # A long, random string for session secret
    SECRET=mySuperSecretString

    # Cloudinary Credentials
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

    # Mapbox Public Token
    MAP_TOKEN=pk.your_mapbox_token

    # PayPal Client ID
    PAYPAL_CLIENT_ID=your_paypal_client_id

     # PayPal Secret ID
    PAYPAL_SECRET=your_paypal_secret_id
    ```

5.  **Run the application:**
    ```bash
    nodemon app.js
    ```
    (Or `node app.js` if you don't have nodemon installed)

6.  **Open your browser** and go to `http://localhost:5000/listings`.

## 📬 Contact

**Anmol Mittal**
* **Email:** `mittalanmol0309@gmail.com`
* **GitHub:** [Anmol-Mittal30](https://github.com/Anmol-Mittal30)
* **LinkedIn:** [anmol-mittal-268a57289](https://www.linkedin.com/in/anmol-mittal-268a57289/)

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
