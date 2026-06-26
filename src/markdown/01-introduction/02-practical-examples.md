
## Practical examples {#intro:examples}

Here we list some real-world examples where data structures and algorithms are crucial.

#### Example: Searching texts

Internet Search engines solve the problem of searching vast quantities of
text for specified keywords (and then the separate problem of ranking
these by relevance).
Directly combing through billions of webpages on the Internet is not a realistic
procedure for a search that needs to finish in microseconds. Instead, search engines
employ sophisticated data structures to efficiently access the information.

A key concept for *search indexes*. Let's consider a simpler version of this problem:
A collection of songs by different artists, and we want to search it
either by artist or song title. If the collection is just
a list, with new songs being added to the end of it, both these searches would be slow.
Combining songs by the same artist could make searching for artists faster, but would
not help us search for a title.
Instead we can create two separate indexes: One with all songs ordered alphabetically by
artist, and the second ordered by song title. Then anyone who knows the alphabet can quickly
find any song or artist using a variant of the binary search algorithm (see @sec:intro:searching).


#### Example: Travel by train

The railroad is expanding to the frontier cities!
Engineers want to build as little total rail length as possible, but still connect all cities.
After the railway is constructed, travellers wants to find the fastest way of getting from
city A to city B.

Both these problems can be modelled as graph problems, using a data structure where vertices (cities)
are connected by edges (potential railroad tracks or train departures).
Specifically, finding the smallest rail network is a *minimal spanning tree* problem (see @sec:graphs:MSTs)
and travel planning is a *shortest path* problem (see @sec:graphs:shortest-path).

#### Example: Simulating particles

Simulating various physical systems is a common software application.
Suppose we are modelling particles that can collide with other particle or
with a physical boundary, causing a change of direction and speed, or perhaps
randomly splitting the particle in two.
For each particle we can calculate when its next collision will occur.

To simulate the progression of this system, we can use a *priority queue* data structure
(see @sec:ADTs:priority-queues) to store future collisions, and efficiently access them in
the order they occur.
When we calculate the outcome of a collision, we add new future collisions to the
priority queue.

This generalises into any system with timed events where there is a main loop that
repeatedly finds the next event and executes it, possibly spawning new future events.



<!--

#### Databases

A company is developing a database system containing information about
cities and towns in Europe. There are many thousands of
cities and towns, and the database program should allow users to find
information about a particular place by name (another example of an
exact-match query). Users should also be able to find all places that
match a particular value or range of values for attributes such as
location or population size. This is known as a
[range query]{.term}.

A reasonable database system must answer queries quickly enough to
satisfy the patience of a typical user. For an exact-match query,
a fraction of a second is satisfactory. If the database is meant to support range
queries that can return many cities that match the query specification,
the user might tolerate the entire operation to take a little longer, perhaps
a couple of seconds. To meet this requirement, it will be necessary to
support operations that process range queries efficiently by processing
all cities in the range as a batch, rather than as a series of
operations on individual cities.

The hash table suggested in the previous example is inappropriate for
implementing our city database, because it cannot perform efficient
range queries. The [B-tree]{.term} supports large databases, insertion
and deletion of data records, and range queries. However, a simple
[linear index]{.term} would be more appropriate if the database is created once,
and then never changed, such as an atlas accessed from a website.


#### Banks

A bank must support many types of transactions with its customers, but
we will examine a simple model where customers wish to open accounts,
close accounts, and add money or withdraw money from accounts. We can
consider this problem at two distinct levels: (1) the requirements for
the physical infrastructure and workflow process that the bank uses in
its interactions with its customers, and (2) the requirements for the
database system that manages the accounts.

The typical customer opens and closes accounts far less often than
accessing the account. Customers are willing to spend many minutes
during the process of opening or closing the account, but are typically
not willing to wait more than a brief time for individual account
transactions such as a deposit or withdrawal. These observations can be
considered as informal specifications for the time constraints on the
problem.

It is common practice for banks to provide two tiers of service. Human
tellers or automated teller machines (ATMs) support customer access to
account balances and updates such as deposits and withdrawals. Special
service representatives are typically provided (during restricted hours)
to handle opening and closing accounts. Teller and ATM transactions are
expected to take little time. Opening or closing an account can take
much longer (perhaps up to an hour from the customer's perspective).

From a database perspective, we see that ATM transactions do not modify
the database significantly. For simplicity, assume that if money is
added or removed, this transaction simply changes the value stored in an
account record. Adding a new account to the database is allowed to take
several minutes. Deleting an account need have no time constraint,
because from the customer's point of view all that matters is that all
the money be returned (equivalent to a withdrawal). From the bank's
point of view, the account record might be removed from the database
system after business hours, or at the end of the monthly account cycle.

When considering the choice of data structure to use in the database
system that manages customer accounts, we see that a data structure that
has little concern for the cost of deletion, but is highly efficient for
search and moderately efficient for insertion, should meet the resource
constraints imposed by this problem. Records are accessible by unique
account number (sometimes called an [exact-match query]{.term}).
One data structure that meets these requirements is the
[hash table](#hashing){.term}.
Hash tables allow for extremely fast exact-match search. A record can be
modified quickly when the modification does not affect its space
requirements. Hash tables also support efficient insertion of new
records. While deletions can also be supported efficiently, too many
deletions lead to some degradation in performance for the remaining
operations. However, the hash table can be reorganised periodically to
restore the system to peak efficiency. Such reorganisation can occur
offline so as not to affect ATM transactions.
-->
