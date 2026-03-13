
## Comparing values

If we want to sort some things, we have to be able to compare them, to
decide which one is bigger. How do we compare two things? If all that we
wanted to sort or search for was simple integer values, this would not
be an interesting question. We can just use standard comparison
operators like "\<" or "\>". Even if we wanted to sort strings,
most programming languages give us built-in functions for comparing
strings alphabetically. But we do not usually want to sort just
integers or strings in a data structure. Often we want to sort
records, where a record is made up of multiple values, such as a name,
an address, and a phone number. In that case, how can we "compare"
records to decide which one is "smaller"? We cannot just use "\<" to
compare the records! Nearly always in this situation, we are actually
interested in sorting the records based on the values of one particular
field used to represent the record, which itself is something simple
like an integer or a string. This field is referred to as the
[key]{.term} for the record.

Likewise, if we want to search for a given record in a database, how
should we describe what we are looking for? A database record could
simply be a number, or it could be quite complicated, such as a payroll
record with many fields of varying types. We do not want to describe
what we are looking for by detailing and matching the entire contents of
the record. If we knew everything about the record already, we probably
would not need to look for it. Instead, we typically define what record
we want in terms of a key value. For example, if searching for payroll
records, we might wish to search for the record that matches a
particular ID number. In this example the ID number is the
[search key]{.term}.

Finally, it is very often the case that we want to compare *virtual keys*,
that is keys that are not explicitly stored in the record, but calculated on demand.
One simple example is if we want to sort a list of strings *case-insensitively*, ignoring if a letter is uppercase or lowercase.
A more complex example is to sort a list if Unicode strings according to a certain language locale.

### Two main approaches to comparing values

When we compare two elements, there are *three* possible outcomes
-- the first element can be *smaller*, or *larger*, or *equal to*, the second element.

Most programming languages does not have any atomic datatype with three values,
so different languages have implemented different solutions to how to compare values.
There are two main approaches in how a programming language have solved the comparison problem:

The Python way
:   In Python, each comparison operator (<, >, =, ...) is implemented separately.
    This means that you can write $a<b$, $a=b$, $a>b$, etc., in a way that you are used to think about comparison.
    The disadvantage is that sometimes you have to perform *two* comparisons between two values:
    first you have to check if $a<b$, and then if $a=b$.
    Depending on how your elements are structured, this can lead to some duplicate work
    (although Python is quite good at optimising the code so that there will be no penalty).

The Java way
:   In Java, there is one comparison operator, `compare` (or `compareTo`), which returns an integer $k$.
    If $k<0$ then $a<b$, if $k>0$ then $a>b$, and if $k=0$ then $a=b$.
    The main advantage with this approach is that you do not risk duplicating work,
    but on the other hand the can code become slightly less readable.

In this book we will usually use the Python way when describing algorithms.
Not because we think that is a better way of writing algorithms, but because the pseudocode becomes easier to read.

### Natural vs key-based comparison

As we already mentioned in the chapter introduction,
we will usually just assume that you want to use the natural order when comparing objects.
However, in real life it is much more common that you need to compare values by their keys.

Modern high-level languages (including Python and Java) have several different ways to accomplish key-based comparison,
and we encourage you to find out how this is done in your favourite language.
It can be done via special methods on objects, or by special classes,
or by supplying a *key function*, or several other ways.
