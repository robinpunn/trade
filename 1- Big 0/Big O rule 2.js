function printFirstItemThenHalfThenSayHi100Times(items) {
  console.log(items[0]);

  let middleIndex = Math.floor(items.length / 2);
  let index = 0;

  while (index < middleIndex) {
    console.log(items[index]);
    index++;
  }

  for (let i = 0; i < 100; i++) {
    console.log('hi');
  }
}

// Answer: O(1 + n/2 + 100) --> O(n)

function compressBoxesTwice(boxes) {
    boxes.forEach(function(boxes) {
        console.log(boxes);
    });
    
    boxes.forEach(function(boxes) {
        console.log(boxes);
    });
}

// Answer: O(2n) --> O(n)