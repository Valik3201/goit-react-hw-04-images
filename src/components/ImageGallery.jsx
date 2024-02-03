import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { ImageModal } from './Modal';

/**
 * Represents an individual item in the ImageGallery.
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.id - The unique identifier for the image.
 * @param {string} props.largeImageURL - The URL of the large version of the image.
 * @param {string} props.tags - Tags associated with the image.
 * @param {Function} props.openModal - Function to be called when the image is clicked, opening the modal.
 * @param {string} props.user - User information associated with the image.
 * @param {string} props.userImageURL - URL of the user's profile image.
 * @returns {JSX.Element} - The rendered React element.
 */
const ImageGalleryItem = ({
  id,
  largeImageURL,
  tags,
  openModal,
  user,
  userImageURL,
}) => (
  <Col
    key={id}
    onClick={() => openModal({ id, largeImageURL, tags, user, userImageURL })}
  >
    <Image
      src={largeImageURL}
      alt={tags}
      role="button"
      rounded
      style={{ objectFit: 'cover', height: '100%', width: '100%' }}
    />
  </Col>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  userImageURL: PropTypes.string.isRequired,
};

/**
 * Represents a gallery of images.
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.images - Array of images to be displayed in the gallery.
 * @returns {JSX.Element} - The rendered React element.
 */
const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   * Opens the modal with the selected image.
   * @param {Object} image - The selected image.
   * @returns {void}
   */
  const openModal = image => {
    setShowModal(true);
    setSelectedImage(image);
  };

  /**
   * Closes the modal.
   * @returns {void}
   */
  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <Row>
      <Container className="justify-content-center">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {images.map(
            ({ id, webformatURL, largeImageURL, tags, user, userImageURL }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                user={user}
                userImageURL={userImageURL}
                openModal={openModal}
              />
            )
          )}
        </Row>
        <ImageModal
          showModal={showModal}
          selectedImage={selectedImage}
          closeModal={closeModal}
        />
      </Container>
    </Row>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
