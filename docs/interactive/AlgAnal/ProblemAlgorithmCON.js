/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Problem, Algorithm, and program definitions
$(document).ready(function() {
  "use strict";
  var av_name = "ProblemAlgorithmCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "Here is a visual summary showing how to differentiate between a problem, a problem instance, an algorithm, and a program.",
    "sc2": "A problem is a task that matches input to output. Consider the problem of searching for an element in an unsorted array.",
    "sc3": "Here, we have: <br><b><u>Input:</u></b> An array, and the target key.",
    "sc4": "<br><b><u>Output:</u></b> The index of the target element if it is found, or the size of the array if not found.",
    "sc5": "<br><br>We show the searching problem as a 'black box'. In this context, we don't need to know how a search is actually performed.",
    "sc6": "A problem instance is a specific selection of values for the problem input.",
    "sc7": "<br><br> Here we see an example of a searching problem instance in which we have initialized the array and we have a value for the target key.",
    "sc8": "An algorithm is a recipe or a specific way of mapping problem input to output.",
    "sc9": "<br><br> An algorithm takes a problem instance as its input.",
    "sc10": "<br><br>Then a series of steps is performed to generate the output.",
    "sc11": "There are several different algorithms that can solve a particular problem. For the searching problem, here we present pseudocode for the sequential search algorithm.",
    "sc12": "<br><br> The sequential search algorithm simply loops through all the keys in the array until the target key is found in (which case the index is returned). If its not there, then the array size is returned.",
    "sc13": "A program is an instantiation of a particular algorithm that solves a particular problem, implemented in some programming language.",
    "sc14": "<br><br>A program accepts a problem instance as an input.",
    "sc15": "<br><br>Then the program is executed to generate the output.",
    "sc16": "Here we present the sequential search algorithm implemented as a Java function.",
    "lab1": "Searching Problem",
    "lab2": "Algorithm",
    "lab3": "Program",
    "lab4": "Target key",
    "lab5": "Found",
    "lab6": "Not found",
    "lab7": "Index of the target key",
    "lab8": "Index = 3"
};

  var pseudo = av.code([
    "// Return the position of an element in a list.",
    "// If the element is not found, return -1.",
    "sequentialSearch(elements:E[], e:E) : integer",
    "    for i = 1, 2, ..., size of elements - 1 // For each element",
    "        if elements[i] == e                 // if we found it",
    "            return i                        // return its position",
    "    return -1                               // Otherwise, return -1",
  ], {lineNumbers: false}).hide();

  var javaCode = av.code([
    "static int sequential(int[] A, int K) {",
    "    for (int i=0; i<A.length; i++) ",
    "        if (A[i] == K)",
    "            return i;",
    "    return A.length;",
    "}",
  ], {lineNumbers: false}).hide();
  
  var arr;
  var arr_values = [];
  var topAlign = 60;
  var leftAlign = 10;
  var rectWidth = 170;
  var rectHeight = 225;

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  var rect = av.g.rect(leftAlign + 380, topAlign - 25, rectWidth, rectHeight);
  var labelProblem = av.label(interpret["lab1"],
                              {top: topAlign - 20, left: leftAlign + 385}).addClass("codeLabel");
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  for (var i = 0; i < 6; i++) {
    arr_values.push("Key " + (i + 1));
  }
  arr = av.ds.array(arr_values, {left: leftAlign, top: topAlign, indexed: true});
  var labelInput = av.label(interpret["lab4"], {top: topAlign + 92, left: leftAlign + 215}).addClass("largeLabel");
  var line1 = av.g.line(leftAlign + 320, topAlign + 30, leftAlign + 380, topAlign + 30);
  var line2 = av.g.line(leftAlign + 320, topAlign + 125, leftAlign + 380, topAlign + 125);
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"], {preserve: true});
  var lineOutput1 = av.g.line(leftAlign + 380 + rectWidth, topAlign + 50,
                              leftAlign + 475 + rectWidth, topAlign + 50);
  var lineOutput2 = av.g.line(leftAlign + 380 + rectWidth, topAlign + 115,
                              leftAlign + 475 + rectWidth, topAlign + 115);
  var labelOutput1 = av.label(interpret["lab5"],
                              {top: topAlign + 12,
                                left: leftAlign + 385 + rectWidth});
  var labelOutput2 = av.label(interpret["lab6"],
                              {top: topAlign + 105,                                                            left: leftAlign + 385 + rectWidth});
  var labelOutput3 = av.label(interpret["lab7"],
                              {top: topAlign + 22,
                                left: leftAlign + 490 + rectWidth});
  var labelOutput4 = av.label("$n$", {top: topAlign + 95, left: leftAlign + 490 + rectWidth});
  av.step();

  // Slide 5
  av.umsg(interpret["sc5"], {preserve: true});
  rect.css({opacity: 0.2, fill: "green"});
  av.step();

  // Slide 6
  av.umsg(interpret["sc6"]);
  rect.hide();
  rect = av.g.rect(leftAlign + 380, topAlign - 25, rectWidth, rectHeight);
  av.step();

  // Slide 7
  av.umsg(interpret["sc7"], {preserve: true});
  var count = 0;
  while (count < 6) {
    var value = Math.round(Math.random() * 10 + 1);
    if (arr_values.indexOf(value) === -1) {
      arr_values[count] = value;
      count++;
    }
  }
  arr.hide();
  arr = av.ds.array(arr_values, {left: leftAlign, top: topAlign, indexed: true});
  labelInput.text("");
  labelInput = av.label(interpret["lab4"] + " = " + arr_values[3],
                        {top: topAlign + 92, left: leftAlign + 180}).addClass("largeLabel");
  labelOutput2.hide();
  labelOutput4.hide();
  lineOutput2.hide();
  labelOutput3.text(interpret["lab8"]);
  arr.highlight(3);
  av.step();

  // Slide 8
  av.umsg(interpret["sc8"]);
  labelProblem.text(interpret["lab2"]);
  labelProblem.css({top: "-=0", left: "+=30"});
  labelOutput1.hide();
  labelOutput3.hide();
  lineOutput1.hide();
  arr.unhighlight(3);
  arr.hide();
  line1.hide();
  line2.hide();
  labelInput.hide();
  av.step();

  // Slide 9
  av.umsg(interpret["sc9"], {preserve: true});
  arr.show();
  line1.show();
  line2.show();
  labelInput.show();
  av.step();

  // Slide 10
  av.umsg(interpret["sc10"], {preserve: true});
  av.step();

  // Slide 11
  av.umsg(interpret["sc11"]);
  av.step();

  // Slide 12
  av.umsg(interpret["sc12"], {preserve: true});
  pseudo.show();
  rect.css({width: rectWidth + 65});
  labelProblem.css({left: "+=35"});
  labelOutput1.css({left: "+=65"});
  labelOutput3.css({left: "+=65"});
  lineOutput1 = av.g.line(leftAlign + 445 + rectWidth, topAlign + 50, leftAlign + 545 + rectWidth, topAlign + 50);
  labelOutput1.show();
  labelOutput3.show();
  lineOutput1.show();
  arr.highlight(3);
  av.step();

  // Slide 13
  av.umsg(interpret["sc13"]);
  labelProblem.text(interpret["lab3"]);
  labelProblem.css({top: "-=0", left: "+=5"});
  labelOutput1.hide();
  labelOutput3.hide();
  lineOutput1.hide();
  arr.unhighlight(3);
  arr.hide();
  line1.hide();
  line2.hide();
  labelInput.hide();
  pseudo.hide();
  av.step();

  // Slide 14
  av.umsg(interpret["sc14"], {preserve: true});
  labelInput.show();
  line1.show();
  line2.show();
  arr.show();
  av.step();

  // Slide 15
  av.umsg(interpret["sc15"], {preserve: true});
  av.step();

  // Slide 16
  av.umsg(interpret["sc16"]);
  javaCode.show();
  rect.css({width: rectWidth + 98});
  labelProblem.css({left: "+=15"});
  lineOutput1.hide();
  lineOutput1 = av.g.line(leftAlign + 477 + rectWidth, topAlign + 50, leftAlign + 545 + rectWidth, topAlign + 50);
  labelOutput1.css({left: "+=35"});
  lineOutput1.show();
  labelOutput1.show();
  labelOutput3.show();
  arr.highlight(3);
  av.recorded();
});
