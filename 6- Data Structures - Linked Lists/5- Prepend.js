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
        this.length++
        return this
    }
    prepend(value) {
        /* my solution
        //store value of current head
        let head = this.head
        //new head takes value input, next becomes head variable
        this.head = {
            value: value,
            next: head
        }
        this.length++
        return this
        */

        //given solulsion
        const newNode = {
            value: value,
            next: null
        }
        newNode.next = this.head
        this.head = newNode
        this.length++
        return this
    }
}

const myLinkedList = new LinkedList(10)

myLinkedList.append(5)
myLinkedList.append(16)
myLinkedList.prepend(33)
// console.log(myLinkedList)