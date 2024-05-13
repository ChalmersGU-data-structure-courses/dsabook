
<!-- TODO: make a similar Python example -->

## Comparables and Comparators: An Example

*Note*: This example treats comparables and comparators, as they work in Java.
(A similar example for Python is on the TODO list.)

### Comparables and comparators in Java

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

### Comparables

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

### Comparators, the old way

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

### Comparators, the functional interface in Java 

Since Java 8, there's a functional interface which can be used to build
comparators (and many other things). So we don't have to write the class
definitions, and instead write similarly to we would do in Python or
Haskell:
```java
byGivenName = (one, other) -> one.givenName().compareTo(other.givenName());
```

Yay! That's a lot nicer than the clumsy class definition
(`class BirthYearComparator implements Comparator<Person>`, etc).

### Comparing fields using key extractors

In many cases (including our example case), we only want to compare some
fields in a class. Then we can use *key extractors* to simplify even
more:
```java
byGivenName = Comparator.comparing(Person::givenName);
```

-   *Note*: We use `.comparingInt(…)` when defining `byBirthYear`. It's
    not strictly necessary (i.e., we can use `.comparing(…)`), but it
    makes things slightly more efficient.

### Comparing several fields

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

### Case-insensitive and language-specific comparisons

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

### ...and what about the names?

The names are taken from here: <https://female-composers.forts.se/>

### Running the program

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
