export type TransactionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface TransactionOrder {
  id: string;
  userName: string;
  userEmail: string;
  schoolName: string;
  packageName: string;
  itemType: "GAME" | "EXAM" | "COMBO";
  tokenAmount: number;
  price: number;
  paymentMethod: string;
  senderAccount: string;
  referenceNumber: string;
  createdAt: string;
  status: TransactionStatus;
}

