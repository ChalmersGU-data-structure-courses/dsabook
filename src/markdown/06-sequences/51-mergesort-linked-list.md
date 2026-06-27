:::::: online

## Sorting a linked list with Mergesort* {#sequences:mergesort-linked-list}

We introduced Mergesort in @sec:sorting-2:mergesort, and then we showed how to sort an array.
But Mergesort can also be used to sort linked lists, because it does not require random access to the list elements.
Thus, Mergesort is the method of choice when the input is in the form of a linked list.

In fact, the only thing we need is to access the front and back of the linked list,
which means that we can use Mergesort on linked queues.
So, how do we implement splitting and merging?

Splitting the input list into two equal halves presents some difficulty.
Since we use a linked list we cannot find the middle easily.
But we can use a little trick instead: assign elements of the input list alternating between the two sublists.
The first element is assigned to the first sublist, the second element to the second sublist,
the third to first sublist, the fourth to the second sublist, and so on.
In pseudocode we can view it like this:

    split(list):
        half1, half2 = new empty linked queues
        for each x in list:
            enqueue x to half1
            swap half1 and half2
        return half1, half2

Merging two sorted linked lists is straightforward,
because we need only remove items from the front of the input lists and append them to the end of the output list.
The Mergesort pseudocode in @sec:sorting-2:mergesort can be used with linked lists directly.

    merge(half1, half2):
        answer = new empty linked queue
        while half1 and half2 are nonempty:
            if half1.peek() <= half2.peek():
                enqueue half1.dequeue() to answer
            else:
                enqueue half2.dequeue() to answer
        enqueue all remaining elements of half1 and half2 to answer
        return answer

::::::
