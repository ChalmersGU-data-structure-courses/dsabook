/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Insertion Sort Average Case
$(document).ready(function() {
  "use strict";
  var av_name = "InsertionSortAverageCaseCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "Finally, consider the average case cost.",
    "sc2": "When record <em>i</em> is processed, the number of times through the inner for loop depends on how far out of order the record is.",
    "sc3": "The inner for loop is executed once for each value greater than the value of record <em>i</em> that appears in positions <em>0</em> to <em>i–1</em>.",
    "sc4": "To calculate the average cost, we want to determine what is the average number of inversions will be for the record in position <em>i</em>.",
    "sc5": "This could be 0, or 1, or 2, or anything up to <em>i</em>. On average, it is <em>i/2</em> positions out of order.",
    "sc6": "And since this had to be done for the records from <em>1</em> to <em>n–1</em>, then we have the total cost as:",
    "sc7": "This can be solved as:",
    "sc8": "Therefore, the average case running time of insertion sort is <em>O(n<sup>2</sup>)</em>."
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

  var arr;
  var leftAlign = 300;
  var topAlign =150;
  var labelGap = 5;

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  pseudo.show();
  av.umsg(interpret["sc2"]);
  arr = av.ds.array(["0", "1", "...", "i-1", "i", "...", "n-1"], {left: leftAlign, top: topAlign, indexed: false});
  pseudo.highlight("inloop");
  arr.highlight(4);
  av.step();

  //Slide 3
  av.umsg(interpret["sc3"]);
  arr.addClass([0, 1, 2, 3], "greenbg");
  av.step();

  //Slide 4
  av.umsg(interpret["sc4"]);
  pseudo.unhighlight("inloop");
  av.step();

  //Slide 5
  av.umsg(interpret["sc5"]);
  av.step();

  //Slide 6
  av.umsg(interpret["sc6"]);
  var eq = av.label("&Sigma;<em><sub>i&lt;n</sub> i/2</em>", {top: "0px", left: "15px"}).addClass("mediumLabel");

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
  av.label("<em>n–1</em>",
           {top: topAlign + 40,
             left: leftAlign + 80 + labelGap});

  pseudo.highlight("outloop");
  arr.unhighlight(4);
  arr.removeClass([0, 1, 2, 3], "greenbg");
  av.step();

  //Slide 7
  av.umsg(interpret["sc7"]);
  eq.hide();
  av.label("&Sigma;<em><sub>i&lt;n</sub> i/2</em> &nbsp;=&nbsp; <em>n(n+1)/4</em>", {top: "0px", left: "15px"}).addClass("mediumLabel");
  av.step();

  //Slide 8
  av.umsg(interpret["sc8"]);
  pseudo.unhighlight("outloop");
  av.recorded();
});
