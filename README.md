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

### How To Solve Coding Problems

1. Section Overview
    - The technical interview is a way to see if you can solve a problem the company or employer is facing
    - What is the ideal problem solving process?
    - Use data structures and algorithms to solve problems
    - The goal is not to memorize algorithms, but to understand the thought process behind solving problems
    - Analyze Big O solutions, but choose the right solution for the problem

2. What are companies looking for?
    1. Analytic Skills
        - How can you think through a problem and analyze it?
        - Companies want to see how you think through a problem
    2. Coding Skills
        - Do you code well?
        - Is your code clean?
    3. Technical Skills
        - Do you know the fundamentals?
        - Do you understand the pros and cons of different solutions?
    4. Communication Skills
        - Does your personality match the company culture?
        - Can you communicate well with others?
    - When and why should you use certain data structures and algorithms over others?

3. What we need for coding interviews
    - Data Structures
        - Arrays
        - Stacks
        - Queues
        - Linked Lists
        - Trees
        - Tries
        - Graphs
        - Hash Tables
    - Algorithms
        - Sorting
        - Dynamic Programming
        - BFS + DFS (searching)
        - Recursion

4. Exercise: Google Interview
    - Interview Cheat Sheet
        1. The three pillars of good code
        2. What skills interviewers are looking for
        3. Step by Step through a problem
        4. Good code checklist
        5. Hueristics to ace the question
        - **Always remember**: Communicate your thought process as much as possible. Don't worry about finishing fast. Every part of the interview matters.

### Data Structures: Introduction

1. Section Overview
    - A data structure is a collection of values, the relationships among them, and the functions or operations that can be applied to the data
    - Algorithms are the steps we put in place to manipulate data structures
    - Data structures + Algorithms = Programs

2. What is a data structure?
    - A data structure is a collection of values, the relationships among them, and the functions or operations that can be applied to the data
    - Data structures are a way to organize data in order to use it more efficiently
    - Data structures have different pros and cons
    - Two parts to a data structure
        1. How to build it
        2. How to use it
    - Based on difference scenarios, data needs to be stored in a specifiic format

3. How computers store data
    - Variables are stored in RAM(random access memory)
    - Storage is persistent or permanent, RAM is temporary
    - Persistent storage is slower than RAM
    - CPU acceses RAM and persistent storage, but accessing RAM is much faster
    - RAM has addresses that are used to access the data and are used to run programs
    - Each address has a number of bits that can be used to store data
    - 8bits = 1 byte, each address can hold 1 byte of data
    - CPU is connected to a memory controller that is connected to RAM
    - Memory controller can read and write data to RAM
    - CPU caches recent data that it has accessed
    - 8 bit system can store 256 different values, 16 bit system can store 65,536 different values, 32 bit system can store 4,294,967,296 different values, 64 bit system can store 18,446,744,073,709,551,616 different values
    - Our goal is to minimize the operations that we need to do to in order for the CPU to access the data

4. Data Structures in different languages
    - Each language has different data types and data structures
    - Javascript has primitive data types while complex data types are objects and arrays
    - If a language doesn't have a data structure, you can build it yourself

5. Operations on data structures
    - Data structures are simply variations on how we store data
    - Some data structures are better than others for different operations
    - Insertion, deletion, traversal, searching, and sortig are some of the most common operations
    - Access is the most important/common operation

### Data Structures: Arrays

1. Arrays Introduction
    - Arrays, sometimes called lists, organize data sequentially
    - Arrays have the smallest memory footprint of any data structure
    - Arrays are the best choice if all you need to do is store data and access it by index
        - lookup (access) is O(1)
        - push is O(1)
        - insert is O(n)
        - delete is O(n)

2. Static vs Dynamic Arrays
    - Static arrays are fixed in size, you need to specify the size when you create the array
    - Dynamic arrays are not fixed in size, they can grow and shrink as needed
    - Arrays in JavaScript are dynamic
    - Low level languages like C++ allow managing memory manually, which allows you to create static arrays
    - With javascript, memory is managed automatically
    - Dynamic arrays expand as you add more elements
        - append is O(1) if there is space, O(n) if there is no space

3. Classes in JavaScript
    - Arrays and objects are reference types in JavaScript
    - Primitive types are copied by value, reference types are copied by reference
    - Context vs Scope
        - Context tells you where we are within the object
        - Scope is the visibility of variables
        - this refers to the object that is executing the current function
    - Instantiation
        - When you make a copy of an object and reuse the code
        - The new keyword does the following things
            - Creates a new empty object
            - Binds the value of this to the new empty object
            - Calls the constructor function to build the object

4. Implementing an Array
    - This section is not necessary for the interview, but it is good to know
    - Data structures are simply things that we can build from scratch
    - Most data structures are built on top of other data structures
    - Arrays in JavaScript are just objects with integer keys that act like indexes

5. Strings and Arrays
    - Treat strings questions as array questions
    - Strings are arrays of characters
    - Use split() to convert a string into an array
    - Use join() to convert an array into a string

6. Arrays Review
    - Pros
        - Fast lookups
        - Fast push/pop
        - Ordered
    - Cons
        - Slow inserts
        - Slow deletes
        - Fixed size (if using static arrays)
