/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Linear Recurrences
$(document).ready(function() {
  "use strict";
  var av_name = "LinearRecurrencesCON";

  var interpret = {
    "sc1": "We will use expansion to guess the closed form solution for the recurrence <em><b>T</b>(n) = <b>T</b>(n-1) + 1</em> for <em>n > 1; <b>T</b>(0) = <b>T</b>(1) = 0</em>.",
    "sc2.1": "When we expand the recurrence for a problem of size <em>n</em>, we replace the problem of size <em>n</em> with <em>1</em> unit of work plus a subproblem of size <em>n-1</em>:",
    "sc2.2": " <em><b>T</b>(n) = 1 + <b>T</b>(n-1)</em>",
    "sc3.1": "We replace a problem of size <em>n-1</em> with <em>1</em> unit of work plus a subproblem of size <em>n-2</em>",
    "sc3.2": "<br> <em><b>T</b>(n) = 1 + (1 + <b>T</b>(n-2))</em>",
    "sc4.1": "We replace a problem of size <em>n-2</em> with <em>1</em> unit of work plus a subproblem of size <em>n-3</em>",
    "sc4.2": "<br> <em><b>T</b>(n) = 1 + (1 + (1 + <b>T</b>(n-3)))</em>",
    "sc5.1": "We replace a problem of size <em>n-3</em> with <em>1</em> unit of work plus a subproblem of size <em>n-4</em>",
    "sc5.2": "<br> <em><b>T</b>(n) = 1 + (1 + (1 + (1 + <b>T</b>(n-4)))</em>",
    "sc6.1": "This pattern will continue till we reach a subproblem of size <em>1</em>",
    "sc6.2": "<br> <em><b>T</b>(n) = 1 + (1 + (1 + (1 + (1 + (...))))</em>",
    "sc7": "Thus, the closed form solution of <em><b>T</b>(n) = <b>T</b>(n-1) + 1</em> can be modeled by the summation <em>&Sigma;<sub>i=1...n</sub> 11</em>",
    "sc8": "This gives us a closed form solution of <em><b>T</b>(n) = <b>T</b>(n-1) + 1 = n</em>"
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
  graph = av.ds.graph({left: leftAlign, top: topAlign, width: 550, layout: "manual", directed: false});
  var n = graph.addNode("n", {left: leftAlign, top: topAlign});
  var nMinusOne = graph.addNode("n-1", {left: leftAlign + nodeWidth + nodeGap, top: topAlign});
  var oneTwo = graph.addEdge(n, nMinusOne, {weight: "<b>1 +</b>"});
  n.highlight();
  oneTwo.addClass("subProblemEdge");
  nMinusOne.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 3
  av.umsg(interpret["sc3.1"]);
  av.umsg(interpret["sc3.2"], {preserve: true});
  var nMinusTwo = graph.addNode("n-2", {left: leftAlign + 2 * nodeGap + 2 * nodeWidth, top: topAlign});
  var twoThree = graph.addEdge(nMinusOne, nMinusTwo, {weight: "<b>1 +</b>"});
  n.unhighlight();
  nMinusOne.removeClass("subProblemNode");
  nMinusOne.highlight();
  oneTwo.removeClass("subProblemEdge");
  twoThree.addClass("subProblemEdge");
  nMinusTwo.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 4
  av.umsg(interpret["sc4.1"]);
  av.umsg(interpret["sc4.2"], {preserve: true});
  var nMinusThree = graph.addNode("n-3", {left: leftAlign + 3 * nodeGap + 3 * nodeWidth, top: topAlign});
  var threeFour = graph.addEdge(nMinusTwo, nMinusThree, {weight: "<b>1 +</b>"});
  nMinusOne.unhighlight();
  nMinusTwo.highlight();
  twoThree.removeClass("subProblemEdge");
  threeFour.addClass("subProblemEdge");
  nMinusThree.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 5
  av.umsg(interpret["sc5.1"]);
  av.umsg(interpret["sc5.2"], {preserve: true});
  var nMinusFour = graph.addNode("n-4", {left: leftAlign + 4 * nodeGap + 4 * nodeWidth, top: topAlign});
  var fourFive = graph.addEdge(nMinusThree, nMinusFour, {weight: "<b>1 +</b>"});
  nMinusTwo.unhighlight();
  nMinusTwo.removeClass("subProblemNode");
  nMinusThree.highlight();
  threeFour.removeClass("subProblemEdge");
  fourFive.addClass("subProblemEdge");
  nMinusFour.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 6
  av.umsg(interpret["sc6.1"]);
  av.umsg(interpret["sc6.2"], {preserve: true});
  var last = graph.addNode("1", {left: leftAlign + 6 * nodeGap + 6 * nodeWidth, top: topAlign});
  graph.layout();
  var lastEdge = av.g.line(leftAlign + 4 * nodeGap + 5 * nodeWidth + 14,
                           topAlign + nodeHeight - 4,
                           leftAlign + 5 * nodeGap + 5 * nodeWidth + 104,
                           topAlign +  nodeHeight - 4);
  lastEdge.addClass("dashed");
  nMinusThree.unhighlight();
  nMinusThree.removeClass("subProblemNode");
  fourFive.removeClass("subProblemEdge");
  nMinusFour.removeClass("subProblemNode");
  last.addClass("subProblemNode");
  av.step();

  // Slide 7
  last.removeClass("subProblemNode");
  av.umsg(interpret["sc7"]);
  av.g.line(leftAlign + nodeWidth - 7, topAlign + nodeHeight * 2,
            leftAlign + 2.7 * (nodeGap + nodeWidth), topAlign + nodeHeight * 2,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.g.line(leftAlign + 3.55 * (nodeGap + nodeWidth),
            topAlign + nodeHeight * 2, leftAlign + 6.35 * (nodeGap + nodeWidth),
            topAlign + nodeHeight * 2,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign + 6.35 * (nodeGap + nodeWidth), topAlign + 65,
            leftAlign + 6.35 * (nodeGap + nodeWidth), topAlign + 95);
  av.g.line(leftAlign + 6.35 * (nodeGap + nodeWidth), topAlign + 65,
            leftAlign + 6.35 * (nodeGap + nodeWidth), topAlign + 95);
  av.g.line(leftAlign + nodeWidth - 7, topAlign + 65,
            leftAlign + nodeWidth - 7, topAlign + 95);
  av.label("<em>&Sigma;<sub>i=1...n</sub> 1</em>",
           {top: topAlign + nodeHeight * 1.15,
             left: leftAlign + 3 * (nodeGap + nodeWidth)});
  av.step();

  // Slide 8
  av.umsg(interpret["sc8"]);
  av.recorded();
});
