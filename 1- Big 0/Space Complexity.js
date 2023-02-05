function boooo(n) {
    for (let i = 0; i < n.length; i++) {
        console.log('boooooo!');
    }
}

boooo([1,2,3,4,5]) // O(1) --> Constant Time
/* only thing created in the function was let i = 0, which is why it is O(1) */

function arrayOfHiNTimes(n) {
    let hiArray = [];
    for (let i = 0; i < n; i++) {
        hiArray[i] = 'hi';
    }
    return hiArray;
}

arrayOfHiNTimes(6) // O(n) --> Linear Time
/* using rule 4, this becomes O(n)*/