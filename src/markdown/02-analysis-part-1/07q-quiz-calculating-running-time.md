
### Practice questions: Running time

::: TODO
- Prio 1: should we use Theta or O()?
    - perhaps just say "complexity" in the question, and O() in the answer?
:::

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Determine $\Theta$ for the following code fragment in the average case.
Assume that all variables are integers.

    a = b + c
    d = a + e

- [x] $\Theta(1)$
- [ ] $\Theta(\log n)$
- [ ] $\Theta(n \log n)$
- [ ] $\Theta(n)$
- [ ] $\Theta(n^2)$
- [ ] $\Theta(n^2 \log n)$
- [ ] $\Theta(n^3)$
- [ ] $\Theta(2^n)$

::: hints
- Does any line of code get executed more than once?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $\Theta$ for the following code fragment in the average case.
Assume that all variables are integers.

    sum = 0
    for i = 0 to 2:
        for j = 0 to n-1:
            sum = sum + 1

- [x] $\Theta(n)$
- [ ] $\Theta(\log n)$
- [ ] $\Theta(n \log n)$
- [ ] $\Theta(1)$
- [ ] $\Theta(n^2)$
- [ ] $\Theta(n^2 \log n)$
- [ ] $\Theta(n^3)$
- [ ] $\Theta(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $\Theta$ for the following code fragment in the average case.
Assume that all variables are integers.

    sum = 0
    for i = 0 to n*n-1:
        sum = sum + 1

- [x] $\Theta(n^2)$
- [ ] $\Theta(\log n)$
- [ ] $\Theta(n \log n)$
- [ ] $\Theta(1)$
- [ ] $\Theta(n)$
- [ ] $\Theta(n^2 \log n)$
- [ ] $\Theta(n^3)$
- [ ] $\Theta(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the for loop executed? Multiply this by the amount of work done by the body.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $\Theta$ for the following code fragment in the average case.
Assume that all variables are integers.

    for i = 0 to n-2:
        for j = i+1 to n-1:
            tmp = AA[i][j]
            AA[i][j] = AA[j][i]
            AA[j][i] = tmp

- [x] $\Theta(n^2)$
- [ ] $\Theta(\log n)$
- [ ] $\Theta(n \log n)$
- [ ] $\Theta(1)$
- [ ] $\Theta(n)$
- [ ] $\Theta(n^2 \log n)$
- [ ] $\Theta(n^3)$
- [ ] $\Theta(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $\Theta$ for the following code fragment in the average case.
Assume that all variables are integers.

    sum = 0
    for i = 1 to n:
        j = 1
        while j <= n:
            sum = sum + 1
            j = j * 2


- [x] $\Theta(n \log n)$
- [ ] $\Theta(\log n)$
- [ ] $\Theta(n^2)$
- [ ] $\Theta(1)$
- [ ] $\Theta(n)$
- [ ] $\Theta(n^2 \log n)$
- [ ] $\Theta(n^3)$
- [ ] $\Theta(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $\Theta$ for the following code fragment in the average case.
Assume that all variables are integers.

    sum = 0
    i = 1
    while i <= n:
        for j = 1 to n:
            sum = sum + 1
        i = i * 2

- [x] $\Theta(n \log n)$
- [ ] $\Theta(\log n)$
- [ ] $\Theta(n^2)$
- [ ] $\Theta(1)$
- [ ] $\Theta(n)$
- [ ] $\Theta(n^2 \log n)$
- [ ] $\Theta(n^3)$
- [ ] $\Theta(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $\Theta$ for the following code fragment in the average case.
Assume that all variables are integers.

Assume that array A contains $n$ values, "random" takes constant time,
and "sort" takes $n \log n$ time.

    sum = 0
    for i = 0 to n-1:
        for j = 0 to n-1:
            A[j] = random(n)
        sort(A)

- [x] $\Theta(n^2 \log n)$
- [ ] $\Theta(\log n)$
- [ ] $\Theta(n^2)$
- [ ] $\Theta(1)$
- [ ] $\Theta(n)$
- [ ] $\Theta(n \log n)$
- [ ] $\Theta(n^3)$
- [ ] $\Theta(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $\Theta$ for the following code fragment in the average case.
Assume that all variables are integers.

Assume array A contains a random permutation of the values from 0 to $n-1$.

    sum = 0
    for i = 0 to n-1:
        j = 0
        while A[j] != i:
            sum = sum + 1
            j = j + 1

- [x] $\Theta(n^2)$
- [ ] $\Theta(\log n)$
- [ ] $\Theta(n^2 \log n)$
- [ ] $\Theta(1)$
- [ ] $\Theta(n)$
- [ ] $\Theta(n \log n)$
- [ ] $\Theta(n^3)$
- [ ] $\Theta(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $\Theta$ for the following code fragment in the average case.
Assume that all variables are integers.

    sum = 0
    if EVEN(n):
        for i = 0 to n-1:
            sum = sum + 1
    else:
        sum = sum + n

- [x] $\Theta(n)$
- [ ] $\Theta(\log n)$
- [ ] $\Theta(n^2 \log n)$
- [ ] $\Theta(1)$
- [ ] $\Theta(n^2)$
- [ ] $\Theta(n \log n)$
- [ ] $\Theta(n^3)$
- [ ] $\Theta(2^n)$

::: hints
- How much work is done by each branch of the if-then-else statement? Use the more expensive one.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

