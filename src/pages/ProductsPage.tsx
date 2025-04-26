
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/contexts/StoreContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ProductsPage = () => {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [inStockOnly, setInStockOnly] = useState(false);

  // Extract unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Filter products based on search, category, and in-stock status
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    const matchesStock = !inStockOnly || product.inStock;
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0; // default
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-brand-blue mb-8">All Products</h1>

          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Featured</SelectItem>
                  <SelectItem value="priceLow">Price: Low to High</SelectItem>
                  <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="inStock" 
                checked={inStockOnly}
                onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
              />
              <Label htmlFor="inStock">In stock only</Label>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-500">No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
