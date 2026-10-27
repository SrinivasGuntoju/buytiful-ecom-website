import React from 'react';
import { Order } from '../../types';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Truck, Package, ArrowRight, Printer } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  const { navigateTo } = useStore();

  if (!order) return null;

  const handleTrackOrder = () => {
    onClose();
    navigateTo('tracking');
  };

  const handleViewAccount = () => {
    onClose();
    navigateTo('account');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E8DED2] overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Success Icon & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#8D2337]">
            Order Confirmed & Payment Verified
          </p>
          <h2 className="text-2xl font-bold text-[#191919]">
            Thank you for shopping at Buytiful!
          </h2>
          <p className="text-xs text-zinc-500">
            A confirmation receipt has been generated and dispatched to your email.
          </p>
        </div>

        {/* Order Details Highlight Box */}
        <div className="p-4 bg-[#F8F5F0] rounded-2xl border border-[#E8DED2] space-y-3 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DED2]/80">
            <div>
              <span className="text-zinc-500">Order Reference:</span>
              <p className="font-bold text-sm text-[#191919] font-mono mt-0.5">
                {order.orderNumber}
              </p>
            </div>
            <div className="text-right">
              <span className="text-zinc-500">Payment Status:</span>
              <p className="font-bold text-emerald-700 mt-0.5">
                {order.paymentStatus} ({order.paymentMethod})
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
            <div>
              <span className="text-zinc-500">Estimated Delivery:</span>
              <p className="font-bold text-zinc-900 mt-0.5">{order.estimatedDelivery}</p>
            </div>
            <div>
              <span className="text-zinc-500">Logistics Courier:</span>
              <p className="font-bold text-zinc-900 mt-0.5">{order.courier}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E8DED2]/80 text-[11px]">
            <span className="text-zinc-500">Shipping Address:</span>
            <p className="font-medium text-zinc-900 mt-0.5">
              {order.shippingAddress.fullName}, {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}
            </p>
          </div>
        </div>

        {/* Item Summary */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Items in this Consignment ({order.items.length})
          </p>
          <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-xs p-2 bg-white rounded-xl border border-[#E8DED2]"
              >
                <div className="truncate pr-2">
                  <p className="font-semibold text-zinc-900 truncate">{item.product.name}</p>
                  <p className="text-[10px] text-zinc-500">
                    {item.selectedSize} · {item.selectedColor} · Qty {item.quantity}
                  </p>
                </div>
                <span className="font-bold tabular-nums shrink-0">
                  ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleTrackOrder}
            className="flex-1 py-3 bg-[#191919] hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Truck className="w-4 h-4 text-amber-300" />
            <span>Track Consignment</span>
          </button>

          <button
            onClick={handleViewAccount}
            className="py-3 px-5 bg-white border border-[#E8DED2] hover:bg-[#F8F5F0] text-[#191919] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            <span>My Orders</span>
          </button>
        </div>

      </div>
    </div>
  );
};
