/*global ODSA,MathJax */
// Written by Mohammed Farghally and Cliff Shaffer
// Expanding a Divide and Conquer Recurrence
$(document).ready(function() {
  "use strict";
  var av_name = "ExpandRecurrenceCON";
  var av;

  var interpret = {
    "sc1": "Let's see how we can determine the closed form solution of <em>T(n) = 2 T(n/2) + 5 n<sup>2</sup>; T(1) = 7</em> by expanding the recurrence. We simplify the process by assuming that <em>n</em> is a power of 2.",
    "sc2.1": "For a problem of size <em>n</em>, we have <em>5 n<sup>2</sup></em> units of work plus the work required for two subproblems of size <em>n/2</em> each.",
    "sc2.2": "<br> <em>T(n) = 5n<sup>2</sup> + 2 T(n/2)</em>",
    "sc3.1": "For each problem of size <em>n/2</em>, we have <em>5 (n/2)<sup>2</sup></em> units of work. Since there are two of them this is a total of <em>5 n<sup>2</sup>/2</em> units. Each problem generates two subproblems, for a total of four subproblems of size <em>n/4</em>.",
    "sc3.2": "<br> <em>T(n) = 5 n<sup>2</sup> + 2 (5 (n/2)<sup>2</sup> + 2 T(n/4))</em>",
    "sc4.1": "For each problem of size <em>n/4</em>, we have <em>5 (n/4)<sup>2</sup></em> units of work. These total to <em>5 n<sup>2</sup>/4</em> units. Each problem of size <em>n/4</em> also now generates two problems of size <em>n/8</em>, for a total of eight of these.",
    "sc4.2": "<br> <em>T(n) = 5 n<sup>2</sup> + 2 (5(n/2)<sup>2</sup> + 2 (5(n/4)<sup>2</sup> + 2 T(n/8)))</em>",
    "sc5.1": "This pattern will continue till we reach a total of <em>n</em> problems of size <em>1</em>, each of which requires <em>7</em> units of work for a total of <em>7n</em> units.",
    "sc5.2": "<br> <em>T(n) = 5 n<sup>2</sup> + 2 (5(n/2)<sup>2</sup> + 2 (5(n/4)<sup>2</sup> + 2 (5(n/8)<sup>2</sup> + 2((...))))</em>",
    "sc6": "We end up having <em>log(n) + 1</em> levels. The amount of work at the last level is  <em>7n</em>. The amount of work at the rest of the levels is modelled by the summation <em>&Sigma;<sub>i&lt;log(n)</sub> 5 n<sup>2</sup> / 2<sup>i</sup></em>",
    "sc7": "Accordingly, the total amount of work is <em>5 n<sup>2</sup> &Sigma;<sub>i&lt;log(n)</sub> 1 / 2<sup>i</sup> + 7n</em>",  
    "sc8": "By substituting the summation <em>&Sigma;<sup>i&lt;log(n)</sup> 1 / 2<sup>i</sup></em> with its closed form <em>2 – 2/n</em>, we will end up having a final closed form of <em>T(n) = 2 T(n/2) + 5 n<sup>2</sup>; T(1) = 7</em> as <em>10n<sup>2</sup> – 3n</em>",
    "sc9": "This is the <b>exact</b> solution to the recurrence when <em>n</em> is a power of two. At this point, we should use a simple induction proof to verify that our solution was indeed calculated correctly."
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
  var root = tree.newNode("<em>n</em>");
  tree.root(root);
  var nOverTwo1 = tree.newNode("<em>n/2</em>");
  var nOverTwo2 = tree.newNode("<em>n/2</em>");
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
  var valueLabel_1 = av.label("<em>5n<sup>2</sup></em>",
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
  var valueLabel_2 = av.label("<em>5 n<sup>2</sup>/2</em>", {top: topAlign + 1.25 * nodeHeight + nodeGap, left: leftAlign + 3 * nodeWidth + labelShift * 5});
  labelSet.push(valueLabel_2);
  var nOverFour1 = tree.newNode("<em>n/4</em>");
  var nOverFour2 = tree.newNode("<em>n/4</em>");
  var nOverFour3 = tree.newNode("<em>n/4</em>");
  var nOverFour4 = tree.newNode("<em>n/4</em>");
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
  labelSet.push(av.label("<em>5 n<sup>2</sup>/4</em>", {top: topAlign + 2.25 * nodeHeight + 2 * nodeGap, left: leftAlign + 8 * nodeWidth + labelShift * 5}));
  var nOverEight1 = tree.newNode("<em>n/8</em>");
  var nOverEight2 = tree.newNode("<em>n/8</em>");
  var nOverEight3 = tree.newNode("<em>n/8</em>");
  var nOverEight4 = tree.newNode("<em>n/8</em>");
  var nOverEight5 = tree.newNode("<em>n/8</em>");
  var nOverEight6 = tree.newNode("<em>n/8</em>");
  var nOverEight7 = tree.newNode("<em>n/8</em>");
  var nOverEight8 = tree.newNode("<em>n/8</em>");
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
  labelSet.push(av.label("<em>7n</em>", {top: topAlign + 4.25 * nodeHeight + 4 * nodeGap, left: leftAlign + 8 * nodeWidth + labelShift * 5}));
  labelSet.push(av.label("---------------------------------------------------------------------------",
                         {top: topAlign + 4.25 * nodeHeight + 4 * nodeGap,
                           left: leftAlign + nodeWidth}));
  var one1 = tree.newNode("<em>1</em>");
  var one2 = tree.newNode("<em>1</em>");
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
  labelSet.push(av.label("|------------ <em>log(n+1)</em> ------------|", {top: topAlign + 3 * nodeHeight + nodeGap, left: leftAlign + 8.5 * nodeWidth + labelShift * 4}).addClass("rotated"));
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
