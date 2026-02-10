
## Case study: Analysing dynamic arrays {#analysing-dynamic-arrays}

Dynamic arrays, as discussed in @sec:dynamic-arrays, are a flexible data structure that efficiently manages collections of elements whose size may change over time.
Unlike fixed-size arrays, dynamic arrays automatically resize themselves to accommodate additional elements, making them especially useful when the total number of elements is not known in advance.

In this case study, we will analyse the time and memory complexity of dynamic arrays, with a particular focus on the operation of adding an element. This operation is central to understanding dynamic arrays because:

- Retrieving an element by index is identical to regular arrays and operates in constant time.
- Removing an element involves similar considerations as inserting, particularly regarding shifting elements, so we will not cover it separately here.

#### Complexity of adding an element to a dynamic array

Let us first consider adding an element at the end of a dynamic array.
In most cases, this operation is efficient, as it simply places the new element in the next available position in the internal array and takes constant time.
However, when the array is full, it must resize itself to accommodate the new element.
This resizing involves allocating a new array, typically twice the size of the original, copying all existing elements to this new array, and then inserting the new element.
This step is more expensive and takes linear time in the number of elements.
The amortised time complexity of appending arises from this pattern: although individual operations may occasionally be costly, the overall cost of performing many appends remains low, averaging out to constant time per operation.

To illustrate this, consider a dynamic array that starts with a capacity of 1. When you append the first element, it fits perfectly.
The next time you append, the array is full, so it resizes to a capacity of 2, copying the existing element.
The next append fills this new capacity, leading to another resize to 4, and so on.
Each time the array resizes, it doubles its capacity and copies all existing elements to the new array.
This means that the number of elements copied during a resize operation grows as follows:

- 1 element copied when resizing from 1 to 2,
- 2 elements copied when resizing from 2 to 4,
- 4 elements copied when resizing from 4 to 8,
- and so on.

The total number of elements copied during all these resizes can be summed up as follows:

$$
1 + 2 + 4 + \ldots + n = 2n - 1
$$

where $n$ is the final size of the array.
This means that the total cost of copying elements during all resizes is proportional to the final size of the array $n$.
So, while a single append operation may take linear time due to resizing, the average time per append operation across many appends is _constant_.
This is because the expensive operations (the resizes) are infrequent compared to the many inexpensive appends that do not require resizing.
Thus, the *amortised time complexity* for appending an element to a dynamic array is $O(1)$, meaning that on average, each append operation takes constant time.

The above analysis assumes that we add an element at the end of the dynamic array.
If we consider adding an element at the beginning or in the middle of the array, the situation changes significantly.
In these cases, the dynamic array must shift existing elements to make space for the new element.
This shifting operation takes linear time in the number of elements, as each element must be moved one position to the right.
Therefore, inserting an element at the beginning or in the middle of a dynamic array has a time complexity of $O(n)$, where $n$ is the number of elements in the array.
This is an important point to consider when choosing a data structure for a specific use case.

#### Memory complexity of dynamic arrays

The memory complexity of dynamic arrays is also an important aspect to consider.
When a dynamic array resizes, it typically allocates a new array that is _larger_ than the current one.
The memory used by a dynamic array is proportional to its capacity, not just the number of elements it currently holds.
Thus, the memory complexity of a dynamic array is $O(n)$, where $n$ is the current number of elements in the array.
This can lead to situations where the dynamic array uses more memory than strictly necessary.

