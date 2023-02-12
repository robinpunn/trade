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
    printList() {
        const array = []
        let currentNode = this.head
        while (currentNode !== null) {
            array.push(currentNode.value)
            currentNode = currentNode.next
        }
        console.log(this)
        return array
    }
    insert(index,value) {
        //check params
        if (index===0) {
            return this.prepend(value)
        }
        if (index >= this.length) {
            return this.append(value)
        }
        const newNode = new Node(value)
        const leader = this.traverseToIndex(index-1)
        const holdingPointer = leader.next
        leader.next = newNode
        newNode.next = holdingPointer
        this.length++
        return this
    }
    remove(index) {
        //params
        if (index >=this.length || index< 0) {
            return 'not in range'
        }

        //remove head
        if (index===0) {
            this.length--
            this.head = this.head.next
            return this
        }

        //variab le to track index input
        const leader = this.traverseToIndex(index-1)

        //remove tail
        if (index === this.length-1) {
            leader.next = null
            this.tail = leader
            this.length--
            return this
        }

        //remove middle
        const removeNode = leader.next
        leader.next = removeNode.next
        this.length--
        return this
    }

    traverseToIndex(index) {
        let counter = 0
        let currentNode = this.head
        while (counter!==index) {
            currentNode = currentNode.next
            counter++
        }
        return currentNode
    }
}

const myLinkedList = new LinkedList(10)

myLinkedList.append(5)
myLinkedList.append(16)
myLinkedList.prepend(33)
myLinkedList.insert(2,99)
myLinkedList.printList()