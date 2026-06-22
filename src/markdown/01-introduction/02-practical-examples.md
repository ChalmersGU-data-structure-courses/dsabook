
## Practical examples {#intro:examples}

::: TODO
- Prio 3: add a 4th example
:::

Here we list some real-world examples where data structures and algorithms are crucial.

#### Example: Search engines

Search engines like DuckDuckGo, Google and Bing help us search for web pages that match our queries.
This is not possible to do by just searching through each web page at a turn,
simply because there are so many web pages on the Internet.
To be able to find relevant pages quickly, all search engines organise the relevant information using *search indexes*.

Most of us use search engines every day without thinking about the incredible job they do.
For example, searching for the term "binary search" in DuckDuckGo takes just a fraction of a second,
and there are 100s of millions of matching web pages.

Now imagine you are designing a search engine that must index billions of web pages.
Each page has a unique address, called a Uniform Resource Locator (URL), and is associated with a set of keywords.
When a user submits a search query, the engine must quickly find all the relevant pages.
A simple list is not an efficient way to store and retrieve this information.
With billions of pages, it is not practical to check each one in order.
Even if looking at a single page takes only a millisecond, going through them all would take years.
To handle this challenge, we need smart ways to store and search through the data.

Let's consider a simpler version of this problem.
Suppose we want to search for a book by a certain author in a big bookshelf.
A basic approach would be to go through each book at a time until we find the right author.
This works, but it becomes very slow as the number of books in the shelf grows larger.
To improve efficiency, we can instead order the books alphabetically by author.
Then, instead of scanning from the beginning, we can start by looking at the author of the middle book.
If the book author is larger, we can exclude the upper half of the bookshelf,
and if it is smaller we can exclude the lower half.
In either case we have effectively reduced the search space by half in just one go.
If our shelf contains one billion books, we would need only about 40 steps to find the right one.
This search algorithm is called *binary search* and is the topic of the next section.

Note that this is a very simplified model of a search engine.
In reality, search engines do much more than just match keywords.
They also rank pages by relevance and take many details into account,
such as whether letters are uppercase or lowercase, and whether the user is combining terms with "and" or "or".


#### Example: Railway connections

Europe has a big network of railways, and we would like to have a database that contains all the relevant information.
This database should contain information about all railway stations, what tracks there are that connect them,
how long each of these tracks are and if there are several tracks in parallel.
It also needs to know all the timetables of all trains, including how large each train is,
the seat numbers of all train carriages, which is first and second class, and which seats are grouped together with a table.

The database must be *distributed* because each country has their own rail network,
there are several different railway companies that operate in different countries,
and all of them use the same tracks and stations.
It must also be possible to update the timetable information quickly, for example to show information about delays.

Now, say that you want to travel from Paris, France, to Leksand, Sweden,
and arrive in time to celebrate the traditional Swedish Midsummer festivities.
To do this you want to search the database to find train connection so that you will arrive
some time in the morning of Midsummer's eve.
Finding appropriate train connections is an example of *shortest-path search* in a graph,
and in addition the database needs to support *range queries* to make sure that we can arrive within a specified time range.

In this book you will learn the basics of how you can implement a database system like this,
even though the are many specialised data structures and algorithms that we will not have time to cover.


#### Example: Job scheduling

An operating system constantly runs many jobs in parallel,
and it needs to know which jobs are more important and which are more resource intense.
Every job should get a fair share of the resources, both the processor and the memory,
and no job should take over from the others.
But some jobs are more important than others, and they should be prioritised,
but in the extreme so that all other jobs get stalled.
Every now and then a job finishes, or a new job is started, and the operating system should handle this too.

To be able to do this, the operating system needs information about each job, what resources it uses, and what is its priority.
This is stored in a *priority queue*, which decides the next job to dedicate the attention to, when to change to another job,
and how to update the priorities and other information.

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
