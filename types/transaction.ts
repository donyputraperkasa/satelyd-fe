export type TransactionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface TokenPackage {
  id: string;
  name: string;
  itemType: "GAME" | "EXAM";
  tokenAmount: number;
  price: number;
  normalPrice?: number;
  discountBadge?: string;
  description: string;
  isPopular?: boolean;
}

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
  proofImageUrl?: string;
  createdAt: string;
  status: TransactionStatus;
}

