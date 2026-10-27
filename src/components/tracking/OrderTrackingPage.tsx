import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, Truck, CheckCircle2, Clock, MapPin, Package, AlertCircle } from 'lucide-react';
import { Order } from '../../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders, getOrderById, navigateTo } = useStore();

  const [searchInput, setSearchInput] = useState(
    orders[0] ? orders[0].orderNumber : 'BUY-2026-84912'
  );
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(
    orders[0] || null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!searchInput.trim()) return;

    const found = getOrderById(searchInput.trim());
    if (found) {
      setSearchedOrder(found);
    } else {
      setErrorMsg(`No consignment found matching "${searchInput}". Please verify your Order Reference ID or AWB Tracking Number.`);
      setSearchedOrder(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-emerald-700 bg-emerald-100 border-emerald-300';
      case 'Shipped':
      case 'Out for Delivery':
        return 'text-blue-700 bg-blue-100 border-blue-300';
      case 'Cancelled':
        return 'text-rose-700 bg-rose-100 border-rose-300';
      default:
        return 'text-amber-700 bg-amber-100 border-amber-300';
    }
  };

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8D2337]">
            Consignment Tracking Desk
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#191919]">
            Track Your Buytiful Order
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
            Real-time status updates directly linked to Blue Dart and Delhivery logistics networks across India.
          </p>
        </div>

        {/* Tracking Search Input */}
        <div className="bg-white rounded-3xl border border-[#E8DED2] p-6 shadow-sm">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. BUY-2026-84912) or AWB Tracking No."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337] bg-[#F8F5F0]/50"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#191919] hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            >
              Track Order
            </button>
          </form>

          {/* Quick link hint */}
          <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-500 flex-wrap">
            <span>Recent orders in session:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setSearchInput(o.orderNumber);
                  setSearchedOrder(o);
                  setErrorMsg(null);
                }}
                className="text-[#8D2337] font-semibold hover:underline"
              >
                {o.orderNumber}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 bg-rose-50 text-rose-800 rounded-xl text-xs flex items-center gap-2 border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Tracking Result Card */}
        {searchedOrder && (
          <div className="bg-white rounded-3xl border border-[#E8DED2] overflow-hidden shadow-xs space-y-6 p-6 sm:p-8 animate-in fade-in duration-200">
            
            {/* Overview Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DED2] gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  Consignment #{searchedOrder.orderNumber}
                </span>
                <h3 className="text-xl font-bold text-[#191919] mt-0.5">
                  Carrier: {searchedOrder.courier}
                </h3>
                <p className="text-xs text-zinc-500 font-mono">
                  Waybill / AWB: {searchedOrder.trackingNumber}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(searchedOrder.status)}`}>
                  {searchedOrder.status}
                </span>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Est. Delivery</span>
                  <p className="text-xs font-bold text-[#191919]">{searchedOrder.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Timeline Checkpoints */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
                Transit Activity & Checkpoints
              </h4>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8DED2]">
                {searchedOrder.trackingHistory.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Checkpoint Dot */}
                    <div
                      className={`absolute -left-[27px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-xs ${
                        idx === searchedOrder.trackingHistory.length - 1
                          ? 'bg-[#8D2337] ring-4 ring-[#8D2337]/20'
                          : 'bg-emerald-600'
                      }`}
                    />

                    <div className="space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-bold text-[#191919]">
                          {step.status}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-medium">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600">
                        {step.description}
                      </p>
                      <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{step.location}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination Summary */}
            <div className="pt-6 border-t border-[#E8DED2] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#F8F5F0] rounded-2xl">
                <span className="text-zinc-500 font-semibold text-[10px] uppercase">
                  Delivery Recipient
                </span>
                <p className="font-bold text-[#191919] mt-0.5">
                  {searchedOrder.shippingAddress.fullName}
                </p>
                <p className="text-zinc-600 text-[11px] mt-0.5">
                  {searchedOrder.shippingAddress.addressLine1}, {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} - {searchedOrder.shippingAddress.pinCode}
                </p>
              </div>

              <div className="p-4 bg-[#F8F5F0] rounded-2xl">
                <span className="text-zinc-500 font-semibold text-[10px] uppercase">
                  Package Content
                </span>
                <p className="font-bold text-[#191919] mt-0.5">
                  {searchedOrder.items.length} apparel items
                </p>
                <p className="text-zinc-600 text-[11px] mt-0.5 truncate">
                  {searchedOrder.items.map((i) => i.product.name).join(', ')}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
