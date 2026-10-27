import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { Gender } from '../../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGender?: Gender;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  defaultGender = 'women',
}) => {
  const [activeTab, setActiveTab] = useState<'women' | 'men'>(
    defaultGender === 'men' ? 'men' : 'women'
  );
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const womenMeasurementsInches = [
    { size: 'XS (UK 6)', bust: '32', waist: '25 - 26', hip: '35 - 36', length: '25' },
    { size: 'S (UK 8)', bust: '34', waist: '27 - 28', hip: '37 - 38', length: '25.5' },
    { size: 'M (UK 10)', bust: '36', waist: '29 - 30', hip: '39 - 40', length: '26' },
    { size: 'L (UK 12)', bust: '38', waist: '31 - 32', hip: '41 - 42', length: '26.5' },
    { size: 'XL (UK 14)', bust: '41', waist: '34 - 35', hip: '44 - 45', length: '27' },
    { size: 'XXL (UK 16)', bust: '44', waist: '37 - 38', hip: '47 - 48', length: '27.5' },
  ];

  const menMeasurementsInches = [
    { size: 'S (38)', chest: '38', shoulder: '17.5', length: '28', sleeve: '8.5' },
    { size: 'M (40)', chest: '40', shoulder: '18.2', length: '29', sleeve: '9.0' },
    { size: 'L (42)', chest: '42', shoulder: '19.0', length: '30', sleeve: '9.5' },
    { size: 'XL (44)', chest: '44', shoulder: '19.8', length: '31', sleeve: '10.0' },
    { size: 'XXL (46)', chest: '46', shoulder: '20.5', length: '32', sleeve: '10.5' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8DED2] overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DED2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F8F5F0] text-[#8D2337] flex items-center justify-center">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#191919]">Apparel Sizing Guide</h3>
              <p className="text-xs text-zinc-500">Buytiful True-To-Fit Garment Measurements</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-[#191919] hover:bg-[#F8F5F0] rounded-full transition-colors cursor-pointer"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls: Gender Tab & Units */}
        <div className="flex items-center justify-between py-4 flex-wrap gap-3">
          <div className="flex items-center gap-1 p-1 bg-[#F8F5F0] rounded-xl border border-[#E8DED2]">
            <button
              onClick={() => setActiveTab('women')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'women'
                  ? 'bg-white text-[#191919] shadow-2xs'
                  : 'text-zinc-600 hover:text-[#191919]'
              }`}
            >
              Women's Sizing
            </button>
            <button
              onClick={() => setActiveTab('men')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'men'
                  ? 'bg-white text-[#191919] shadow-2xs'
                  : 'text-zinc-600 hover:text-[#191919]'
              }`}
            >
              Men's Sizing
            </button>
          </div>

          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <span>Units:</span>
            <button
              onClick={() => setUnit('inches')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                unit === 'inches' ? 'bg-[#191919] text-white' : 'bg-[#F8F5F0] text-zinc-700'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                unit === 'cm' ? 'bg-[#191919] text-white' : 'bg-[#F8F5F0] text-zinc-700'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-[#E8DED2] rounded-2xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F8F5F0] text-zinc-700 font-bold uppercase tracking-wider text-[11px] border-b border-[#E8DED2]">
              {activeTab === 'women' ? (
                <tr>
                  <th className="p-3">Standard Size</th>
                  <th className="p-3">Bust ({unit})</th>
                  <th className="p-3">Waist ({unit})</th>
                  <th className="p-3">Hips ({unit})</th>
                  <th className="p-3">Length ({unit})</th>
                </tr>
              ) : (
                <tr>
                  <th className="p-3">Standard Size</th>
                  <th className="p-3">Chest ({unit})</th>
                  <th className="p-3">Shoulder ({unit})</th>
                  <th className="p-3">Length ({unit})</th>
                  <th className="p-3">Sleeve ({unit})</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-[#E8DED2]/60">
              {activeTab === 'women'
                ? womenMeasurementsInches.map((row) => (
                    <tr key={row.size} className="hover:bg-[#F8F5F0]/50 transition-colors">
                      <td className="p-3 font-bold text-[#191919]">{row.size}</td>
                      <td className="p-3 tabular-nums">{unit === 'inches' ? `${row.bust}"` : `${Math.round(parseFloat(row.bust) * 2.54)} cm`}</td>
                      <td className="p-3 tabular-nums">{unit === 'inches' ? `${row.waist}"` : `${row.waist} in`}</td>
                      <td className="p-3 tabular-nums">{unit === 'inches' ? `${row.hip}"` : `${row.hip} in`}</td>
                      <td className="p-3 tabular-nums">{unit === 'inches' ? `${row.length}"` : `${Math.round(parseFloat(row.length) * 2.54)} cm`}</td>
                    </tr>
                  ))
                : menMeasurementsInches.map((row) => (
                    <tr key={row.size} className="hover:bg-[#F8F5F0]/50 transition-colors">
                      <td className="p-3 font-bold text-[#191919]">{row.size}</td>
                      <td className="p-3 tabular-nums">{unit === 'inches' ? `${row.chest}"` : `${Math.round(parseFloat(row.chest) * 2.54)} cm`}</td>
                      <td className="p-3 tabular-nums">{unit === 'inches' ? `${row.shoulder}"` : `${Math.round(parseFloat(row.shoulder) * 2.54)} cm`}</td>
                      <td className="p-3 tabular-nums">{unit === 'inches' ? `${row.length}"` : `${Math.round(parseFloat(row.length) * 2.54)} cm`}</td>
                      <td className="p-3 tabular-nums">{unit === 'inches' ? `${row.sleeve}"` : `${Math.round(parseFloat(row.sleeve) * 2.54)} cm`}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tip */}
        <div className="mt-4 p-3 bg-[#F8F5F0] rounded-xl border border-[#E8DED2] text-[11px] text-zinc-600 leading-relaxed">
          <strong className="text-[#191919]">Fit Note:</strong> For an intentional oversized or streetwear aesthetic, we recommend ordering your true size. For a tailored, slimmer contour, size down one step.
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#191919] text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
