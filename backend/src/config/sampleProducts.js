const sampleProducts = [
  {
    name: "Classic Men's T-Shirt",
    description: "Premium cotton t-shirt with modern fit, perfect for casual wear",
    category: "male",
    price: 1500,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#FFFFFF", "#1E90FF"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500"
    ],
    stock: 50,
    brand: "Valla Classic",
    material: "100% Cotton",
    rating: 4.5,
    featured: true
  },
  {
    name: "Elegant Women's Dress",
    description: "Beautiful floral dress perfect for summer occasions",
    category: "female",
    price: 3500,
    sizes: ["S", "M", "L"],
    colors: ["#FF69B4", "#FFB6C1", "#FFFFFF"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500"
    ],
    stock: 30,
    brand: "Valla Elegance",
    material: "Silk Blend",
    rating: 4.8,
    featured: true
  },
  {
    name: "Kids' Colorful T-Shirt",
    description: "Fun and comfortable t-shirt for active kids",
    category: "children",
    price: 800,
    sizes: ["XS", "S", "M"],
    colors: ["#FF6347", "#32CD32", "#FFD700"],
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",
      "https://images.unsplash.com/photo-1503942780367-7385a7e8b4c6?w=500"
    ],
    stock: 40,
    brand: "Valla Kids",
    material: "Soft Cotton",
    rating: 4.3,
    featured: true
  },
  {
    name: "Men's Formal Shirt",
    description: "Professional dress shirt for business and formal events",
    category: "male",
    price: 2500,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#FFFFFF", "#87CEEB", "#F5F5DC"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500"
    ],
    stock: 35,
    brand: "Valla Professional",
    material: "Cotton Blend",
    rating: 4.6,
    featured: false
  },
  {
    name: "Women's Designer Blouse",
    description: "Stylish designer blouse with intricate details",
    category: "female",
    price: 4500,
    sizes: ["S", "M", "L"],
    colors: ["#800080", "#FF1493", "#000000"],
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500"
    ],
    stock: 25,
    brand: "Valla Designer",
    material: "Silk",
    rating: 4.9,
    featured: true
  },
  {
    name: "Kids' Denim Jacket",
    description: "Trendy denim jacket for cool kids",
    category: "children",
    price: 2200,
    sizes: ["S", "M", "L"],
    colors: ["#000080", "#4169E1"],
    images: [
      "https://images.unsplash.com/photo-1542272617-08f086302f31?w=500",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500"
    ],
    stock: 20,
    brand: "Valla Kids",
    material: "Denim",
    rating: 4.4,
    featured: false
  },
  {
    name: "Men's Casual Jeans",
    description: "Comfortable fit jeans for everyday wear",
    category: "male",
    price: 2800,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000080", "#4169E1", "#000000"],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"
    ],
    stock: 45,
    brand: "Valla Denim",
    material: "Denim",
    rating: 4.5,
    featured: true
  },
  {
    name: "Women's Summer Dress",
    description: "Light and breezy summer dress",
    category: "female",
    price: 3200,
    sizes: ["S", "M", "L"],
    colors: ["#FFB6C1", "#98FB98", "#E6E6FA"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500"
    ],
    stock: 28,
    brand: "Valla Summer",
    material: "Cotton",
    rating: 4.7,
    featured: true
  },
  {
    name: "Kids' Party Dress",
    description: "Beautiful party dress for special occasions",
    category: "children",
    price: 1800,
    sizes: ["XS", "S", "M"],
    colors: ["#FF69B4", "#FFD700", "#FF1493"],
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500",
      "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=500"
    ],
    stock: 22,
    brand: "Valla Kids",
    material: "Satin",
    rating: 4.6,
    featured: false
  },
  {
    name: "Men's Sports Jacket",
    description: "Performance sports jacket for active lifestyle",
    category: "male",
    price: 4200,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#FF0000", "#0000FF"],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500"
    ],
    stock: 30,
    brand: "Valla Sport",
    material: "Polyester",
    rating: 4.4,
    featured: false
  },
  {
    name: "Women's Business Suit",
    description: "Professional suit for the modern woman",
    category: "female",
    price: 8500,
    sizes: ["S", "M", "L"],
    colors: ["#000000", "#1C1C1C", "#2F4F4F"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500"
    ],
    stock: 15,
    brand: "Valla Professional",
    material: "Wool Blend",
    rating: 4.8,
    featured: true
  },
  {
    name: "Kids' Casual Hoodie",
    description: "Cozy hoodie for everyday comfort",
    category: "children",
    price: 1500,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#FF6347", "#32CD32", "#1E90FF"],
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500"
    ],
    stock: 38,
    brand: "Valla Kids",
    material: "Fleece",
    rating: 4.5,
    featured: false
  },
  {
    name: "Men's Leather Shoes",
    description: "Premium leather formal shoes for business and special occasions",
    category: "shoes",
    price: 5500,
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["#000000", "#8B4513", "#2F4F4F"],
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500"
    ],
    stock: 25,
    brand: "Valla Footwear",
    material: "Genuine Leather",
    rating: 4.7,
    featured: true
  },
  {
    name: "Women's High Heels",
    description: "Elegant high heels for evening wear and special occasions",
    category: "shoes",
    price: 4200,
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["#000000", "#FF0000", "#FFD700"],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
      "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=500"
    ],
    stock: 30,
    brand: "Valla Elegance",
    material: "Patent Leather",
    rating: 4.6,
    featured: true
  },
  {
    name: "Kids' Sneakers",
    description: "Comfortable and colorful sneakers for active kids",
    category: "shoes",
    price: 1800,
    sizes: ["28", "30", "32", "34"],
    colors: ["#FF6347", "#32CD32", "#1E90FF", "#FFD700"],
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500"
    ],
    stock: 45,
    brand: "Valla Kids",
    material: "Canvas",
    rating: 4.4,
    featured: true
  },
  {
    name: "Men's Running Shoes",
    description: "High-performance running shoes with advanced cushioning",
    category: "shoes",
    price: 4800,
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["#000000", "#FF0000", "#0000FF"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500"
    ],
    stock: 35,
    brand: "Valla Sport",
    material: "Mesh & Synthetic",
    rating: 4.5,
    featured: false
  },
  {
    name: "Women's Casual Sandals",
    description: "Comfortable sandals perfect for summer and casual wear",
    category: "sandals",
    price: 2200,
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["#FFB6C1", "#98FB98", "#E6E6FA", "#FFD700"],
    images: [
      "https://images.unsplash.com/photo-1518049362265-d5b2a6469c9b?w=500",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500"
    ],
    stock: 40,
    brand: "Valla Comfort",
    material: "Leather & Rubber",
    rating: 4.3,
    featured: true
  },
  {
    name: "Men's Beach Sandals",
    description: "Durable and comfortable sandals for beach and casual wear",
    category: "sandals",
    price: 1800,
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["#000000", "#8B4513", "#2F4F4F"],
    images: [
      "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=500",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    ],
    stock: 50,
    brand: "Valla Beach",
    material: "Synthetic & Rubber",
    rating: 4.2,
    featured: false
  },
  {
    name: "Kids' Summer Sandals",
    description: "Fun and colorful sandals for summer adventures",
    category: "sandals",
    price: 1200,
    sizes: ["28", "30", "32", "34"],
    colors: ["#FF6347", "#32CD32", "#1E90FF", "#FFD700"],
    images: [
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500"
    ],
    stock: 35,
    brand: "Valla Kids",
    material: "Synthetic",
    rating: 4.4,
    featured: true
  },
  {
    name: "Designer Evening Gown",
    description: "Stunning designer gown for red carpet events and galas",
    category: "designer",
    price: 25000,
    sizes: ["S", "M", "L"],
    colors: ["#000000", "#FF0000", "#FFD700"],
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"
    ],
    stock: 8,
    brand: "Valla Haute Couture",
    material: "Silk & Chiffon",
    rating: 5.0,
    featured: true
  },
  {
    name: "Designer Men's Suit",
    description: "Luxury designer suit crafted from Italian wool",
    category: "designer",
    price: 35000,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#1C1C1C", "#2F4F4F"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500"
    ],
    stock: 12,
    brand: "Valla Haute Couture",
    material: "Italian Wool",
    rating: 4.9,
    featured: true
  },
  {
    name: "Designer Handbag",
    description: "Luxury designer handbag with premium leather",
    category: "designer",
    price: 15000,
    sizes: ["One Size"],
    colors: ["#000000", "#FF0000", "#FFD700", "#8B4513"],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
      "https://images.unsplash.com/photo-1566150905458-1bf1a1135f8d?w=500"
    ],
    stock: 15,
    brand: "Valla Luxury",
    material: "Premium Leather",
    rating: 4.8,
    featured: true
  },
  {
    name: "Designer Sneakers",
    description: "Limited edition designer sneakers with unique design",
    category: "designer",
    price: 12000,
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["#000000", "#FFFFFF", "#FF0000"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    ],
    stock: 20,
    brand: "Valla Limited",
    material: "Premium Leather",
    rating: 4.7,
    featured: true
  },
  {
    name: "Women's Designer Dress",
    description: "Elegant designer dress with intricate embroidery",
    category: "designer",
    price: 18000,
    sizes: ["S", "M", "L"],
    colors: ["#FF69B4", "#FFD700", "#800080"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500"
    ],
    stock: 10,
    brand: "Valla Haute Couture",
    material: "Silk & Embroidery",
    rating: 4.9,
    featured: true
  }
];

module.exports = sampleProducts;
