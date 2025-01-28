import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchData } from './images-api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import toast from 'react-hot-toast';

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
        const { results, total_pages } = await fetchData(query, page);
        setImages(prevImgs => [...prevImgs, ...results]);
        setTotalPages(total_pages);
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
  }, [query, page]);

  function openModal(newItem) {
    if (!modalIsOpen) {
      setIsOpen(true);
    }
    setImageForModal(newItem);
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
