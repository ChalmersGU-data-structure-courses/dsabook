/*global JSAV, document */
// Written by Jieun Chon

$(document).ready(function() {
  "use strict";
  var av = new JSAV("expressionTreeCON", {animationMode: "none"});
  av.ds.array([" ", "-", " "], {left: 420});

  var topDiff = 60;
  av.ds.array([" ", "*", " "], {left: 350, top: topDiff});
  var arr3 = av.ds.array(["c"], {left: 520, top: topDiff});
  arr3.addClass([0], "internalnode");

  topDiff += 60;
  av.ds.array([" ", "*", " "], {left: 240, top: topDiff});
  av.ds.array([" ", "+", " "], {left: 460, top: topDiff});

  topDiff += 60;
  var arr6 = av.ds.array(["4"], {left: 240, top: topDiff});
  var arr7 = av.ds.array(["x"], {left: 300, top: topDiff});
  av.ds.array([" ", "*", " "], {left: 400, top: topDiff});
  var arr9 = av.ds.array(["a"], {left: 550, top: topDiff});
  arr6.addClass([0], "internalnode");
  arr7.addClass([0], "internalnode");
  arr9.addClass([0], "internalnode");

  topDiff += 60;
  var arr10 = av.ds.array(["2"], {left: 400, top: topDiff});
  var arr11 = av.ds.array(["x"], {left: 460, top: topDiff});
  arr10.addClass([0], "internalnode");
  arr11.addClass([0], "internalnode");

  //line for [-] - [*]
  av.g.line(440, 40, 400, 80, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for [-] - c
  av.g.line(495, 40, 535, 80, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for [*] - [*]
  av.g.line(370, 100, 290, 140, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for [*] - [+]
  av.g.line(425, 100, 505, 140, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for [*] - 4
  av.g.line(255, 160, 255, 200, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for [*] - x
  av.g.line(315, 160, 315, 200, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for [+] - [*]
  av.g.line(475, 160, 450, 200, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for [+] - a
  av.g.line(535, 160, 565, 200, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for [*] - 2
  av.g.line(420, 220, 420, 260, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  //line for [*] - x
  av.g.line(475, 220, 475, 260, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  av.displayInit();
  av.recorded();
});
