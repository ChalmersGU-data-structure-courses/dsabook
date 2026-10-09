
## Common misunderstandings {#analysis-2:misunderstandings}

Most people find [growth rates](#growth-rate){.term} and [asymptotic analysis]{.term} confusing.
It is easy to misunderstand the concepts or the terminology,
and then it can be helpful to know what the common points of confusion are.

For example, it can be difficult to understand the difference between the upper and lower bound.
For most of the algorithms you encounter in this book the upper and lower bounds coincide,
because they are well studied and simple enough to have complete knowledge about them.
<!-- OPENDSA: START -->
The distinction between an upper and a lower bound is only meaningful when
you have incomplete knowledge about the thing being measured.
<!-- OPENDSA: END -->

Another common mistake is to confuse the lower bound with the *best-case* analysis,
and analoguously the upper bound with the *worst-case*.
In fact, it is in principle possible to analys all possible combinations of
the (upper/lower/tight) bounds, and the (best/worst/average) case.
But in practice there are only a few combinations that are of interest.

When it comes to analysing algorithms, we are usually not at all interested in any best-case analysis.
After all, knowing that an algorithm performs well in some very lucky cases doesn't say if it's a good algorithm
-- it is much more important to know how it performs on worst-case inputs, or sometimes in the average case.
Of similar reasons, it is not very interesting to learn about the lower bound of an algorithm,
and it is usually too difficult to find the tight bound.
Which leaves us with analysing the worst-case upper bound, or sometimes the average-case behaviour.
So this is what we almost always do.
