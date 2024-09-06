$(document).ready(function() {
  "use strict";
  var av_name = "GeometricSumProofCON";
  var av = new JSAV(av_name);
  var xoffset = 50;
  var yoffset = 20;
  var circRadius = 10;
  typeof MathJax !== 'undefined' && MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
  $(".avcontainer").on("jsav-message", function() {
    typeof MathJax !== 'undefined' && MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  });

  // Slide 1
  av.umsg("Proof of sum of a geometric series:");
  av.umsg("<br> Assume that <em>a ≠ 1</em>, and let the sum of the first <em>n + 1</em> items a geometric series equal to <em>s</em>, which means:", {"preserve": true});
  av.umsg("<br> <em>s = 1 + a + a<sup>2</sup> + ... + a<sup>n</sup></em>", {"preserve": true});
  av.displayInit();

  // Slide 2
  av.umsg("Multiply <em>a</em> on the both sides of the equation, we get:");
  av.umsg("<br> <em>s = 1 + a + a<sup>2</sup> + ... + a<sup>n</sup></em>", {"preserve": true});
  av.umsg("<br> <em>as = a + a<sup>2</sup> + a<sup>3</sup> + ... + a<sup>n+1</sup></em>", {"preserve": true});
  av.step();

  // Slide 3
  av.umsg("Subtract the second equation from the first equation, there are only two elements left, which is <em>1</em> and <em>a<sup>n+1</sup></em>");
  av.umsg("<br> <em>s = 1 + a + a<sup>2</sup> + ... + a<sup>n</sup></em>", {"preserve": true});
  av.umsg("<br> <em>as = a + a<sup>2</sup> + a<sup>3</sup> + ... + a<sup>n+1</sup></em>", {"preserve": true});
  av.umsg("<br> <em>s – as = 1 – a<sup>n+1</sup></em>", {"preserve": true});
  var g = av.ds.graph();
  var a1 = g.addNode("<em>a</em>", {left: xoffset - 43, top: yoffset - 25}); 
  var a2 = g.addNode("<em>a<sup>2</sup></em>", {left: xoffset + 28, top: yoffset - 25}); 
  var an = g.addNode("<em>a<sup>n</sup></em>", {left: xoffset + 145, top: yoffset - 25}); 
  var a_1 = g.addNode("<em>a</em>", {left: xoffset - 110, top: yoffset + 45}); 
  var a_2 = g.addNode("<em>a<sup>2</sup></em>", {left: xoffset - 43, top: yoffset + 45}); 
  var a_n = g.addNode("<em>a<sup>n</sup></em>", {left: xoffset + 75, top: yoffset + 45});  
  var l1 = av.g.line(xoffset + 155, yoffset + 22, xoffset + 90, yoffset + 61, {"stroke-width": 1.5});
  var l2 = av.g.line(xoffset + 222, yoffset + 22, xoffset + 155, yoffset + 61, {"stroke-width": 1.5});
  var l3 = av.g.line(xoffset + 342, yoffset + 22, xoffset + 275, yoffset + 61, {"stroke-width": 1.5});
  g.layout();
  var lab1 = av.label("<em>s = &nbsp;&nbsp;&nbsp; 1 &nbsp;&nbsp;&nbsp; +</em>", {"top": yoffset - 20, "left": xoffset + 45});
  var lab2 = av.label("<em>as =</em>", {"top": yoffset + 50, "left": xoffset + 35});
  var lab3 = av.label("<em>+</em>", {"top": yoffset - 20, "left": xoffset + 188});
  var lab4 = av.label("<em>+ &nbsp; ..... &nbsp; +</em>", {"top": yoffset - 20, "left": xoffset + 255});
  var lab5 = av.label("<em>+</em>", {"top": yoffset + 50, "left": xoffset + 118});
  var lab6 = av.label("<em>+ &nbsp; ..... &nbsp; +</em>", {"top": yoffset + 50, "left": xoffset + 185});
  var lab7 = av.label("<em>+ &nbsp;&nbsp; a<sup>n+1</sup></em>", {"top": yoffset + 50, "left": xoffset + 310});
  // var c1 = av.g.circle(xoffset + 178, yoffset + 7, circRadius);
  // var c2 = av.g.circle(xoffset + 222, yoffset + 7, circRadius);
  // var c3 = av.g.circle(xoffset + 354, yoffset + 7, circRadius);
  // var c4 = av.g.circle(xoffset + 136, yoffset + 47, circRadius);
  // var c5 = av.g.circle(xoffset + 179, yoffset + 47, circRadius);
  // var c6 = av.g.circle(xoffset + 221, yoffset + 47, circRadius);
  // var c7 = av.g.circle(xoffset + 315, yoffset + 47, circRadius);
  // var l1 = av.g.line(xoffset + 178, yoffset + 17, xoffset + 136, yoffset + 37);
  // var l2 = av.g.line(xoffset + 222, yoffset + 17, xoffset + 178, yoffset + 37);
  // var l3 = av.g.line(xoffset + 265, yoffset + 17, xoffset + 222, yoffset + 37);
  // var l4 = av.g.line(xoffset + 354, yoffset + 17, xoffset + 315, yoffset + 37);
  av.step();

  // Slide 4
  av.umsg("<em>s (1 – a) = 1 – a<sup>n+1</sup></em>");
  av.step();

  // Slide 5
  av.umsg("Now we get the final result:");
  av.umsg("<br> <em>s = (1 – a<sup>n+1</sup>) / (1 – a)</em>", {"preserve": true});
  av.recorded();
});
