// Web Audio API Synthesizer for Festive Party Celebration Music

class PartyAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private currentStep = 0;

  // Melody notes in Hz (Pentatonic / Happy Celebration Scale: C, D, E, G, A, C)
  private melody = [
    523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 880.0, 1046.5,
    659.25, 783.99, 1046.5, 1318.51, 1046.5, 880.0, 783.99, 1046.5,
  ];

  private bassNotes = [130.81, 130.81, 164.81, 196.0, 146.83, 146.83, 174.61, 196.0];

  public start() {
    if (this.isPlaying) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      this.isPlaying = true;
      this.currentStep = 0;

      // 130 BPM => 16th note = ~115ms
      const stepTime = 120;
      this.timerId = window.setInterval(() => {
        this.playStep();
      }, stepTime);
    } catch {
      // AudioContext unavailable or blocked by policy
    }
  }

  private playStep() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const step = this.currentStep % 16;

    // 1. Bass drum beat on beats 0, 4, 8, 12
    if (step % 4 === 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    }

    // 2. Snare / Clapper on beats 4, 12
    if (step === 4 || step === 12) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(280, now);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    }

    // 3. Hi-hat on every 2nd step
    if (step % 2 === 1) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(8000, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    }

    // 4. Bass synth on every quarter note
    if (step % 2 === 0) {
      const bassFreq = this.bassNotes[(step / 2) % this.bassNotes.length];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(bassFreq, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    }

    // 5. Joyful celebratory melody note
    const melFreq = this.melody[step];
    if (melFreq) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(melFreq, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    }

    this.currentStep++;
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const partyAudio = new PartyAudioEngine();

