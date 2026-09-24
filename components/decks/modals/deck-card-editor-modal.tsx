"use client";

import type { DeckCardEditorModalProps } from "@/types";
import {
  CardEditorHeader,
  CardEditorSidebar,
  CardEditorForm,
  CardEditorFooter,
  useCardEditor,
} from "../card-editor";
import { getDeckSessionPin } from "../deck-constants";

export function DeckCardEditorModal({
  isOpen,
  onClose,
  deck,
  onSaveCards,
}: DeckCardEditorModalProps) {
  const editor = useCardEditor(deck, isOpen, onSaveCards, onClose);

  if (!isOpen) return null;

  const sessionPin = getDeckSessionPin(deck.id, deck.pinCode);

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#451420]/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-5xl h-[92vh] max-h-[92vh] flex flex-col rounded-2xl border border-[#E5D7DC] bg-[#FDFBF7] text-[#451420] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <CardEditorHeader
          title={deck.title}
          subject={deck.subject}
          gradeLevel={deck.gradeLevel}
          sessionPin={sessionPin}
          isSavedToast={editor.isSavedToast}
          onClose={onClose}
        />

        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          <CardEditorSidebar
            cards={editor.cards}
            activeCardIndex={editor.activeCardIndex}
            totalPoints={editor.totalPoints}
            onSelectCard={editor.setActiveCardIndex}
            onAddCard={editor.handleAddCard}
          />

          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#FDFBF7]">
            {editor.currentCard && (
              <CardEditorForm
                currentCard={editor.currentCard}
                cardIndex={editor.activeCardIndex}
                totalCards={editor.cards.length}
                options={editor.options}
                correctKey={editor.correctKey}
                questionImageInputRef={editor.questionImageInputRef}
                answerImageInputRef={editor.answerImageInputRef}
                onUpdateCurrentCard={editor.updateCurrentCard}
                onDeleteCard={editor.handleDeleteCard}
                onSelectCorrectOption={editor.setCorrectOption}
                onUpdateOptionText={editor.updateOptionText}
                onSetOptionCount={editor.handleSetOptionCount}
                onAddOption={editor.handleAddOption}
                onRemoveOption={editor.handleRemoveOption}
                onImageUpload={editor.handleImageUpload}
              />
            )}
          </div>
        </div>

        <CardEditorFooter
          onClose={onClose}
          onSave={editor.handleSave}
          isSaving={editor.isSaving}
        />
      </div>
    </div>
  );
}
