/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "GneighborCON";
  var av = new JSAV(av_name, {"animationMode" : "none"});

  var interpret = {
    "av_l1": "(a) Vertices <em>a</em> and <em>b</em> are <i>neighbors</i>",
    "av_l2": "(b) The red edge is <i>incident</i> with vertices <em>a</em> and <em>b</em>",
    "av_l3": "(a) A <i>simple</i> path from 0 to 3.",
    "av_l4": "(b) Path 0, 1, 3, 2, 4, 1 is not simple",
    "av_l5": "(c) <i>Simple cycle</i> 1, 3, 2, 4, 1",
    "av_l6": "(a) A graph with relatively few edges is called a <i>sparse graph</i>.",
    "av_l7": "(b) A graph with many edges is called a <i>dense graph</i>.",
    "av_l8": "(c) A <i>complete graph</i> has edges connecting every pair of nodes.",
    "av_l9": "(d) A <i>clique</i> is a subset of <em>V</em> where all vertices in the subset have edges to all other vertices in the subset."
  };

  var gTop = -5;
  var gLeft = 150;
  var gWidth = 150;
  var gHeight = 140;
  var lHeight = 130; // For the graph labels

  // Lines for visual break up
  av.g.line(425, gTop, 425, gHeight).addClass("borderEdge");

  var graphA = av.ds.graph({left: gLeft, top: gTop, directed: false,
                            width: gWidth, height: gHeight});

  var nodea = graphA.addNode("a", {left:   0, top:   0});
  var nodeb = graphA.addNode("b", {left:   0, top: 100});
  var nodec = graphA.addNode("c", {left: 100, top:   0});
  var noded = graphA.addNode("d", {left: 100, top: 100});
  var nodee = graphA.addNode("e", {left:  50, top:  50});

  graphA.addEdge(nodea, nodeb);
  graphA.addEdge(nodea, nodee);
  graphA.addEdge(nodeb, noded);
  graphA.addEdge(nodeb, nodee);
  graphA.addEdge(nodec, noded);
  graphA.addEdge(nodec, nodee);
  graphA.layout();

  nodea.highlight();
  nodeb.highlight();
  av.label(interpret["av_l1"], {top: lHeight, left: 100}).show();

  gLeft = 570;
  var graphB = av.ds.graph({left: gLeft, top: gTop, directed: false,
                            width: gWidth, height: gHeight});

  nodea = graphB.addNode("a", {left:   0, top:   0});
  nodeb = graphB.addNode("b", {left:   0, top: 100});
  nodec = graphB.addNode("c", {left: 100, top:   0});
  noded = graphB.addNode("d", {left: 100, top: 100});
  nodee = graphB.addNode("e", {left:  50, top:  50});

  graphB.addEdge(nodea, nodeb).addClass("redEdge");
  graphB.addEdge(nodea, nodee);
  graphB.addEdge(nodeb, noded);
  graphB.addEdge(nodeb, nodee);
  graphB.addEdge(nodec, noded);
  graphB.addEdge(nodec, nodee);

  av.label(interpret["av_l1"], {top: lHeight, left: 100}).show();
  av.label(interpret["av_l2"], {top: lHeight, left: 460}).show();
  graphB.layout();
});
