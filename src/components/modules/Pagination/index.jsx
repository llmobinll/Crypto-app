import styles from "./Pagination.module.css";

export const Pagination = ({ page, setPage }) => {
  const previousHandler = () => setPage((page) => page - 1);

  const nextHandler = () => {
    if (page >= 10) {
      return;
    }
    setPage((page) => page + 1);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.off}
        onClick={previousHandler}
        disabled={page === 1}
      >
        Previous
      </button>
      <p className={page === 1 ? styles.selected : ""}>1</p>
      <p className={page === 2 ? styles.selected : ""}>2</p>
      <span>...</span>
      {page > 2 && page < 9 && (
        <>
          <p className={page === page ? styles.selected : ""}>{page}</p>
          <span>...</span>
        </>
      )}
      <p className={page === 9 ? styles.selected : ""}>9</p>
      <p className={page === 10 ? styles.selected : ""}>10</p>
      <button
        className={styles.off}
        disabled={page === 10}
        onClick={nextHandler}
      >
        Next
      </button>
    </div>
  );
};
