//node class
class Node {
    constructor(value) {
        this.value = value,
        this.next = null
    }
}
// linked list class
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
        const newNode = new Node(value)
        //newNode to next value of tail
        this.tail.next = newNode
        //new tail is newNode
        this.tail = newNode
        // increase length
        this.length++
        return this
    }
    prepend(value) {
        const newNode = new Node(value)
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