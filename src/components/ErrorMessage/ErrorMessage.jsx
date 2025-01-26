import s from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <p className={s.error}>
      The site is not responding or has not been found...
    </p>
  );
};

export default ErrorMessage;
