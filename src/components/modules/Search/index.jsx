import { useEffect, useState } from "react";

import { RotatingLines } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";

import { searchCoin } from "../../../services/cryptoApi";

import { CURRENCY_SYMBOL } from "../../../services/currencySymbol";

import "react-toastify/dist/ReactToastify.css";

import styles from "./Search.module.css";

export const Search = ({ currency, setCurrency, setElement }) => {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const currencyHandler = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    setElement(CURRENCY_SYMBOL[selectedCurrency]);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (!text) {
      setIsLoading(false);
      setCoins([]);
      return;
    }
    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const data = await res.json();
        setIsLoading(false);
        setCoins(data.coins);
      } catch (error) {
        if (error.name != "AbortError") {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    };
    setIsLoading(true);
    search();
    return () => {
      controller.abort();
    };
  }, [text]);

  return (
    <>
      <ToastContainer />
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select value={currency} onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="jpy">JPY</option>
        </select>
        {(!!coins.length || isLoading) && (
          <div className={styles.searchResult}>
            {isLoading && (
              <RotatingLines
                width="50px"
                height="50px"
                strokeColor="#3874ff"
                strokeWidth="2"
              />
            )}
            <ul>
              {coins.map(({ id, thumb, name }) => (
                <li key={id}>
                  <img src={thumb} alt={name} />
                  <p>{name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
