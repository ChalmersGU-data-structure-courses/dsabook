
## Multiple parameters

::: TODO
- Prio 1: use graphs as example
- Prio 2: add definitions
- Prio 2: more examples
- Prio 3: discuss different definitions and how they differ
:::

Sometimes the proper analysis for an algorithm requires multiple
parameters to describe the cost. To illustrate the concept,
recall the example about friendship links from @sec:space-complexity-of-data-structures.
We argued that it was better to store the links as an array of lists,
than to use an $n\times n$ matrix to store who is friend with who.
We concluded that if we use the former representation the space usage is linear, $O(n)$,
in the number of people and not quadratic.
But to be able to draw this conclusion we have to assume that
the number of friends that any person has is bounded by a constant.

But what if we want to be more precise than that?
What if we know that no person has more than $m$ friends?
So we know that we have $n$ people, and they have at most $m$ friends each.
What is the space complexity of storing the friendships as an $n\times n$ matrix,
compared to storing them as an array of lists?
The size of the matrix does not depend on the number of links at all
-- it only depends on the number of people, so it is $O(n^2)$.
But the size of the array of lists both depend on the number of people (which is the size of the array),
and the number of friends (which is bounded by $m$).
So the space usage of the array of lists representation is $O(n\cdot m)$,
because it is linear in both $n$ and $m$.

Friendship links is an example of a *graph*, and you will learn a lot more about them in [Chapter @sec:graphs].

::: example
#### Example: Testing if two people are friends

What is the time complexity of testing if two given persons are friends with each other?
That depends on the representation.

Matrix representation

:   We have a $n\times n$ boolean matrix $F$ such that $F[i,j]$ is true if person $i$ is friend with person $j$.
    But $i$ and $j$ are *array indices* and not persons, so we also need an array $P$ of strings where we can
    look up persons $a$ and $b$ and find their indices $i$ and $j$ (so that $a=P[i]$ and $b=P[j]$).
    If this array is sorted we can use binary search.

    Now, to test if $a$ and $b$ are friends, we have to find their indices $i$ and $j$ and then just test $F[i,j]$.
    Finding the indices is logarithmic in the number of people, and testing is constant.
    So the complexity is $O(\log(n))$, regardless of the average number of friends.

Array of lists

:   Now we have a size $n$ array $F'$ such that $F'[i]$ is a list of the people that person $i$ is friends with.
    We still need the array $P$ for looking up the index of a person.

    To test if $a$ and $b$ are friends, we find the index $i$ of person $a$, which is logarithmic in $n$.
    Then we traverse the list $F'[i]$ and compare each element with $b$,
    and this is linear in the number of friends per person, $m$.
    So the complexity of testing friendship is $O(m\cdot\log(n))$.
:::

::: example
#### Example: Pixel values in a picture

Consider an algorithm to compute the rank ordering for counts of all pixel values in
a picture. Pictures are often represented by a two-dimensional array,
and a pixel is one cell in the array. The value of a pixel is either the
code value for the colour, or a value for the intensity of the picture at
that pixel. Assume that each pixel can take any integer value in the
range 0 to $c-1$. The problem is to find the number of pixels of each
colour value and then sort the colour values with respect to the number of
times each value appears in the picture. Assume that the picture is a
rectangle with $p$ pixels. A pseudocode algorithm to solve the problem
follows.


    for i in 0 .. c-1:    // Initialise the counts.
        count[i] = 0
    for i in 0 .. p-1:    // Increment the colour value count for each pixel.
        count[value(i)] = count[value(i)]+1
    sort(count)           // Sort the pixel value counts.

In this example, `count` is an array of size $c$ that stores the number of pixels for each colour value.
The function `value` returns the colour value for a pixel $i$.

The time for the first `for`-loop (which initialises `count`) is linear in the number of colours, $O(c)$.
The time for the second loop (which determines the number of pixels with each colour) is $O(p)$.
The time for the final line, the call to `sort`, depends on the cost of the sorting algorithm used.
If we assume that we use a linearithmic algorithm such as Mergesort, it costs $O(c\log(c))$.

So the final complexity of pseudocode depends on both $p$ and $c$, and can be written as $p + c\log(c)$.
Which takes the longest time -- the linear part (incrementing the colour values), or the linearithmic part (sorting)?
This depends on the size of the image ($p$), compared to the range of colour values ($c$).
For example, a normal GIF-image has $c=256$ possible colours, and perhaps $1000\times 1000$ pixels.
So $p$ is in the order of a million, which is much larger than $c\log(c)$, so in this case the $O(p)$ part will dominate.

On the other hand, a high-definition image can have $2^16$ values for red, green and blue, which gives $c=(2^16)^3$.
Even it has a very high resolution of say $100,000\times 50,000$ (that is, $p\approx (2^16)^2$),
then $c$ will still be much larger than $p$.
So for a high-resolution, high-definition image, the time for sorting, $O(c\log c)$ will dominate.

Therefore, neither variable should be ignored in the complexity analysis of the algorithm.
:::
