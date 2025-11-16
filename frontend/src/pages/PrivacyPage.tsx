import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link to="/" className="navbar-brand">
            IntelliCall
          </Link>
          <div className="ms-auto">
            <Link to="/" className="btn btn-outline-light">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="mb-4">Privacy Policy</h1>
            <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="card mb-4">
              <div className="card-body">
                <h3>1. Information We Collect</h3>
                <p>
                  We collect information that you provide directly to us, including:
                </p>
                <ul>
                  <li>Name and email address</li>
                  <li>Account credentials</li>
                  <li>Dashboard content and notes</li>
                  <li>Call recordings and transcripts</li>
                </ul>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h3>2. How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and complete transactions</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                </ul>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h3>3. Information Sharing</h3>
                <p>
                  We do not share your personal information with third parties except
                  as described in this policy. We may share information:
                </p>
                <ul>
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                </ul>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h3>4. Data Security</h3>
                <p>
                  We take reasonable measures to protect your information from loss,
                  theft, misuse, unauthorized access, disclosure, alteration, and
                  destruction.
                </p>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h3>5. Your Rights</h3>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                </ul>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h3>6. Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please contact
                  us at:
                </p>
                <p>
                  Email: privacy@intellicall.com
                  <br />
                  Phone: 1-800-INTELLI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
