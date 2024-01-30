/**
 * Module for fetching images from the Pixabay API.
 * @module fetchImages
 */

import axios from 'axios';

/**
 * Pixabay API key for authentication.
 * @constant {string}
 */
const API_KEY = '41006597-e52c63fe5093395ccafd50f48';

// Set the base URL for all Pixabay API requests
axios.defaults.baseURL = 'https://pixabay.com/api';

/**
 * Number of images to be displayed per page.
 * @constant {number}
 */
const PER_PAGE = 12;

/**
 * Fetches images from the Pixabay API based on the specified search query and page number.
 *
 * @async
 * @function
 * @param {string} searchQuery - The search query for images.
 * @param {number} currentPage - The current page number.
 * @returns {Promise<Object>} - A Promise that resolves to the response data from the Pixabay API.
 * @throws {Error} - Throws an error if the API request fails.
 */
const fetchImages = async (searchQuery, currentPage) => {
  /**
   * Parameters for the Pixabay API request.
   */
  const params = {
    q: searchQuery, // The search query.
    page: currentPage, // The current page number.
    key: API_KEY, // The Pixabay API key.
    image_type: 'photo', // The type of images to retrieve (photo).
    orientation: 'horizontal', // The orientation of the images (horizontal).
    per_page: PER_PAGE, // The number of images to be displayed per page.
    safesearch: true, // Enable or disable safe search.
  };

  /**
   * Axios response from the Pixabay API.
   * @type {Object}
   */
  const response = await axios.get('/', { params });

  return response.data;
};

/**
 * Exports the fetchImages function as the default export of the module.
 */
export default fetchImages;
