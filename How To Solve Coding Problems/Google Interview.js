//take a collection of numbers and find a matching pair that is equal to a given sum

array1 = [1,2,3,9] //sum= 8
array2 = [1,2,4,4] //sum = 8

// array takes two imputs, array and sum
function collectionSum(array,sum) {
    //variable to return for node.js purposes
    let answer = false
    //loop through the array and check if any pairs add up to the sum
    // create two loops to check pairs next to each other
    for (let i=0; i<array.length;i++) {
        for(let k=1; k<array.length;k++) {
            if (array[i] + array[k] === sum) {
                answer = true
            }
        }
    }
    console.log(answer)
}

collectionSum(array2,8) //Time: O(n^2) Space: O(1)

//if array size is massive, and time complexity matters, use hashmpap?
// function collectionSum2(array,sum) {
//     let answer = false
//     let map = {}
//     for (let i=0; i<array.length;i++) {
//         map[i] = sum - array[i]
//         if(map[i]===map[array[i]]) {

//         }
//     }
//     console.log(answer)
// }

// collectionSum2(array1,8)

// //Naive
// function hasPairWithSum(arr, sum) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] + arr[j] === sum) return true;
//     }
//   }
//   return false;
// }

//Optimized
function hasPairWithSum2(arr, sum) {
    let answer = false
    let mySet = new Set();
    for (let i = 0; i < arr.length; i++) {
        if (mySet.has(arr[i])) {
        answer =  true;
        }
        mySet.add(sum - arr[i]);
    }
    console.log(answer)
}

hasPairWithSum2(array1,8) //Time: O(n) Space: O(n)