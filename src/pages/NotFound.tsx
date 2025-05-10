
import React from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5">
      <div className="card-glass p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🧭</div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="button-3d bg-primary text-white py-3 px-6 rounded-lg inline-flex"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
