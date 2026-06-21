## Open addressing and linear probing

A downside of separate chaining is that we abandon the benefits of storing all our
map entries directly in an array. Storing values in a contiguous memory sequence 
has major performance benefits due to the caching behavior of modern computers, 
and having an array of map entries is a simpler data model than having an array 
of linked lists of map entries.

*Open addressing* is a general term for hash tables where, if the cell we want to 
place an entry in is taken, we place it in some other cell instead.
*Linear probing* is the specific technique where we move one step forward 
in the array until we find an empty cell. We consider the array to be circular, 
so the index after `length-1` is 0. 

To perform a lookup of value `x`, we do a linear search from index 
`hash(x)%table.length` until we either find the key we are looking for, 
or find an empty table cell. 

The invariant required for this to work is the following: If a key is 
present in the table, there can be no empty cells between its ideal position and its actial position.
Consider this example of a linear probing hash table. 
For simplicity, we implement a set instead of a map here, so there are only keys and no values:


![An open addressing hash table of size 13, representing the set {A,B,C,D,E,F}. Since this is not a map, there are no values, only keys. The keys form three clusters: {A,B,C}, {D,E}, and {F}.](images/Hashing-LinProbe1.svg){width=80% #fig:LinProbe1}


The three elements A, B, and C are adjacent in the (circular) array, forming what is called a cluster.
Consider what we know about the compressed hashes `hash(x)%13` for these elements. 
It is possible there are no collisions at all, if the compressed hashes for A, B, and C are 12,0, and 1 respectively.
Its also possible the compressed hashes are all 12, or some combination such as A and C being 12 but B being 0.
Can `hash(B)%13` be 1? No, that would violate the invariant, and a lookup for B would fail after looking for B on index 1 and then reaching the empty cell on index 2.

A question you should be asking yourself is: What happens when the table is full? 
Unlike a separate chaining hash table, the number of keys in an open addressing 
table cannot exceed the size of the table. 
Resizing the table is not just necessary for performance, but also for correctness.
@fig:LinProbe2 shows a full example of five integers added to a linear probing hash table, 
including a resize. Study the table and make sure you understand why each value ends up 
where it does

![Linear probing hash table adding the integers 14, 8, 23, 46, and 6 in that order, with `hash(x)=x`. The arrows indicate ideal and actual postions of each key. Adding 46 triggers a resize from size 5 to size 10.](images/Hashing-LinProbe2.svg){width=90% #fig:LinProbe2}