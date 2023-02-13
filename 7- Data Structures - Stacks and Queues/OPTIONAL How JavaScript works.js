const a = 1
const b = 10
const c = 100

//call stack
console.log('1')
console.log('2')
console.log('3')

const one = () => {
    const two = () => {
        console.log('4')
    }
    two()
}

one() // order of execution... 

// recursion
function foo() {
    foo()
}

foo() // stack overflow

//asynchronous
console.log('1')
setTimeout(() => {
    console.log('2')
}, 2000)
console.log('3')


/*
1.CALL STACK
console.log('1')
setTimeout(() => {
    console.log('2')
}, 2000) //removed when it is recognized as a web API
console.log('3')

2.web API
setTimeout()

3.callback queue
callback() //setTimeout() is added to the callback queue

4.event loop
checks if the call stack is empty, if it is, it takes the first item from the callback queue and pushes it to the call stack
*/