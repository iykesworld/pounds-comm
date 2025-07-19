"use client";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/store';
import { fetchProducts } from './redux/slices/productsSlice';
import ContactUs from "./components/ContactSection"
import Footer from "./components/Footer"
import HeroSection from "./components/Hero"
import Navbar from "./components/Navbar"
import ProductsSection from "./components/ProductSection"

export default function Home() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    console.log('Homepage: Fetching products...');
    dispatch(fetchProducts());
  }, [dispatch]);

  // Group products by category
  const smartphones = products.filter(p => p.category.toLowerCase() === 'smartphones').slice(0, 4);
  const tablets = products.filter(p => p.category.toLowerCase() === 'tablets').slice(0, 4);
  const smartwatches = products.filter(p => p.category.toLowerCase() === 'smartwatches').slice(0, 4);
  const accessories = products.filter(p => p.category.toLowerCase() === 'accessories').slice(0, 4);

  console.log('Homepage: Products grouped by category:', {
    smartphones: smartphones.length,
    tablets: tablets.length,
    smartwatches: smartwatches.length,
    accessories: accessories.length
  });

  return (
    <>
      <Navbar />
      <HeroSection />
      <div id="smartphones">
        <ProductsSection 
          title="Smartphones" 
          category="smartphones" 
          products={smartphones} 
          loading={loading}
        />
      </div>
      <div id="tablets">
        <ProductsSection 
          title="Tablets" 
          category="tablets" 
          products={tablets} 
          loading={loading}
        />
      </div>
      <div id="smartwatches">
        <ProductsSection 
          title="Smartwatches" 
          category="smartwatches" 
          products={smartwatches} 
          loading={loading}
        />
      </div>
      <div id="accessories">
        <ProductsSection 
          title="Accessories" 
          category="accessories" 
          products={accessories} 
          loading={loading}
        />
      </div>
      <div id="contact">
        <ContactUs />
      </div>
      <Footer />
    </>
  )
}
