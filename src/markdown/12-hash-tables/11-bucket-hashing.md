
## Bucket hashing

One implementation for open addressing groups hash table slots into
[buckets]{.term}. The $M$ slots of the
hash table are divided into $B$ buckets, with each bucket consisting of
$M/B$ slots. The hash function assigns each record to the first slot
within one of the buckets. If this slot is already occupied, then the
bucket slots are searched sequentially until an open slot is found. If a
bucket is entirely full, then the record is stored in an
[overflow bucket]{.term} of infinite capacity at
the end of the table. All buckets share the same overflow bucket. A good
implementation will use a hash function that distributes the records
evenly among the buckets so that as few records as possible go into the
overflow bucket.

When searching for a record, the first step is to hash the key to
determine which bucket should contain the record. The records in this
bucket are then searched. If the desired key value is not found and the
bucket still has free slots, then the search is complete. If the bucket
is full, then it is possible that the desired record is stored in the
overflow bucket. In this case, the overflow bucket must be searched
until the record is found or all records in the overflow bucket have
been checked. If many records are in the overflow bucket, this will be
an expensive process.

::: dsvis
Demonstration of bucket hashing.

<inlineav id="buckethashCON1" src="Hashing/buckethashCON1.js" name="Bucket Hashing Slideshow 1" links="Hashing/buckethashCON.css"/>
:::

::: dsvis
Now you can try it yourself.

<avembed id="HashBucketPRO" src="Hashing/HashBucketPRO.html" type="ka" name="Bucket Hashing Proficiency Exercise"/>
:::

### An alternative approach to bucket hashing

A simple variation on bucket hashing is to hash a key value to some slot
in the hash table as though bucketing were not being used. If the home
position is full, then we search through the rest of the bucket to find
an empty slot. If all slots in this bucket are full, then the record is
assigned to the overflow bucket. The advantage of this approach is that
initial collisions are reduced, because any slot can be a home position
rather than just the first slot in the bucket.

::: dsvis
Demonstration of alternative bucket hashing.

<inlineav id="buckethashCON2" src="Hashing/buckethashCON2.js" name="Bucket Hashing Slideshow 2" links="Hashing/buckethashCON.css"/>
:::

Bucket methods are good for implementing hash tables stored on disk,
because the bucket size can be set to the size of a disk block. Whenever
search or insertion occurs, the entire bucket is read into memory.
Because the entire bucket is then in memory, processing an insert or
search operation requires only one disk access, unless the bucket is
full. If the bucket is full, then the overflow bucket must be retrieved
from disk as well. Naturally, overflow should be kept small to minimise
unnecessary disk accesses.

::: dsvis
#### Exercise: Bucket hashing

<avembed id="HashBucket2PRO" src="Hashing/HashBucket2PRO.html" type="ka" name="Alternate Bucket Hashing Proficiency Exercise"/>
:::
