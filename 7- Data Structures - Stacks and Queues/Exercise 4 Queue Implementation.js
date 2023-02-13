class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class Queue {
    constructor() {
        this.first = null
        this.last = null
        this.length = 0
    }
    peek() {
        return this.first
    }
    enqueue(value) {
        let newNode = new Node(value)
        if (this.length === 0) {
            this.first = newNode
            this.last = newNode
        } else {
            this.last.next = newNode
            this.last = newNode
        }
        this.length ++
        return this
    }
    dequeue() {
        if(!this.first) {
            return null
        }
        if(this.last===this.null) {
            this.last = null
        }
        this.first = this.first.next
        this.length --
        return this
    }
    //isEmpty
}

const myQueue = new Queue()

myQueue.enqueue('robin')
myQueue.enqueue('jasper')
myQueue.enqueue('obrin')
myQueue.enqueue('repsaj')
