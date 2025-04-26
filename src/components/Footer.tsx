
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-brand-blue text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SportifyHub</h3>
            <p className="text-gray-300">
              Your one-stop destination for all your sporting needs. Quality products for athletes of all levels.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/deals" className="text-gray-300 hover:text-white transition-colors">Deals & Discounts</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-300 hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/become-seller" className="text-gray-300 hover:text-white transition-colors">Become a Seller</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} SportifyHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
