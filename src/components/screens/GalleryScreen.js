import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAllArticles } from '../../services/services';
import Breadcrumbs from '../Breadcrumbs';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const GalleryScreen = () => {
    const [articles, setArticles] = useState([]);
    const [allImages, setAllImages] = useState([]);
    const [displayedImages, setDisplayedImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [page, setPage] = useState(0);
    const itemsPerPage = 20;

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await getAllArticles();
            setArticles(response);
            const images = response.flatMap(article => article.images.map(image => ({
                src: `${process.env.REACT_APP_HOST}/assets/media/images/articles/${image.image}`,
                alt: article.title
            })));
            setAllImages(images);
            loadMoreImages(images, 0);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const loadMoreImages = (images, page) => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newImages = images.slice(startIndex, endIndex);
        setDisplayedImages((prevImages) => [...prevImages, ...newImages]);
        setPage(page + 1);
        if (newImages.length < itemsPerPage) {
            setHasMore(false);
        }
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="gallery-page max-w-page">
            <div className="max-w-page w-full">
                <Breadcrumbs
                    Items={[
                        { href: '/', text: 'Home' },
                        { href: '/gallery', text: 'Gallery' }
                    ]}
                />
                <h1 className="font-lora mb-8">Gallery</h1>
            </div>
            <InfiniteScroll
                dataLength={displayedImages.length}
                next={() => loadMoreImages(allImages, page)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more images to load</p>}
            >
                <div className="gallery-grid">
                    {displayedImages.map((image, index) => (
                        <div key={index} className="gallery-item" onClick={() => handleImageClick(index)}>
                            <img src={image.src} alt={image.alt} />
                        </div>
                    ))}
                </div>
            </InfiniteScroll>

            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Body>
                    <Carousel activeIndex={selectedImageIndex} onSelect={(selectedIndex) => setSelectedImageIndex(selectedIndex)}>
                        {allImages.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img className="d-block w-100" src={image.src} alt={image.alt} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default GalleryScreen;