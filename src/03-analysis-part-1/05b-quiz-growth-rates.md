
### Review questions: Growth rates

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Hardware vendor XYZ Corp. claims that their
latest computer will run 100 times faster than that of their
competitor, Prunes, Inc. If the Prunes, Inc. computer can
execute a program on input of size $n$ in one hour,
what size input can XYZ's computer execute in one hour for an
algorithm whose growth rate is $n^2$?

- [x] $10n$
- [ ] $10$
- [ ] $100$
- [ ] $100n$
- [ ] $n$
- [ ] $n^2$
- [ ] $10n^2$
- [ ] $100n^2$
- [ ] $n+10$
- [ ] $n+100$

::: hints
- If the XYZ Corp. computer runs 100 times faster, then if
the Prunes computer does $S$ computations in an
hour, the XYZ Corp. computer does $100S$
computations in an hour.
- Assume that the Prunes computer can solve a problem size of
at most $P$ in an hour. This means it makes about
$P^2 = S$ computations.
- How much bigger size than $P$ can run in
$100S$, given that the growth rate of the
algorithm on input size $P$ is
$T(P) = P^2$?
- If $P \approx S$, then
$T(10P) = (10P)^2 \approx 100S$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Suppose that a particular algorithm has
time complexity $T(n) = 3 \times 2^n$ and that executing
an implementation of it on a particular machine
takes $t$ seconds for $n$ inputs. Now
suppose that we are presented with a machine that is 64 times as
fast. How many inputs could we process on the new machine
in $t$ seconds?

- [x] $n+6$
- [ ] $6$
- [ ] $3$
- [ ] $3n$
- [ ] $6n$
- [ ] $n^2$
- [ ] $n+3$
- [ ] $64$
- [ ] $64n$

::: hints
- This problem has an exponential growth rate. The behavior
of an exponential growth rate is different from a polynomial growth rate.
- With a polynomial growth rate, a faster computer leads to a
new problem size that is bigger by some factor multiplied by
the original problem size that can done in the same amount of time.
- But with an exponential growth rate, we only get an additive improvement.
- Regardless of the value of $t$, the machine that
is 64 times faster can only do a problem size that is 6
larger in the same amount of time (because $\log 64 = 6$).
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Suppose that a particular algorithm has
time complexity $T(n) = n^2$ and that executing an
implementation of it on a particular machine
takes $t$ seconds for $n$ inputs. Now
suppose that we are presented with a machine that is 64 times as
fast. How many inputs could we process on the new machine
in $t$ seconds? </p>

- [x] $8n$
- [ ] $8$
- [ ] $2^n$
- [ ] $n^2$
- [ ] $8n^2$
- [ ] $64$
- [ ] $64n$
- [ ] $64n^2$

::: hints
- If the slower computer does $S$ computations in
time $t$, then the faster computer does
$64S$ computations in time $t$.
- Assume that the slower computer can solve a problem size of
at most $n$ in time $t$.
This means it makes about
$n^2 = S$ computations.
- How much bigger size than $n$ can run in
$64S$, given that the growth rate of the
algorithm on input size $n$ is
$T(n) = n^2$?
- If $n^2 \approx S$, then
$T(8P) = (8P)^2 \approx 64S$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Suppose that a particular algorithm has
time complexity $T(n) = 8n$ and that executing an
implementation of it on a particular machine
takes $t$ seconds for $n$ inputs. Now
suppose that we are presented with a machine that is 64 times as
fast. How many inputs could we process on the new machine
in $t$ seconds?

- [x] $64n$
- [ ] $8$
- [ ] $2^n$
- [ ] $n^2$
- [ ] $8n^2$
- [ ] $64$
- [ ] $8n$
- [ ] $64n^2$

::: hints
- If the slower computer does $S$ computations in
time $t$, then the faster computer does
$64S$ computations in time $t$.
- Assume that the slower computer can solve a problem size of
at most $n$ in time $t$.
This means it makes about
$8n = S$ computations.
- How much bigger size than $n$ can run in
$64S$, given that the growth rate of the
algorithm on input size $n$ is
$T(n) = 8n$?
- If $8n \approx S$, then
$T(64n) = 64*8n \approx 64S$.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

