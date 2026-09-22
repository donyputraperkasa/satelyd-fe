import type { TokenOrder } from "@/types";

export type { TokenOrder };

export const INITIAL_ORDERS: TokenOrder[] = [
  {
    id: "ORD-101",
    userName: "Bambang Wijaya",
    userEmail: "bambang.guru@smp1jogja.sch.id",
    packageName: "50 Token Game TV",
    tokenAmount: 50,
    price: 50000,
    paymentMethod: "Transfer BCA",
    createdAt: "10 menit lalu",
    status: "PENDING",
  },
  {
    id: "ORD-102",
    userName: "Nurul Hidayah",
    userEmail: "nurul.math@sman3.sch.id",
    packageName: "100 Kredit Ujian CBT",
    tokenAmount: 100,
    price: 95000,
    paymentMethod: "QRIS",
    createdAt: "25 menit lalu",
    status: "PENDING",
  },
  {
    id: "ORD-100",
    userName: "Ahmad Fauzi",
    userEmail: "ahmad.fauzi@bopkri.org",
    packageName: "200 Token All-In",
    tokenAmount: 200,
    price: 180000,
    paymentMethod: "Transfer Mandiri",
    createdAt: "2 jam lalu",
    status: "APPROVED",
  },
];
