import React from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { Sparkles, Send, Loader2, User, Bot, ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PRODUCTS } from '../constants';
import { useStore } from '../StoreContext';
import ProductCard from './ProductCard';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AIStylist() {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<{ role: 'user' | 'ai', content: string, recommendations?: string[] }[]>([
    { role: 'ai', content: "Namaste! I am your Zariyaa Royal Stylist. Tell me about the occasion you're attending (wedding, festival, temple visit, etc.), and I'll curate the perfect heritage look for you from our collections." }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { addToCart, toggleWishlist } = useStore();

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `You are a royal Indian ethnic stylist for 'Zariyaa'. 
            Analyze the user's request and suggest products from our catalog.
            
            USER REQUEST: ${userMessage}
            
            AVAILABLE PRODUCTS (IDs and Names):
            ${MOCK_PRODUCTS.map(p => `${p.id}: ${p.name} (${p.category}, ${p.ethnicity})`).join('\n')}
            
            INSTRUCTIONS:
            1. Provide a helpful, royal styling advice in markdown.
            2. Identify up to 4 product IDs from the list that best match the request.
            3. Return the response in JSON format with 'advice' (markdown string) and 'productIds' (array of strings).` }]
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              advice: { type: Type.STRING },
              productIds: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["advice", "productIds"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: data.advice || "I have curated some royal selections for you.",
        recommendations: data.productIds || []
      }]);
    } catch (error) {
      console.error("AI Stylist Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Forgive me, my royal wisdom is momentarily clouded. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <div className="bg-white royal-border shadow-2xl overflow-hidden flex flex-col h-[700px]">
        {/* Header */}
        <div className="bg-maroon-900 p-6 border-b border-gold-500/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-maroon-900 shadow-lg">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-serif text-gold-400 tracking-wide">Royal AI Stylist</h2>
            <p className="text-xs text-gold-200/70 uppercase tracking-widest">Intelligent Heritage Consultation</p>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-8 paisley-bg bg-stone-50/50"
        >
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-maroon-700 text-gold-200' : 'bg-gold-500 text-maroon-900'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-maroon-900 text-gold-100 rounded-tr-none' 
                      : 'bg-white border border-gold-500/20 text-stone-800 rounded-tl-none'
                  }`}>
                    <div className="prose prose-sm prose-stone max-w-none prose-headings:font-serif prose-headings:text-maroon-900">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 ml-11">
                    {msg.recommendations.map(id => {
                      const product = MOCK_PRODUCTS.find(p => p.id === id);
                      if (!product) return null;
                      return (
                        <div key={id} className="scale-90 origin-top-left">
                          <ProductCard product={product} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gold-500/20 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 size={18} className="animate-spin text-gold-600" />
                <span className="text-sm font-serif italic text-stone-500">Stylist is curating your royal look...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gold-500/20">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your event (e.g., wedding, festival, temple visit)..."
              className="w-full bg-stone-50 border border-gold-500/30 rounded-full px-6 py-4 pr-16 focus:outline-none focus:border-gold-500 transition-colors font-serif text-lg"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-3 bg-maroon-900 text-gold-400 rounded-full hover:bg-maroon-800 transition-colors disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-[10px] text-center mt-3 text-stone-400 uppercase tracking-widest">
            Zariyaa Royal Intelligence • Real-time Product Integration
          </p>
        </div>
      </div>
    </div>
  );
}
