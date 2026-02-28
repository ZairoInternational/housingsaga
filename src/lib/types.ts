export interface UserInterface {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  password: string;
  role: "owner" | "buyer" | "admin" | null;
  onboarded: boolean;
}
