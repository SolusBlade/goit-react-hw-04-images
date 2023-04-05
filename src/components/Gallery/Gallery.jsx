import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { getSearchedPixabayApi } from '../../services/pixabayApi';

import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { Circles } from 'react-loader-spinner';
import Notiflix from 'notiflix';

const Gallery = ({ query }) => {
  // state = {
  //   images: [],
  //   page: 1,
  //   query: '',
  //   isLoading: false,
  //   isBtn: false,
  //   modalData: null,
  // };

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [galleryQuery, setGalleryQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBtn, setIsBtn] = useState(false);
  const [modalData, setModalData] = useState(null);

  // static getDerivedStateFromProps(props, state) {
  //   if (state.query !== props.query) {
  //     return { page: 1, query: props.query };
  //   }
  //   return null;
  // }
  useEffect(() => {
    if (galleryQuery !== query) {
      setPage(1);
      setGalleryQuery(query);
    }
  }, [query, galleryQuery]);

  // async componentDidUpdate(prevProps, prevState) {
  //   const { page, query } = this.state;
  //   if (
  //     (prevProps.query !== query && query !== '') ||
  //     (prevState.page !== page && page !== 1)
  //   ) {
  //     this.setNews();
  //   }
  // }
  const setNews = useCallback(async () => {
    setIsLoading(true);
    setIsBtn(false);

    try {
      const data = await getSearchedPixabayApi(galleryQuery, page);

      if (data.hits.length === 0) {
        throw new Error('no data there');
      }
      setImages(p => {
        if (page === 1) {
          return data.hits;
        } else {
          return [...p, ...data.hits];
        }
      });

      setIsBtn(true);
    } catch (error) {
      Notiflix.Notify.failure(`Ooops, ${error.message}`, {
        timeout: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [galleryQuery, page]);

  useEffect(() => {
    if (galleryQuery !== '' || page !== 1) {
      setNews();
    }
  }, [galleryQuery, page, setNews]);

  const changePage = useCallback(() => {
    setPage(p => p + 1);
  }, []);

  

  const openModal = useCallback(modalData => {
    setModalData(modalData);
  },[]);

  const closeModal = useCallback(() => {
    setModalData(null);
  },[]);

  // const { images, modalData, isLoading, isBtn } = this.state;

  return (
    <>
      <ImageGallery images={images} openModal={openModal} />
      {images.length > 0 && isBtn && <Button onClick={changePage} />}
      {isLoading && (
        <Circles
          height="80"
          width="80"
          color="#b72f2b"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="spinner"
          visible={true}
        />
      )}
      {modalData && <Modal {...modalData} closeModal={closeModal} />}
    </>
  );
};

Gallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default Gallery;
