
import React, { useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BASE_PRICE_PER_M2, MIN_PRICE_PER_M2, DISCOUNT_STEP_M2, DISCOUNT_RATE_PER_STEP } from '../constants';

export const PriceChart: React.FC = () => {
  const getRawTotalCost = (m2: number) => {
    const steps = Math.floor(m2 / DISCOUNT_STEP_M2);
    const rawDiscount = steps * DISCOUNT_RATE_PER_STEP;
    let pricePerM2 = BASE_PRICE_PER_M2 * (1 - rawDiscount);
    if (pricePerM2 < MIN_PRICE_PER_M2) pricePerM2 = MIN_PRICE_PER_M2;
    return m2 * pricePerM2;
  };

  const data = useMemo(() => {
    const points = [];
    let lastCost = 0;
    for (let m2 = 5; m2 <= 300; m2 += 5) {
      let cost = getRawTotalCost(m2);
      // Enforce monotonicity
      if (cost < lastCost) cost = lastCost;
      lastCost = cost;
      
      points.push({
        area: m2,
        totalCost: Math.round(cost)
      });
    }
    return points;
  }, []);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-[400px]">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
        Investment Scaling
        <span className="text-xs font-normal text-slate-400">How your budget scales with space</span>
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="area" 
            stroke="#94a3b8"
            fontSize={12}
            tickFormatter={(value) => `${value}m²`}
          />
          <YAxis 
            stroke="#94a3b8"
            fontSize={12}
            tickFormatter={(value) => `${value/1000}k`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            formatter={(value: any) => [`${value.toLocaleString()} SAR`, 'Total Investment']}
            labelFormatter={(label) => `${label} m² Space`}
          />
          <Area 
            type="monotone" 
            dataKey="totalCost" 
            stroke="#6366f1" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorTotal)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
