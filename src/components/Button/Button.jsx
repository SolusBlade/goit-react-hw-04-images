import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick }) => {
  return <button className={s.btn } onClick={onClick}>Load more</button>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
