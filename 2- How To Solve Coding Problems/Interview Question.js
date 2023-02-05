/*

Given 2 arrays, create a function that lets a user know (true/false) whether those two arrays contain any common items

For example:

const array1 = ['a','b','c','x']
const array2 = ['z','y','i']
should return false

-----------------------------------

const array1 = ['a','b','c','x']
const array2 = ['z','y','x']
should return true

*/

const array1 = ['a','b','c','x']
const array2 = ['z','y','x']

// function commonItems(array1,array2) {
//     let final = false
//     for (let item=0;item<array1.length;item++) {
//         for (let other=0; other<array2.length;other++) {
//             if (array1[item] === array2[other]) {
//                 final = true
//             }
//         }
//     }
//     console.log(final)
// }

// commonItems(array1,array2) // Time: O(a*b) Space: O(1)


// Use a "hash table"
//array1 ==> obj {
//  a: true,
//  b: true,
//  c: true,
//  x: true
//}

//array2[index] === obj.properties

function commonItems2(array1,array2) {
    let map = {}
    let final = false
    for (let item=0; item<array1.length;item++) {
        if(!map[array1[item]]) {
            map[array1[item]] = true
        }
    }
    for (let item2=0; item2<array2.length;item2++) {
        if(map[array2[item2]]) {
            final = true
        }
    }
    console.log(final)
}

commonItems2(array1,array2) // Time: O(a+b) Space: O(a)

// use array.some() method with array.includes() method
// function commonItems3(array1,array2) {
//     let final = false
//     array1.some(item => {
//         if (array2.includes(item)) {
//             final = true
//         }
//     })
//     console.log(final)
// }

// commonItems3(array1,array2) // Time: O(a*b) Space: O(1)



