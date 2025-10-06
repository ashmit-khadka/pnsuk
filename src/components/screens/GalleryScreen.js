import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Breadcrumbs from '../Breadcrumbs';

const GalleryScreen = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/gallery`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching gallery items:', error);
      });
  }, []);

  const handleShow = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-page">
       <div className="max-w-page w-full">
        <Breadcrumbs
            Items={[
                { href: '/', text: 'Home' },
                { href: '/gallery', text: 'Gallery' }
            ]}
        />
        <h1 className="font-lora mb-8">Gallery</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={item.id || index} className="cursor-pointer" onClick={() => handleShow(index)}>
            {item.type === 'video' ? (
              <video className="w-full h-48 object-cover rounded-lg" muted>
                <source src={item.s3_key} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img className="w-full h-48 object-cover rounded-lg" src={item.s3_key} alt={item.name} />
            )}
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Body className="p-0">
          <Carousel activeIndex={selectedIndex} onSelect={(i) => setSelectedIndex(i)} interval={null}>
            {items.map((item, index) => (
              <Carousel.Item key={item.id || index}>
                {item.type === 'video' ? (
                  <video className="d-block w-100" style={{ maxHeight: '80vh' }} controls autoPlay>
                    <source src={item.s3_key} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img className="d-block w-100" style={{ maxHeight: '80vh', objectFit: 'contain' }} src={item.s3_key} alt={item.name} />
                )}
                {item.name && item.name !== 'Article Image' && (
                  <Carousel.Caption>
                    <h3>{item.name}</h3>
                  </Carousel.Caption>
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GalleryScreen;