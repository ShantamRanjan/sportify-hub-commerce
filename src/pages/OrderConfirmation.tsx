
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderTotal } = location.state || { orderTotal: 0 };
  
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  useEffect(() => {
    // If someone navigates to this page directly without an order, redirect to home
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <CardTitle className="text-2xl">Thank You For Your Order!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-6">
                  Your order has been received and is now being processed. 
                  We'll send you a confirmation email with your order details.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-sm text-gray-500">Order Number</div>
                    <div className="font-bold text-brand-blue text-xl">{orderNumber}</div>
                  </div>
                </div>
                <div className="flex justify-center mb-6">
                  <table className="min-w-[300px] text-left">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-gray-500">Order Total</td>
                        <td className="py-2 font-semibold text-right">${orderTotal.toFixed(2)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-500">Payment Method</td>
                        <td className="py-2 text-right">Credit Card</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-500">Estimated Delivery</td>
                        <td className="py-2 text-right">3-5 Business Days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/dashboard/orders">Track Order</Link>
                </Button>
                <Button asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
