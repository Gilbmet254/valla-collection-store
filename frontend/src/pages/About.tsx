import { Heart, Target, Users, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';

const About = () => {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setPageLoading(false), 800);
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>About Valla Collection</h1>
          <p className="hero-subtitle">Your destination for quality fashion and exceptional service</p>
        </section>

        {/* Our Story */}
        <section className="about-section">
          <h2>Our Story</h2>
          <div className="about-content">
            <p>
              Valla Collection was founded with a simple mission: to provide high-quality, stylish clothing 
              for men, women, and children at affordable prices. We believe that everyone deserves to look 
              and feel their best, regardless of their budget.
            </p>
            <p>
              Since our inception, we have grown from a small local shop to a trusted online destination for 
              fashion enthusiasts across the country. Our commitment to quality, customer satisfaction, and 
              sustainable practices has earned us a loyal customer base and numerous industry accolades.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <Heart className="value-icon" />
              <h3>Quality First</h3>
              <p>We source only the finest materials and work with skilled artisans to ensure every piece meets our high standards.</p>
            </div>
            <div className="value-card">
              <Target className="value-icon" />
              <h3>Customer Focus</h3>
              <p>Our customers are at the heart of everything we do. We strive to provide exceptional service and support.</p>
            </div>
            <div className="value-card">
              <Users className="value-icon" />
              <h3>Inclusivity</h3>
              <p>Fashion is for everyone. We offer diverse styles and sizes to cater to all body types and preferences.</p>
            </div>
            <div className="value-card">
              <Award className="value-icon" />
              <h3>Sustainability</h3>
              <p>We are committed to reducing our environmental footprint through sustainable sourcing and ethical practices.</p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="about-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-avatar">JD</div>
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">JS</div>
              <h3>Jane Smith</h3>
              <p>Creative Director</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">MJ</div>
              <h3>Michael Johnson</h3>
              <p>Head of Operations</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">EW</div>
              <h3>Emily Williams</h3>
              <p>Customer Success Manager</p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="about-section stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Products Available</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Brand Partners</p>
            </div>
            <div className="stat-item">
              <h3>5 Years</h3>
              <p>Industry Experience</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
