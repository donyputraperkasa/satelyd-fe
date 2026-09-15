"use client";

import { useState } from "react";
import { Plus, FileQuestion, Lock } from "lucide-react";
import type { Exam, ExamQuestion } from "@/types";
import { getPublishTokenBalance, deductPublishToken } from "@/lib/publish-tokens";
import { QuestionNavSidebar } from "./question-nav-sidebar";
import { QuestionEditorForm, DEFAULT_OPTIONS_A_TO_E } from "./question-editor-form";
import { QuestionEditorHeader } from "./question-editor-header";
import { QuestionEditorFooter } from "./question-editor-footer";
import { TokenInsufficientModal } from "./token-insufficient-modal";

interface ExamQuestionEditorModalProps {
  isOpen: boolean;
  exam: Exam | null;
  onClose: () => void;
  onSaveExam: (updatedExam: Exam) => void;
}

export function ExamQuestionEditorModal({ isOpen, exam, onClose, onSaveExam }: ExamQuestionEditorModalProps) {
  if (!isOpen || !exam) return null;

  const [questions, setQuestions] = useState<ExamQuestion[]>(() => {
    if (exam.questions && exam.questions.length > 0) return exam.questions;
    return [
      {
        id: `q-${Date.now()}-1`,
        number: 1,
        questionText: "",
        questionType: "MULTIPLE_CHOICE",
        options: DEFAULT_OPTIONS_A_TO_E.map((opt) => ({ ...opt })),
        correctAnswer: "A",
        points: 4,
      },
    ];
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const [examStatus, setExamStatus] = useState(exam.status);
  const [isSavedToast, setIsSavedToast] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);

  const isLive = examStatus === "PUBLISHED";
  const currentQ = questions[activeIdx] || questions[0];

  const updateCurrentQuestion = (fields: Partial<ExamQuestion>) => {
    if (isLive) return;
    setQuestions((prev) => {
      const copy = [...prev];
      if (copy[activeIdx]) copy[activeIdx] = { ...copy[activeIdx], ...fields };
      return copy;
    });
  };

  const updateOptionText = (key: string, text: string) => {
    if (isLive) return;
    const currentOptions = currentQ?.options || DEFAULT_OPTIONS_A_TO_E;
    const updated = currentOptions.map((opt) => (opt.key === key ? { ...opt, text } : opt));
    updateCurrentQuestion({ options: updated });
  };

  const handleAddQuestion = () => {
    if (isLive) return;
    const newNumber = questions.length + 1;
    const newQ: ExamQuestion = {
      id: `q-${Date.now()}-${newNumber}`,
      number: newNumber,
      questionText: "",
      questionType: "MULTIPLE_CHOICE",
      options: DEFAULT_OPTIONS_A_TO_E.map((opt) => ({ ...opt })),
      correctAnswer: "A",
      points: 4,
    };
    setQuestions((prev) => [...prev, newQ]);
    setActiveIdx(questions.length);
  };

  const handleRemoveQuestion = (idxToRemove: number) => {
    if (isLive || questions.length <= 1) return;
    setQuestions((prev) => prev.filter((_, idx) => idx !== idxToRemove).map((q, idx) => ({ ...q, number: idx + 1 })));
    if (activeIdx >= questions.length - 1) setActiveIdx(Math.max(0, questions.length - 2));
  };

  const handleSave = (publish = false) => {
    if (publish && !isLive) {
      const balance = getPublishTokenBalance();
      if (balance <= 0) {
        setTokenBalance(balance);
        setIsTokenModalOpen(true);
        return;
      }
      deductPublishToken();
    }
    const nextStatus = publish ? "PUBLISHED" : examStatus;
    setExamStatus(nextStatus);
    const updatedExam: Exam = { ...exam, questions, totalQuestions: questions.length, status: nextStatus };
    onSaveExam(updatedExam);
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
    if (publish) setTimeout(() => onClose(), 800);
  };

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#451420]/60 backdrop-blur-xs">
      <div className="w-full max-w-5xl h-[92vh] max-h-[92vh] flex flex-col rounded-2xl border border-[#E5D7DC] bg-[#FDFBF7] text-[#451420] shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <QuestionEditorHeader exam={exam} isSavedToast={isSavedToast} onClose={onClose} />
        {isLive && (
          <div className="bg-[#FAF0F3] border-b border-[#ECD0D8] px-4 py-2 flex items-center justify-center gap-2 text-xs font-bold text-[#7A283C]">
            <Lock size={13} /> Ujian sedang berlangsung (Live). Butir soal dan kunci jawaban dikunci agar integritas pengerjaan terjaga.
          </div>
        )}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          <QuestionNavSidebar questions={questions} activeQuestionIndex={activeIdx} onSelectQuestion={setActiveIdx} onAddQuestion={handleAddQuestion} totalPoints={totalPoints} isReadOnly={isLive} />
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#FDFBF7]">
            {currentQ ? (
              <QuestionEditorForm currentQ={currentQ} totalQuestions={questions.length} onUpdateQuestion={updateCurrentQuestion} onUpdateOption={updateOptionText} onRemoveQuestion={() => handleRemoveQuestion(activeIdx)} isReadOnly={isLive} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-[#7A5661]">
                <FileQuestion size={36} className="mb-2 text-[#9C737F]" />
                <p className="font-bold">Belum ada butir soal.</p>
                {!isLive && (
                  <button type="button" onClick={handleAddQuestion} className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#451420] text-xs font-bold text-white shadow-xs">
                    <Plus size={14} /> Tambah Soal Pertama
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <QuestionEditorFooter examStatus={examStatus} onClose={onClose} onSave={handleSave} />
      </div>
      <TokenInsufficientModal isOpen={isTokenModalOpen} onClose={() => setIsTokenModalOpen(false)} tokenBalance={tokenBalance} />
    </div>
  );
}
