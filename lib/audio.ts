// Procedural Web Audio API sound generator for forest ambiance
import { TimeOfDay } from "./types";

class ForestAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private windNode: AudioNode | null = null;
  private windGain: GainNode | null = null;
  private birdTimer: NodeJS.Timeout | null = null;
  private cricketTimer: NodeJS.Timeout | null = null;
  private timeOfDay: TimeOfDay = "day";

  public init() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
  }

  public setTimeOfDay(tod: TimeOfDay) {
    this.timeOfDay = tod;
  }

  public toggle(timeOfDay: TimeOfDay): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(timeOfDay);
      return true;
    }
  }

  public start(tod: TimeOfDay) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.timeOfDay = tod;
    this.isPlaying = true;
    this.startWind();
    this.scheduleBirds();
    this.scheduleCrickets();
  }

  public stop() {
    this.isPlaying = false;
    if (this.birdTimer) clearTimeout(this.birdTimer);
    if (this.cricketTimer) clearTimeout(this.cricketTimer);
    if (this.windGain && this.ctx) {
      this.windGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        try {
          this.windNode?.disconnect();
          this.windGain?.disconnect();
        } catch {}
      }, 500);
    }
  }

  private startWind() {
    if (!this.ctx) return;
    // Generate pink-filtered noise for soft forest breeze
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.03;
      b6 = white * 0.115926;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter to simulate tree leaves rustling
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 450;
    filter.Q.value = 1.0;

    const gain = this.ctx.createGain();
    gain.gain.value = 0.25;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    this.windNode = noise;
    this.windGain = gain;
  }

  private scheduleBirds() {
    if (!this.isPlaying || !this.ctx) return;
    const nextInterval = 2500 + Math.random() * 5000;

    this.birdTimer = setTimeout(() => {
      if (!this.isPlaying || !this.ctx) return;
      if (this.timeOfDay !== "night") {
        this.playBirdChirp();
      }
      this.scheduleBirds();
    }, nextInterval);
  }

  private playBirdChirp() {
    if (!this.ctx || this.ctx.state !== "running") return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const baseFreq = 2200 + Math.random() * 1400;
    osc.type = "sine";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.18);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  private scheduleCrickets() {
    if (!this.isPlaying || !this.ctx) return;
    const nextInterval = 800 + Math.random() * 1200;

    this.cricketTimer = setTimeout(() => {
      if (!this.isPlaying || !this.ctx) return;
      if (this.timeOfDay === "sunset" || this.timeOfDay === "night") {
        this.playCricketChirp();
      }
      this.scheduleCrickets();
    }, nextInterval);
  }

  private playCricketChirp() {
    if (!this.ctx || this.ctx.state !== "running") return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(4500 + (Math.random() - 0.5) * 400, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.02, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const forestAudio = new ForestAudioEngine();

