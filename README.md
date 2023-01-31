# Master the Coding Interview:Data Structures + Algorithms

### Big O

1. What is good code?
    - Good code is 1) readable and 2) scalabe

2. Big O and Scalability
    - How much does the algorithm/function slow down as the input increases?
    - *Algorithmic efficiency: how many operations it needs in order to find the answer across different input sizes*
    - The less an algorithm slows down as input increases, the better

3. O(n)
    - O(n) --> Linear time ...Big O depends on the number of inputs (n)
    - The number of operations increaes lineraly with the number of inputs
    - Most common Big O notation

4. O(1)
    - O(1) --> Constant time ...as elements increase, operations stay the same

5. Simplifying Big O
    - Rule 1: Worst Case
    - Rule 2: Remove constants
    - Rule 3: Different terms for inputs
    - Rule 4: Drop Non Dominants

6. Big O Rule 1
    - We always care about the worst case scenario
    - For example, if you're looping through an array, the worst case scenario is the item you'r looking for is the last item in the array.

7. Big O Rule 2
    - Drop the constants: O(1 + n/2 + 100) --> O(n)
    - As the input increases, constants have decreasingly signficant effect

8. Big O Rule 3
    - Different inputs have different variables
    - For example, a function can have two inputs which are both looped over. Each input would have its own variable: O(a+b)

9. O(n^2)
    - Nested forloops are multiplied: 0(n^2) -> Quadratic time
    - As elements(inputs) increase the number of operations increases qudartically

10. Big O Rule 4
    - Drop non dominants
    - O(n + n^2) --> O(n^2)
    - As the input increases, the non dominant term has a decreasingly significant effect
    - O(x^2 +3x + 100 + x/2) --> O(x^2)

11. Big O Cheat Sheet
    - O(1) Constant- no loops
    - O(log N) Logarithmic- usually searching algorithms have log n if they are sorted (Binary Search)
    - O(n) Linear- for loops, while loops through n items
    - O(n log(n)) Log Liniear- usually sorting operations
    - O(n^2) Quadratic- every element in a collection needs to be compared to ever other element. Two nested loops
    - O(2^n) Exponential- recursive algorithms that solves a problem of size N
    - O(n!) Factorial- you are adding a loop for every element
    - [big o cheat sheet](https://www.bigocheatsheet.com/)

12. What does this mean?
    - We use Big O to talk about how our code performs
    - It's not about the speed of the computer, but the number of operations it takes to run the code
    - We can use Big O to measure one data structure vs another
    - Why we can use an array vs an object
        - [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
        - [Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    - Data structures are a way to organize data in order to use it more efficiently
    - Algorithms are a set of steps to accomplish a certain task
    - Data Structurs + Algorithms = Programs
    - Knowing how to use data structures and algorithms is the difference between a good and a great developer

13. O(!n)
    - O(n!) --> Factorial time
    - As elements increase, the number of operations increases exponentially
    - Not very common or efficient
    - A nested loop for every element

14. 3 Pillars of Programming
    - What is good code?
        - Readable
        - Scalable
            - Speed
            - Memory
    - Readble
    - Memory (space complexity)
    - Speed (time complexity)

15. Space Complexity
    - When a program executes, it has two ways to remember things
        - 1) the heap (variables)
        - 2) the stack (function calls)
    - The more memory a program uses, the more space it takes up
    - There is a tradeoff between speed and memory

16. Summary
    - Knowing how much time and memory an algorithm takes is important
    - Big O is something you won't find in your day to day job, but it should always be in the back of your mind
    - Big O measures time and space complexity
    - Big O describes the upper bounds of our estimates, looking at the worst case scenario
    - Time is how long an algorithm takes to run, space is how much memory an algorithm takes up
    - Big O is about how you can scale your code
    - Sometimes readability is more important than scalability
    - Premature optimization is the root of all evil
    - You should always be aware of Big O, but you shouldn't focus on it until you need to
    - Data needs to be sufficently large before you start worrying about Big O