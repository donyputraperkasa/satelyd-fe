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

export const SAMPLE_TRANSACTIONS: TransactionOrder[] = [
  {
    id: "TRX-8821",
    userName: "Bambang Wijaya, S.Pd.",
    userEmail: "bambang.wijaya@smpn1jogja.sch.id",
    schoolName: "SMP Negeri 1 Yogyakarta",
    packageName: "50 Token Game TV Kelas",
    itemType: "GAME",
    tokenAmount: 50,
    price: 50000,
    paymentMethod: "Transfer Bank BCA",
    senderAccount: "Bambang Wijaya - BCA 8021449102",
    referenceNumber: "BCA-20260914-882190",
    createdAt: "14 Sep 2026, 14:10 WIB",
    status: "PENDING",
  },
  {
    id: "TRX-8822",
    userName: "Dra. Nurul Hidayati",
    userEmail: "nurul.h@sman3semarang.sch.id",
    schoolName: "SMA Negeri 3 Semarang",
    packageName: "100 Kredit Ujian Siswa (CBT)",
    itemType: "EXAM",
    tokenAmount: 100,
    price: 95000,
    paymentMethod: "QRIS Satelyd Merchant",
    senderAccount: "GOPAY / Nurul Hidayati",
    referenceNumber: "QRIS-20260914-991204",
    createdAt: "14 Sep 2026, 13:45 WIB",
    status: "PENDING",
  },
  {
    id: "TRX-8819",
    userName: "Ahmad Fauzi, M.Kom.",
    userEmail: "ahmad.fauzi@bopkri.org",
    schoolName: "Yayasan BOPKRI 1",
    packageName: "200 Token Kombo All-In",
    itemType: "COMBO",
    tokenAmount: 200,
    price: 180000,
    paymentMethod: "Transfer Bank Mandiri",
    senderAccount: "Yayasan BOPKRI - Mandiri 13700192341",
    referenceNumber: "MDR-20260914-110294",
    createdAt: "14 Sep 2026, 11:20 WIB",
    status: "APPROVED",
  },
  {
    id: "TRX-8815",
    userName: "Dewi Lestari, S.Si.",
    userEmail: "dewi.lestari@smpitinsan.sch.id",
    schoolName: "SMP IT Insan Cita",
    packageName: "50 Token Game TV Kelas",
    itemType: "GAME",
    tokenAmount: 50,
    price: 50000,
    paymentMethod: "Transfer Bank BRI",
    senderAccount: "Dewi Lestari - BRI 034101002934",
    referenceNumber: "BRI-20260914-774012",
    createdAt: "13 Sep 2026, 16:30 WIB",
    status: "APPROVED",
  },
];
