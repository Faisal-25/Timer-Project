
class Timer {
    //durationInput -> a reference to a dom element which is a text input
    //startButton -> reference to a dom element
    //pauseButton -> reference to a dom element
    constructor(durationInput, startButton, pauseButton,callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
    
        //it may happen that we didn't provide any callbacks->empty object or something like that so we have to account for it so that our property doesn't behave unexpectedly
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        } //-> this means that there is something that is passed in the callbacks
        //~this.timeLeft = 30;

        this.startButton.addEventListener('click',this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }
        //so if we use arrow function here we can make 'this' point to the object
        //can we use bind or apply -> yes sure
        // we can just do this
        //~this.startButton.addEventListener('click', this.start.bind(this));
        //'this' above, inside the bind points to the instance of the class 
      start =  () => {
          if(this.onStart){
              this.onStart(this.timeRemaining);
          }
          this.tick();//whenever we call start() this function is goind to run immediately
          //we can use setInterval() to call tick every 1 second
          this.interval = setInterval(this.tick, 50);
          //remember, that there is a clearInterval method which can be used to stop the interval, but How?
          //well the setInterval method returns and integer value which is kinda like the count how many time it has ran so far, what we do here is just store the intervalID in a variable make the variable as an attribut of the instance like done below
          
        
          ////console.log(s)
        //the goal of this method is to start the timer

    };
    pause = () =>{
        clearInterval(this.interval);
    };
    tick = () =>{
        
        //stopping the timer

        if(this.timeRemaining <= 0){
            this.pause();
            if(this.onComplete){
                this.onComplete();
            }
        }
        //~ this.timeLeft -=1;
        //~ this.durationInput.value = this.timeLeft;
        
        //To store the data of the timer we can store it in our javascript but here we are going to store data in our dom and then manipulate it using our javascript 
        //parseInt()->converts string to integer and does not give a decimal value
        //parseFloat()->converts string to integer and gives decimal as well
        //~ const timeRemaining = this.timeRemaining 
        //->this.durationInput.value seems like a repeated code and so if we want it repeadtedly we can use getters
        //~ this.timeRemaining= timeRemaining - 1;

        //so we can just do this
        else {
            this.timeRemaining  = this.timeRemaining - .05;
            if(this.onTick){
                this.onTick(this.timeRemaining);
            }
        }

        

    };
    
    //~ getTime() {
    //~     return parseFloat(this.durationInput.value);
    //~ }
    //so this get function which is also known as getter is a much better way to get timeRemaining why becoz for this method
    // 1. we don't have to use parentheses
    // 2. the getter methods can be referenced easily
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    // setTime() {
    //     this.durationInput.value = time;
    // }
    // similarly we can use setter to set the vlaue of durationInput

    set timeRemaining(time){
        this.durationInput.value = time.toFixed(2);
        //only shows first two decimals
        
    }
}
