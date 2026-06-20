import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <ShoppingBag size={28} />
          <span>Valla Collection</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          <Link to="/gallery" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Gallery
          </Link>
          <Link to="/about" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/contact" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>

          {isAdmin && (
            <Link to="/admin" className="navbar-link admin-link" onClick={() => setIsMenuOpen(false)}>
              Admin Dashboard
            </Link>
          )}

          <div className="navbar-actions">
            <Link to="/cart" className="navbar-link cart-link" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>

            {isAuthenticated ? (
              <div className="navbar-user">
                <div className="user-avatar">
                  <User size={18} />
                </div>
                <span className="user-name">{user?.name?.split(' ')[0]}</span>
                <button onClick={handleLogout} className="navbar-button logout-btn">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="navbar-actions">
                <Link to="/login" className="navbar-button login-btn" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="navbar-button signup-btn" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
