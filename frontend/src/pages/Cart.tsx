import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  size: string;
}

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setPageLoading(false), 800);
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/users/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, size: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5001/api/users/cart/${productId}/${size}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (productId: string, size: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5001/api/users/cart/${productId}/${size}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <ShoppingBag size={64} />
            <h2>Please login to view your cart</h2>
            <button onClick={() => navigate('/login')} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="loading">Loading cart...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={64} />
            <h2>Your cart is empty</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={`${item.product._id}-${item.size}-${index}`} className="cart-item">
                  <div className="cart-item-image">
                    {item.product.images.length > 0 ? (
                      <img src={item.product.images[0]} alt={item.product.name} />
                    ) : (
                      <div className="placeholder-image">No Image</div>
                    )}
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.product.name}</h3>
                    <p className="cart-item-size">Size: {item.size}</p>
                    <p className="cart-item-price">KES {item.product.price.toLocaleString()}</p>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.size, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product._id, item.size, item.quantity + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    <p>KES {(item.product.price * item.quantity).toLocaleString()}</p>
                    <button
                      onClick={() => removeFromCart(item.product._id, item.size)}
                      className="btn btn-danger"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>KES {calculateTotal().toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{calculateTotal() > 5000 ? 'Free' : 'KES 500'}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>KES {(calculateTotal() + (calculateTotal() > 5000 ? 0 : 500)).toLocaleString()}</span>
              </div>
              <button onClick={handleCheckout} className="btn btn-primary btn-large">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
