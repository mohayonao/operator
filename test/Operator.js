import "web-audio-test-api";
import assert from "power-assert";
import sinon from "sinon";
import Envelope from "@mohayonao/envelope";
import Operator, { OSCILLATOR, GAIN } from "../src/Operator";

describe("Operator", () => {
  let audioContext;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  describe("constructor()", () => {
    it("works", () => {
      let op = new Operator(audioContext);

      assert(op instanceof Operator);
    });
  });
  describe("#context: AudioContext", () => {
    it("works", () => {
      let op = new Operator(audioContext);

      assert(op.context === audioContext);
    });
  });
  describe("#type: string", () => {
    it("works", () => {
      let op = new Operator(audioContext);

      op.type = "triangle";

      assert(op.type === op[OSCILLATOR].type);
    });
  });
  describe("#frequency: AudioParam", () => {
    it("works", () => {
      let op = new Operator(audioContext);

      assert(op.frequency === op[OSCILLATOR].frequency);
    });
  });
  describe("#detune: AudioParam", () => {
    it("works", () => {
      let op = new Operator(audioContext);

      assert(op.detune === op[OSCILLATOR].detune);
    });
  });
  describe("#onended: function", () => {
    it("works", () => {
      let op = new Operator(audioContext);

      op.onended = sinon.spy();

      assert(op.onended === op[OSCILLATOR].onended);
    });
  });
  describe("#gain: AudioParam", () => {
    it("works", () => {
      let op = new Operator(audioContext);

      assert(op.gain === op[GAIN].gain);
    });
  });
  describe("#connect(destination): void", () => {
    it("works", () => {
      let op = new Operator(audioContext);

      op.connect(audioContext.destination);

      assert(audioContext.destination.$isConnectedFrom(op[GAIN]));
      assert(op[GAIN].$isConnectedFrom(op[OSCILLATOR]));
    });
  });
  describe("#disconnect(destination): void", () => {
    it("works", () => {
      let op = new Operator(audioContext);

      op.connect(audioContext.destination);
      op.disconnect();

      assert(!audioContext.destination.$isConnectedFrom(op[GAIN]));
      assert(!op[GAIN].$isConnectedFrom(op[OSCILLATOR]));
    });
  });
  describe("#start(when): void", () => {
    it("works", () => {
      let op = new Operator(audioContext);

      op.start(1);

      assert(op[OSCILLATOR].$startTime === 1);
    });
  });
  describe("#stop(when): void", () => {
    it("works", () => {
      let op = new Operator(audioContext);

      op.start(1);
      op.stop(2);

      assert(op[OSCILLATOR].$stopTime === 2);
    });
  });
  describe("#setPeriodicWave(periodicWave: PeriodicWave): void", () => {
    it("works", () => {
      let op = new Operator(audioContext);
      let wave = audioContext.createPeriodicWave(new Float32Array(1024), new Float32Array(1024));

      op.setPeriodicWave(wave);

      assert(op.type === "custom");
      assert(op[OSCILLATOR].$custom === wave);
    });
  });
  describe("#setEnvelope(envelope: any, target: string = 'gain'): void", () => {
    it("works", () => {
      let op = new Operator(audioContext);
      let envelope1 = Envelope.asr(0.2, 0.5, 0.3);
      let envelope2 = envelope1.madd(5);
      let envelope3 = envelope2.madd(10, 880);

      envelope1.applyTo = sinon.spy(envelope1.applyTo.bind(envelope1));
      envelope2.applyTo = sinon.spy(envelope2.applyTo.bind(envelope2));
      envelope3.applyTo = sinon.spy(envelope3.applyTo.bind(envelope3));

      op.setEnvelope(envelope1);
      op.setEnvelope(envelope2, "detune");
      op.setEnvelope(envelope3, "frequency");
      op.start(1);

      assert(envelope1.applyTo.callCount === 1);
      assert(envelope1.applyTo.args[0][0] === op[GAIN].gain);
      assert(envelope1.applyTo.args[0][1] === 1);
      assert(envelope2.applyTo.callCount === 1);
      assert(envelope2.applyTo.args[0][0] === op[OSCILLATOR].detune);
      assert(envelope2.applyTo.args[0][1] === 1);
      assert(envelope3.applyTo.callCount === 1);
      assert(envelope3.applyTo.args[0][0] === op[OSCILLATOR].frequency);
      assert(envelope3.applyTo.args[0][1] === 1);
    });
  });
  describe("#getEnvelope(target: string = 'gain'): void", () => {
    it("works", () => {
      let op = new Operator(audioContext);
      let envelope1 = Envelope.asr(0.2, 0.5, 0.3);
      let envelope2 = envelope1.madd(5);
      let envelope3 = envelope2.madd(10, 880);

      op.setEnvelope(envelope1);
      op.setEnvelope(envelope2, "detune");
      op.setEnvelope(envelope3, "frequency");

      assert(op.getEnvelope() === envelope1);
      assert(op.getEnvelope("detune") === envelope2);
      assert(op.getEnvelope("frequency") === envelope3);
      assert(typeof op.getEnvelope("delayTime") === "undefined");
    });
  });
});
