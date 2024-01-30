import PropTypes from 'prop-types';
import { Container, Row, Col, Alert } from 'react-bootstrap';

/**
 * React component representing an error alert with a message.
 * @function
 * @param {Object} props - React component properties.
 * @param {string} props.errorMessage - The error message to be displayed.
 * @returns {JSX.Element} - The rendered React element.
 */
function ErrorAlert({ errorMessage }) {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          {/* Bootstrap Alert component with a danger variant */}
          <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>{errorMessage}</p>
            <hr />
            <p className="mb-0">
              Please try again or check your internet connection.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

/**
 * PropTypes for the ErrorAlert component.
 * @static
 * @type {Object}
 */
ErrorAlert.propTypes = {
  /**
   * The error message to be displayed in the alert.
   */
  errorMessage: PropTypes.string.isRequired,
};

/**
 * Exporting the ErrorAlert component as the default export of the module.
 */
export default ErrorAlert;
