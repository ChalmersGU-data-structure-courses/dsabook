/*global ODSA,MathJax */
// Written by Yuhui Lyu and Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "DandCRecurrenceCON";
  var av;
  var circRadius = 13;
  var xoffset = 50;
  var yoffset = 80;
  av = new JSAV(av_name);
  typeof MathJax !== 'undefined' && MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"], ["\\(", "\\)"]]}});
  $(".avcontainer").on("jsav-message", function() {
    typeof MathJax !== 'undefined' && MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  });

  // Slide 1
  av.umsg("For a problem of size <em>n</em>, we have <em>c n<sup>k</sup></em> units of work plus the amount of work required for <em>a</em> subproblems of size <em>n/b</em> each.");
  av.umsg("<br> <em>T(n) = a T(n/b) + c n<sup>k</sup></em>", {preserve: true});
  av.label("<b><u>Amount of Work</u></b>", {top: yoffset - 60, left: xoffset + 450});
  av.label("<b><u>Number of nodes</u></b>", {top: yoffset - 60, left: xoffset + 600});
  av.label("<em>1</em>", {top: yoffset - 27, left: xoffset + 650});
  av.label("---------------------------------------------", {top: yoffset - 25, left: xoffset + 260});
  av.label("<em>c n<sup>k</sup></em>", {top: yoffset - 27, left: xoffset + 500});
  av.label("<em>a</em>",  {top: yoffset - 10, left: xoffset + 150});
  av.label("....", {top: yoffset + 40, left: xoffset + 140});
  av.label("....", {top: yoffset + 40, left: xoffset + 240});
  av.g.circle(xoffset + 200, yoffset, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 100, yoffset + 69, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 200, yoffset + 69, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 300, yoffset + 69, circRadius, {"stroke-width": "2"});
  av.label("<em>n</em>", {top: yoffset - 27, left: xoffset + 197});
  av.label("<em>n/b</em>", {top: yoffset + 42, left: xoffset + 89});
  av.label("<em>n/b</em>", {top: yoffset + 42, left: xoffset + 189});
  av.label("<em>n/b</em>", {top: yoffset + 42, left: xoffset + 289});
  av.g.line(xoffset + 200, yoffset + 14, xoffset + 100, yoffset + 55, {"stroke-width": "2"});
  av.g.line(xoffset + 200, yoffset + 14, xoffset + 200, yoffset + 55, {"stroke-width": "2"});
  av.g.line(xoffset + 200, yoffset + 14, xoffset + 300, yoffset + 55, {"stroke-width": "2"});
  av.displayInit();

  // Slide 2
  av.umsg("For each problem of size <em>n/b</em>, we have <em>c (n/b)<sup>k</sup></em> units of work for a total of <em>a c n<sup>k</sup> / b<sup>k</sup></em> units plus the amount of work required for <em>a</em> subproblems of size <em>n / b<sup>2</sup></em> each.");
  av.umsg("<br> <em>T(n) = a(a T(n/b<sup>2</sup>) + c(n/b)<sup>k</sup>) + c n<sup>k</sup></em>", {preserve: true});
  av.g.line(xoffset + 100, yoffset + 83, xoffset + 100, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 100, yoffset + 83, xoffset + 60, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 100, yoffset + 83, xoffset + 140, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 200, yoffset + 83, xoffset + 200, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 200, yoffset + 83, xoffset + 160, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 200, yoffset + 83, xoffset + 240, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 300, yoffset + 83, xoffset + 300, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 300, yoffset + 83, xoffset + 260, yoffset + 125, {"stroke-width": "2"});
  av.g.line(xoffset + 300, yoffset + 83, xoffset + 340, yoffset + 125, {"stroke-width": "2"});
  av.label("--------------------------", {top: yoffset + 45, left: xoffset + 350});
  av.label("<em>a c n<sup>k</sup> / b<sup>k</sup></em>", {top: yoffset + 45, left: xoffset + 500});
  av.label("<em>a</em>", {top: yoffset + 45, left: xoffset + 650});
  av.label("<em>a</em>", {top: yoffset + 70, left: xoffset + 70});
  av.label("<em>a</em>", {top: yoffset + 70, left: xoffset + 170});
  av.label("<em>a</em>", {top: yoffset + 70, left: xoffset + 270});
  av.label(".............", {top: yoffset + 140, left: xoffset + 175});
  av.step();

  // Slide 3
  av.umsg("This pattern will continue until we reach a problem of size <em>1</em>, where we have <em>a<sup>m</sup></em> subproblems each of which requires <em>c</em> units of work for a total of <em>a<sup>m</sup>c</em> units.");
  av.umsg("<br> <em>T(n) = a<sup>m</sup> T(1) + a<sup>m-1</sup>c(n/b<sup>m-1</sup>)<sup>k</sup> + ... + ac(n/b)<sup>k</sup> + c n<sup>k</sup></em>", {preserve: true});
  av.g.circle(xoffset + 20, yoffset + 220, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 110, yoffset + 220, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 200, yoffset + 220, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 290, yoffset + 220, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 380, yoffset + 220, circRadius, {"stroke-width": "2"});
  av.label("-----------------", {top: yoffset + 190, left: xoffset + 400});
  av.label("<em>a<sup>m</sup>c</em>", {top: yoffset + 190, left: xoffset + 500});
  av.label("<em>1</em>", {top: yoffset + 195, left: xoffset + 18});
  av.label("<em>1</em>", {top: yoffset + 195, left: xoffset + 108});
  av.label("<em>1</em>", {top: yoffset + 195, left: xoffset + 198});
  av.label("<em>1</em>", {top: yoffset + 195, left: xoffset + 288});
  av.label("<em>1</em>", {top: yoffset + 195, left: xoffset + 378});
  av.label("<em>a<sup>m</sup></em>", {top: yoffset + 190, left: xoffset + 650});
  av.step();

  // Slide 4
  av.umsg("We end up having <em>log<sub>b</sub>(n) + 1</em> levels with the amount of work at the last level is  <em>a<sup>m</sup>c</em>.");
  av.label("|---------------- <em>log<sub>b</sub>(n+1)</em> --------------|", {top: yoffset + 80, left: xoffset - 120}).addClass("rotated");
  av.step();
  av.recorded();
});
