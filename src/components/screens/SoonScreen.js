import React from 'react';
import { useNavigate } from 'react-router';
import Button from '../Button';

const SoonScreen = () => {
  const navigate = useNavigate(); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
      <p className="text-lg text-gray-700">We are working hard to bring you this feature. Stay tuned!</p>
      <Button variant="default" className="mt-4" onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
};

export default SoonScreen;