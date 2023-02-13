class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }
    peek() {
        return this.top
    }
    push(value) {
        let newNode = new Node(value)
        if (this.length === 0) {
            this.top = newNode
            this.bottom = newNode
        }
        else {
            const top = this.top
            this.top = newNode
            this.top.next = top
        }
        this.length ++
        return this
    }
    pop() {
        if (!this.top) {
            return null
        }
        if (this.top === this.bottom) {
            this.bottom = null
        }
        const top = this.top
        this.top = this.top.next
        this.length --
        return top 
    }
    isEmpty() {
        return this.length === 0
    }
}

const myStack = new Stack()
myStack.push('google')
myStack.push('Udemy')
myStack.push('discord')
myStack.pop()

//Discord
//Udemy
//google