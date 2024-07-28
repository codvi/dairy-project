import React from 'react';

export default function Cart({ cartItems, removeFromCart }) {
  const totalAmount = cartItems.reduce((total, product) => total + product.price, 0);

  return (
    <div className="px-5 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {cartItems.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h3>
            </div>
          ) : (
            cartItems.map((product, index) => (
              <div key={`${product.productID}-${index}`} className="bg-white p-6 mb-4 rounded-lg shadow-lg flex items-center">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg mr-4"
                  />
                )}
                <div className="flex-grow">
                  <h4 className="text-lg font-bold text-gray-800">{product.name}</h4>
                  <p className="text-gray-600 mb-1">Price: ${product.price.toFixed(2)}</p>
                  <p className="text-gray-600 mb-1">Category: {product.category}</p>
                  <p className="text-gray-600 mb-1">Stock: {product.stock}</p>
                  <p className="text-gray-600">Description: {product.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => removeFromCart(product)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Items:</span>
              <span className="text-gray-800 font-bold">{cartItems.length}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Total Amount:</span>
              <span className="text-gray-800 font-bold">${totalAmount.toFixed(2)}</span>
            </div>
            <button className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
