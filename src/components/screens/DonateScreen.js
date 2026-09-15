import React, { useState } from 'react';

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-center h-6 focus:outline-none transition-colors duration-200"
      title="Copy to clipboard"
    >
      {copied ? (
        <span className="text-green-600 text-sm font-medium flex items-center h-full">Copied!</span>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-themePrimary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
};

const DonateScreen = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-themeDark mb-4">Donate</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your support helps us continue our work and support the community. We appreciate any contributions!
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 p-8 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bank Transfer Details</h2>
        <div className="bg-gray-50 rounded-lg p-6 mb-2">
          
          <p className="text-lg font-medium text-gray-700 mb-2">Bank Name</p>
          <div className="flex justify-center items-center mb-6 gap-2">
            <span className="text-xl text-themePrimary font-bold m-0">TSB Bank</span>
            <CopyButton textToCopy="TSB Bank" />
          </div>

          <p className="text-lg font-medium text-gray-700 mb-2">Account Name</p>
          <div className="flex justify-center items-center mb-6 gap-2">
            <span className="text-xl text-themePrimary font-bold m-0">Peterborough Nepalese society</span>
            <CopyButton textToCopy="Peterborough Nepalese society" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Sort Code</p>
              <div className="flex justify-center items-center bg-white border rounded py-2 relative h-12">
                <span className="text-2xl font-mono text-gray-800 m-0">30-96-60</span>
                <div className="absolute right-3 flex items-center h-full top-0">
                  <CopyButton textToCopy="30-96-60" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Account Number</p>
              <div className="flex justify-center items-center bg-white border rounded py-2 relative h-12">
                <span className="text-2xl font-mono text-gray-800 m-0">00152108</span>
                <div className="absolute right-3 flex items-center h-full top-0">
                  <CopyButton textToCopy="00152108" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">Thank you for your generous support.</p>
      </div>
    </div>
  );
};

export default DonateScreen;
