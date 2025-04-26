
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

type CheckoutStep = "shipping" | "payment" | "review";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("credit");
  
  const shippingCost = cartTotal >= 50 ? 0 : 5;
  const taxAmount = cartTotal * 0.08; // 8% tax
  const orderTotal = cartTotal + shippingCost + taxAmount;

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ["firstName", "lastName", "email", "address", "city", "state", "zipCode"];
    const missingFields = requiredFields.filter(field => !shippingInfo[field as keyof typeof shippingInfo]);
    
    if (missingFields.length > 0) {
      toast("Please fill out all required fields");
      return;
    }
    
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("review");
  };

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed!",
      description: "Thank you for your order. We'll send you a confirmation email shortly.",
    });
    clearCart();
    navigate("/order-confirmation", { state: { orderTotal } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-brand-blue mb-8">Checkout</h1>

          {/* Checkout Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <div className={`flex flex-col items-center ${currentStep === "shipping" ? "text-brand-blue" : "text-gray-500"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === "shipping" ? "bg-brand-blue text-white" : "bg-gray-200"}`}>
                  1
                </div>
                <span className="text-sm font-medium">Shipping</span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${currentStep === "shipping" ? "bg-gray-200" : "bg-brand-blue"}`} />
              <div className={`flex flex-col items-center ${currentStep === "payment" ? "text-brand-blue" : "text-gray-500"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === "payment" ? "bg-brand-blue text-white" : currentStep === "review" ? "bg-brand-blue text-white" : "bg-gray-200"}`}>
                  2
                </div>
                <span className="text-sm font-medium">Payment</span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${currentStep === "review" ? "bg-brand-blue" : "bg-gray-200"}`} />
              <div className={`flex flex-col items-center ${currentStep === "review" ? "text-brand-blue" : "text-gray-500"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === "review" ? "bg-brand-blue text-white" : "bg-gray-200"}`}>
                  3
                </div>
                <span className="text-sm font-medium">Review</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Shipping Information */}
              {currentStep === "shipping" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={shippingInfo.firstName}
                            onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={shippingInfo.lastName}
                            onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province *</Label>
                          <Input
                            id="state"
                            value={shippingInfo.state}
                            onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip/Postal Code *</Label>
                          <Input
                            id="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        />
                      </div>

                      <div className="pt-4 flex justify-end">
                        <Button type="submit">Continue to Payment</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Payment Information */}
              {currentStep === "payment" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value="credit" id="credit" />
                          <Label htmlFor="credit" className="flex-grow cursor-pointer">
                            Credit Card
                          </Label>
                          <div className="flex space-x-2">
                            <div className="w-10 h-6 bg-gray-300 rounded"></div>
                            <div className="w-10 h-6 bg-gray-300 rounded"></div>
                            <div className="w-10 h-6 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex-grow cursor-pointer">
                            PayPal
                          </Label>
                          <div className="w-10 h-6 bg-gray-300 rounded"></div>
                        </div>
                      </RadioGroup>
                      
                      {paymentMethod === "credit" && (
                        <div className="space-y-4 mt-6">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card *</Label>
                            <Input
                              id="cardName"
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Expiry Date *</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-4 flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setCurrentStep("shipping")}
                        >
                          Back
                        </Button>
                        <Button type="submit">Review Order</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Order Review */}
              {currentStep === "review" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Shipping Information Summary */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                          <p>{shippingInfo.address}</p>
                          <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                          <p>{shippingInfo.email}</p>
                          {shippingInfo.phone && <p>{shippingInfo.phone}</p>}
                        </div>
                      </div>

                      {/* Payment Method Summary */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p>{paymentMethod === "credit" ? "Credit Card" : "PayPal"}</p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                        <div className="border rounded-md divide-y">
                          {cartItems.map((item) => (
                            <div key={item.product.id} className="flex justify-between items-center p-4">
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
                                  <p className="font-medium">{item.product.name}</p>
                                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setCurrentStep("payment")}
                        >
                          Back
                        </Button>
                        <Button onClick={handlePlaceOrder}>Place Order</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Order Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>

                  <div className="pt-4 text-xs text-gray-500">
                    <p>By placing your order, you agree to our <a href="#" className="underline">terms and conditions</a> and <a href="#" className="underline">privacy policy</a>.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
