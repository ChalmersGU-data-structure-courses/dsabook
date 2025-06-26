
## Sets

A *set* represents a collection of items, where we can *add* and
*remove* items, and *check* if a given item is present in the set. A set
cannot contain duplicate items: if we try to add an item that is already
present, nothing happens, and the set is left unchanged.
We can specify a minimal interface for sets like this:

    interface Set of T extends Collection:
        add(x: T)               // Adds x to the set.
        remove(x: T)            // Removes x from the set.
        contains(x: T) -> Bool  // Returns true if x is in the set.

::: topic
#### Example: Spell-checking

We can use a set for the spell-checking example:

-   Given a set containing all valid English words, check if a given
    string is present in the set (i.e. is a valid word).

To create the spell-checking dictionary, we start with an initially
empty set, and then call `add` repeatedly to add each valid word to the
set. Then to spell-check a given word, we just call `contains`.

    datatype SpellChecker:
        validWords: Set of String

        constructor(listOfValidWords: Collection of String):
            // Convert the list of words into a set.
            validWords = new Set()
            for each word in listOfValidWords:
                validWords.add(word)

        isValidWord(word) -> Bool:
            return validWords.contains(word)

Here's how the `SpellChecker` can be used:

    function main(wordsToCheck: Collection of String):
        // Create a new spell checker.
        checker = new SpellChecker(["cat", "dog"])

        // Now we can spell-check a word easily.
        for each word in wordsToCheck:
            if checker.isValidWord(word):
                print word "is valid"
            else:
                print word "is INVALID"

:::

