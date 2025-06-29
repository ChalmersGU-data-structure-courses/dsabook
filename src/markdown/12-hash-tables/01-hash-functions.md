
## Hash functions

::: TODO
- Prio 2:
    - definitions, requirements
    - distribution of values, independence of values
    - good vs perfect hash function
    - include all object parts in hash code (but not calculated)
    - not random, but random-like
:::

Hashing generally takes records whose key values come from a large range
and stores those records in a table with a relatively small number of
slots. Collisions occur when two records hash to the same slot in the
table. If we are careful -- or lucky -- when selecting a hash function,
then the actual number of collisions will be few. Unfortunately, even
under the best of circumstances, collisions are nearly unavoidable. To
illustrate, consider a classroom full of students. What is the
probability that some pair of students shares the same birthday (i.e.,
the same day of the year, not necessarily the same year)? If there are
23 students, then the odds are about even that two will share a
birthday. This is despite the fact that there are 365 days in which
students can have birthdays (ignoring leap years). On most days, no
student in the class has a birthday. With more students, the probability
of a shared birthday increases. The mapping of students to days based on
their birthday is similar to assigning records to slots in a table (of
size 365) using the birthday as a hash function. Note that this
observation tells us nothing about *which* students share a birthday, or
on *which* days of the year shared birthdays fall.

::: dsvis
#### Example: Birthday calculator

Try it for yourself. You can use the calculator to see the probability
of a collision. The default values are set to show the number of people
in a room such that the chance of a duplicate is just over 50%. But you
can set any table size and any number of records to determine the
probability of a collision under those conditions.

<avembed id="Birthday" src="Hashing/Birthday.html" type="ss" name="Birthday Problem Calculator" height="177"/>

Now you can use the calculator to answer the following questions.

<avembed id="BirthdayFIB" src="Hashing/BirthdayFIB.html" type="ka" name="Birthday Problem Exercise"/>
:::

To be practical, a database organized by hashing must store records in a
hash table that is not so large that it wastes space. To balance time
and space efficiency, this means that the hash table should be
around half full (see section @sec:analysis-of-hash-tables). Because
collisions are extremely likely to occur under these conditions (by
chance, any record inserted into a table that is half full should have a
collision half of the time), does this mean that we need not worry about
how well a hash function does at avoiding collisions? Absolutely not.
The difference between using a good hash function and a bad hash
function makes a big difference in practice in the number of records
that must be examined when searching or inserting to the table.
Technically, any function that maps all possible key values to a slot in
the hash table is a hash function. In the extreme case, even a function
that maps all records to the same slot in the array is a hash function,
but it does nothing to help us find records during a search operation.

We would like to pick a hash function that maps keys to slots in a way
that makes each slot in the hash table have equal probablility of being
filled for the actual set keys being used. Unfortunately, we normally
have no control over the distribution of key values for the actual
records in a given database or collection. So how well any particular
hash function does depends on the actual distribution of the keys used
within the allowable key range. In some cases, incoming data are well
distributed across their key range. For example, if the input is a set
of random numbers selected uniformly from the key range, any hash
function that assigns the key range so that each slot in the hash table
receives an equal share of the range will likely also distribute the
input records uniformly within the table. However, in many applications
the incoming records are highly clustered or otherwise poorly
distributed. When input records are not well distributed throughout the
key range it can be difficult to devise a hash function that does a good
job of distributing the records throughout the table, especially if the
input distribution is not known in advance.

There are many reasons why data values might be poorly distributed.

1.  Natural frequency distributions tend to follow a common pattern
    where a few of the entities occur frequently while most entities
    occur relatively rarely. For example, consider the populations of
    the 100 largest cities in the United States. If you plot these
    populations on a numberline, most of them will be clustered toward
    the low side, with a few outliers on the high side. This is an
    example of a Zipf distribution. Viewed the other way, the home town
    for a given person is far more likely to be a particular large city
    than a particular small town.
2.  Collected data are likely to be skewed in some way. Field samples
    might be rounded to, say, the nearest 5 (i.e., all numbers end in 5
    or 0).
3.  If the input is a collection of common English words, the beginning
    letter will be poorly distributed.

Note that for items 2 and 3 on this list, either high- or low-order bits
of the key are poorly distributed.

When designing hash functions, we are generally faced with one of two
situations:

1.  We know nothing about the distribution of the incoming keys. In this
    case, we wish to select a hash function that evenly distributes the
    key range across the hash table, while avoiding obvious
    opportunities for clustering such as hash functions that are
    sensitive to the high- or low-order bits of the key value.
2.  We know something about the distribution of the incoming keys. In
    this case, we should use a distribution-dependent hash function that
    avoids assigning clusters of related key values to the same hash
    table slot. For example, if hashing English words, we should *not*
    hash on the value of the first character because this is likely to
    be unevenly distributed.

In the rest of this section, and in section @sec:better-hash-functions, you will see several examples of hash functions that illustrate these points.


### Properties of a hash function

Any hash function $\mathbf{h}$ must respect the following properties:

- it must be *deterministic*: $\mathbf{h}(a)$ must always return the same value for a given $a$, regardless of when it is called
- it must *preserve equality*: if $a$ is equal to $b$, then $\mathbf{h}(a)$ must be equal to $\mathbf{h}(b)$

Furthermore, a *good* hash function should also respect the following:

- *uniform distribution*: $\mathbf{h}$ should map the expected inputs as evenly as possible over the possible output values
- *efficiency*: the hash function should be fast to calculate

::: example
#### Example: The worst hash function

The requirements above tells us that the following is a valid hash function, because is both deterministic and preserves equality:

\begin{eqnarray*}
\mathbf{h}(x) &=& 42
\end{eqnarray*}

However, it's a really bad hash function, because it gives the worst possible distribution.
:::

This means that if you implement a hash table which uses this constant hash function, it will still work.
It will answer all your questions correctly, and insertion and deletion will work just as expected.
But it will be extremely slow -- as slow as if you had used a simple list of values.


### Basic principles of hash functions

Here are some basic principles for creating good (or at least mostly-good-enough) hash functions.


::: TODO
- why not random?
:::

#### Integers, characters and enumerations

Since the value of a hash function should be an integer, it is very easy to just let value be its own hash code, if it's an integer.

\begin{eqnarray*}
\mathbf{h}(x) &=& x
\end{eqnarray*}

This function is clearly deterministic and preserves equality, and it is very efficient too.
But how about the distribution -- is it uniform?

This depends on how the keys are distributed in the data, and this depends on the application we have in mind.
As an example, assume that we only have even-numbered keys in our data -- then only half of all possible hash codes will be used.

A more realistic example is if we want to search for people using their length.
Person lengths are not uniformly distributed, but instead they have a normal distribution.
This means that the hash codes will also be normal distributed, and there will be many collisions for lengths that are closer to the average length.

However, despite the possibly skewed distribution, it is still quite common to use a number as its own hash code.
The reason for this is that it is so simple and efficient to do so.

Note that this simple strategy works for all kinds of atomic values, such as Unicode characters or enumeration types.
All these are anyway encoded as integers internally by the compiler.


#### Floating point numbers

There is an international standard for encoding floating point numbers, called IEEE 754, which almost all modern processors use.
The details of the encoding are not important, what matters to us is that it encodes every floating point number in a fixed number of bytes.

One very easy and common hash function for floating point numbers is to simply use it as it is, but interpret the byte sequence as an integer.
This means that the floating point value 42.0 will *not* have the hash code 42, but instead something completely different.
However, this is not a problem in our case since the only thing we need to know is that it respects the requirements of a hash function.
Just as above, it is clearly both efficient, deterministic and preserves equality, and the distribution is most definitely not worse than the integer distribution.


#### Strings

But how can we handle more complex values, such as strings?
A string is a sequence of characters, of arbitrary length, so how can we calculate a good hash code for a given string?

- How about taking the hash code of the first character in the string?
  No, that's not a good idea because you will get an awful distribution -- all strings starting with "a" will get the same hash code, such as "abacus", "ape", and "aperture".

- So, perhaps we can take the sum of the first, the middle and the last characters?
  That's better but still not very good -- common strings such as "state", "summarise" and "signature" will get the same hash code.

In both these cases the hash function will have a very skewed distribution, and the main reason is that they don't take every single character into account.
So an important rule of thumb is to use every part of a complex object when calculating the hash code.
But how should these hash codes be combined?
One way is to just sum all of them:

    function hashCode(string):
        code = 0
        for each char in string:
            code = code + hashCode(char)
        return code

This is much better than the previous suggestions, but still not very good.
Each character in the string will influence the final hash code, but it does not take their internal order into account.
Therefore all the following strings will get the same hash code:
"alter", "later", and "alert".


#### Horner's method for strings, lists and other sequences

So we want our hash function to take all character in a string into account, but also their position in the string.
One common way is to treat the sequence of characters, $s=c_0c_1\ldots c_n$ as a polynomial over some constant $p$, like this:

\begin{eqnarray*}
\mathbf{h}(c_0c_1c_2\ldots c_n)
&=& c_0 + c_1p + c_2p^2 + c_3p^3 + \cdots + c_np^n
\end{eqnarray*}

This kind of polynomial can be calculated efficiently using *Horner's method*, as a nested multiplication:

\begin{eqnarray*}
\mathbf{h}(c_0c_1c_2\ldots c_n)
&=& c_0 + p\left(c_1 + p\left(c_2 + p\left(c_3 + \cdots + p(c_{n-1} + pc_n)\cdots\right)\right)\right)
\end{eqnarray*}

Which in turn is just a fancier way of writing a simple loop over all characters, and accumulating the hash code:

    function hashCode(string):
        code = 0
        for each char in string:
            code = p*code + hashCode(char)
        return code

To get the best distribution, we should use a not-too-small prime number for $p$.
(The standard hash function for strings in Java is exactly like this, where they use $p=31$.)

Note that Horner's method can be used for all kinds of sequences, such as lists or tuples.


#### Complex values

So how can we handle complex values, such as general datatypes or objects?
E.g., how do we define a hash function for the following datatype for person names:

    datatype Person:
        firstName: String
        middleName: String
        lastName: String

We can use the same strategy as we did for strings -- simply treat the three elements as a sequence and apply Horner's method:

    datatype Person:
        ...
        hashCode():
            code = 0
            for part in (firstName, middleName, lastName):
                code = p*code + part.hashCode()
            return code

However, sometimes we don't want to use all instance variables when calculating the hash code.
Assume that we want to be able to search for just the last name, i.e., to find all persons having the same last name.
Then we can build a hash table of persons, where the hash codes are only calculated from the last names.
If we want to also be able to search for first names, we have to build *another* hash table -- where the hash codes are calculated from the first names.


