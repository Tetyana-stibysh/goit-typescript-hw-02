import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchData } from './images-api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Modal from 'react-modal';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';

Modal.setAppElement('#root');
function App() {
  const [query, setQuery] = useState('');
  const [images, setArrImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [click, setClick] = useState(1);
  const [pages, setPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageForModal, setImageForModal] = useState({});
  function openModal(item) {
    setIsOpen(true);
    setImageForModal(item);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handelSearch = async (query, click) => {
    if (!query) {
      return;
    }
    setQuery(query);
    try {
      setArrImages([]);
      setError(false);
      setLoading(true);
      const dataImg = await fetchData(query, click);
      setPages(dataImg.total_pages);
      setArrImages(dataImg.results);
      if (dataImg.total_pages === 1) {
        toast('End of collection!!');
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchNextPage() {
      if (click === 1) {
        return;
      }

      try {
        setError(false);
        setLoading(true);
        const response = await fetchData(query, click);
        const newImg = response.results;
        setArrImages(prevArr => {
          return [...prevArr, ...newImg];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        if (pages === click) {
          toast('End of collection!!');
        }
      }
    }
    fetchNextPage();
  }, [click, query, pages]);
  const handelClickLoad = () => {
    setClick(click + 1);
  };

  return (
    <div>
      <SearchBar onSearch={handelSearch} />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery arr={images} toOpenModal={openModal} />
      )}
      {loading && <Loader />}
      {pages > 1 && pages !== click && (
        <LoadMoreBtn handelClick={handelClickLoad} />
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ImageModal image={imageForModal} closeModal={closeModal} />
      </Modal>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          removeDelay: 1000,
          style: {
            background: '#c8c0c0',
            color: '#cb2323',
            fontWeight: ' 600',
          },
        }}
      />
    </div>
  );
}

export default App;
