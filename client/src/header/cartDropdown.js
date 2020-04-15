import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './cart-dropdown.scss';
import dispatch from '../util/dispatch';

const products = [
  'Organic Culinary Argan Oil',
  'Peach tree extract',
  'Poison Apple',
  'Large Rat',
];

const containerEl = document.getElementById('header-nav-cart-container');
const cartLinkEl = document.getElementById('header-nav-cart-link');
const linkClassName = cartLinkEl.className;

const OriginalLink = React.memo(({ onOpen }) => {
  return (
    <a
      id="header-nav-cart-link"
      href=""
      className={linkClassName}
      onMouseOver={onOpen}
      // onMouseOut={onClose}
    >
      My Bag (0)
    </a>
  );
});

const FocusVisibleButton = (props) => {
  const [isFocused, setFocus] = React.useState(false);
  return (
    <button
      type="button"
      {...props}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={classNames(props.className, !isFocused && 'sr-only')}
    />
  );
};

const CartDropdown = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [onOpen, onClose] = React.useMemo(() => {
    return [
      () => setOpen(true),
      () => setOpen(false),
    ];
  }, []);
  React.useEffect(() => {
    containerEl.addEventListener('mouseleave', onClose);
    const unsubscribe = dispatch.subscribe('/header/cartDropdown/open-cart', onOpen);
    return () => {
      containerEl.removeEventListener('mouseleave', onClose);
      unsubscribe();
    };
  }, []);
  return (
    <>
      <OriginalLink onOpen={onOpen} />
      <FocusVisibleButton
        onClick={isOpen ? onClose : onOpen}
        className={styles.openCartPreviewButton}
      >
        {`${isOpen ? 'Close' : 'Open'} Bag Preview`}
      </FocusVisibleButton>
      <div className={classNames(styles.dropdownContainer, isOpen && styles.open)}>
        <div className={styles.cartPreviewHeader}>
          <h3>My Bag</h3>
          <button
            type="button"
            onClick={onClose}
            className={styles.cartPreviewCloseButton}
          >
            <span className="sr-only">Close Bag</span>
            X
          </button>
        </div>
        <div className={styles.cartPreviewItems}>
          <ul>
            {products.map((name, index) => <li key={index}>{name}
                <button
                  type="button"
                  onClick={onClose}
                  className={styles.cartPreviewCloseButton}
                >
                <span className="sr-only">Close Bag</span>
                 X
              </button>
            </li>)}
          </ul>
        </div>
        <div className={styles.cartPreviewFooter}>
          <p>Subtotal $100.00</p>
          <div>
            <a
              href="/checkout"
              className={styles.cartPreviewCheckoutButton}
            >
              Checkout
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<CartDropdown />, containerEl);
