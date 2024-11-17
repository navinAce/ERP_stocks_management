# Fullstack Stock Management System

This is a fullstack stock management system designed to manage inventory effectively. It allows users to add stock, update quantities, view transactions, filter them by date, and deduct stock upon sales. The project is deployed using **Netlify** (frontend), **Render** (backend), and **Clever Cloud** (database).

---

## Features

1. **Add Stock**  
   - Add new items with details like stock name, actual price, and selling price.
   
2. **Update Stock Quantity**  
   - Increase the quantity of existing stocks as required.

3. **View Transactions**  
   - See the transaction history of all stock-related activities.

4. **Filter Transactions by Date**  
   - Search for transactions within a specific date range.

5. **Deduct Stock**  
   - Deduct stock quantities based on sales, ensuring proper validation against available stock.

---

## Technologies Used

### Frontend
- **React.js (Vite)**: User interface and interactions.
- **Netlify**: Deployment platform.

### Backend
- **Express.js (Node.js)**: RESTful APIs to manage stock operations.
- **Render**: Deployment platform for the backend.

### Database
- **MySQL (Clever Cloud)**: Relational database to store stock and transaction data.

---

## API Routes

| HTTP Method | Endpoint                 | Description                           |
|-------------|--------------------------|---------------------------------------|
| `POST`      | `/add`                  | Add new stock details.               |
| `GET`       | `/getStocks`            | Fetch all stock details.             |
| `POST`      | `/addQuantity`          | Add quantity to an existing stock.   |
| `GET`       | `/getTransactions`      | Fetch transaction history.           |
| `GET`       | `/getDeductionDetails`  | Fetch stocks for deduction details.  |
| `POST`      | `/deductStock`          | Deduct stock quantity based on sales.|

---

## Deployment URLs

- **Frontend**: [https://erpprojectdemo.netlify.app](https://erpprojectv1.netlify.app/)  
- **Backend**: Deployed on Render (Insert URL here).  
- **Database**: Hosted on Clever Cloud.

---

## Future Enhancements

- Add user authentication and role-based access control.
- Generate detailed reports of stock levels and sales.
- Integrate graphs for better data visualization.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
