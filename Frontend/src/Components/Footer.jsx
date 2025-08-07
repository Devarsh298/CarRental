import React from 'react'

const Footer = () => {
  return (
    <div>
        {/* Footer */}
      <footer className="footer-section bg-gray-900 text-white py-12">
        <div className="footer-container max-w-7xl mx-auto px-6">
          <div className="footer-content grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="footer-brand">
              <div className="footer-logo flex items-center space-x-2 mb-4">
                <div className="logo-icon w-8 h-8 bg-blue-600 rounded"></div>
                <span className="logo-text text-xl font-bold">CarRental</span>
              </div>
              <p className="footer-description text-gray-400">
                Premium car rental service with a wide selection of luxury
                vehicles available for all your driving needs.
              </p>
            </div>

            <div className="footer-links">
              <h4 className="footer-heading text-lg font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="footer-list space-y-2">
                <li>
                  <a
                    href="#"
                    className="footer-link text-gray-400 hover:text-white"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="footer-link text-gray-400 hover:text-white"
                  >
                    Browse Cars
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="footer-link text-gray-400 hover:text-white"
                  >
                    List Your Car
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="footer-link text-gray-400 hover:text-white"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-resources">
              <h4 className="footer-heading text-lg font-semibold mb-4">
                Resources
              </h4>
              <ul className="footer-list space-y-2">
                <li>
                  <a
                    href="#"
                    className="footer-link text-gray-400 hover:text-white"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="footer-link text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="footer-link text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="footer-link text-gray-400 hover:text-white"
                  >
                    Insurance
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4 className="footer-heading text-lg font-semibold mb-4">
                Contact
              </h4>
              <div className="contact-info space-y-2 text-gray-400">
                <p className="contact-item">Call: (555) 123-4567</p>
                <p className="contact-item">123 Rental Street</p>
                <p className="contact-item">San Francisco, CA 94102</p>
                <p className="contact-item">USA: 20-4567</p>
                <p className="contact-item">info@carrental.com</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="copyright">© 2024 Brand. All rights reserved.</p>
            <div className="footer-legal-links mt-4 space-x-6">
              <a href="#" className="legal-link hover:text-white">
                Privacy
              </a>
              <a href="#" className="legal-link hover:text-white">
                Terms
              </a>
              <a href="#" className="legal-link hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
