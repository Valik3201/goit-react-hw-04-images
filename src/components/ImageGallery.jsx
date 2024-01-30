import PropTypes from 'prop-types';
import { Component } from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { ImageModal } from './Modal';

/**
 * React component representing an image gallery.
 * @class
 * @extends Component
 */
class ImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selectedImage: null,
    };
  }

  /**
   * Opens the modal with the selected image.
   * @function
   * @param {Object} image - The selected image to be displayed in the modal.
   * @returns {void}
   */
  openModal = image => {
    this.setState({
      showModal: true,
      selectedImage: image,
    });
  };

  /**
   * Closes the modal.
   * @function
   * @returns {void}
   */
  closeModal = () => {
    this.setState({
      showModal: false,
      selectedImage: null,
    });
  };

  /**
   * Renders the ImageGallery component.
   * @function
   * @returns {JSX.Element} - The rendered React element.
   */
  render() {
    const { images } = this.props;
    const { showModal, selectedImage } = this.state;

    return (
      <Row>
        {/* Container for the image gallery */}
        <Container className="justify-content-center">
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {/* Map through the images array and render ImageGalleryItem for each image */}
            {images.map(
              ({
                id,
                webformatURL,
                largeImageURL,
                tags,
                user,
                userImageURL,
              }) => (
                <ImageGallery.Item
                  key={id}
                  id={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                  user={user}
                  userImageURL={userImageURL}
                  openModal={this.openModal}
                />
              )
            )}
          </Row>

          {/* ImageModal component for displaying a larger image in a modal */}
          <ImageModal
            showModal={showModal}
            selectedImage={selectedImage}
            closeModal={this.closeModal}
          />
        </Container>
      </Row>
    );
  }
}

/**
 * PropTypes for the ImageGallery component.
 * @static
 * @type {Object}
 */
ImageGallery.propTypes = {
  /**
   * Array of images to be displayed in the gallery.
   */
  images: PropTypes.array.isRequired,
};

/**
 * React component representing an item in the ImageGallery.
 * @class
 * @extends Component
 */
class ImageGalleryItem extends Component {
  /**
   * Renders the ImageGalleryItem component.
   * @function
   * @returns {JSX.Element} - The rendered React element.
   */
  render() {
    const { id, largeImageURL, tags, openModal, user, userImageURL } =
      this.props;

    return (
      <Col
        key={id}
        onClick={() =>
          openModal({ id, largeImageURL, tags, user, userImageURL })
        }
      >
        {/* Image component displaying the image with a rounded border */}
        <Image
          src={largeImageURL}
          alt={tags}
          role="button"
          rounded
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        />
      </Col>
    );
  }
}

/**
 * PropTypes for the ImageGalleryItem component.
 * @static
 * @type {Object}
 */
ImageGalleryItem.propTypes = {
  /**
   * Unique identifier for the image.
   */
  id: PropTypes.number.isRequired,
  /**
   * URL of the large version of the image.
   */
  largeImageURL: PropTypes.string.isRequired,
  /**
   * Tags associated with the image.
   */
  tags: PropTypes.string.isRequired,
  /**
   * Function to be called when the image is clicked, opening the modal.
   */
  openModal: PropTypes.func.isRequired,
  /**
   * User information associated with the image.
   */
  user: PropTypes.string.isRequired,
  /**
   * URL of the user's profile image.
   */
  userImageURL: PropTypes.string.isRequired,
};

/**
 * Assigns the ImageGalleryItem component as a property of the ImageGallery component.
 */
ImageGallery.Item = ImageGalleryItem;

/**
 * Exporting the ImageGallery component as the default export of the module.
 */
export default ImageGallery;
