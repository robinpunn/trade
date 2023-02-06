/* 
Given an array = [2,5,1,2,3,5,1,2,4]:
It should return 2

Given an array = [2,1,1,2,3,5,1,2,4]:
It should return 1

Given an array = [2,3,4,5]:
It should return undefined
*/

let array = [2,5,1,2,3,5,1,2,4]
let array2 = [2,1,1,2,3,5,1,2,4]
let array3 = [2,3,4,5]

//nested for loop
function recurringCharacter(arr) {
    for(let i=1;i<arr.length;i++) {
        for (let j=i-1; j>=0;j--) {
            if (arr[i] === arr[j]) {
                return arr[i]
            }
        }
    }
    return undefined
} // O(n^2)


//using object
function recurringCharacter2(arr) {
    if (!arr) {
        return 'uh oh, hotdog'
    }
    //create an empty object
    let map = {}
    //loop through array
    for (let i=0; i<arr.length; i++) {
        //if object contains array item as key, return array item
        if (map[arr[i]]) {
            return arr[i]
        }
        //add array item as key and value
        map[arr[i]] = arr[i]
    }
    //return undefined by default
    return undefined
} // O(n)