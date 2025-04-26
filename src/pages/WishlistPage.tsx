
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
    toast("Item removed from wishlist");
  };

  const handleMoveToCart = (productId: number) => {
    const product = wishlist.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
      toast("Item moved to cart");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-brand-blue mb-8">Your Wishlist</h1>

          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <Heart size={64} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any items to your wishlist yet.</p>
              <Button asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {wishlist.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden mr-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/placeholder.svg";
                                }}
                              />
                            </div>
                            <div>
                              <Link to={`/products/${product.id}`} className="font-medium text-brand-blue hover:underline">
                                {product.name}
                              </Link>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          {product.inStock ? (
                            <span className="text-green-600">In Stock</span>
                          ) : (
                            <span className="text-red-500">Out of Stock</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                              onClick={() => handleMoveToCart(product.id)}
                              disabled={!product.inStock}
                            >
                              <ShoppingCart size={16} className="mr-1" />
                              <span>Add to Cart</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveFromWishlist(product.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => {
                    wishlist.forEach((product) => removeFromWishlist(product.id));
                    toast("Wishlist cleared");
                  }}
                >
                  Clear Wishlist
                </Button>
                <Link to="/products">
                  <Button>
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
