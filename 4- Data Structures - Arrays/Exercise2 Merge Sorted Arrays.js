//merge two sorted arrays into a big sorted array
const array1 = [0,3,4,31]
const array2 = [4,6,30]

function mergeSortedArray(array1, array2) {
    return [...array1,...array2].sort((a,b) => a-b)
}

function mergeSortedArray2(array1,array2) {
    const final = []

    let array1Item = array1[0]
    let array2Item = array2[0]
    let i = 1
    let j = 1

    //check input
    if (array1.length === 0) {
        return array2
    }
    if (array2.length === 0) {
        return array1
    }

    while (array1Item || array2Item) {
        if (!array2Item || array1Item < array2Item) {
            final.push(array1Item)
            array1Item = array1[i]
            i++
        } else {
            final.push(array2Item)
            array1Item = array1[j]
            j++
        }
    }

    return final
}