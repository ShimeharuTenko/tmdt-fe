export type Order = {
  id: string;
  userId: string;
  totalAmount: number;
  status: "PENDING" | "PAID" | "CANCELLED";
  createdAt: string;
};