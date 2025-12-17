let loopBeat;
let bassSynth;

function setup() {
  bassSynth = new Tone.MembraneSynth().toDestination();

  Tone.Transport.bpm.value = 140;
  loopBeat = new Tone.Loop(playBeat, '4n');

  Tone.Transport.start();
  loopBeat.start(0);
}

function playBeat(time) {
  bassSynth.triggerAttackRelease('C1', '8n', time);
}

