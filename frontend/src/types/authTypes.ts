export interface authSuccessTypes {
  data: {
    id: number;
    name: string;
    email: string;
    address: string;
    contact: string;
    image: string | null;
    role: string;
  };
  message: string;
}
