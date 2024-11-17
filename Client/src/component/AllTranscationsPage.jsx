import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function AllTranscations() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [totalAddPrice, setTotalAddPrice] = useState(0);
  const [totalDeductPrice, setTotalDeductPrice] = useState(0);
  
  const developmentURL="/api/getTransactions"
  //const productionURL="http://localhost:8000/getTransactions"

  const fetchStocksTransaction = useCallback(async () => {
    await axios
      .get(developmentURL)
      .then((response) => {
        setStocks(response.data);
        setFilteredStocks(response.data);
        calculateTotals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
      });
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    filterStocks(date, selectedType); // Apply both filters
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    filterStocks(selectedDate, type); // Apply both filters
  };

  const filterStocks = (date, type) => {
    let filtered = stocks;

    if (date) {
      filtered = filtered.filter((stock) =>
        stock.transaction_date.startsWith(date)
      );
    }
    if (type !== "all") {
      filtered = filtered.filter((stock) => stock.transaction_type === type);
    }

    setFilteredStocks(filtered);
    calculateTotals(filtered);
  };

  const calculateTotals = (filtered) => {
    const addTotal = filtered
      .filter((stock) => stock.transaction_type === "add")
      .reduce((sum, stock) => sum + Number(stock.price), 0);
    const deductTotal = filtered
      .filter((stock) => stock.transaction_type === "deduct")
      .reduce((sum, stock) => sum + Number(stock.price), 0);

    setTotalAddPrice(addTotal);
    setTotalDeductPrice(deductTotal);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // For 12-hour format, use false for 24-hour
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  useEffect(() => {
    fetchStocksTransaction();
  }, [fetchStocksTransaction]);

  return (
    <div>
      <div className="m-4">
        <label htmlFor="stockDate" className="sm:text-sm text-xs">
          Transcations Date
        </label>
        <input
          type="date"
          id="stockDate"
          className="p-1 m-2 border-2 border-gray-400 rounded-md text-black bg-white  text-sm"
          value={selectedDate}
          onChange={handleDateChange}
          required
        />
      </div>
      <div className="m-4 flex flex-col sm:items-center sm:flex-row gap-4">
        <label htmlFor="transactionType" className="sm:text-sm text-xs">
          Transaction Type
        </label>
        <select
          id="transactionType"
          className="p-1 border-2 border-gray-400 rounded-md text-black bg-white text-sm w-20"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="all">All</option>
          <option value="add">Add</option>
          <option value="deduct">Deduct</option>
        </select>
          <p className="sm:text-base text-sm font-semibold">
            Total Stock Added Price:
          </p>
          <p className="sm:text-base text-sm font-semibold text-rose-300">
          {totalAddPrice}
          </p>
          <p className="sm:text-base text-sm font-semibold">
            Total Sales Price: 
          </p>
          <p className="sm:text-base text-sm font-semibold text-emerald-400">
          {totalDeductPrice}
          </p>
        
      </div>

      <div className="m-4">
        <h2 className="text-lg font-semibold">All Transaction Stock List</h2>
        <table className="table-auto w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Stock Name</th>
              <th className="border px-4 py-2">Transaction Type</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Transaction Date</th>
              <th className="border px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks && filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <tr key={stock.id}>
                  <td className="border px-4 py-2">{stock.name}</td>
                  <td className="border px-4 py-2">{stock.transaction_type}</td>
                  <td className="border px-4 py-2">{stock.quantity}</td>
                  <td className="border px-4 py-2">
                    {formatDate(stock.transaction_date)}
                  </td>
                  <td className="border px-4 py-2">{stock.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No stocks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { AllTranscations };
