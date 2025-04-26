
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

const AddProductPage = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    features: ["", "", ""],
    images: []
  });
  
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
  
  const handleChange = (field: string, value: string) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...productData.features];
    updatedFeatures[index] = value;
    setProductData((prev) => ({ ...prev, features: updatedFeatures }));
  };
  
  const addFeatureField = () => {
    setProductData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };
  
  const removeFeatureField = (index: number) => {
    const updatedFeatures = [...productData.features];
    updatedFeatures.splice(index, 1);
    setProductData((prev) => ({ ...prev, features: updatedFeatures }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!productData.name || !productData.price || !productData.category || !productData.description) {
      toast("Please fill in all required fields");
      return;
    }
    
    // Filter out empty features
    const filteredFeatures = productData.features.filter(feature => feature.trim() !== "");
    
    // In a real app, submit to backend
    toast("Product added successfully!");
    navigate("/seller/dashboard");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-brand-blue">Add New Product</h1>
            <Button asChild variant="outline">
              <Link to="/seller/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={productData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="price">Price ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={productData.price}
                        onChange={(e) => handleChange("price", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={productData.stock}
                        onChange={(e) => handleChange("stock", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select 
                        value={productData.category} 
                        onValueChange={(value) => handleChange("category", value)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Basketball">Basketball</SelectItem>
                          <SelectItem value="Football">Football</SelectItem>
                          <SelectItem value="Tennis">Tennis</SelectItem>
                          <SelectItem value="Volleyball">Volleyball</SelectItem>
                          <SelectItem value="Fitness">Fitness</SelectItem>
                          <SelectItem value="Yoga">Yoga</SelectItem>
                          <SelectItem value="Running">Running</SelectItem>
                          <SelectItem value="Swimming">Swimming</SelectItem>
                          <SelectItem value="Cycling">Cycling</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Accessories">Accessories</SelectItem>
                          <SelectItem value="Apparel">Apparel</SelectItem>
                          <SelectItem value="Footwear">Footwear</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Product Description *</Label>
                      <Textarea
                        id="description"
                        rows={6}
                        value={productData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Product Features</Label>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={addFeatureField}
                        >
                          Add Feature
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {productData.features.map((feature, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder={`Feature ${index + 1}`}
                              value={feature}
                              onChange={(e) => handleFeatureField(index, e.target.value)}
                            />
                            {productData.features.length > 1 && (
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="icon"
                                className="h-10 w-10 shrink-0"
                                onClick={() => removeFeatureField(index)}
                              >
                                ×
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image Upload */}
                <div className="space-y-4">
                  <Label>Product Images</Label>
                  <div className="border-2 border-dashed rounded-md p-8 text-center">
                    <div className="flex flex-col items-center">
                      <svg 
                        className="mb-4 h-12 w-12 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <div className="text-gray-600 mb-2">
                        <Label 
                          htmlFor="file-upload" 
                          className="relative cursor-pointer bg-white rounded-md font-medium text-brand-blue hover:text-brand-blue focus-within:outline-none"
                        >
                          <span>Upload product images</span>
                          <Input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            multiple
                            accept="image/*"
                          />
                        </Label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Delivery Options (Could be expanded in a real app) */}
                <div>
                  <Label>Delivery Availability</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input id="nationwide" type="checkbox" className="w-4 h-4" />
                    <Label htmlFor="nationwide" className="text-sm">Nationwide Shipping</Label>
                  </div>
                </div>
                
                {/* Submit */}
                <div className="flex justify-end">
                  <Button type="submit">Add Product</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddProductPage;
