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
        return array
    }
    insert(index,value) {
        /* my solution
         if (index===0) {
            return this.prepend(value)
        }
        if (index >= this.length) {
            return this.append(value)
        }
        let pre = this.head
        for (let i=0; i<index-1;i++) {
            pre = pre.next
        }
        let aft = pre.next
        const newNode = new Node(value)
        newNode.next = aft
        pre.next = newNode
        this.length++
        return this
        */
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