import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden border border-slate-100">
      <img src={product.image} alt="Product Name" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <div className="flex items-center">
          <span className="text-yellow-500">⭐ {product.rating}</span>
        </div>
      </div>
    </div>
  );
}
