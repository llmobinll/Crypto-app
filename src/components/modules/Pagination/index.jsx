import { useState } from "react";
import { getCoinList } from "../../../services/cryptoApi";

import styles from "./Pagination.module.css";

export const Pagination = ({ page, setPage }) => {
  const previousHandler = () => {
    if (page <= 1) {
      return;
    } else {
      setPage((page) => page - 1);
    }
  };

  const nextHandler = () => {
    if (page >= 10) {
      return;
    }
    setPage((page) => page + 1);
  };

  return (
    <div className={styles.container}>
      <button
        className={page === 1 ? styles.disabled : null}
        onClick={previousHandler}
      >
        Previous
      </button>
      <p className={page === 1 ? styles.selected : null}>1</p>
      <p className={page === 2 ? styles.selected : null}>2</p>
      <span>...</span>
      {page > 2 && page < 9 && (
        <>
          <p className={page === page ? styles.selected : null}>{page}</p>
          <span>...</span>
        </>
      )}
      <p className={page === 9 ? styles.selected : null}>9</p>
      <p className={page === 10 ? styles.selected : null}>10</p>

      <button
        className={page === 10 ? styles.disabled : null}
        onClick={nextHandler}
      >
        Next
      </button>
    </div>
  );
};
