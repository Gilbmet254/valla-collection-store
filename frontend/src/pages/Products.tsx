import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ShoppingCart, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
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
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [size, setSize] = useState(searchParams.get('size') || '');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => setPageLoading(false), 800);
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  useEffect(() => {
    fetchProducts();
  }, [category, minPrice, maxPrice, size, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (size) params.append('size', size);
      if (search) params.append('search', search);

      const response = await fetch(`http://localhost:5001/api/products?${params.toString()}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const clearFilters = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSize('');
    setSearch('');
    setSearchParams({});
  };

  const addToCart = async (productId: string, size: string) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
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

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1>Our Collection</h1>
          <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={20} />
            Filters
          </button>
        </div>

        <div className="products-layout">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-content">
              <h3>Filters</h3>
              
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-box">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </form>

              <div className="filter-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  <option value="male">Men</option>
                  <option value="female">Women</option>
                  <option value="children">Children</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Size</label>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                  <option value="">All Sizes</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Price Range</label>
                <div className="price-range">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              <button onClick={clearFilters} className="btn btn-secondary">
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="products-main">
            {loading ? (
              <div className="loading">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="no-products">No products found</div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product._id} className="product-card">
                    <div className="product-image">
                      {product.images.length > 0 ? (
                        <img src={product.images[0]} alt={product.name} />
                      ) : (
                        <div className="placeholder-image">No Image</div>
                      )}
                      <button className="wishlist-btn">
                        <Heart size={20} />
                      </button>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-category">{product.category}</p>
                      <p className="product-description">{product.description}</p>
                      <div className="product-meta">
                        <span className="product-price">KES {product.price.toLocaleString()}</span>
                        <span className="product-rating">⭐ {product.rating.toFixed(1)}</span>
                      </div>
                      <div className="product-sizes">
                        {product.sizes.map((s) => (
                          <span key={s} className="size-badge">{s}</span>
                        ))}
                      </div>
                      <div className="product-actions">
                        <select
                          className="size-select"
                          defaultValue=""
                          onChange={(e) => {
                            if (e.target.value) {
                              addToCart(product._id, e.target.value);
                            }
                          }}
                        >
                          <option value="">Select Size</option>
                          {product.sizes.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            const selectedSize = (document.querySelector('.size-select') as HTMLSelectElement)?.value;
                            if (selectedSize) {
                              addToCart(product._id, selectedSize);
                            } else {
                              alert('Please select a size');
                            }
                          }}
                        >
                          <ShoppingCart size={18} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
