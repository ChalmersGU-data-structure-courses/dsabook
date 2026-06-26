
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Running time

In this quiz you will give the complexity of some code fragments.
Note that you should answer with the tightest possible growth factor,
so it's not correct if you answer $O(n^2)$ when the fragment is $O(n)$.

:::::::::: question ::::::::::
Determine $O$ for the following code fragment.
Assume that all variables are integers.

    a = b + c
    d = a + e

- [x] $O(1)$
- [ ] $O(\log(n))$
- [ ] $O(n \log(n))$
- [ ] $O(n)$
- [ ] $O(n^2)$
- [ ] $O(n^2 \log(n))$
- [ ] $O(n^3)$
- [ ] $O(2^n)$

::: hints
- Does any line of code get executed more than once?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $O$ for the following code fragment.
Assume that all variables are integers.

    sum = 0
    for i in 0 .. 2:
        for j in 0 .. n-1:
            sum += 1

- [x] $O(n)$
- [ ] $O(\log(n))$
- [ ] $O(n \log(n))$
- [ ] $O(1)$
- [ ] $O(n^2)$
- [ ] $O(n^2 \log(n))$
- [ ] $O(n^3)$
- [ ] $O(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $O$ for the following code fragment.
Assume that all variables are integers.

    sum = 0
    for i in 0 .. n*n-1:
        sum += 1

- [x] $O(n^2)$
- [ ] $O(\log(n))$
- [ ] $O(n \log(n))$
- [ ] $O(1)$
- [ ] $O(n)$
- [ ] $O(n^2 \log(n))$
- [ ] $O(n^3)$
- [ ] $O(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the for loop executed? Multiply this by the amount of work done by the body.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $O$ for the following code fragment.
Assume that all variables are integers.

    for i in 0 .. n-2:
        for j in i+1 .. n-1:
            tmp = AA[i][j]
            AA[i][j] = AA[j][i]
            AA[j][i] = tmp

- [x] $O(n^2)$
- [ ] $O(\log(n))$
- [ ] $O(n \log(n))$
- [ ] $O(1)$
- [ ] $O(n)$
- [ ] $O(n^2 \log(n))$
- [ ] $O(n^3)$
- [ ] $O(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $O$ for the following code fragment.
Assume that all variables are integers.

    sum = 0
    for i in 1 .. n:
        j = 1
        while j <= n:
            sum += 1
            j = j * 2


- [x] $O(n \log(n))$
- [ ] $O(\log(n))$
- [ ] $O(n^2)$
- [ ] $O(1)$
- [ ] $O(n)$
- [ ] $O(n^2 \log(n))$
- [ ] $O(n^3)$
- [ ] $O(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $O$ for the following code fragment.
Assume that all variables are integers.

    sum = 0
    i = 1
    while i <= n:
        for j in 1 .. n:
            sum += 1
        i = i * 2

- [x] $O(n \log(n))$
- [ ] $O(\log(n))$
- [ ] $O(n^2)$
- [ ] $O(1)$
- [ ] $O(n)$
- [ ] $O(n^2 \log(n))$
- [ ] $O(n^3)$
- [ ] $O(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $O$ for the following code fragment.
Assume that all variables are integers.

Assume that array `arr` contains $n$ values, "random" takes constant time,
and "sort" takes $n \log(n)$ time.

    sum = 0
    for i in 0 .. n-1:
        for j in 0 .. n-1:
            arr[j] = random(n)
        sort(arr)

- [x] $O(n^2 \log(n))$
- [ ] $O(\log(n))$
- [ ] $O(n^2)$
- [ ] $O(1)$
- [ ] $O(n)$
- [ ] $O(n \log(n))$
- [ ] $O(n^3)$
- [ ] $O(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $O$ for the following code fragment.
Assume that all variables are integers.

Assume array `arr` contains a random permutation of the values from 0 to $n-1$.

    sum = 0
    for i in 0 .. n-1:
        j = 0
        while arr[j] != i:
            sum += 1
            j += 1

- [x] $O(n^2)$
- [ ] $O(\log(n))$
- [ ] $O(n^2 \log(n))$
- [ ] $O(1)$
- [ ] $O(n)$
- [ ] $O(n \log(n))$
- [ ] $O(n^3)$
- [ ] $O(2^n)$

::: hints
- How much work is done by the body of the inner for loop?
- How many times is the inner for loop executed? Multiply this by the amount of work done by the body.
- How many times is the outer for loop executed? Multiply this by the amount of work done by the inner for loop.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine $O$ for the following code fragment.
Assume that all variables are integers.

    sum = 0
    if EVEN(n):
        for i in 0 .. n-1:
            sum += 1
    else:
        sum += n

- [x] $O(n)$
- [ ] $O(\log(n))$
- [ ] $O(n^2 \log(n))$
- [ ] $O(1)$
- [ ] $O(n^2)$
- [ ] $O(n \log(n))$
- [ ] $O(n^3)$
- [ ] $O(2^n)$

::: hints
- How much work is done by each branch of the if-then-else statement? Use the more expensive one.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

