
## Case study: Analysing dynamic arrays {#analysing-dynamic-arrays}

Dynamic arrays were discussed in @sec:dynamic-arrays, and is a data structure that behaves just like a normal array,
but where size may change over time.
A dynamic array has a underlying *backing array* which is a normal fixed-size array.
When the backing array becomes full it resizes to a larger fixed-size array.

In section @sec:dynamic-arrays we alreay showed that the key insight is to not increase the size by a constant,
but instead *multiply* with some factor.
If we do this, then the amortised complexity of appending an element to the array is constant, $O(1)$.
In this section we will use the accounting method to show the same thing.

The main operation of interest is *append*, which increases the size of the dynamic array by one.
All other operations (that is, getting and setting values at a certain index)
are directly mapped to the backing array, and therefore we can assume that they are constant time.

### Doubling the array size

When we append to the array, there are two possibilities:

- In most cases the backing array is not full, and then the only thing we do is to
  increase the *size* variable of the dynamic array.
  Let us assume that this "fast" append takes 1 unit of time.

- Now and then the backing array becomes full and we have to resize,
  and for now we assume that we simply *double* the size.
  If the size of the full backing array is $n$, we will create a new backing array of size $2n$,
  and then copy all $n$ elements over from the old to the new array.
  The main cost is to copy the elements, so a "slow" append costs $n$ time units.

To pay for the slow appends, we pretend that the every fast append will cost 3 time units instead of one.
One unit is used for the actual time it takes, and the additional 2 units are saved in our account.
So, after performing $n$ fast appends our account contains $2n$ time units.

Now, assume that we start with a dynamic array of size $n$, and an empty account.
Since the account is empty, our last append operation cannot have been a fast one.
Therefore the backing array must have been newly resized to size $2n$, and it is populated with $n$ elements.
This means that we can perform $n$ fast appends until we need to resize it again.
So, when it is time to resize we have $2n$ time units in our account, and a backing array of size $2n$.
Now it's time to resize the backing array again:
we have to copy all our $2n$ elements, but this is exactly what we have in our account!
So the amortised cost of resizing is constant, because we used our savings for this.
After the resize we have a half-full array and an empty account, again.

The important things to note are that we never get a negative amount in our account,
and that we can always use our savings to resize the backing array.

### Resizing by any constant factor

What if we don't double the size of the backing array,
but instead multiply with another constant factor $k>1$?
This means that if the backing array has size $n$, it will be resized to size $kn$.

The argument above still holds, but the pretended cost for the fast append should be $1+\frac{k}{k-1}$ instead of 3.
This means that every fast append will save $\frac{k}{k-1}$ time units in our account.
After appending $(k-1)n$ elements, the backing array is full again,
and then our account contains $(k-1)n\cdot\frac{k}{k-1} = kn$ time units.
This is exactly what we need to pay for the resize.
