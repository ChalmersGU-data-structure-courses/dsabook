/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Quick Sort Average Case
$(document).ready(function() {
  "use strict";
  var av_name = "QuickSortAverageCaseCON";
  var av = new JSAV(av_name);

  var interpret = {
	  "Slide 1": "QuickSort is a recursive function, accordingly we should end up with a recursive relation to describe its average case running time.",
	  "Slide 2": "For an array of size <em>n</em>, the partition function can cause the pivot to be at any position <em>k</em> from <em>0</em> to <em>n–1</em>.",
	  "Slide 3": "Accordingly, there will be two recursive calls for the quicksort function, one for the left <em>k</em> elements that will take <em>T(k)</em> time and the other for the right <em>n–1–k</em> elements that will take <em>T(n–1–k)</em> time.",
	  "Slide 4_1": "Consider the following cases for <em>k</em>:",
	  "Slide 4_2": "If the pivot ends in position <em>0</em>, the total running time will be <em>cn + T(0) + T(n–1)</em>, where <em>cn</em> here stands for the cost of the partition step.",
	  "Slide 5": "If the pivot ends in position <em>1</em>, the total running time will be <em>cn + T(1) + T(n–2)</em>.",
	  "Slide 6": "If the pivot ends in position <em>2</em>, the total running time will be <em>cn + T(2) + T(n–3)</em>.",
	  "Slide 7": "If the pivot ends in position <em>3</em>, the total running time will be <em>cn + T(3) + T(n–4)</em>.",
	  "Slide 8": "We make one reasonable simplifying assumption: At each partition step, the pivot is equally likely to end in any position in the array.",
	  "Slide 9": "And since we have <em>n</em> positions, therefore the average cost of the recursive calls can be modeled as:<br><br><em>1/n · &Sigma;<sub>k&lt;n</sub> T(k)+T(n–1–k)</em>",
	  "Slide 10": "But also we need to add the cost for the partition and findpivot functions which is <em>cn</em> for some constant <em>c</em>.<br><br><em>1/n · &Sigma;<sub>k&lt;n</sub> T(k)+T(n–1–k)</em>",
	  "Slide 11": "Accordingly, quicksort's average running time can be modeled by the following recurrence:<br><br><em>T(n) = cn + 1/n · &Sigma;<sub>k&lt;n</sub> T(k)+T(n–1–k)</em>",
    "Slide 12": "By solving this recurrence, we will have that quicksort's average running time is <em>O(n log(n))</em>.<br><br><em>T(n) = cn + 1/n · &Sigma;<sub>k&lt;n</sub> T(k)+T(n–1–k)</em>",
  };

  // Slide 1
  av.umsg(interpret["Slide 1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["Slide 2"]);
  av.g.rect(220, 50, 400, 30);
  av.label("|-----------------------------------------  <em>n</em>  ---------------------------------------|",  {top: "80px", left: "222px"}).addClass("mediumLabel");
  var pivot = av.g.rect(330, 50, 30, 30);
  var piv = av.label("pivot", {top: "45px", left: "333px"}).addClass("smallLabel");
  var index = av.label("<em>k</em>", {top: "15px", left: "340px"}).addClass("mediumLabel");
  av.step();

  // Slide 3
  av.umsg(interpret["Slide 3"]);
  var right_side = av.label("|----------------------  <em>n–1–k</em>  ---------------------|",  {top: "15px", left: "365px"}).addClass("mediumLabel");
  var left_side = av.label("|----------- <em>k</em> -----------|", {top: "15px", left: "222px"}).addClass("mediumLabel2");
  av.step();

  // Slide 4
  av.umsg(interpret["Slide 4_1"]);
  av.umsg(interpret["Slide 4_2"]);
  pivot.hide();
  pivot = av.g.rect(220, 50, 30, 30);
  index.hide();
  index = av.label("<em>k=0</em>", {top: "20px", left: "225px"}).addClass("smallLabel");
  piv.hide();
  piv = av.label("pivot", {top: "45px", left: "223px"}).addClass("smallLabel");
  right_side.hide();
  left_side.hide();
  right_side = av.label("|------------------------------------  <em>n–1</em>  ----------------------------------|",  {top: "15px", left: "252px"}).addClass("mediumLabel");
  av.step();

  // Slide 5
  av.umsg(interpret["Slide 5"]);
  pivot.translate(30, 0);
  piv.translate(30, 0);
  index.translate(30, 0);
  index.text("<em>k=1</em>");
  right_side.hide();
  right_side = av.label("|---------------------------------  <em>n–2</em>  -------------------------------|",  {top: "15px", left: "282px"}).addClass("mediumLabel");
  left_side = av.label("<em>1</em>", {top: "15px", left: "230px"}).addClass("mediumLabel2");
  av.step();

  // Slide 6
  av.umsg(interpret["Slide 6"]);
  pivot.translate(30, 0);
  piv.translate(30, 0);
  index.translate(30, 0);
  index.text("<em>k=2</em>");
  right_side.hide();
  right_side = av.label("|----------------------------  <em>n–3</em>  --------------------------|",  {top: "15px", left: "313px"}).addClass("mediumLabel");
  left_side.hide();
  left_side = av.label("|----- <em>2</em> -----|", {top: "15px", left: "222px"}).addClass("mediumLabel2");
  av.step();

  // Slide 7
  av.umsg(interpret["Slide 7"]);
  pivot.translate(30, 0);
  piv.translate(30, 0);
  index.translate(30, 0);
  index.text("<em>k=3</em>");
  right_side.hide();
  right_side = av.label("|--------------------------  <em>n–4</em>  -------------------------|",  {top: "15px", left: "342px"}).addClass("mediumLabel");
  left_side.hide();
  left_side = av.label("|-------- <em>3</em> ---------|", {top: "15px", left: "222px"}).addClass("mediumLabel2");
  av.step();

  // Slide 8
  av.umsg(interpret["Slide 8"]);
  pivot.hide();
  pivot = av.g.rect(330, 50, 30, 30);
  piv.hide();
  piv = av.label("pivot", {top: "45px", left: "333px"}).addClass("smallLabel");
  index.hide();
  index = av.label("<em>k</em>", {top: "15px", left: "337px"}).addClass("mediumLabel");
  right_side.hide();
  left_side.hide();
  var right_side = av.label("|----------------------  <em>n–1–k</em>  ---------------------|",  {top: "15px", left: "365px"}).addClass("mediumLabel");
  var left_side = av.label("|----------- <em>k</em> -----------|", {top: "15px", left: "222px"}).addClass("mediumLabel2");
  av.step();

  // Slide 9
  av.umsg(interpret["Slide 9"]);
  // var eqn = av.label("<em>1/n</em> &Sigma;<em><sub>k&lt;n</sub> T(k)+T(n–1–k)</em>",  {top: "0px", left: "0px"}); //.addClass("largeLabel");
  // eqn.show();
  av.step();

  // Slide 10
  av.umsg(interpret["Slide 10"]);
  av.step();

  // Slide 11
  av.umsg(interpret["Slide 11"]);
  // eqn.hide();
  // eqn = av.label("<em>T(n) = cn + 1/n</em> &Sigma;<em><sub>k&lt;n</sub> T(k)+T(n–1–k)</em>",  {top: "0px", left: "0px"}); //.addClass("largeLabel");
  av.step();

  // Slide 12
  av.umsg(interpret["Slide 12"]);
  av.recorded();
});
