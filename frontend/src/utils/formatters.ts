export const formatTime = (date: string | Date | null | undefined): string => {
  if (!date) return '--:--';
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    console.warn('[formatTime] Invalid date value:', date);
    return '--:--';
  }

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(d);
};

export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return 'Invalid Date';
  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    console.warn('[formatDate] Invalid date value:', date);
    return 'Invalid Date';
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(d);
};

export const formatCurrency = (amount: number, currency = 'GHS'): string => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency,
  }).format(amount);
};
