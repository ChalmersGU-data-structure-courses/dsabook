
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

:   Now we have an array $F'$ of size $n$, which in turn maps to a list of people.
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
range 0 to $C - 1$. The problem is to find the number of pixels of each
colour value and then sort the colour values with respect to the number of
times each value appears in the picture. Assume that the picture is a
rectangle with $P$ pixels. A pseudocode algorithm to solve the problem
follows.

    // Initialise the counts:
    for i in 0 .. C-1:
        count[i] = 0
    // Increment the pixel value count for each of the pixels:
    for i in 0 .. P-1:
        count[value(i)] = count[value(i)]+1
    // Sort the pixel value counts:
    sort(count)

In this example, `count` is an array of size `C` that stores the number
of pixels for each colour value. Function `value(i)` returns the colour
value for pixel $i$.

The time for the first `for` loop (which initialises `count`) is based
on the number of colours, $C$. The time for the second loop (which
determines the number of pixels with each colour) is $O(P)$. The
time for the final line, the call to `sort`, depends on the cost of the
sorting algorithm used. We will assume that the sorting algorithm has
cost $O(P \log(P))$ if $P$ items are sorted, thus yielding
$O(P \log(P))$ as the total algorithm cost.

Is this a good representation for the cost of this algorithm? What is
actually being sorted? It is not the pixels, but rather the colours. What
if $C$ is much smaller than $P$? Then the estimate of $O(P \log(P))$
is pessimistic, because much fewer than $P$ items are being sorted.
Instead, we should use $P$ as our analysis variable for steps that look
at each pixel, and $C$ as our analysis variable for steps that look at
colours. Then we get $O(C)$ for the initialisation loop, $O(P)$
for the pixel count loop, and $O(C \log(C))$ for the sorting
operation. This yields a total cost of $O(P + C \log(C))$.

Why can we not simply use the value of $C$ for input size and say that
the cost of the algorithm is $O(C \log(C))$? Because, $C$ is
typically much less than $P$. For example, a picture might have 1000
$\times$ 1000 pixels and a range of 256 possible colours. So, $P$ is one
million, which is much larger than $C \log(C)$. But, if $P$ is smaller,
or $C$ larger (even if it is still less than $P$), then $C \log(C)$ can
become the larger quantity. Thus, neither variable should be ignored.
:::
