import { Spinner } from 'react-bootstrap';

/**
 * React component representing a loading spinner.
 * @function
 * @returns {JSX.Element} - The rendered React element.
 */
const Loader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
      }}
    >
      {/* Bootstrap Spinner component with "border" animation */}
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

/**
 * Exporting the Loader component as the default export of the module.
 */
export default Loader;
