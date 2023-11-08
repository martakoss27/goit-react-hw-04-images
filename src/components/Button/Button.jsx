import css from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ onClick, children }) {
  return (
    <button className={css.Button} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Button;
