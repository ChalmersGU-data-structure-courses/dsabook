
## Space bounds

::: TODO
- Prio 2: add an example where two different solutions have different space complexities
- Prio 2: Binsort example:
    - make an Example just as Arrays and Friendship links?
:::

Besides time, space is the other computing resource that is commonly of
concern to programmers. Just as computers have become much faster over
the years, they have also received greater allotments of memory. Even
so, the amount of available disk space or main memory can be significant
constraints for algorithm designers.

The analysis techniques used to measure space requirements are similar
to those used to measure time requirements. However, while time
requirements are normally measured for an algorithm that manipulates a
particular data structure, space requirements are normally determined
for the data structure itself. The concepts of asymptotic analysis for
growth rates on input size apply completely to measuring space
requirements.

### Space complexity of data structures

Time complexity helps us to abstract away from hardware-specific details, constant factors and lower-order terms, so that we can focus on what has the most impact for large inputs.
In the same way we want to abstract away from the actual memory usage in bytes, and instead focus on how the memory used by a data structure depends on the data size.

::: example
#### Example: Arrays and linked lists

What are the space requirements for an array of $n$ integers?
If each integer requires $k$ bytes, then the array requires $kn$ bytes, which is in $O(n)$.

What are the space requirements for a linked list of $n$ integers?
Each linked node requires $k$ bytes for the integer, plus (say) $k$ additional bytes for the pointer to the next node.
Therefore the linked list requires $2kn$ bytes, which is also in $O(n)$.
:::

A data structure's primary purpose is to store data in a way that
allows efficient access to those data. To provide efficient access, it
may be necessary to store additional information about where the data
are within the data structure. For example, each node of a linked list
must store a pointer to the next value on the list. All such information
stored in addition to the actual data values is referred to as
[overhead]{.term}. Ideally, overhead should be
kept to a minimum while allowing maximum access. The need to maintain a
balance between these opposing goals is what makes the study of data
structures so interesting.

:::::: latex
\booklink{Read the rest online}{7.1}{sec:space-complexity-of-data-structures}
::::::

:::::: online

::: example
#### Example: Integers

How much memory does an integer use?
This might sound like a stupid question -- don't we usually just assume that integers use a fixed size, such as 32 bits or 64 bits?

Yes and no -- most programming languages have fixed-size integers, and then their space usage is constant, $O(1)$.
But fixed-size integers are actually just an approximation of integers.
A 64-bit integer can only store values in the range $-2^{63}$ to $2^{63}$, and although this is enough for most purposes there are cases when we need to calculate integers of arbitrary size.
Most modern languages have a special datatype for arbitrary-size integers (e.g., Javascript has BigInt and Java has BigInteger), while languages such as Python even has arbitrary-size integers as the default numeric type.

So, how much memory does in arbitrary-size integer use?
Normally they need a number of bytes that is proportional to the number of bits in the binary representation.
The space usage is therefore $O(n)$, where $n$ is the length of the binary representation.

But what is the space usage in terms of the integer itself?
This boils down to the question how many bits are there in the binary representation of a number.
Since you can store $2^n$ different integers in $n$ bits, we need a logarithmic number of bits to store an arbitrary integer.
Therefore the space usage of an integer is logarithmic, $O(\log N)$ to store an integer $N$.
:::

And finally a more complex example, about friendship:

::: example
#### Example: Friendship links

Imagine that we want to keep track of friendships between $n$ people.
We can do this with a 2-dimensional array of size $n \times n$ (a matrix).
Each row of the matrix represents the friends of an individual, with the columns indicating who has that individual as a friend.
For example, if person $j$ is a friend of person $i$, then we place a mark in column $j$ of row $i$ in the array.
Likewise, we should also place a mark in column $i$ of row $j$ if we assume that friendship works both ways.
For $n$ people, the total size of the matrix is in $O(n^2)$.

But is this the best representation of friendship links?
Assume that $n$ grows large, and we want to include every person in Sweden (which has around $10M$ people).
Then the matrix will have around $(10^7)^2 = 10^{14}$ cells.
How many friends will an average person have?
This varies of course, but it's extremely unlikely that they have more than say 100 friends.
So the total number of friendship links should be at most around $10M\times 100 = 10^9$, which is several orders of magnitudes less than the size of the matrix.
So is there a better representation?

Instead of storing a $n\times n$ matrix, we can store an array of size $n$ with pointers to lists of numbers.
Now, if array cell $j$ points to a list containing $i$, then person $j$ is a friend of person $i$.
How many friends does a person have, on average?
Of course we cannot know that, but it sounds reasonable that the average number of friends does not depend on the size of the dataset.
That it doesn't depend on the size $n$ is just another way of saying that it is bounded by some constant $k$.
Now, our array of friendship lists will consist of one array of size $n$ and $n$ lists of size $k$ (on average).
So, the average space usage will be $O(n) + n\cdot O(k) = O(n) + O(n) = O(n)$.
With this new representation we could reduce the space complexity from quadratic $O(n^2)$ to linear $O(n)$.
:::

This last example discussed two possible implementations of *graphs*, and we will discuss this further in [chapter @sec:graphs].

::::::

### Space complexity of algorithms

We are not only interested in knowing how much memory a data structure will use, but also what the space complexity of an *algorithm* is.
When we analyse space usage of algorithms, we are usually only interested in the *additional* space that the algorithm uses during execution.

Let's say that an algorithm is *in-place* if it only uses constant additional space, $O(1)$.
For example, insertion sort is in-place, because it only allocates a constant number of variables to complete.

::: example
#### Example: Mergesort

How much additional space does mergesort use?
Mergesort is a divide-and-conquer algorithm that calls itself recursively, halving the size of the problem in each call.
The step that uses additional memory is the merging process, where we have to allocate a new array that we can fill with the merged values.

In the first level we have to allocate one array of size $n$.
In the second level we allocate two arrays, each of size $n/2$.
In the third level we allocate $2^2 = 4$ arrays, each of size $n/2^2 = n/4$.
Continuing down we see that in level $k$ we allocate $2^k$ arrays, each of size $n/2^k$.

As you can see, each level uses up an additional $O(n)$ space, because $2^k \cdot n/2^k = n$.
And, since we already know that mergesort continues for $\log n$ levels, we get an additional space usage of $O(n \log n)$.

But it is possible to improve the space usage of mergesort.
Instead of allocating new arrays at each level, we can create one single additional array of size $n$ and then use only that auxilliary array.
To make this work we have to change the implementation somewhat, and this can be done in several ways.
The most common solution is called bottom-up mergesort, and it has an additional space usage of $O(n)$.
:::

:::::: latex
So, mergesort is not an in-place algorithm because it uses at least linear additional space.

\booklink{Read the rest online}{7.1}{sec:space-complexity-of-algorithms}
::::::

:::::: online
So, mergesort is not an in-place algorithm because it uses at least linear additional space.
But what about quicksort, didn't we say that it is in-place?

::: example
#### Example: Quicksort

How much additional space does quicksort use?
Just as mergesort, quicksort is also a divide-and-conquer algorithm, but in this case we cannot be certain that it halves the problem size in each call.
We have already showed that quicksort is quadratic $O(n^2)$ in the worst case (if we are unlucky with the pivot selection).

Now, quicksort is a recursive algorithm, and whenever we make a recursive call the system has to allocate some memory for storing information on what to do when returning from the recursion.
This is done by pushing some memory block (of constant size) onto the *call stack*.
But when quicksort is unlucky and gets quadratic behaviour, it will use a linear number of recursion levels.
Therefore the additional memory usage for quicksort is linear $O(n)$, so it is not in-place.

But let's assume that we have a good pivot selection algorithm (and well-behaved input), so that we get the normal $O(n \log n)$ behaviour.
Quicksort will still allocate memory on the call stack for the recursive calls, and just as mergesort we will never get fewer than $O(\log n)$ recursive levels.
Therefore the additional memory usage for quicksort will be at least logarithmic $O(\log n)$ in the worst case.
:::

The quicksort example shows that perhaps we were too strict when we defined what an *in-place* algorithm is.
A more realistic definition is to say that an algorithm is in-place if it never uses more than $O(\log n)$ additional space.

::::::

### Space/time tradeoff {#space-time-tradeoff}

One important aspect of algorithm design is referred to as the
[space/time tradeoff]{.term} principle. The
space/time tradeoff principle says that one can often achieve a
reduction in time if one is willing to sacrifice space or vice versa.
Many programs can be modified to reduce storage requirements by
"packing" or encoding information. "Unpacking" or decoding the
information requires additional time. Thus, the resulting program uses
less space but runs slower. Conversely, many programs can be modified to
pre-store results or reorganise information to allow faster running time
at the expense of greater storage requirements. Typically, such changes
in time and space are both by a constant factor.


:::::: latex
\booklink{Read the rest online}{7.1}{sec:space-time-tradeoff}
::::::

:::::: online

A classic example of a space/time tradeoff is the
[lookup table]{.term}. A lookup table pre-stores
the value of a function that would otherwise be computed each time it is
needed. For example, 12! is the greatest value for the factorial
function that can be stored in a 32-bit `int` variable. If you are
writing a program that often computes factorials, it is likely to be
much more time efficient to simply pre-compute and store the 12 values
in a table. Whenever the program needs the value of $n!$ it can simply
check the lookup table. (If $n > 12$, the value is too large to store as
an `int` variable anyway.) Compared to the time required to compute
factorials, it may be well worth the small amount of additional space
needed to store the lookup table.

Lookup tables can also store approximations for an expensive function
such as sine or cosine. If you compute this function only for exact
degrees or are willing to approximate the answer with the value for the
nearest degree, then a lookup table storing the computation for exact
degrees can be used instead of repeatedly computing the sine function.
Note that initially building the lookup table requires a certain amount
of time. Your application must use the lookup table often enough to make
this initialisation worthwhile.

::: example
#### Example: Binsort

Another example of the space/time tradeoff is typical of what a
programmer might encounter when trying to optimise space. Here is a
simple code fragment for sorting an array of integers. We assume that
this is a special case where there are $n$ integers whose values are a
permutation of the integers from 0 to $n-1$. This is an example of a [binsort]{.term}.
Binsort assigns each value to an array position corresponding to its value.

    for i in 0 .. A.size-1:
        B[A[i]] = A[i]

This is efficient and requires $O(n)$ time.
However, it also requires two arrays of size $n$, so the additional space usage is $O(n)$.

Next is a code fragment that places the permutation in order but does so within the same array
(thus it is an example of an *in-place* sort).

    for i in 0 .. A.size-1:
        while A[i] != i:
            swap(A, i, A[i])  // Swap element A[i] with A[A[i]]

The function `swap(A,i,j)` exchanges elements `i` and `j` in array `A`. It
may not be obvious that the second code fragment actually sorts the
array. To see that this does work, notice that each pass through the
`for` loop will at least move the integer with value $i$ to its correct
position in the array, and that during this iteration, the value of
`A[i]` must be greater than or equal to $i$. A total of at most $n$
`swap` operations take place, because an integer cannot be moved out of
its correct position once it has been placed there, and each swap
operation places at least one integer in its correct position.
Thus, this code fragment has cost $O(n)$, just as the first fragment.
However, it requires more time to run than the first code fragment.
On an ordinary computer the second version takes nearly twice as long to run as the first,
but it only needs constant additional space (for the `i` variable).
:::

A second principle for the relationship between a program's space and
time requirements applies to programs that process information
[stored on disk](#file-processing){.term}.
Strangely enough, the disk-based space/time tradeoff
principle is almost the reverse of the space/time tradeoff principle for
programs using main memory.

The [disk-based space/time tradeoff]{.term}
principle states that the smaller you can make your disk storage
requirements, the faster your program will run. This is because the time
to read information from disk is enormous compared to computation time,
so almost any amount of additional computation needed to unpack the data
is going to be less than the disk-reading time saved by reducing the
storage requirements. Naturally this principle does not hold true in all
cases, but it is good to keep in mind when designing programs that
process information stored on disk.

::::::
