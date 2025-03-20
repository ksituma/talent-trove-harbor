
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img 
              src="/lovable-uploads/3b2677de-c6c9-4d5d-9806-a277a76e9d50.png" 
              alt="Kenya School of Government Logo" 
              className="h-16" 
            />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600 font-medium">Jobs</Link>
          {user ? (
            <>
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">Admin</Link>
              <button 
                onClick={() => signOut()}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/auth" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
