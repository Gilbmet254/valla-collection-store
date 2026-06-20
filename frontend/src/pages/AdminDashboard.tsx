import { useState, useEffect } from 'react';
import { Users, ShoppingBag, DollarSign, Package } from 'lucide-react';
import Loading from '../components/Loading';

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  orderStats: {
    pending: number;
    shipped: number;
    delivered: number;
  };
}

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  status: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setTimeout(() => setPageLoading(false), 800);
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setStats(data);
      setRecentOrders(data.recentOrders);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <div className="loading">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your store, orders, and customers</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`tab ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            Customers
          </button>
          <button
            className={`tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="dashboard-content">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users">
                  <Users size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats?.totalUsers || 0}</h3>
                  <p>Total Customers</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orders">
                  <ShoppingBag size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats?.totalOrders || 0}</h3>
                  <p>Total Orders</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon revenue">
                  <DollarSign size={24} />
                </div>
                <div className="stat-info">
                  <h3>KES {(stats?.totalRevenue || 0).toLocaleString()}</h3>
                  <p>Total Revenue</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon products">
                  <Package size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats?.totalProducts || 0}</h3>
                  <p>Total Products</p>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="order-status-section">
              <h2>Order Status</h2>
              <div className="order-status-grid">
                <div className="status-card pending">
                  <h3>{stats?.orderStats?.pending || 0}</h3>
                  <p>Pending</p>
                </div>
                <div className="status-card shipped">
                  <h3>{stats?.orderStats?.shipped || 0}</h3>
                  <p>Shipped</p>
                </div>
                <div className="status-card delivered">
                  <h3>{stats?.orderStats?.delivered || 0}</h3>
                  <p>Delivered</p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="recent-orders-section">
              <h2>Recent Orders</h2>
              <div className="recent-orders-list">
                {recentOrders.length === 0 ? (
                  <p>No recent orders</p>
                ) : (
                  recentOrders.map((order) => (
                    <div key={order._id} className="order-item">
                      <div className="order-info">
                        <h3>{order.user.name}</h3>
                        <p>{order.user.email}</p>
                        <p className="order-date">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="order-details">
                        <p className="order-total">KES {order.totalPrice.toLocaleString()}</p>
                        <span className={`order-status ${order.status}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="dashboard-content">
            <div className="section-header">
              <h2>Order Management</h2>
              <button className="btn btn-primary">View All Orders</button>
            </div>
            <p>Full order management interface coming soon...</p>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="dashboard-content">
            <div className="section-header">
              <h2>Customer Management</h2>
              <button className="btn btn-primary">View All Customers</button>
            </div>
            <p>Full customer management interface coming soon...</p>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="dashboard-content">
            <div className="section-header">
              <h2>Product Management</h2>
              <button className="btn btn-primary">Add New Product</button>
            </div>
            <p>Full product management interface coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
