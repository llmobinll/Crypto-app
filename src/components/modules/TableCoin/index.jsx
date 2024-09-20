import { RotatingLines } from "react-loader-spinner";

import { TableRow } from "./../TableRow";

import styles from "./TableCoin.module.css";

export const TableCoin = ({ coins, isLoading, setChart, element }) => {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#3874ff" strokeWidth="2.5" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                coin={coin}
                key={coin.id}
                setChart={setChart}
                element={element}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
