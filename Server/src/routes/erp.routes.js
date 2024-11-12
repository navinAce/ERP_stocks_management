import { Router } from 'express';
import { addStocksDetails,getStocksDetails,addStockQuantity,fetchStocksTransactions,getStocksForDeductiondetails,deductStockQuantity } from '../controllers/stock.controllers.js';

const router = Router();

router.route("/add").post(addStocksDetails);
router.route("/getStocks").get(getStocksDetails);
router.route("/addQuantity").post(addStockQuantity);
router.route("/getTransactions").get(fetchStocksTransactions);
router.route("/getDeductionDetails").get(getStocksForDeductiondetails);
router.route("/deductStock").post(deductStockQuantity);



export { router }