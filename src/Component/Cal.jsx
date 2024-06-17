import { useState } from "react";
import styles from "./calStyles.module.css";

function Cal() {
  // Define denominations in descending order
  const denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1];

  // Initialize state
  const initialState = Object.fromEntries(
    denominations.map((denomination) => [denomination, 0])
  );
  const [values, setValues] = useState(initialState);
  const [total, setTotal] = useState(0);
  const [expected, setExpected] = useState(0);
  const [difference, setDifference] = useState(0);

  // Handle change in denomination input
  const handleChange = (denomination, event) => {
    const value = Number(event.target.value) || 0;
    setValues((prevValues) => {
      const newValues = { ...prevValues, [denomination]: value };
      const newTotal = calculateTotal(newValues);
      setTotal(newTotal);
      setDifference(expected - newTotal); // Calculate difference here
      return newValues;
    });
  };

  // Handle change in expected total input
  const handleExpectedChange = (event) => {
    const value = Number(event.target.value) || 0;
    setExpected(value);
    setDifference(total - value); // Calculate difference as expected - total
  };

  // Calculate total amount based on current values
  const calculateTotal = (values) => {
    return Object.keys(values).reduce((sum, key) => {
      return sum + key * values[key];
    }, 0);
  };

  // Clear all input values and reset state
  const clearValues = () => {
    setValues(initialState);
    setTotal(0);
    setExpected(0);
    setDifference(0);
  };

  return (
    <div className={styles.calContainer}>
      <div className={styles.moneyTemp}>
        <h2>Money Calculator</h2>
        {denominations.map((denomination) => (
          <div className={styles.template} key={denomination}>
            <label className={styles.notesvalue}>{denomination}</label>
            <label>✕</label>
            <input
              type="text"
              placeholder="0"
              className={styles.notes}
              value={values[denomination]}
              onChange={(e) => handleChange(denomination, e)}
            />
            <label>🟰</label>
            <input
              type="text"
              placeholder="0"
              className={styles.notesResult}
              value={denomination * values[denomination]}
              readOnly
            />
          </div>
        ))}

        {/* Result */}
        <div className={styles.Result}>
          <label className={styles.Result}>Result</label>
          <label>🟰</label>
          <input
            type="text"
            placeholder="0"
            className={styles.notesResult}
            value={total}
            readOnly
          />
        </div>
        <div className={styles.Result}>
          <label className={styles.notesvalue}>Expected Result</label>
          <label>🟰</label>
          <input
            type="text"
            placeholder="0"
            className={styles.notesResult}
            value={expected}
            onChange={handleExpectedChange}
          />
        </div>
        <div className={styles.Result}>
          <label className={styles.notesvalue}>Difference</label>
          <label>🟰</label>
          <input
            type="text"
            placeholder="0"
            className={styles.notesResult}
            value={difference}
            readOnly
          />
        </div>
        <button type="button" className={styles.clrbtn} onClick={clearValues}>
          Clear All Values
        </button>
      </div>
    </div>
  );
}

export default Cal;
