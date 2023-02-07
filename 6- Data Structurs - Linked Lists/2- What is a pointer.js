// points to the same place in memory, we are not creating a new object
const obj1 = { a: true };
const obj2 = obj1; 

obj1.a = "booya";

console.log(obj1); // { a: 'booya' }
console.log(obj2); // { a: 'booya' }

// deleting obj3 does not delete obj4
let obj3 = { a: true };
let obj4 = { a: true };

delete obj3.a;

console.log(obj3); // {}
console.log(obj4); // { a: true }

