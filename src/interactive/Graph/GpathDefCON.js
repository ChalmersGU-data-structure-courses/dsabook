/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "GpathDefCON";
  var av = new JSAV(av_name, {"animationMode" : "none"});

  var interpret = {
    "av_l1": "(a) Vertices $a$ and $b$ are <i>neighbors</i>",
    "av_l2": "(b) The red edge is <i>incident</i> with vertices $a$ and $b$",
    "av_l3": "(a) A <i>simple</i> path from 0 to 3.",
    "av_l4": "(b) Path 0, 1, 3, 2, 4, 1 is not simple",
    "av_l5": "(c) <i>Simple cycle</i> 1, 3, 2, 4, 1",
    "av_l6": "(a) A graph with relatively few edges is called a <i>sparse graph</i>.",
    "av_l7": "(b) A graph with many edges is called a <i>dense graph</i>.",
    "av_l8": "(c) A <i>complete graph</i> has edges connecting every pair of nodes.",
    "av_l9": "(d) A <i>clique</i> is a subset of $V$ where all vertices in the subset have edges to all other vertices in the subset."
  };

  var gTop = -5;
  var gLeft = 75;
  var gWidth = 150;
  var gHeight = 140;
  var lHeight = 130; // For the graph labels

  // Lines for visual break up
  av.g.line(285, gTop, 285, gHeight).addClass("borderEdge");
  av.g.line(570, gTop, 570, gHeight).addClass("borderEdge");

  //set up graph
  var graphA = av.ds.graph({left: gLeft, top: gTop, directed: true,
                            width: 200, height: gHeight});
  var node0 = graphA.addNode("0", {left:   0, top:   0});
  var node1 = graphA.addNode("1", {left:   0, top: 100});
  var node2 = graphA.addNode("2", {left: 100, top:   0});
  var node3 = graphA.addNode("3", {left: 100, top: 100});
  var node4 = graphA.addNode("4", {left:  50, top:  50});

  graphA.addEdge(node0, node1).addClass("redEdge");
  graphA.addEdge(node0, node4);
  graphA.addEdge(node1, node3).addClass("redEdge");
  graphA.addEdge(node2, node4);
  graphA.addEdge(node3, node2);
  graphA.addEdge(node4, node1);
  node0.highlight();
  node3.highlight();
  graphA.layout();

  av.label(interpret["av_l3"], {top: lHeight, left: 45, width: 20}).show();

  //set up second graph
  var graphB = av.ds.graph({left: 360, top: gTop, directed: true,
                            width: 200, height: gHeight});

  node0 = graphB.addNode("0", {left:   0, top:   0});
  node1 = graphB.addNode("1", {left:   0, top: 100});
  node2 = graphB.addNode("2", {left: 100, top:   0});
  node3 = graphB.addNode("3", {left: 100, top: 100});
  node4 = graphB.addNode("4", {left:  50, top:  50});

  graphB.addEdge(node0, node1, {weight: 3}).addClass("redEdge");
  graphB.addEdge(node0, node4, {weight: 4});
  graphB.addEdge(node1, node3, {weight: 3}).addClass("redEdge");
  graphB.addEdge(node2, node4, {weight: 1}).addClass("redEdge");
  graphB.addEdge(node3, node2, {weight: 7}).addClass("redEdge");
  graphB.addEdge(node4, node1, {weight: 1}).addClass("redEdge");
  graphB.layout();

  av.label(interpret["av_l4"], {top: lHeight, left: 310}).show();

  //set up graph three
  //set up second graph
  var graphC = av.ds.graph({left: 645, top: gTop, directed: true,
                            width: 200, height: gHeight});

  node0 = graphC.addNode("0", {left:   0, top:   0});
  node1 = graphC.addNode("1", {left:   0, top: 100});
  node2 = graphC.addNode("2", {left: 100, top:   0});
  node3 = graphC.addNode("3", {left: 100, top: 100});
  node4 = graphC.addNode("4", {left:  50, top:  50});

  graphC.addEdge(node0, node1, {weight: 3});
  graphC.addEdge(node0, node4, {weight: 4});
  graphC.addEdge(node1, node3, {weight: 3}).addClass("redEdge");
  graphC.addEdge(node2, node4, {weight: 1}).addClass("redEdge");
  graphC.addEdge(node3, node2, {weight: 7}).addClass("redEdge");
  graphC.addEdge(node4, node1, {weight: 1}).addClass("redEdge");
  graphC.layout();

  av.label(interpret["av_l5"], {top: lHeight, left: 620}).show();
});
