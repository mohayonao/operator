(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Operator = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./lib/Operator");

},{"./lib/Operator":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CONTEXT = typeof Symbol !== "undefined" ? Symbol("CONTEXT") : "_@mohayonao/operator:CONTEXT";
exports.CONTEXT = CONTEXT;
var OUTLET = typeof Symbol !== "undefined" ? Symbol("OUTLET") : "_@mohayonao/operator:OUTLET";
exports.OUTLET = OUTLET;
var OSCILLATOR = typeof Symbol !== "undefined" ? Symbol("OSCILLATOR") : "_@mohayonao/operator:OSCILLATOR";
exports.OSCILLATOR = OSCILLATOR;
var GAIN = typeof Symbol !== "undefined" ? Symbol("GAIN") : "_@mohayonao/operator:GAIN";
exports.GAIN = GAIN;
var ENVELOPES = typeof Symbol !== "undefined" ? Symbol("ENVELOPES") : "_@mohayonao/operator:ENVELOPES";

exports.ENVELOPES = ENVELOPES;

var Operator = (function () {
  function Operator(audioContext) {
    _classCallCheck(this, Operator);

    this[CONTEXT] = audioContext;
    this[OSCILLATOR] = audioContext.createOscillator();
    this[GAIN] = audioContext.createGain();
    this[OUTLET] = this[GAIN];
    this[ENVELOPES] = {};
  }

  _createClass(Operator, [{
    key: "connect",
    value: function connect(destination) {
      this[OSCILLATOR].connect(this[GAIN]);
      this[GAIN].connect(destination);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var _GAIN;

      this[OSCILLATOR].disconnect();
      (_GAIN = this[GAIN]).disconnect.apply(_GAIN, arguments);
    }
  }, {
    key: "start",
    value: function start(when) {
      applyTo(this[ENVELOPES].frequency, this[OSCILLATOR].frequency, when);
      applyTo(this[ENVELOPES].detune, this[OSCILLATOR].detune, when);
      applyTo(this[ENVELOPES].gain, this[GAIN].gain, when);
      this[OSCILLATOR].start(when);
    }
  }, {
    key: "stop",
    value: function stop(when) {
      this[OSCILLATOR].stop(when);
    }
  }, {
    key: "setPeriodicWave",
    value: function setPeriodicWave(periodicWave) {
      this[OSCILLATOR].setPeriodicWave(periodicWave);
    }
  }, {
    key: "setEnvelope",
    value: function setEnvelope(envelope) {
      var target = arguments.length <= 1 || arguments[1] === undefined ? "gain" : arguments[1];

      this[ENVELOPES][target] = envelope;
    }
  }, {
    key: "getEnvelope",
    value: function getEnvelope() {
      var target = arguments.length <= 0 || arguments[0] === undefined ? "gain" : arguments[0];

      return this[ENVELOPES][target];
    }
  }, {
    key: "context",
    get: function get() {
      return this[CONTEXT];
    }
  }, {
    key: "outlet",
    get: function get() {
      return this[OUTLET];
    }
  }, {
    key: "type",
    get: function get() {
      return this[OSCILLATOR].type;
    },
    set: function set(value) {
      this[OSCILLATOR].type = value;
    }
  }, {
    key: "frequency",
    get: function get() {
      return this[OSCILLATOR].frequency;
    }
  }, {
    key: "detune",
    get: function get() {
      return this[OSCILLATOR].detune;
    }
  }, {
    key: "onended",
    get: function get() {
      return this[OSCILLATOR].onended;
    },
    set: function set(value) {
      this[OSCILLATOR].onended = value;
    }
  }, {
    key: "gain",
    get: function get() {
      return this[GAIN].gain;
    }
  }]);

  return Operator;
})();

exports["default"] = Operator;

function applyTo(envelope, audioParam, startTime) {
  if (envelope && typeof envelope.applyTo === "function") {
    envelope.applyTo(audioParam, startTime);
  }
}
},{}]},{},[1])(1)
});