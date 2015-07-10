# OPERATOR
[![Build Status](http://img.shields.io/travis/mohayonao/operator.svg?style=flat-square)](https://travis-ci.org/mohayonao/operator)
[![NPM Version](http://img.shields.io/npm/v/@mohayonao/operator.svg?style=flat-square)](https://www.npmjs.org/package/@mohayonao/operator)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> simple operator

## Installation

Node.js

```sh
npm install @mohayonao/operator
```

Browser

- [operator.js](https://raw.githubusercontent.com/mohayonao/operator/master/build/operator.js)

## API
### Operator
- `constructor(audioContext: AudioContext)`

#### Instance attribute
- `context: AudioContext`
- `type: string`
- `frequency: AudioParam`
- `detune: AudioParam`
- `gain: AudioParam`
- `onended: function`

#### Instance methods
- `connect(destination: AudioNode): void`
- `disconnect(): void`
- `start(when: number): void`
- `stop(when: number): void`
- `setPeriodicWave(periodicWave: PeriodicWave): void`
- `setEnvelope(envelope: any, target: string = 'gain'): void`
- `getEnvelope(target: string = 'gain'): void`

## AudioGraph

![operator](https://raw.githubusercontent.com/wiki/mohayonao/operator/images/operator.png)

## See Also
- [@mohayonao/envelope](https://github.com/mohayonao/envelope) - simple envelope
- [@mohayonao/fm-synth](https://github.com/mohayonao/fm-synth) - simple frequency modulation synthesizer

## License
MIT
