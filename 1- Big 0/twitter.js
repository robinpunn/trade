//find first, find nth...
const array = ['hi','hello','hey']

array[0] // O(1)
array[array.length-1] // O(1)

//comapre each tweet to every other tweet and compare their dates
const array2 = [{
    tweet: 'hi',
    date: 2012
},{
    tweet: 'my',
    date: 2014
},{
    tweet: 'teddy',
    date: 2018
}]

'jfdalsjfldsjf'.length // O(1)
/*in javascript, length is not a function, it's a built in look-up... so it's not O(n)*/