export const CONTEXT = typeof Symbol !== "undefined" ? Symbol("CONTEXT") : "_@mohayonao/operator:CONTEXT";
export const OSCILLATOR = typeof Symbol !== "undefined" ? Symbol("OSCILLATOR") : "_@mohayonao/operator:OSCILLATOR";
export const GAIN = typeof Symbol !== "undefined" ? Symbol("GAIN") : "_@mohayonao/operator:GAIN";
export const ENVELOPES = typeof Symbol !== "undefined" ? Symbol("ENVELOPES") : "_@mohayonao/operator:ENVELOPES";

export default class Operator {
  constructor(audioContext) {
    this[CONTEXT] = audioContext;
    this[OSCILLATOR] = audioContext.createOscillator();
    this[GAIN] = audioContext.createGain();
    this[ENVELOPES] = {};
  }

  get context() {
    return this[CONTEXT];
  }

  get type() {
    return this[OSCILLATOR].type;
  }

  set type(value) {
    this[OSCILLATOR].type = value;
  }

  get frequency() {
    return this[OSCILLATOR].frequency;
  }

  get detune() {
    return this[OSCILLATOR].detune;
  }

  get onended() {
    return this[OSCILLATOR].onended;
  }

  set onended(value) {
    this[OSCILLATOR].onended = value;
  }

  get gain() {
    return this[GAIN].gain;
  }

  connect(destination) {
    this[OSCILLATOR].connect(this[GAIN]);
    this[GAIN].connect(destination);
  }

  disconnect(...args) {
    this[OSCILLATOR].disconnect();
    this[GAIN].disconnect(...args);
  }

  start(when) {
    applyTo(this[ENVELOPES].frequency, this[OSCILLATOR].frequency, when);
    applyTo(this[ENVELOPES].detune, this[OSCILLATOR].detune, when);
    applyTo(this[ENVELOPES].gain, this[GAIN].gain, when);
    this[OSCILLATOR].start(when);
  }

  stop(when) {
    this[OSCILLATOR].stop(when);
  }

  setPeriodicWave(periodicWave) {
    this[OSCILLATOR].setPeriodicWave(periodicWave);
  }

  setEnvelope(envelope, target = "gain") {
    this[ENVELOPES][target] = envelope;
  }

  getEnvelope(target = "gain") {
    return this[ENVELOPES][target];
  }
}

function applyTo(envelope, audioParam, startTime) {
  if (envelope && typeof envelope.applyTo === "function") {
    envelope.applyTo(audioParam, startTime);
  }
}
