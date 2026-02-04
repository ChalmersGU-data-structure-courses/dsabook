/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Selection Sort Analysis
$(document).ready(function() {
  "use strict";
  var av_name = "SelectionSortAnalysisCON";
  var av = new JSAV(av_name);

  var interpret = {
	  "sc1": "What is the cost for Selection sort?",
	  "sc2": "Selection sort is essentially a bubble sort, except that the next smallest value is remembered so that we can delay the swap to the end of each pass.",
	  "sc3": "Consider the following example of an array with 6 elements.",
	  "sc4": "At <em>i=0</em>",
	  "sc11": "At <em>i=1</em>",
	  "sc16": "At <em>i=2</em>",
	  "sc20": "At <em>i=3</em>",
	  "sc23": "At <em>i=4</em>",
	  "sc24": "Thus, the number of comparisons is defined by the equation &Sigma;<em><sub>i&lt;n</sub> i</em> &nbsp;=&nbsp; <em>n(n-1)/2</em>, or <em>quadratic</em> in the size of the array, while the number of swaps is <em>linear</em>.",
    "lab1": "<b><u>Number of comparisons</u></b>",
    "lab2": "<b><u>Number of swaps</u></b>"
  };

  var arr;
  var arr_values = [];
  var leftAlign = 250;
  var topAlign = 150;
  var rectWidth = 50;
  var rectHeight = 20;
  var topGap = 10;
  var gap = 325;
  var labelGap = 5;

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  arr_values = [42, 56, 23, 87, 12, 66];
  // for (var i = 0; i < 6; i++) arr_values[i] = parseInt(Math.random() * 20, 10);
  arr = av.ds.array(arr_values, {left: 0, top: 50, indexed: true});
  av.label(interpret["lab1"],  {top: topAlign - 150, left: leftAlign + 25}).addClass("largeLabel");
  av.label(interpret["lab2"],  {top: topAlign - 150, left: leftAlign + gap + 50}).addClass("largeLabel");
  av.step();

  /////////////////////////////////////////////////////////
  // Slide 4
  av.umsg(interpret["sc4"]);
  var minIndex = 0;
  var pointer = av.pointer("minIndex", arr.index(minIndex));
  arr.addClass(minIndex, "greenbg");
  av.step();

  /////////////////////////////////////////////////////////
  // Slide 5+6
  var index = 1;

  arr.highlight(index);
  av.label(`<em>i=${minIndex}</em>`,  {top: topAlign + topGap, left: leftAlign + 7});
  av.g.rect(leftAlign, topAlign, rectWidth, rectHeight);
  av.step();

  av.clearumsg();
  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  // Slide 7+8
  index = 2;

  arr.highlight(index);
  av.g.rect(leftAlign, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  // Slide 9+10
  index = 3;

  arr.highlight(index);
  av.g.rect(leftAlign, topAlign - 2 * rectHeight, rectWidth, rectHeight);
  av.step();

  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  // Slide 11+12
  index = 4;

  arr.highlight(index);
  av.g.rect(leftAlign, topAlign - 3 * rectHeight, rectWidth, rectHeight);
  av.step();

  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  // Slide 13+14
  index = 5;

  arr.highlight(index);
  av.g.rect(leftAlign, topAlign - 4 * rectHeight, rectWidth, rectHeight);
  av.step();

  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  /////////////////////////////////////////////////////////
  // Slide 15
  arr.swap(minIndex, 0);
  arr.removeClass(minIndex, "greenbg");
  arr.addClass(0, "deemph");
  av.g.rect(leftAlign + gap, topAlign, rectWidth, rectHeight);
  av.label("<em>i=1</em>",  {top: topAlign + topGap, left: leftAlign + gap + 7});
  minIndex = 1;
  pointer.target(arr.index(minIndex));
  arr.addClass(minIndex, "greenbg");
  av.step();

  /////////////////////////////////////////////////////////
  // Slide 16+17
  index = 2;

  av.umsg(interpret["sc11"]);
  arr.highlight(index);
  av.label(`<em>i=${minIndex}</em>`,  {top: topAlign + topGap, left: leftAlign + rectWidth + 7});
  av.g.rect(leftAlign + rectWidth, topAlign, rectWidth, rectHeight);
  av.step();

  av.clearumsg();
  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  // Slide 18+19
  index = 3;

  arr.highlight(index);
  av.g.rect(leftAlign + rectWidth, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(2));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  // Slide 20+21
  index = 4;

  arr.highlight(index);
  av.g.rect(leftAlign + rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight);
  av.step();

  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  // Slide 22+23
  index = 5;

  arr.highlight(index);
  av.g.rect(leftAlign + rectWidth, topAlign - 3 * rectHeight, rectWidth, rectHeight);
  av.step();

  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  /////////////////////////////////////////////////////////
  // Slide 24
  arr.swap(minIndex, 1);
  arr.removeClass(minIndex, "greenbg");
  arr.addClass(1, "deemph");
  av.g.rect(leftAlign + gap + rectWidth, topAlign, rectWidth, rectHeight);
  av.label("<em>i=2</em>",  {top: topAlign + topGap, left: leftAlign + gap + rectWidth + 7});
  minIndex = 2;
  pointer.target(arr.index(minIndex));
  arr.addClass(minIndex, "greenbg");
  av.step();

  /////////////////////////////////////////////////////////
  // Slide 25+26
  index = 3;

  av.umsg(interpret["sc16"]);
  arr.highlight(index);
  av.label(`<em>i=${minIndex}</em>`,  {top: topAlign + topGap, left: leftAlign + 2 * rectWidth + 7});
  av.g.rect(leftAlign + 2 * rectWidth, topAlign, rectWidth, rectHeight);
  av.step();

  av.clearumsg();
  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  // Slide 27+28
  index = 4;

  arr.highlight(index);
  av.g.rect(leftAlign + 2 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  // Slide 29+30
  index = 5;

  arr.highlight(index);
  av.g.rect(leftAlign + 2 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight);
  av.step();

  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  /////////////////////////////////////////////////////////
  // Slide 31
  arr.swap(minIndex, 2);
  arr.removeClass(minIndex, "greenbg");
  arr.addClass(2, "deemph");
  av.g.rect(leftAlign + gap + 2 * rectWidth, topAlign, rectWidth, rectHeight);
  av.label("<em>i=3</em>", {top: topAlign + topGap, left: leftAlign + gap + 2 * rectWidth + 7});
  minIndex = 3;
  pointer.target(arr.index(minIndex));
  arr.addClass(minIndex, "greenbg");
  av.step();

  /////////////////////////////////////////////////////////
  // Slide 32+33
  index = 4;

  av.umsg(interpret["sc20"]);
  arr.highlight(index);
  av.label(`<em>i=${minIndex}</em>`,  {top: topAlign + topGap, left: leftAlign + 3 * rectWidth + 7});
  av.g.rect(leftAlign + 3 * rectWidth, topAlign, rectWidth, rectHeight);
  av.step();

  av.clearumsg();
  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  // Slide 29+30
  index = 5;

  arr.highlight(index);
  av.g.rect(leftAlign + 3 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  /////////////////////////////////////////////////////////
  // Slide 31
  arr.swap(minIndex, 3);
  arr.removeClass(minIndex, "greenbg");
  arr.addClass(3, "deemph");
  av.g.rect(leftAlign + gap + 3 * rectWidth, topAlign, rectWidth, rectHeight);
  av.label("<em>i=4</em>",  {top: topAlign + topGap, left: leftAlign + gap + 3 * rectWidth + 7});
  minIndex = 4;
  pointer.target(arr.index(minIndex));
  arr.addClass(minIndex, "greenbg");
  av.step();

  /////////////////////////////////////////////////////////
  // Slide 32+33
  index = 5;

  av.umsg(interpret["sc23"]);
  arr.highlight(index);
  av.label(`<em>i=${minIndex}</em>`,  {top: topAlign + topGap, left: leftAlign + 4 * rectWidth + 7});
  av.g.rect(leftAlign + 4 * rectWidth, topAlign, rectWidth, rectHeight);
  av.step();

  av.clearumsg();
  if (arr.value(index) < arr.value(minIndex)) {
    arr.removeClass(minIndex, "greenbg");
    pointer.target(arr.index(index));
    minIndex = index;
    arr.addClass(index, "greenbg");
    arr.unhighlight(index);
    av.step();
  } else {
    arr.unhighlight(index);
  }

  /////////////////////////////////////////////////////////
  // Slide 34
  arr.swap(minIndex, 4);
  arr.removeClass(minIndex, "greenbg");
  arr.addClass(4, "deemph");
  av.g.rect(leftAlign + gap + 4 * rectWidth, topAlign, rectWidth, rectHeight);
  av.label("<em>i=5</em>",  {top: topAlign + topGap, left: leftAlign + gap + 4 * rectWidth + 7});
  pointer.hide();
  arr.addClass(5, "deemph");
  av.step();

  /////////////////////////////////////////////////////////
  // Slide 35
  av.umsg(interpret["sc24"]);

  //Horizontal Line (Bubble)
  av.g.line(leftAlign, 3 * rectHeight + topAlign,
            leftAlign + 2 * rectWidth, 3 * rectHeight + topAlign,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.g.line(leftAlign + 3 * rectWidth,
            3 * rectHeight + topAlign, leftAlign + 5 * rectWidth,
            3 * rectHeight + topAlign,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign, 2.5 * rectHeight + topAlign,
            leftAlign, 3.5 * rectHeight + topAlign);
  av.g.line(leftAlign + 5 * rectWidth, 2.5 * rectHeight + topAlign,
            leftAlign + 5 * rectWidth, 3.5 * rectHeight + topAlign);
  av.label("<em>n–1</em>",
           {top: topAlign + 1.5 * rectHeight,
             left: leftAlign + 2 * rectWidth + labelGap});

  //Vertical Line (Bubble)
  av.g.line(leftAlign - 0.5 * rectWidth, topAlign - rectHeight,
            leftAlign - 0.5 * rectWidth, topAlign +  rectHeight,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign - 0.5 * rectWidth, topAlign - 2 * rectHeight,
            leftAlign - 0.5 * rectWidth, topAlign -  4 * rectHeight,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign - 0.75 * rectWidth, topAlign + rectHeight,
            leftAlign - 0.25 * rectWidth, topAlign + rectHeight);
  av.g.line(leftAlign - 0.75 * rectWidth, topAlign - 4 * rectHeight,
            leftAlign - 0.25 * rectWidth, topAlign - 4 * rectHeight);
  av.label("<em>n–1</em>",
           {top: topAlign - 3 * rectHeight,
             left: leftAlign - rectWidth + labelGap});

  //Horizontal Line (Selection)
  leftAlign += gap;
  av.g.line(leftAlign, 3 * rectHeight + topAlign,
            leftAlign + 2 * rectWidth, 3 * rectHeight + topAlign,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.g.line(leftAlign + 3 * rectWidth,
            3 * rectHeight + topAlign, leftAlign + 5 * rectWidth,
            3 * rectHeight + topAlign,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign, 2.5 * rectHeight + topAlign,
            leftAlign, 3.5 * rectHeight + topAlign);
  av.g.line(leftAlign + 5 * rectWidth, 2.5 * rectHeight + topAlign,
            leftAlign + 5 * rectWidth, 3.5 * rectHeight + topAlign);
  av.label("<em>n–1</em>",
           {top: topAlign + 1.5 * rectHeight,
             left: leftAlign + 2 * rectWidth + labelGap});
  av.step();
  av.recorded();
});
