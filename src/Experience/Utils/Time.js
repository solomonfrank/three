import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.startTime = Date.now();
    this.currentTime = this.startTime;
    this.elaspedTime = 0;
    this.deltaTime = 16;
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.deltaTime = currentTime - this.currentTime;
    this.currentTime = currentTime;
    this.elaspedTime = this.currentTime = this.startTime;
    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
