import React from 'react';
import Link from 'next/link';

const SerumsPage = () => {
    return (
        <main className="min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">Our Serums Collection</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Sample serum products - replace with your actual data */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <img 
                        src="/placeholder-serum.jpg" 
                        alt="Vitamin C Serum" 
                        className="w-full h-64 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">Vitamin C Brightening Serum</h2>
                    <p className="text-gray-600 mb-4">Enhance your skin's natural glow with our potent Vitamin C formula.</p>
                    <p className="text-lg font-bold mb-4">$49.99</p>
                    <button className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors">
                        Add to Cart
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <img 
                        src="/placeholder-serum.jpg" 
                        alt="Hyaluronic Acid Serum" 
                        className="w-full h-64 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">Hyaluronic Acid Serum</h2>
                    <p className="text-gray-600 mb-4">Deep hydration and plumping effect for all skin types.</p>
                    <p className="text-lg font-bold mb-4">$39.99</p>
                    <button className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors">
                        Add to Cart
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <img 
                        src="/placeholder-serum.jpg" 
                        alt="Retinol Serum" 
                        className="w-full h-64 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">Retinol Night Serum</h2>
                    <p className="text-gray-600 mb-4">Advanced anti-aging formula for smoother, younger-looking skin.</p>
                    <p className="text-lg font-bold mb-4">$59.99</p>
                    <button className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
      </main>
  );
}
export default SerumsPage;
