import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  FileText,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  Ruler,
} from 'lucide-react';

export const PolicyPage: React.FC = () => {
  const { policyTab, navigateTo, showToast } = useStore();
  const [activeTab, setActiveTab] = useState(policyTab || 'shipping');

  // Contact form state
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketSubject, setTicketSubject] = useState('Order Enquiry');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketEmail || !ticketMessage) {
      showToast('Please fill out all contact fields', 'error');
      return;
    }
    setTicketSubmitted(true);
    showToast('Your message has been logged. Support will contact you shortly.', 'success');
  };

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8D2337]">
            Trust & Support Policies
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#191919]">
            Buytiful Customer Commitments
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto">
            Honest policies designed for your peace of mind while shopping fashion in India.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center justify-center gap-2 border-b border-[#E8DED2] pb-4 flex-wrap">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'shipping'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'bg-white text-zinc-600 hover:text-[#191919] border border-[#E8DED2]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Shipping Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'returns'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'bg-white text-zinc-600 hover:text-[#191919] border border-[#E8DED2]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>7-Day Returns</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'bg-white text-zinc-600 hover:text-[#191919] border border-[#E8DED2]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'bg-white text-zinc-600 hover:text-[#191919] border border-[#E8DED2]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'faq'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'bg-white text-zinc-600 hover:text-[#191919] border border-[#E8DED2]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'contact'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'bg-white text-zinc-600 hover:text-[#191919] border border-[#E8DED2]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Desk</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl border border-[#E8DED2] p-6 sm:p-10 shadow-xs max-w-4xl mx-auto leading-relaxed text-xs sm:text-sm text-zinc-700 space-y-6">
          
          {/* 1. SHIPPING POLICY */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#191919]">
                Shipping & Delivery Guidelines
              </h2>
              <p>
                At <strong>Buytiful.in</strong>, we ensure reliable, tracked fulfillment across India via our direct logistics partnerships with Blue Dart, Delhivery, and Xpressbees.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#F8F5F0] rounded-2xl border border-[#E8DED2]">
                  <h4 className="font-bold text-[#191919] mb-1">Standard Surface Shipping</h4>
                  <p className="text-xs text-zinc-600">
                    • Delivery Timeline: 3 - 5 business days.<br />
                    • Charges: <strong>FREE on orders ₹999 and above</strong>; ₹99 flat rate for orders below ₹999.
                  </p>
                </div>

                <div className="p-4 bg-[#F8F5F0] rounded-2xl border border-[#E8DED2]">
                  <h4 className="font-bold text-[#191919] mb-1">Priority Air Express Delivery</h4>
                  <p className="text-xs text-zinc-600">
                    • Delivery Timeline: 1 - 2 business days to metro hubs.<br />
                    • Charges: ₹149 flat expedited priority fee.
                  </p>
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#191919] pt-2">Order Dispatch Timelines</h3>
              <p className="text-xs">
                All confirmed orders placed before 2:00 PM IST Monday through Saturday are dispatched on the same day from our Indiranagar, Bengaluru or Mumbai fulfillment centers. You receive real-time SMS and email tracking links the moment your parcel is scanned by our carrier.
              </p>
            </div>
          )}

          {/* 2. RETURNS POLICY */}
          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#191919]">
                7-Day Hassle-Free Returns & Exchange Policy
              </h2>
              <p>
                We want you to love how your garments fit and feel. If you are not satisfied with the size, silhouette, or drape, you can request an exchange or return within <strong>7 days of delivery</strong>.
              </p>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-[#191919]">Eligibility Conditions:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Garments must be unworn, unwashed, and undamaged.</li>
                  <li>Original brand tags and dust pouches must be intact.</li>
                  <li>Reverse doorstep courier pickup is arranged free of charge across eligible PIN codes.</li>
                </ul>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
                <p className="font-bold">Refund Processing Time:</p>
                <p>
                  Once our quality inspection team verifies the returned piece at the warehouse (typically 24 hours after arrival), refunds are credited to your original UPI account or card within 3–5 working days. For COD orders, refund bank transfer links are shared via SMS.
                </p>
              </div>
            </div>
          )}

          {/* 3. TERMS */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#191919]">
                Terms and Conditions of Use
              </h2>
              <p className="text-xs text-zinc-500">Effective Date: October 2026</p>
              <p className="text-xs">
                Welcome to <strong>Buytiful.in</strong>. By accessing our platform and placing orders, you agree to comply with our commercial terms. All apparel prices are listed in Indian Rupees (₹) and include applicable Goods and Services Tax (GST).
              </p>
              <p className="text-xs">
                Product images strive to represent exact textile colors accurately; however, slight variations may occur due to device display calibrations and hand-dyed artisanal fabric techniques (e.g., Bagru vegetable blocks, raw linen slubs).
              </p>
            </div>
          )}

          {/* 4. PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#191919]">
                Privacy & Data Protection Notice
              </h2>
              <p className="text-xs">
                Buytiful.in respects customer privacy. We collect only necessary contact information, shipping addresses, and transaction identifiers strictly required to process and dispatch orders.
              </p>
              <p className="text-xs">
                <strong>We never store raw credit card numbers, CVVs, or Net Banking PINs</strong> on our servers. All financial transactions are processed securely through RBI-compliant, 256-bit SSL encrypted payment gateways.
              </p>
            </div>
          )}

          {/* 5. FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#191919]">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-3 divide-y divide-[#E8DED2]">
                <div className="pt-3 first:pt-0">
                  <h4 className="font-bold text-[#191919] text-xs">How do I choose the right size?</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    Every product features a dedicated Size Chart link showing exact chest, waist, and length measurements in both inches and centimeters.
                  </p>
                </div>

                <div className="pt-3">
                  <h4 className="font-bold text-[#191919] text-xs">Can I pay via Cash on Delivery (COD)?</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    Yes! COD is available across most serviceable PIN codes in India with a nominal ₹49 verification courier charge.
                  </p>
                </div>

                <div className="pt-3">
                  <h4 className="font-bold text-[#191919] text-xs">How can I track my package?</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    Visit our <strong>Track My Order</strong> page and enter your 11-digit Order Reference (e.g., BUY-2026-84912) to view live courier scans.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. CONTACT DESK */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#191919]">
                  Buytiful Customer Support Desk
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Have questions about sizing, fabric care, or order status? Our styling and support team is here to assist.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[#F8F5F0] rounded-2xl space-y-1 border border-[#E8DED2]">
                  <Mail className="w-4 h-4 text-[#8D2337]" />
                  <p className="font-bold text-[#191919]">Email Support</p>
                  <p className="text-zinc-600">support@buytiful.in</p>
                </div>

                <div className="p-4 bg-[#F8F5F0] rounded-2xl space-y-1 border border-[#E8DED2]">
                  <Phone className="w-4 h-4 text-[#8D2337]" />
                  <p className="font-bold text-[#191919]">Helpline Desk</p>
                  <p className="text-zinc-600">+91 80 4912 3800</p>
                </div>

                <div className="p-4 bg-[#F8F5F0] rounded-2xl space-y-1 border border-[#E8DED2]">
                  <MapPin className="w-4 h-4 text-[#8D2337]" />
                  <p className="font-bold text-[#191919]">Headquarters</p>
                  <p className="text-zinc-600">Indiranagar, Bengaluru, KA</p>
                </div>
              </div>

              {ticketSubmitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <h3 className="font-bold text-emerald-800">Support Ticket Logged</h3>
                  <p className="text-xs text-emerald-700">
                    Thank you, {ticketName}. A support specialist will respond to {ticketEmail} within 2–4 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={ticketName}
                        onChange={(e) => setTicketName(e.target.value)}
                        placeholder="e.g. Gra Cnu"
                        className="w-full px-3 py-2 text-xs border border-[#E8DED2] rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={ticketEmail}
                        onChange={(e) => setTicketEmail(e.target.value)}
                        placeholder="name@gmail.com"
                        className="w-full px-3 py-2 text-xs border border-[#E8DED2] rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#E8DED2] rounded-xl bg-white"
                    >
                      <option value="Order Enquiry">Order Status Enquiry</option>
                      <option value="Exchange or Return">Exchange / Return Assistance</option>
                      <option value="Sizing Help">Sizing & Fit Advice</option>
                      <option value="Bulk Purchase">Bulk & Corporate Orders</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      placeholder="How can we assist you with your apparel order?"
                      className="w-full px-3 py-2 text-xs border border-[#E8DED2] rounded-xl"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#8D2337] hover:bg-[#a62b42] text-white text-xs font-bold uppercase rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
