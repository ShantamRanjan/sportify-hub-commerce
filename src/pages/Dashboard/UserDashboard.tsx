
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

const UserDashboard = () => {
  const { user } = useStore();
  const [profileData, setProfileData] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });
  
  // Mock order history
  const orders = [
    {
      id: "ORD-123456",
      date: "2023-04-16",
      total: 159.97,
      items: 3,
      status: "Delivered"
    },
    {
      id: "ORD-789012",
      date: "2023-03-28",
      total: 89.99,
      items: 1,
      status: "Processing"
    }
  ];

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-brand-blue mb-4">Access Denied</h1>
            <p className="mb-8">Please log in to view your dashboard.</p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Profile updated successfully");
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Password updated successfully");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-brand-blue mb-6">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* User Info Summary */}
            <Card className="lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500 mb-4">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500 mb-6">{user.email}</p>
                  
                  <div className="w-full space-y-2">
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/dashboard/orders">Orders</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/dashboard/addresses">Addresses</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/dashboard/payment-methods">Payment Methods</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/wishlist">Wishlist</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/dashboard/account-settings">Account Settings</Link>
                    </Button>
                    {user.isSeller && (
                      <Button asChild variant="outline" className="w-full justify-start">
                        <Link to="/seller/dashboard">Seller Dashboard</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview">
                  <div className="space-y-6">
                    {/* Recent Orders */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Your most recent purchases</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {orders.length > 0 ? (
                          <div className="rounded-md border overflow-hidden">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-medium">Order #</th>
                                  <th className="px-4 py-3 text-left font-medium">Date</th>
                                  <th className="px-4 py-3 text-left font-medium">Total</th>
                                  <th className="px-4 py-3 text-left font-medium">Status</th>
                                  <th className="px-4 py-3 text-left font-medium">Action</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y">
                                {orders.map((order) => (
                                  <tr key={order.id}>
                                    <td className="px-4 py-3">{order.id}</td>
                                    <td className="px-4 py-3">{order.date}</td>
                                    <td className="px-4 py-3">${order.total.toFixed(2)}</td>
                                    <td className="px-4 py-3">
                                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                                        'bg-gray-100 text-gray-800'
                                      }`}>
                                        {order.status}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3">
                                      <Link 
                                        to={`/dashboard/orders/${order.id}`} 
                                        className="text-brand-blue hover:underline"
                                      >
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-gray-500">You haven't placed any orders yet.</p>
                        )}
                        <div className="mt-4 text-right">
                          <Button asChild variant="outline" size="sm">
                            <Link to="/dashboard/orders">View All Orders</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Account Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Wishlist</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">0</p>
                          <p className="text-sm text-gray-500">Saved items</p>
                          <Button asChild variant="link" className="px-0 mt-2">
                            <Link to="/wishlist">View Wishlist</Link>
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">0</p>
                          <p className="text-sm text-gray-500">Product reviews</p>
                          <Button asChild variant="link" className="px-0 mt-2">
                            <Link to="/dashboard/reviews">View Reviews</Link>
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Rewards</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">0</p>
                          <p className="text-sm text-gray-500">Points available</p>
                          <Button asChild variant="link" className="px-0 mt-2">
                            <Link to="/dashboard/rewards">View Rewards</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Orders Tab */}
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>View and track all your purchases</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {orders.length > 0 ? (
                        <div className="rounded-md border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left font-medium">Order #</th>
                                <th className="px-4 py-3 text-left font-medium">Date</th>
                                <th className="px-4 py-3 text-left font-medium">Total</th>
                                <th className="px-4 py-3 text-left font-medium">Items</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                                <th className="px-4 py-3 text-left font-medium">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {orders.map((order) => (
                                <tr key={order.id}>
                                  <td className="px-4 py-3">{order.id}</td>
                                  <td className="px-4 py-3">{order.date}</td>
                                  <td className="px-4 py-3">${order.total.toFixed(2)}</td>
                                  <td className="px-4 py-3">{order.items}</td>
                                  <td className="px-4 py-3">
                                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                                      'bg-gray-100 text-gray-800'
                                    }`}>
                                      {order.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">
                                    <Link 
                                      to={`/dashboard/orders/${order.id}`} 
                                      className="text-brand-blue hover:underline"
                                    >
                                      View Details
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                          <Button asChild>
                            <Link to="/products">Start Shopping</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your account information</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input
                                id="firstName"
                                value={profileData.firstName}
                                onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input
                                id="lastName"
                                value={profileData.lastName}
                                onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            />
                          </div>
                          
                          <Button type="submit">Save Changes</Button>
                        </form>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>Change your password</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handlePasswordUpdate} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                              id="currentPassword"
                              type="password"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              required
                            />
                          </div>
                          
                          <Button type="submit">Update Password</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
