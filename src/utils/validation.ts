export const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
export const isValidPhone = (phone: string): boolean =>
    /^\d{10}$/.test(phone);  