# Valla Collection Store

A full-featured e-commerce web application for clothing retail with support for multiple payment methods including M-Pesa, card payments, and Bitcoin.

## Features

### Customer Features
- **User Authentication**: Responsive login and registration system
- **Product Catalog**: Browse clothes organized by categories (Male, Female, Children)
- **Advanced Search & Filter**: Find products by size, price range, and category
- **Shopping Cart**: Add items, manage quantities, and view order summary
- **Multiple Payment Options**: 
  - M-Pesa integration
  - Card payments (Stripe)
  - Bitcoin payments
- **Order Tracking**: View order status and delivery information

### Admin Features
- **Dashboard**: Overview of store statistics
- **User Management**: View and manage customer accounts
- **Order Management**: Track and update order status
- **Delivery Management**: Manage shipping and delivery
- **Product Management**: Add, edit, and remove products
- **Analytics**: Sales reports and performance metrics

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Payment Integrations**: M-Pesa API, Stripe, Bitcoin
- **Security**: Helmet, CORS, Rate limiting

### Frontend
- **React** with TypeScript
- **React Router** for navigation
- **Lucide React** for icons
- **Axios** for API calls
- **CSS** with responsive design

## Project Structure

```
valla-collection-store/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   │   ├── adminController.js
│   │   │   ├── authController.js
│   │   │   ├── orderController.js
│   │   │   ├── paymentController.js
│   │   │   ├── productController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── Order.js
│   │   │   ├── Payment.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── admin.js
│   │   │   ├── auth.js
│   │   │   ├── orders.js
│   │   │   ├── payments.js
│   │   │   ├── products.js
│   │   │   └── users.js
│   │   ├── server.js
│   │   └── utils/
│   ├── .env
│   ├── package.json
│   └── logs/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.tsx
    │   ├── context/
    │   │   └── AuthContext.tsx
    │   ├── pages/
    │   │   ├── About.tsx
    │   │   ├── AdminDashboard.tsx
    │   │   ├── Cart.tsx
    │   │   ├── Contact.tsx
    │   │   ├── Home.tsx
    │   │   ├── Login.tsx
    │   │   ├── Products.tsx
    │   │   └── Register.tsx
    │   ├── utils/
    │   │   └── api.ts
    │   ├── App.css
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the backend directory with the following variables:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/valla-collection
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development

# M-Pesa Configuration
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_PASSKEY=your_mpesa_passkey
MPESA_SHORTCODE=your_mpesa_shortcode

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Bitcoin Configuration
BITCOIN_WALLET_ADDRESS=your_bitcoin_wallet_address
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another available port)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `POST /api/products/:id/reviews` - Add product review

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (admin)
- `PUT /api/orders/:id/cancel` - Cancel order

### Users
- `PUT /api/users/profile` - Update profile
- `POST /api/users/cart` - Add to cart
- `DELETE /api/users/cart/:productId/:size` - Remove from cart
- `PUT /api/users/cart/:productId/:size` - Update cart item
- `GET /api/users/cart` - Get cart
- `DELETE /api/users/cart` - Clear cart
- `POST /api/users/wishlist` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist
- `GET /api/users/wishlist` - Get wishlist

### Payments
- `POST /api/payments/mpesa` - Process M-Pesa payment
- `POST /api/payments/mpesa/callback` - M-Pesa callback
- `POST /api/payments/card` - Process card payment
- `POST /api/payments/bitcoin` - Process Bitcoin payment
- `GET /api/payments/:paymentId` - Get payment status

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user details
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/orders/:id` - Get order details
- `PUT /api/admin/orders/:id/delivery` - Update delivery status
- `GET /api/admin/payments` - Get all payments
- `GET /api/admin/products/low-stock` - Get low stock products
- `GET /api/admin/analytics/sales` - Get sales analytics

## Usage

### For Customers
1. Register a new account or login
2. Browse products by category (Men, Women, Children)
3. Use filters to find products by size and price
4. Add items to cart with selected size
5. Proceed to checkout
6. Choose payment method (M-Pesa, Card, or Bitcoin)
7. Track order status in your account

### For Admins
1. Login with admin credentials
2. Access the admin dashboard
3. View store statistics and recent orders
4. Manage users, orders, and products
5. Track deliveries and update order status
6. View sales analytics

## Payment Integration Setup

### M-Pesa
1. Register for M-Pesa API credentials on Safaricom Developer Portal
2. Update `.env` file with your M-Pesa credentials
3. Configure callback URL for payment notifications

### Stripe
1. Create a Stripe account and get API keys
2. Update `.env` file with Stripe secret and publishable keys
3. Configure webhooks for payment confirmations

### Bitcoin
1. Set up a Bitcoin wallet
2. Update `.env` file with your wallet address
3. Implement blockchain verification for transactions

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- CORS configuration
- Helmet for security headers
- Input validation with Joi

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Future Enhancements

- Email notifications for order updates
- Product reviews and ratings
- Wishlist functionality
- Advanced search with autocomplete
- Product comparison
- Discount codes and promotions
- Multi-language support
- Real-time inventory updates

## License

MIT License

## Support

For support and questions, please contact:
- Email: support@vallacollection.com
- Phone: +254 700 000 000
