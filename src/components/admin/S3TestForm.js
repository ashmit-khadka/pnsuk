import React, { useState } from "react";
import Button from "../Button";
import { toast } from 'react-toastify';
import axios from 'axios';

const S3TestForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [testDescription, setTestDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('testData', testDescription);
    formData.append('type', 'image');

    try {
      const response = await axios.post(`http://localhost:3001/member_test`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('File uploaded to S3 successfully!');
        setUploadResult(response.data.upload);
        setSelectedFile(null);
        setTestDescription('');
        // Reset file input
        document.getElementById('fileInput').value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Upload failed: ${error.response?.data?.details || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setTestDescription('');
    setUploadResult(null);
    document.getElementById('fileInput').value = '';
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">S3 Upload Test</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="testDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Test Description (Optional)
            </label>
            <input
              type="text"
              id="testDescription"
              value={testDescription}
              onChange={(e) => setTestDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a description for this test upload"
            />
          </div>
          
          <div>
            <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">
              Select File for S3 Upload
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
            {selectedFile && (
              <p className="mt-1 text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={isLoading || !selectedFile}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {isLoading ? 'Uploading...' : 'Upload to S3'}
            </Button>
            <Button 
              type="button" 
              onClick={handleClear}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Clear
            </Button>
          </div>
        </form>

        {/* Upload Result */}
        {uploadResult && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Upload Successful!</h3>
            <div className="text-sm text-green-700">
              <p><strong>File:</strong> {uploadResult.fileName}</p>
              <p><strong>Uploaded:</strong> {new Date(uploadResult.uploadedAt).toLocaleString()}</p>
              {uploadResult.testData && (
                <p><strong>Description:</strong> {uploadResult.testData}</p>
              )}
              <p>
                <strong>S3 URL:</strong>{' '}
                <a 
                  href={uploadResult.s3Url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {uploadResult.s3Key}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default S3TestForm;
