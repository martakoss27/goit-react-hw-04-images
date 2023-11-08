import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ image, onImageClick }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css['ImageGalleryItem-image']}
        src={image.webformatURL}
        alt={image.tags}
        onClick={onImageClick(image)}
        loading="lazy"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
