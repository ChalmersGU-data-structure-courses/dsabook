/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Summation of 2^i
$(document).ready(function() {
  "use strict";
  var av_name = "SummationTwoPowerICON";

  var interpret = {
    "sc1": "Let's see how to find the closed form solution for <em>&Sigma;<sub>i=0...n</sub> 2<sup>i</sup></em>.",
    "sc2": "As an example, suppose that <em>n = 4</em>.",
    "sc3.1": "When <em>i=0</em>, this adds <em>1</em> to the summation. Represent this by a single rectangle.",
    "sc3.2": "<br> <em>&Sigma;<sub>i=0...4</sub> 2<sup>i</sup> = <span style='color:red'>1</span> + &Sigma;<sub>i=1...4</sub> 2<sup>i</sup></em>",
    "sc4.1": "When <em>i=1</em>, this adds <em>2</em> to the summation. Represent this by two rectangles.",
    "sc4.2": "<br> <em>&Sigma;<sub>i=0...4</sub> 2<sup>i</sup> = 1 + <span style='color:red'>2</span> + &Sigma;<sub>i=2...4</sub> 2<sup>i</sup></em>",
    "sc5.1": "When <em>i=2</em>, this adds <em>4</em> to the summation. Represent this by four rectangles.",
    "sc5.2": "<br> <em>&Sigma;<sub>i=0...4</sub> 2<sup>i</sup> = 1 + 2 + <span style='color:red'>4</span> + &Sigma;<sub>i=3...4</sub> 2<sup>i</sup></em>",
    "sc6.1": "When <em>i=3</em>, this adds <em>8</em> to the summation. Represent this by eight rectangles.",
    "sc6.2": "<br> <em>&Sigma;<sub>i=0...4</sub> 2<sup>i</sup> = 1 + 2 + 4 + <span style='color:red'>8</span> + &Sigma;<sub>i=4...4</sub> 2<sup>i</sup></em>",
    "sc7.1": "When <em>i=4</em>, this adds <em>16</em> to the summation. Represent this by 16 rectangles.",
    "sc7.2": "<br> <em>&Sigma;<sub>i=0...4</sub> 2<sup>i</sup> = 1 + 2 + 4 + 8 + <span style='color:red'>16</span></em>",
    "sc8.1": "The closed form solution for this summation can be found by calculating the area of the resulting shape.",
    "sc8.2": "<br> Let's first reorder...",
    "sc12": "Now it is easy to see that the total area is <em>2<sup>4</sup> + 2<sup>4</sup> – 1 = 2<sup>4+1</sup> – 1 = 31</em>.",
    "sc13": "In general, we have <em>&Sigma;<sub>i=0...n</sub> 2<sup>i</sup> = 2<sup>n+1</sup> – 1</em>."
};

  var av;
  var rectHeight = 30;
  var rectWidth = 50;
  var leftAlign = 1;
  var topAlign = 30;
  var labelShift = 5;
  var set1; //To hold rectangles of i = 1
  var set2; //To hold rectangles of i = 2
  var set3; //To hold rectangles of i = 3
  var set4; //To hold rectangles of i = 4

  av = new JSAV(av_name);
  set1 = av.g.set();
  set2 = av.g.set();
  set3 = av.g.set();
  set4 = av.g.set();

  //Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  //Slide 2
  av.umsg(interpret["sc2"]);
  av.step();

  //Slide 3
  av.umsg(interpret["sc3.1"]);
  av.umsg(interpret["sc3.2"], {preserve: true});
  var rect0 = av.g.rect(leftAlign, topAlign, rectWidth, rectHeight).addClass("highlight");
  var label0 = av.label("<em>i = 0</em>",
                        {top: topAlign - 0.5 * rectHeight,
                          left: leftAlign + rectWidth + labelShift});
  av.step();

  //Slide 4
  av.umsg(interpret["sc4.1"]);
  av.umsg(interpret["sc4.2"], {preserve: true});
  rect0.removeClass("highlight");
  set1.push(av.g.rect(leftAlign, topAlign + rectHeight, rectWidth, rectHeight));
  set1.push(av.g.rect(leftAlign + rectWidth, topAlign + rectHeight, rectWidth, rectHeight));
  set1.css({fill: "red"});
  var label1 = av.label("<em>i = 1</em>",
                        {top: topAlign - 0.5 * rectHeight + rectHeight,
                          left: leftAlign + 2 * rectWidth + labelShift});
  av.step();

  //Slide 5
  av.umsg(interpret["sc5.1"]);
  av.umsg(interpret["sc5.2"], {preserve: true});
  set1.css({fill: "none"});
  set2.push(av.g.rect(leftAlign, topAlign + 2 * rectHeight, rectWidth, rectHeight));
  set2.push(av.g.rect(leftAlign + rectWidth, topAlign + 2 * rectHeight, rectWidth, rectHeight));
  set2.push(av.g.rect(leftAlign + 2 * rectWidth, topAlign + 2 * rectHeight, rectWidth, rectHeight));
  set2.push(av.g.rect(leftAlign + 3 * rectWidth, topAlign + 2 * rectHeight, rectWidth, rectHeight));
  set2.css({fill: "red"});
  var label2 = av.label("<em>i = 2</em>",
                        {top: topAlign - 0.5 * rectHeight + 2 * rectHeight,
                          left: leftAlign + 4 * rectWidth + labelShift});
  av.step();

  //Slide 6
  av.umsg(interpret["sc6.1"]);
  av.umsg(interpret["sc6.2"], {preserve: true});
  set2.css({fill: "none"});
  set3.push(av.g.rect(leftAlign, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 2 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 3 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 4 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 5 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 6 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 7 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.css({fill: "red"});
  var label3 = av.label("<em>i = 3</em>",
                        {top: topAlign - 0.5 * rectHeight + 3 * rectHeight,
                          left: leftAlign + 8 * rectWidth + labelShift});
  av.step();

  //Slide 7
  av.umsg(interpret["sc7.1"]);
  av.umsg(interpret["sc7.2"], {preserve: true});
  set3.css({fill: "none"});
  set4.push(av.g.rect(leftAlign, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +      rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  2 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  3 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  4 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  5 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  6 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  7 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  8 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  9 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 10 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 11 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 12 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 13 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 14 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 15 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.css({fill: "red"});
  var label4 = av.label("<em>i = 4</em>",
                        {top: topAlign - 0.5 * rectHeight + 4 * rectHeight,
                          left: leftAlign + 16 * rectWidth + labelShift});
  av.step();

  //Slide 8
  av.umsg(interpret["sc8.1"]);
  av.umsg(interpret["sc8.2"], {preserve: true});
  set4.css({fill: "none"});
  label0.hide();
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  av.step();

  //Slide 9
  set2.translate(8 * rectWidth, rectHeight);
  av.step();

  //Slide 10
  set1.translate(12 * rectWidth, 2 * rectHeight);
  av.step();

  //Slide 11
  rect0.translate(14 * rectWidth, 3 * rectHeight);
  av.step();

  //Slide 12
  av.umsg(interpret["sc12"]);
  av.label("-1",
           {top: topAlign - 0.5 * rectHeight + 3 * rectHeight,
             left: leftAlign + 16 * rectWidth + labelShift});
  av.g.line(leftAlign + 0.25 * rectWidth, topAlign + 2.5 * rectHeight,
            leftAlign + 8.25 * rectWidth, topAlign + 2.5 * rectHeight,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.label("<em>2<sup>4</sup></em>",
           {top: topAlign + 1.5 * rectHeight,
             left: leftAlign + 8.35 * rectWidth});
  av.g.line(leftAlign + 8.75 * rectWidth, topAlign + 2.5 * rectHeight,
            leftAlign + 15.75 * rectWidth, topAlign + 2.5 * rectHeight,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.rect(leftAlign + 15 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight).css({fill: "black"});
  av.step();

  //Slide 13
  av.umsg(interpret["sc13"]);
  av.recorded();
});
