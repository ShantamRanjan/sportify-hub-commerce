
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useStore, type Product } from "@/contexts/StoreContext";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, isInWishlist } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast(`${product.name} added to cart`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
    toast(`${product.name} added to wishlist`);
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="product-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        <div className="relative overflow-hidden h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white opacity-80 hover:opacity-100"
              onClick={handleAddToWishlist}
            >
              <Heart size={18} className={isInWishlist(product.id) ? "fill-brand-orange text-brand-orange" : ""} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white opacity-80 hover:opacity-100"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
          {!product.inStock && (
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white text-center py-1">
              Out of Stock
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
            <h3 className="font-semibold text-lg mb-2 text-brand-dark">{product.name}</h3>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-brand-blue">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
