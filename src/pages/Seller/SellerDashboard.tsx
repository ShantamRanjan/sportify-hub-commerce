
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

// Mock data
const sellerProducts = [
  {
    id: "SP1",
    name: "Premium Basketball",
    price: 89.99,
    stock: 24,
    category: "Basketball",
    sales: 18,
    status: "active"
  },
  {
    id: "SP2",
    name: "Fitness Tracker Watch",
    price: 79.99,
    stock: 12,
    category: "Electronics",
    sales: 6,
    status: "active"
  },
  {
    id: "SP3",
    name: "Yoga Mat Deluxe",
    price: 45.99,
    stock: 0,
    category: "Yoga",
    sales: 15,
    status: "out_of_stock"
  }
];

const sellerOrders = [
  {
    id: "ORD-567890",
    date: "2023-04-20",
    customerName: "Michael Johnson",
    total: 89.99,
    status: "shipped"
  },
  {
    id: "ORD-678901",
    date: "2023-04-19",
    customerName: "Sarah Williams",
    total: 45.99,
    status: "processing"
  },
  {
    id: "ORD-789012",
    date: "2023-04-18",
    customerName: "David Brown",
    total: 79.99,
    status: "delivered"
  }
];

const SellerDashboard = () => {
  const { user } = useStore();
  
  // Stats for the seller dashboard
  const stats = {
    totalSales: 1245.96,
    totalOrders: 12,
    totalProducts: 3,
    lastMonthSales: 845.97
  };

  if (!user || !user.isSeller) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-brand-blue mb-4">Access Denied</h1>
            <p className="mb-8">You don't have seller privileges.</p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-brand-blue mb-6">Seller Dashboard</h1>
          
          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Total Sales</span>
                  <span className="text-3xl font-bold text-brand-blue">
                    ${stats.totalSales.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Total Orders</span>
                  <span className="text-3xl font-bold text-brand-blue">
                    {stats.totalOrders}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Products</span>
                  <span className="text-3xl font-bold text-brand-blue">
                    {stats.totalProducts}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Last Month</span>
                  <span className="text-3xl font-bold text-brand-blue">
                    ${stats.lastMonthSales.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="products">
            <TabsList className="grid w-full grid-cols-3 max-w-md mb-6">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            {/* Products Tab */}
            <TabsContent value="products">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Your Products</h2>
                  <Button asChild>
                    <Link to="/seller/add-product">Add New Product</Link>
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                          <tr>
                            <th className="px-6 py-3 text-sm font-medium">Product ID</th>
                            <th className="px-6 py-3 text-sm font-medium">Name</th>
                            <th className="px-6 py-3 text-sm font-medium">Price</th>
                            <th className="px-6 py-3 text-sm font-medium">Stock</th>
                            <th className="px-6 py-3 text-sm font-medium">Category</th>
                            <th className="px-6 py-3 text-sm font-medium">Sales</th>
                            <th className="px-6 py-3 text-sm font-medium">Status</th>
                            <th className="px-6 py-3 text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {sellerProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm">{product.id}</td>
                              <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                              <td className="px-6 py-4 text-sm">${product.price.toFixed(2)}</td>
                              <td className="px-6 py-4 text-sm">{product.stock}</td>
                              <td className="px-6 py-4 text-sm">{product.category}</td>
                              <td className="px-6 py-4 text-sm">{product.sales}</td>
                              <td className="px-6 py-4 text-sm">
                                <span className={`inline-block px-2 py-1 rounded text-xs ${
                                  product.status === 'active' ? 'bg-green-100 text-green-800' : 
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {product.status === 'active' ? 'Active' : 'Out of Stock'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm">
                                <div className="flex space-x-2">
                                  <Button asChild variant="outline" size="sm">
                                    <Link to={`/seller/edit-product/${product.id}`}>
                                      Edit
                                    </Link>
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                    onClick={() => toast("Product deleted")}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Manage your customer orders</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-left">
                        <tr>
                          <th className="px-6 py-3 text-sm font-medium">Order ID</th>
                          <th className="px-6 py-3 text-sm font-medium">Date</th>
                          <th className="px-6 py-3 text-sm font-medium">Customer</th>
                          <th className="px-6 py-3 text-sm font-medium">Total</th>
                          <th className="px-6 py-3 text-sm font-medium">Status</th>
                          <th className="px-6 py-3 text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {sellerOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm">{order.id}</td>
                            <td className="px-6 py-4 text-sm">{order.date}</td>
                            <td className="px-6 py-4 text-sm">{order.customerName}</td>
                            <td className="px-6 py-4 text-sm">${order.total.toFixed(2)}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`inline-block px-2 py-1 rounded text-xs ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <Button asChild variant="outline" size="sm">
                                <Link to={`/seller/orders/${order.id}`}>View Details</Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Analytics</CardTitle>
                  <CardDescription>View your business performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border rounded-md bg-gray-50">
                    <p className="text-gray-500">Analytics charts will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboard;
