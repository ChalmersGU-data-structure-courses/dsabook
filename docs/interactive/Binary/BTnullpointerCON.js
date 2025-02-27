/*global JSAV, document */
// Written by Jieun Chon

$(document).ready(function() {
  "use strict";
  var av = new JSAV("BTnullpointerCON", {animationMode: "none"});
  av.ds.array([" ", "A", " "], {left: 180});

  var topDiff = 50;
  var arrB = av.ds.array(["/", "B", " "], {left: 40, top: topDiff});
  arrB.css(0, {"background-color": "LightPink"});
  av.ds.array([" ", "C", " "], {left: 320, top: topDiff});

  topDiff += 50;
  var arrD = av.ds.array(["/", "D", "/"], {left: 70, top: topDiff});
  arrD.css(0, {"background-color": "LightPink"});
  var arrE = av.ds.array([" ", "E", "/"], {left: 230, top: topDiff});
  arrE.css(2, {"background-color": "LightPink"});
  av.ds.array([" ", "F", " "], {left: 410, top: topDiff});

  topDiff += 50;
  var arrG = av.ds.array(["/", "G", "/"], {left: 150, top: topDiff});
  var arrH = av.ds.array(["/", "H", "/"], {left: 350, top: topDiff});
  var arrI = av.ds.array(["/", "I", "/"], {left: 470, top: topDiff});
  arrG.css(0, {"background-color": "LightPink"});
  arrG.css(2, {"background-color": "LightPink"});
  arrH.css(0, {"background-color": "LightPink"});
  arrH.css(2, {"background-color": "LightPink"});
  arrI.css(0, {"background-color": "LightPink"});
  arrI.css(2, {"background-color": "LightPink"});

  //line for A - B
  av.g.line(200, 40, 90, 70, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for A - C
  av.g.line(250, 40, 370, 70, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for B - D
  av.g.line(115, 90, 120, 120, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for C - E
  av.g.line(340, 90, 280, 120, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for C - F
  av.g.line(395, 90, 450, 120, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for E - G
  av.g.line(250, 140, 200, 170, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for F - H
  av.g.line(430, 140, 395, 170, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for F - I
  av.g.line(485, 140, 515, 170, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  av.displayInit();
  av.recorded();
});
