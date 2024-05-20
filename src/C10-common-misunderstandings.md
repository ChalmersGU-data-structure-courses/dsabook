
## Common Misunderstandings

[Asymptotic analysis]{.term} is one of the most intellectually difficult topics that
undergraduate computer science majors are confronted with. Most people
find [growth rates](#growth-rate){.term} and
asymptotic analysis confusing and so develop misconceptions about either
the concepts or the terminology. It helps to know what the standard
points of confusion are, in hopes of avoiding them.

One problem with differentiating the concepts of
[upper](#upper-bound){.term} and
[lower bounds](#lower-bound){.term} is that, for
most algorithms that you will encounter, it is easy to recognize the
true growth rate for that algorithm. Given complete knowledge about a
cost function, the upper and lower bound for that cost function are
always the same. Thus, the distinction between an upper and a lower
bound is only worthwhile when you have incomplete knowledge about the
thing being measured. If this distinction is still not clear, then you
should [read about analyzing problems](#analyzing-problems). 
We use $\Theta$-notation to indicate that there is no
meaningful difference between what we know about the growth rates of the
upper and lower bound (which is usually the case for simple algorithms).

It is a common mistake to confuse the concepts of upper bound or lower
bound on the one hand, and [worst case]{.term}
or [best case]{.term} on the other. The best,
worst, or [average cases](#average-case){.term}
each **define a cost** for a specific input instance (or specific set of
instances for the average case). In contrast, upper and lower bounds
describe our understanding of the **growth rate** for that cost measure.
So to define the growth rate for an algorithm or problem, we need to
determine what we are measuring (the best, worst, or average case) and
also our description for what we know about the growth rate of that cost
measure (big-Oh, $\Omega$, or $\Theta$).

The upper bound for an algorithm is not the same as the worst case for
that algorithm for a given input of size $n$. What is being bounded is
not the actual cost (which you can determine for a given value of $n$),
but rather the **growth rate** for the cost. There cannot be a growth
rate for a single point, such as a particular value of $n$. The growth
**rate** applies to the **change** in cost as a **change** in input size
occurs. Likewise, the lower bound is not the same as the best case for a
given size $n$.

Another common misconception is thinking that the best case for an
algorithm occurs when the input size is as small as possible, or that
the worst case occurs when the input size is as large as possible. What
is correct is that best- and worse-case instances exist for each
possible size of input. That is, for all inputs of a given size, say
$i$, one (or more) of the inputs of size $i$ is the best and one (or
more) of the inputs of size $i$ is the worst. Often (but not always!),
we can characterize the best input case for an arbitrary size, and we
can characterize the worst input case for an arbitrary size. Ideally, we
can determine the growth rate for the characterized best, worst, and
average cases as the input size grows.

::: topic
#### Example {-}

What is the growth rate of the best case for sequential search? For any
array of size $n$, the best case occurs when the value we are looking
for appears in the first position of the array. This is true regardless
of the size of the array. Thus, the best case (for arbitrary size $n$)
occurs when the desired value is in the first of $n$ positions, and its
cost is 1. It is *not* correct to say that the best case occurs when
$n=1$.
:::

<inlineav id="MisunderstandingsGraphCON" src="AlgAnal/MisunderstandingsGraphCON.js" name="Example's graph Visualization" links="AlgAnal/MisunderstandingsGraphCON.css"/>

<avembed id="MisSumm" src="AlgAnal/MisSumm.html" type="ka" name="Common Misconceptions Exercise"/>
