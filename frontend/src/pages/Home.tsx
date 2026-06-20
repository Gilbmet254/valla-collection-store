import { Link } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Shield, Truck, ArrowRight, Sparkles, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner">
          <ShoppingBag className="spinner-icon" />
          <div className="spinner-text">Valla Collection</div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920" alt="Fashion" className="hero-bg-image" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>New Collection 2024</span>
          </div>
          <h1 className="hero-title">
            Discover Your <span className="gradient-text">Perfect Style</span>
          </h1>
          <p className="hero-subtitle">
            Explore our curated collection of premium fashion for men, women, and children
          </p>
          <div className="hero-buttons">
            <Link to="/gallery" className="btn btn-primary btn-large">
              <ShoppingBag size={20} />
              Explore Gallery
              <ArrowRight size={20} />
            </Link>
            <Link to="/products" className="btn btn-secondary btn-large">
              Shop Now
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9</div>
              <div className="stat-label">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="featured-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/gallery" className="view-all-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="featured-grid">
            <div className="featured-item">
              <div className="featured-image">
                <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" alt="Featured" />
                <div className="featured-badge">
                  <Star size={12} />
                  Featured
                </div>
              </div>
              <div className="featured-info">
                <h3>Designer Evening Gown</h3>
                <p className="featured-price">KES 25,000</p>
              </div>
            </div>
            <div className="featured-item">
              <div className="featured-image">
                <img src="https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400" alt="Featured" />
                <div className="featured-badge">
                  <Star size={12} />
                  Featured
                </div>
              </div>
              <div className="featured-info">
                <h3>Men's Leather Shoes</h3>
                <p className="featured-price">KES 5,500</p>
              </div>
            </div>
            <div className="featured-item">
              <div className="featured-image">
                <img src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400" alt="Featured" />
                <div className="featured-badge">
                  <Star size={12} />
                  Featured
                </div>
              </div>
              <div className="featured-info">
                <h3>Luxury Designer Handbag</h3>
                <p className="featured-price">KES 15,000</p>
              </div>
            </div>
            <div className="featured-item">
              <div className="featured-image">
                <img src="https://images.unsplash.com/photo-1518049362265-d5b2a6469c9b?w=400" alt="Featured" />
                <div className="featured-badge">
                  <Star size={12} />
                  Featured
                </div>
              </div>
              <div className="featured-info">
                <h3>Women's Casual Sandals</h3>
                <p className="featured-price">KES 2,200</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Valla Collection?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <ShoppingBag className="feature-icon" />
              </div>
              <h3>Quality Products</h3>
              <p>Premium clothing items from top brands with guaranteed authenticity</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <TrendingUp className="feature-icon" />
              </div>
              <h3>Latest Trends</h3>
              <p>Stay fashionable with our curated collection of trending fashion items</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Shield className="feature-icon" />
              </div>
              <h3>Secure Payments</h3>
              <p>Multiple payment options including M-Pesa, Card, and Bitcoin</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Truck className="feature-icon" />
              </div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable shipping nationwide with real-time tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <Link to="/gallery" className="category-card" onClick={() => window.scrollTo(0, 0)}>
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600" alt="Men" />
                <div className="category-overlay">
                  <h3>Men's Collection</h3>
                  <p>Stylish outfits for the modern man</p>
                </div>
              </div>
            </Link>
            <Link to="/gallery" className="category-card" onClick={() => window.scrollTo(0, 0)}>
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600" alt="Women" />
                <div className="category-overlay">
                  <h3>Women's Collection</h3>
                  <p>Elegant and trendy fashion for women</p>
                </div>
              </div>
            </Link>
            <Link to="/gallery" className="category-card" onClick={() => window.scrollTo(0, 0)}>
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1503942780367-7385a7e8b4c6?w=600" alt="Kids" />
                <div className="category-overlay">
                  <h3>Kids' Collection</h3>
                  <p>Comfortable and fun clothing for children</p>
                </div>
              </div>
            </Link>
            <Link to="/gallery" className="category-card" onClick={() => window.scrollTo(0, 0)}>
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" alt="Shoes" />
                <div className="category-overlay">
                  <h3>Shoes</h3>
                  <p>Footwear for every occasion</p>
                </div>
              </div>
            </Link>
            <Link to="/gallery" className="category-card" onClick={() => window.scrollTo(0, 0)}>
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1518049362265-d5b2a6469c9b?w=600" alt="Sandals" />
                <div className="category-overlay">
                  <h3>Sandals</h3>
                  <p>Comfortable summer footwear</p>
                </div>
              </div>
            </Link>
            <Link to="/gallery" className="category-card" onClick={() => window.scrollTo(0, 0)}>
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600" alt="Designer" />
                <div className="category-overlay">
                  <h3>Designer Collection</h3>
                  <p>Luxury fashion pieces</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-background">
          <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920" alt="Fashion" />
          <div className="cta-overlay"></div>
        </div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Upgrade Your Wardrobe?</h2>
            <p className="cta-subtitle">Join thousands of satisfied customers and shop with confidence</p>
            <Link to="/gallery" className="btn btn-primary btn-large">
              <ShoppingBag size={20} />
              Start Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
