import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchData } from './images-api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import toast from 'react-hot-toast';
import { Image } from './App.types';
interface ImageData {
  total_pages: number;
  total: number;
  results: Image[];
}
function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPages] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [imageForModal, setImageForModal] = useState<Image | null>(null);

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setImages([]);
    setPages(1);
  };

  useEffect(() => {
    if (!query) return;
    const fetchImages = async (): Promise<void> => {
      try {
        setError(false);
        setLoading(true);
        const { results, total_pages }: ImageData = await fetchData(
          query,
          page
        );
        setTotalPages(total_pages);
        setImages((prevImgs: Image[]): Image[] => [...prevImgs, ...results]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);
  useEffect(() => {
    if (page === totalPages) {
      toast('End of collection!!');
    }
  }, [totalPages, page]);
  function openModal(newItem: Image): void {
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
