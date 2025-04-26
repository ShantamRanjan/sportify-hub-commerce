
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { ShoppingCart, Heart, User, LogOut, Menu, X } from "lucide-react";

export function Navbar() {
  const { cartItems, user, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="border-b sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-blue">
          SportifyHub
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-brand-blue"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/products" className="text-brand-dark hover:text-brand-accent transition-colors">
            Products
          </Link>
          <Link to="/categories" className="text-brand-dark hover:text-brand-accent transition-colors">
            Categories
          </Link>
          <Link to="/about" className="text-brand-dark hover:text-brand-accent transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-brand-dark hover:text-brand-accent transition-colors">
            Contact
          </Link>
        </nav>

        {/* User actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2 text-brand-dark hover:text-brand-accent">
                <User size={20} />
                <span>{user.name}</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout} title="Log out">
                <LogOut size={20} />
              </Button>
              {user.isSeller && (
                <Link to="/seller/dashboard">
                  <Button variant="outline" size="sm">Seller Dashboard</Button>
                </Link>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
          <Link to="/wishlist" className="relative">
            <Button variant="ghost" size="icon">
              <Heart size={20} />
            </Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center mb-8">
                <Link to="/" className="text-2xl font-bold text-brand-blue">
                  SportifyHub
                </Link>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-6 text-lg">
                <Link 
                  to="/products" 
                  className="text-brand-dark hover:text-brand-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/categories" 
                  className="text-brand-dark hover:text-brand-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  to="/about" 
                  className="text-brand-dark hover:text-brand-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  className="text-brand-dark hover:text-brand-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                
                <div className="pt-4 border-t">
                  {user ? (
                    <>
                      <div className="flex items-center mb-4">
                        <User size={20} className="mr-2" />
                        <span>{user.name}</span>
                      </div>
                      <div className="flex flex-col space-y-4">
                        <Link 
                          to="/dashboard" 
                          className="bg-brand-blue text-white py-2 px-4 rounded text-center"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        {user.isSeller && (
                          <Link 
                            to="/seller/dashboard" 
                            className="bg-brand-accent text-white py-2 px-4 rounded text-center"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Seller Dashboard
                          </Link>
                        )}
                        <button 
                          className="border border-brand-blue text-brand-blue py-2 px-4 rounded text-center"
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                        >
                          Log Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <Link 
                        to="/login" 
                        className="bg-brand-blue text-white py-2 px-4 rounded text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/signup" 
                        className="border border-brand-blue text-brand-blue py-2 px-4 rounded text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4 pt-4 justify-center">
                  <Link 
                    to="/wishlist" 
                    className="p-2 border rounded-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart size={20} />
                  </Link>
                  <Link 
                    to="/cart" 
                    className="p-2 border rounded-full relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart size={20} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
