import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif text-maroon-900 mb-8 border-b border-gold-500/20 pb-4">Terms of Service</h1>
      <div className="prose prose-stone max-w-none font-serif text-stone-700 space-y-6">
        <p>Welcome to Zariyaa. By accessing our royal collections, you agree to the following terms and conditions.</p>
        
        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">1. Acceptance of Terms</h2>
          <p>By using the Zariyaa platform, you acknowledge that you have read, understood, and agree to be bound by these terms. We reserve the right to update these terms at any time without prior notice.</p>
        </section>

        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">2. Product Authenticity</h2>
          <p>Zariyaa prides itself on sourcing authentic Indian heritage wear. While we strive for accuracy, minor variations in color and hand-crafted details are inherent to traditional artisanal products and should be celebrated as unique marks of heritage.</p>
        </section>

        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">3. User Conduct</h2>
          <p>Users are expected to interact with our platform and vendors with respect. Any fraudulent activity or misuse of the rental system will result in immediate termination of access and potential legal action.</p>
        </section>

        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">4. Intellectual Property</h2>
          <p>All content on this site, including designs, logos, and images, is the property of Zariyaa or our artisan partners and is protected by international copyright laws.</p>
        </section>
      </div>
    </div>
  );
}
