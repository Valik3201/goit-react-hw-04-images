import React, { useState, useEffect, useRef } from 'react';
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
 * Represents the search bar component of the application.
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onSubmit - Function to be called when the search form is submitted.
 * @returns {JSX.Element} - The rendered React element.
 */
const Searchbar = ({ onSubmit }) => {
  const [theme, setTheme] = useState('light');

  const radios = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
  ];

  const inputRef = useRef(null);

  /**
   * Handles changes in the theme based on the system's color scheme.
   * @param {string} selectedTheme - The selected theme ('light' or 'dark').
   * @returns {void}
   */
  const handleThemeChange = selectedTheme => {
    setTheme(selectedTheme);
    document.documentElement.setAttribute('data-bs-theme', selectedTheme);
    document.body.className = `bg-${selectedTheme}`;
  };

  /**
   * Handles form submission.
   * Calls the onSubmit function with the current search query.
   * @param {Object} e - Event object.
   * @returns {void}
   */
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputRef.current.value);
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    handleThemeChange(prefersDarkMode ? 'dark' : 'light');

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = e => {
      const prefersDarkMode = e.matches;
      handleThemeChange(prefersDarkMode ? 'dark' : 'light');
    };

    mediaQueryList.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [theme]);

  return (
    <Navbar bg={theme} variant={theme} fixed="top">
      <Container className="justify-content-center pt-1 pb-1">
        <Row className="justify-content-between mb-2 mb-md-0 align-items-center w-100">
          <Col xs={2} className="ps-0">
            <Navbar.Brand>Image Finder</Navbar.Brand>
          </Col>

          <Col xs={2} md={{ order: 'last' }} className="pe-0">
            <ButtonGroup className="mb-2 mb-md-0 d-flex justify-content-end">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`theme-radio-${idx}`}
                  type="radio"
                  variant={`outline-${theme === 'light' ? 'dark' : 'light'}`}
                  name="theme"
                  value={radio.value}
                  checked={theme === radio.value}
                  onChange={() => handleThemeChange(radio.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>

          <Col xs={12} md={6} className="ps-0 pe-0">
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                className="me-2"
                aria-label="Search"
                bg={theme}
                ref={inputRef}
              />

              <Button type="submit" variant="primary">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
