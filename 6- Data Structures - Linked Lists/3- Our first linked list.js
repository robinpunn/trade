// 10 --> 5 --> 16
let myFirstLinkedList = {
    head: {
        value:10,
        next:{
            value:5,
            next: {
                value: 16,
                next: null
            }
        }
    }
}

//template
class LinkedList {
    constructor(value) {
        this.head = {
            value:value,
            next: null
        }
        this.tail = this.head
        this.length = 1;
    }
    append(value) {
        //code here
    }
}

const myLinkedList = new LinkedList()

console.log(myLinkedList)