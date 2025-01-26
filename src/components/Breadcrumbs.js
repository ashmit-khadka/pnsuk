import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ Items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center p-0">
        {Items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link 
              to={item.href} 
              className="text-black hover:text-gray-600 transition-colors duration-200"
            >
              {item.text}
            </Link>
            {index < Items.length - 1 && (
              <span className="mx-2 text-gray-500">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;