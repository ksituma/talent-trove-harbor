
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/3b2677de-c6c9-4d5d-9806-a277a76e9d50.png" 
            alt="Kenya School of Government Logo" 
            className="h-16" 
          />
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/apply" className="text-gray-700 hover:text-blue-600 font-medium">Apply</Link>
          <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">Admin</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
