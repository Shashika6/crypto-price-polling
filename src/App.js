import "./App.css";
import { useState, useEffect } from "react";

const axios = require("axios");

const App = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(undefined);
  const [refresh, setRefresh] = useState(false);

  const fetchCrypto = async () => {
    let response;
    try {
      setRefresh(true);
      response = await axios.get(
        "https://api.coinbase.com/v2/prices/spot?currency=USD",
        {}
      );
      /// Coinbase returns and object with the response as data data.
      setBitcoinPrice(response.data.data);
      setRefresh(false);
    } catch (error) {
      // logs the error and removes the existing btc value if response is empty
      console.log(error);
      setBitcoinPrice(undefined);
      setRefresh(true);
    }
  };

  useEffect(() => {
    // Five seconds in milliseconds
    const FIVE_SECONDS = 5000;
    const interval = setInterval(() => {
      fetchCrypto();
    }, FIVE_SECONDS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      {refresh && !bitcoinPrice ? (
        <>Loading...</>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Currency</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bitcoinPrice.base}</td>
              <td>{bitcoinPrice.currency}</td>
              <td>{bitcoinPrice.amount}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
