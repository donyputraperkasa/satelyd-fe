"use client";

import { useState } from "react";
import type { Exam } from "@/types";
import { ExamTableRow } from "./exam-table-row";
import { ExamTableMobileCard } from "./exam-table-mobile-card";

interface ExamTableProps {
  exams: Exam[];
  onManage?: (exam: Exam) => void;
  onMonitor?: (exam: Exam) => void;
  onCloseSession?: (exam: Exam) => void;
  onDelete?: (exam: Exam) => void;
}

export function ExamTable({ exams, onManage, onMonitor, onCloseSession, onDelete }: ExamTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] shadow-xs">
      {/* 1. Desktop & Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-[#451420] dark:text-[#F8FAFC] min-w-[760px]">
          <thead className="border-b border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] text-xs font-black uppercase tracking-wider text-[#7A5661] dark:text-[#94A3B8]">
            <tr>
              <th className="py-4.5 px-4 w-12 text-center">No</th>
              <th className="py-4.5 px-6 text-left">Paket Ujian & Identitas</th>
              <th className="py-4.5 px-4 text-center whitespace-nowrap">Status</th>
              <th className="py-4.5 px-4 text-center whitespace-nowrap">Durasi</th>
              <th className="py-4.5 px-4 text-center whitespace-nowrap">Soal</th>
              <th className="py-4.5 px-4 text-center whitespace-nowrap">Peserta</th>
              <th className="py-4.5 px-6 text-center whitespace-nowrap w-36">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E5D7DC]/70 dark:divide-[#282E3E]">
            {exams.map((exam, index) => (
              <ExamTableRow
                key={exam.id}
                exam={exam}
                index={index}
                isCopied={copiedId === exam.id}
                onCopyCode={handleCopyCode}
                onManage={onManage}
                onMonitor={onMonitor}
                onCloseSession={onCloseSession}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Mobile Responsive Card-Row View */}
      <div className="md:hidden divide-y divide-[#E5D7DC]/70 dark:divide-[#282E3E]">
        {exams.map((exam) => (
          <ExamTableMobileCard
            key={exam.id}
            exam={exam}
            isCopied={copiedId === exam.id}
            onCopyCode={handleCopyCode}
            onManage={onManage}
            onMonitor={onMonitor}
            onCloseSession={onCloseSession}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
