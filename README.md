# OPERATOR

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

### Class methods
- `build(algorithm: number, operators: Operator[]): Operator`

### Instance attribute
- `type: string`
- `frequency: AudioParam`
- `detune: AudioParam`
- `gain: AudioParam`
- `onended: EventHandler`

### Instance methods
- `connect(destination: AudioNode): void`
- `disconnect(): void`
- `start(when: number): void`
- `stop(when: number): void`
- `setPeriodicWave(periodicWave: PeriodicWave): void`

## License
MIT
