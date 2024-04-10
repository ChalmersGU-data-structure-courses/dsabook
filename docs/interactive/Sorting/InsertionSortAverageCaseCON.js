/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Insertion Sort Average Case
$(document).ready(function() {
  "use strict";
  var av_name = "InsertionSortAverageCaseCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "Finally, consider the average case cost.",
    "sc2": "When record $i$ is processed, the number of times through the inner for loop depends on how far out of order the record is.",
    "sc3": "The inner for loop is executed once for each value greater than the value of record $i$ that appears in positions $0$ to $i-1$.",
    "sc4": "To calculate the average cost, we want to determine what is the average number of inversions will be for the record in position $i$.",
    "sc5": "This could be 0, or 1, or 2, or anything up to $i$. On average, it is $i/2$ positions out of order.",
    "sc6": "And since this had to be done for the records from $1$ to $n-1$, then we have the total cost as:",
    "sc7": "This can be solved as:",
    "sc8": "Therefore, the average case running time of insertion sort is $\\Theta(n^2)$."
  };

  var pseudo = av.code([
    "def insertionsort(A):",
    "    for i in range(len(A)):  # Insert i'th record",
    "        j = i",
    "        while j > 0 and A[j] < A[j-1]:",
    "            swap(A, j, j-1)",
    "            j -= 1",
  ], {lineNumbers: false,
      tags: {
        "sig": 1,
        "outloop": 2,
        "inloop": 4,
        "swap": 5,
        "end": 6
      },
  });

  var arr;
  var leftAlign = 300;
  var topAlign = 0;
  var labelGap = 5;

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  pseudo.show();
  av.umsg(interpret["sc2"]);
  arr = av.ds.array(["0", "1", "...", "i-1", "i", "...", "n-1"], {left: leftAlign, top: topAlign, indexed: false});
  pseudo.highlight("loop2");
  arr.highlight(4);
  av.step();

  //Slide 3
  av.umsg(interpret["sc3"]);
  arr.addClass([0, 1, 2, 3], "greenbg");
  av.step();

  //Slide 4
  av.umsg(interpret["sc4"]);
  pseudo.unhighlight("loop2");
  av.step();

  //Slide 5
  av.umsg(interpret["sc5"]);
  av.step();

  //Slide 6
  av.umsg(interpret["sc6"]);
  var eq = av.label("$\\displaystyle\\sum_{i=1}^{n-1}\\frac{i}{2}$", {top: "0px", left: "15px"}).addClass("mediumLabel");

  //Horizontal Line
  av.g.line(leftAlign, topAlign + 70,
            leftAlign + 75, topAlign + 70,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.g.line(leftAlign + 135, topAlign + 70,
            leftAlign + 210, topAlign + 70,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign, topAlign + 60,
            leftAlign, topAlign + 80);
  av.g.line(leftAlign + 210, topAlign + 60,
            leftAlign + 210,  topAlign + 80);
  av.label("$n - 1$",
           {top: topAlign + 40,
             left: leftAlign + 80 + labelGap});

  pseudo.highlight("loop1");
  arr.unhighlight(4);
  arr.removeClass([0, 1, 2, 3], "greenbg");
  av.step();

  //Slide 7
  av.umsg(interpret["sc7"]);
  eq.hide();
  av.label("$\\displaystyle\\sum_{i=1}^{n-1}\\frac{i}{2} = \\frac{n(n+1)}{4}$", {top: "0px", left: "15px"}).addClass("mediumLabel");
  av.step();

  //Slide 8
  av.umsg(interpret["sc8"]);
  pseudo.unhighlight("loop2");
  av.recorded();
});
