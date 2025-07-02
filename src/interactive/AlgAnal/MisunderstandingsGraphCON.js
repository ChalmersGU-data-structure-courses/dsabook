/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Common Misunderstandings example graph
$(document).ready(function() {
  "use strict";
  var av_name = "MisunderstandingsGraphCON";

  var interpret = {
    "sc1": "Imagine drawing a graph to show the cost of finding the maximum value among <em>n</em> values, as <em>n</em> grows. That is, the <em>x</em> axis would be <em>n</em>, and the <em>y</em> value would be the cost for a given value of <em>n</em>.",
    "sc2": "Of course, for the maximum-finding algorithm we get a diagonal line going up to the right, as <em>n</em> increases.",
    "sc3": "Now, imagine the graph showing the cost for each instance of the problem of finding the maximum value among (say) 20 elements in an array. So the <em>x</em> axis has a position for each problem instance (that is, a problem input). We could order them any way that we like, but perhaps we will do it in order of increasing cost.",
    "sc4": "The first position along the <em>x</em> axis of the graph might correspond to having the maximum element in the first position of the array. Of course, the cost is always 20.",
    "sc5": "<br> The second position along the <em>x</em> axis of the graph might correspond to having the maximum element in the second position of the array, which also costs 20. And so on.",
    "sc6": "<br>Therefore, the graph would be a horizontal line with value 20.",
    "sc7": "Now, let us switch to the problem of doing a sequential search for a given value in an array. Think about the graph showing all the problem instances of size 20.",
    "sc8": "The first problem instance might be when the value we search for is in the first position of the array.<br>This has cost 1.",
    "sc9": "The second problem instance might be when the value we search for is in the second position of the array.<br>This has cost 2. And so on.",
    "sc10": "If we arrange the problem instances of size 20 from least expensive on the left to most expensive on the right, we see that the graph forms a diagonal line from lower left (with value 0) to upper right (with the greatest value being 20)",
    "sc11": "Finally, let us consider the cost for performing sequential search as the size of the array <em>n</em> gets bigger. What will this graph look like? Think about this for a minute before continuing.",
    "sc12": "The shape of this graph depends on whether we are considering:",
    "sc13": "<br> (1) The best case cost (that would be a horizontal line with value 1.)",
    "sc14": "<br> (2) The worst case cost (that would be a diagonal line with value <em>i</em> at position <em>i</em> along the <em>x</em> axis.)",
    "sc15": "<br> (3) The average cost (that would be a a diagonal line with value <em>i/2</em> at position <em>i</em> along the <em>x</em> axis).",
    "sc16": "This is why we must always say that function <em>f(n)</em> is in <em>O(g(n))</em> in the best, average, or worst case. If we leave off which class of inputs we are discussing, we cannot know which cost measure we are referring to for most algorithms.",
    "lab1": "Cost",
    "lab2": "Problem Instance"
  };

  var av = new JSAV(av_name);
  var topAlign = 0;
  var left = 150;
  var yLength = 400;
  var xLength = 450;

  // Slide 1
  av.umsg(interpret["sc1"]);
  //Drawing the axis
  var axis = av.g.polyline([[left, topAlign], [left, topAlign + yLength], [left + xLength, topAlign + yLength]]);
  var xLabel = av.label("<em>n</em>",  {top: topAlign + yLength - 10, left: left + xLength + 10}).addClass("largeLabel");
  var yLabel = av.label(interpret["lab1"],  {top: topAlign - 20, left: left - 50}).addClass("largeLabel");
  var axisorigin = av.label("<em>(0,0)</em>",  {top: topAlign + yLength - 10, left: left - 20}).addClass("largeLabel");
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  //Draw the diagonal line
  var diagonal  = av.g.line(left, topAlign + yLength, left + xLength - 100, topAlign + 100);
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  xLabel.text(interpret["lab2"]);
  diagonal.hide();
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"]);
  var firstPositionCost = av.label("*",  {top: topAlign + 150, left: left + 50}).addClass("largePoint colored");
  var costTwenty = av.label("20",  {top: topAlign + 150, left: left - 30}).addClass("largeLabel");
  var markTwenty = av.label("_",  {top: topAlign + 148, left: left - 5}).addClass("largeLabel");
  av.step();

  // Slide 5
  av.umsg(interpret["sc5"], {preserve: true});
  var secondPositionCost = av.label("*",  {top: topAlign + 150, left: left + 150}).addClass("largePoint colored");
  av.step();

  // Slide 6
  av.umsg(interpret["sc6"], {preserve: true});
  var horizontalLine = av.g.line(left, topAlign + 184, left + xLength - 100, topAlign + 184);
  av.step();

  // Slide 7
  av.umsg(interpret["sc7"]);
  costTwenty.hide();
  markTwenty.hide();
  firstPositionCost.hide();
  secondPositionCost.hide();
  horizontalLine.hide();
  av.step();

  // Slide 8
  av.umsg(interpret["sc8"]);
  firstPositionCost = av.label("*",  {top: topAlign + 340, left: left + 43}).addClass("largePoint colored");
  var markFirstPositionCost =  av.label("_",  {top: topAlign + 338, left: left - 5}).addClass("largeLabel");
  var costOne = av.label("1",  {top: topAlign + 340, left: left - 30}).addClass("largeLabel");
  av.step();

  // Slide 9
  av.umsg(interpret["sc9"]);
  secondPositionCost = av.label("*",  {top: topAlign + 290, left: left + 133}).addClass("largePoint colored");
  var markSecondPositionCost =  av.label("_",  {top: topAlign + 288, left: left - 5}).addClass("largeLabel");
  var costTwo = av.label("2",  {top: topAlign + 290, left: left - 30}).addClass("largeLabel");
  av.step();

  // Slide 10
  av.umsg(interpret["sc10"]);
  diagonal = av.g.line(left, topAlign + yLength, left + xLength, topAlign + 150);
  markTwenty = av.label("_",  {top: topAlign + 98, left: left - 5}).addClass("largeLabel");
  costTwenty = av.label("20",  {top: topAlign + 100, left: left - 30}).addClass("largeLabel");
  av.step();

  // Slide 11
  av.umsg(interpret["sc11"]);
  xLabel.hide();
  xLabel = av.label("<em>n</em>",  {top: topAlign + yLength - 10, left: left + xLength + 10}).addClass("largeLabel");
  costTwenty.hide();
  markTwenty.hide();
  firstPositionCost.hide();
  secondPositionCost.hide();
  diagonal.hide();
  costOne.hide();
  markFirstPositionCost.hide();
  costTwo.hide();
  markSecondPositionCost.hide();
  av.step();

  // Slide 12
  av.umsg(interpret["sc12"]);
  av.step();

  // Slide 13
  av.umsg(interpret["sc13"], {preserve: true});
  axis.hide();
  xLabel.hide();
  yLabel.hide();
  axisorigin.hide();
  markFirstPositionCost.hide();
  left = 50;
  yLength = 150;
  xLength = 150;
  topAlign = 50;
  var leftSpace = xLength + 100;
  axis = av.g.polyline([[left, topAlign], [left, topAlign + yLength], [left + xLength, topAlign + yLength]]);
  xLabel = av.label("<em>n</em>", {top: topAlign + yLength - 10, left: left + xLength + 10}).addClass("largeLabel");
  yLabel = av.label(interpret["lab1"],  {top: topAlign - 20, left: left - 50}).addClass("largeLabel");
  costOne = av.label("1", {top: topAlign + yLength - 50, left: left - 20}).addClass("largeLabel");
  av.label("_", {top: topAlign + yLength - 57, left: left - 5}).addClass("largeLabel");
  horizontalLine = av.g.line(left, topAlign + yLength - 21, left + xLength - 20, topAlign + yLength - 21);
  av.step();

  // Slide 14
  av.umsg(interpret["sc14"], {preserve: true});
  axis = av.g.polyline([[left + leftSpace, topAlign], [left + leftSpace, topAlign + yLength], [left + xLength + leftSpace, topAlign + yLength]]);
  xLabel = av.label("<em>n</em>", {top: topAlign + yLength - 10, left: left + xLength + leftSpace + 10}).addClass("largeLabel");
  yLabel = av.label(interpret["lab1"], {top: topAlign - 20, left: left + leftSpace - 50}).addClass("largeLabel");
  av.label("<em>i</em>", {top: topAlign + yLength - 10, left: left + leftSpace + 45}).addClass("largeLabel");
  av.label("<em>i</em>", {top: topAlign + 60, left: left + leftSpace - 20}).addClass("largeLabel");
  av.label("_", {top: topAlign + 48, left: left + leftSpace - 5}).addClass("largeLabel");
  av.label("<em>*</em>", {top: topAlign + 63, left: left + leftSpace + 45}).addClass("mediumPoint colored");
  diagonal = av.g.line(left + leftSpace, topAlign + yLength, left + leftSpace + 100, topAlign + yLength - 130);
  av.step();

  // Slide 15
  av.umsg(interpret["sc15"], {preserve: true});
  leftSpace = 2 * xLength + 200;
  axis = av.g.polyline([[left + leftSpace, topAlign], [left + leftSpace, topAlign + yLength], [left + xLength + leftSpace, topAlign + yLength]]);
  xLabel = av.label("<em>n</em>",  {top: topAlign + yLength - 10, left: left + xLength + leftSpace + 10}).addClass("largeLabel");
  yLabel = av.label(interpret["lab1"],  {top: topAlign - 20, left: left + leftSpace - 50}).addClass("largeLabel");
  av.label("<em>i</em>",  {top: topAlign + yLength - 10, left: left + leftSpace + 45}).addClass("largeLabel");
  av.label("<em>i/2</em>",  {top: topAlign + 95, left: left + leftSpace - 35}).addClass("largeLabel");
  av.label("_",  {top: topAlign + 83, left: left + leftSpace - 5}).addClass("largeLabel");
  av.label("<em>*</em>",  {top: topAlign + 98, left: left + leftSpace + 43}).addClass("mediumPoint colored");
  diagonal = av.g.line(left + leftSpace, topAlign + yLength, left + leftSpace + 130, topAlign + yLength - 85);
  av.step();

  // Slide 16
  av.umsg(interpret["sc16"]);
  av.recorded();
});
