import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Store, MapPin, Phone, FileText, CheckCircle, ArrowRight } from 'lucide-react';

export default function VendorRegistration() {
  const [step, setStep] = React.useState(1);

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-3 gap-12">
        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-maroon-900 p-8 royal-border text-gold-200">
            <h2 className="text-3xl font-serif text-gold-400 mb-4">Empower Your Craft</h2>
            <p className="text-sm opacity-80 leading-relaxed">
              Join Zariyaa and showcase your traditional ethnic wear to a global audience. We support local vendors and roadside artisans.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { id: 1, name: 'Vendor Details', icon: Store },
              { id: 2, name: 'Documentation', icon: FileText },
              { id: 3, name: 'Verification', icon: CheckCircle },
            ].map((s) => (
              <div 
                key={s.id}
                className={`flex items-center gap-4 p-4 royal-border transition-all ${step === s.id ? 'bg-gold-100 border-gold-500' : 'bg-white opacity-50'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === s.id ? 'bg-maroon-900 text-gold-300' : 'bg-stone-100 text-stone-400'}`}>
                  <s.icon size={20} />
                </div>
                <span className="font-serif text-lg text-maroon-900">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2 bg-white royal-border p-10 shadow-xl">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h3 className="text-3xl font-serif text-maroon-900 border-b border-gold-500/20 pb-4">Vendor Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">Shop / Vendor Name</label>
                  <input type="text" placeholder="e.g., Jaipur Heritage Weaves" className="w-full px-4 py-3 bg-stone-50 border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">Contact Person</label>
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-stone-50 border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-gold-600" size={16} />
                    <input type="tel" placeholder="+91 00000 00000" className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">City / Region</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 text-gold-600" size={16} />
                    <input type="text" placeholder="e.g., Varanasi, UP" className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">About Your Craft</label>
                <textarea rows={4} placeholder="Tell us about the heritage and tradition behind your products..." className="w-full px-4 py-3 bg-stone-50 border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif"></textarea>
              </div>

              <button onClick={() => setStep(2)} className="btn-gold w-full py-4 flex items-center justify-center gap-2">
                Continue to Documentation <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h3 className="text-3xl font-serif text-maroon-900 border-b border-gold-500/20 pb-4">Documentation</h3>
              
              <div className="space-y-6">
                <div className="p-8 border-2 border-dashed border-gold-500/30 bg-stone-50 text-center space-y-4">
                  <FileText size={48} className="mx-auto text-gold-400" />
                  <div>
                    <p className="font-serif text-lg text-maroon-900">Upload Identity Proof</p>
                    <p className="text-xs text-stone-500">Aadhar Card, PAN Card, or Voter ID</p>
                  </div>
                  <button className="px-6 py-2 bg-white border border-gold-500/30 text-xs font-bold uppercase tracking-widest hover:bg-gold-100 transition-colors">Choose File</button>
                </div>

                <div className="p-8 border-2 border-dashed border-gold-500/30 bg-stone-50 text-center space-y-4">
                  <Store size={48} className="mx-auto text-gold-400" />
                  <div>
                    <p className="font-serif text-lg text-maroon-900">Upload Shop / Artisan Photos</p>
                    <p className="text-xs text-stone-500">Photos of your products and workspace</p>
                  </div>
                  <button className="px-6 py-2 bg-white border border-gold-500/30 text-xs font-bold uppercase tracking-widest hover:bg-gold-100 transition-colors">Choose File</button>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 border border-gold-500/30 text-maroon-900 font-serif uppercase tracking-widest">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 btn-gold py-4">Submit for Verification</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-4xl font-serif text-maroon-900">Application Submitted</h3>
              <p className="text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you for joining the Zariyaa family. Our Royal Council will review your application and contact you within 48 hours for verification.
              </p>
              <Link to="/" className="btn-royal inline-block mt-8">Return to Palace</Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
