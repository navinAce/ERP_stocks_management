import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";

function AddStocks() {
  const StockNameRef = useRef(null);
  const actualPriceRef = useRef(null);
  const sellingPriceRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [quantity, setQuantity] = useState("");

  const addProductionURL="https://erp-stocks-management.onrender.com/add"
  const getStocksProductionURL="https://erp-stocks-management.onrender.com/getStocks"
  const addQuantityProductionURL="https://erp-stocks-management.onrender.com/addQuantity"

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const StockName = StockNameRef.current.value;
    const actualPrice = actualPriceRef.current.value;
    const sellingPrice = sellingPriceRef.current.value;
    const data = {
      StockName,
      actualPrice,
      sellingPrice,
    };
    console.log(data);
    AddStockData(data);
    clearForm();
    setShowModal(true);
  };

  const AddStockData = useCallback(async (data) => {
    try {
      await axios.post(addProductionURL, data).then((response) => {
        console.log("Stocks added successfully:", response.data);
      });
    } catch (error) {
      console.error("Error adding stock:", error);
    }
    fetchStocks();
  }, []);

  const clearForm = () => {
    StockNameRef.current.value = "";
    actualPriceRef.current.value = "";
    sellingPriceRef.current.value = "";
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchStocks = async () => {
    try {
      await axios.get(getStocksProductionURL).then((response) => {
        setStocks(response.data);
      });
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedStocks(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((stockId) => stockId !== id) // remove if already selected
          : [...prevSelected, id] // add if not selected
    );
  };

  const handleAddStockClick = () => {
    setShowQuantityInput((prev) => !prev); // Show the input field when button is clicked
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value); // Update quantity value based on input
  };

  const addStockQuantity =useCallback( async () => {
    if (!quantity || quantity <= 0 || (selectedStocks.length === 0)){
      alert("Please select and enter a quantity.");
      return;
    }
    try {
      await axios
        .post(addQuantityProductionURL, { selectedStocks, quantity })
        .then((response) => {
          console.log("Stock quantity added successfully:", response.data);
        });
      setSelectedStocks([]);
      setQuantity("");
      setShowQuantityInput(false);
      fetchStocks();
    } catch (error) {
      console.error("Error adding stock quantity:", error);
      
    }
  }, [quantity, selectedStocks]);

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="m-4 grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div>
            <label htmlFor="StockName" className="sm:text-sm text-xs">
              Stock Name
            </label>
            <input
              type="text"
              id="StockName"
              className="p-1 m-2 border-2 border-gray-400 rounded-md text-black bg-white w-full text-sm"
              required
              pattern=".{3,}"
              title="Stock name must be at least 3 characters long"
              ref={StockNameRef}
            />
          </div>

          <div>
            <label htmlFor="actualPrice" className="sm:text-sm text-xs">
              Actual Price
            </label>
            <input
              type="text"
              id="actualPrice"
              className="p-1 m-2 border-2 border-gray-400 rounded-md text-black bg-white w-full text-sm"
              required
              pattern="^\d+(\.\d{1,2})?$"
              title="Actual Price must be a number with up to two decimal places"
              ref={actualPriceRef}
            />
          </div>

          <div>
            <label htmlFor="sellingPrice" className="sm:text-sm text-xs">
              Selling Price
            </label>
            <input
              type="text"
              id="sellingPrice"
              className="p-1 m-2 border-2 border-gray-400 rounded-md text-black bg-white w-full text-sm"
              required
              pattern="^\d+(\.\d{1,2})?$"
              title="Selling Price must be a number with up to two decimal places"
              ref={sellingPriceRef}
            />
          </div>

          <div className="flex items-center justify-center sm:m-6">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs sm:text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add Stock
            </button>
          </div>
        </div>
      </form>

      {/* <div className="m-4">
        <label htmlFor="stockDate" className="sm:text-sm text-xs">
          Stock Date
        </label>
        <input
          type="date"
          id="stockDate"
          className="p-1 m-2 border-2 border-gray-400 rounded-md text-black bg-white  text-sm"
          required
        />
      </div> */}

      <div className="m-4">
        <button
          onClick={handleAddStockClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs sm:text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Stock Quantity
        </button>
        {showQuantityInput && (
          <div className="mt-4">
            <input
              type="number"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="p-1 m-2 border-2 border-gray-400 rounded-md text-black bg-white w-full sm:w-96 text-sm"
            />
            <button
              onClick={addStockQuantity}
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs sm:text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Submit Quantity
            </button>
          </div>
        )}
      </div>

      {/* Display the Stocks in Table Format */}
      <div className="m-4">
        <h2 className="text-lg font-semibold">Available Stock List</h2>
        <table className="table-auto w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Click for add stock</th>
              <th className="border px-4 py-2">Stock Name</th>
              <th className="border px-4 py-2">Actual Price</th>
              <th className="border px-4 py-2">Selling Price</th>
              <th className="border px-4 py-2">Current Quantity</th>
            </tr>
          </thead>
          <tbody>
            {stocks && stocks.length > 0 ? (
              stocks.map((stock) => (
                <tr key={stock.id}>
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(stock.id)}
                      checked={selectedStocks.includes(stock.id)}
                    />
                  </td>
                  <td className="border px-4 py-2">{stock.name}</td>
                  <td className="border px-4 py-2">{stock.actual_price}</td>
                  <td className="border px-4 py-2">{stock.selling_price}</td>
                  <td className="border px-4 py-2">{stock.current_quantity}</td>
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md sm:w-full max-w-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-black font-bold">Success!</h2>
            <p className="text-black">Stock added successfully!</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 p-2 m-2 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { AddStocks };
