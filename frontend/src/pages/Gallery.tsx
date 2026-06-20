import { useState, useEffect } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
  stock: number;
  rating: number;
  featured: boolean;
  brand: string;
  material: string;
}

const Gallery = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setPageLoading(false), 800);
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    if (selectedFilter === 'featured' && !product.featured) {
      return false;
    }
    if (selectedFilter === 'new' && !product.featured) {
      return false;
    }
    return true;
  });

  const addToCart = async (productId: string, size: string) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5001/api/users/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1, size }),
      });
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'male', name: "Men's Collection" },
    { id: 'female', name: "Women's Collection" },
    { id: 'children', name: "Kids' Collection" },
    { id: 'shoes', name: 'Shoes' },
    { id: 'sandals', name: 'Sandals' },
    { id: 'designer', name: 'Designer Collection' },
  ];

  return (
    <div className="gallery-page">
      <div className="container">
        {/* Hero Section */}
        <section className="gallery-hero">
          <h1>Our Collection Gallery</h1>
          <p className="hero-subtitle">Explore our stunning collection of fashion items</p>
        </section>

        {/* Filters */}
        <section className="gallery-filters">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="category-buttons">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Filter By</h3>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${selectedFilter === 'featured' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('featured')}
              >
                Featured
              </button>
              <button
                className={`filter-btn ${selectedFilter === 'new' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('new')}
              >
                New Arrivals
              </button>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="gallery-grid">
          {loading ? (
            <div className="loading">Loading gallery...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">No products found</div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="gallery-item">
                <div className="gallery-image-container">
                  {product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="gallery-image"
                    />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                  <div className="gallery-overlay">
                    <button className="overlay-btn wishlist-btn">
                      <Heart size={20} />
                    </button>
                    <button 
                      className="overlay-btn cart-btn"
                      onClick={() => {
                        const size = product.sizes[0];
                        if (size) {
                          addToCart(product._id, size);
                        }
                      }}
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>
                  {product.featured && (
                    <div className="featured-badge">Featured</div>
                  )}
                </div>
                <div className="gallery-info">
                  <div className="gallery-brand">{product.brand}</div>
                  <h3 className="gallery-title">{product.name}</h3>
                  <p className="gallery-description">{product.description}</p>
                  <div className="gallery-meta">
                    <span className="gallery-price">KES {product.price.toLocaleString()}</span>
                    <span className="gallery-rating">⭐ {product.rating.toFixed(1)}</span>
                  </div>
                  <div className="gallery-details">
                    <span className="gallery-material">{product.material}</span>
                    <div className="gallery-sizes">
                      {product.sizes.slice(0, 4).map((size) => (
                        <span key={size} className="size-tag">{size}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Featured Collections */}
        <section className="featured-collections">
          <h2>Featured Collections</h2>
          <div className="collections-grid">
            <div className="collection-card">
              <div className="collection-image">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" alt="Designer Collection" />
              </div>
              <div className="collection-content">
                <h3>Designer Collection</h3>
                <p>Premium designer pieces for the fashion-forward</p>
                <button className="btn btn-primary" onClick={() => setSelectedCategory('female')}>
                  Explore
                </button>
              </div>
            </div>

            <div className="collection-card">
              <div className="collection-image">
                <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600" alt="Casual Wear" />
              </div>
              <div className="collection-content">
                <h3>Casual Wear</h3>
                <p>Comfortable everyday essentials</p>
                <button className="btn btn-primary" onClick={() => setSelectedCategory('male')}>
                  Explore
                </button>
              </div>
            </div>

            <div className="collection-card">
              <div className="collection-image">
                <img src="https://images.unsplash.com/photo-1503942788874-42c5958df3d8?w=600" alt="Kids Fashion" />
              </div>
              <div className="collection-content">
                <h3>Kids Fashion</h3>
                <p>Fun and stylish clothes for little ones</p>
                <button className="btn btn-primary" onClick={() => setSelectedCategory('children')}>
                  Explore
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Gallery;
