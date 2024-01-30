import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

/**
 * React component representing the "Load More" button for fetching additional images.
 * @function
 * @param {Object} props - React component properties.
 * @param {Function} props.onClick - Function to be called when the button is clicked.
 * @returns {JSX.Element} - The rendered React element.
 */
const LoadMoreBtn = ({ onClick }) => {
  /**
   * Handles the click event on the "Load More" button and invokes the provided onClick function.
   * @function
   * @returns {void}
   */
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <Row>
      {/* Container for the button */}
      <Container>
        <Row className="justify-content-center mt-3">
          {/* Column for responsive layout */}
          <Col xs={12} md="auto">
            {/* Bootstrap Button component with "Load More" label */}
            <Button
              variant="primary"
              className="w-100"
              onClick={handleButtonClick}
            >
              Load More
            </Button>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

/**
 * PropTypes for the LoadMoreBtn component.
 * @static
 * @type {Object}
 */
LoadMoreBtn.propTypes = {
  /**
   * Function to be called when the "Load More" button is clicked.
   */
  onClick: PropTypes.func.isRequired,
};

/**
 * Exporting the LoadMoreBtn component as the default export of the module.
 */
export default LoadMoreBtn;
