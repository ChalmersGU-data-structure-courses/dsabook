/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Problem, Algorithm, and program definitions
$(document).ready(function() {
  "use strict";
  var av_name = "AnalCasesSameCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "Consider the problem of finding the factorial of <em>n</em>.",
    "sc2": "For this problem, there is only one input of a given 'size'. That is, there is only a single instance for each size of <em>n</em>.",
    "sc3": "For example, <em>n</em> can take the value of 2",
    "sc4": " or 3",
    "sc5": " or 4.",
    "sc6": "Now consider the largest-value sequential search algorithm, which always examines every array value.",
    "sc7": "This algorithm works on many inputs of a given size <em>n</em>. That is, there are many possible arrays of any given size.",
    "sc8": "<br>For example, we can have an input array of size <em>n = 3</em>",
    "sc9": " or 4",
    "sc10": " or 5. For any given size array, there are many possible values in the array cells.",
    "sc11": "However, no matter what array of size <em>n</em> that the algorithm looks at, its cost will always be the same in that it always looks at every element in the array exactly one time.",
    "lab1": "Factorial Problem",
    "lab2": "Sequential Search"
};

  var pseudo = av.code([
    "function searchMaxIndex(A):",
    "    maxIndex = 1",
    "    for i = 2, 3, ..., size of A - 1:",
    "        if A[i] > A[maxIndex]:",
    "            maxIndex = i",
    "return maxIndex",
  ], {lineNumbers: false}).hide();

  var arr1, arr2, arr3;
  var topAlign = 60;
  var leftAlign = 10;
  var rectWidth = 180;
  var rectHeight = 225;

  // Slide 1
  av.umsg(interpret["sc1"]);
  var rect = av.g.rect(leftAlign + 380, topAlign - 25, rectWidth, rectHeight);
  var mainLabel = av.label(interpret["lab1"], {top: topAlign - 20, left: leftAlign + 400});
  mainLabel.addClass("codeLabel");
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  var lineInput = av.g.line(leftAlign + 320, topAlign + 95, leftAlign + 380, topAlign + 95);
  var labelInput = av.label("<em>n</em>", {top: topAlign + 62, left: leftAlign + 285}).addClass("largeLabel");
  var lineOutput = av.g.line(leftAlign + rectWidth + 380, topAlign + 95, leftAlign + rectWidth + 440, topAlign + 95);
  var labelOutput = av.label("<em>n!</em>", {top: topAlign + 62, left: leftAlign + rectWidth + 460}).addClass("largeLabel");
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  lineInput.hide();
  labelInput.hide();
  lineOutput.hide();
  labelOutput.hide();

  var lineInput1 = av.g.line(leftAlign + 320, topAlign + 30, leftAlign + 380, topAlign + 30);
  var labelInput1 = av.label("<em>n = 2</em>", {top: topAlign + 0, left: leftAlign + 250}).addClass("largeLabel");
  var lineOutput1 = av.g.line(leftAlign + rectWidth + 380, topAlign + 30, leftAlign + rectWidth + 440, topAlign + 30);
  var labelOutput1 = av.label("<em>n! = 2</em>", {top: topAlign + 0, left: leftAlign + rectWidth + 460}).addClass("largeLabel");
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"], {preserve: true});
  var lineInput2 = av.g.line(leftAlign + 320, topAlign + 95, leftAlign + 380, topAlign + 95);
  var labelInput2 = av.label("<em>n = 3</em>", {top: topAlign + 62, left: leftAlign + 250}).addClass("largeLabel");
  var lineOutput2 = av.g.line(leftAlign + rectWidth + 380, topAlign + 95, leftAlign + rectWidth + 440, topAlign + 95);
  var labelOutput2 = av.label("<em>n! = 6</em>", {top: topAlign + 62, left: leftAlign + rectWidth + 460}).addClass("largeLabel");
  av.step();

  // Slide 5
  av.umsg(interpret["sc5"], {preserve: true});
  var lineInput3 = av.g.line(leftAlign + 320, topAlign + 155, leftAlign + 380, topAlign + 155);
  var labelInput3 = av.label("<em>n = 4</em>", {top: topAlign + 124, left: leftAlign + 250}).addClass("largeLabel");
  var lineOutput3 = av.g.line(leftAlign + rectWidth + 380, topAlign + 155, leftAlign + rectWidth + 440, topAlign + 155);
  var labelOutput3 = av.label("<em>n! = 24</em>", {top: topAlign + 124, left: leftAlign + rectWidth + 460}).addClass("largeLabel");
  av.step();

  // Slide 6
  av.umsg(interpret["sc6"]);
  lineInput1.hide();
  labelInput1.hide();
  lineInput2.hide();
  labelInput2.hide();
  lineInput3.hide();
  labelInput3.hide();
  lineOutput1.hide();
  labelOutput1.hide();
  lineOutput2.hide();
  labelOutput2.hide();
  lineOutput3.hide();
  labelOutput3.hide();
  pseudo.show();
  mainLabel.text(interpret["lab2"]);
  rect.css({width: rectWidth + 50});
  mainLabel.css({left: "+=20"});
  av.step();

  // Slide 7
  av.umsg(interpret["sc7"]);
  av.step();

  // Slide 8
  av.umsg(interpret["sc8"], {preserve: true});
  arr1 = av.ds.array(["Key1", "Key2", "Key3"],
                     {left: leftAlign + 118, top: topAlign - 2, indexed: false});
  lineInput1 = av.g.line(leftAlign + 273, topAlign + 30, leftAlign + 380, topAlign + 30);
  av.step();

  //Slide 9
  av.umsg(interpret["sc9"], {preserve: true});
  arr2 = av.ds.array(["Key1", "Key2", "Key3", "Key4"],
                     {left: leftAlign + 105, top: topAlign + 73, indexed: false});
  lineInput2 = av.g.line(leftAlign + 310, topAlign + 105, leftAlign + 380, topAlign + 105);
  av.step();

  //Slide 10
  av.umsg(interpret["sc10"], {preserve: true});
  arr3 = av.ds.array(["Key1", "Key2", "Key3", "Key4", "key5"],
                     {left: leftAlign + 103, top: topAlign + 148, indexed: false});
  lineInput3 = av.g.line(leftAlign + 360, topAlign + 180, leftAlign + 380, topAlign + 180);
  av.step();

  //Slide 11
  av.umsg(interpret["sc11"]);
  arr1.highlight();
  arr2.highlight();
  arr3.highlight();
  av.step();

  av.recorded();
});
