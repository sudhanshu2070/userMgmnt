export const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
export const isValidPhone = (phone: string): boolean =>
    /^\d{10}$/.test(phone);  

export const isValidDOB = (dob: string): boolean => {
    const today = new Date(); // Current date
    const dobDate = new Date(dob); // Convert input string to a Date object
    return dobDate <= today; // Ensure DOB is not in the future
};