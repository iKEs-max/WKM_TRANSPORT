import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Star } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { StitchConnector } from '@/components/common/StitchConnector/StitchConnector';
import { MagneticWrap } from '@/components/animations/MagneticWrap';
import { FloatingCharacter } from '@/components/animations/FloatingCharacter';
import { useRouteStore } from '@/store/route.store';
import { settingsService } from '@/services/settings.service';
import styles from './Pricing.module.css';

// Assets
import charWaving from '@/assets/images/characters/student-black-waving.png';

// Hardcoded route prices removed, directly fetching from API now.

const INCLUDED = [
  'Guaranteed window or aisle seat',
  'Air-conditioned buses',
  'Campus pick-up point',
  'Free luggage (up to 20 kg)',
  'WhatsApp customer support',
  'Easy digital booking receipt',
];

export const Pricing: React.FC = () => {
  const { routes, isLoading, fetchRoutes } = useRouteStore();
  const [settings, setSettings] = React.useState<any>(null);
  
  useEffect(() => {
    fetchRoutes();
    settingsService.getPublicSettings().then(setSettings).catch(console.error);
  }, [fetchRoutes]);
  
  const activeRoutes = routes.filter((r) => r.status === 'ACTIVE');

  return (
  <div className={styles.page}>
    {/* Hero */}
    <section className={styles.hero}>
      <div className="container">
        <span className="badge badge-primary">Simple Pricing</span>
        <h1>Transparent <span className="text-gradient">Fares</span></h1>
        <p>No hidden fees. No surprises. What you see is what you pay.</p>
      </div>
    </section>

    <StitchConnector />

    {/* Price Table */}
    <section className={styles.tableSection}>
      <div className="container">
        <div className={styles.priceGrid}>
          {isLoading && <div style={{width: '100%', textAlign: 'center', padding: '2rem', gridColumn: '1 / -1'}}>Loading live fares...</div>}
          {!isLoading && activeRoutes.map((r) => {
            const isPopular = r.isPopular;
            const price = r.price;
            const routeName = `${r.departure} ↔ ${r.destination}`;
            const duration = r.estimatedDuration || '4h 00min';
            const days = r.operatingDays || 'Daily';

            return (
            <div key={r.id} className={`card ${styles.priceCard} ${isPopular ? styles.popular : ''}`}>
              {isPopular && (
                <div className={styles.popularBadge}><Star size={12}/> Most Popular</div>
              )}
              <h3 className={styles.routeName}>{routeName}</h3>
              <div className={styles.priceAmt}>
                <span className={styles.currency}>GH₵</span>
                <span className={styles.amount}>{price}</span>
                <span className={styles.per}>/seat</span>
              </div>
              <div className={styles.meta}>
                <span>⏱ {duration}</span>
                <span>📅 {days}</span>
              </div>
              <MagneticWrap strength={15}>
                <Link to={ROUTES.BOOK_RIDE} className={isPopular ? styles.btnPrimary : styles.btnOutline}>
                  Book This Route
                </Link>
              </MagneticWrap>
            </div>
          )})}
        </div>
      </div>
    </section>

    <StitchConnector />

    {/* What's Included */}
    <section className={styles.includedSection}>
      <div className="container">
        <div className={styles.includedGrid}>
          <div>
            <h2>What's <span className="text-gradient">Included</span></h2>
            <p>Every fare includes all of the following at no extra cost:</p>
            <ul className={styles.checklist}>
              {INCLUDED.map((item) => (
                <li key={item}><Check size={16} className={styles.checkIcon}/> {item}</li>
              ))}
            </ul>
            <MagneticWrap strength={15}>
              <Link to={ROUTES.BOOK_RIDE} className={styles.btnPrimary} style={{marginTop:'2rem',display:'inline-flex',alignItems:'center',gap:'8px'}}>
                <Zap size={16}/> Book Your Seat Now
              </Link>
            </MagneticWrap>

            <FloatingCharacter 
              src={charWaving} 
              alt="Student waving" 
              size={140}
              bottom="-20px"
              left="-40px"
              delay={0.5}
            />
          </div>
          <div className={`card ${styles.noteCard}`}>
            <h3>💡 Payment Options</h3>
            <p>We currently support:</p>
            <ul className={styles.payList}>
              <li>📱 <strong>MTN Mobile Money</strong></li>
              <li>📱 <strong>Telecel Cash</strong></li>
              <li>📱 <strong>AirtelTigo Money</strong></li>
              <li>💬 <strong>Book via WhatsApp</strong> and pay on arrival</li>
            </ul>
            <p className={styles.noteText}>
              Can't pay online? No problem — reserve your seat via WhatsApp and pay cash on departure day.
            </p>
            <a href={`https://wa.me/${settings?.whatsappNumber?.replace(/\+/g, '') || ''}`} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
              WhatsApp to Book
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);
};
