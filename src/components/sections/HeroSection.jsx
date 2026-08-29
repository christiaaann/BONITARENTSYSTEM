import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import { useNavigate } from 'react-router-dom';

const slides = [image1, image2, image3];
const HeroSection = () => {
const navigate = useNavigate();  
const [currentSlide, setCurrentSlide] = useState(0);
const [isSearching, setIsSearching] = useState(false);
const [isNavigating, setIsNavigating] = useState(false);

const searchRef = useRef(null);
const [products, setProducts] = useState([]);
const [searchItem, setSearchItem] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [showSuggestions, setShowSuggestions] = useState(false);
const [selectedIndex, setSelectedIndex] = useState(-1);
const [isSearchingLoading, setIsSearchingLoading] = useState(false);

// =====================================================================================
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/apparel`
      );

      const data = await res.json();

      setProducts(data);

         // Random 5 products
      const randomProducts = [...data]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);

      setSuggestions(randomProducts);

    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  fetchProducts();
}, []);

// ====================================================================================
useEffect(() => {
  const query = searchItem.trim().toLowerCase();

  // WALANG SEARCH TEXT
  if (!query) {
    const randomProducts = [...products]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    setSuggestions(randomProducts);
    setIsSearchingLoading(false);
    return;
  }

  setIsSearchingLoading(true);

  const timer = setTimeout(() => {
    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(query)
    );

    setSuggestions(filtered.slice(0, 5));
    setIsSearchingLoading(false);
  }, 400);

  return () => clearTimeout(timer);
}, [searchItem, products]);


// ===================================================================== 
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setIsSearching(false);
      setShowSuggestions(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
// =======================================================================  
    useEffect(() => {
      const interval = window.setInterval(() => {
        setCurrentSlide((current) => (current + 1) % slides.length);
      }, 5500);

      return () => window.clearInterval(interval);
    }, []);

    const scrollToCatalog = () => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <>
      <section className="relative flex items-center max-w-360 md:mt-20 mx-auto md:rounded-4xl isolate  overflow-hidden bg-stone-950 sm:min-h-162.5">
        <div className="absolute inset-0 z-10">
       </div>
        {slides.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={index === currentSlide ? 'Bonita rental collection' : ''}
            aria-hidden={index !== currentSlide}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1400 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-stone-950/45" />
        <div className="absolute inset-0 bg-linear-to-r from-stone-950/90 via-stone-950/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-stone-950/50 to-transparent" />
   
   
        <div className="relative mx-auto flex min-h-147.5 max-w-7xl w-full borde px-6 pb-20 pt-36 sm:min-h-162.5 sm:px-10 sm:pb-24 lg:px-12">
   <div className="relative max-w-2xl">

  {/* ORIGINAL HERO */}
  <div
    className={`text-white transition-all duration-500 ease-in-out ${
      isSearching
        ? "pointer-events-none -translate-y-4 opacity-0"
        : "translate-y-0 opacity-100"
    }`}
  >
    <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/70 sm:text-xs">
      Bonita Rentals · Curated for your moment
    </p>

    <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
      Make the moment
      <span className="block italic text-amber-100">
        entirely yours.
      </span>
    </h1>

    <p className="mt-6 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
      Discover distinctive gowns, suits, and event pieces chosen to make
      every celebration feel unforgettable.
    </p>
  </div>

  {/* SEARCH */}
<div
  className={`relative z-100 w-full transition-transform duration-500 ease-in-out ${
    isSearching
      ? "md:-translate-y-87.5 -translate-y-50"
      : "translate-y-0"
  }`}
>
 <div ref={searchRef} className="relative mt-9 w-full z-200">

    <input
    className="w-full rounded-full focus:outline-amber-100 focus:outline-4 bg-white/90 px-6 md:py-5 py-3 pr-38 text-black placeholder:font-semibold placeholder:text-stone-500"
    placeholder="Describe what you need"
    autoComplete="off"
    value={searchItem}
    onChange={(e) => {
    setSearchItem(e.target.value);
    setShowSuggestions(true);
  }}
    type="text"
    name="search"
    id="search"
    onFocus={() => {
      setIsSearching(true);
      setShowSuggestions(true);
    }}
  />

  <button
    type="button"
    onClick={scrollToCatalog}
    className="absolute right-2 top-1/2 flex -translate-y-1/2 cursor-pointer items-center gap-2 rounded-full bg-stone-800 md:px-10 px-5 md:py-3 py-1 text-lg tracking-[0.16em] text-white transition-colors hover:bg-stone-700"
  >
  <Search />
    Search
  </button>

{showSuggestions && (
  <div className="absolute w-72 left-0 right-0 top-full z-9999 mt-2">

    {/* LOADING */}
    {isSearchingLoading ? (
      <div className="flex items-center gap-3 px-4 py-4 text-white">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

        <span className="text-sm tracking-wide">
          Searching...
        </span>
      </div>
    ) : suggestions.length > 0 ? (

      <>
        {/* TITLE */}
        {!searchItem && (
          <div className="px-4 py-3 text-sm font-semibold uppercase tracking-widest text-white">
            Suggested for you
          </div>
        )}

        {/* RESULTS */}
        {suggestions.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSearchItem(item.name);
              setSelectedIndex(-1);
              setShowSuggestions(false);
                setIsNavigating(true);

              setTimeout(() => {
              navigate(`/product/${item.id}`);
            }, 1000);
            }}
            className={`flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left text-sm transition-colors ${
              selectedIndex === index
                ? "bg-stone-100 text-stone-900"
                : "text-white"
            }`}
          >
            <Search size={20} />
            {item.name}
          </button>
        ))}
      </>

    ) : (

      /* NO RESULTS */
      searchItem && (
        <div className="px-4 py-4 text-sm text-white/70">
          No products found.
        </div>
      )

    )}

  </div>
)}
    </div>

    {/* FIND YOUR FIT */}
    <div
      className={`transition-all duration-300 ${
        isSearching
          ? "pointer-events-none opacity-0"
          : "opacity-100 "
      }`}
    >
      <button
        type="button"
        onClick={scrollToCatalog}
        className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:text-amber-100"
      >
        Find your fit
      </button>
      
    </div>

  </div>

</div>
          <div className="absolute bottom-7 right-6 flex items-center gap-3 sm:right-10 lg:right-12">
            <div className="flex gap-2" aria-label="Hero slides">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  aria-pressed={index === currentSlide}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 transition-all ${
                    index === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/45 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
            {/* <button
              type="button"
              onClick={scrollToCatalog}
              aria-label="Scroll to collection"
              className="flex h-10 w-10 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white hover:text-stone-900"
            >
              <ArrowDown size={17} />
            </button> */}
          </div>
        </div>
      </section>
      
    {isNavigating && (
   <div className="fixed inset-0 z-99999 flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4 text-black">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-black" />
       <p className="text-xl font-semibold tracking-[0.2em]">
        Loading product...
      </p>
    </div>
  </div>
)}
      
      </>
    );
  };
  export default HeroSection;
