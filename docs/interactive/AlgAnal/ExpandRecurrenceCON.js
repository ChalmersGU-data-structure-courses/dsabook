/*global ODSA,MathJax */
// Written by Mohammed Farghally and Cliff Shaffer
// Expanding a Divide and Conquer Recurrence
$(document).ready(function() {
  "use strict";
  var av_name = "ExpandRecurrenceCON";
  var av;

  var interpret = {
    "sc1": "Let's see how we can determine the closed form solution of $T(n) = 2T(n/2) + 5n^2, T(1) = 7$ by expanding the recurrence. We simplify the process by assuming that $n$ is a power of 2.",
    "sc2.1": "For a problem of size $n$, we have $5n^2$ units of work plus the work required for two subproblems of size $n/2$ each.",
    "sc2.2": "<br> $T(n) = 5n^2 + 2T(n/2)$",
    "sc3.1": "For each problem of size $n/2$, we have $5(\\frac{n}{2})^2$ units of work. Since there are two of them this is a total of $\\frac{5n^2}{2}$ units. Each problem generates two subproblems, for a total of four subproblems of size $n/4$.",
    "sc3.2": "<br> $T(n) = 5n^2 + 2(5(\\frac{n}{2})^2 + 2T(n/4))$",
    "sc4.1": "For each problem of size $n/4$, we have $5(\\frac{n}{4})^2$ units of work. These total to $\\frac{5n^2}{4}$ units. Each problem of size $n/4$ also now generates two problems of size $n/8$, for a total of eight of these.",
    "sc4.2": "<br> $T(n) = 5n^2 + 2(5(\\frac{n}{2})^2 + 2(5(\\frac{n}{4})^2 + 2T(n/8)))$",
    "sc5.1": "This pattern will continue till we reach a total of $n$ problems of size $1$, each of which requires $7$ units of work for a total of $7n$ units.",
    "sc5.2": "<br> $T(n) = 5n^2 + 2(5(\\frac{n}{2})^2 + 2(5(\\frac{n}{4})^2 + 2(5(\\frac{n}{8})^2 + 2((...))))$",
    "sc6": "We end up having $\\log{n} + 1$ levels. The amount of work at the last level is  $7n$. The amount of work at the rest of the levels is modelled by the summation $\\displaystyle\\sum_{i=0}^{\\log{n}-1}\\frac{5n^2}{2^i}$",
    "sc7": "Accordingly, the total amount of work is $5n^2\\displaystyle\\sum_{i=0}^{\\log{n}-1}\\frac{1}{2^i} + 7n$",  
    "sc8": "By substituting the summation $\\displaystyle\\sum_{i=0}^{\\log{n}-1}\\frac{1}{2^i}$ with its closed form $2-\\frac{2}{n}$, we will end up having a final closed form of $T(n) = 2T(n/2) + 5n^2, T(1) = 7$ as $10n^2 - 3n$",
    "sc9": "This is the <b>exact</b> solution to the recurrence when $n$ is a power of two. At this point, we should use a simple induction proof to verify that our solution was indeed calculated correctly."
};

  var tree;
  var leftAlign = 10;
  var topAlign = 20;
  var nodeGap = 25;
  var nodeHeight = 33;
  var nodeWidth = 45;
  var labelShift = 50;
  var labelSet;

  av = new JSAV(av_name);
  labelSet = new Array();
  typeof MathJax !== 'undefined' && MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"], ["\\(", "\\)"]]}});
  $(".avcontainer").on("jsav-message", function() {
    // invoke MathJax to do conversion again
    typeof MathJax !== 'undefined' && MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  });

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2.1"]);
  av.umsg(interpret["sc2.2"], {preserve: true});
  tree = av.ds.binarytree({left: leftAlign, top: topAlign, nodegap: nodeGap});
  var root = tree.newNode("$n$");
  tree.root(root);
  var nOverTwo1 = tree.newNode("$n/2$");
  var nOverTwo2 = tree.newNode("$n/2$");
  root.addChild(nOverTwo1);
  root.addChild(nOverTwo2);
  tree.layout();
  var workLabel = av.label("<b><u>Amount of Work</u></b>",
                           {top: topAlign - 15, left: leftAlign + 250, After: root});
  labelSet.push(workLabel);
  var dashLabel_n = av.label("----------------------------------",
                             {top: topAlign + 0.25 * nodeHeight,
                               left: leftAlign + nodeWidth + labelShift});
  labelSet.push(dashLabel_n);
  var valueLabel_1 = av.label("$5n^2$",
                              {top: topAlign + 0.25 * nodeHeight,
                                left: leftAlign + nodeWidth + labelShift * 5});
  labelSet.push(valueLabel_1);
  av.step();

  // Slide 3
  av.umsg(interpret["sc3.1"]);
  av.umsg(interpret["sc3.2"], {preserve: true});
  displaceLabels(2 * nodeWidth);
  var dashLabel_n2 = av.label("----------------------",
                              {top: topAlign + 1.25 * nodeHeight + nodeGap,
                                left: leftAlign + nodeWidth + labelShift * 4});
  labelSet.push(dashLabel_n2);
  var valueLabel_2 = av.label("$\\frac{5n^2}{2}$", {top: topAlign + 1.25 * nodeHeight + nodeGap, left: leftAlign + 3 * nodeWidth + labelShift * 5});
  labelSet.push(valueLabel_2);
  var nOverFour1 = tree.newNode("$n/4$");
  var nOverFour2 = tree.newNode("$n/4$");
  var nOverFour3 = tree.newNode("$n/4$");
  var nOverFour4 = tree.newNode("$n/4$");
  nOverTwo1.addChild(nOverFour1);
  nOverTwo1.addChild(nOverFour2);
  nOverTwo2.addChild(nOverFour3);
  nOverTwo2.addChild(nOverFour4);
  tree.layout();
  av.step();

  // Slide 4
  av.umsg(interpret["sc4.1"]);
  av.umsg(interpret["sc4.2"], {preserve: true});
  displaceLabels(5 * nodeWidth);
  labelSet.push(av.label("----------", {top: topAlign + 2.25 * nodeHeight + 2 * nodeGap, left: leftAlign + 7.5 * nodeWidth + labelShift * 4}));
  labelSet.push(av.label("$\\frac{5n^2}{4}$", {top: topAlign + 2.25 * nodeHeight + 2 * nodeGap, left: leftAlign + 8 * nodeWidth + labelShift * 5}));
  var nOverEight1 = tree.newNode("$n/8$");
  var nOverEight2 = tree.newNode("$n/8$");
  var nOverEight3 = tree.newNode("$n/8$");
  var nOverEight4 = tree.newNode("$n/8$");
  var nOverEight5 = tree.newNode("$n/8$");
  var nOverEight6 = tree.newNode("$n/8$");
  var nOverEight7 = tree.newNode("$n/8$");
  var nOverEight8 = tree.newNode("$n/8$");
  nOverFour1.addChild(nOverEight1);
  nOverFour1.addChild(nOverEight2);
  nOverFour2.addChild(nOverEight3);
  nOverFour2.addChild(nOverEight4);
  nOverFour3.addChild(nOverEight5);
  nOverFour3.addChild(nOverEight6);
  nOverFour4.addChild(nOverEight7);
  nOverFour4.addChild(nOverEight8);
  tree.layout();
  av.step();

  // Slide 5
  av.umsg(interpret["sc5.1"]);
  av.umsg(interpret["sc5.2"], {preserve: true});
  //displaceLabels(2 * nodeWidth);

  labelSet.push(av.label("------", {top: topAlign + 4.25 * nodeHeight + 4 * nodeGap, left: leftAlign + 8 * nodeWidth + labelShift * 4}));
  labelSet.push(av.label("$7n$", {top: topAlign + 4.25 * nodeHeight + 4 * nodeGap, left: leftAlign + 8 * nodeWidth + labelShift * 5}));
  labelSet.push(av.label("---------------------------------------------------------------------------",
                         {top: topAlign + 4.25 * nodeHeight + 4 * nodeGap,
                           left: leftAlign + nodeWidth}));
  var one1 = tree.newNode("$1$");
  var one2 = tree.newNode("$1$");
  nOverEight1.left(one1);
  nOverEight8.right(one2);
  var edge1 = one1.edgeToParent();
  var edge2 = one2.edgeToParent();
  edge1.addClass("dashed");
  edge2.addClass("dashed");
  tree.layout();
  av.step();

  // Slide 6
  av.umsg(interpret["sc6"]);
  labelSet.push(av.label("|------------ $\\log{n + 1}$ ------------|", {top: topAlign + 3 * nodeHeight + nodeGap, left: leftAlign + 8.5 * nodeWidth + labelShift * 4 - 20}).addClass("rotated"));
  av.step();

  // Slide 7
  av.umsg(interpret["sc7"]);
  av.step();

  // Slide 8
  av.umsg(interpret["sc8"]);
  av.step();

  // Slide 9
  av.umsg(interpret["sc9"]);
  av.recorded();

  function displaceLabels(offset) {
    $.each(labelSet, function(index, value) {
      var current = value.css("left");
      var currentPos = current.match(/\d+/);
      value.css({left: parseInt(currentPos, 10) + offset});
    });
  }
});
