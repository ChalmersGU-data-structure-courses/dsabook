/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Best, Worst, Average Cases definitions
$(document).ready(function() {
  "use strict";
  var av_name = "AnalCasesDiffCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "For some algorithms, different inputs of a given size require different amounts of time. For example, consider the problem of searching an array containing $n$ integers to find the one with a particular value $K$ (assume that $K$ appears exactly once in the array).",
    "sc2": "The algorithm accepts as its input an array of $n$ keys and the target key $K$ to search for.",
    "sc3": "The sequential search algorithm begins at the first position in the array and looks at each value in turn until $K$ is found. Once $K$ is found, the algorithm stops. This is different from the largest-value sequential search algorithm, which always examines every array value.",
    "sc4": "There is a wide range of possible running times for the sequential search algorithm. The first integer in the array could have value $K$, and so only one integer is examined.",
    "sc5": "In this case the running time is short. This is the <b>best case</b> for this algorithm, because it is not possible for sequential search to look at less than one value. In this case the sequencial search algorithm will find $K$ at the first comparison.",
    "sc6": "<br>After that the algorithm will terminate, returning 0 as the target's index.",
    "sc7": "Alternatively, if the last position in the array contains $K$, then the running time is relatively long, because the algorithm must examine $n$ values.",
    "sc8": "<br>This is the <b>worst case</b> for this algorithm, because sequential search never looks at more than each of the $n$ values in the array.",
    "sc9": "If we implement sequential search as a program and run it many times on many different arrays of size $n$, or search for many different values of $K$ within the same array, we expect the algorithm on average to go halfway through the array before finding the value we seek.",
    "sc10": "<br>On average, the algorithm examines $\\frac{n+1}{2}$ values. We call this the <b>average case</b> for this algorithm.",
    "sc11": "Putting things all together...",
    "lab1": "Sequential Search",
    "lab2": "<b><u>Best Case.</u></b> A single comparison is performed.",
    "lab3": "<b><u>Worst Case</u></b>. $n$ comparisons are performed.",
    "lab4": "<b><u>Average Case</u></b>. $\\frac{n+1}{2}$ comparisons are performed."
  };

  var pseudo = av.code([
    "// Return the position of an element in a list.",
    "// If the element is not found, return -1.",
    "sequentialSearch(elements:E[], e:E) : integer",
    "    for i = 1, 2, ..., size of elements - 1 // For each element",
    "        if elements[i] == e                 // if we found it",
    "            return i                        // return its position",
    "    return -1                               // Otherwise, return -1",
  ], {lineNumbers: false,
      tags: {
        "comparison": 3,
        "return": 4
      },
  }).hide();

  var arr;
  var arr_values = [];
  var topAlign = 60;
  var leftAlign = 10;
  var rectWidth = 230;
  var rectHeight = 200;
  var arraySize = 7;
  var i;

  // Slide 1
  av.umsg(interpret["sc1"]);
  var rect = av.g.rect(leftAlign + 380, topAlign - 25, rectWidth, rectHeight);
  var label = av.label(interpret["lab1"],  {top: topAlign - 25, left: leftAlign + 420}).addClass("codelabel");
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  var nlabel = av.label("|---------------------------- $n$ ----------------------------|", {left: leftAlign + 25, top: topAlign + 60});
  var count = 0;
  while (count < arraySize) {
    var value = Math.round(Math.random() * 10) + 1;
    if (arr_values.indexOf(value) === -1) {
      arr_values[count] = value;
      count++;
    }
  }
  arr = av.ds.array(arr_values, {left: leftAlign, top: topAlign, indexed: true});
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  pseudo.show();
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"]);
  var pointer = av.pointer("$k$", arr.index(0));
  pseudo.highlight("comparison");
  av.step();

  // Slide 5
  av.umsg(interpret["sc5"]);
  pseudo.unhighlight("comparison");
  pseudo.highlight("return");
  av.step();

  // Slide 6
  av.umsg(interpret["sc6"], {preserve: true});
  var labelOutput = av.label("index = $0$",
                             {top: topAlign + 15, left: leftAlign + 395 + rectWidth});
  arr.addClass([0], "greenbg");
  pseudo.unhighlight("return");
  av.step();

  // Slide 7
  av.umsg(interpret["sc7"]);
  arr.removeClass([0], "greenbg");
  pointer.target(arr.index(arraySize - 1));
  arr.unhighlight(0);
  labelOutput.hide();
  pseudo.highlight("comparison");
  av.step();

  // Slide 8
  av.umsg(interpret["sc8"], {preserve: true});
  pseudo.unhighlight("comparison");
  pseudo.highlight("return");
  var indices = [];
  for (i = 0; i < arr_values.length; i++) {
    indices[i] = i;
  }
  arr.addClass(indices, "redbg");
  labelOutput = av.label("index  = " + (arraySize - 1),
                         {top: topAlign + 15, left: leftAlign + 395 + rectWidth});
  av.step();

  // Slide 9
  av.umsg(interpret["sc9"]);
  pseudo.unhighlight("return");
  arr.removeClass(indices, "redbg");
  pointer.target(arr.index(parseInt(arraySize / 2, 10)));
  arr.unhighlight();
  labelOutput.hide();
  av.step();

  // Slide 10
  av.umsg(interpret["sc10"], {preserve: true});
  pseudo.highlight("comparison");
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr.highlight(i);
  }
  av.step();

  // Slide 11
  av.umsg(interpret["sc11"]);
  rect.hide();
  arr.hide();
  nlabel.hide();
  pointer.hide();
  label.hide();
  pseudo.hide();
  labelOutput.hide();
  topAlign = 15;
  var arr1 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 20, indexed: true});
  av.pointer("$k$", arr1.index(0));
  arr1.addClass([0], "greenbg");
  av.label(interpret["lab2"],  {top: topAlign + 25, left: leftAlign + 395});
  var arr2 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 120, indexed: true});
  av.pointer("$k$", arr2.index(arraySize - 1));
  arr2.addClass(indices, "redbg");
  av.label(interpret["lab3"],  {top: topAlign + 125, left: leftAlign + 395});

  var arr3 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 220, indexed: true});
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr3.highlight(i);
  }
  av.label(interpret["lab4"],  {top: topAlign + 225, left: leftAlign + 395});

  av.recorded();
});
