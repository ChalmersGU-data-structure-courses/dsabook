/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Merge Sort Analysis
$(document).ready(function() {
  "use strict";

  function merge(loc_av, a1, a2, return_into) {
    var ii = 0, j = 0, l = 0;
    for (var k = 0; k < a1.size() * 2; k++) {
      if (a1.value(ii) <= a2.value(j)) {
        loc_av.effects.moveValue(a1, ii, return_into, k);
        ii++;
        if (ii === a1.size()) {
          for (l = j; l < a2.size(); l++) {
            k++;
            loc_av.effects.moveValue(a2, l, return_into, k);
          }
          return;
        }
      } else {
        loc_av.effects.moveValue(a2, j, return_into, k);
        j++;
      }
      if (j === a2.size()) {
        for (l = ii; l < a1.size(); l++) {
          k++;
          loc_av.effects.moveValue(a1, l, return_into, k);
        }
        return;
      }
    }
  }

  var av_name = "MergeSortAnalysisCON";
  // Load the config object with interpreter
  var av = new JSAV(av_name);

  var interpret = {
	  "Slide 1": "The analysis of merge sort is straightforward. Consider the following array of 8 elements.",
	  "Slide 3": "Splitting the array into two halves requires 8 units of work.",
	  "Slide 5": "Splitting the selected array into two halves requires 4 units of work.",
	  "Slide 7": "Splitting the selected array into two halves requires 2 units of work.",
	  "Slide 9": "Merging the green highlighted arrays requires 2 units of work.",
	  "Slide 11": "Splitting the selected array into two halves requires 2 units of work.",
	  "Slide 13": "Merging the green highlighted arrays requires 2 units of work.",
	  "Slide 15": "Merging the green highlighted arrays requires 4 units of work.",
	  "Slide 17": "Splitting the selected array into two halves requires 4 units of work.",
	  "Slide 19": "Splitting the selected array into two halves requires 2 units of work.",
	  "Slide 21": "Merging the green highlighted arrays requires 2 units of work.",
	  "Slide 23": "Splitting the selected array into two halves requires 2 units of work.",
	  "Slide 25": "Merging the green highlighted arrays requires 2 units of work.",
	  "Slide 27": "Merging the green highlighted arrays requires 4 units of work.",
	  "Slide 29": "Merging the green highlighted arrays requires 8 units of work.",
	  "Slide 31": "Thus, we have <em>log(n+1)</em> levels each of which requires <em>O(n)</em> work.",
	  "Slide 32": "Therefore, the total running time of merge sort is <em>O(n log(n))</em>.",
	  "Slide 33": "This cost is unaffected by the relative order of the values being sorted, thus this analysis holds for the best, average, and worst cases.",
	  "lab1": "<b><u>Splitting Work</u></b>",
	  "lab2": "<b><u>Merging Work</u></b>"
  };

  var arr, arr11, arr12, arr21, arr22, arr23, arr24, arr31, arr32, arr33, arr34, arr35, arr36, arr37, arr38;
  var arr_values = [];
  var i;
  var rectTopAlign = 35;
  var rectLeftAlign = 350;

  // Slide 1
  av.umsg(interpret["Slide 1"]);
  av.displayInit();

  // Slide 2
  for (i = 0; i < 8; i++) {
    arr_values[i] = parseInt(Math.random() * 20, 10);
  }
  arr = av.ds.array(arr_values, {left: 60, top: 0, indexed: false});
  av.step();

  // Slide 3
  av.umsg(interpret["Slide 3"]);
  arr.highlight();
  av.step();

  // Slide 4
  arr11 = av.ds.array([arr_values[0], arr_values[1], arr_values[2], arr_values[3]], {left: 40, top: 75, indexed: false});
  arr12 = av.ds.array([arr_values[4], arr_values[5], arr_values[6], arr_values[7]], {left: 200, top: 75, indexed: false});
  av.label(interpret["lab1"],  {top: "-22px", left: "370px"}).addClass("largeLabel");
  av.label("|------------- <em>n</em> -------------|",  {top: "-3px", left: "352px"});
  for (i = 0; i < 8; i++) {
    av.g.rect(rectLeftAlign + (i * 20), rectTopAlign, 20, 20);
  }
  av.step();

  // Slide 5
  av.umsg(interpret["Slide 5"]);
  arr11.highlight();
  arr.unhighlight();
  av.step();

  // Slide 6
  arr21 = av.ds.array([arr_values[0], arr_values[1]], {left: 20, top: 150, indexed: false});
  arr22 = av.ds.array([arr_values[2], arr_values[3]], {left: 120, top: 150, indexed: false});
  av.label("|---- <em>n/2</em> ----|", {top: "65px", left: rectLeftAlign+1});
  for (i = 0; i < 4; i++) {
    av.g.rect(rectLeftAlign + (i * 20), 105, 20, 20);
  }
  av.step();

  // Slide 7
  av.umsg(interpret["Slide 7"]);
  arr21.highlight();
  arr11.unhighlight();
  av.step();

  // Slide 8
  arr31 = av.ds.array([arr_values[0]], {left: 0, top: 225, indexed: false});
  arr32 = av.ds.array([arr_values[1]], {left: 70, top: 225, indexed: false});
  av.label("<em>n/4</em>", {top: "140px", left: rectLeftAlign+10});
  for (i = 0; i < 2; i++) {
    av.g.rect(rectLeftAlign + (i * 20), 180, 20, 20);
  }
  av.step();

  // Slide 9
  av.umsg(interpret["Slide 9"]);
  arr31.addClass(0, "greenbg");
  arr32.addClass(0, "greenbg");
  av.step();

  // Slide 10
  merge(av, arr31, arr32, arr21);
  arr31.hide();
  arr32.hide();
  av.label(interpret["lab2"],  {top: "-22px", left: "620px"}).addClass("largeLabel");
  av.label("<em>n/4</em>",  {top: "215px", left: rectLeftAlign + 260});
  for (i = 0; i < 2; i++) {
    av.g.rect(rectLeftAlign + 250 + (i * 20), 255, 20, 20);
  }
  arr21.unhighlight();
  av.clearumsg();
  av.step();

  // Slide 11
  av.umsg(interpret["Slide 11"]);
  arr22.highlight();
  av.step();

  // Slide 12
  arr33 = av.ds.array([arr_values[2]], {left: 100, top: 225, indexed: false});
  arr34 = av.ds.array([arr_values[3]], {left: 170, top: 225, indexed: false});
  av.label("<em>n/4</em>",  {top: "140px", left: rectLeftAlign + 60});
  for (i = 0; i < 2; i++) {
    av.g.rect(rectLeftAlign + 50 + (i * 20), 180, 20, 20);
  }
  av.step();

  // Slide 13
  av.umsg(interpret["Slide 13"]);
  arr33.addClass(0, "greenbg");
  arr34.addClass(0, "greenbg");
  av.step();

  // Slide 14
  merge(av, arr33, arr34, arr22);
  arr33.hide();
  arr34.hide();
  av.label("<em>n/4</em>",  {top: "215px", left: rectLeftAlign + 260 + 50});
  for (i = 0; i < 2; i++) {
    av.g.rect(rectLeftAlign + 250 + 50 + (i * 20), 255, 20, 20);
  }
  arr22.unhighlight();
  av.clearumsg();
  av.step();

  // Slide 15
  av.umsg(interpret["Slide 15"]);
  arr21.addClass([0, 1], "greenbg");
  arr22.addClass([0, 1], "greenbg");
  av.step();

  // Slide 16
  merge(av, arr21, arr22, arr11);
  arr21.hide();
  arr22.hide();
  av.label("|---- <em>n/2</em> ----|", {top: "140px", left: rectLeftAlign + 251});
  for (i = 0; i < 4; i++) {
    av.g.rect(rectLeftAlign + 250 + (i * 20), 180, 20, 20);
  }
  av.step();

  // Slide 17
  av.umsg(interpret["Slide 17"]);
  arr12.highlight();
  av.step();

  // Slide 18
  arr23 = av.ds.array([arr_values[4], arr_values[5]], {left: 180, top: 150, indexed: false});
  arr24 = av.ds.array([arr_values[6], arr_values[7]], {left: 280, top: 150, indexed: false});
  av.label("|---- <em>n/2</em> ----|", {top: "65px", left: rectLeftAlign + 100});
  for (i = 0; i < 4; i++) {
    av.g.rect(rectLeftAlign + 100 + (i * 20), 105, 20, 20);
  }
  av.step();

  // Slide 19
  av.umsg(interpret["Slide 19"]);
  arr23.highlight();
  arr12.unhighlight();
  av.step();

  // Slide 20
  arr35 = av.ds.array([arr_values[4]], {left: 160, top: 225, indexed: false});
  arr36 = av.ds.array([arr_values[5]], {left: 230, top: 225, indexed: false});
  av.label("<em>n/4</em>",  {top: "140px", left: rectLeftAlign + 110});
  for (i = 0; i < 2; i++) {
    av.g.rect(rectLeftAlign + 100 + (i * 20), 180, 20, 20);
  }
  av.step();

  //Slide 21
  av.umsg(interpret["Slide 21"]);
  arr35.addClass(0, "greenbg");
  arr36.addClass(0, "greenbg");
  av.step();

  // Slide 22
  merge(av, arr35, arr36, arr23);
  arr35.hide();
  arr36.hide();
  av.label("<em>n/4</em> ",  {top: "215px", left: rectLeftAlign + 260 + 100});
  for (i = 0; i < 2; i++) {
    av.g.rect(rectLeftAlign + 250 + 100 + (i * 20), 255, 20, 20);
  }
  arr23.unhighlight();
  av.clearumsg();
  av.step();

  // Slide 23
  av.umsg(interpret["Slide 23"]);
  arr24.highlight();
  av.step();

  // Slide 24
  arr37 = av.ds.array([arr_values[6]], {left: 260, top: 225, indexed: false});
  arr38 = av.ds.array([arr_values[7]], {left: 330, top: 225, indexed: false});
  av.label("<em>n/4</em>",  {top: "140px", left: rectLeftAlign + 160});
  for (i = 0; i < 2; i++) {
    av.g.rect(rectLeftAlign + 150 + (i * 20), 180, 20, 20);
  }
  av.step();

  //Slide 25
  av.umsg(interpret["Slide 25"]);
  arr37.addClass(0, "greenbg");
  arr38.addClass(0, "greenbg");
  av.step();

  // Slide 26
  merge(av, arr37, arr38, arr24);
  arr37.hide();
  arr38.hide();
  av.label("<em>n/4</em> ",  {top: "215px", left: rectLeftAlign + 260 + 150});
  for (i = 0; i < 2; i++) {
    av.g.rect(rectLeftAlign + 250 + 150 + (i * 20), 255, 20, 20);
  }
  arr24.unhighlight();
  av.clearumsg();
  av.step();

  // Slide 27
  av.umsg(interpret["Slide 27"]);
  arr23.addClass([0, 1], "greenbg");
  arr24.addClass([0, 1], "greenbg");
  av.step();

  // Slide 28
  merge(av, arr23, arr24, arr12);
  arr23.hide();
  arr24.hide();
  av.label("|---- <em>n/2</em> ----|", {top: "140px", left: "701px"});
  for (i = 0; i < 4; i++) {
    av.g.rect(700 + (i * 20), 180, 20, 20);
  }
  av.step();

  // Slide 29
  av.umsg(interpret["Slide 29"]);
  arr11.addClass([0, 1, 2, 3], "greenbg");
  arr12.addClass([0, 1, 2, 3], "greenbg");
  av.step();

  // Slide 30
  merge(av, arr11, arr12, arr);
  arr11.hide();
  arr12.hide();
  av.label("|------------- <em>n</em> -------------|",  {top: "65px", left: rectLeftAlign + 250 + 2});
  for (i = 0; i < 8; i++) {
    av.g.rect(rectLeftAlign + 250 + (i * 20), 105, 20, 20);
  }
  av.clearumsg();
  av.step();

  // Slide 31
  av.umsg(interpret["Slide 31"]);
  av.label("|----------------- <em>log(n)</em> -----------------|", {top: "125px", left: "205px"}).addClass("largeLabel rotated");
  av.step();

  // Slide 32
  av.umsg(interpret["Slide 32"]);
  av.step();

  // Slide 33
  av.umsg(interpret["Slide 33"]);
  av.recorded();
});
