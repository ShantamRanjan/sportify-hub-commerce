
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/contexts/StoreContext";

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-[url('/hero-sports.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Gear Up For <span className="text-brand-orange">Success</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Premium sports equipment for athletes of all levels. Elevate your game with SportifyHub.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/categories">Explore Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = () => {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-brand-blue">Featured Products</h2>
          <Link to="/products" className="text-brand-orange font-medium hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Categories = () => {
  const categories = [
    { name: "Basketball", image: "/basketball-category.jpg" },
    { name: "Running", image: "/running-category.jpg" },
    { name: "Fitness", image: "/fitness-category.jpg" },
    { name: "Team Sports", image: "/team-sports-category.jpg" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Shop By Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/categories/${category.name.toLowerCase()}`} key={category.name} className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-40">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-brand-blue mb-12 text-center">Why Choose SportifyHub</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-brand-blue">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
            <p className="text-gray-600">We handpick every item to ensure the highest quality and performance standards.</p>
          </div>
          <div className="text-center">
            <div className="bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-brand-blue">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Fast Shipping</h3>
            <p className="text-gray-600">Get your sporting gear delivered to your doorstep in record time.</p>
          </div>
          <div className="text-center">
            <div className="bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-brand-blue">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
            <p className="text-gray-600">Shop with confidence with our secure and trusted payment methods.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Professional Runner",
      quote: "The quality of the running shoes I purchased from SportifyHub is outstanding. They've helped me improve my performance significantly.",
      avatar: "/avatar-1.jpg",
    },
    {
      name: "Michael Chen",
      title: "Basketball Coach",
      quote: "As a coach, I always recommend SportifyHub to my players. The equipment is top-notch and the service is exceptional.",
      avatar: "/avatar-2.jpg",
    },
    {
      name: "Emily Rodriguez",
      title: "Fitness Enthusiast",
      quote: "I've been shopping at SportifyHub for all my fitness needs for years now. The variety of products and competitive prices keep me coming back.",
      avatar: "/avatar-3.jpg",
    },
  ];

  return (
    <section className="py-16 bg-brand-blue text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-brand-blue/30 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-300">{testimonial.title}</p>
                </div>
              </div>
              <p className="italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-brand-light rounded-xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest products, exclusive offers, and expert tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-brand-blue"
              />
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <Features />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
