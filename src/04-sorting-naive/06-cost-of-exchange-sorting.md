
## The cost of exchange sorting

Here is a summary for the cost of Insertion Sort, Bubble Sort, and
Selection Sort in terms of their required number of comparisons and
swaps in the best, average, and worst cases. The running time for each
of these sorts is $\Theta(n^2)$ in the average and worst cases.

|                   |     Insertion     |      Bubble       |     Selection     |
|------------------:|:-----------------:|:-----------------:|:-----------------:|
|  **Comparisons:** |                   |                   |                   |
|         Best case |   $\Theta(n^2)$   |   $\Theta(n^2)$   |   $\Theta(n^2)$   |
|      Average case |   $\Theta(n^2)$   |   $\Theta(n^2)$   |   $\Theta(n^2)$   |
|        Worst case |   $\Theta(n^2)$   |   $\Theta(n^2)$   |   $\Theta(n^2)$   |
|        **Swaps:** |                   |                   |                   |
|         Best case |        $0$        |       $0$         |    $\Theta(n)$    |
|      Average case |   $\Theta(n^2)$   |   $\Theta(n^2)$   |    $\Theta(n)$    |
|        Worst case |   $\Theta(n^2)$   |   $\Theta(n^2)$   |    $\Theta(n)$    |

The remaining sorting algorithms presented in this tutorial are
significantly better than these three under typical conditions. But
before continuing on, it is instructive to investigate what makes these
three sorts so slow. The crucial bottleneck is that only *adjacent*
records are compared. Thus, comparisons and moves (for Insertion and
Bubble Sort) are by single steps. Swapping adjacent records is called an
[exchange]{.term}. Thus, these sorts are
sometimes referred to as an [exchange sort]{.term}. The cost of any exchange sort can be at best the total
number of steps that the records in the array must move to reach their
"correct" location. Recall that this is at least the number of
inversions for the record, where an [inversion]{.term} occurs when a record with key value greater than the
current record's key value appears before it.

<avembed id="FindInversionsPRO" src="Sorting/FindInversionsPRO.html" type="ka" name="Inversions Proficiency Exercise"/>

### Analysis

<inlineav id="ExchangeSortCON" src="Sorting/ExchangeSortCON.js" name="Exchange Sort Analysis Slideshow" links="Sorting/ExchangeSortCON.css"/>

