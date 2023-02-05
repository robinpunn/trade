// reference type
let object1 = { value: 10 };
let object2 = object1;
let object3 = { value: 10 };
console.log(object1 === object2); // true
console.log(object1 === object3); // false

object1.value = 15;
console.log(object2.value); // 15
console.log(object3.value); // 10

// context vs scope
//scope
function b() {
    let a = 4
    console.log(a) // 4
}
console.log(a) // ReferenceError: a is not defined

//context
console.log(this) // Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}

const object4 = {
    a: function() {
        console.log(this)
    }
}
object4.a() // {a: ƒ}

// instantiation
class Player {
    constructor(name, type) {
        console.log('player', this) // Player {}
        this.name = name
        this.type = type
    }
    introduce() {
        console.log(`Hi I am ${this.name}, I'm a ${this.type}`)
    }
}

class Wizard extends Player {
    constructor(name, type) {
        super(name, type)
    }
    play() {
        console.log(`WEEEE I'm a ${this.type}`)
    }
}

const wizard1 = new Wizard('Shelly', 'Healer')
const wizard2 = new Wizard('Shawn', 'Dark Magic')



