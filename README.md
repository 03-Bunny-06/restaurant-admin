# Restaurant Admin 🍽️

A robust RESTful backend service for managing restaurant menus and orders. This API provides functionality for CRUD operations, searching, filtering, availability control, and status-tracked order handling.

The API is fully documented using OpenAPI (Swagger), providing an interactive way to explore and test the endpoints.

**Live Demo:** [https://blog-api-cc47.onrender.com](http://api-restaurant-admin.onrender.com)  
**Live API Documentation:** [https://blog-api-cc47.onrender.com/api-docs](http://api-restaurant-admin.onrender.com/api-docs)

## Features⚡

-   **Menu Management:** Full CRUD (Create, Read, Update, Delete) functionality for menu items.
-   **Order Handling:** Create new orders, retrieve order lists, view specific order details, and update order statuses.
-   **Advanced Search & Filtering:**
    -   Filter menu items by `category`, `availability`, and `price`.
    -   Perform text-based searches on menu item `name` and `ingredients`.
-   **Pagination:** Efficiently query large sets of order data using page and limit parameters.
-   **Availability Control:** Easily toggle the availability of any menu item.
-   **API Documentation:** Interactive API documentation powered by Swagger (OpenAPI) is available at the `/api-docs` endpoint.

## Tech Stack 🚀

| Technology         | Description                                |
| ------------------ | ------------------------------------------ |
| **Node.js**        | JavaScript runtime environment             |
| **Express.js**     | Web framework for building the REST API    |
| **MongoDB**        | NoSQL database to store application data   |
| **Mongoose**       | ODM library for MongoDB and Node.js        |
| **dotenv**         | For managing environment variables         |
| **Swagger UI**     | For generating interactive API documentation |

## Getting Started ⚙️

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v20.19.0 or higher)
-   npm (Node Package Manager)
-   MongoDB instance (local or cloud-based like MongoDB Atlas)

### Installation & Setup 📦

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/03-bunny-06/restaurant-admin.git
    ```

2.  **Navigate to the server directory:**
    ```bash
    cd restaurant-admin/server
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Create an environment file:**
    Create a `.env` file in the `server` directory and add your environment variables.

    ```env
    # Your MongoDB connection string
    DB_URL=mongodb+srv://<username>:<password>@cluster_url/your_database_name

    # The port for the server to run on
    PORT=8080
    ```

5.  **Start the server:**
    ```bash
    npm start
    ```

The server will start on the port specified in your `.env` file (or 8080 by default). You can access the API documentation at `http://localhost:8080/api-docs`.

## API Endpoints 🔗

The API is structured into two main routes that handles: `Menu` and `Order`.

### Menu API

Endpoints for managing restaurant menu items.

| Method  | Endpoint                         | Description                                  |
| :------ | :------------------------------- | :------------------------------------------- |
| `GET`   | `/menu`                          | Get menu items with optional filtering.      |
| `GET`   | `/menu/search?`                   | Search for menu items by text query.         |
| `POST`  | `/menu`                          | Create a new menu item.                      |
| `GET`   | `/menu/:id`                      | Get a single menu item by its ID.            |
| `PUT`   | `/menu/:id`                      | Update a menu item by its ID.                |
| `DELETE`| `/menu/:id`                      | Delete a menu item by its ID.                |
| `PATCH` | `/menu/:id/availability`         | Toggle the availability status of a menu item. |

#### **GET** `/menu`

Retrieves a list of menu items. Supports filtering via query parameters.

-   **Query Parameters:**
    -   `category` (string): Filter by category (e.g., `Appetizer`, `Main Course`).
    -   `availability` (boolean): Filter by availability (`true` or `false`).
    -   `price` (number): Filter for items with a price greater than or equal to the specified value.

#### **GET** `/menu/search`

Performs a text search on the `name` and `ingredients` fields of menu items.

-   **Query Parameters:**
    -   `q` (string): The search term.

#### **POST** `/menu`

Adds a new item to the menu.

-   **Request Body:**
    ```json
    {
        "name": "Veg Pasta",
        "description": "Pasta tossed in tangy tomato sauce with fresh vegetables.",
        "category": "Main Course",
        "price": 200,
        "ingredients": ["pasta", "vegetables", "tomato sauce", "salt"],
        "preparationTime": 18
    }
    ```

### Order API

Endpoints for managing customer orders.

| Method  | Endpoint                | Description                                       |
| :------ | :---------------------- | :------------------------------------------------ |
| `GET`   | `/orders`               | Get a list of orders with filtering and pagination. |
| `POST`  | `/orders`               | Create a new order.                               |
| `GET`   | `/orders/:id`           | Get details of a single order by its ID.          |
| `PATCH` | `/orders/:id/status`    | Update the status of an order.                    |

#### **GET** `/orders`

Retrieves a list of orders. Supports pagination and filtering by status.

-   **Query Parameters:**
    -   `status` (string): Filter by order status (e.g., `Pending`, `Preparing`, `Ready`).
    -   `page` (number): The page number for pagination.
    -   `limit` (number): The number of items per page.

#### **POST** `/orders`

Creates a new customer order. The `totalAmount` is calculated on the server.

-   **Request Body:**
    ```json
    {
        "items": [
            { "menuItem": "6981be94cd6c6400e2377088", "quantity": 2, "price": 140 },
            { "menuItem": "6981bdbecd6c6400e2377066", "quantity": 1, "price": 90 }
        ],
        "status": "Pending",
        "customerName": "Jane Doe",
        "tableNumber": 5
    }
    ```

#### **PATCH** `/orders/:id/status`

Updates the status of an existing order.

-   **Request Body:**
    -   `status` (string): The new status. Must be one of `Pending`, `Preparing`, `Ready`, `Delivered`, `Cancelled`.
    ```json
    {
        "status": "Preparing"
    }
    ```

## Data Models 🗂️

### MenuItem Schema

```javascript
{
    name: { type: String, required: true, index: true },
    description: String,
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
        required: true
    },
    price: { type: Number, required: true },
    ingredients: [String],
    isAvailable: { type: Boolean, default: true },
    preparationTime: { type: Number, required: true },
    imageLink : { type: String, default: '...' }
}
```

### Order Schema

```javascript
{
    orderNumber: { type: String, unique: true, default: () => `ORD-xxxxxx` },
    items: [
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled']
    },
    customerName: { type: String, required: true },
    tableNumber: { type: Number, required: true }
}
