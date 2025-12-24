
import React, { useState, useCallback } from 'react';
import { PriceCalculator } from './components/PriceCalculator';
import { PriceChart } from './components/PriceChart';
import { AIConsultant } from './components/AIConsultant';
import { PricingResult } from './types';

const App: React.FC = () => {
  const [currentPricing, setCurrentPricing] = useState<PricingResult | null>(null);

  const handlePricingChange = useCallback((result: PricingResult) => {
    setCurrentPricing(result);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-tight">ExhibiPrice</h1>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">Success Toolkit</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-400">
            <a href="#" className="text-indigo-600">Investment Tool</a>
          </nav>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            Secure This Quote
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
            Design Your Presence.
          </h2>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl font-medium">
            Find the perfect balance between floor space and brand impact with our instant project estimation tool.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-10">
            <PriceCalculator onResultChange={handlePricingChange} />
            <PriceChart />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <AIConsultant />
            
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-100">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Project Snapshot
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-indigo-100 font-medium">Reserved Space</span>
                  <span className="text-2xl font-black">{currentPricing?.area || 0} m²</span>
                </div>

                <div className="flex justify-between items-center border-b border-white/10 pb-4 pt-2">
                  <span className="text-indigo-100 font-medium">Effective Rate</span>
                  <span className="text-lg font-bold">{currentPricing?.pricePerM2.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} SAR/m²</span>
                </div>
                
                <div className="pt-2">
                  <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-1">Total Investment</p>
                  <p className="text-4xl font-black">
                    {currentPricing?.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xl">SAR</span>
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl">
                  <p className="text-xs text-indigo-100 leading-relaxed italic">
                    "This space allows for a custom island configuration with high-visibility hanging banners."
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
              <h4 className="text-slate-800 font-bold mb-3 text-sm flex items-center">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                Premium Inclusions
              </h4>
              <ul className="text-slate-500 text-xs space-y-3 font-medium">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">✓</span>
                  Full structural design & installation
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">✓</span>
                  Integrated AV and lighting solutions
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">✓</span>
                  Storage management & logistics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          <p>© 2024 ExhibiPrice Pro Success Toolkit</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
