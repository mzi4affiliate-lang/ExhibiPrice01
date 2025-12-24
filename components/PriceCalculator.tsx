import React, { useState, useEffect, useCallback } from 'react';
import { PricingResult } from '../types';
import { BASE_PRICE_PER_M2, MIN_PRICE_PER_M2, DISCOUNT_STEP_M2, DISCOUNT_RATE_PER_STEP } from '../constants';

interface Props {
  onResultChange: (result: PricingResult) => void;
}

export const PriceCalculator: React.FC<Props> = ({ onResultChange }) => {
  const [area, setArea] = useState<number>(25);

  // Core calculation logic
  const getRawTotalCost = (m2: number) => {
    const steps = Math.floor(m2 / DISCOUNT_STEP_M2);
    const rawDiscount = steps * DISCOUNT_RATE_PER_STEP;
    let pricePerM2 = BASE_PRICE_PER_M2 * (1 - rawDiscount);
    if (pricePerM2 < MIN_PRICE_PER_M2) pricePerM2 = MIN_PRICE_PER_M2;
    return m2 * pricePerM2;
  };

  const calculatePricing = useCallback((m2: number): PricingResult => {
    // Monotonicity Check: Ensure TotalCost(A) >= TotalCost(A-1)
    let totalCost = getRawTotalCost(m2);
    
    // Simple monotonicity guard
    if (m2 > 1) {
        const prevStepTotal = getRawTotalCost(m2 - 0.1);
        if (totalCost < prevStepTotal) {
            totalCost = prevStepTotal; 
        }
    }

    const baseTotal = m2 * BASE_PRICE_PER_M2;
    const savings = Math.max(0, baseTotal - totalCost);
    const effectivePricePerM2 = m2 > 0 ? totalCost / m2 : BASE_PRICE_PER_M2;
    const discountPercentage = ((BASE_PRICE_PER_M2 - effectivePricePerM2) / BASE_PRICE_PER_M2) * 100;

    return {
      area: m2,
      pricePerM2: effectivePricePerM2,
      totalCost,
      discountPercentage,
      savings
    };
  }, []);

  useEffect(() => {
    const result = calculatePricing(area);
    onResultChange(result);
  }, [area, calculatePricing, onResultChange]);

  const result = calculatePricing(area);

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      // Limit immediate input to 200 as requested
      setArea(Math.min(val, 200));
    }
  };

  const handleBlur = () => {
    if (area < 25) setArea(25);
    if (area > 200) setArea(200);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        Space Configuration
      </h2>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-end mb-4">
            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Your Exhibition Area</label>
            <div className="text-right flex items-center justify-end">
                <input
                  type="number"
                  min="25"
                  max="200"
                  value={area || ''}
                  onChange={handleManualInputChange}
                  onBlur={handleBlur}
                  className="text-4xl font-black text-slate-900 bg-transparent border-b-2 border-dashed border-slate-200 focus:border-indigo-500 focus:outline-none w-24 text-right pr-1 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="25"
                />
                <span className="text-slate-400 font-bold ml-1 text-lg">m²</span>
            </div>
          </div>
          
          <input
            type="range"
            min="25"
            max="200"
            step="1"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
            <span>25 m²</span>
            <span>112 m²</span>
            <span>200 m²</span>
          </div>
        </div>

        <div className="pt-4">
          <div className="bg-slate-900 rounded-2xl p-8 text-center shadow-xl shadow-slate-200">
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">Estimated Project Investment</p>
            <p className="text-5xl font-black text-white mb-1">
              {result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-2xl">SAR</span>
            </p>
            <p className="text-indigo-300 text-sm font-medium mb-4">
              Rate: {result.pricePerM2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR / m²
            </p>
            <div className="inline-flex items-center px-3 py-1 bg-emerald-500/10 rounded-full">
               <span className="text-emerald-400 text-xs font-bold">
                 Includes economies of scale optimization
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};