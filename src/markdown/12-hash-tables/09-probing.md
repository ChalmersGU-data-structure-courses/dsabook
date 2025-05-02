
## Different probing strategies

::: TODO
- Prio 3: examples, tests
:::

### The problem with linear probing

While linear probing is probably the first idea that comes to mind when
considering collision resolution policies, it is not the only one
possible. Probe function **p** allows us many options for how to do
collision resolution. In fact, linear probing is one of the worst
collision resolution methods.

::: dsvis
The main problem is illustrated by the next slideshow.

<inlineav id="linProbeCON2" src="Hashing/linProbeCON2.js" name="Linear Probing Slideshow 2" links="Hashing/linProbeCON.css"/>
:::

Again, the ideal behavior for a collision resolution mechanism is that
each empty slot in the table will have equal probability of receiving
the next record inserted (assuming that every slot in the table has
equal probability of being hashed to initially). This tendency of linear
probing to cluster items together is known as
[primary clustering]{.term}. Small clusters tend
to merge into big clusters, making the problem worse.

The problem with primary clustering is that it leads to long probe
sequences, which increases execution time. However, linear probing is
still a very common probing method, because it is so simple and can be
implemented efficiently.

::: dsvis
TODO

<avembed id="HashLinearPPRO" src="Hashing/HashLinearPPRO.html" type="ka" name="Linear Probing Proficiency Exercise"/>
:::


### Linear probing by steps

How can we avoid primary clustering? One possible improvement might be
to use linear probing, but to skip slots by some constant $c$ other
than 1. This would make the probe function $\textbf{p}(K, i) = ci$, and
so the $i$ th slot in the probe sequence will be
$(\textbf{h}(K) + ic) \mod M$. In this way, records with adjacent home
positions will not follow the same probe sequence.

::: dsvis
TODO

<inlineav id="collisionCON1" src="Hashing/collisionCON1.js" name="Linear Probing By Steps Slideshow 1" links="Hashing/collisionCON.css"/>
:::

One quality of a good probe sequence is that it will cycle through all
slots in the hash table before returning to the home position. Clearly
linear probing (which "skips" slots by one each time) does this.
Unfortunately, not all values for $c$ will make this happen. For
example, if $c = 2$ and the table contains an even number of slots, then
any key whose home position is in an even slot will have a probe
sequence that cycles through only the even slots. Likewise, the probe
sequence for a key whose home position is in an odd slot will cycle
through the odd slots. Thus, this combination of table size and linear
probing constant effectively divides the records into two sets stored in
two disjoint sections of the hash table. So long as both sections of the
table contain the same number of records, this is not really important.
However, just from chance it is likely that one section will become
fuller than the other, leading to more collisions and poorer performance
for those records. The other section would have fewer records, and thus
better performance. But the overall system performance will be degraded,
as the additional cost to the side that is more full outweighs the
improved performance of the less-full side.

Constant $c$ must be relatively prime to $M$ to generate a linear
probing sequence that visits all slots in the table (that is, $c$ and
$M$ must share no factors). For a hash table of size $M = 10$, if $c$ is
any one of 1, 3, 7, or 9, then the probe sequence will visit all slots
for any key. When $M = 11$, any value for $c$ between 1 and 10 generates
a probe sequence that visits all slots for every key.

::: dsvis
TODO

<inlineav id="collisionCON2" src="Hashing/collisionCON2.js" name="Linear Probing By Steps Slideshow 2" links="Hashing/collisionCON.css"/>
:::

::: dsvis
Now you can practice linear probing by different step sizes.

<avembed id="HashLinearStepPPRO" src="Hashing/HashLinearStepPPRO.html" type="ka" name="Linear Probing By Steps Proficiency Exercise"/>
:::

### Pseudo-random probing

Consider the situation where $c = 2$ and we wish to insert a record with
key $k_1$ such that $\textbf{h}(k_1) = 3$. The probe sequence for $k_1$
is 3, 5, 7, 9, and so on. If another key $k_2$ has home position at slot
5, then its probe sequence will be 5, 7, 9, and so on. The probe
sequences of $k_1$ and $k_2$ are linked together in a manner that
contributes to clustering. In other words, linear probing with a value
of $c > 1$ does not solve the problem of primary clustering. We would
like to find a probe function that does not link keys together in this
way. We would prefer that the probe sequence for $k_1$ after the first
step on the sequence should not be identical to the probe sequence of
$k_2$. Instead, their probe sequences should diverge.

The ideal probe function would select the next position on the probe
sequence at random from among the unvisited slots; that is, the probe
sequence should be a random permutation of the hash table positions.
Unfortunately, we cannot actually select the next position in the probe
sequence at random, because we would not be able to duplicate this same
probe sequence when searching for the key. However, we can do something
similar called [pseudo-random probing]{.term}.
In pseudo-random probing, the $i$ th slot in the probe sequence is
$(\textbf{h}(K) + r_i) \mod M$ where $r_i$ is the $i$ th value in a
random permutation of the numbers from 1 to $M-1$. All inserts and
searches must use the same sequence of random numbers. The probe
function would be $\textbf{p}(K, i) = \textbf{Permutation}[i]$ where
**Permutation** is an array of length $M$ that stores a value of 0 in
position **Permutation\[0\]**, and stores a random permutation of the
values from 1 to $M - 1$ in slots 1 to $M - 1$.

::: dsvis
TODO

<inlineav id="collisionCON3" src="Hashing/collisionCON3.js" name="Pseudo-Random Probing Slideshow" links="Hashing/collisionCON.css"/>
:::

::: dsvis
Here is a practice exercise for pseudo-random probing.

<avembed id="HashPseudoRandomPPRO" src="Hashing/HashPseudoRandomPPRO.html" type="ka" name="Pseudo-Random Probing Proficiency Exercise"/>
:::

::: dsvis
Pseudo-random probing exhibits another desirable feature in a hash
function.

<inlineav id="collisionCON4" src="Hashing/collisionCON4.js" name="Avoiding the Train" links="Hashing/collisionCON.css"/>
:::

### Quadratic probing

Another probe function that eliminates primary clustering is called
[quadratic probing]{.term}. Here the probe
function is some quadratic function
$\textbf{p}(K, i) = c_1 i^2 + c_{2}i + c_3$ for some choice of constants
$c_1$, $c_2$, and $c_3$.

The simplest variation is $\textbf{p}(K, i) = i^2$ (i.e., $c_1 = 1$,
$c_2 = 0$, and $c_3 = 0$). Then the $i$ th value in the probe sequence
would be $(\textbf{h}(K) + i^2) \mod M$.

::: dsvis
TODO

<inlineav id="collisionCON5" src="Hashing/collisionCON5.js" name="Quadratic Probing Slideshow" links="Hashing/collisionCON.css"/>
:::

::: dsvis
Now you can practice quadratic probing.

<avembed id="HashQuadraticPPRO" src="Hashing/HashQuadraticPPRO.html" type="ka" name="Quadratic Probing Proficiency Exercise"/>
:::

There is one problem with quadratic probing: Its probe sequence
typically will not visit all slots in the hash table.

::: dsvis
TODO

<inlineav id="collisionCON6" src="Hashing/collisionCON6.js" name="Quadratic Probing Problem" links="Hashing/collisionCON.css"/>
:::

For many hash table sizes, this probe function will cycle through a
relatively small number of slots. If all slots on that cycle happen to
be full, this means that the record cannot be inserted at all! A more
realistic example is a table with 105 slots. The probe sequence starting
from any given slot will only visit 23 other slots in the table. If all
24 of these slots should happen to be full, even if other slots in the
table are empty, then the record cannot be inserted because the probe
sequence will continually hit only those same 24 slots.

Fortunately, it is possible to get good results from quadratic probing
at low cost. The right combination of probe function and table size will
visit many slots in the table. In particular, if the hash table size is
a prime number and the probe function is $\textbf{p}(K, i) = i^2$, then
at least half the slots in the table will be visited. Thus, if the table
is less than half full, we can be certain that a free slot will be
found. Alternatively, if the hash table size is a power of two and the
probe function is $\textbf{p}(K, i) = (i^2 + i)/2$, then every slot in
the table will be visited by the probe function.

### Double hashing

Both pseudo-random probing and quadratic probing eliminate primary
clustering, which is the name given to the the situation when keys share
substantial segments of a probe sequence. If two keys hash to the same
home position, however, then they will always follow the same probe
sequence for every collision resolution method that we have seen so far.
The probe sequences generated by pseudo-random and quadratic probing
(for example) are entirely a function of the home position, not the
original key value. This is because function **p** ignores its input
parameter $K$ for these collision resolution methods. If the hash
function generates a cluster at a particular home position, then the
cluster remains under pseudo-random and quadratic probing. This problem
is called [secondary clustering]{.term}.

To avoid secondary clustering, we need to have the probe sequence make
use of the original key value in its decision-making process. A simple
technique for doing this is to return to linear probing by a constant
step size for the probe function, but to have that constant be
determined by a second hash function, $\textbf{h}_2$. Thus, the probe
sequence would be of the form $\textbf{p}(K, i) = i * \textbf{h}_2(K)$.
This method is called [double hashing]{.term}.

There are important restrictions on $h_2$. Most importantly, the value
returned by $h_2$ must never be zero (or $M$) because that will
immediately lead to an infinite loop as the probe sequence makes no
progress. However, a good implementation of double hashing should also
ensure that all of the probe sequence constants are relatively prime to
the table size $M$. For example, if the hash table size were 100 and the
step size for linear probing (as generated by function $h_2$) were 50,
then there would be only one slot on the probe sequence. If instead the
hash table size is 101 (a prime number), than any step size less than
101 will visit every slot in the table.

This can be achieved easily. One way is to select $M$ to be a prime
number, and have $\textbf{h}_2$ return a value in the range
$1 <= \textbf{h}_2(k) <= M - 1$. We can do this by using this secondary
hash function: $\textbf{h}_2(k) = 1 + (k \mod (M-1))$. An alternative is
to set $M = 2^m$ for some value $m$ and have $\textbf{h}_2$ return an
odd value between 1 and $2^m$. We can get that result with this
secondary hash function:
$\textbf{h}_2(k) = (((k/M) \mod (M/2)) * 2) + 1$.

::: note
*Note*: The secondary hash function
$\textbf{h}_2(k) = (((k/M) \mod (M/2)) * 2) + 1$ might seem rather
mysterious, so let's break this down. This is being used in the
context of two facts: (1) We want the function to return an odd
value that is less than $M$ the hash table size, and (2) we are
using a hash table of size $M = 2^m$, which means that taking the
mod of size $M$ is using the bottom $m$ bits of the key value. OK,
since $\textbf{h}_2$ is multiplying something by 2 and adding 1, we
guarentee that it is an odd number. Now, $((X \mod (M/2)) * 2) + 1$
must be in the range 1 and $M-1$ (if you need to, play around with
this on paper to convince yourself that this is true). This is
exactly what we want. The last piece of the puzzle is the first part
$k/M$. That is not strictly necessary. But remember that since the
table size is $M = 2^m$, this is the same as shifting the key value
right by $m$ bits. In other words, we are not using the bottom $m$
bits to decide on the second hash function value, which is
especially a good thing if we used the bottom $m$ bits to decide on
the first hash function value! In other words, we really do not want
the value of the step sized used by the linear probing to be fixed
to the slot in the hash table that we chose. So we are using the
next $m$ bits of the key value instead. Note that this would only be
a good idea if we have keys in a large enough key range, that is, we
want plenty of use of those second $m$ bits in the key range. This
will be true if the max key value uses at least $2m$ bits, meaning
that the max key value should be at least the square of the hash
table size. This is not a problem for typical hashing applications.
:::

::: dsvis
TODO

<inlineav id="collisionCON7" src="Hashing/collisionCON7.js" name="Double Hashing Slideshow 2" links="Hashing/collisionCON.css"/>
:::

::: dsvis
TODO

<inlineav id="collisionCON8" src="Hashing/collisionCON8.js" name="Double Hashing Slideshow 3" links="Hashing/collisionCON.css"/>
:::

::: dsvis
Now you can try it.

<avembed id="HashDoublePPRO" src="Hashing/HashDoublePPRO.html" type="ka" name="Double Hashing Proficiency Exercise"/>
:::
