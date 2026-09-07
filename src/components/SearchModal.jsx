import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export default function SearchModal({
  isOpen,
  onClose,
  onSelectProduct,
}) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 pt-20 select-none">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-botanical-dark/70 backdrop-blur-md transition-opacity duration-300"
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-botanical/10">
        <div className="flex items-center justify-between pb-4 border-b border-botanical/10">
          <div className="flex items-center gap-3 w-full">
            <Search className="w-5 h-5 text-gold" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search peonies, roses, bouquets, urns..."
              className="w-full text-base sm:text-lg font-serif-luxury text-botanical-dark placeholder-botanical-muted/60 focus:outline-none"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-ivory-200 text-botanical"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto divide-y divide-botanical/5">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-botanical-muted">
              <p className="font-serif-luxury text-lg text-botanical-dark mb-2">Curated Botanical Inquiries</p>
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {['Peonies', 'David Austin Roses', 'Orchids', 'Tuscan Olive', 'Ceramics'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full bg-ivory-200 text-botanical hover:bg-botanical hover:text-champagne transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-botanical-muted">
              No arrangements found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-3 flex items-center justify-between hover:bg-ivory-50 p-2 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg border border-botanical/10"
                  />
                  <div>
                    <h4 className="font-serif-luxury text-base text-botanical-dark font-medium">
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-botanical-muted uppercase tracking-wider">
                      {product.categoryName} &bull; ${product.price}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-botanical/40" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
