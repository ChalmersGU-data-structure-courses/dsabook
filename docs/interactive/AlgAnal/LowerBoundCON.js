/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Lower Bounds definition
$(document).ready(function() {
  "use strict";
  var av_name = "LowerBoundCON";

  var interpret = {
    "sc1": "A mistake that people can make is to confuse the lower bound and the best case. In general, people find lower bounds confusing, in part because for simple algorithms, they look just like the upper bound. Let's try to figure this out.",
    "sc2": "The lower bound of an algorithm indicates the least amount of a resource that the algorithm needs for a problem of size $n$. So what is the lower bound of the sequential search algorithm?",
    "sc3": "<br>Remember, this is not the correct way to ask the question since we have three cases that affect the running time of the algorithm: the best, worst, and average cases.", 
    "sc4": "In the best case of the algorithm, only a single element is visited. $T(n) = 1$.<br>So, $\\Omega(1)$ is a lower bound for the algorithm in the best case, because 1 is less than or equal to the number of elements that we look at.",
    "sc5": "In the worst case of the algorithm, $n$ elements are visited. $T(n) = n$.<br>So, $\\Omega(n)$ is a lower bound for the cost of the algorithm in the worst case because the worst case must <b>always</b> must look at $n$ records.",
    "sc6": "Likewise, in the average case we visit about $n/2$ elements.<br>So, $\\Omega(n)$ is a lower bound for the cost of the algorithm in the average case because for some constant $c$, $cn$ is less than or equal to the average case cost of $n/2$.",
    "sc7": "To summarize: What is the lower bound of sequential search in the best/average/worst case?",
    "sc8": "But this is confusing. How is the lower bound different from the upper bound?",
    "sc9": "<br>Well, in this case we have perfect understanding about the cost of this simple algorithm. So they are not different. The upper and lower bound will only be different when we are describing what we know about an algorithm that we don't know the exact cost for.",
    "sc10": "But, we do have a shorthand that we use to say that we know the upper and lower bounds match. That is to say that the cost is $\\Theta$ some value. Sequential search has worst case cost $\\Theta(n)$ because its upper and lower bounds are the same. Likewise, sequential search has a best case cost of $\\Theta(1)$.",
    "lab1": "$\\Omega(1)$ in the <b><u>Best Case.</u></b>",
    "lab2": "$\\Omega(n)$ in the <b><u>Worst Case</u></b>.",
    "lab3": "$\\Omega(n)$ in the <b><u>Average Case</u></b>."
  };

  var av = new JSAV(av_name);
  var arr;
  var arr_values = [];
  var topAlign = 40;
  var leftAlign = 10;
  var arraySize = 7;
  var i;

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  var nLine1 = av.g.line(leftAlign + 10, topAlign, leftAlign + 155, topAlign,
                         {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  var nLabel = av.label("$n$", {top: topAlign - 30, left: leftAlign + 165});
  var nLine2 = av.g.line(leftAlign + 195, topAlign, leftAlign + 340, topAlign,
                         {"stroke-width": 2, "arrow-end": "classic-wide-long"});
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
  av.umsg(interpret["sc3"], {preserve: true, color: "red"});
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"]);
  var pointer = av.pointer("$K$", arr.index(0));
  arr.addClass(0, "greenbg");
  av.step();

  // Slide 5
  av.umsg(interpret["sc5"]);
  var indices = [];
  pointer.target(arr.index(parseInt(arraySize - 1, 10)));
  for (i = 0; i < parseInt(arraySize, 10); i++) {
    indices[i] = i;
  }
  arr.addClass(indices, "redbg");
  av.step();

  // Slide 6
  av.umsg(interpret["sc6"]);
  arr.removeClass(indices, "redbg");
  pointer.hide();
  arr.unhighlight();
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr.highlight(i);
  }
  av.step();

  // Slide 7
  av.umsg(interpret["sc7"]);
  arr.hide();
  nLabel.hide();
  nLine1.hide();
  nLine2.hide();

  pointer.hide();
  topAlign = 15;
  var arr1 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 25, indexed: true});
  var p1 = av.pointer("$K$", arr1.index(0));
  arr1.addClass([0], "greenbg");
  var l1 = av.label(interpret["lab1"], {left: leftAlign + 395, top: topAlign + 30});
  var arr2 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 135, indexed: true});
  var p2 = av.pointer("$K$", arr2.index(arraySize - 1));
  arr2.addClass(indices, "redbg");
  var l2 = av.label(interpret["lab2"], {left: leftAlign + 395, top: topAlign + 140});
  var arr3 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 245, indexed: true});
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr3.highlight(i);
  }
  var l3 = av.label(interpret["lab3"], {left: leftAlign + 395, top: topAlign + 250});
  av.step();

  av.umsg(interpret["sc8"]);
  arr1.hide();
  arr2.hide();
  arr3.hide();
  p1.hide();
  p2.hide();
  l1.hide();
  l2.hide();
  l3.hide();
  av.step();

  av.umsg(interpret["sc9"], {preserve: true});
  av.step();

  av.umsg(interpret["sc10"]);
  av.recorded();
});
