
## Sets

A *set* represents a collection of items, where we can *add* and *remove* items,
and *check* if a given item is present in the set.
A set cannot contain duplicate items:
if we try to add an item that is already present, nothing happens, and the set is left unchanged.
We can specify a minimal interface for sets like this:

    interface Set of T extends Collection:
        add(x: T)               // Adds x to the set.
        remove(x: T)            // Removes x from the set.
        contains(x: T) -> Bool  // Returns true if x is in the set.

::: example
#### Example: Spell-checking

We can use a set to create a very simple spell-checker:

-   Given a set containing all valid words in a language,
    check if a given string is present in the set (that is, if is a valid word).

To create the spell-checking dictionary, we start with an initially empty set,
and then repeatedly *add* each valid word to the set.
Then to spell-check a given word, we just call *contains* on the set.

:::

