import React from 'react';
import { useField } from 'react-final-form';
import styles from './purchase-options.scss';

const RadioButton = ({ value }) => {
  return (
    <svg viewBox="0 0 30 30" className={styles.radioButton}>
      <circle cx="15" cy="15" r="14" stroke="black" fill="transparent" strokeWidth="1"/>
      {value && (
        <circle cx="15" cy="15" r="7" fill="black" strokeWidth="0"/>
      )}
    </svg>
  );
};

const SelectOption = ({
  type,
  price,
  value,
}) => {
  const { input } = useField('purchaseOption', { type: 'radio', value });
  return (
    <label className={styles.selectOption}>
      <input type="radio" className="sr-only" {...input} />
      <RadioButton value={input.checked} />
      <div className={styles.purchaseOptionsLabel}>
        <span className={styles.purchaseTypeLabel}>{type}</span>
        <span className={styles.purchaseTypePrice}>{price}</span>
      </div>
    </label>
  );
};

export default SelectOption;
