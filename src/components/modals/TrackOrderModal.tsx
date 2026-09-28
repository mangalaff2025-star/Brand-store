import React, { useState } from 'react';
import { X, Search, PackageCheck, Truck, MapPin, Calendar, Clock, CheckCircle2, ShieldCheck, Thermometer } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const TrackOrderModal: React.FC = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, findOrder, addToast } = useShop();

  const [inputVal, setInputVal] = useState('FLR-89241');
  const [searched, setSearched] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<any>(null);

  if (!isTrackOrderOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const found = findOrder(inputVal);
    if (found) {
      setTrackedOrder(found);
      setSearched(true);
    } else {
      // Demo simulated order if ID not in local orders
      setTrackedOrder({
        orderId: inputVal.toUpperCase().trim(),
        customerName: 'Ananya Sharma',
        address: 'B-402, Lotus Grand Residences, Sector 45, Gurugram',
        deliveryDate: 'Today',
        deliverySlot: 'Morning (9 AM – 1 PM)',
        status: 'Out For Delivery',
        temperature: '15.8°C (Optimal Floral Hydration)',
        courierPartner: 'Chilled Express Logistics India #9482',
      });
      setSearched(true);
    }
  };

  const steps = [
    { label: 'Order Received & Confirmed', desc: 'Atelier floral queue entered', done: true },
    { label: 'Stem Selection & Quality Inspection', desc: 'Grade-A blooms cut and conditioned in hydration buckets', done: true },
    { label: 'Hand-Tied & Wrapped with Care', desc: 'Spiraled with French botanical paper and handwritten note', done: true },
    { label: 'Chilled Transit Delivery', desc: 'Loaded into temperature-regulated delivery vehicle', done: true, active: true },
    { label: 'Doorstep Handover', desc: 'Recipient smile verification', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F8F5ED] w-full max-w-xl rounded-xs shadow-2xl overflow-hidden border border-[#A8BFA8]/40">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#A8BFA8]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-[#2F6B4F]" />
            <h2 className="font-serif text-xl font-bold text-[#12372A]">
              Live Flower Delivery Tracker
            </h2>
          </div>
          <button
            onClick={() => setIsTrackOrderOpen(false)}
            className="p-1.5 text-gray-500 hover:text-gray-900 rounded-full"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <div className="p-5 bg-white border-b border-[#A8BFA8]/20">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter Order ID (e.g. FLR-89241)"
                className="w-full pl-3 pr-3 py-2 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-[#2F6B4F]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#12372A] hover:bg-[#2F6B4F] text-white text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>
        </div>

        {/* Status Content */}
        {searched && trackedOrder && (
          <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Live Status Badge */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Current Status
                </span>
                <span className="font-serif text-lg font-bold text-emerald-950">
                  {trackedOrder.status || 'Out For Delivery'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-semibold text-[#12372A] border border-emerald-200">
                <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
                <span>15.8°C Chilled</span>
              </div>
            </div>

            {/* Destination Info */}
            <div className="p-4 bg-white rounded-xs border border-[#A8BFA8]/30 text-xs space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#2F6B4F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#12372A]">Recipient:</strong> {trackedOrder.customerName}
                  <p className="text-gray-600">{trackedOrder.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                <Clock className="w-4 h-4 text-[#2F6B4F] shrink-0" />
                <span className="text-gray-700">Estimated Delivery: <strong>{trackedOrder.deliveryDate} ({trackedOrder.deliverySlot})</strong></span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold text-[#12372A]">
                Journey Milestones
              </h4>
              <div className="space-y-4 relative pl-3">
                <div className="absolute top-2 bottom-2 left-5 w-[1.5px] bg-[#A8BFA8]/40 z-0" />
                {steps.map((st, idx) => (
                  <div key={idx} className="flex items-start gap-3 relative z-10 text-xs">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      st.active
                        ? 'bg-[#C6A15B] text-white ring-4 ring-[#C6A15B]/20'
                        : st.done
                        ? 'bg-[#12372A] text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                    }`}>
                      {st.done ? '✓' : idx + 1}
                    </div>
                    <div>
                      <p className={`font-semibold ${st.active ? 'text-[#C6A15B]' : st.done ? 'text-[#12372A]' : 'text-gray-400'}`}>
                        {st.label}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
