import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="brand-logo text-decoration-none">
              IntelliCall
            </Link>
            <div>
              <Link to="/login" className="btn btn-outline-light">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">
                AI-Powered Call Center Platform
              </h1>
              <p className="hero-subtitle">
                Transform your customer service with intelligent AI agents that handle
                calls, appointments, and customer inquiries 24/7
              </p>
              <div className="hero-cta">
                <Link to="/login" className="btn btn-light btn-lg">
                  Get Started
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Availability</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100K+</span>
                  <span className="stat-label">Calls Handled</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <div className="floating-card">
                  <div className="card-content">
                    <div className="pulse-dot"></div>
                    <span>AI Agent Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="industry-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Industry Solutions</h2>
            <p className="section-subtitle">
              Tailored AI call solutions for your industry
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="industry-card">
                <div className="industry-icon restaurants">
                  <svg
                    width="40"
                    height="40"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a1 1 0 0 1 1 1v6h2V1a1 1 0 1 1 2 0v6h.5A1.5 1.5 0 0 1 15 8.5v1a1.5 1.5 0 0 1-1.5 1.5H13v4a1 1 0 1 1-2 0v-4H9v4a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1zM3.5 0A1.5 1.5 0 0 1 5 1.5v13a.5.5 0 0 1-1 0v-5h-.5a2.5 2.5 0 0 1 0-5V1.5A1.5 1.5 0 0 1 3.5 0zm0 1a.5.5 0 0 0-.5.5V4h.5a1.5 1.5 0 0 0 0-3h-.5V1.5a.5.5 0 0 0-.5-.5z" />
                  </svg>
                </div>
                <h3>Restaurants</h3>
                <p>
                  Automated reservation management, order taking, and customer
                  inquiries
                </p>
                <ul className="feature-list">
                  <li>Table reservations</li>
                  <li>Takeout orders</li>
                  <li>Menu inquiries</li>
                  <li>Operating hours</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="industry-card">
                <div className="industry-icon realestate">
                  <svg
                    width="40"
                    height="40"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                  </svg>
                </div>
                <h3>Real Estate</h3>
                <p>
                  Property inquiry handling, viewing appointments, and lead
                  qualification
                </p>
                <ul className="feature-list">
                  <li>Property information</li>
                  <li>Viewing scheduling</li>
                  <li>Lead capture</li>
                  <li>Follow-up calls</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="industry-card">
                <div className="industry-icon medical">
                  <svg
                    width="40"
                    height="40"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                  </svg>
                </div>
                <h3>Medical</h3>
                <p>
                  Appointment scheduling, patient inquiries, and prescription
                  refills
                </p>
                <ul className="feature-list">
                  <li>Appointment booking</li>
                  <li>Patient reminders</li>
                  <li>Basic inquiries</li>
                  <li>Insurance verification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="feature-content">
                <h2>Intelligent Call Handling</h2>
                <p className="lead">
                  Our AI agents understand context, handle complex conversations,
                  and provide natural, human-like interactions
                </p>
                <ul className="benefit-list">
                  <li>Natural language processing</li>
                  <li>Multi-language support</li>
                  <li>Sentiment analysis</li>
                  <li>Real-time transcription</li>
                  <li>CRM integration</li>
                  <li>Analytics dashboard</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="integration-grid">
                <div className="integration-badge">Salesforce</div>
                <div className="integration-badge">HubSpot</div>
                <div className="integration-badge">Zendesk</div>
                <div className="integration-badge">Slack</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section text-center">
        <div className="container">
          <h2>Ready to Transform Your Call Center?</h2>
          <p className="lead">
            Join hundreds of businesses using IntelliCall to improve customer
            service
          </p>
          <Link to="/login" className="btn btn-light btn-lg">
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5>IntelliCall</h5>
              <p>AI-Powered Call Center Platform</p>
            </div>
            <div className="col-md-4 mb-4">
              <h6>Quick Links</h6>
              <ul>
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h6>Contact</h6>
              <p>Email: contact@intellicall.com</p>
              <p>Phone: 1-800-INTELLI</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>&copy; 2025 IntelliCall. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
