/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Insertion Sort Best Case
$(document).ready(function() {
  "use strict";
  var av_name = "InsertionSortBestCaseCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "Now we will consider the best case cost.",
    "sc2": "The best case of insertion sort occurs when the array values are already in order from lowest to highest, as shown.",
    "sc3": "Every test on the inner for loop will fail immediately, and no values will be moved.",
    "sc4": "The total number of comparisons will be $n-1$, which is the number of times the outer for loop executes.",
    "sc5": "Therefore, the best case running time of insertion sort is $\\theta(n)$."
  };

  var pseudo = av.code([
    "function insertionSort(A):",
    "    for i in 1 ... length(A)-1:",
    "        j = i",
    "        while j > 0 and A[j] < A[j-1]:",
    "            swap(A, j, j-1)",
    "            j = j-1",
  ], {lineNumbers: false,
      tags: {
        "sig": 1,
        "outloop": 2,
        "inloop": 4,
        "swap": 5,
        "end": 6
      },
  });

  var leftAlign = 320;
  var topAlign = 230;
  var rectWidth = 50;
  var rectHeight = 20;
  var labelGap = 5;


  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  av.ds.array([1, 2, 3, 4, 5, 6], {left: 10, top: 150, indexed: true});
  av.step();

  // Slide3
  pseudo.show();
  av.umsg(interpret["sc3"]);
  pseudo.highlight("inloop");
  av.step();

  // Slide4
  av.umsg(interpret["sc4"]);
  pseudo.unhighlight("inloop");
  pseudo.highlight("outloop");
  av.g.rect(leftAlign, topAlign, 50, 20);
  av.label("$i=1$",  {top: "240px", left: 330});
  av.g.rect(leftAlign + rectWidth, topAlign, 50, 20);
  av.label("$i=2$",  {top: "240px", left: "380px"});
  av.g.rect(leftAlign + 2 * rectWidth, topAlign, 50, 20);
  av.label("$i=3$",  {top: "240px", left: "430px"});
  av.g.rect(leftAlign + 3 * rectWidth, topAlign, 50, 20);
  av.label("$i=4$",  {top: "240px", left: "480px"});
  av.g.rect(leftAlign + 4 * rectWidth, topAlign, 50, 20);
  av.label("$i=5$",  {top: "240px", left: "530px"});

  //Horizontal Line
  av.g.line(leftAlign, 3 * rectHeight + topAlign,
            leftAlign + 2 * rectWidth,
            3 * rectHeight + topAlign,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.g.line(leftAlign + 3 * rectWidth,
            3 * rectHeight + topAlign, leftAlign + 5 * rectWidth,
            3 * rectHeight + topAlign,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign, 2.5 * rectHeight + topAlign,
            leftAlign, 3.5 * rectHeight + topAlign);
  av.g.line(leftAlign + 5 * rectWidth, 2.5 * rectHeight + topAlign,
            leftAlign + 5 * rectWidth, 3.5 * rectHeight + topAlign);
  av.label("$n - 1$",
           {top: topAlign + 1.5 * rectHeight,
             left: leftAlign + 2 * rectWidth + labelGap});
  av.step();

  //Slide 5
  av.umsg(interpret["sc5"]);
  pseudo.unhighlight("outloop");
  av.recorded();
});
