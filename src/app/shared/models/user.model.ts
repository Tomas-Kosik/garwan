export interface User {
  uid: string;
  name: string;
  email: string;
  profilePicture: string;
  repositories?: number;
  followers?: number;
  issues?: number;
}
