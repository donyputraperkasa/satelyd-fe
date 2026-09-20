"use client";

import {
  playClickSynth,
  playCardFlipSynth,
  playTickSynth,
  playSelectOptionSynth,
} from "./game-audio-synth";
import {
  playTimerAlarmSynth,
  playIncorrectBuzzerSynth,
  playCorrectFanfareSynth,
} from "./game-audio-jingles";

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (this.isMuted || typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick() {
    const ctx = this.getContext();
    if (ctx) playClickSynth(ctx);
  }

  public playCardFlip() {
    const ctx = this.getContext();
    if (ctx) playCardFlipSynth(ctx);
  }

  public playTick() {
    const ctx = this.getContext();
    if (ctx) playTickSynth(ctx);
  }

  public playTimerAlarm() {
    const ctx = this.getContext();
    if (ctx) playTimerAlarmSynth(ctx);
  }

  public playSelectOption() {
    const ctx = this.getContext();
    if (ctx) playSelectOptionSynth(ctx);
  }

  public playIncorrectBuzzer() {
    const ctx = this.getContext();
    if (ctx) playIncorrectBuzzerSynth(ctx);
  }

  public playCorrectFanfare() {
    const ctx = this.getContext();
    if (ctx) playCorrectFanfareSynth(ctx);
  }
}

export const gameAudio = new SoundManager();
