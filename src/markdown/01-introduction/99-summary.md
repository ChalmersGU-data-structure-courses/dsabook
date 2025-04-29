## Chapter summary

This chapter introduced the role of data structures and algorithms in computer science and software development.
Through simple examples, we demonstrated how choosing the right data structure or algorithm can (greatly) enhance the performance and efficiency of programs.
We covered important concepts such as _abstract data types_ and provided an overview of the main categories of data structures discussed in the book: ordered sequences, trees, sets, maps, and graphs.

We also introduced _algorithm analysis_ and explained how asymptotic notation helps us compare the efficiency of different approaches.
To support all readers, the chapter included a brief review of essential mathematical tools and basic programming concepts needed to understand and implement algorithms effectively.

In the following chapter, we delve deeper into the formal analysis of algorithms, focusing on systematic methods to compare time and space complexity across various solutions.

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions {-}


:::::::::: question ::::::::::
An *ADT* is:

- [x] The specification of a data type within some language, independent of an implementation
- [ ] A concrete implementation of a class
- [ ] An implementation for a data structure in a program
- [ ] A collection of values
- [ ] Another name for a data structure

::: hints
- A collection of values is a data type, not an ADT.
- It can't be a data structure, since an ADT is more like the interface for a data structure.
- An implementation for a data structure in a program is close, but not really it. An ADT is more abstract than an actual program.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
An ADT is a form of:

- [x] Abstraction
- [ ] Metaphor
- [ ] Simile
- [ ] Programming
- [ ] Design

::: hints
- What does the "A" stand for in ADT?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which is an example of a composite type?

- [x] A bank account record
- [ ] An integer
- [ ] A floating point number
- [ ] A character

::: hints
- A composite type is made up of two or more simple types.
- Character, Integer, and floating point numbers are all simple types.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A *composite type* is:

- [x] A type comprised of other types
- [ ] A type composed from at least one simple type
- [ ] Another term for an Abstract Data Type
- [ ] An instance of a class


::: hints
- A type with only 1 simple type is just a simple type. There is a better answer to this question.
- An ADT is the realization of a data type, including the type and the operations allowed on the type.
- An object is an instance of a class.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A *data structure* is:

- [x] Used to implement an ADT
- [ ] A specification for an implementation
- [ ] A collection of values
- [ ] A type
- [ ] Another name for an ADT

::: hints
- A data structure is not an ADT.
- A data structure is not a type (which is also a collection of values).
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
An ADT is most like which of the following?

- [x] An interface
- [ ] A data structure
- [ ] A class
- [ ] An object
- [ ] A method
- [ ] A program

::: hints
- A data structure, program, class, or method are all concrete implementation.
- An object is something created at runtime.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A *primitive type* is:

- [x] A type that cannot be broken down into smaller types
- [ ] The simplest type in a class
- [ ] The model of a type
- [ ] A subset of a type

::: hints
- A class may have more than one, or only simple types as members.
- The model of a type is another way to define an ADT.
- Any type is a collection of values and therefore, a subset of another type.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A *type* is:

- [x] A collection of values
- [ ] A variable
- [ ] An integer
- [ ] An implementation
- [ ] Another name for an ADT

::: hints
- A type is a general concept, so it is not an integer, or an implementation, or a variable.
- A type has values. An ADT is a collection of actions on an object (a type).
:::
::::::::::::::::::::::::::::::


:::::::::: question ::::::::::
A tool for measuring the efficiency of an algorithm or problem is:

- [x] Algorithm analysis
- [ ] The system clock
- [ ] A profiler
- [ ] Empirical analysis

::: hints
- A profiler works on a program, not an algorithm.
- The system clock works on a program, not an algorithm.
- Empirical analysis works on a program, not an algorithm.
- Algorithm analysis estimates the cost of an algorithm or problem.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which is NOT a topic that a this course book focuses on?

- [x] How to design and maintain large programs.
- [ ] The commonly used data structures.
- [ ] Introduce the idea of tradeoffs and reinforce the concept that there are costs and benefits associated with every data structure.
- [ ] How to measure the effectiveness of a data structure or algorithm.

::: hints
- A key topic for any DSA course is the basic toolkit of data structures and algorithms.
- A key concept for any DSA course is the concept of tradeoffs for costs versus benefits.
- A key skill for any DSA course is ability to measure the effectiveness of a data structure or algorithm.
- Designing and maintaining large programs is a focus for Software Engineering.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
As computers have become more powerful:

- [x] We have used that additional computing power to tackle more complex problems.
- [ ] The need for good algorithms has become less because processor speed can make up for a slow algorithm.
- [ ] The algorithms have become easier to understand.
- [ ] We are better able to use our everyday intuition to solve problems.

::: hints
- Good solutions for large, complex computational problems usually require different approaches than what we do in everyday life.
- As problems that we try to solve grow more complicated, their solutions tend to grow more complicated.
- Processor speed cannot grow as fast as the cost of a slower algorithm applied to a bigger problem.
- As our computers have become more powerful, our history has been to apply them to more complex problems.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of these is more a concern for Software Engineering than for a data structures course?

- [x] To design an algorithm that is easy to understand, code, and debug.
- [ ] To design an algorithm that makes efficient use of the computer's resources.

::: hints
- Designing efficient programs is a focus for data structures and algorithms courses.
- Designing and maintaining large programs is a focus for Software Engineering.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of these is NOT one of the three standard steps to follow when selecting a data structure to solve a problem?

- [x] Run simulations to quantify the expected running time of the program.
- [ ] Analyze your problem to determine the basic operations that must be supported.
- [ ] Quantify the resource constraints for each operation.
- [ ] Select the data structure that best meets the requirements determined in the prior steps of the process.

::: hints
- Knowing the basic operations required to solve your problem is the first step to selecting a suitable data structure.
- Knowing the resource constraints for your problem's basic operations is the second step to selecting a suitable data structure.
- Once you know the basic operations and their resource constraints, then you can select a data structure that matches.
- Many problems do not require that you run simulations to determine the expected times for alternative solutions.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
