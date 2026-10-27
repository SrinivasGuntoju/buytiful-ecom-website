import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Address, Order } from '../../types';
import { INDIAN_STATES, SHIPPING_RULES, checkPinCodeDelivery } from '../../data/storeConfig';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  Check,
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  Lock,
  Truck,
  Sparkles,
} from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface CheckoutPageProps {
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onOrderSuccess }) => {
  const {
    cart,
    subtotal,
    discount,
    appliedCoupon,
    isFreeShippingEligible,
    currentUser,
    createOrder,
    navigateTo,
    showToast,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Address & Contact, 2: Shipping Method, 3: Payment
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');

  // Contact & Address Form
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [fullName, setFullName] = useState(currentUser?.name || 'Gra Cnu');
  const [addressLine1, setAddressLine1] = useState(
    currentUser?.addresses[0]?.addressLine1 || 'Flat 402, Lotus Residency, 12th Main'
  );
  const [addressLine2, setAddressLine2] = useState(
    currentUser?.addresses[0]?.addressLine2 || 'Indiranagar Stage 2'
  );
  const [landmark, setLandmark] = useState(currentUser?.addresses[0]?.landmark || 'Near Metro');
  const [city, setCity] = useState(currentUser?.addresses[0]?.city || 'Bengaluru');
  const [state, setState] = useState(currentUser?.addresses[0]?.state || 'Karnataka');
  const [pinCode, setPinCode] = useState(currentUser?.addresses[0]?.pinCode || '560038');

  // Payment inputs
  const [upiId, setUpiId] = useState('cnu@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#191919]">Your bag is currently empty</h2>
        <p className="text-xs text-zinc-500">
          Add pieces to your bag before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('catalog')}
          className="px-6 py-3 bg-[#191919] text-white text-xs font-semibold rounded-xl hover:bg-zinc-800"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  // Calculate fees
  const shippingFee =
    shippingMethod === 'express'
      ? SHIPPING_RULES.expressShippingFee
      : isFreeShippingEligible
      ? 0
      : SHIPPING_RULES.standardShippingFee;

  const codFee = paymentMethod === 'COD' ? SHIPPING_RULES.codConvenienceFee : 0;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee + codFee);

  // Validate Address Step
  const handleProceedToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!contactEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      setFormError('Please provide a valid contact email address.');
      return;
    }
    if (!contactPhone || contactPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number for dispatch alerts.');
      return;
    }
    if (!addressLine1 || !city || !state) {
      setFormError('Please complete all mandatory address fields.');
      return;
    }

    const pinCheck = checkPinCodeDelivery(pinCode);
    if (!pinCheck.valid) {
      setFormError('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    setStep(2);
  };

  // Place Order & Process Payment
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setFormError(null);

    // Simulated sandbox gateway verification delay (1.2s)
    setTimeout(() => {
      const shippingAddress: Address = {
        id: `addr-${Date.now()}`,
        fullName,
        phone: contactPhone,
        addressLine1,
        addressLine2,
        landmark,
        city,
        state,
        pinCode,
        isDefault: true,
      };

      const newOrder = createOrder({
        address: shippingAddress,
        shippingMethod,
        paymentMethod,
        paymentDetails: {
          transactionId: `TXN-IN-${Math.floor(10000000 + Math.random() * 90000000)}`,
          upiId: paymentMethod === 'UPI' ? upiId : undefined,
          cardLast4: paymentMethod === 'Card' ? '4242' : undefined,
          bankName: paymentMethod === 'NetBanking' ? selectedBank : undefined,
        },
      });

      setIsProcessing(false);
      onOrderSuccess(newOrder);
      showToast('Payment verified! Order placed successfully.', 'success');
    }, 1400);
  };

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#E8DED2]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="text-left cursor-pointer"
            >
              <span className="font-editorial text-2xl font-bold text-[#191919]">
                buytiful<span className="text-[#8D2337]">.in</span>
              </span>
            </button>
            <span className="text-zinc-300">/</span>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Secure Checkout
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#8D2337]' : 'text-zinc-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#8D2337] text-white' : 'bg-zinc-200'}`}>1</span>
              <span>Shipping Address</span>
            </div>
            <div className="w-12 h-0.5 bg-[#E8DED2]" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#8D2337]' : 'text-zinc-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#8D2337] text-white' : 'bg-zinc-200'}`}>2</span>
              <span>Dispatch Method</span>
            </div>
            <div className="w-12 h-0.5 bg-[#E8DED2]" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#8D2337]' : 'text-zinc-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-[#8D2337] text-white' : 'bg-zinc-200'}`}>3</span>
              <span>Payment Gateway</span>
            </div>
          </div>
        </div>

        {/* Two-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Multi-Step Forms */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Address & Contact Details */}
            {step === 1 && (
              <form onSubmit={handleProceedToShipping} className="bg-white rounded-3xl border border-[#E8DED2] p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#191919]">Contact Details</h3>
                  <p className="text-xs text-zinc-500">For SMS delivery updates and tax invoice receipts.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Mobile Number (+91) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8DED2]">
                  <h3 className="text-lg font-bold text-[#191919]">Delivery Destination</h3>
                  <p className="text-xs text-zinc-500">Where should we deliver your order?</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Gra Cnu"
                      className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Flat / House No. / Building / Street *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="e.g. Flat 402, Lotus Residency, 12th Main"
                      className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Locality / Area (Optional)
                      </label>
                      <input
                        type="text"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="e.g. Indiranagar Stage 2"
                        className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="e.g. Near Metro Station"
                        className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        placeholder="560038"
                        className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Bengaluru"
                        className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        State *
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337] bg-white"
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {formError && (
                  <div className="p-3 bg-rose-50 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => navigateTo('cart')}
                    className="text-xs font-semibold text-zinc-500 hover:text-black flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Bag</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#191919] hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Shipping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Shipping Method Selection */}
            {step === 2 && (
              <div className="bg-white rounded-3xl border border-[#E8DED2] p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#191919]">Select Shipping Method</h3>
                  <p className="text-xs text-zinc-500">
                    Delivering to {city}, {state} ({pinCode})
                  </p>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-start justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      shippingMethod === 'standard'
                        ? 'border-[#8D2337] bg-[#F8F5F0]/50 ring-2 ring-[#8D2337]/10'
                        : 'border-[#E8DED2] hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="mt-1 text-[#8D2337] focus:ring-0"
                      />
                      <div>
                        <p className="text-sm font-bold text-[#191919]">
                          Standard Ground Delivery
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Estimated delivery within 3 - 5 business days via Delhivery Ground.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#191919] tabular-nums">
                      {isFreeShippingEligible ? (
                        <span className="text-emerald-700 font-bold uppercase text-[11px]">
                          FREE
                        </span>
                      ) : (
                        `₹${SHIPPING_RULES.standardShippingFee}`
                      )}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-start justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      shippingMethod === 'express'
                        ? 'border-[#8D2337] bg-[#F8F5F0]/50 ring-2 ring-[#8D2337]/10'
                        : 'border-[#E8DED2] hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="mt-1 text-[#8D2337] focus:ring-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-[#191919]">
                            Blue Dart Air Express
                          </p>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#8D2337] text-white">
                            Fastest
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Priority air cargo delivery within 1 - 2 business days.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#191919] tabular-nums">
                      ₹{SHIPPING_RULES.expressShippingFee}
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-[#E8DED2]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-zinc-500 hover:text-black flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Edit Address</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-[#191919] hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Gateway Architecture */}
            {step === 3 && (
              <div className="bg-white rounded-3xl border border-[#E8DED2] p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#191919]">Select Payment Method</h3>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                      Sandbox Simulation Mode
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">
                    Razorpay Sandbox Architecture for India. Transactions are authorized and confirmed securely.
                  </p>
                </div>

                {/* Payment Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'UPI'
                        ? 'border-[#8D2337] bg-[#8D2337]/5 text-[#8D2337] ring-1 ring-[#8D2337]'
                        : 'border-[#E8DED2] text-zinc-600 hover:bg-[#F8F5F0]'
                    }`}
                  >
                    <QrCode className="w-5 h-5" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'Card'
                        ? 'border-[#8D2337] bg-[#8D2337]/5 text-[#8D2337] ring-1 ring-[#8D2337]'
                        : 'border-[#E8DED2] text-zinc-600 hover:bg-[#F8F5F0]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NetBanking')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'NetBanking'
                        ? 'border-[#8D2337] bg-[#8D2337]/5 text-[#8D2337] ring-1 ring-[#8D2337]'
                        : 'border-[#E8DED2] text-zinc-600 hover:bg-[#F8F5F0]'
                    }`}
                  >
                    <Building className="w-5 h-5" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'COD'
                        ? 'border-[#8D2337] bg-[#8D2337]/5 text-[#8D2337] ring-1 ring-[#8D2337]'
                        : 'border-[#E8DED2] text-zinc-600 hover:bg-[#F8F5F0]'
                    }`}
                  >
                    <Banknote className="w-5 h-5" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {/* Payment Option Input Fields */}
                <div className="p-4 bg-[#F8F5F0] rounded-2xl border border-[#E8DED2]">
                  {paymentMethod === 'UPI' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#191919]">
                          Instant UPI Apps Supported:
                        </span>
                        <div className="flex gap-1.5 text-[10px] font-semibold text-zinc-600">
                          <span className="px-1.5 py-0.5 bg-white rounded border">Google Pay</span>
                          <span className="px-1.5 py-0.5 bg-white rounded border">PhonePe</span>
                          <span className="px-1.5 py-0.5 bg-white rounded border">Paytm</span>
                          <span className="px-1.5 py-0.5 bg-white rounded border">BHIM</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                          Enter your UPI VPA ID
                        </label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@okhdfcbank"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                        />
                        <p className="text-[10px] text-zinc-500 mt-1">
                          A payment mandate prompt will be pushed to your registered UPI app.
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                          Card Number (RuPay, Visa, Mastercard)
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-[#E8DED2] rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            CVV / CVC
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-[#E8DED2] rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'NetBanking' && (
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Select Popular Indian Bank
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E8DED2] rounded-xl focus:outline-none"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="State Bank of India">State Bank of India (SBI)</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        <option value="Punjab National Bank">Punjab National Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'COD' && (
                    <div className="space-y-1.5 text-xs text-zinc-700">
                      <p className="font-bold text-[#191919]">
                        Cash on Delivery Terms:
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        • A nominal verification convenience fee of ₹49 is added for courier handling.
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        • Please keep exact cash of <strong className="text-[#8D2337]">₹{finalTotal}</strong> ready at the time of doorstep handover.
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-[#E8DED2]">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-semibold text-zinc-500 hover:text-black flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Shipping</span>
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePlaceOrder}
                    className="px-8 py-3.5 bg-[#8D2337] hover:bg-[#a62b42] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying with Gateway...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Authorize Payment · ₹{finalTotal.toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-[#E8DED2] p-6 sm:p-8 space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DED2]">
                <h3 className="text-base font-bold text-[#191919]">
                  Order Summary ({cart.length} items)
                </h3>
                <span className="text-xs font-semibold text-zinc-400">
                  Buytiful.in Studio
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-[#E8DED2]/40">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 pt-3 first:pt-0">
                    <div className="w-14 aspect-[3/4] rounded-lg overflow-hidden bg-[#F8F5F0] shrink-0">
                      <ImageWithFallback
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fallbackCategory={item.product.category}
                        fallbackName={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#191919] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        {item.selectedSize} · {item.selectedColor} · Qty: {item.quantity}
                      </p>
                      <p className="text-xs font-bold text-[#191919] mt-0.5 tabular-nums">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Applied Coupon Info */}
              {appliedCoupon && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center justify-between text-emerald-800">
                  <span className="font-semibold">Coupon: {appliedCoupon.code}</span>
                  <span className="font-bold">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-2 text-xs text-zinc-600 border-t border-[#E8DED2] pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#191919] tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Promotional Discount</span>
                    <span className="font-semibold tabular-nums">
                      -₹{discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping ({shippingMethod === 'express' ? 'Air Express' : 'Standard'})</span>
                  <span className="font-semibold text-[#191919] tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">
                        FREE
                      </span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                {paymentMethod === 'COD' && (
                  <div className="flex justify-between">
                    <span>COD Convenience Fee</span>
                    <span className="font-semibold text-[#191919] tabular-nums">₹49</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-[#191919] pt-3 border-t border-[#E8DED2]">
                  <span>Total Amount</span>
                  <span className="text-xl text-[#8D2337] tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Trust markers */}
              <div className="p-3 bg-[#F8F5F0] rounded-xl border border-[#E8DED2] text-[11px] text-zinc-600 space-y-1">
                <p className="font-bold text-[#191919] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Purchase Guarantee</span>
                </p>
                <p>
                  Includes 7-day doorstep replacement, GST receipt, and courier live consignment tracking.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
