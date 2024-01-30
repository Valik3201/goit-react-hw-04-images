import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Col,
  Row,
  Form,
  Navbar,
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';

/**
 * React component representing the search bar in the application.
 * @class
 * @extends Component
 */
class Searchbar extends Component {
  constructor(props) {
    super(props);

    // Initial state with default theme as 'light' and an empty search query
    this.state = {
      theme: 'light',
      searchQuery: '',
    };

    // Array of radio button options for theme selection
    this.radios = [
      { name: 'Light', value: 'light' },
      { name: 'Dark', value: 'dark' },
    ];
  }

  /**
   * Lifecycle method called after the component has been inserted into the DOM.
   * Listens for changes in the system's color scheme and adjusts the theme accordingly.
   * @function
   * @returns {void}
   */
  componentDidMount() {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    // Handle initial theme setup
    this.handleThemeChange(prefersDarkMode ? 'dark' : 'light');

    // Add event listener for changes in the system's color scheme
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.handleSystemThemeChange);
  }

  /**
   * Lifecycle method called before the component is removed from the DOM.
   * Removes the event listener for changes in the system's color scheme.
   * @function
   * @returns {void}
   */
  componentWillUnmount() {
    // Remove event listener for changes in the system's color scheme
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this.handleSystemThemeChange);
  }

  /**
   * Event handler for changes in the system's color scheme.
   * Adjusts the theme based on the system's color scheme.
   * @function
   * @param {Object} e - Event object.
   * @returns {void}
   */
  handleSystemThemeChange = e => {
    const prefersDarkMode = e.matches;
    this.handleThemeChange(prefersDarkMode ? 'dark' : 'light');
  };

  /**
   * Event handler for manual changes in the theme.
   * Updates the component state, sets the theme in the document, and adjusts the body background color.
   * @function
   * @param {string} selectedTheme - The selected theme ('light' or 'dark').
   * @returns {void}
   */
  handleThemeChange = selectedTheme => {
    this.setState({ theme: selectedTheme });

    // Set theme in the document
    document.documentElement.setAttribute('data-bs-theme', selectedTheme);

    // Adjust body background color
    document.body.className = `bg-${selectedTheme}`;
  };

  /**
   * Event handler for changes in the search input.
   * Updates the component state with the current search query.
   * @function
   * @param {Object} e - Event object.
   * @returns {void}
   */
  handleInputChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  /**
   * Event handler for form submission.
   * Calls the onSubmit function from props with the current search query.
   * @function
   * @param {Object} e - Event object.
   * @returns {void}
   */
  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { searchQuery } = this.state;

    onSubmit(searchQuery);
  };

  /**
   * Renders the Searchbar component.
   * @function
   * @returns {JSX.Element} - The rendered React element.
   */
  render() {
    const { theme, searchQuery } = this.state;

    return (
      <Navbar bg={theme} variant={theme} fixed="top">
        <Container className="justify-content-center pt-1 pb-1">
          <Row className="justify-content-between mb-2 mb-md-0 align-items-center w-100">
            <Col xs={2} className="ps-0">
              <Navbar.Brand>Image Finder</Navbar.Brand>
            </Col>

            <Col xs={2} md={{ order: 'last' }} className="pe-0">
              {/* ButtonGroup for theme selection */}
              <ButtonGroup className="mb-2 mb-md-0 d-flex justify-content-end">
                {this.radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`theme-radio-${idx}`}
                    type="radio"
                    variant={`outline-${theme === 'light' ? 'dark' : 'light'}`}
                    name="theme"
                    value={radio.value}
                    checked={theme === radio.value}
                    onChange={() => this.handleThemeChange(radio.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>

            <Col xs={12} md={6} className="ps-0 pe-0">
              {/* Search form */}
              <Form onSubmit={this.handleSubmit} className="d-flex">
                {/* Search input */}
                <Form.Control
                  type="text"
                  autoComplete="off"
                  autoFocus
                  placeholder="Search images and photos"
                  className="me-2"
                  aria-label="Search"
                  bg={theme}
                  value={searchQuery}
                  onChange={this.handleInputChange}
                />

                {/* Search button */}
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }
}

/**
 * PropTypes for the Searchbar component.
 * @static
 * @type {Object}
 */
Searchbar.propTypes = {
  /**
   * Function to be called when the search form is submitted.
   */
  onSubmit: PropTypes.func.isRequired,
};

/**
 * Exporting the Searchbar component as the default export of the module.
 */
export default Searchbar;
