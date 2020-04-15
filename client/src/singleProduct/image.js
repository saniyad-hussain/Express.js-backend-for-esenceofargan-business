import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '@reach/dialog/styles.css';
import { Dialog } from '@reach/dialog';
import styles from './image.scss';
import CloseButton from '../util/CloseButton';

const Thumbnails = ({ images, setImage, currentImage }) => {
  return (
    <div className={styles.thumbnails}>
      {images.map((src, index) => {
        const active = currentImage === index;
        return (
          <button
            key={index}
            type="button"
            className={classNames(styles.thumbnailButton, active && styles.activeThumbnailButton)}
            onClick={() => setImage(index)}
            onMouseOver={() => setImage(index)}
          >
            <img
              src={src}
              alt={`Product image #${index + 1}`}
              className={styles.thumbnailImage}
            />
          </button>
        );
      })}
    </div>
  );
};

const Image = ({ images, alt, className }) => {
  const [currentImage, setImage] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [onOpen, onClose] = React.useMemo(() => [
    () => setLightboxOpen(true),
    () => setLightboxOpen(false),
  ], [setLightboxOpen]);
  return (
    <>
      <button
        type="button"
        className={styles.mainImageButton}
        onClick={onOpen}
      >
        <img
          src={images[currentImage]}
          alt={alt}
          className={className}
        />
      </button>
      <Thumbnails images={images} setImage={setImage} currentImage={currentImage} />
      <Dialog
        isOpen={lightboxOpen}
        onDismiss={onClose}
        className={styles.dialog}
      >
        <CloseButton
          onClose={onClose}
          className={styles.closeButton}
        />
        <img
          src={images[currentImage]}
          alt={alt}
          className={styles.largeViewImage}
        />
        <Thumbnails images={images} setImage={setImage} currentImage={currentImage} />
      </Dialog>
    </>
  );
};
Image.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

const productImageRoot = document.querySelector('[data-js-id="productImageContainer"]');

export default ({ product }) => {
  ReactDOM.render((
    <Image
      images={product.images}
      alt={product.name}
      className={product.imageClassName}
    />
  ), productImageRoot);
};
