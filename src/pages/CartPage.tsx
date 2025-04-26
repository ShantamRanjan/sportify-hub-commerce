
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

const CartPage = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart, cartTotal } = useStore();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
    toast("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    toast("Cart cleared");
  };

  const handleApplyCoupon = () => {
    toast("Invalid coupon code");
    setCouponCode("");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-brand-blue mb-8">Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <ShoppingCart size={64} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Button asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-2">Product</th>
                        <th className="text-center py-2">Quantity</th>
                        <th className="text-right py-2">Price</th>
                        <th className="text-right py-2">Total</th>
                        <th className="text-right py-2">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {cartItems.map((item) => (
                        <tr key={item.product.id} className="hover:bg-gray-50">
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden mr-4">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder.svg";
                                  }}
                                />
                              </div>
                              <div>
                                <Link to={`/products/${item.product.id}`} className="font-medium text-brand-blue hover:underline">
                                  {item.product.name}
                                </Link>
                                <p className="text-sm text-gray-500">{item.product.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </Button>
                              <span className="mx-2 w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              >
                                <Plus size={16} />
                              </Button>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            ${item.product.price.toFixed(2)}
                          </td>
                          <td className="py-4 text-right font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-4 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveItem(item.product.id)}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </Button>
                    <Link to="/products">
                      <Button variant="outline">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{cartTotal >= 50 ? "Free" : "$5.00"}</span>
                    </div>
                  </div>

                  <div className="mt-4 mb-6">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="pr-24"
                      />
                      <Button
                        className="absolute right-0 top-0 rounded-l-none"
                        variant="secondary"
                        onClick={handleApplyCoupon}
                        disabled={!couponCode}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between mb-6 font-semibold">
                    <span>Total</span>
                    <span className="text-xl text-brand-blue">
                      ${(cartTotal + (cartTotal >= 50 ? 0 : 5)).toFixed(2)}
                    </span>
                  </div>
                  
                  <Button
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    <p>Shipping and taxes calculated at checkout.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
