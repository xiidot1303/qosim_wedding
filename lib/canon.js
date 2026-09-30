// Pachelbel's Canon in D (public domain), played live with the Web Audio API
// as a soft music box. Used when no public/music.mp3 is provided.

const STEP = 0.29; // seconds per arpeggio note, 4 per chord
const LOOKAHEAD = 0.35;

// D  A  Bm  F#m  G  D  G  A
const BASS = [50, 45, 47, 42, 43, 38, 43, 45];
const ARP = [
  [62, 66, 69, 66],
  [61, 64, 69, 64],
  [62, 66, 71, 66],
  [61, 66, 69, 66],
  [62, 67, 71, 67],
  [62, 66, 69, 66],
  [62, 67, 71, 67],
  [61, 64, 69, 64],
];
const MELODY_1 = [78, 76, 74, 73, 71, 69, 71, 73]; // F# E D C# B A B C#
const MELODY_2 = [74, 73, 71, 69, 67, 66, 67, 64]; // D C# B A G F# G E

const freq = (midi) => 440 * 2 ** ((midi - 69) / 12);

function reverbImpulse(ctx, seconds, decay) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const data = buf.getChannelData(c);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** decay;
  }
  return buf;
}

export function createCanon() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const ctx = new Ctx();

  const master = ctx.createGain();
  master.gain.value = 0;
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp).connect(ctx.destination);

  const bus = ctx.createGain();
  const dry = ctx.createGain();
  dry.gain.value = 0.75;
  const wet = ctx.createGain();
  wet.gain.value = 0.45;
  const reverb = ctx.createConvolver();
  reverb.buffer = reverbImpulse(ctx, 3.4, 2.4);
  bus.connect(dry).connect(master);
  bus.connect(reverb).connect(wet).connect(master);

  // Bell-like tone: fundamental plus a few quiet overtones in a single oscillator.
  const bell = ctx.createPeriodicWave(new Float32Array([0, 1, 0.28, 0.1, 0.05, 0.02]), new Float32Array(6));
  const soft = ctx.createPeriodicWave(new Float32Array([0, 1, 0.12, 0.03]), new Float32Array(4));

  function note(midi, time, dur, vel, wave = bell) {
    const osc = ctx.createOscillator();
    osc.setPeriodicWave(wave);
    osc.frequency.value = freq(midi);
    const g = ctx.createGain();
    const v = vel * (0.9 + Math.random() * 0.2);
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(v, time + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0005, time + dur);
    osc.connect(g).connect(bus);
    osc.start(time);
    osc.stop(time + dur + 0.05);
  }

  let step = 0;
  let nextTime = 0;
  let timer = null;

  function playStep(s, t) {
    const chord = Math.floor(s / 4) % 8;
    const sub = s % 4;
    const cycle = Math.floor(s / 32);
    // Intro (arpeggio only), then the two canon lines, then both together — repeat.
    const phase = cycle === 0 ? 0 : 1 + ((cycle - 1) % 3);

    if (sub === 0) {
      note(BASS[chord], t, 3.4, 0.3, soft);
      note(BASS[chord] + 12, t, 2.6, 0.1, soft);
    }
    note(ARP[chord][sub], t, 1.9, 0.075);

    if (sub === 0 && phase > 0) {
      if (phase !== 2) note(MELODY_1[chord], t, 2.8, 0.16);
      if (phase !== 1) note(MELODY_2[chord], t, 2.8, phase === 3 ? 0.11 : 0.16);
    }
    // A light echo of the melody an octave higher in the last phase.
    if (sub === 2 && phase === 3) note(MELODY_2[chord] + 12, t, 1.6, 0.04);
  }

  function schedule() {
    while (nextTime < ctx.currentTime + LOOKAHEAD) {
      playStep(step, nextTime + (Math.random() - 0.5) * 0.01);
      step++;
      nextTime += STEP;
    }
  }

  return {
    play() {
      ctx.resume();
      nextTime = Math.max(nextTime, ctx.currentTime + 0.08);
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 2.5);
      if (!timer) timer = setInterval(schedule, 60);
      schedule();
    },
    pause() {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      clearInterval(timer);
      timer = null;
      setTimeout(() => !timer && ctx.suspend(), 500);
    },
  };
}

export function createFilePlayer(src) {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.7;
  return {
    play: () => audio.play().catch(() => {}),
    pause: () => audio.pause(),
  };
}
