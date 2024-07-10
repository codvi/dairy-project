import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category: '', stock: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.get('http://localhost:3000/getProducts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      
      console.log('Adding new product with token:', token); // Log token before request
      console.log('New product data:', newProduct); // Log new product data before request

      const response = await axios.post('http://localhost:3000/createProduct', newProduct, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      console.log('Added product:', response.data.product); // Log response after successful addition

      setProducts([...products, response.data.product]);
      setNewProduct({ name: '', price: '', description: '', category: '', stock: '', image: '' });
    } catch (error) {
      console.error('Error adding product:', error); // Log error if request fails
    }
  };

  const handleEditProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.post(`http://localhost:3000/updateProduct/${id}`, editingProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedProducts = products.map((product) =>
        product.productID === id ? response.data.product : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.delete(`http://localhost:3000/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product.productID !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold">Products</h2>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Add New Product</h3>
        <div className="mt-2 flex flex-col md:flex-col grow space-y-4 md:space-y-5 px-5">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded-lg"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded-lg"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded-lg"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded-lg"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded-lg"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded-lg"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Product List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {products.map((product) => (
            <div key={product.productID} className="border p-4 rounded bg-white">
              {editingProduct && editingProduct.productID === product.productID ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="border p-2 mr-2 rounded"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="border p-2 mr-2 rounded"
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="border p-2 mr-2 rounded"
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="border p-2 mr-2 rounded"
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="border p-2 mr-2 rounded"
                  />
                  <button
                    onClick={() => handleEditProduct(product.productID)}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-bold">{product.name}</h4>
                  <p>Product ID: {product.productID}</p>
                  <p>Price: {product.price}</p>
                  <p>Description: {product.description}</p>
                  <p>Category: {product.category}</p>
                  <p>Stock: {product.stock}</p>
                  {product.image && <img src={product.image} alt={product.name} className="w-full h-auto mt-2" />}
                  <div className="mt-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-yellow-500 text-white p-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.productID)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
