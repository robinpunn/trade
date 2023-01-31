//Log all pairs
const boxes = [1,2,3,4]

// function pairs(array) {
//     for (let i=0;i<array.length;i++) {
//         for (let j=0;j<array.length;j++) {
//             console.log(array[i],array[j])
//         }
//     }
// }

// pairs(boxes)

function pairs(array) {
    let empty = []
    for (let i=0;i<array.length;i++) {
        for (let j=0;j<array.length;j++) {
                empty.push([array[i],array[j]])
        }
    }
    console.log(empty)
}

pairs(boxes)

// Answer: O(n^2) --> Quadratic Time

function pairs2(array) {
    array.reduce((acc,curr) => {
        array.forEach((item) => {
            acc.push([curr,item])
        })
        return acc
    },[])
    .forEach((item) => console.log(item))
}

pairs2(boxes)

// Answer: O(n^2) --> Quadratic Time