import React, { useState, useEffect } from 'react';
import Searchbar from './Serchbar/Serchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // API REQUEST
  const fetchImages = async (query, page) => {
    const perPage = 12;
    const API_KEY = '39383410-163fa90d28e607aa13527d20b';
    //*
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&pretty=true&page=${page}&per_page=${perPage}`;

    setIsLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      if (data.totalHits === 0) {
        throw new Error('No images found for the given query');
      }

      setImages(prevImages =>
        page === 1 ? data.hits : [...prevImages, ...data.hits]
      );

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchImages(query, page);
    }
  }, [query, page]);
  //SCROLL TO BOTTOM
  const scrollToBottom = () => {
    let currentScrollPosition = window.scrollY;
    let targetScrollPosition = document.body.scrollHeight - window.innerHeight;
    let scrollStep = Math.round(
      (targetScrollPosition - currentScrollPosition) / 20
    );

    const smoothScroll = () => {
      currentScrollPosition += scrollStep;
      window.scrollTo(0, currentScrollPosition);

      if (currentScrollPosition < targetScrollPosition) {
        window.requestAnimationFrame(smoothScroll);
      }
    };

    window.requestAnimationFrame(smoothScroll);
  };

  useEffect(() => {
    if (images.length > 0 && !isLoading) {
      scrollToBottom();
    }
  }, [images, isLoading]);
  //SEARCHBAR
  const handleSearch = (event, query) => {
    event.preventDefault();
    setImages([]);
    setPage(1);
    setQuery(query);
  };
  //CLICK ON IMAGE(MODAL OPEN)
  const handleImageClick = image => {
    setShowModal(true);
    setSelectedImage(image);
  };

  //LOAD MORE
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  //MODAL CLOSE
  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className={css.MainContainer}>
      <Searchbar onSubmit={(event, query) => handleSearch(event, query)} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
      {showModal && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default App;
