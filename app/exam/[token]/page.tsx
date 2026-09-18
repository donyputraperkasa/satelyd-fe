"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import {
  StudentJoinGate,
  StudentExamHeader,
  StudentQuestionCard,
  StudentQuestionGrid,
  StudentAntiCheatAlert,
  StudentSubmitDialog,
  StudentExamResult,
} from "@/components/student-exam";
import { useStudentExam } from "@/components/student-exam/use-student-exam";

export default function StudentExamPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const {
    exam,
    session,
    currentIndex,
    setCurrentIndex,
    isLoading,
    isSubmitting,
    errorMsg,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    antiCheatOpen,
    setAntiCheatOpen,
    maxViolations,
    isBlocked,
    handleJoin,
    handleSelectOption,
    handleToggleDoubtful,
    handleFinalSubmit,
    handleRefreshStatus,
  } = useStudentExam(token);


  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] text-[#451420]">
        <Loader2 className="w-10 h-10 animate-spin text-[#451420] mb-3" />
        <p className="text-sm font-semibold">Memeriksa lembar ujian...</p>
      </div>
    );
  }

  if (errorMsg || !exam) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FDFBF7] text-center">
        <div className="max-w-md p-6 rounded-3xl border border-[#DFD0D5] bg-white shadow-lg space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle size={24} />
          </div>
          <h2 className="text-xl font-black text-[#451420]">Ujian Tidak Tersedia</h2>
          <p className="text-xs text-[#7A5661] leading-relaxed">{errorMsg}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#451420] text-xs font-bold text-[#FDFBF7] shadow-sm"
          >
            <ArrowLeft size={15} /> Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-10">
        <StudentJoinGate exam={exam} onJoin={handleJoin} isLoading={isLoading} />
      </main>
    );
  }

  if (session.isSubmitted) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-10">
        <StudentExamResult session={session} />
      </main>
    );
  }

  const currentQuestion = exam.questions?.[currentIndex];
  const questionsList = exam.questions || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <StudentExamHeader
        examTitle={exam.title}
        subject={exam.subject}
        participant={session.participant}
        remainingSeconds={session.remainingSeconds}
        answeredCount={Object.keys(session.answers).length}
        totalQuestions={questionsList.length}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          {currentQuestion ? (
            <StudentQuestionCard
              question={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={questionsList.length}
              selectedOptionKey={session.answers[currentQuestion.id]}
              isDoubtful={Boolean(session.doubtful[currentQuestion.id])}
              onSelectOption={handleSelectOption}
              onToggleDoubtful={handleToggleDoubtful}
              onPrev={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              onNext={() => {
                if (currentIndex < questionsList.length - 1) {
                  setCurrentIndex((prev) => prev + 1);
                } else {
                  setIsSubmitModalOpen(true);
                }
              }}
            />
          ) : (
            <div className="rounded-3xl border border-[#DFD0D5] bg-white p-8 text-center text-xs text-[#7A5661]">
              Belum ada butir soal dalam ujian ini.
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          <StudentQuestionGrid
            questions={questionsList}
            currentIndex={currentIndex}
            answers={session.answers}
            doubtful={session.doubtful}
            onSelectIndex={(idx) => setCurrentIndex(idx)}
            onOpenSubmit={() => setIsSubmitModalOpen(true)}
          />
        </aside>
      </main>

      <StudentAntiCheatAlert
        isOpen={antiCheatOpen}
        violationCount={session.violationCount}
        maxViolations={maxViolations}
        isBlocked={isBlocked}
        onDismiss={() => {
          if (!isBlocked) setAntiCheatOpen(false);
        }}
        onRefreshStatus={handleRefreshStatus}
      />


      <StudentSubmitDialog
        isOpen={isSubmitModalOpen}
        totalQuestions={questionsList.length}
        answeredCount={Object.keys(session.answers).length}
        doubtfulCount={Object.values(session.doubtful).filter(Boolean).length}
        isLoading={isSubmitting}
        onConfirm={handleFinalSubmit}
        onCancel={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
}
