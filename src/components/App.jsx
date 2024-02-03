import React, { useState, useEffect, useCallback } from 'react';
import fetchImages from 'services/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImagePortalWelcome from './ImagePortalWelcome';
import LoadMoreBtn from './Button';
import SearchResultInfo from './SearchResultInfo';
import ErrorAlert from './ErrorAlert';
import NoResultsAlert from './NoResultsAlert';
import Loader from './Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

/**
 * Main application component for the Image Finder.
 * @returns {JSX.Element} - The rendered React element.
 */
const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  /**
   * Fetches images from the API based on the search query and current page.
   * @function
   * @returns {void}
   */
  const getImages = useCallback(async () => {
    if (!searchQuery) {
      return;
    }

    try {
      setIsLoading(true);

      const { hits, totalHits } = await fetchImages(searchQuery, currentPage);

      setImages(prevImages => [...prevImages, ...hits]);
      setError(null);
      setTotalHits(totalHits || 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, currentPage]);

  /**
   * Loads more images by incrementing the current page.
   * @function
   * @returns {void}
   */
  const loadMoreImages = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  /**
   * Handles form submission for a new search query.
   * Resets state and triggers a new image search.
   * @function
   * @param {string} newSearchQuery - The new search query.
   * @returns {void}
   */
  const handleSubmit = newSearchQuery => {
    if (newSearchQuery === searchQuery) {
      return;
    }

    setSearchQuery(newSearchQuery);
    setImages([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />

      <Container className="d-flex flex-column justify-content-center mb-5 mx-auto">
        {isLoading && <Loader />}
        {error && <ErrorAlert errorMessage={error} />}
        {images.length > 0 && !error && (
          <>
            <SearchResultInfo searchQuery={searchQuery} totalHits={totalHits} />
            <ImageGallery images={images} />
            {totalHits > images.length && (
              <LoadMoreBtn onClick={loadMoreImages} />
            )}
          </>
        )}
        {!error && searchQuery && totalHits === 0 && (
          <NoResultsAlert searchQuery={searchQuery} />
        )}
        {!searchQuery && <ImagePortalWelcome />}
      </Container>
    </>
  );
};

export default App;
