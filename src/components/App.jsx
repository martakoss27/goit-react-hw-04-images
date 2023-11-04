import React, { Component } from 'react';
import Searchbar from './Serchbar/Serchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: null,
    prevQuery: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page, images } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    } else if (
      prevState.images.length !== images.length &&
      prevState.images.length !== 0
    ) {
      this.scrollToBottom();
    }
  }

  // API REQUEST
  fetchImages = async () => {
    const { query, page } = this.state;
    const perPage = 12;
    const API_KEY = '39383410-163fa90d28e607aa13527d20b';
    //*
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&pretty=true&page=${page}&per_page=${perPage}`;

    this.setState({ isLoading: true });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      if (data.totalHits === 0) {
        throw new Error('No images found for the given query');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));

      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 500);
    } catch (error) {
      console.error(error.message);
      this.setState({ isLoading: false });
    }
  };
  //SCROLL TO BOTTOM
  scrollToBottom = () => {
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
  //SEARCHBAR
  handleSearch = query => {
    if (query !== this.state.prevQuery) {
      this.setState({ query, images: [], page: 1, prevQuery: query });
    }
  };
  //CLICK ON IMAGE(MODAL OPEN)
  handleImageClick = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  //LOAD MORE
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  //MODAL CLOSE
  closeModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <div className={css.MainContainer}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        {showModal && <Modal image={selectedImage} onClose={this.closeModal} />}
      </div>
    );
  }
}
export default App;
