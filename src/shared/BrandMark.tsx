import React from 'react';

export const BrandMark = ({ className = "w-8 h-8" }: { className?: string }) => (
  <div className={`${className} rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-sm shadow-md shadow-emerald-500/10`}>
    EB
  </div>
);
