import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchData } from './images-api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Modal from 'react-modal';
import ImageModal from './components/ImageModal/ImageModal';
import toast from 'react-hot-toast';
import { set } from 'date-fns';

Modal.setAppElement('#root');
function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageForModal, setImageForModal] = useState({});

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPages(1);
  };

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetchData(query, page);
        // const newImgs = response.results;
        console.log(response);
        setTotalPages(response.total_pages);
        setImages(prev => [...prev, ...response.results]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        if (page === totalPages) {
          toast('End of collection!!');
        }
      }
    };
    fetchImages();
  }, [query, page, totalPages]);

  function openModal(item) {
    if (!modalIsOpen) {
      setIsOpen(true);
    }
    setImageForModal(item);
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery arr={images} openModal={openModal} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {totalPages > 1 && page !== totalPages && (
        <LoadMoreBtn handleClick={() => setPages(prev => prev + 1)} />
      )}
      {modalIsOpen && (
        <ImageModal
          image={imageForModal}
          isOpen={modalIsOpen}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
