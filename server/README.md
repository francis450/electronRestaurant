# RMS API Backend With Laravel

This API serves as the core engine for managing menus, inventory, orders, and more.

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


### Menu Items Categories

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
    "img_url" : "/usr/img/chipo",
    "status": "available",
    "note": null,
    "ingredients": [
        {
            "inventory_item_id": 1,
            "quantity": 20
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
- **HTTP Method:** `POST`
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

#### Inventory

- **GET /api/inventory**: Get current inventory status
- **POST /api/inventory/purchase**: Record a new inventory purchase

## Authentication

Protected routes require a valid JWT token. Obtain a token by sending a POST request to `/api/login` with valid credentials.

## Contributing

Contributions are welcome! Please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

## Supplier Routes


### Adding a new supplier

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

### List all suppliers

- **URL:** `/suppliers`
- **HTTP Method:** `GET`
- **Description:** Retrieve a list of all available suppliers

### Get specific supplier using id

- **URL:** `/supplier/{id}`
- **HTTP Method:** `GET`
- **Parameters:**
  - `{id}`: The unique identifier for a supplier
- **Description:** Retrieve details of a specific supplier identified by the ID.

### Update specific supplier details using id

- **URL:** `/editSupplier/{id}`
- **HTTP Method:** `POST`
- **Parameters:**
  - `{id}`: The unique identifier for a supplier
- **Description:** Edit any details of a specific supplier identified by the ID.

### Delete specific supplier using id

- **URL:** `/supplier/{id}`
- **HTTP Method:** `DELETE`
- **Parameters:**
  - `{id}`: The unique identifier for a supplier
- **Description:** Deletes details of a specific supplier identified by the ID.
