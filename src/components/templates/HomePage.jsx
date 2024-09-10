import { useEffect, useState } from "react";

import { Search } from "../modules/Search";
import { TableCoin } from "../modules/TableCoin";
import { Pagination } from "../modules/Pagination";
import { Chart } from "../modules/Chart";

import { getCoinList } from "../../services/cryptoApi";

const CURRENCY_SYMBOL = {
  usd: "$",
  eur: "€",
  jpy: "¥",
};

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
        const json = await res.json();
        setCoins(json);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, currency]);

  return (
    <div>
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
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}
