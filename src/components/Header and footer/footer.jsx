
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-around mb-12">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-8">
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li><a href="#home" className="hover:text-gray-400">Home</a></li>
              <li><a href="#about" className="hover:text-gray-400">About</a></li>
              <li><a href="#services" className="hover:text-gray-400">Services</a></li>
              <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-8">
            <h3 className="text-2xl font-bold mb-4">Company</h3>
            <ul>
              <li><a href="#about-us" className="hover:text-gray-400">About Us</a></li>
              <li><a href="#team" className="hover:text-gray-400">Our Team</a></li>
              <li><a href="#careers" className="hover:text-gray-400">Careers</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-8">
            <h3 className="text-2xl font-bold mb-4">Services</h3>
            <ul>
              <li><a href="#web-design" className="hover:text-gray-400">Web Design</a></li>
              <li><a href="#development" className="hover:text-gray-400">Development</a></li>
              <li><a href="#marketing" className="hover:text-gray-400">Marketing</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-8">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <ul>
              <li><a href="#contact-info" className="hover:text-gray-400">Contact Information</a></li>
              <li><a href="#support" className="hover:text-gray-400">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 pb-4 text-center">
          <p className="text-gray-500">&copy; 2023 All rights reserved.Lenden and co</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




