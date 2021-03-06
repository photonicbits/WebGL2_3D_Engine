
class StopWatch{
    constructor(){
        this.currentDate = new Date();
        this.currentTime = this.currentDate.getTime();
        this.timeKey = this.currentTime;
        this.ticks = 0;
    }

    resetTicker(){
        this.currentDate = new Date();
        this.currentTime = this.currentDate.getTime();
        this.ticks = this.currentTime - this.timeKey;
        this.timeKey = this.currentTime;
    }

    getTicks(){
        return this.ticks;
    }

    getFrameDelay(secondsPerFrame){
        var delay = secondsPerFrame-this.ticks;
        return delay>=0?delay/2.0:0; // /2 avoid spike every consecutive frame
    }
}

