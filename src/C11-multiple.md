
## Multiple Parameters

Sometimes the proper analysis for an algorithm requires multiple
parameters to describe the cost. To illustrate the concept, consider an
algorithm to compute the rank ordering for counts of all pixel values in
a picture. Pictures are often represented by a two-dimensional array,
and a pixel is one cell in the array. The value of a pixel is either the
code value for the color, or a value for the intensity of the picture at
that pixel. Assume that each pixel can take any integer value in the
range 0 to $C - 1$. The problem is to find the number of pixels of each
color value and then sort the color values with respect to the number of
times each value appears in the picture. Assume that the picture is a
rectangle with $P$ pixels. A pseudocode algorithm to solve the problem
follows.

    // Initialize the counts:
    for i = 0 to C-1:
        count[i] = 0
    // Increment the pixel value count for each of the pixels:
    for i = 0 to P-1:
        count[value(i)] = count[value(i)]+1  
    // Sort the pixel value counts:
    sort(count)

In this example, `count` is an array of size `C` that stores the number
of pixels for each color value. Function `value(i)` returns the color
value for pixel $i$.

The time for the first `for` loop (which initializes `count`) is based
on the number of colors, $C$. The time for the second loop (which
determines the number of pixels with each color) is $\Theta(P)$. The
time for the final line, the call to `sort`, depends on the cost of the
sorting algorithm used. We will assume that the sorting algorithm has
cost $\Theta(P \log P)$ if $P$ items are sorted, thus yielding
$\Theta(P \log P)$ as the total algorithm cost.

Is this a good representation for the cost of this algorithm? What is
actually being sorted? It is not the pixels, but rather the colors. What
if $C$ is much smaller than $P$? Then the estimate of $\Theta(P \log P)$
is pessimistic, because much fewer than $P$ items are being sorted.
Instead, we should use $P$ as our analysis variable for steps that look
at each pixel, and $C$ as our analysis variable for steps that look at
colors. Then we get $\Theta(C)$ for the initialization loop, $\Theta(P)$
for the pixel count loop, and $\Theta(C \log C)$ for the sorting
operation. This yields a total cost of $\Theta(P + C \log C)$.

Why can we not simply use the value of $C$ for input size and say that
the cost of the algorithm is $\Theta(C \log C)$? Because, $C$ is
typically much less than $P$. For example, a picture might have 1000
$\times$ 1000 pixels and a range of 256 possible colors. So, $P$ is one
million, which is much larger than $C \log C$. But, if $P$ is smaller,
or $C$ larger (even if it is still less than $P$), then $C \log C$ can
become the larger quantity. Thus, neither variable should be ignored.
