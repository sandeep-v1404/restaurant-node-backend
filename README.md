# 🧩 Data Storage Strategy: MongoDB vs PostgreSQL

In this project, we adopt a **polyglot persistence** approach, using both **MongoDB** and **PostgreSQL** to handle different types of data. This ensures we can take advantage of the strengths of each system, based on the nature of the data and how it's used.

---

## ✅ MongoDB – For Menu Items & Flexible Documents

### Used for:

- Menu items
- Categories
- Customizations (e.g., toppings, modifiers)
- Any nested or dynamic menu data

### Justification:

- Menu items often have **non-uniform structures**. Some may have options like `sizes`, `ingredients`, or `extras` that vary.
- MongoDB supports **nested documents and arrays**, which makes modeling this data natural and efficient.
- Its **schema-less** nature supports evolving the menu structure over time without requiring migrations.
- **Fast read performance** is ideal for serving public-facing data like restaurant menus.

### Example Document:

```json
{
  "_id": "burger123",
  "name": "Cheeseburger",
  "category": "Burgers",
  "price": 5.99,
  "variants": [
    { "size": "Small", "price": 4.99 },
    { "size": "Large", "price": 6.99 }
  ],
  "extras": ["cheese", "bacon", "jalapeños"]
}
```

---

## ✅ PostgreSQL – For Users, Orders, and Transactions

### Used for:

- Users
- Orders
- Payments
- Delivery addresses
- Relationships between users and orders

### Justification:

- This data is **structured and relational**, and benefits from relational modeling (e.g., foreign keys).
- PostgreSQL offers **data integrity**, **transactions**, and **schema enforcement** — critical for user data and financial operations.
- SQL enables **complex reporting and analytics**, like top users, sales reports, etc.
- ACID compliance ensures **safe concurrent updates and queries**.

### Example Schema:

```
users
├── id (PK)
├── name
├── email
└── created_at

orders
├── id (PK)
├── user_id (FK -> users)
├── status
├── total
└── created_at

order_items
├── id (PK)
├── order_id (FK -> orders)
├── item_id (ref to MongoDB _id)
└── quantity
```

---

## 🔄 Integration Strategy

- Orders reference menu items using **MongoDB **`` as a foreign key stored in PostgreSQL (`item_id`).
- When processing orders, the system fetches **menu details from MongoDB** and **user/order data from PostgreSQL**.

---

## 🛠 Comparison Summary

| Feature                  | MongoDB (Menu) | PostgreSQL (Users/Orders) |
| ------------------------ | -------------- | ------------------------- |
| Flexible schema          | ✅              | ❌                         |
| Complex joins            | ❌              | ✅                         |
| Nested documents         | ✅              | ❌                         |
| Transactional integrity  | ❌              | ✅                         |
| Fast catalog reads       | ✅              | ✅                         |
| Strict schema validation | ❌              | ✅                         |

---

By using the right database for the right job, we ensure the system is both **scalable** and **maintainable**, and ready for future evolution.

