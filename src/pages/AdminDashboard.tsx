import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  TrendingUp,
  DollarSign,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-maroon-900 text-gold-200 hidden lg:flex flex-col border-r border-gold-500/30">
        <div className="p-8 border-b border-gold-500/20">
          <span className="text-2xl font-serif font-bold text-gold-400 tracking-widest uppercase">Zariyaa</span>
          <p className="text-[10px] uppercase tracking-widest opacity-60">Admin Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, active: true },
            { name: 'Products', icon: Package },
            { name: 'Vendors', icon: Users },
            { name: 'Orders', icon: ShoppingBag },
            { name: 'Analytics', icon: BarChart3 },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
            <button 
              key={item.name}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${item.active ? 'bg-gold-500 text-maroon-900' : 'hover:bg-maroon-800'}`}
            >
              <item.icon size={20} />
              <span className="font-serif text-lg">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gold-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-maroon-900 font-bold">AD</div>
            <div>
              <p className="text-sm font-bold">Admin User</p>
              <p className="text-[10px] opacity-60 uppercase">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-stone-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder="Search orders, vendors..." 
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-full focus:outline-none focus:border-gold-500 text-sm"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-stone-500 hover:text-maroon-900">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-stone-200"></div>
            <button className="btn-royal py-2 px-4 text-xs">Export Report</button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-serif text-maroon-900">Royal Overview</h1>
              <p className="text-stone-500 text-sm">Welcome back to the Zariyaa command center.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-stone-200 text-xs font-bold uppercase tracking-widest rounded shadow-sm">Last 7 Days</button>
              <button className="px-4 py-2 bg-white border border-stone-200 text-xs font-bold uppercase tracking-widest rounded shadow-sm">Last 30 Days</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Revenue', value: '₹12,45,000', change: '+12.5%', icon: DollarSign, color: 'text-emerald-600' },
              { label: 'Active Orders', value: '156', change: '+8.2%', icon: ShoppingBag, color: 'text-blue-600' },
              { label: 'New Vendors', value: '24', change: '+15.3%', icon: Users, color: 'text-purple-600' },
              { label: 'Rental Growth', value: '32%', change: '+4.1%', icon: TrendingUp, color: 'text-orange-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-lg bg-stone-50 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{stat.change}</span>
                </div>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">{stat.label}</p>
                  <p className="text-2xl font-serif text-maroon-900 font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <h3 className="text-xl font-serif text-maroon-900">Recent Royal Orders</h3>
                <button className="text-xs text-gold-600 font-bold uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-sm">
                    {[
                      { id: '#ZR-8902', user: 'Aditi Sharma', status: 'Processing', amount: '₹15,400' },
                      { id: '#ZR-8901', user: 'Rahul Verma', status: 'Shipped', amount: '₹8,200' },
                      { id: '#ZR-8900', user: 'Priya Patel', status: 'Delivered', amount: '₹22,000' },
                      { id: '#ZR-8899', user: 'Sanjay Gupta', status: 'Pending', amount: '₹5,500' },
                    ].map((order, i) => (
                      <tr key={i} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-maroon-900">{order.id}</td>
                        <td className="px-6 py-4">{order.user}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                            'bg-stone-100 text-stone-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-serif font-bold">{order.amount}</td>
                        <td className="px-6 py-4">
                          <button className="text-stone-400 hover:text-maroon-900">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vendor Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-100">
                <h3 className="text-xl font-serif text-maroon-900">Vendor Activity</h3>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { name: 'Kashi Weaves', action: 'Added 5 new sarees', time: '2h ago' },
                  { name: 'Jaipur Jewels', action: 'Updated stock', time: '5h ago' },
                  { name: 'Madurai Arts', action: 'New vendor registered', time: '1d ago' },
                  { name: 'Ludhiana Attire', action: 'Order #ZR-8901 shipped', time: '1d ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-maroon-900 font-bold flex-shrink-0">
                      {activity.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-maroon-900">{activity.name}</p>
                      <p className="text-xs text-stone-500">{activity.action}</p>
                      <div className="flex items-center gap-1 text-[10px] text-stone-400 mt-1">
                        <Clock size={10} /> {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 bg-stone-50 text-maroon-900 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-stone-100 transition-colors">
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
