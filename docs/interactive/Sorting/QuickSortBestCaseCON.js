/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Quick Sort Best Case
$(document).ready(function() {
  "use strict";
  var av_name = "QuickSortBestCaseCON";
  var av = new JSAV(av_name);

  var interpret = {
	  "Slide 1": "Quicksort's best case occurs when the selected pivot always breaks the array into two equal halves",
	  "Slide 2": "Let's start with an array of size $n$",
	  "Slide 3": "The pivot partitions the array into two halves of size $\\frac{n}{2}$ each ... This requires $\\theta(n)$ amount of work",
	  "Slide 4": "For each of the $\\frac{n}{2}$ partitions, the pivot breaks it into two halves of size $\\frac{n}{4}$ each ... This requires $\\theta(n)$ amount of work",
	  "Slide 5": "For each of the $\\frac{n}{4}$ partitions, the pivot breaks it into two halves of size $\\frac{n}{8}$ each ... This requires $\\theta(n)$ amount of work",
	  "Slide 6": "In the last level, we reach $n$ partitions each of size 1 ... This requires $\\theta(n)$ amount of work",
	  "Slide 7": "Thus, at each level, all partition steps for that level do a total of $\\theta(n)$ work, for an overall cost of $\\theta(n\\log{n})$ work when Quicksort finds perfect pivots."
  };

  // Slide 1
  av.umsg(interpret["Slide 1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["Slide 2"]);
  av.g.rect(100, 5, 400, 30);
  av.label("$n$",  {top: "-3px", left: "300px"}).addClass("mediumLabel");
  av.step();

  // Slide 3
  av.umsg(interpret["Slide 3"]);
  av.g.rect(100, 80, 400, 30);
  av.g.rect(290, 80, 10, 30);
  av.label("|------------  $< A[pivot]$  -------------|",  {top: "35px", left: "105px"}).addClass("mediumLabel2");
  av.label("|-------------  $> A[pivot]$  --------------|",  {top: "35px", left: "305px"}).addClass("mediumLabel2");
  av.label("pivot",  {top: "75px", left: "281px"}).addClass("smallLabel rotated");
  av.label("$\\frac{n}{2}$",  {top: "70px", left: "190px"}).addClass("mediumLabel");
  av.label("$\\frac{n}{2}$",  {top: "70px", left: "390px"}).addClass("mediumLabel");
  av.label("$\\theta(n)$",  {top: "70px", left: "600px"}).addClass("mediumLabel");
  av.step();

  // Slide 4
  av.umsg(interpret["Slide 4"]);
  av.g.rect(80, 160, 200, 30);
  av.g.rect(320, 160, 200, 30);
  av.g.rect(175, 160, 10, 30);
  av.g.rect(415, 160, 10, 30);
  av.label("pivot",  {top: "155px", left: "166px"}).addClass("smallLabel rotated");
  av.label("pivot",  {top: "155px", left: "406px"}).addClass("smallLabel rotated");
  av.label("$\\frac{n}{4}$",  {top: "150px", left: "120px"}).addClass("mediumLabel");
  av.label("$\\frac{n}{4}$",  {top: "150px", left: "220px"}).addClass("mediumLabel");
  av.label("$\\frac{n}{4}$",  {top: "150px", left: "360px"}).addClass("mediumLabel");
  av.label("$\\frac{n}{4}$",  {top: "150px", left: "460px"}).addClass("mediumLabel");
  av.label("$\\theta(n)$",  {top: "150px", left: "600px"}).addClass("mediumLabel");
  av.step();

  // Slide 5
  av.umsg(interpret["Slide 5"]);
  av.g.rect(60, 240, 100, 30);
  av.g.rect(180, 240, 100, 30);
  av.g.rect(320, 240, 100, 30);
  av.g.rect(440, 240, 100, 30);
  av.g.rect(105, 240, 10, 30);
  av.g.rect(225, 240, 10, 30);
  av.g.rect(365, 240, 10, 30);
  av.g.rect(485, 240, 10, 30);
  av.label("pivot",  {top: "235px", left: "96px"}).addClass("smallLabel rotated");
  av.label("pivot",  {top: "235px", left: "216px"}).addClass("smallLabel rotated");
  av.label("pivot",  {top: "235px", left: "356px"}).addClass("smallLabel rotated");
  av.label("pivot",  {top: "235px", left: "476px"}).addClass("smallLabel rotated");
  av.label("$\\frac{n}{8}$",  {top: "230px", left: "75px"}).addClass("mediumLabel");
  av.label("$\\frac{n}{8}$",  {top: "230px", left: "130px"}).addClass("mediumLabel");
  av.label("$\\frac{n}{8}$",  {top: "230px", left: "195px"}).addClass("mediumLabel");
  av.label("$\\frac{n}{8}$",  {top: "230px", left: "250px"}).addClass("mediumLabel");
  av.label("$\\frac{n}{8}$",  {top: "230px", left: "330px"}).addClass("mediumLabel");
  av.label("$\\frac{n}{8}$",  {top: "230px", left: "390px"}).addClass("mediumLabel");
  av.label("$\\frac{n}{8}$",  {top: "230px", left: "450px"}).addClass("mediumLabel");
  av.label("$\\frac{n}{8}$",  {top: "230px", left: "510px"}).addClass("mediumLabel");
  av.label("$\\theta(n)$",  {top: "230px", left: "600px"}).addClass("mediumLabel");
  av.step();

  // Slide 6
  av.umsg(interpret["Slide 6"]);
  av.label("...",  {top: "270px", left: "105px"}).addClass("rotated");
  av.label("...",  {top: "270px", left: "225px"}).addClass("rotated");
  av.label("...",  {top: "270px", left: "365px"}).addClass("rotated");
  av.label("...",  {top: "270px", left: "485px"}).addClass("rotated");
  av.label("...",  {top: "260px", left: "610px"}).addClass("rotated");
  av.g.rect(40, 320, 30, 30);
  av.g.rect(80, 320, 30, 30);
  av.label("......................................................................",  {top: "300px", left: "120px"}).addClass("largeLabel");
  av.g.rect(500, 320, 30, 30);
  av.g.rect(540, 320, 30, 30);
  av.label("$1$",  {top: "310px", left: "50px"}).addClass("mediumLabel");
  av.label("$1$",  {top: "310px", left: "90px"}).addClass("mediumLabel");
  av.label("$1$",  {top: "310px", left: "510px"}).addClass("mediumLabel");
  av.label("$1$",  {top: "310px", left: "550px"}).addClass("mediumLabel");
  av.label("$\\theta(n)$",  {top: "310px", left: "600px"}).addClass("mediumLabel");
  av.step();

  // Slide 7
  av.umsg(interpret["Slide 7"]);
  av.label("|----------------- $\\log{n}$-----------------|",
  {top: "195px", left: "550px"}).css({"font-size": "16px", "text-align": "center"}).addClass("rotated");
  av.recorded();
});
