/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Linear Recurrences
$(document).ready(function() {
  "use strict";
  var av_name = "BsearchDandCRecurCON";

  var interpret = {
    "sc1": "To find the cost of binary search in the worst case, we can model the running time as a recurrence and then find the closed-form solution. Each recursive call to <tt>binarySearch</tt> cuts the size of the array approximately in half, so we can model the worst-case cost as follows, assuming for simplicity that <em>n</em> is a power of two.<br><em>O(n) = O(n/2) + 1, O(1) = 1</em>",
    "sc2.1": "If we expand the recurrence, we will find that we can do so only <em>log(n)</em> times before we reach the base case, and each expansion adds one to the cost. For a problem of size <em>n</em>, we have <em>1</em> unit of work plus the amount of work required for one subproblem of size <em>n/2</em>",
    "sc2.2": "<br> <em>O(n) = 1 + O(n/2)</em>",
    "sc3.1": "For a problem of size <em>n/2</em>, we have <em>1</em> unit of work plus the amount of work required for one subproblem of size <em>n/4</em>",
    "sc3.2": "<br> <em>O(n) = 1 + (1 + O(n/4))</em>",
    "sc4.1": "For a problem of size <em>n/4</em>, we have <em>1</em> unit of work plus the amount of work required for one subproblem of size <em>n/8</em>",
    "sc4.2": "<br> <em>O(n) = 1 + (1 + (1 + O(n/8)))</em>",
    "sc5.1": "For a problem of size <em>n/8</em>, we have <em>1</em> unit of work plus the amount of work required for one subproblem of size <em>n/16</em>",
    "sc5.2": "<br> <em>O(n) = 1 + (1 + (1 + (1 + O(n/16)))</em>",
    "sc6.1": "This pattern will continue till we reach a subproblem of size <em>1</em>",
    "sc6.2": "<br> <em>O(n) = 1 + (1 + (1 + (1 + (1 + (...))))</em>",
    "sc7": "Thus, the closed form solution of <em>O(n) = O(n/2) + 1</em> can be modeled by the summation <em>&Sigma;<sub>i&lt;log(n)</sub> 1</em>",
    "sc8": "Finally, we have the closed form solution of <em>O(n) = O(n/2) + 1; O(1) = 1</em> evaluates to <em>log(n) + 1</em> or <em>O(log(n))</em>"
  };

  var av;
  var graph;
  var leftAlign = 10;
  var topAlign = 0;
  var nodeGap = 50;
  var nodeHeight = 40;
  var nodeWidth = 40;

  av = new JSAV(av_name);

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2.1"]);
  av.umsg(interpret["sc2.2"], {preserve: true});
  graph = av.ds.graph({left: leftAlign, top: topAlign, layout: "manual", directed: false});
  var n = graph.addNode("n", {left: leftAlign, top: topAlign});
  var nOverTwo = graph.addNode("n/2", {left: leftAlign + nodeWidth + nodeGap, top: topAlign});
  var oneTwo = graph.addEdge(n, nOverTwo, {weight: "<b>1 +</b>"});
  n.highlight();
  oneTwo.addClass("subProblemEdge");
  nOverTwo.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 3
  av.umsg(interpret["sc3.1"]);
  av.umsg(interpret["sc3.2"], {preserve: true});
  var nOverFour = graph.addNode("n/4", {left: leftAlign + 2 * nodeGap + 2 * nodeWidth, top: topAlign});
  var twoThree = graph.addEdge(nOverTwo, nOverFour, {weight: "<b>1 +</b>"});
  n.unhighlight();
  nOverTwo.removeClass("subProblemNode");
  nOverTwo.highlight();
  oneTwo.removeClass("subProblemEdge");
  twoThree.addClass("subProblemEdge");
  nOverFour.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 4
  av.umsg(interpret["sc4.1"]);
  av.umsg(interpret["sc4.2"], {preserve: true});
  var nOverEight = graph.addNode("n/8", {left: leftAlign + 3 * nodeGap + 3 * nodeWidth, top: topAlign});
  var threeFour = graph.addEdge(nOverFour, nOverEight, {weight: "<b>1 +</b>"});
  nOverTwo.unhighlight();
  nOverFour.highlight();
  twoThree.removeClass("subProblemEdge");
  threeFour.addClass("subProblemEdge");
  nOverEight.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 5
  av.umsg(interpret["sc5.1"]);
  av.umsg(interpret["sc5.2"], {preserve: true});
  var nOverSixteen = graph.addNode("n/16", {left: leftAlign + 4 * nodeGap + 4 * nodeWidth, top: topAlign});
  var fourFive = graph.addEdge(nOverEight, nOverSixteen, {weight: "<b>1 +</b>"});
  nOverFour.unhighlight();
  nOverFour.removeClass("subProblemNode");
  nOverEight.highlight();
  threeFour.removeClass("subProblemEdge");
  fourFive.addClass("subProblemEdge");
  nOverSixteen.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 6
  av.umsg(interpret["sc6.1"]);
  av.umsg(interpret["sc6.2"], {preserve: true});
  var last = graph.addNode("1", {left: leftAlign + 6 * nodeGap + 6 * nodeWidth, top: topAlign});
  graph.layout();
  var lastEdge = av.g.line(leftAlign + 4 * nodeGap + 5.25 * nodeWidth + 3,
                           topAlign + nodeHeight - 3,
                           leftAlign + 5 * nodeGap + 5.25 * nodeWidth + 93,
                           topAlign + nodeHeight - 3);
  lastEdge.addClass("dashed");
  nOverEight.unhighlight();
  nOverEight.removeClass("subProblemNode");
  fourFive.removeClass("subProblemEdge");
  nOverSixteen.removeClass("subProblemNode");
  last.addClass("subProblemNode");
  av.step();

  //Slide 7
  av.umsg(interpret["sc7"]);
  last.removeClass("subProblemNode");
  av.g.line(leftAlign + nodeWidth - 7, topAlign + nodeHeight * 2,
            leftAlign + 2.9 * (nodeGap + nodeWidth), topAlign + nodeHeight * 2,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.g.line(leftAlign + 3.8 * (nodeGap + nodeWidth),
            topAlign + nodeHeight * 2, leftAlign + 6.35 * (nodeGap + nodeWidth),
            topAlign + nodeHeight * 2,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign + 6.35 * (nodeGap + nodeWidth), topAlign + 65,
            leftAlign + 6.35 * (nodeGap + nodeWidth), topAlign + 95);
  av.g.line(leftAlign + 6.35 * (nodeGap + nodeWidth), topAlign + 65,
            leftAlign + 6.35 * (nodeGap + nodeWidth), topAlign + 95);
  av.g.line(leftAlign + nodeWidth - 7, topAlign + 65,
            leftAlign + nodeWidth - 7, topAlign + 95);
  av.label("<em>&Sigma;<sub>i&lt;log(n)</sub> 1</em>",
           {top: topAlign + nodeHeight * 1.3,
             left: leftAlign + 3 * (nodeGap + nodeWidth)});

  av.step();

  //Slide 8
  av.umsg(interpret["sc8"]);
  av.step();

  av.recorded();
});
