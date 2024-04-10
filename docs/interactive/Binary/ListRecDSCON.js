/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "ListRecDSCON";
  var av = new JSAV(av_name, {animationMode: "none"});

  var interpret = {
    "av_tag1": "A node followed by a list"
  };

  var l = av.ds.list({nodegap: 30, center: false, left: 210, top: 45});
  l.addFirst(10).addFirst(35).addFirst(8).addFirst(23);
  l.layout();

  av.label(interpret["av_tag1"], {left: 550, top: 10});
  av.g.line(550, 40, 490, 70, {"stroke-width": 2, "arrow-end": "classic"});
  av.g.rect(280, 50, 200, 50).css({fill: "brown", opacity: 0.2});
});
