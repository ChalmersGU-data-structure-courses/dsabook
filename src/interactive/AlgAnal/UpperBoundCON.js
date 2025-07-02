/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Upper Bounds definition
$(document).ready(function() {
  "use strict";
  var av_name = "UpperBoundCON";

  var interpret = {
    "sc1": "A mistake that people often make is to confuse the upper bound and the worst case.",
    "sc2": "<br>The upper bound of an algorithm indicates the upper or highest growth rate that the algorithm can have for a problem of size <em>n</em>.",
    "sc3": "The sequential search algorithm accepts as its input an array of <em>n</em> keys and the target key <em>K</em> to search for.",
    "sc4": "<br> So what is the upper bound of the sequential search algorithm?",
    "sc5": "<br>Do you think this is the correct way to ask this question?",
    "sc6": "Remember that there are three input cases that affect the running time of sequential search.",
    "sc7": "<br>1- When the target key <em>K</em> is located at the first position in the input array.",
    "sc8": "<br>2- When the target key <em>K</em> is located at the last position in the input array.",
    "sc9": "<br>3- The average cost over all possible positions for <em>K</em>, which comes out to about <em>n/2</em>.",
    "sc10": "In the best case for the algorithm, only a single element is visited. <em><b>T</b> = 1</em>",
    "sc11": "<br>Accordingly, an upper bound for the algorithm in the best case is <em>O(1)</em>. Even when <em>n</em> increases, the cost for the best case does not <b>grow</b>.",
    "sc12": "In the worst case for the algorithm, <em>n</em> elements must be visited. <em><b>T</b>(n) = n</em>",
    "sc13": "<br>So an upper bound for the algorithm in the worst case is <em>O(n)</em>. No matter the value of <em>n</em>, for some constant <em>c</em>, <em>cn</em> is bigger than <em>n</em>.",
    "sc14": "In the average case for the algorithm, about <em>n/2</em> elements are visited. <em>T(n) = n/2</em>",
    "sc15": "<br><br>So an upper bound for the algorithm in the average case is also <em>O(n)</em>. No matter the value of <em>n</em>, for some constant <em>c</em>, <em>cn</em> is bigger than <em>n/2</em>.",
    "sc16": "Accordingly, the correct way to ask the question is: <br>What is the upper bound of sequential search in the best/average/worst case?",
    "sc17": "<br><br>And the answer should be...",
    "lab1": "<em>O(1)</em> in the <b><u>Best Case.</u></b>",
    "lab2": "<em>O(n)</em> in the <b><u>Worst Case</u></b>.",
    "lab3": "<em>O(n)</em> in the <b><u>Average Case</u></b>."
  };

  var av = new JSAV(av_name);
  var arr;
  var arr_values = [];
  var topAlign = 80;
  var leftAlign = 10;
  var arraySize = 7;
  var i;

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"], {preserve: true});
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  var nLine1 = av.g.line(leftAlign + 10, topAlign,
                         leftAlign + 155, topAlign,
                         {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  var nLabel = av.label("<em>n</em>",
                        {top: topAlign - 30, left: leftAlign + 165});
  var nLine2 = av.g.line(leftAlign + 195, topAlign,
                         leftAlign + 340, topAlign,
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

  // Slide 4
  av.umsg(interpret["sc4"], {preserve: true});
  av.step();

  // Slide 5
  av.umsg(interpret["sc5"], {preserve: true, color: "#f00"});
  av.step();

  // Slide 6
  av.umsg(interpret["sc6"]);
  av.step();

  // Slide 7
  av.umsg(interpret["sc7"], {preserve: true});
  var pointer = av.pointer("<em>K</em>", arr.index(0));
  av.step();

  // Slide 8
  av.umsg(interpret["sc8"], {preserve: true});
  pointer.target(arr.index(arraySize - 1, 10));
  av.step();

  // Slide 9
  av.umsg(interpret["sc9"], {preserve: true});
  pointer.hide();
  av.step();

  // Slide 10
  av.umsg(interpret["sc10"]);
  pointer.show();
  pointer.target(arr.index(0));
  arr.addClass(0, "greenbg");
  av.step();

  // Slide 11
  av.umsg(interpret["sc11"], {preserve: true});
  av.step();

  // Slide 12
  av.umsg(interpret["sc12"]);
  var indices = [];
  pointer.target(arr.index(parseInt(arraySize - 1, 10)));
  for (i = 0; i < parseInt(arraySize, 10); i++) {
    indices[i] = i;
  }
  arr.addClass(indices, "redbg");
  av.step();

  // Slide 13
  av.umsg(interpret["sc13"], {preserve: true});
  av.step();

  // Slide 14
  av.umsg(interpret["sc14"]);
  for (i = 0; i < parseInt(arraySize, 10); i++) {
    arr.removeClass(i, "redbg");
  }
  pointer.target(arr.index(parseInt(arraySize / 2, 10)));
  arr.unhighlight();
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr.highlight(i);
  }
  av.step();

  // Slide 15
  av.umsg(interpret["sc15"], {preserve: true});
  av.step();

  // Slide 16
  av.umsg(interpret["sc16"]);
  arr.hide();
  nLabel.hide();
  nLine1.hide();
  nLine2.hide();
  pointer.hide();
  av.step();

  // Slide 17
  av.umsg(interpret["sc17"], {preserve: true});
  topAlign = 15;
  var arr1 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 30, indexed: true});
  av.pointer("<em>K</em>", arr1.index(0));
  arr1.addClass([0], "greenbg");
  av.label(interpret["lab1"], {left: leftAlign + 395, top: topAlign + 35});
  var arr2 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 140, indexed: true});
  av.pointer("<em>K</em>", arr2.index(arraySize - 1));
  arr2.addClass(indices, "redbg");
  av.label(interpret["lab2"], {left: leftAlign + 395, top: topAlign + 145});
  var arr3 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 250, indexed: true});
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr3.highlight(i);
  }
  av.label(interpret["lab3"], {left: leftAlign + 395, top: topAlign + 255});
  av.recorded();
});
