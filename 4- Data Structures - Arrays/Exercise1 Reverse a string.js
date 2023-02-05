//Create a function that reverses a string
//'Hi my name is Robin' should be:
//'niboR si eman ym iH'

function reverse(str) {
    newStr = ''
    for (let i=str.length-1;i>=0;i--) {
        newStr += str[i]
    }
    return newStr
}

function reverse2(str) {
    //check input
    if (!str || str.length < 2 || typeof str !== 'string') {
        return 'no thanks'
    }

    const backwards = []
    const length = str.length-1
    for(let i = length; i>=0;i--) {
        backwards.push(str[i])
    }

    return backwards.join('')
}

function reverse3(str) {
    return str.split('').reverse().join('')
}

const reverse4 = str => [...str].reverse().join('')


