import styles from "./Layouts.module.css";

export const Layouts = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Mobin</p>
      </footer>
    </>
  );
};
