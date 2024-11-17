import { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import Select from "react-select";

function Sales() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [quantityRemaining, setQuantityRemaining] = useState(0);
  const [price, setPrice] = useState(0);
  const quantityRef = useRef(null);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("/api/getDeductionDetails");
      if (Array.isArray(response.data)) {
        setStocks(response.data);  // Ensure that it's an array
      } else {
        console.error("Expected an array, but received:", response.data);
        setStocks([]);  // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
      setStocks([]);  // Fallback to empty array on error
    }
  };

  const options = useMemo(() => {
    // Debugging step: log the stocks data before using map
    console.log("Stocks data:", stocks);
    
    if (Array.isArray(stocks)) {
      return stocks.map((stock) => ({
        value: stock.name,
        label: stock.name,
        stock_id: stock.id,
        current_quantity: stock.current_quantity,
        selling_price: stock.selling_price,
      }));
    }
    return [];  // Return empty array if stocks is not an array
  }, [stocks]);

  const handleStockChange = (selected) => {
    setSelectedOption(selected);
    setQuantityRemaining(selected.current_quantity);
    setPrice(selected.selling_price);
  };

  const handleDeductStockClick = async () => {
    const quantity = quantityRef.current.value;
    if (quantity > quantityRemaining) {
      alert("Quantity exceeds remaining stock!");
      return;
    }

    const stock_id = selectedOption.stock_id;
    const data = { stock_id, quantity };

    try {
      await axios.post("/api/deductStock", data);
      alert("Stocks deducted successfully");
      resetAll();
      fetchStocks();
    } catch (error) {
      console.error("Error deducting stock:", error);
    }
  };

  const resetAll = () => {
    setQuantityRemaining(0);
    setPrice(0);
    quantityRef.current.value = "";
    setSelectedOption(null);
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div className="m-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div>
        <label htmlFor="stockSelection" className="sm:text-base text-sm">
          Stocks deduction
        </label>
        <Select
          id="stockSelection"
          value={selectedOption}
          onChange={handleStockChange}
          options={options}
          isSearchable
          placeholder="Select an option..."
          className="border-2 border-gray-400 rounded-md text-black bg-white text-sm w-full"
        />
      </div>
      <div>
        <label htmlFor="quantityRemaining" className="sm:text-base text-sm">
          Quantity Remaining
        </label>
        <input
          type="number"
          id="quantityRemaining"
          className="p-2 border-2 border-gray-400 rounded-md text-black bg-white w-full text-sm h-10"
          value={quantityRemaining || ""}
          placeholder={quantityRemaining || "0"}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="quantity" className="sm:text-base text-sm">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          className="p-2 border-2 border-gray-400 rounded-md text-black bg-white w-full text-sm h-10"
          ref={quantityRef}
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="sm:text-base text-sm">
          Price
        </label>
        <input
          type="number"
          id="price"
          className="p-2 border-2 border-gray-400 rounded-md text-black bg-white w-full text-sm h-10"
          value={price || ""}
          placeholder={price || "0"}
          readOnly
        />
      </div>
      <div className="flex items-end">
        <button
          type="submit"
          className="mt-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs sm:text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleDeductStockClick}
        >
          Deduct Stock
        </button>
      </div>
    </div>
  );
}

export { Sales };


// import { useState, useRef, useEffect, useMemo } from "react";
// import axios from "axios";
// import Select from "react-select";

// function Sales() {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [stocks, setStocks] = useState([]);
//   const [quantityRemaining, setQuantityRemaining] = useState(0);
//   const [price, setPrice] = useState(0);
//   const quantityRef = useRef(null);

//   const fetchStocks = async () => {
//     try {
//       await axios.get("/api/getDeductionDetails").then((response) => {
//         setStocks(response.data);
//       });
//     } catch (error) {
//       console.error("Error fetching stocks:", error);
//     }
//   };

//   const options = useMemo(() => {
//     return (
//       stocks &&
//       stocks.map((stock) => ({
//         value: stock.name,
//         label: stock.name,
//         stock_id: stock.id, 
//         current_quantity: stock.current_quantity,
//         selling_price: stock.selling_price,
//       }))
//     );
//   }, [stocks]);

//   const handleStockChange = (selected) => {
//     setSelectedOption(selected);
//     setQuantityRemaining(selected.current_quantity);
//     setPrice(selected.selling_price);
//   };

//   const handleDeductStockClick = async () => {
//     const quantity = quantityRef.current.value;
  
//   if (quantity > quantityRemaining) {
//     alert("Quantity exceeds remaining stock!");
//     return;
//   }

//     const stock_id = selectedOption.stock_id; 
//     const data = {
//       stock_id,
//       quantity,
//     };
//     console.log("Data:", data);
//     try {
//         await axios.post("/api/deductStock", data)
//         .then((response) => {
//             console.log("Stocks deducted successfully:", response.data);
//           });
//           alert("Stocks deducted successfully");
//           resetAll()
//           fetchStocks();
//     } catch (error) {
//         console.error("Error deducting stock:", error);
//     }
    
//   }
//   const resetAll = () => {
//     setQuantityRemaining(0);
//     setPrice(0);
//     quantityRef.current.value = "";
//     setSelectedOption(null);
//   }

//   useEffect(() => {
//     fetchStocks();
//   }, []);

//   return (
//     <div className="m-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
//       <div>
//         <label htmlFor="stockSelection" className="sm:text-base text-sm ">
//           Stocks deduction
//         </label>
//         <Select
//           id="stockSelection"
//           value={selectedOption}
//           onChange={handleStockChange}
//           options={options}
//           isSearchable
//           placeholder="Select an option..."
//           className="border-2 border-gray-400 rounded-md text-black bg-white text-sm w-full "
//         />
//       </div>
//       <div>
//         <label htmlFor="quantityRemaining" className="sm:text-base text-sm">
//           Quantity Remaining
//         </label>
//         <input
//           type="number"
//           id="quantityRemaining"
//           className="p-2 border-2 border-gray-400 rounded-md text-black bg-white w-full text-sm h-10"
//           value={quantityRemaining || ""}
//           placeholder={quantityRemaining || "0"}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="quantity" className="sm:text-base text-sm">
//           Quantity
//         </label>
//         <input
//           type="number"
//           id="quantity"
//           className="p-2 border-2 border-gray-400 rounded-md text-black bg-white w-full text-sm h-10"
//           ref={quantityRef}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="price" className="sm:text-base text-sm">
//           Price
//         </label>
//         <input
//           type="number"
//           id="price"
//           className="p-2 border-2 border-gray-400 rounded-md text-black bg-white w-full text-sm h-10"
//           value={price || ""}
//           placeholder={price || "0"}
//           readOnly
//         />
//       </div>
//       <div className="flex items-end">
//         <button
//           type="submit"
//           className="mt-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs sm:text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//           onClick={handleDeductStockClick}
//         >
//           Deduct Stock
//         </button>
//       </div>
//     </div>
//   );
// }

// export { Sales };
