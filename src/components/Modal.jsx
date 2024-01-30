import PropTypes from 'prop-types';
import { Image, Modal } from 'react-bootstrap';

/**
 * React component representing an image modal.
 * @function
 * @param {Object} props - React component properties.
 * @param {boolean} props.showModal - Flag indicating whether the modal should be displayed.
 * @param {Function} props.closeModal - Function to close the modal.
 * @param {Object} props.selectedImage - The selected image to be displayed in the modal.
 * @returns {JSX.Element} - The rendered React element.
 */
export const ImageModal = ({ showModal, closeModal, selectedImage }) => (
  <Modal show={showModal} onHide={closeModal} size="lg" centered>
    {selectedImage && (
      <>
        {/* Modal header with user image, name, and close button */}
        <Modal.Header closeButton>
          <Image
            src={selectedImage.userImageURL}
            roundedCircle
            width={35}
            height={35}
            className="me-2"
          />
          <Modal.Title>{selectedImage.user}</Modal.Title>
        </Modal.Header>

        {/* Modal body with the large image */}
        <Modal.Body className="p-0">
          <Image
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
            fluid
          />
        </Modal.Body>

        {/* Modal footer with image tags */}
        <Modal.Footer className="justify-content-start">
          {selectedImage.tags}
        </Modal.Footer>
      </>
    )}
  </Modal>
);

/**
 * PropTypes for the ImageModal component.
 * @static
 * @type {Object}
 */
ImageModal.propTypes = {
  /**
   * Flag indicating whether the modal should be displayed.
   */
  showModal: PropTypes.bool.isRequired,
  /**
   * Function to close the modal.
   */
  closeModal: PropTypes.func.isRequired,
  /**
   * The selected image to be displayed in the modal.
   */
  selectedImage: PropTypes.shape({
    /**
     * URL of the user's profile image.
     */
    userImageURL: PropTypes.string.isRequired,
    /**
     * Name of the user associated with the image.
     */
    user: PropTypes.string.isRequired,
    /**
     * URL of the large version of the image.
     */
    largeImageURL: PropTypes.string.isRequired,
    /**
     * Tags associated with the image.
     */
    tags: PropTypes.string.isRequired,
  }),
};

/**
 * Exporting the ImageModal component.
 */
export default ImageModal;
