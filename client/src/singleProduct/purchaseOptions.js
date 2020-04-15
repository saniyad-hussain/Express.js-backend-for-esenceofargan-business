import React from 'react';
import ReactDOM from 'react-dom';
import { FORM_ERROR } from 'final-form';
import { Form, useForm } from 'react-final-form';
import styles from './purchase-options.scss';
import { post } from '../util/http';
import SelectOption from './SelectOption';
import QuantitySelector from './QuantitySelector';
import log from '../util/logging';
import dispatch from '../util/dispatch';

const purchaseOptionsRoot = document.querySelector('[data-js-id="productPurchaseOptions"]');

export default ({ product }) => {

  const onSubmit = values => {
    Promise.resolve().then(() => {
      return post('/api/mock/', {
        sku: product.id,
        quantity: values.quantity,
        option: values.purchaseOption,
      });
    }).catch(error => {
      return { error };
    }).then(({ res, data, error }) => {
      if (error) {
        log(error);
        return {
          [FORM_ERROR]: 'Network error, please check your connection and try again.',
        };
      }
      if (!res.ok) {
        if (data.error) {
          return {
            [FORM_ERROR]: data.error,
          };
        } else {
          return {
            [FORM_ERROR]: 'Something went wrong processing your request, please refresh the page and try again.',
          };
        }
      }
      dispatch('/header/cartDropdown/open-cart');
      return undefined;
    });
  };

  const OnSuccess = () => {
    const form = useForm();
    const success = form.submitSucceeded;
    if (success) {
      return (
        <div style={{ position: 'absolute', width: '100%', textAlign: 'center' }}>
          <span style={{ border: 'solid 1px lightgreen' }}>Checkmark</span>
        </div>
      );
    }
    return null;
  };

  const initialValues = {
    purchaseOption: 'onetime',
    quantity: 1,
  };

  const PurchaseOptions = () => {
    return (
      <Form
        onSubmit={onSubmit}
        className={styles.purchaseOptions}
        initialValues={initialValues}
      >
        {({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.selectOptions}>
              <SelectOption type="One time purchase" value="onetime" price={`$${product.price}`} />
              <SelectOption type="Subscribe and save 66%" value="subscribe" price={`$${product.subscriptionPrice}`} />
            </div>
            <div className={styles.formButtons}>
              <QuantitySelector />
              <button
                type="submit"
                className={styles.submitButton}
              >
                Add to bag
              </button>
            </div>
            {form.submitError && (
              <div>
                {form.submitError}
              </div>
            )}
            <OnSuccess />
          </form>
        )}
      </Form>
    );
  };

  ReactDOM.render(<PurchaseOptions />, purchaseOptionsRoot);
};
