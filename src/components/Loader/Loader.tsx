import { ThreeCircles } from 'react-loader-spinner';
import s from './Loader.module.css';
const Loader = () => {
  return (
    <div className={s.loader}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#e73443"
        ariaLabel="three-circles-loading"
        // wrapperStyle={{}}
        // wrapperClass=""
      />
    </div>
  );
};

export default Loader;
