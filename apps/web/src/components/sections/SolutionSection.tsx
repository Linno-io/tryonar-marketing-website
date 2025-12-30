import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui';
import { Search, Bell, ChevronDown, Plus, Trash2, RotateCw, Copy } from 'lucide-react';

const SolutionSection: React.FC = () => {
  return (
    <section className="bg-[#F3F4F6] py-20 px-4 font-sans">
        <Container>
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Ready to Solve These <span className="text-gray-400">Challenges?</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                TryonAR transforms these pain points into competitive advantages with our no-code AR solution.
                </p>
            </div>

            <div className="relative max-w-6xl mx-auto mb-16">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 via-purple-200 to-blue-200 blur-3xl opacity-60 rounded-[3rem]" />
                
                <div className="relative bg-white/80 backdrop-blur-md border border-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">          
                <aside className="w-full md:w-64 bg-white border-r border-gray-100 p-6 flex flex-col">
                    <div className="mb-8 px-2">
                    <div className="grid grid-cols-3 gap-1 w-6 opacity-80">
                        {[...Array(9)].map((_, i) => <div key={i} className="w-1 h-1 bg-black rounded-full" />)}
                    </div>
                    </div>
                    
                    <nav className="space-y-6 flex-1 text-sm font-medium text-gray-500">
                    <div className="space-y-4">
                        <p className="flex items-center gap-3 px-2"><span className="w-4 h-4 border border-gray-300 rounded-sm"/> Feed</p>
                        <p className="flex items-center gap-3 px-2 text-black bg-gray-50 py-2 rounded-lg font-bold"><span className="w-4 h-4 bg-black rounded-sm"/> Products</p>
                        <p className="flex items-center gap-3 px-2"><span className="w-4 h-4 border border-gray-300 rounded-sm"/> Performance</p>
                    </div>
                    </nav>

                    <div className="mt-auto pt-6 border-t border-gray-100 space-y-4 text-xs text-gray-400">
                    <p className="flex items-center gap-2"><span className="w-4 h-4 border border-gray-300 rounded-sm"/> Knowledge</p>
                    <p className="flex items-center gap-2"><span className="w-4 h-4 border border-gray-300 rounded-sm"/> Settings</p>
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 mt-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px]">S</div>
                        <div>
                        <p className="text-black font-bold">Circle Fashion</p>
                        <p className="scale-90 origin-left">Shopify</p>
                        </div>
                    </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 bg-white p-6">
                    <header className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black rounded-sm" /> Products
                    </h3>
                    <div className="flex items-center gap-4">
                        <Search size={18} className="text-gray-400" />
                        <Bell size={18} className="text-gray-400" />
                        <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                        <div className="w-6 h-6 bg-gray-300 rounded-full" />
                        <span className="text-xs font-semibold">Olivia</span>
                        <ChevronDown size={14} />
                        </div>
                        <button className="bg-black text-white text-xs px-4 py-2 rounded-lg font-medium">Upgrade</button>
                    </div>
                    </header>

                    <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-[2] bg-rose-50/50 rounded-2xl p-6 relative flex flex-col items-center border border-rose-100/50">
                        <div className="w-full flex justify-between mb-4">
                            <span className="text-[10px] bg-white/80 px-2 py-1 rounded-md border border-rose-100 flex items-center gap-1 font-bold">
                            <div className="w-2 h-2 rounded-full border border-purple-400" /> 3D Model
                            </span>
                            <Trash2 size={16} className="text-gray-400 cursor-pointer" />
                        </div>
                        
                        <div className="w-full h-64 relative flex items-center justify-center">
                            <div className="w-4/5 h-4/5 bg-slate-800 rounded-b-full rounded-t-3xl relative overflow-hidden shadow-2xl">
                            <div className="absolute bottom-0 w-full h-1/3 bg-orange-200" />
                            </div>
                        </div>

                        <div className="mt-8 text-center space-y-4">
                            <p className="text-[10px] text-gray-500 flex flex-col items-center gap-1">
                            <RotateCw size={14} /> Drag to Rotate
                            </p>
                            <div className="flex gap-2">
                            {['#fff', '#f3f4f6', '#fecaca', '#dbeafe', '#fef3c7', '#dcfce7'].map((c, i) => (
                                <div key={i} className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: c }} />
                            ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
                            <div className="w-32 h-32 bg-slate-100 mx-auto mb-4 rounded-xl flex items-center justify-center">
                            <div className="w-24 h-24 border-4 border-black border-dashed opacity-20" />
                            </div>
                            <p className="text-[10px] text-gray-500 mb-4 px-2">Scan the QR code with your mobile camera to review model</p>
                            <button className="w-full py-2 bg-gray-50 text-[10px] font-bold rounded-lg border border-gray-100 flex items-center justify-center gap-2">
                            <Copy size={12} /> Copy Script
                            </button>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                            <p className="text-[10px] font-bold mb-4 flex items-center gap-2">
                            <span className="w-4 h-4 bg-slate-100 rounded-full flex items-center justify-center text-[8px]">⚙</span> Additional Settings
                            </p>
                            <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] text-gray-500">Show Dimensions</span>
                            <div className="w-8 h-4 bg-black rounded-full relative"><div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"/></div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                            {['Height', 'Width', 'Length'].map(f => (
                                <div key={f} className="text-[8px] p-2 border border-gray-100 rounded bg-gray-50 text-gray-400">{f}</div>
                            ))}
                            </div>
                        </div>
                    </div>
                    </div>
                </main>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="bg-[#1A1A1A] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-xl">
                See Our Solution
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-45">
                    <path d="M3.5 11.5L11.5 3.5M11.5 3.5H3.5M11.5 3.5V11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </button>
                <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
                Calculate ROI
                </button>
            </div>
        </Container>
      
    </section>
  );
};

export default SolutionSection;