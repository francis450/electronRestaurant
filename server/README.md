# RMS API Backend With Laravel

This API serves as the core engine for managing menus, inventory, orders, and more.

<!-- table of contents -->
# Table of Contents
1. [Getting Started](#getting-started)
   1. [Prerequisites](#prerequisites)
   2. [Installation](#installation)
2. [API Endpoints](#api-endpoints)
   1. [Units of Measurement](#units-of-measurement)
      1. [Adding a new unit of measurement](#adding-a-new-unit-of-measurement)
      2. [To List all unit of measurement](#to-list-all-unit-of-measurement)
   2. [Inventory Items Categories](#inventory-items-categories)
      1. [Adding a new Inventory Items category](#adding-a-new-category)
      2. [To List all Inventory Items Categories](#to-list-all-categories)
      3. [To Get specific Inventory Items category using id](#to-get-specific-category-using-id)
      4. [Update specific Inventory item details using id](#update-specific-menu-item-details-using-id)
      5. [Delete specific Inventory item using id](#delete-specific-menu-item-using-id)
   3. [Menu Items](#menus)
      1. [Adding a new menu item](#adding-a-new-menu-item)
      2. [To List all Menu Items](#to-list-all-menu-items)
      3. [Get specific menu item using id](#get-specific-menu-item-using-id)
      4. [Update specific menu item details using id](#update-specific-menu-item-details-using-id)
      5. [Delete specific menu item using id](#delete-specific-menu-item-using-id)
   4. [Supplier Routes](#supplier-routes)
      1. [Adding a new supplier](#adding-a-new-supplier)
      2. [List all suppliers](#list-all-suppliers)
      3. [Get specific supplier using id](#get-specific-supplier-using-id)
      4. [Update specific supplier details using id](#update-specific-supplier-details-using-id)
      5. [Delete specific supplier using id](#delete-specific-supplier-using-id)
    5. [Inventory Routes](#inventory-routes)
        1. [Add a new Inventory Item](#create-a-new-inventory-item)
        2. [List all inventory items](#list-inventory-items)
        3. [Get specific inventory item using id](#edit-an-existing-inventory-item)
        4. [Update specific inventory item details using id](#edit-an-existing-inventory-item)
    6. [Inventory Purchase Receipts Routes](#purchase-receipt-routes)
        1. [Add a new receipt Item](#create-a-new-purchase-receipt-item)
        2. [List all inventory items](#list-all-inventory-purchase-receipt-items)
        3. [Get specific inventory item using id](#show-inventory-purchase-receipt-item-details)
        4. [Delete specific receipt item details using id](#delete-specific-receipt-item-using-id)
    7. [Menu Items Categories](#inventory-items-categories)
        1. [Adding a new Menu category](#create-a-new-menu-category)
        2. [To List all Menu Categories](#show-details-of-particular-menu-category)
        3. [To Get specific Menu category using id](#get-specific-menu-item-using-id)
        4. [Update specific category details using id](#edit-an-existing-menu-category)
        5. [Delete specific category using id](#delete-a-specific-menu-category)
    8. [Sections For Tables on a restaurant](#table-sections-endpoints)
        1. [Adding A New Section/Areas](#create-a-new-table-section)
        2. [To List All Table Sections](#list-all-table-sections)
        3. [To Update A specific Section](#edit-a-particular-table-section)
        4. [To Add A New Table Section](#create-a-new-table-section)
        5. [To Delete A Table Sections](#delete-a-particular-table-section)
3. [Authentication](#authentication)



## Getting Started

### Prerequisites

- [PHP](https://www.php.net/) installed (version 8.1.17)
- [Composer](https://getcomposer.org/) installed
- [Laravel](https://laravel.com/) installed (version 1.5.0)

### Installation

1. Clone the repository: `git clone https://github.com/francis450/electronRestaurant.git`
2. Navigate to the project directory: `cd electronRestaurant`
3. Install dependencies: `composer install`
4. Set up the environment: `cp .env.example .env` and configure database settings
5. Generate application key: `php artisan key:generate`
6. Migrate the database: `php artisan migrate`
7. Start the development server: `php artisan serve`

## API Endpoints
  ### Units of Measurement

  #### Adding a new unit of measurement

  - **URL:** `/unitofmeasure`
  - **HTTP Method:** `POST`
  - **Payload Options:**
  ```json
  {
      "name": "pounds",
      "symbol": "lb",
      "type": "base", //enum['base','subunit']
      "conversion_factor": "16" //1 pound = 16 ounces
  }

  {
    "name": "ounces",
    "symbol": "ou",
    "type": "subunit", //enum['base','subunit']
    "conversion_factor": "1/16", //1 ounce = 16 ounces
    "subunit_id": "1"// it references the pound above
  }
  ```

  #### To List all unit of measurement

  - **URL:** `/unitsofmeasure`
  - **HTTP Method:** `GET`
  - **Description:** Retrieve a list of all units of measurement(both base and subunits)

  #### To Get a Specific Unit of Measurement using id
   - **URL:** `/unitofmeasure/{id}`
  - **HTTP Method:** `GET`
  - **Parameters:**
    - `{id}`: The unique identifier for a unit of measurement
  - **Description:** Retrieve details of a specific unit of measurement identified by the ID.


  ### Inventory Items Categories

  #### Adding a new category

  - **URL:** `/category`
  - **HTTP Method:** `POST`
  - **Payload Options:**
  ```json
  {
      "name": "Breakfast"
  }
  ```

  #### To List all Categories

  - **URL:** `/categories`
  - **HTTP Method:** `GET`
  - **Description:** Retrieve a list of all categories of menu items

  #### To Get specific category using id

  - **URL:** `/category/{id}`
  - **HTTP Method:** `GET`
  - **Parameters:**
    - `{id}`: The unique identifier for a menu item category
  - **Description:** Retrieve details of a specific category identified by the ID.

  #### Update specific menu item details using id

  - **URL:** `/category/{id}`
  - **HTTP Method:** `POST`
  - **Parameters:**
    - `{id}`: The unique identifier for a menu item category
  - **Description:** Edit any details of a specific category identified by the ID.

  #### Delete specific menu item using id

  - **URL:** `/category/{id}`
  - **HTTP Method:** `DELETE`
  - **Parameters:**
    - `{id}`: The unique identifier for a menu item category
  - **Description:** Deletes details of a specific category identified by the ID.

  ---


  ### Menus

  #### Adding a new menu item

  - **URL:** `/menu`
  - **HTTP Method:** `POST`
  - **Payload Options:**
  ```json
  {
      "name": "juice",
      "description": "cookie biscuits with milk",
      "price": 122.21,
      "category_id": 1,
      "unit_of_measurement_id": 2,
      "image" : 'C:/Users/Francis/Screenshot.jpg', // (An Actual Item image) OPTIONAL
      "available": true, // OPTIONAL boolean
      "note": null, // any added info
      "ingredients": [
          {
              "inventory_item_id": 1, // inventory item used
              "quantity": 20 // qnty per serving
          },
          {
              "inventory_item_id": 2,
              "quantity": 92
          }
      ]
  }
  ```

  #### To List all Menu Items

  - **URL:** `/menu`
  - **HTTP Method:** `GET`
  - **Description:** Retrieve a list of all available menu items

  #### Get specific menu item using id

  - **URL:** `/menu/{id}`
  - **HTTP Method:** `GET`
  - **Parameters:**
    - `{id}`: The unique identifier for a menu item
  - **Description:** Retrieve details of a specific menu item identified by the ID.

  #### Update specific menu item details using id

  - **URL:** `/menu/{id}`
  - **HTTP Method:** `PUT`
  - **Payload Options:**
  ```json
  {
    "name": "edited menu name",
    "description": "Nostrum dolores dicta ipsum asperiores. Hic in itaque magnam mollitia quas illo.",
    "price": "100.00",
    "is_available": 1,
    "img": "new image",
    "menu_item_category_id": 1,
    "ingredients": [
      {
        "inventory_item_id": 2,
        "quantity": 353.51,
        "unit_of_measurement_id": 2
      },
      {
        "inventory_item_id": 3,
        "quantity": 195.62,
        "unit_of_measurement_id": 1
      }
    ]
  }
  ```
  - **Parameters:**
    - `{id}`: The unique identifier for a menu item
  - **Description:** Edit any details of a specific menu item identified by the ID.

  #### Delete specific menu item using id

  - **URL:** `/menu/{id}`
  - **HTTP Method:** `DELETE`
  - **Parameters:**
    - `{id}`: The unique identifier for a menu item
  - **Description:** Deletes details of a specific menu item identified by the ID.

  ---

  ### Supplier Routes

  #### Adding a new supplier

  - **URL:** `/newSupplier`
  - **HTTP Method:** `POST`
  - **Payload Options:**
  ```json
  {
        "name" : "Malbros", //required
          "contact_name": "Kevin Kibet - salesman",
          "email": "mal@bros.com",
          "phone_number": "0712345678",
          "address": "90, Thika",
          "kra_pin": "672946254",
          "customer_unit_serial_number": "637463524422"
  }
  ```

  #### List all suppliers

  - **URL:** `/suppliers`
  - **HTTP Method:** `GET`
  - **Description:** Retrieve a list of all available suppliers

  #### Get specific supplier using id

  - **URL:** `/supplier/{id}`
  - **HTTP Method:** `GET`
  - **Parameters:**
    - `{id}`: The unique identifier for a supplier
  - **Description:** Retrieve details of a specific supplier identified by the ID.

  #### Update specific supplier details using id

  - **URL:** `/editSupplier/{id}`
  - **HTTP Method:** `POST`
  - **Parameters:**
    - `{id}`: The unique identifier for a supplier
  - **Description:** Edit any details of a specific supplier identified by the ID.

  #### Delete specific supplier using id

  - **URL:** `/supplier/{id}`
  - **HTTP Method:** `DELETE`
  - **Parameters:**
    - `{id}`: The unique identifier for a supplier
  - **Description:** Deletes details of a specific supplier identified by the ID.



  ### Inventory Routes

  #### Create a New Inventory Item
  - **URL:** `/newInventoryItem`
  - **HTTP Method:** `POST`
  - **Payload Options:**
      ```json
      {
              "item_id": "",
              "item_name": "",
              "category": "",
              "unit_of_measurement_id": "",
              "current_quantity": "",
              "par_level": "",
              "reorder_point": "",
              "supplier": "",
              "cost_per_unit":"",
              "expiration_date": "",
      }
      ```

  #### List Inventory Items

  - **URL:** `/inventoryItems`
  - **HTTP Method:** `GET`
  - **Description:** Retrieve a list of all inventory items.

  #### Show Inventory Item Details

  - **URL:** `/inventoryItem/{id}`
  - **HTTP Method:** `GET`
  - **Parameters:**
    - `{id}`: The unique identifier of the inventory item.
  - **Description:** Retrieve details of a specific inventory item identified by its ID.

  #### Edit an Existing Inventory Item

  - **URL:** `/inventoryItem/{id}`
  - **HTTP Method:** `PUT`
- **Payload Options:**
    ```json
    {
            "item_id": "",
            "item_name": "",
            "category": "",
            "unit_of_measurement_id": "",
            "current_quantity": "",
            "par_level": "",
            "reorder_point": "",
            "supplier": "",
            "cost_per_unit":"",
            "expiration_date": "",
    }
    ```



  ### Purchase Receipt Routes

  #### Create a New Purchase Receipt Item
  - **URL:** `/purchase`
  - **HTTP Method:** `POST`
  - **Payload Options:**
      ```json
      {
              "receipt_number": "1213243",
              "supplier_id": "2",
              "date": "2024-01-30",
              "total_cost": 1540,
              "payment_method": "cash", // cash, bank, debit
              "items": [
                {
                  "product_id": "1",
                  "quantity": 122,
                  "unit_price": 1220,
                },
                {
                  "product_id": "2",
                  "quantity": 32,
                  "unit_price": 320,
                }
              ]
      }
      ```

  #### List All Inventory Purchase Receipt Items

  - **URL:** `/purchases`
  - **HTTP Method:** `GET`
  - **Description:** Retrieve a list of all inventory purchase receipt items.

  #### Show Inventory Purchase Receipt Item Details

  - **URL:** `/purchase/{id}`
  - **HTTP Method:** `GET`
  - **Parameters:**
    - `{id}`: The unique identifier of the purchase receipt item.
  - **Description:** Retrieve details of a specific inventory purchase receipt item identified by its ID.


  #### Delete specific Receipt Item using id

    - **URL:** `/purchase/{id}`
    - **HTTP Method:** `DELETE`
    - **Parameters:**
      - `{id}`: The unique identifier for a receipt item
    - **Description:** Deletes details of a specific receipt item identified by the ID.

    ---
 

  ### Menu Items Categories Routes
  #### Create a New Menu Category 
  - **URL:** `/menu_category`
  - **HTTP Method:** `POST`
  - **Payload Options:**
      ```json
      {
        "name": "new_category/subcategory",
        "parent_category_id": "18", // required for subcategory
        "description": "decribe the category/subcategory"
      }
      ```
  #### List All Menu Categories

  - **URL:** `/menu_categories`
  - **HTTP Method:** `GET`
  - **Description:** Retrieve a list of all menu categories.
  #### Show Details of particular menu category
  - **URL:** `/menu_category/{id}`
  - **HTTP Method:** `GET`
  - **Parameters:**
    - `{id}`: The unique identifier of the menu category.
  - **Description:** Retrieve details of a specific menu category identified by its ID.
  #### Edit an Existing Menu Category

  - **URL:** `/menu_category/{id}`
  - **HTTP Method:** `PUT`
    - **Payload Options:**
        ```json
        {
          "name": "new_category/subcategory",
          "parent_category_id": "18", // required for subcategory
          "description": "decribe the category/subcategory"
        }
        ```

  #### Delete a Specific Menu Category
  - **URL:** `/menu_category/{id}`
  - **HTTP Method:** `DELETE`
  - **Parameters:**
    - `{id}`: The unique identifier of the menu category.
  - **Description:** Deletes a specific menu category identified by its ID.



## Table Sections Endpoints
  ### Create a New Table Section 
  - **URL:** `/section`
  - **HTTP Method:** `POST`
  - **Payload Options:**
      ```json
      {
        "name": "main hall",
        "description": "Behind the bar"
      }
      ```
  ### List All Table Sections

  - **URL:** `/sections`
  - **HTTP Method:** `GET`
  - **Description:** Retrieve a list of all table sections.
  ### Show Details of particular tables section
  - **URL:** `/section/{id}`
  - **HTTP Method:** `GET`
  - **Parameters:**
    - `{id}`: The unique identifier of the table sections.
  - **Description:** Retrieve details of a specific tables sections identified by its ID.
  ### Edit a Particular table section

  - **URL:** `/section/{id}`
  - **HTTP Method:** `PUT`
    - **Payload Options:**
        ```json
        {
          "name": "main hall",
          "description": "Behind the bar"
        }
        ```
  ### Delete a Particular table section
  - **URL:** `/section/{id}`
  - **HTTP Method:** `DELETE`

## Restaurant Tables Endpoints
  ### Create a New Table 
  - **URL:** `/table`
  - **HTTP Method:** `POST`
  - **Payload Options:**
      ```json
      {
        "name": "table12",
        "description": "Describe The Table",
        "section_id": 1
      }
      ```
  ### List All Tables
  - **URL:** `/tables`
  - **HTTP Method:** `GET`
  - **Description:** Retrieve a list of all tables.
  ### Show Details of particular Table
  - **URL:** `/table/{id}`
  - **HTTP Method:** `GET`
  - **Parameters:**
    - `{id}`: The unique identifier of the tables.
  - **Description:** Retrieve details of a specific tables  identified by its ID.
  ### Edit a Particular table

  - **URL:** `/table/{id}`
  - **HTTP Method:** `PUT`
    - **Payload Options:**
        ```json
        {
          "name": "table12",
          "description": "Change description",
          "section_id": 1
        }
        ```
  ### Delete a Particular table
  - **URL:** `/table/{id}`
  - **HTTP Method:** `DELETE`



## Authentication
  - **URL** `/authenticate`
  - **HTTP Method:** `POST`
  - **Payload Options:**
    ```json
        {
          "username": "john_doe",
          "password": ******
        }
    ```

Protected routes require a valid token. Obtain a token by sending a POST request to `/api/authenticate` with valid credentials.



## Contributing

Contributions are welcome! Please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
