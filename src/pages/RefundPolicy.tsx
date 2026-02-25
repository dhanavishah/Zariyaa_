import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif text-maroon-900 mb-8 border-b border-gold-500/20 pb-4">Refund & Rental Policy</h1>
      <div className="prose prose-stone max-w-none font-serif text-stone-700 space-y-6">
        <p>Zariyaa ensures that every patron is satisfied with their heritage selection. Please review our policies for purchases and rentals.</p>
        
        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">1. Purchase Returns</h2>
          <p>Items purchased can be returned within 7 days of delivery if they are in their original, unworn condition with all royal tags intact. Hand-crafted items may have slight variations which are not considered defects.</p>
        </section>

        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">2. Rental Terms</h2>
          <p>Rental items must be returned by the specified date. A security deposit is required for all rentals and will be refunded upon the safe return of the item. Late returns or damages will result in deductions from the security deposit.</p>
        </section>

        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">3. Refund Process</h2>
          <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds will be processed to your original payment method within 5-7 business days.</p>
        </section>

        <section>
          <h2 className="text-2xl text-maroon-800 mb-4">4. Non-Returnable Items</h2>
          <p>Custom-tailored outfits and certain jewellery items for hygiene reasons are non-returnable unless they arrive damaged.</p>
        </section>
      </div>
    </div>
  );
}
