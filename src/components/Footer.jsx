import React from 'react';
import { MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-zinc-600 border-t border-zinc-100 relative overflow-hidden">
      {/* Decorative Background Glows - Katulad ng nasa Policies */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand/About Section */}
          <div className="md:col-span-1">
            <span className="text-xl font-light tracking-tight text-black font-serif italic">
              Rental <span className="font-serif italic text-black">Policies</span>
            </span>
            <p className="mt-4 text-sm font-light leading-relaxed text-zinc-600">
              Premium gown and items rental crafted for your special moments. Wear luxury, stress-free.
            </p>
            
            {/* Social Icons na may parehong design profile */}
            <div className="flex items-center gap-4 mt-6">
              {/* Facebook */}
              <a href="#" className="p-2.5 border border-zinc-200 rounded-xl text-zinc-500 hover:text-black hover:bg-rose-500/10 hover:border-rose-500/20 transition-all duration-300 bg-white shadow-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="p-2.5 border border-zinc-200 rounded-xl text-zinc-500 hover:text-black hover:bg-rose-500/10 hover:border-rose-500/20 transition-all duration-300 bg-white shadow-sm">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Message */}
              <a href="#" className="p-2.5 border border-zinc-200 rounded-xl text-zinc-500 hover:text-black hover:bg-rose-500/10 hover:border-rose-500/20 transition-all duration-300 bg-white shadow-sm">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm font-light text-zinc-600">
              <li><a href="#" className="hover:text-rose-500 transition-colors">Collection</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">How it Works</a></li>
              <li><a href="/policies" className="hover:text-rose-500 transition-colors">Policies</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Policies Quick Access */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-4">Our Terms</h4>
            <ul className="space-y-2.5 text-sm font-light text-zinc-600">
              <li><a href="/policies" className="hover:text-rose-500 transition-colors">Rental Agreement</a></li>
              <li><a href="/policies" className="hover:text-rose-500 transition-colors">Damages & Liability</a></li>
              <li><a href="policies" className="hover:text-rose-500 transition-colors">Cancellation Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm font-light text-zinc-600">
              <li className="flex items-center gap-3 hover:text-black transition-colors group">
                <div className="p-2.5 border border-zinc-200 rounded-xl bg-white shadow-sm group-hover:bg-rose-500/10 group-hover:border-rose-500/20 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-rose-500" />
                </div>
                <span>+63 912 345 6789</span>
              </li>
              <li className="flex items-center gap-3 hover:text-black transition-colors group">
                <div className="p-2.5 border border-zinc-200 rounded-xl bg-white shadow-sm group-hover:bg-rose-500/10 group-hover:border-rose-500/20 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-rose-500" />
                </div>
                <span>bonitarental@ggmail.com</span>
              </li>
              <li className="flex items-start gap-3 hover:text-black transition-colors group">
                <div className="p-2.5 border border-zinc-200 rounded-xl bg-white shadow-sm shrink-0 mt-0.5 group-hover:bg-rose-500/10 group-hover:border-rose-500/20 transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-rose-500" />
                </div>
                <span>Irosin Sorsogon, Philippines</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-400">
          <p>© {new Date().getFullYear()} BONITA Rental. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;