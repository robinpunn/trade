const boxes = [0, 1, 2, 3, 4, 5]

function compressFirstBox(boxes) {
    console.log(boxes[0])
}

function logFirstTwoBoxes(boxes) {
    console.log(boxes[0]) // O(1)
    console.log(boxes[1]) // O(1)
}

compressFirstBox(boxes) // O(1) --> Constant Time
logFirstTwoBoxes(boxes) // O(2) --> Simplified to O(1)