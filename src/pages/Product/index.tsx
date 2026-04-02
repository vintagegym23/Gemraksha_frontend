import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Product } from '../../types';
import GemstoneDetail from './GemstoneDetail';
import RingDetail from './RingDetail';
import BraceletDetail from './BraceletDetail';
import RudrakshaDetail from './RudrakshaDetail';

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-white">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4a154b] border-t-transparent" />
  </div>
);

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await api.getProductBySlug(slug);
        if (data) {
          setProduct(data);
          setCategory(data.category || 'Gemstone');
        } else {
          navigate('/collection');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/collection');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, navigate]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (!product || !slug) {
    return <LoadingFallback />;
  }

  // Route to appropriate detail component based on category
  if (category && (category.includes('Ring') || category === 'Premium Rings')) {
    return <RingDetail productSlug={slug} />;
  } else if (category && (category.includes('Bracelet') || category === 'Healing Bracelets' || category === 'Luxury Bracelets')) {
    return <BraceletDetail productSlug={slug} />;
  } else if (category && category === 'Rudraksha') {
    return <RudrakshaDetail productSlug={slug} />;
  }

  // Default to Gemstone detail
  return <GemstoneDetail productSlug={slug} />;
};

export default ProductPage;
