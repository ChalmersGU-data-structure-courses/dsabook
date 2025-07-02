// Written by Jun Yang and Cliff Shaffer
// LStack push slideshow
$(document).ready(function() {
  "use strict";
  var av_name = "LinkedStack-Push-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
    "push(x):",
    "    n = new Node()",
    "    n.elem = x",
    "    n.next = top",
    "    top = n",
    "    size = size + 1",
  ], {lineNumbers: false});

  // Relative offsets
  var leftMargin = 20;
  var topMargin = 35;
  var list = av.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  list.addFirst(15).addFirst(12).addFirst(8).addFirst("");
  var newnode = list.get(0);
  newnode.edgeToNext().hide();
  newnode.hide();
  list.layout();
  var topPointer = av.pointer("top", list.get(1));

  // Dummy hidden array for copy effect
  var arr = av.ds.array([10]);
  arr.hide();

  // Slide
  av.umsg("Here is the <code>push</code> operation. First we see the linked stack before <code>push</code>");
  pseudo.highlight(1);
  av.displayInit();

  // Slide
  av.umsg("Create a new node.");
  newnode.show();
  list.layout();
  newnode.highlight();
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  av.step();

  // Slide
  av.umsg("Set the value of the new node.");
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  av.effects.copyValue(arr, 0, newnode);
  av.step();

  // Slide
  av.umsg("Modify the <code>next</code> field of the newly created link node to point to the top of the stack");
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  newnode.edgeToNext().show();
  av.step();

  // Slide
  av.umsg("Then set top to point to the new link node.");
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  topPointer.target(newnode);
  av.step();

  // Slide
  av.umsg("Increase stack size by 1.");
  newnode.unhighlight();
  pseudo.unhighlight(5);
  pseudo.highlight(6);
  av.recorded();
});
