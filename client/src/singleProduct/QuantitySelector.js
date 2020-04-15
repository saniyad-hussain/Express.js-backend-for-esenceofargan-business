import React from 'react';
import { useField } from 'react-final-form';
import styles from './purchase-options.scss';

const Plus = () => {
  return (
    <svg viewBox="0 0 10 10" className={styles.plusminus}>
      <rect x="4" y="0" width="2" height="10" fill="black" />
      <rect x="0" y="4" width="10" height="2" fill="black" />
    </svg>
  );
};

const Minus = () => {
  return (
    <svg viewBox="0 0 10 10" className={styles.plusminus}>
      <rect x="0" y="4" width="10" height="2" fill="black" />
    </svg>
  );
};

const QuantitySelector = () => {
  const { input } = useField('quantity', { initialValue: 1 });
  const count = input.value;
  return (
    <div className={styles.quantitySelector}>
      <button
        type="button"
        disabled={count <= 1}
        onClick={() => {
          input.onChange(count - 1);
        }}
      >
        <Minus />
        <span className="sr-only">decrease quantity</span>
      </button>
      <span>{count}</span>
      <button
        type="button"
        onClick={() => {
          input.onChange(count + 1);
        }}
      >
        <Plus />
        <span className="sr-only">Increase quantity</span>
      </button>
    </div>
  );
};
export default QuantitySelector;
