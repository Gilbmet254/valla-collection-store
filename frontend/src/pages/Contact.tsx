import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setPageLoading(false), 800);
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* Hero Section */}
        <section className="contact-hero">
          <h1>Contact Us</h1>
          <p className="hero-subtitle">We'd love to hear from you. Get in touch with us.</p>
        </section>

        <div className="contact-layout">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Have questions about our products, orders, or anything else? We're here to help!</p>

            <div className="contact-details">
              <div className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <h3>Email</h3>
                  <p>support@vallacollection.com</p>
                  <p>info@vallacollection.com</p>
                </div>
              </div>

              <div className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <h3>Phone</h3>
                  <p>+254 700 000 000</p>
                  <p>+254 733 000 000</p>
                </div>
              </div>

              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <h3>Address</h3>
                  <p>123 Fashion Street</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            <div className="contact-hours">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            
            {submitted && (
              <div className="success-message">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  rows={6}
                  placeholder="Write your message here..."
                />
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>What are your payment options?</h3>
              <p>We accept M-Pesa, credit/debit cards, and Bitcoin payments for your convenience.</p>
            </div>
            <div className="faq-item">
              <h3>How long does delivery take?</h3>
              <p>Standard delivery takes 2-3 business days within Nairobi and 3-5 business days for other regions.</p>
            </div>
            <div className="faq-item">
              <h3>What is your return policy?</h3>
              <p>We offer a 7-day return policy for unworn items with original tags and packaging.</p>
            </div>
            <div className="faq-item">
              <h3>Do you ship internationally?</h3>
              <p>Currently, we only ship within Kenya. We're working on expanding to international markets soon.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
