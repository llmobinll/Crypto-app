import { marketChart } from "../../../services/cryptoApi";
import styles from "./TableRow.module.css";

export const TableRow = ({ coin, setChart, element }) => {
  const {
    id,
    image,
    symbol,
    name,
    current_price,
    price_change_percentage_24h,
    total_volume,
  } = coin;

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();

      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };
  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {element}
        {current_price.toLocaleString()}
      </td>
      <td
        className={
          price_change_percentage_24h > 0 ? styles.success : styles.field
        }
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>
        {element}
        {total_volume.toLocaleString()}
      </td>
      <td>
        <img
          src={
            price_change_percentage_24h > 0 ? "chart-up.svg" : "chart-down.svg"
          }
        />
      </td>
    </tr>
  );
};
