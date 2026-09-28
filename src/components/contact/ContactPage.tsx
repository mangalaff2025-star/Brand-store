import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill out all required fields', 'info');
      return;
    }
    setSubmitted(true);
    addToast('Your message has been sent to our head florist. We will respond within 2 hours.', 'gold');
  };

  const FAQS = [
    {
      q: 'How does same-day delivery work?',
      a: 'Orders placed before 4:00 PM IST qualify for same-day chilled delivery in our active pin codes. Our courier vehicles are climate-controlled at 16°C to keep petals crisp.',
    },
    {
      q: 'How long will my fresh flowers last?',
      a: 'With clean water changed every 2 days and the included floral food sachet, our bouquets typically flourish for 7 to 10 days depending on the flower varieties (e.g. orchids and lilies often last 12+ days).',
    },
    {
      q: 'Can I request a custom color palette or specific flower stems?',
      a: 'Yes! Use our interactive "Custom Bouquet Builder" from the top navigation, or message our florist concierge directly via WhatsApp (+91 98765 43210) for bespoke event or wedding arrangements.',
    },
    {
      q: 'What if a bouquet arrives damaged during courier transit?',
      a: 'We offer an unconditional 100% replacement guarantee. Simply snap a quick photograph within 12 hours of delivery and send it to our WhatsApp or email. A fresh bouquet will be dispatched immediately.',
    },
    {
      q: 'Do you deliver at midnight for birthday surprises?',
      a: 'Yes! We offer a dedicated Midnight Surprise slot between 11:30 PM and 12:15 AM in Delhi NCR, Mumbai, and Bengaluru.',
    },
  ];

  return (
    <div className="bg-[#F8F5ED] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-[#A8BFA8]/20 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C6A15B] block mb-2">
            We Are Here For You
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#12372A] tracking-tight">
            Contact Florist Concierge
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#18231D]/80">
            Have questions about stem care, custom event gifting, or tracking your order? Reach our atelier team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info & Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#A8BFA8]/30 rounded-xs p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#12372A]">
                The Atelier & Floral Studio
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#18231D]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#2F6B4F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#12372A] block">Main Atelier</strong>
                    <span>14 Botanica Boulevard, Design Quarter, New Delhi 110001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#2F6B4F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#12372A] block">Phone & WhatsApp</strong>
                    <a href="tel:+919876543210" className="hover:text-[#2F6B4F] underline">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#2F6B4F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#12372A] block">Email Concierge</strong>
                    <span>concierge@daisydreams.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#2F6B4F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#12372A] block">Operating Hours</strong>
                    <span>Monday – Sunday: 8:00 AM – 9:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => addToast('Opening florist WhatsApp chat on +91 98765 43210', 'gold')}
                  className="w-full py-3 bg-[#2F6B4F] hover:bg-[#12372A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#C6A15B]" />
                  <span>Chat With Florist On WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Quick Assurance Box */}
            <div className="p-6 bg-[#12372A] text-[#F8F5ED] rounded-xs text-xs space-y-2">
              <span className="font-bold text-[#C6A15B] uppercase tracking-wider block">
                Urgent Order Inquiries?
              </span>
              <p className="text-[#A8BFA8] leading-relaxed">
                If your delivery is within the next 3 hours, please call our direct hotline for instantaneous florist assistance.
              </p>
            </div>
          </div>

          {/* Right: Message Form & FAQs (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Form */}
            <div className="bg-white border border-[#A8BFA8]/30 rounded-xs p-6 sm:p-8 shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#12372A] mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-6">
                Our floral stylists will review your request and get in touch promptly.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-[#12372A] block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#12372A] block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-[#12372A] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#12372A] block mb-1">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F] cursor-pointer"
                      >
                        <option value="General Inquiry">General Bouquet Inquiry</option>
                        <option value="Order Tracking">Order Tracking Question</option>
                        <option value="Wedding / Bulk Event">Wedding & Corporate Gifting</option>
                        <option value="Custom Floral Request">Custom Floral Arrangement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#12372A] block mb-1">
                      Message Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your event, delivery date, or questions..."
                      className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#12372A] hover:bg-[#2F6B4F] text-white font-semibold uppercase tracking-wider rounded-xs cursor-pointer flex items-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5 text-[#C6A15B]" />
                  </button>
                </form>
              ) : (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xs text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-emerald-900">
                    Message Received
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Thank you, {formData.name}. Our florist concierge will respond to {formData.email} shortly.
                  </p>
                </div>
              )}
            </div>

            {/* Frequently Asked Questions */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#12372A]">
                Frequently Answered Questions
              </h3>

              <div className="space-y-2">
                {FAQS.map((faq, index) => {
                  const isOpen = expandedFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white border border-[#A8BFA8]/30 rounded-xs overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                        className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#12372A] hover:text-[#2F6B4F] cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#C6A15B] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-[#A8BFA8]/15 bg-[#F8F5ED]/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
