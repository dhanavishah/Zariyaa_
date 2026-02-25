import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif text-maroon-900 mb-8 border-b border-gold-500/20 pb-4">Privacy Policy</h1>
      <div className="prose prose-stone max-w-none font-serif text-stone-700 space-y-6">
        <p>At Zariyaa, we hold your privacy in the highest regard, much like the treasures we curate.</p>
        
        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">1. Information Collection</h2>
          <p>We collect information necessary to provide you with a personalized royal shopping experience. This includes your name, contact details, and heritage preferences provided during registration or consultation with our AI Stylist.</p>
        </section>

        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">2. Use of Information</h2>
          <p>Your data is used solely for order processing, improving our collections, and providing personalized styling recommendations. We never sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">3. Data Security</h2>
          <p>We employ industry-standard encryption and security protocols to protect your data from unauthorized access. Your financial transactions are processed through secure, certified payment gateways.</p>
        </section>

        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">4. Cookies</h2>
          <p>Our platform uses cookies to enhance your browsing experience and remember your royal selections across sessions.</p>
        </section>
      </div>
    </div>
  );
}
