import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import styles from './SuggestRouteForm.module.css';
import { Button } from '@/components/common/Button/Button';

export const SuggestRouteForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    campus: '',
    destination: '',
    reason: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Route Suggestion Submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-display font-bold text-onukpa-blue-dark mb-4">Suggestion Received!</h3>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
          Thank you for helping us grow. We'll analyze the demand for the <span className="font-bold text-onukpa-orange">{formData.campus} to {formData.destination}</span> route.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Suggest Another
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Full Name</label>
          <input 
            type="text" 
            required 
            className={styles.input}
            placeholder="e.g. Ama Serwaa"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Phone Number</label>
          <input 
            type="tel" 
            required 
            className={styles.input}
            placeholder="e.g. 055 123 4567"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Your Campus/City</label>
          <input 
            type="text" 
            required 
            className={styles.input}
            placeholder="e.g. KNUST, Kumasi"
            value={formData.campus}
            onChange={e => setFormData({...formData, campus: e.target.value})}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Where to?</label>
          <input 
            type="text" 
            required 
            className={styles.input}
            placeholder="e.g. Accra Central"
            value={formData.destination}
            onChange={e => setFormData({...formData, destination: e.target.value})}
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Additional Context (Optional)</label>
        <textarea 
          rows={3}
          className={styles.textarea}
          placeholder="Why is this route important? (e.g. High demand during holidays)"
          value={formData.reason}
          onChange={e => setFormData({...formData, reason: e.target.value})}
        />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : (
          <span className="flex items-center justify-center gap-2">
            Submit Suggestion <Send size={16} />
          </span>
        )}
      </button>
    </form>
  );
};
