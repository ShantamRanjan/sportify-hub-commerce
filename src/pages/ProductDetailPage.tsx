
import { useParams, Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Heart, ShoppingCart, Check, Truck } from "lucide-react";
import { useToast } from "@/components/ui/sonner";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, addToWishlist, isInWishlist, getCartItemQuantity } = useStore();
  const toast = useToast();

  const product = products.find((p) => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-brand-blue mb-4">Product Not Found</h1>
            <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Button>
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    toast(`${product.name} added to cart`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast(`${product.name} added to wishlist`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-brand-blue transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link to="/products" className="text-gray-500 hover:text-brand-blue transition-colors">
                  Products
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link 
                  to={`/categories/${product.category.toLowerCase()}`} 
                  className="text-gray-500 hover:text-brand-blue transition-colors"
                >
                  {product.category}
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-brand-blue font-medium truncate max-w-[200px]">{product.name}</li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="bg-white rounded-lg p-4">
              <div className="overflow-hidden rounded-lg aspect-square">
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
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <span className="text-sm text-brand-accent font-medium mb-2 block">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-brand-dark mb-3">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">(24 reviews)</span>
                </div>
                <p className="text-2xl font-bold text-brand-blue mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-600 mb-6">{product.description}</p>
              </div>

              {/* Actions */}
              <div className="space-y-4 mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {getCartItemQuantity(product.id) > 0 ? 'Add Another' : 'Add to Cart'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? "fill-brand-orange text-brand-orange" : ""}`} />
                    {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>
                <Button 
                  className="w-full bg-brand-blue hover:bg-brand-blue/90"
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  {product.inStock ? (
                    <>
                      <Check size={18} className="text-green-600" />
                      <span className="font-medium">In Stock</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium text-red-500">Out of Stock</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-brand-accent" />
                  <span>Free shipping on orders over $50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="features" className="mb-12">
            <TabsList className="grid grid-cols-3 max-w-md">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Product Features</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-b pb-2">
                    <span className="font-medium">Brand:</span> SportifyHub
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Model:</span> {product.name}
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Category:</span> {product.category}
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Weight:</span> 1.2 kg
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Dimensions:</span> 20 x 15 x 10 cm
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Material:</span> Premium Grade
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Warranty:</span> 1 Year
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Origin:</span> Imported
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 font-medium">Excellent Quality</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      This product exceeded my expectations. The quality is outstanding and it arrived sooner than expected.
                    </p>
                    <p className="text-xs text-gray-500">By John D. - 2 weeks ago</p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 font-medium">Great Purchase</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      I've been using this for a few weeks now and it has significantly improved my game. Would definitely recommend.
                    </p>
                    <p className="text-xs text-gray-500">By Sarah M. - 1 month ago</p>
                  </div>
                  <div>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-brand-blue mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
