
### Implementing lists using arrays

First we give a static implementation for array-based lists, named
**ArrayList**. This inherits from the
[List ADT](#all-adts-used-in-this-book), and must therefore
implement all of the member functions of `List`.

Unlike normal arrays, lists can change in size: we can add elements to
and remove from them. How can this be implemented? Well, what we
*don't* want to do is to create a completely new array every time
elements are added or removed. So instead we will use an underlying
array which is larger than we need.

::: alert
#### Important note about Python lists {-}
- **refer to the chapter on prerequisites**

Python doesn't have arrays -- i.e., fixed size constant-time access arrays
like C, Java and most other languages have.

Instead, Python has *lists*, and they are actually precisely the kind of
dynamic array-based lists that we are describe in this section and the next.
So a Python `list` is implemented using fixed-size arrays, but when you program
in Python you cannot access these arrays because they are hidden from
the programmer.
:::

### Internal variables

Because of that will need two internal variables: the underlying array,
and a *size* counter telling how much of the array is actually used.
When we create a new array-list we have to decide the *capacity*, the
largest possible size. Then the underlying array is initialised, and the
size counter is set to 0 because there are no elements yet.

<inlineav id="StaticArrayList-Vars-CON" src="ChalmersGU/StaticArrayList-Vars-CON.js" name="Static Array-based List Variables Slideshow"/>

    datatype ArrayList implements List:
        internalArray = new Array(capacity)  // Internal array containing the list elements
        size = 0                             // Size of list

*Note*: in Python you cannot create an array with a certain capacity.
You can simulate it by creating a list with a number of empty elements:
`[None] * capacity`, but this is not a real fixed-size array as explained just above.

### Getting and setting values

Random access to any element in the list is quick and easy.

<inlineav id="StaticArrayList-Intro-CON" src="ChalmersGU/StaticArrayList-Intro-CON.js" name="Static Array-based List Intro Slideshow" links="ChalmersGU/CGU-Styles.css"/>

As you can see below, there are no loops in the methods `get` and `set`,
which means that both require $O(1)$ time.

    datatype ArrayList implements List:
        ...
        get(i):
            // precondition: 0 <= i < size
            return internalArray[i]

        set(i, x):
            // precondition: 0 <= i < size
            internalArray[i] = x


### Adding elements

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the `add` and `remove`
methods must maintain this property.

Appending elements at the tail of an array-based list is super-fast.

<inlineav id="StaticArrayList-Append-CON" src="ChalmersGU/StaticArrayList-Append-CON.js" name="Static Array-based List Append Slideshow" links="ChalmersGU/CGU-Styles.css"/>

However, adding an element at the head of the list requires shifting all
existing elements in the array by one position toward the tail.

<inlineav id="StaticArrayList-Add-CON" src="ChalmersGU/StaticArrayList-Add-CON.js" name="Static Array-based List Insertion Slideshow" links="ChalmersGU/CGU-Styles.css"/>

Therefore, if we want to add an element at position $i$, then
$n - i - 1$ elements must shift toward the tail to leave room for the
new element. In the worst case, adding elements requires moving all $n$
elements, which is $O(n)$.

    datatype ArrayList implements List:
        ...
        add(i, x):
            // precondition: 0 <= i <= size < internalArray.size()
            size = size + 1
            for k in size-1 .. i+1 (downwards):
                internalArray[k] = internalArray[k-1]
            internalArray[i] = x


#### Practice exercise

<avembed id="StaticArrayList-Add-PRO" src="ChalmersGU/StaticArrayList-Add-PRO.html" type="ka" name="Array-based List Add Exercise"/>

### Removing elements

Removing an element from the head of the list is similar to adding in
the sense that all remaining elements must shift. But now we have to
shift toward the head to fill in the gap, instead of toward the tail. If
we want to remove the element at position $i$, then $n - i - 1$ elements
must shift toward the head, as shown in the following slideshow.

<inlineav id="StaticArrayList-Remove-CON" src="ChalmersGU/StaticArrayList-Remove-CON.js" name="Static Array-based List Remove" links="ChalmersGU/CGU-Styles.css"/>

In the worst case, insertion or removal each requires moving all $n$
elements, which is $O(n)$.

    datatype ArrayList implements List:
        ...
        remove(i):
            // precondition: 0 <= i < size
            x = internalArray[i]
            for k in i+1 .. size-1:
                internalArray[k-1] = internalArray[k]
            size = size - 1
            internalArray[size] = null  // For garbage collection
            return x


#### Practice exercise

<avembed id="StaticArrayList-Remove-PRO" src="ChalmersGU/StaticArrayList-Remove-PRO.html" type="ka" name="Array-based List Remove Exercise"/>


### Limitations

::: TODO
- What happens when the capacity is exceeded? See section X about dynamic arrays
:::



### Alternative approaches

::: TODO
- alternative interface
:::
