import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useStore } from '../StoreContext';

export default function Login() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  
  const { login } = useStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all royal fields.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please provide a valid royal email.');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login({
        id: Math.random().toString(36).substr(2, 9),
        name: isLogin ? 'Maharaja User' : name,
        email: email,
        role: 'customer'
      });
      setIsLoading(false);
      navigate(redirect);
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 paisley-bg">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white royal-border shadow-2xl overflow-hidden"
      >
        <div className="bg-maroon-900 p-8 text-center border-b border-gold-500/30">
          <h2 className="text-3xl font-serif text-gold-400 tracking-wide">
            {isLogin ? 'Welcome Back' : 'Join the Heritage'}
          </h2>
          <p className="text-xs text-gold-200/70 uppercase tracking-widest mt-2">
            {isLogin ? 'Continue your royal journey' : 'Begin your cultural experience'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 p-3 flex items-center gap-3 text-red-600 text-sm"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gold-600" size={18} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Maharaja / Maharani Name" 
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gold-600" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="royal@heritage.com" 
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">Password</label>
              {isLogin && (
                <button type="button" className="text-[10px] text-gold-600 uppercase tracking-widest hover:underline">Forgot?</button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gold-600" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full btn-royal py-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')} <ArrowRight size={20} />
          </button>

          <div className="text-center space-y-4">
            <p className="text-sm text-stone-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-maroon-900 font-bold hover:underline"
              >
                {isLogin ? 'Register Now' : 'Sign In'}
              </button>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
