import connection from '../../db/db.js'

const addStocksDetails=  (req, res) => {
    const { StockName, actualPrice, sellingPrice } = req.body;
    connection.query('INSERT INTO stocks (name,actual_price,selling_price) VALUES (?,?,?)',[StockName, actualPrice, sellingPrice], (error, results) => {
        if (error) {
           return res.status(500).send('Internal Server Error');
        }
        res.send('Stocks Added successfully').status(201);
    });
};

const getStocksDetails = (req, res) => {
    const query = `
        SELECT 
            s.id,
            s.name,
            s.actual_price,
            s.selling_price,
            s.stock_date,
            COALESCE(SUM(
                CASE 
                    WHEN t.transaction_type = 'add' THEN t.quantity
                    WHEN t.transaction_type = 'deduct' THEN -t.quantity
                END
            ), 0) AS current_quantity
        FROM 
            stocks s
        LEFT JOIN 
            stock_transactions t ON s.id = t.stock_id
        GROUP BY 
            s.id, s.name;
    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).send('Internal Server Error');
        }
        res.send(results).status(201);
    });
};

const addStockQuantity = (req, res) => {
    const { selectedStocks, quantity } = req.body;
  
    const values = selectedStocks && selectedStocks.map(stock_id => [stock_id, 'add', quantity]);
  
    const query = `INSERT INTO stock_transactions (stock_id, transaction_type, quantity) VALUES ?`;
  
    connection.query(query, [values], (error, results) => {
      if (error) {
        return res.status(500).send('Internal Server Error');
      }
      res.send('Stock quantity added successfully').status(201);
    });
  };

  const fetchStocksTransactions = (req, res) => {
    const query = `
    SELECT t.id,s.name,t.transaction_type,t.quantity,t.transaction_date,t.price
    FROM stocks s
    JOIN 
    stock_transactions t ON s.id = t.stock_id;`
    connection.query(query, (error,results)=>{
        if(error){
            return res.status(500).send('Internal Server Error');
        }
        res.send(results).status(201);
    })
  }
  
  const getStocksForDeductiondetails = (req, res) => {
    const query = `
        SELECT 
            s.id,
            s.name,
            s.selling_price,
            COALESCE(SUM(
                CASE 
                    WHEN t.transaction_type = 'add' THEN t.quantity
                    WHEN t.transaction_type = 'deduct' THEN -t.quantity
                END
            ), 0) AS current_quantity
        FROM 
            stocks s
        LEFT JOIN 
            stock_transactions t ON s.id = t.stock_id
        GROUP BY 
            s.id, s.name;
    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).send('Internal Server Error');
        }
        res.send(results).status(201);
    });
};

const deductStockQuantity = (req, res) => {
    const { stock_id, quantity } = req.body;
    const query = `INSERT INTO stock_transactions (stock_id, transaction_type, quantity) VALUES (?, ?, ?)`;
  
    connection.query(query, [stock_id,'deduct',quantity], (error, results) => {
      if (error) {
        return res.status(500).send('Internal Server Error');
      }
      res.send('Stock quantity deducted successfully').status(201);
    });
  }



export { addStocksDetails,getStocksDetails,addStockQuantity,fetchStocksTransactions,getStocksForDeductiondetails,deductStockQuantity };