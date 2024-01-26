# Electron-React RMS

An ElectronJS-based desktop application for efficiently managing restaurant operations, including orders, menus, tables, and inventory.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## About

The Restaurant Management System is designed to streamline the workflow of restaurants by providing an intuitive desktop interface. It allows users to manage orders, track inventory, and optimize overall restaurant efficiency.

## Features

- Real-time order tracking and customization
- Menu management with categorization and details
- Table management for accurate billing
- Inventory tracking with automated restocking
- Secure user authentication and authorization
- Integration with external systems (accounting, online ordering platforms)
- Reporting and analytics for data-driven decision-making

## Getting Started

### Prerequisites

Make sure you have the following tools installed before setting up the project:

- Node.js
- npm

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/francis450/electronRestaurant.git

# Navigate to the project directory
cd electronRestaurant

# Install dependencies
npm install

# Start both react and electron apps
npm run dev
## Inventory Routes


### Create a New Inventory Item

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

### List Inventory Items

- **URL:** `/inventoryItems`
- **HTTP Method:** `GET`
- **Description:** Retrieve a list of all inventory items.

### Show Inventory Item Details

- **URL:** `/inventoryItem/{id}`
- **HTTP Method:** `GET`
- **Parameters:**
  - `{id}`: The unique identifier of the inventory item.
- **Description:** Retrieve details of a specific inventory item identified by its ID.

---