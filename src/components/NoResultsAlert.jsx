import PropTypes from 'prop-types';
import { Container, Row, Col, Alert } from 'react-bootstrap';

/**
 * React component representing an alert when no search results are found.
 * @function
 * @param {Object} props - React component properties.
 * @param {string} props.searchQuery - The search query for which no results were found.
 * @returns {JSX.Element} - The rendered React element.
 */
const NoResultsAlert = ({ searchQuery }) => {
  return (
    <Row>
      {/* Container for the alert */}
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            {/* Bootstrap Alert component with a warning variant */}
            <Alert variant="warning">
              <Alert.Heading>Oops!</Alert.Heading>
              <p>
                We couldn't find any results for{' '}
                <span className="fw-bold">{searchQuery}</span>.
              </p>
              <hr />
              <p className="mb-0">Please try a different search term.</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

/**
 * PropTypes for the NoResultsAlert component.
 * @static
 * @type {Object}
 */
NoResultsAlert.propTypes = {
  /**
   * The search query for which no results were found.
   */
  searchQuery: PropTypes.string.isRequired,
};

/**
 * Exporting the NoResultsAlert component as the default export of the module.
 */
export default NoResultsAlert;
