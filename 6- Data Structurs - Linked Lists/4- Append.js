//add an append method
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
        //new node
        let newNode = {
            value: value,
            next: null
        }
        //newNode to next value of tail
        this.tail.next = newNode
        //new tail is newNode
        this.tail = newNode
        // increase length
        this.length ++
        return this
    }
    prepend(value) {
        //code here
    }
}

const myLinkedList = new LinkedList(10)

myLinkedList.append(5)
myLinkedList.append(16)
// console.log(myLinkedList)