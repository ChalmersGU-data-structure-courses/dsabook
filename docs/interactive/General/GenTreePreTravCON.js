/*global ODSA */
"use strict";
// Pre-order traversal slideshow
$(document).ready(function () {
  var av_name = "GenTreePreTravCON";
  var av = new JSAV(av_name);

  var pseudo = av.code([
    "function preorder(node):",
    "    process(node)",
    "    for each child in node.children:",
    "        preorder(child)",
  ], {lineNumbers: false,
      tags: {
        "preorder": 1,
        "process": 2,
        "foreach": 3,
        "recursive": 4,
        "finished": 9,
      },
  });

  var gt = av.ds.tree({visible: true, nodegap: 35});
  gt.root('R');
  var rt = gt.root();
  var a = gt.newNode('A');
  var b = gt.newNode('B');
  var c = gt.newNode('C');
  var d = gt.newNode('D');
  var e = gt.newNode('E');
  var f = gt.newNode('F');

  rt.addChild(a);
  rt.addChild(b);
  b.addChild(f);
  a.addChild(c);
  a.addChild(d);
  a.addChild(e);

  gt.layout();

  var rt1 = av.pointer("rt", rt, {anchor: "left top", top: -10});

  // Slide 1
  pseudo.setCurrentLine("preorder");
  av.umsg("Starting preorder traversal.");
  av.displayInit();

  // Slide 2
  rt.addClass("thicknode");
  av.umsg("First we process the root node R.");
  pseudo.setCurrentLine("process");
  av.step();

  // Slide 4
  pseudo.setCurrentLine("Now we visit the children.");
  pseudo.setCurrentLine("foreach");
  av.step();

  // Slide 5
  av.umsg("We visit the leftmost child");
  pseudo.setCurrentLine("recursive");
  av.step();

  // Slide 6
  av.umsg("The A node is visited next, and is treated as the root of a new subtree.");
  rt.addClass("processing");
  a.addClass("thicknode");
  pseudo.setCurrentLine("preorder");
  rt1.target(a);
  av.step();

  // Slide 7
  av.umsg("We process the A node.");
  pseudo.setCurrentLine("process");
  av.step();

  // Slide 10
  av.umsg("Next we visit the children");
  pseudo.setCurrentLine("foreach");
  av.step();

  // Slide 11
  av.umsg("The C node is processed next, and is treated as the root of a new subtree.");
  pseudo.setCurrentLine("process");
  a.addClass("processing");
  c.addClass("thicknode");
  rt1.target(c);
  av.step();

  // Slide 12
  pseudo.setCurrentLine("foreach");
  av.umsg("Since there are no children, we pop back to the parent.");
  av.step();

  // Slide 13
  pseudo.setCurrentLine("recursive");
  a.removeClass("processing");
  rt1.target(a);
  av.step();

  // Slide 14
  av.umsg("We continue by visiting the D node.");
  pseudo.setCurrentLine("preorder");
  av.step();

  // Slide 17
  rt1.target(d);
  a.addClass("processing");
  d.addClass("thicknode");
  pseudo.setCurrentLine("process");
  av.step();

  // Slide 19
  av.umsg("Since there are no children, we pop back to the parent.");
  a.removeClass("processing");
  rt1.target(a);
  pseudo.setCurrentLine("foreach");
  av.step();

  // Slide 20
  pseudo.setCurrentLine("checkNull");
  av.step();

  // Slide 21
  pseudo.setCurrentLine("processChild");
  av.step();

  // Slide 22
  av.umsg("Visit E - the next child of node A.");
  a.addClass("processing");
  e.addClass("thicknode");
  rt1.target(e, {anchor: "right top"});
  pseudo.setCurrentLine("process");
  av.step();
  
  // Slide 24
  av.umsg("Since this is a leaf, pop rcursion back to the parent.");
  a.removeClass("processing");
  rt1.target(a);
  pseudo.setCurrentLine("foreach");
  av.step();

  // Slide 26
  av.umsg("There are no children left to be processed.");
  av.step();

  // Slide 27
  pseudo.setCurrentLine("recursion");
  av.umsg("Pop recursion back to the parent node.");
  rt1.target(rt);
  rt.removeClass("processing");
  av.step();

  // Slide 30
  rt1.target(b);
  av.umsg("Process node B.");
  rt.addClass("processing");
  b.addClass("thicknode");
  pseudo.setCurrentLine("process");
  av.step();

  // Slide 32
  av.umsg("Visit the children of B.");
  pseudo.setCurrentLine("foreach");
  av.step();

  // Slide 35
  rt1.target(f);
  av.umsg("Process node F.");
  b.addClass("processing");
  f.addClass("thicknode");
  pseudo.setCurrentLine("process");
  av.step();

  // Slide 37
  av.umsg("There are no children left to be processed.");
  av.step();

  // Slide 38
  pseudo.setCurrentLine("foreach");
  b.removeClass("processing");
  av.umsg("Pop recursion to the parent node.");
  rt1.target(b);
  av.step();

  // Slide 40
  av.umsg("There are no children left to be processed.");
  av.step();

  // Slide 41
  rt1.target(rt);
  rt.removeClass("processing");
  pseudo.setCurrentLine("end");
  av.recorded();
});
