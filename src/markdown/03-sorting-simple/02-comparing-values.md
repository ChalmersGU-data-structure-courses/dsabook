
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

When we compare two elements, there are *three* possible outcomes -- the first element can be *smaller*, or *larger*, or *equal to*, the second element.

Most programming languages does not have any atomic datatype with three values, so different languages have implemented different solutions to how to compare values.
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

As we already mentioned in the chapter introduction, we will usually just assume that you want to use the natural order when comparing objects.
However, in real life it is much more common that you need to compare values by their keys.

Modern high-level languages (including Python and Java) have several different ways to accomplish key-based comparison, and we encourage you to find out how this is done in your favourite language.
It can be done via special methods on objects, or by special classes, or by supplying a *key function*, or several other ways.

<!--
### Comparables

To implement sorting or searching, we require that keys be
[comparable]{.term}. At a minimum, we must be
able to take two keys and reliably determine whether they are equal or
not. That is enough to enable a [sequential search]{.term} through a database of
records and find one that matches a given key. However, we typically
would like for the keys to define a [total order]{.term},
which means that we can always tell which of two keys is greater than
the other. Using key types with total orderings gives the database
implementor the opportunity to organize a collection of records in a way
that makes searching more efficient. An example is storing the records
in sorted order in an array, which permits a [binary search]{.term}. Fortunately,
in practice most fields of most records consist of simple data types
with natural total orders. For example, integers, floats, doubles, and
character strings all are totally ordered.

But if we want to write a general purpose sorting or searching function,
we need a general way to get the key for the record. We could insist
that every record have a particular method called `.key()`. That seems
like a good name for it!

Some languages like Java, Python and C++ have special infrastructure for
supporting this (such as the `Comparable` interface in Java, which has
the `.compareTo()` method for defining the exact process by which two
objects are compared;
or the overloaded methods `__eq__`, `__lt__`, etc, used by Python).
But many languages do not, such as C and Javascript.

But what if the programmer wants to sort
the record now using one field as the key, and later using another
field? Or search sometimes on one key, and at other times on another?
The problem is that the "keyness" of a given field is not an inherent
property within the record, but rather depends on the context. So, you
cannot always count on being able to use your favorite method name (or
even the comparable interface) to extract the desired key value.

    interface Comparable:
        // This is Java's default way of comparing elements,
        // returning an integer: negative (smaller), 0 (equal), positive (larger)
        compareTo(other: Comparable) -> Int

        // This is Python's default way of comparing elements.
        // All of these operators return a boolean:
        (this == other) -> Bool
        (this != other) -> Bool
        (this < other)  -> Bool
        (this <= other) -> Bool
        (this > other)  -> Bool
        (this >= other) -> Bool

### Comparators

Another, more general approach is to supply a function or class --
called a [comparator]{.term} -- whose job is to
extract the key from the record. A comparator function can be passed in
as a parameter, such as in a call to a sorting function. In this case,
the comparator function would be invoked on two records whenever they
need to be compared. In this way, different comparator functions can be
passed in to handle different record types or different fields within a
record. In Java (with generics) or C++ (with templates), a comparator
class can be a parameter for another class definition. For example, a
BST could take a comparator class as a generics parameter in Java. This
comparator class would be responsible for dealing with the comparison of
two records.

### Key-value Pairs

One good general-purpose solution is to explicitly store
[key-value pairs](#key-value-pair){.term} in the
data structure. For example, if we want to sort a bunch of records, we
can store them in an array where every array entry contains both a key
value for the record and a pointer to the record itself.

The main places where we will need to be concerned with comparing
records and extracting keys is for various map implementations and
sorting algorithms. Here is a simple class for representing key-value
pairs:

    datatype KVPair of K and V:
        key: K    // the search key
        value: V  // the value associated with the key

Note that in Python it's probably easier to just use a pair `(key,value)`,
but not all languages (read: Java) have that possibility.
So we declare a class **KVPair** that we will use in our example code.

Using this we can easily implement a **Map** from an underlying
**List**, which we will discuss further in the
[chapter about linear structures](#implementing-maps-using-lists).

### Sorting using Comparables

To keep them clear and simple, visualizations for sorting algorithms
will usually show them as operating on integer values stored in an
array. But almost never do people really want to sort an array of
integers. But to be useful, a real sorting algorithm typically has to
deal with the fact that it is sorting a collection of records. A
general-purpose sorting routine meant to operate on multiple record
types would have to be written in a way to deal with the generic
comparison problem.
But as long as the elements of the array supports the **Comparable**
interface, we can still use the standard comparison operators when sorting.


### Comparing values in Python

::: TODO
- overloading `__lt__`, `__eq__`, etc
:::

### Comparing values in Java


*Note*: This example treats comparables and comparators, as they work in Java.
(A similar example for Python is on the TODO list.)

In Java there are two main ways of comparing objects. The one that most
people find easier to understand is *comparable*. But there is an
alternative, *comparator*, which is very useful.

As a running example we use a class for persons:
```java
class Person implements Comparable<Person> {
    private String givenName;
    private String familyName;
    private int birthYear;
    //...
}
```

Also, let's create an array of persons that we can use later:
```java
static ArrayList<Person> getPeople() {
    ArrayList<Person> people = new ArrayList<>();
    people.add(new Person("Unsuk", "Chin", 1961));
    people.add(new Person("Anna", "Thorvaldsdóttir", 1977));
    people.add(new Person("Andrea", "Tarrodi", 1981));
    people.add(new Person("Diana", "Čemerytė", 1974));
    people.add(new Person("Elfrida", "Andrée", 1841));
    people.add(new Person("Guy", "d’Hardelot", 1858));
    people.add(new Person("Nadia", "Boulanger", 1887));
    people.add(new Person("Lili", "Boulanger", 1893));
    return people;
}
```

Now we can print the list:
```java
ArrayList<Person> people = getPeople();
for (Person p : people) System.out.println(p);
```

Which results in:

> | Unsuk Chin (1961)
> | Anna Thorvaldsdóttir (1977)
> | Andrea Tarrodi (1981)
> | Diana Čemerytė (1974)
> | Elfrida Andrée (1841)
> | Guy d'Hardelot (1857)
> | Nadia Boulanger (1887)
> | Lili Boulanger (1893)

#### Comparables

With the **Comparable** interface we can define the "natural ordering"
for a class ([Java 11
Comparable](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Comparable.html)).
Recall the interface for comparables from
[the course API](#all-adts-used-in-this-book):
```java
// Note: This is the same as the java.lang.Comparable interface
interface Comparable<E> {
    int compareTo(E other);  // Returns <0  if  this < other,
                             //      or  0  if  this == other,
                             //      or >0  if  this > other.
}
```

Let's say that we want the natural ordering to be to compare persons by
their family name. Then we let `Person` implement the `Comparable`
interface by overriding `.compareTo(…)`:
```java
class Person implements Comparable<Person> {
    // ...as above...
    public int compareTo(Person other) {
        return this.familyName().compareTo(other.familyName());
    }
}
```

Now we can sort our people array according to family name:
```java
people = getPeople(); // reset the people list
Collections.sort(people);
for (Person p : people) System.out.println(p);
```

Resulting in:

> | Elfrida Andrée (1841)
> | Nadia Boulanger (1887)
> | Lili Boulanger (1893)
> | Unsuk Chin (1961)
> | Andrea Tarrodi (1981)
> | Anna Thorvaldsdóttir (1977)
> | Guy d'Hardelot (1857)
> | Diana Čemerytė (1974)

Two things to note, which we address later:

1.  Guy d'Hardelot and Diana Čemerytė come last -- this is because
    `.compareTo(…)` gives a case-sensitive ordering and doesn't care
    ignore diacritics.
2.  Nadia Boulanger comes before Lili, even though L comes before N in
    the alphabet.

#### Comparators, the old way

What if we sometimes want to sort the list according to some other
ordering, e.g., birth year or given name? Enter *comparators*, and here
is the interface ([Java 11
Comparator](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Comparator.html)):
```java
// Note: This is a subset of the java.util.Comparator interface
interface Comparator<E> {
    int compare(E one, E other);  // Returns <0  if  one < other,
                                  //      or  0  if  one == other,
                                  //      or >0  if  one > other.
}
```

To use this we have to implement a separate class for each ordering we
want to use. Here's one for comparing by birth year:
```java
class BirthYearComparator implements Comparator<Person> {
    public int compare(Person one, Person other) {
        return Integer.compare(one.birthYear(), other.birthYear());
    }
}
```

*Notes*:

1.  Don't compare numbers by using subtraction! This might lead to
    overflow and rounding errors. Instead use the static `.compare(…)`
    methods that are built into the number classes (`Integer`, `Double`,
    etc).
2.  Since numbers are not objects, you cannot use
    `one.birthYear.compareTo(…)`. You can do
    `new Integer(one.birthYear).compareTo(…)`, or you can use
    `Integer.compare(…)` as above.

And here's the class for comparing by given name:
```java
class GivenNameComparator implements Comparator<Person> {
    public int compare(Person one, Person other) {
        return one.givenName().compareTo(other.givenName());
    }
}
```

To use them you have to first create an object, i.e., instantiate the
comparator:
```java
Comparator<Person> byBirthYear = new BirthYearComparator();
people = getPeople(); // reset the people list
Collections.sort(people, byBirthYear);
for (Person p : people) System.out.println(p);
```

Result:

> | Elfrida Andrée (1841)
> | Guy d'Hardelot (1857)
> | Nadia Boulanger (1887)
> | Lili Boulanger (1893)
> | Unsuk Chin (1961)
> | Diana Čemerytė (1974)
> | Anna Thorvaldsdóttir (1977)
> | Andrea Tarrodi (1981)

And similar for given names:
```java
Comparator<Person> byGivenName = new GivenNameComparator();
people = getPeople(); // reset the people list
Collections.sort(people, byGivenName);
for (Person p : people) System.out.println(p);
```

Result:

> | Andrea Tarrodi (1981)
> | Anna Thorvaldsdóttir (1977)
> | Diana Čemerytė (1974)
> | Elfrida Andrée (1841)
> | Guy d'Hardelot (1857)
> | Lili Boulanger (1893)
> | Nadia Boulanger (1887)
> | Unsuk Chin (1961)

#### Comparators, the functional interface in Java

Since Java 8, there's a functional interface which can be used to build
comparators (and many other things). So we don't have to write the class
definitions, and instead write similarly to we would do in Python or
Haskell:
```java
byGivenName = (one, other) -> one.givenName().compareTo(other.givenName());
```

Yay! That's a lot nicer than the clumsy class definition
(`class BirthYearComparator implements Comparator<Person>`, etc).

#### Comparing fields using key extractors

In many cases (including our example case), we only want to compare some
fields in a class. Then we can use *key extractors* to simplify even
more:
```java
byGivenName = Comparator.comparing(Person::givenName);
```

-   *Note*: We use `.comparingInt(…)` when defining `byBirthYear`. It's
    not strictly necessary (i.e., we can use `.comparing(…)`), but it
    makes things slightly more efficient.

#### Comparing several fields

Remember the natural ordering? The problem with only comparing the
family name is that if two persons have the same name they keep their
internal order. So, Nadia Boulanger comes before Lili Boulanger even
though L precedes N in the alphabet.

What we want is to be able to compare several fields. The old and
not-so-good solution is to use clumsy if-then-elses, like this:
```java
class FullNameComparator implements Comparator<Person> {
    public int compare(Person one, Person other) {
        int cmp = one.familyName().compareTo(other.familyName());
        if (cmp != 0) return cmp;
        cmp = one.givenName().compareTo(other.givenName());
        if (cmp != 0) return cmp;
        return 0;
    }
}
```

After this we can instantiate a specific comparator:
```java
Comparator<Person> byFullName = new FullNameComparator();
```

If we have many fields this gets quite cumbersome (and error-prone). But
using the functional interface, and the magic `.thenComparing(…)`
method, it's really easy:
```java
byFullName = Comparator.comparing(Person::familyName)
    .thenComparing(Person::givenName);
```

And here it is in action:
```java
people = getPeople(); // reset the people list
Collections.sort(people, byFullName);
for (Person p : people) System.out.println(p);
```

Result:

> | Elfrida Andrée (1841)
> | Lili Boulanger (1893)
> | Nadia Boulanger (1887)
> | Unsuk Chin (1961)
> | Andrea Tarrodi (1981)
> | Anna Thorvaldsdóttir (1977)
> | Guy d'Hardelot (1857)
> | Diana Čemerytė (1974)

As you can see, Lili now comes before Nadia. But there's still the
problem with Guy and Diana coming last in the list.

#### Case-insensitive and language-specific comparisons

The Java **String** class has a method `.compareToIgnoringCase(…)` which
is what it sounds like.

But you shouldn't use it if you're serious about handling text
correctly. This is because strings are no longer ASCII, but Unicode. And
Unicode is a beast of its own -- it knows how to write hundreds of
different alphabets with diacritics and other special characters.
(Unicode even knows about bidirectional text (left-to-right vs
right-to-left), but we won't discuss that here).

Now, correct string sorting depends on your locale. E.g., in Swedish we
put Å, Ä, Ö at the end of the alphabet, while Á, Ô, È are mixed together
with A, O, E, respectively. Also, it's common to mix V and W in Swedish
dictionaries. German on the other hand mixes Ä, Ö with A, O. And it
sorts ß together with S.

So, here's how to define a correct comparator for Swedish, which ignores
case differences and orders according to Swedish locale:
```java
Collator swedishLocale = Collator.getInstance(new Locale("sv", "SE"));
swedishLocale.setStrength(Collator.PRIMARY);
Comparator<Person> bySwedishLocale =
    Comparator.comparing(Person::familyName, swedishLocale)
    .thenComparing(Person::givenName, swedishLocale);
```

And in action:
```java
people = getPeople(); // reset the people list
Collections.sort(people, bySwedishLocale);
for (Person p : people) System.out.println(p);
```

Result:

> | Elfrida Andrée (1841)
> | Lili Boulanger (1893)
> | Nadia Boulanger (1887)
> | Diana Čemerytė (1974)
> | Unsuk Chin (1961)
> | Guy d'Hardelot (1857)
> | Andrea Tarrodi (1981)
> | Anna Thorvaldsdóttir (1977)

Finally Diana Čemerytė and Guy d'Hardelot find their right places in the
list!

#### ...and what about the names?

The names are taken from here: <https://female-composers.forts.se/>

#### Running the program

Here is the full source code. Just compile and run it without any
arguments:

```java
import java.util.*;
import java.text.Collator;

class Person implements Comparable<Person> {
    private String givenName;
    private String familyName;
    private int birthYear;

    // Constructor
    Person(String given, String family, int birth) {
        givenName  = given;
        familyName = family;
        birthYear  = birth;
    }

    // Getters
    public String givenName()  { return givenName  ; }
    public String familyName() { return familyName ; }
    public int    birthYear()  { return birthYear  ; }

    // Pretty-printing
    public String toString() {
        return givenName() + " " + familyName() + " (" + birthYear() + ")";
    }

    // Natural ordering
    // ...as above...
    public int compareTo(Person other) {
        return this.familyName().compareTo(other.familyName());
    }
}


class BirthYearComparator implements Comparator<Person> {
    public int compare(Person one, Person other) {
        return Integer.compare(one.birthYear(), other.birthYear());
    }
}


class GivenNameComparator implements Comparator<Person> {
    public int compare(Person one, Person other) {
        return one.givenName().compareTo(other.givenName());
    }
}

class FullNameComparator implements Comparator<Person> {
    public int compare(Person one, Person other) {
        int cmp = one.familyName().compareTo(other.familyName());
        if (cmp != 0) return cmp;
        cmp = one.givenName().compareTo(other.givenName());
        if (cmp != 0) return cmp;
        return 0;
    }
}

public class ComparatorExample {
    static ArrayList<Person> getPeople() {
        ArrayList<Person> people = new ArrayList<>();
        people.add(new Person("Unsuk", "Chin", 1961));
        people.add(new Person("Anna", "Thorvaldsdóttir", 1977));
        people.add(new Person("Andrea", "Tarrodi", 1981));
        people.add(new Person("Diana", "Čemerytė", 1974));
        people.add(new Person("Elfrida", "Andrée", 1841));
        people.add(new Person("Guy", "d’Hardelot", 1858));
        people.add(new Person("Nadia", "Boulanger", 1887));
        people.add(new Person("Lili", "Boulanger", 1893));
        return people;
    }

    public static void main(String[] args) {
        System.out.println("\n### No order");
        ArrayList<Person> people = getPeople();
        for (Person p : people) System.out.println(p);

        System.out.println("\n### Natural ordering");
        people = getPeople(); // reset the people list
        Collections.sort(people);
        for (Person p : people) System.out.println(p);

        System.out.println("\n### Ordered by birth year (pre-Java-8 solution)");
        Comparator<Person> byBirthYear = new BirthYearComparator();
        people = getPeople(); // reset the people list
        Collections.sort(people, byBirthYear);
        for (Person p : people) System.out.println(p);

        System.out.println("\n### Ordered by birth year (functional solution)");
        byBirthYear = (one, other) -> Integer.compare(one.birthYear(), other.birthYear());
        people = getPeople(); // reset the people list
        Collections.sort(people, byBirthYear);
        for (Person p : people) System.out.println(p);

        System.out.println("\n### Ordered by birth year (using a key extractor)");
        byBirthYear = Comparator.comparingInt(Person::birthYear);
        people = getPeople(); // reset the people list
        Collections.sort(people, byBirthYear);
        for (Person p : people) System.out.println(p);

        System.out.println("\n### Ordered by given name (pre-Java-8 solution)");
        Comparator<Person> byGivenName = new GivenNameComparator();
        people = getPeople(); // reset the people list
        Collections.sort(people, byGivenName);
        for (Person p : people) System.out.println(p);

        System.out.println("\n### Ordered by given name (functional solution)");
        byGivenName = (one, other) -> one.givenName().compareTo(other.givenName());
        people = getPeople(); // reset the people list
        Collections.sort(people, byGivenName);
        for (Person p : people) System.out.println(p);

        System.out.println("\n### Ordered by given name (using a key extractor)");
        byGivenName = Comparator.comparing(Person::givenName);
        people = getPeople(); // reset the people list
        Collections.sort(people, byGivenName);
        for (Person p : people) System.out.println(p);

        System.out.println("\n### Ordered by full name: family name + given name (pre-Java-8 solution)");
        Comparator<Person> byFullName = new FullNameComparator();
        people = getPeople(); // reset the people list
        Collections.sort(people, byFullName);
        for (Person p : people) System.out.println(p);

        System.out.println("\n### Ordered by full name: family name + given name (using key extractors and thenComparing)");
        byFullName = Comparator.comparing(Person::familyName)
            .thenComparing(Person::givenName);
        people = getPeople(); // reset the people list
        Collections.sort(people, byFullName);
        for (Person p : people) System.out.println(p);

        System.out.println("\n### Ordered by Swedish locale, case-insensitive");
        Collator swedishLocale = Collator.getInstance(new Locale("sv", "SE"));
        swedishLocale.setStrength(Collator.PRIMARY);
        Comparator<Person> bySwedishLocale =
            Comparator.comparing(Person::familyName, swedishLocale)
            .thenComparing(Person::givenName, swedishLocale);
        people = getPeople(); // reset the people list
        Collections.sort(people, bySwedishLocale);
        for (Person p : people) System.out.println(p);

        System.out.println("\n### Ordered by Swedish locale, given name first");
        Comparator<Person> bySwedishGivenName =
            Comparator.comparing(Person::givenName, swedishLocale)
            .thenComparing(Person::familyName, swedishLocale);
        people = getPeople(); // reset the people list
        Collections.sort(people, bySwedishGivenName);
        for (Person p : people) System.out.println(p);
    }
}
```
-->
