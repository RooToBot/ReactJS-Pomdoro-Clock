class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {time: 1500, timeShow: moment(1500000).format('mm:ss'), play: 0, type: "counter"};
    this.startStop = this.startStop.bind(this);

    this.bIncrement = this.bIncrement.bind(this);
    this.bDecrement = this.bDecrement.bind(this);
    this.sIncrement = this.sIncrement.bind(this);
    this.sDecrement = this.sDecrement.bind(this);
    
    this.reset = this.reset.bind(this);
  }
  
  tick() {
    if (this.state.time == 0) {
      if (this.state.type == "counter"){
        clearInterval(this.interval);
        this.state.time = document.getElementById("break-length").innerHTML * 60;
        this.interval = setInterval(() => this.tick(), 1000);
        document.getElementById("timer-label").innerHTML = "BREAK";
        document.getElementById("beep").play();
        this.state.type = "break";
      }
      
      else {
        clearInterval(this.interval);
        this.state.time = document.getElementById("session-length").innerHTML * 60;
        this.interval = setInterval(() => this.tick(), 1000);
        document.getElementById("timer-label").innerHTML = "SESSION";
        document.getElementById("beep").play();
        this.state.type = "counter";
      }
    }
    
    this.setState(prevState => ({
      time: prevState.time - 1,
      timeShow: moment(prevState.time * 1000).format('mm:ss')
    }));

  }
  
  startStop() {    
    if (this.state.play == 1) {
      clearInterval(this.interval);
      this.state.play = 0;
      return;
    }
    
    else if (this.state.play == 0) {
      this.interval = setInterval(() => this.tick(), 1000);
      this.state.play = 1;
      return;
    }
  }
  
  /*componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }*/
  
  bIncrement() {
    if (document.getElementById("break-length").innerHTML < 60 && this.state.play == 0) {
      document.getElementById("break-length").innerHTML = parseInt(document.getElementById("break-length").innerHTML, 10) + 1;
      this.state.time = document.getElementById("session-length").innerHTML * 60;
    }
  }
        
    bDecrement() {
      if (document.getElementById("break-length").innerHTML > 1 && this.state.play == 0) {
        document.getElementById("break-length").innerHTML = document.getElementById("break-length").innerHTML - 1;
        this.state.time = document.getElementById("session-length").innerHTML * 60;
      }
    }
        
    sIncrement() {
      if (document.getElementById("session-length").innerHTML < 60 && this.state.play == 0) {
        document.getElementById("session-length").innerHTML = parseInt(document.getElementById("session-length").innerHTML, 10) + 1;
        this.state.time = document.getElementById("session-length").innerHTML * 60;
      }
    }
        
    sDecrement() {
      if (document.getElementById("session-length").innerHTML > 1 && this.state.play == 0) {
        document.getElementById("session-length").innerHTML = document.getElementById("session-length").innerHTML - 1;
        this.state.time = document.getElementById("session-length").innerHTML * 60;
      }
    }
  
  reset() {
    document.getElementById("break-length").innerHTML = 5;
    document.getElementById("session-length").innerHTML = 25;
    document.getElementById("time-left").innerHTML = moment(1500 * 1000).format('mm:ss');
    this.state.play = 0;
    this.state.time = 1500;
    document.getElementById("beep").pause();
    clearInterval(this.interval);
  }
  
  render() {
    return (
      <div id="wrapper">
        <h1>Pomodoro Clock</h1>
        <div id="controls">
          <div>
            <div id="child">
              <p id="break-label">Break Length</p>
              
              <span id="break-increment" onClick={this.bIncrement}>UP</span>
              <span id="break-length">5</span>
              <span id="break-decrement" onClick={this.bDecrement}>DOWN</span>
            </div>
            
            <div id="child">
              <p id="session-label">Session Length</p>
              
              <span id="session-increment" onClick={this.sIncrement}>UP</span>
              <span id="session-length">25</span>
              <span id="session-decrement" onClick={this.sDecrement}>DOWN</span>
            </div>
          </div>
          <div id="wrapper2">
            <h4 id="timer-label">SESSION</h4>
            <h1 id="time-left">{this.state.timeShow}</h1>
            <span id="start_stop" onClick={this.startStop}>
              <img src="http://www.clker.com/cliparts/G/2/S/R/a/9/start-stop-btn-on.svg.hi.png">
              </img>
            </span>
            
            <span id="reset" onClick={this.reset}>
              <img src="https://image.flaticon.com/icons/svg/954/954000.svg">
              </img>
            </span>
          </div>
        </div>
        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1"/>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById('App'));
