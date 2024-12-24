// Interface for a User
export interface User {
    id: string; // Unique identifier for each user
    name: string; // User's name
    email: string; // User's email address
    dob: string; // User's date of birth in YYYY-MM-DD format
    phone: string; // User's phone number
  }
  
  // State type for the Redux slice managing users
  export interface UserState {
    users: User[]; // Array of User objects
  }  