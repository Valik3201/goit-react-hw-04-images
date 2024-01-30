# React Image Search Application

The React Image Search Application is a client-side, single-page application
built using the React library. The primary objective is to facilitate image
search functionality by interfacing with the Pixabay API, fetching high-quality
images based on user-provided keywords.

[![screenshot](https://github.com/Valik3201/goit-react-hw-03-image-finder/blob/main/assets/1.png)](https://github.com/Valik3201/goit-react-hw-03-image-finder/blob/main/assets/1.png)

## Features

- **Image Search:** Find images by entering keywords in the search bar.

- **Pagination:** Explore multiple pages of search results, each page showcasing
  12 images.

- **Easy-to-Use Interface:** The application features a user-friendly search bar
  for effortless keyword input.

- **Dynamic Image Gallery:** Enjoy a visually appealing gallery that dynamically
  displays a variety of images.

- **Load More:** Click the "Load More" button to reveal additional images and
  enhance your browsing experience.

- **Loading Spinner:** A loading spinner ensures a smooth experience while
  images are being loaded.

- **Modal Display:** Click on any image in the gallery to view a larger version
  in a modal window.

## Usage

1. **Access the Application:**

   - Visit the live application
     [here](https://valik3201.github.io/goit-react-hw-03-image-finder/).

2. **Explore Images:**

   - Enter keywords in the search bar related to the images you're looking for.

3. **Navigate Through Results:**

   - Browse through multiple pages of images by using the pagination controls.

4. **View Larger Images:**

   - Click on any image in the gallery to view a larger version in a modal
     window.

5. **Load More Images:**
   - If you want to see more images, simply click the "Load More" button.

[![screenshot](https://github.com/Valik3201/goit-react-hw-03-image-finder/blob/main/assets/2.png)](https://github.com/Valik3201/goit-react-hw-03-image-finder/blob/main/assets/2.png)

## Project Structure

The project is organized in a clear and modular structure to enhance readability
and maintainability. Below is an overview of the main components and their
responsibilities:

- **`src` Folder:** Contains the source code for the React application.

  - **`components` Subfolder:** Holds individual React components that
    contribute to the application's functionality and appearance.

    - **`Searchbar` Component:**

      - Responsible for creating a user-friendly search interface.
      - Accepts the `onSubmit` prop, a function to handle form submissions.
      - DOM structure includes a header with a form, search input, and a
        "Search" button.

    - **`ImageGallery` Component:**

      - Renders a list of image cards, creating a dynamic gallery.
      - Utilizes the `<ImageGalleryItem>` component to represent each image
        within the gallery.

    - **`ImageGalleryItem` Component:**

      - Represents an individual list item with an image.
      - DOM structure includes a list item (`<li>`) with an image (`<img>`).

    - **`Button` Component:**

      - Handles the "Load More" functionality.
      - Renders the button to load additional images.
      - Only displayed when there are loaded images.

    - **`Loader` Component:**

      - Displays a spinner while images are being loaded.
      - Utilizes a ready-made component, such as `react-loader-spinner`, to
        enhance user experience.

    - **`Modal` Component:**
      - Activated when a gallery item is clicked, displaying a larger version of
        the image.
      - Features a dark overlay and allows users to close the modal window.

  - **`App.js` File:**

    - The main application component where other components are assembled.
    - Manages state, handles API calls, and orchestrates the interaction between
      components.

  - **`api.js` File:**
    - Handles interactions with the Pixabay API.
    - Constructs and sends HTTP requests to fetch images based on user input.

- **`public` Folder:** Contains static assets and the HTML file.
