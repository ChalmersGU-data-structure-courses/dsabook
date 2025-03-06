
## Use cases

::: TODO
- Replace Bank with e.g. Social media
:::


### Example: Bank

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
operations. However, the hash table can be reorganized periodically to
restore the system to peak efficiency. Such reorganization can occur
offline so as not to affect ATM transactions.


### Example: Databases

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


### Example: [Something something]

