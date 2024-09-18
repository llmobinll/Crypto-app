import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import { Search } from "../modules/Search";
import { TableCoin } from "../modules/TableCoin";
import { Pagination } from "../modules/Pagination";
import { Modal } from "../modules/Chart";

import { getCoinList } from "../../services/cryptoApi";

import { CURRENCY_SYMBOL } from "../../services/currencySymbol";

import "react-toastify/dist/ReactToastify.css";

export function Homepage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);
  const [element, setElement] = useState(CURRENCY_SYMBOL["usd"]);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(getCoinList(page, currency));
        const data = await res.json();
        setCoins(data);

        setIsLoading(false);
      } catch (error) {
        console.log();
      }
    };
    fetchData();
  }, [page, currency]);

  return (
    <div>
      <ToastContainer />
      <Search
        currency={currency}
        setCurrency={setCurrency}
        element={element}
        setElement={setElement}
        CURRENCY_SYMBOL={CURRENCY_SYMBOL}
      />
      <TableCoin
        coins={coins}
        isLoading={isLoading}
        setChart={setChart}
        element={element}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Modal chart={chart} setChart={setChart} />}
    </div>
  );
}
