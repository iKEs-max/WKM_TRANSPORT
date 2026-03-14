import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  MapPin, 
  Phone, 
  Mail,
  Navigation
} from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { Logo } from '@/components/common/Logo/Logo';
import { useSettingsStore } from '@/store/settings.store';
export const Footer: React.FC = () => {
  const { settings } = useSettingsStore();

  const socialLinks = [
    { Icon: Facebook, url: settings?.facebookUrl || '#' },
    { Icon: Twitter, url: settings?.twitterUrl || '#' },
    { Icon: Instagram, url: settings?.instagramUrl || '#' },
  ];

  return (
    <footer className="bg-onukpa-blue-dark text-white pt-20 pb-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <Logo size={24} className="mb-6 opacity-90 hover:opacity-100 transition-opacity" />
            <p className="text-slate-400 mb-8 leading-relaxed max-w-xs">
              Making student transportation across Ghanaian universities reliable, comfortable, and affordable.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, url }, i) => (
                <a 
                  key={i} 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-onukpa-orange hover:text-white transition-all border border-white/10"
                  title="Social Link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-display text-lg font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to={ROUTES.HOME} className="text-slate-400 hover:text-onukpa-orange transition-colors">Home</Link></li>
              <li><Link to={ROUTES.ROUTES} className="text-slate-400 hover:text-onukpa-orange transition-colors">Popular Routes</Link></li>
              <li><Link to={ROUTES.BOOK_RIDE} className="text-slate-400 hover:text-onukpa-orange transition-colors">Book a Seat</Link></li>
              <li><Link to={ROUTES.TRACK_RIDE} className="text-slate-400 hover:text-onukpa-orange transition-colors">Track Bus</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-display text-lg font-bold mb-8">Support</h4>
            <ul className="space-y-4">
              <li><Link to={ROUTES.FAQ} className="text-slate-400 hover:text-onukpa-orange transition-colors">FAQ</Link></li>
              <li><Link to={ROUTES.TERMS} className="text-slate-400 hover:text-onukpa-orange transition-colors">Terms of Service</Link></li>
              <li><Link to={ROUTES.PRIVACY} className="text-slate-400 hover:text-onukpa-orange transition-colors">Privacy Policy</Link></li>
              <li><Link to={ROUTES.REFUND} className="text-slate-400 hover:text-onukpa-orange transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold mb-8">Contact Us</h4>
             <ul className="space-y-5">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin size={20} className="text-onukpa-orange shrink-0 mt-1" />
                <span>Legon Campus, UG<br />Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone size={20} className="text-onukpa-orange shrink-0" />
                <span>{settings?.contactPhone || '+233 55 123 4567'}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail size={20} className="text-onukpa-orange shrink-0" />
                <span>{settings?.contactEmail || 'hello@onukpaexpress.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {settings?.siteName || 'Onukpa Express Ride'}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center gap-2">Built for Ghanaian Students 🇬🇭</span>
            <a 
              href="https://devjik.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-onukpa-orange font-bold text-xs flex items-center gap-2 hover:bg-white/10 hover:scale-105 transition-all shadow-glow-sm"
            >
              <span className="text-white/60 font-normal">Powered by</span> ➤ DevJik/&lt;
            </a>
            <Link to={ROUTES.ADMIN_LOGIN} className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-all border border-white/10">
               <Navigation size={12} className="text-onukpa-orange" />
               Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
