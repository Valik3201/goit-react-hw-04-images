/**
 * React component representing the main application.
 * @extends Component
 */
import { Component } from 'react';

// Importing the fetchImages function from the services/api module
import fetchImages from 'services/api';

// Importing various React components for the application
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImagePortalWelcome from './ImagePortalWelcome';
import LoadMoreBtn from './Button';
import SearchResultInfo from './SearchResultInfo';
import ErrorAlert from './ErrorAlert';
import NoResultsAlert from './NoResultsAlert';
import Loader from './Loader';

// Importing Bootstrap styles and components
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

/**
 * Main App component representing the image search application.
 * @class
 */
class App extends Component {
  /**
   * State of the App component.
   * @type {Object}
   * @property {Array} images - Array to store fetched images.
   * @property {string} searchQuery - Current search query.
   * @property {number} currentPage - Current page number for paginated results.
   * @property {boolean} isLoading - Flag indicating whether images are being loaded.
   * @property {string|null} error - Error message if image fetching fails.
   * @property {number|null} totalHits - Total number of hits for the current search query.
   */
  state = {
    images: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    error: null,
    totalHits: null,
  };

  /**
   * Fetches images from the Pixabay API based on the current search query and page number.
   * Updates the component state accordingly.
   * @async
   * @function
   * @returns {Promise<void>}
   */
  getImages = async () => {
    const { searchQuery, currentPage } = this.state;

    // If there is no search query, return early
    if (!searchQuery) {
      return;
    }

    try {
      // Set loading state to true
      this.setState({
        isLoading: true,
      });

      // Fetch images from Pixabay API
      const { hits, totalHits } = await fetchImages(searchQuery, currentPage);

      // Append new images to the existing ones
      this.setState(prev => ({
        images: [...prev.images, ...hits],
        error: null,
        totalHits: totalHits || 0,
      }));
    } catch (error) {
      // Handle errors by setting the error state
      this.setState({
        error: error.message,
      });
    } finally {
      // Set loading state to false regardless of success or failure
      this.setState({
        isLoading: false,
      });
    }
  };

  /**
   * Lifecycle method that gets called whenever the component updates.
   * Calls the getImages method if the searchQuery or currentPage changes.
   * @param {Object} _prevProps - Previous properties.
   * @param {Object} prevState - Previous state.
   * @returns {Promise<void>}
   */
  async componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImages();
    }
  }

  /**
   * Updates the currentPage in the state, triggering a new set of images to be fetched.
   * @function
   * @returns {void}
   */
  loadMoreImages = () => {
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }));
  };

  /**
   * Handles form submission, updates the searchQuery, resets images, and sets currentPage to 1.
   * @param {string} searchQuery - The new search query.
   * @returns {void}
   */
  handleSubmit = searchQuery => {
    if (searchQuery === this.state.searchQuery) {
      return;
    }

    this.setState({
      searchQuery: searchQuery,
      images: [],
      currentPage: 1,
    });
  };

  /**
   * Renders the main application component with various child components based on the state.
   * @function
   * @returns {JSX.Element} - The rendered React element.
   */
  render() {
    const { images, searchQuery, isLoading, error, totalHits } = this.state;

    return (
      <>
        {/* Search bar component */}
        <Searchbar onSubmit={this.handleSubmit} />

        {/* Main container for the application */}
        <Container className="d-flex flex-column justify-content-center mb-5 mx-auto">
          {isLoading && <Loader />}{' '}
          {/* Loader component while images are being fetched */}
          {error && <ErrorAlert errorMessage={error} />}{' '}
          {/* Error alert component */}
          {images.length > 0 && !error && (
            <>
              {/* Information about the search results */}
              <SearchResultInfo
                searchQuery={searchQuery}
                totalHits={totalHits}
              />

              {/* Image gallery component */}
              <ImageGallery images={images} />

              {/* Load more button if there are more images to load */}
              {totalHits > images.length && (
                <LoadMoreBtn onClick={this.loadMoreImages} />
              )}
            </>
          )}
          {/* No results alert if no images are found */}
          {!error && searchQuery && totalHits === 0 && (
            <NoResultsAlert searchQuery={searchQuery} />
          )}
          {/* Welcome message for the image portal if no search query is present */}
          {!searchQuery && <ImagePortalWelcome />}
        </Container>
      </>
    );
  }
}

/**
 * Exporting the App component as the default export of the module.
 */
export default App;
