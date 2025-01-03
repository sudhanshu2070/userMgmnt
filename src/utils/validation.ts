export const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
export const isValidPhone = (phone: string): boolean =>
    /^\d{10}$/.test(phone);  

export const isValidDOB = (dob: string): boolean => {
    const today = new Date(); 
    const dobDate = new Date(dob); 
    return dobDate <= today; 
};