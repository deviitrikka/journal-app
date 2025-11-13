import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-neutral-900 shadow-md sticky top-2 z-50 w-3/4 mx-auto rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold text-white hover:text-gray-400 transition-colors">
            <BookOpen className="w-6 h-6" />
            <span>Journal App</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-gray-400 font-medium transition-colors"
            >
              Journal
            </Link>
            <Link
              to="/analytics"
              className="flex items-center gap-1 text-gray-300 hover:text-gray-400 font-medium transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-300 hover:text-red-400 font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

