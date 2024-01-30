import PropTypes from 'prop-types';
import { Container, Row, Col, Alert } from 'react-bootstrap';

/**
 * React component displaying information about the search results.
 * @function
 * @param {Object} props - React component properties.
 * @param {string} props.searchQuery - The search query for which results are displayed.
 * @param {number} props.totalHits - The total number of search results.
 * @returns {JSX.Element} - The rendered React element.
 */
const SearchResultInfo = ({ searchQuery, totalHits }) => (
  <Row>
    {/* Container for the search result info */}
    <Container>
      <Row className="justify-content-center text-center">
        <Col xs="auto">
          {/* Bootstrap Alert component with a primary variant */}
          <Alert variant="primary">
            Showing <span className="fw-bold">{totalHits}</span> results for
            <span className="fw-bold"> {searchQuery}</span>
          </Alert>
        </Col>
      </Row>
    </Container>
  </Row>
);

/**
 * PropTypes for the SearchResultInfo component.
 * @static
 * @type {Object}
 */
SearchResultInfo.propTypes = {
  /**
   * The search query for which results are displayed.
   */
  searchQuery: PropTypes.string.isRequired,
  /**
   * The total number of search results.
   */
  totalHits: PropTypes.number.isRequired,
};

/**
 * Exporting the SearchResultInfo component as the default export of the module.
 */
export default SearchResultInfo;
