# Media Powder Inventory API (`api.md`)

## Base URL

```bash
https://api.empats-dev.alpha-03.trizentinc.com
```

---

## Authentication

All APIs except login require:

```http
x-auth-token: <JWT_TOKEN>
x-userid: <USER_ID>
```

Store both values after login response.

---

# 1. Login API

## Endpoint

```http
POST /empats/login
```

## Request Body

```json
{
  "user_id": "Abel234",
  "password": "Test@1234",
  "device_token": "",
  "device_id": "",
  "transferSession": true
}
```

## Response

```json
{
  "statusCode": 200,
  "status": true,
  "message": "Login successfully",
  "x-userid": "184",
  "x-auth-token": "<JWT_TOKEN>",
  "auto_logout_minutes": "20"
}
```

---

# 2. Statistics API

## Endpoint

```http
GET /media_powder/statistics
```

## Response

```json
{
  "statusCode": 200,
  "status": true,
  "data": {
    "available_grams": 1935.05,
    "near_expiry": 0,
    "expired": 0,
    "quarantine": 0,
    "blocked": 0
  }
}
```

---

# 3. Media Powder List API

## Endpoint

```http
GET /media_powder/list?sort=id&order=desc
```

## Query Params

| Param   | Type    |
| ------- | ------- |
| sort    | string  |
| order   | string  |
| page    | integer |
| size    | integer |
| keyword | string  |

## Main Response Fields

| Field               | Description                      |
| ------------------- | -------------------------------- |
| id                  | Batch ID                         |
| batch_name          | Lot Number                       |
| media_name          | Product Name                     |
| manufacturer_name   | Manufacturer                     |
| storage_temperature | Storage Condition                |
| quantity            | Total Quantity                   |
| available_stock     | Current Stock                    |
| stock_percentage    | Progress %                       |
| stock_status        | OPTIMAL / CRITICAL / NEAR_EXPIRY / OUT OF STOCK / LOW |
| qa_release_status   | QA Status                        |
| expiry_date         | Expiry Date                      |

---

# 4. Lot Detail API

## Endpoint

```http
GET /media_powder/list_powder_batch_lot_details?page=1&size=50&sort=id
```

## Query Params

| Param    | Type    |
| -------- | ------- |
| page     | integer |
| size     | integer |
| sort     | string  |
| batch_id | string  |

## Response Fields

| Field                  | Description        |
| ---------------------- | ------------------ |
| id                     | Lot ID             |
| lot_code               | Internal Lot Code  |
| batch_name             | Batch Name         |
| manufacture_date       | Manufacturing Date |
| expiry_date            | Expiry Date        |
| media_product_name     | Product Name       |
| manufacturer_name      | Manufacturer       |
| available_stock        | Available Stock    |
| stock_level_percentage | Stock %            |
| opened_date            | Opened Date        |
| gpt_tests              | GPT Test Array     |

---

# 5. Product Definitions API

## Endpoint

```http
GET /media/list_media_product_definitions?sort=id&order=desc
```

## Response Fields

| Field                 | Description         |
| --------------------- | ------------------- |
| id                    | Product ID          |
| media_product_name    | Full Product Name   |
| media_name            | Base Media          |
| manufacturer_name     | Manufacturer        |
| catalog_number        | SKU                 |
| reference_temperature | Storage Temperature |
| initial_ph            | Initial pH          |
| final_ph              | Final pH            |
| shelf_life            | Shelf Life          |

---

# 6. Create Shipment API

## Endpoint

```http
POST /media_powder/save
```

## Request Body

```json
{
  "media_product_name_id": 1,
  "manufacturer_lot_number": "LOT-PW-2026-231",
  "total_quantity_received": 2500,
  "manufacturing_date": "2026-01-15",
  "expiry_date": "2028-01-14",
  "no_of_container": 5,
  "quantity_per_container": 500
}
```

## Response

```json
{
  "statusCode": 200,
  "status": true,
  "message": "Media powder batch created successfully",
  "data": {
    "batch_id": 24,
    "lots_created": 5
  }
}
```

---

# Error Handling

| Code | Meaning          |
| ---- | ---------------- |
| 200  | Success          |
| 401  | Unauthorized     |
| 403  | Forbidden        |
| 404  | Not Found        |
| 422  | Validation Error |
| 500  | Server Error     |

---

# Important Notes

## Date Formats

* GET → `DD-MM-YYYY`
* POST → `YYYY-MM-DD`

## Quantity Calculation

```text
quantity_per_container = total_quantity_received / no_of_container
```

## Stock Status Colors

* OPTIMAL → Green
* NEAR_EXPIRY → Amber
* CRITICAL → Red
* OUT OF STOCK → Red (mapped to Critical)
* LOW → Red (mapped to Critical)

## QA Status Colors

* RELEASED → Green
* REJECTED → Red
* PENDING → Orange
