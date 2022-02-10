const durationInput = document.querySelector('#duration');
const startButton =  document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');


let perimeter = 2 * (Math.PI) * circle.getAttribute('r');
circle.setAttribute('stroke-dasharray',perimeter);
let duration;
const timer = new Timer(durationInput, startButton,pauseButton, {
    onStart(totalDuration){
       duration = totalDuration;
    },
    onTick(timeRemaining) {
        console.log((perimeter*timeRemaining) / (duration - perimeter))
        circle.setAttribute('stroke-dashoffset',
            perimeter*timeRemaining / duration - perimeter
        );
    },
    onComplete() {
        console.log('timer completed');
    }
});
 
// -> if we call the start method using this timer object, the value of 'this' is set to the instance of the object but inside our class we are calling the start() method using the button object which will set the value of 'this' to the button object and we can actually see it in the console
//******from the console
// ~hi there
// ~index.js:16 from outside class
// ~index.js:17 time to start the timer
// ~index.js:18 Timer {durationInput: input#duration, startButton: button#start, pauseButton: button#pause}
// ~index.js:16 PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
// ~index.js:17 time to start the timer
// ~index.js:18 <button class id=​"start">​Start ​</button>​

//****3 diff ways to determine value of 'this' inside a method */
//ask yourself these question
// 1. did you define the function with an arrow function -> write 'console.log('this') on the first valid line above the arrow function. Value of 'this' in the arrow function will be equal to that console.log(this);

// 2. did you call 'bind' , 'call' or 'apply' on the function when you invoked it

//~const printThis = function() {
    //~console.log(this);
//~}
//~printThis.call({color:'red'});

//->value of 'this' inside the function is the object {color:'red'}
//so this call function is going to override the value of 'this'
//same thing with apply() method
//same with bind as well
// 3. all other cases -> the value of this is going to be whatever is on the left of '.' of fucntion or method

// e.g
//~ const color = {
//~     printColor() {
//~         console.log(this);
//~     }
//~ };
//~ color.printColor(); 
// -> the value of this inside of printColor() is going to be equal to 'color' object
//~ const randomObj = {
//~     a : 1;
//~ }
//~ randomObj.printColor = color.printColor;
//~ randomObj.printColor();
//-> the value of 'this' here is randomObj
//so 