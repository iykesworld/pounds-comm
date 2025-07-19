"use client";
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
import { createProductThunk, updateProductThunk, Product } from '../redux/slices/productsSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, Save, Star } from 'lucide-react';

interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
  
  const [form, setForm] = useState({
    name: product?.name || '',
    category: product?.category || 'smartphones',
    price: product?.price || 0,
    oldPrice: product?.oldPrice || 0,
    stock: product?.stock || 0,
    rating: product?.rating || 5,
    description: product?.description || '',
    tag: product?.tag || '',
    image: null as File | null,
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setForm(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleRatingChange = (value: number) => {
    setForm(prev => ({ ...prev, rating: value }));
    if (validationErrors['rating']) {
      setValidationErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!form.name.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (!form.category) {
      errors.category = 'Category is required';
    }
    
    if (form.price <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    
    if (form.stock < 0) {
      errors.stock = 'Stock cannot be negative';
    }

    if (form.rating < 1 || form.rating > 5) {
      errors.rating = 'Rating must be between 1 and 5';
    }
    
    if (!form.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!product && !form.image) {
      errors.image = 'Product image is required for new products';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('price', form.price.toString());
      if (form.oldPrice > 0) {
        formData.append('oldPrice', form.oldPrice.toString());
      }
      formData.append('stock', form.stock.toString());
      formData.append('rating', form.rating.toString());
      formData.append('description', form.description);
      if (form.tag) {
        formData.append('tag', form.tag);
      }
      if (form.image) {
        formData.append('image', form.image);
      }

      console.log('ProductForm: Submitting form data:', {
        name: form.name,
        category: form.category,
        price: form.price,
        stock: form.stock,
        hasImage: !!form.image
      });

      if (product) {
        // Update existing product
        await dispatch(updateProductThunk({ id: product._id, data: formData })).unwrap();
        console.log('ProductForm: Product updated successfully');
      } else {
        // Create new product
        await dispatch(createProductThunk(formData)).unwrap();
        console.log('ProductForm: Product created successfully');
      }
      
      onSuccess();
    } catch (err: any) {
      console.error('ProductForm: Error submitting form:', err);
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {product ? 'Edit Product' : 'Add New Product'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
              Product Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`mt-1 ${validationErrors.name ? 'border-red-500' : ''}`}
              placeholder="Enter product name"
            />
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.name}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">
              Category *
            </Label>
            <Select value={form.category} onValueChange={(value) => handleSelectChange('category', value)}>
              <SelectTrigger className={`mt-1 ${validationErrors.category ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smartphones">Smartphones</SelectItem>
                <SelectItem value="tablets">Tablets</SelectItem>
                <SelectItem value="smartwatches">Smartwatches</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.category && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.category}</p>
            )}
          </div>

          {/* Price and Old Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-gray-700 dark:text-gray-300">
                Price *
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className={`mt-1 ${validationErrors.price ? 'border-red-500' : ''}`}
                placeholder="0.00"
              />
              {validationErrors.price && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.price}</p>
              )}
            </div>
            <div>
              <Label htmlFor="oldPrice" className="text-gray-700 dark:text-gray-300">
                Old Price (Optional)
              </Label>
              <Input
                id="oldPrice"
                name="oldPrice"
                type="number"
                step="0.01"
                value={form.oldPrice}
                onChange={handleChange}
                className="mt-1"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <Label htmlFor="stock" className="text-gray-700 dark:text-gray-300">
              Stock Quantity *
            </Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className={`mt-1 ${validationErrors.stock ? 'border-red-500' : ''}`}
              placeholder="0"
            />
            {validationErrors.stock && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.stock}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <Label htmlFor="rating" className="text-gray-700 dark:text-gray-300">
              Rating * (1-5)
            </Label>
            <Select value={form.rating.toString()} onValueChange={(value) => handleRatingChange(Number(value))}>
              <SelectTrigger className={`mt-1 ${validationErrors.rating ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Star</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.rating && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.rating}</p>
            )}
          </div>

          {/* Tag */}
          <div>
            <Label htmlFor="tag" className="text-gray-700 dark:text-gray-300">
              Tag (Optional)
            </Label>
            <Select value={form.tag || "none"} onValueChange={(value) => handleSelectChange('tag', value === "none" ? "" : value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No tag</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className={`mt-1 min-h-[100px] ${validationErrors.description ? 'border-red-500' : ''}`}
              placeholder="Enter product description"
            />
            {validationErrors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.description}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              Product Image {!product && '*'}
            </Label>
            <div className="mt-1">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-white dark:bg-gray-800"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('image-upload')?.click()}
                    className="cursor-pointer"
                  >
                    Choose Image
                  </Button>
                </div>
              )}
              {validationErrors.image && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.image}</p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {product ? 'Update Product' : 'Create Product'}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 