import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, Send, Sparkles, Mail } from 'lucide-react';
import Magnetic from './Magnetic';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedService, setSelectedService] = useState('Fullstack Architecture');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Fullstack Architecture',
    'Engineering Leadership',
    'AI System Integration',
    'Enterprise Solutions',
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('lenis:stop'));
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('lenis:start'));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText('husnainshaheen000@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Launch email client with pre-filled details
    const mailtoUrl = `mailto:husnainshaheen000@gmail.com?subject=${encodeURIComponent(
      `Project Inquiry: ${selectedService}`
    )}&body=${encodeURIComponent(
      `From: ${email}\nService: ${selectedService}\n\nProject Vision / Brief:\n${message}`
    )}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setMessage('');
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg/85 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            data-lenis-prevent
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto overscroll-contain bg-surface border border-stroke rounded-3xl p-6 sm:p-10 shadow-2xl z-10 custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              data-cursor="pointer"
              className="absolute top-6 right-6 p-2 rounded-full bg-bg/80 border border-stroke text-muted hover:text-text-primary transition-colors focus:outline-none"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#89AACC] font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Initiate Collaboration</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary mb-2">
              Let's build something exceptional.
            </h3>
            <p className="text-xs sm:text-sm text-muted mb-6">
              Currently accepting selective engineering leadership, advisory roles, and high-impact ventures for Q3/Q4 2026.
            </p>

            {/* Quick Email Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-bg border border-stroke mb-6">
              <a
                href="mailto:husnainshaheen000@gmail.com"
                className="flex items-center gap-2 text-xs sm:text-sm font-mono text-text-primary hover:text-white transition-colors truncate"
              >
                <Mail className="w-4 h-4 text-[#89AACC] shrink-0" />
                <span className="truncate">husnainshaheen000@gmail.com</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                data-cursor="pointer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-stroke text-xs font-medium text-text-primary hover:border-white/30 transition-all shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-muted" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Interactive Inquiry Form */}
            {submitted ? (
              <div className="p-8 text-center bg-bg/50 rounded-2xl border border-emerald-500/20">
                <Check className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-display italic text-text-primary">
                  Drafting Message...
                </h4>
                <p className="text-xs text-muted mt-1">
                  Opening your email client to send to husnainshaheen000@gmail.com!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service Selector */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-2">
                    Select Discipline
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <button
                        type="button"
                        key={service}
                        onClick={() => setSelectedService(service)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          selectedService === service
                            ? 'bg-text-primary text-bg border-text-primary font-medium'
                            : 'bg-bg border-stroke text-muted hover:text-text-primary'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email input */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-colors font-mono"
                  />
                </div>

                {/* Brief message */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">
                    Project Vision / Brief
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about the goals, architecture requirements, and scope..."
                    className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-colors resize-none"
                  />
                </div>

                {/* Submit button with Magnetic */}
                <div className="pt-2">
                  <Magnetic strength={0.25} className="w-full">
                    <button
                      type="submit"
                      data-cursor="pointer"
                      className="w-full relative group rounded-xl p-[1.5px] transition-all duration-300 hover:scale-[1.01]"
                    >
                      <span className="absolute inset-0 rounded-xl accent-gradient opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-full py-3 rounded-[10px] bg-surface flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-primary">
                        <span>Send Direct Brief</span>
                        <Send className="w-3.5 h-3.5 text-[#89AACC]" />
                      </div>
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default ContactDrawer;
