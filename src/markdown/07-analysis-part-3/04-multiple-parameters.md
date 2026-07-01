
## Multiple parameters {#analysis-3:multiple-parameters}

::: TODO
- Prio 1: shorten examples
- Prio 2: add definitions
- Prio 2: more examples (only in a separate online section)
- Prio 3: discuss different definitions and how they differ (only in separate online section)
:::

<!-- OPENDSA: START -->
Imagine that we want to keep track of friendships between $n$ people.
We can do this with a 2-dimensional array of size $n \times n$ (a matrix).
Each row of the matrix represents the friends of an individual, with the columns indicating who has that individual as a friend.
For example, if person $j$ is a friend of person $i$, then we place a mark in column $j$ of row $i$ in the array.
Likewise, we should also place a mark in column $i$ of row $j$ if we assume that friendship works both ways.
For $n$ people, the total size of the matrix is in $O(n^2)$.
<!-- OPENDSA: END -->

But is this the best representation of friendship links?
Assume that $n$ grows large, and we want to include every person in Sweden (which has around 10 million people).
Then the matrix will have around $(10^7)^2 = 10^{14}$ cells.
Instead of storing a $n\times n$ matrix, we can store an array of size $n$ with pointers to lists of numbers.
Now, if array cell $j$ points to a list containing $i$, then person $j$ is a friend of person $i$.
What is the total size of this data structure alltogether, in big-$O$ notation?

This depends on how many friends people have, but let's say that every person has $m$ friends on average.
We don't know what $m$ is, but we can be quite certain that it is a lot smaller than $n$.
So, what can we say about the space complexity of this new data structure?
One the one hand, the array contains $n$ elements so the size is $O(n)$,
but on the other hand, each list uses on average $O(m)$ memory.

We can of course assume that $m$ is bounded, for example that it is at most 100 --
then we can say that $m$ is constant and then we get $O(n)$ for the whole data structure.
But this is cheating, because we cannot know how $m$ changes when $n$ grows.
The big-$O$ notation can used for multiple parameters at the same time,
so we can write the space complexity of the new array-of-lists representation as $O(n\times m)$
because it is linear in both $n$ and $m$.

Now, what is the time complexity of testing if two given persons are friends with each other?
That depends on the representation.

Matrix representation

:   We have a $n\times n$ boolean matrix $F$ such that $F[i,j]$ is true if person $i$ is friend with person $j$.
    But $i$ and $j$ are *array indices* and not persons, so we also need an array $P$ of strings where we can
    look up persons $a$ and $b$ and find their indices $i$ and $j$ (so that $a=P[i]$ and $b=P[j]$).
    If this array is sorted we can use binary search.

    To test if $a$ and $b$ are friends, we have to find their indices $i$ and $j$ and then just lookup $F[i,j]$.
    Finding the indices is logarithmic in the number of people, and testing is constant.
    So the complexity is $O(\log(n))$, which is indepedent of the number of friends per person, $m$.

    `\newpage`{=latex}

Array of lists

:   Now we have a size $n$ array $F'$ such that $F'[i]$ is a list of the people that person $i$ is friends with.
    We still need the array $P$ for looking up the index of a person.

    To test if $a$ and $b$ are friends, we find the index $i$ of person $a$, which is logarithmic in $n$.
    Then we do a linear search for $b$ in the list $F'[i]$,
    which we all know is linear in the number of friends per person, $m$.
    So the complexity of testing friendship is $O(m\cdot\log(n))$.


::: example
#### Example: Pixel values in a picture

<!-- OPENDSA: START -->
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
<!-- OPENDSA: END -->


    for i in 0 .. c-1:        // Initialise the counts.
        count[i] = 0
    for i in 0 .. p-1:        // Increment the colour value count for each pixel.
        count[value(i)] += 1
    sort(count)               // Sort the pixel value counts.

<!-- OPENDSA: START -->
In this example, `count` is an array of size $c$ that stores the number of pixels for each colour value.
The function `value` returns the colour value for a pixel $i$.
The time for the first `for`-loop (which initialises `count`) is linear in the number of colours, $O(c)$.
The time for the second loop (which determines the number of pixels with each colour) is $O(p)$.
The time for the final line, the call to `sort`, depends on the cost of the sorting algorithm used.
<!-- OPENDSA: END -->
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
