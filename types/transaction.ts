import type { User } from "./user";

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

export interface TransactionTableProps {
  orders: TransactionOrder[];
  onOpenProof: (order: TransactionOrder) => void;
  onAdmit: (orderId: string) => void;
  onReject: (orderId: string) => void;
}

export interface TransactionRowProps {
  order: TransactionOrder;
  onOpenProof: (order: TransactionOrder) => void;
  onAdmit: (orderId: string) => void;
  onReject: (orderId: string) => void;
}

export interface TransactionStatsProps {
  orders: TransactionOrder[];
}

export interface ProofModalProps {
  isOpen: boolean;
  order: TransactionOrder | null;
  onClose: () => void;
}

export interface TokenUserHistoryProps {
  user: User;
}

export interface TokenBalanceCardItemProps {
  title: string;
  badge: string;
  badgeColor: string;
  balance: number;
  unit: string;
  desc: string;
  icon: unknown;
  iconBg: string;
}

export interface TokenBalanceCardsProps {
  user: User;
}

export interface TokenPackageCardProps {
  pkg: TokenPackage;
  onBuy: (pkg: TokenPackage) => void;
}

export interface TokenFreeTierCardProps {
  onOpenGame: () => void;
  onCreateDeck: () => void;
}

export interface TokenQuickActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: "ALL" | "GAME" | "EXAM";
  onFilterChange: (filter: "ALL" | "GAME" | "EXAM") => void;
  totalCount: number;
}

export interface TokenCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageItem: TokenPackage | null;
  user: User;
}

export interface CheckoutPackageSummaryProps {
  pkg: TokenPackage;
}

export interface CheckoutSuccessViewProps {
  pkg: TokenPackage;
  onDone: () => void;
}

export interface BankLogoProps {
  code: string;
  className?: string;
}
