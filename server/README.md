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

---