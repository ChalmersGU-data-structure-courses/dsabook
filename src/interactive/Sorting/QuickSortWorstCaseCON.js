/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Quick Sort Worst Case
$(document).ready(function() {
  "use strict";
  var av_name = "QuickSortWorstCaseCON";
  var av = new JSAV(av_name);

  var interpret = {
	  "Slide 1": "Quicksort's worst case will occur when the pivot does a poor job of breaking the array, that is, when there are no records in one partition, and <em>N–1</em> records in the other.",
	  "Slide 2": "Let's start with an array of size <em>N</em>.",
	  "Slide 3": "The pivot partitions the array into two parts: one of size <em>0</em> and the other of size <em>N–1</em>.<br>This requires <em>N–1</em> units of work.",
	  "Slide 4": "In the second level, the pivot breaks it into two parts: one of size <em>0</em> and the other of size <em>N–2</em>.<br>This requires <em>N–2</em> units of work.",
	  "Slide 5": "In the third level, the pivot breaks it into two parts: one of size <em>0</em> and the other of size <em>N–3</em>.<br>This requires <em>N–3</em> amount of work.",
	  "Slide 6": "In the last level, the pivot breaks a partition of size <em>2</em> into two parts: one of size <em>0</em> and the other of size <em>1</em>.<br>This requires a single unit of work.",
	  "Slide 7": "Thus, the total amount of work is determined by the summation &Sigma;<em><sub>i&lt;N</sub> i</em>.",
	  "Slide 8": "Therefore, the worst case running time of Quicksort is <em>O(N<sup>2</sup>)</em>.",
	  "lab1": "<b><u>Amount of work</b></u>"
  };

  // Slide 1
  av.umsg(interpret["Slide 1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["Slide 2"]);
  av.g.rect(100, 0, 400, 30);
  av.label("<em>n</em>",  {top: "-8px", left: "300px"}).addClass("mediumLabel");
  av.step();

  // Slide 3
  av.umsg(interpret["Slide 3"]);
  av.g.rect(100, 80, 400, 30);
  av.g.rect(100, 80, 20, 30);
  av.label("|--------------------------------------- &nbsp; &gt; A[pivot] &nbsp; --------------------------------------|",  {top: "40px", left: "118px"}).addClass("mediumLabel2");
  av.label("pivot",  {top: "76px", left: "98px"}).addClass("smallLabel rotated");
  av.label("<em>N–1</em>",  {top: "71px", left: "270px"}).addClass("mediumLabel");
  av.label("<em>N–1</em>",  {top: "67px", left: "600px"}).addClass("mediumLabel");
  av.label(interpret["lab1"],  {top: "-17px", left: "580px"}).addClass("mediumLabel");
  av.step();

  // Slide 4
  av.umsg(interpret["Slide 4"]);
  av.g.rect(120, 160, 380, 30);
  av.g.rect(120, 160, 20, 30);
  av.label("|------------------------------------- &nbsp; &gt; A[pivot] &nbsp; -----------------------------------|",  {top: "120px", left: "138px"}).addClass("mediumLabel2");
  av.label("pivot",  {top: "156px", left: "118px"}).addClass("smallLabel rotated");
  av.label("<em>N–2</em>",  {top: "151px", left: "290px"}).addClass("mediumLabel");
  av.label("<em>N–2</em>",  {top: "147px", left: "600px"}).addClass("mediumLabel");
  av.step();

  // Slide 5
  av.umsg(interpret["Slide 5"]);
  av.g.rect(140, 240, 360, 30);
  av.g.rect(140, 240, 20, 30);
  av.label("|---------------------------------- &nbsp; &gt; A[pivot] &nbsp; ---------------------------------|",  {top: "200px", left: "158px"}).addClass("mediumLabel2");
  av.label("pivot",  {top: "236px", left: "138px"}).addClass("smallLabel rotated");
  av.label("<em>N–3</em>",  {top: "231px", left: "300px"}).addClass("mediumLabel");
  av.label("<em>N–3</em>",  {top: "227px", left: "600px"}).addClass("mediumLabel");
  av.step();

  // Slide 6
  av.umsg(interpret["Slide 6"]);
  av.label("............",  {top: "285px", left: "460px"}).addClass("largeLabel rotated");
  av.label("............",  {top: "275px", left: "600px"}).addClass("largeLabel rotated");
  av.g.rect(460, 365, 40, 30);
  av.g.rect(460, 365, 20, 30);
  av.label("pivot",  {top: "360px", left: "458px"}).addClass("smallLabel rotated");
  av.label("<em>1</em>",  {top: "356px", left: "485px"}).addClass("mediumLabel");
  av.label("<em>1</em>",  {top: "352px", left: "620px"}).addClass("mediumLabel");
  av.step();

  // Slide 7
  av.umsg(interpret["Slide 7"]);
  av.label("|-------------------- <em>N–1</em> --------------------|",
  {top: "180px", left: "550px"}).css({"font-size": "16px", "text-align": "center"}).addClass("rotated");
  av.step();

  // Slide 8
  av.umsg(interpret["Slide 8"]);
  av.recorded();
});
