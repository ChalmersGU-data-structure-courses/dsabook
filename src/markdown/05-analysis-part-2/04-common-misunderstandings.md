
## Common misunderstandings {#analysis-2:misunderstandings}

::: TODO
- Prio 2: update text, perhaps merge with another section?
:::

<!-- OPENDSA: START -->
[Asymptotic analysis]{.term} is one of the most intellectually difficult topics that
undergraduate computer science majors are confronted with. Most people
find [growth rates](#growth-rate){.term} and
asymptotic analysis confusing and so develop misconceptions about either
the concepts or the terminology. It helps to know what the standard
points of confusion are, in hopes of avoiding them.

One problem with differentiating the concepts of
[upper](#upper-bound){.term} and
[lower bounds](#lower-bound){.term} is that, for
most algorithms that you will encounter, it is easy to recognise the
true growth rate for that algorithm. Given complete knowledge about a
cost function, the upper and lower bound for that cost function are
always the same. Thus, the distinction between an upper and a lower
bound is only worthwhile when you have incomplete knowledge about the
thing being measured.
We can use the $\Theta$-notation to indicate that there is no
meaningful difference between what we know about the growth rates of the
upper and lower bound (which is usually the case for simple algorithms).
<!-- OPENDSA: END -->

### Best-case upper bound, or worst-case lower bound?

Note that even though it is possible to analyse all possible combinations of (upper/lower/tight) bounds,
and (best/worst/average) case, there are only a few combinations that are of interest.

When it comes to analysing algorithms, we are usually not at all interested in any best-case analysis.
After all, knowing that an algorithm performs well in some very lucky cases doesn't say if it's a good algorithm
-- it is much more important to know how it performs on worst-case inputs, or sometimes in the average case.
In the same way, it is not very interesting to learn about the lower bound of an algorithm.

That leaves us with analysing the worst-case upper bound, or sometimes the average-case behaviour.
So this is what we almost always do.
