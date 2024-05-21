// Written by Jun Yang and Cliff Shaffer
// LStack pop slideshow
$(document).ready(function() {
  "use strict";
  var av_name = "LinkedStack-Pop-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
    "pop():",
    "    // Precondition: stackSize > 0",
    "    removed = top",
    "    top = removed.next",
    "    removed.next = null",
    "    stackSize = stackSize - 1",
    "    return removed.elem",
  ], {lineNumbers: false});

  // Relative offsets
  var leftMargin = 10;
  var topMargin = 35;
  var list = av.ds.list({nodegap: 30, left: leftMargin + 60, top: topMargin});
  list.addFirst(15)
    .addFirst(12)
    .addFirst(8)
    .addFirst(23);

  var firstnode = list.get(0);
  var topPointer = av.pointer("top", firstnode);
  list.layout();

  var arrIt = av.ds.array([""], {left: leftMargin + 110, top: topMargin + 55});
  av.label("removed", {left: leftMargin + 40, top: topMargin + 60});

  // Slide
  av.umsg("Method <code>pop</code> is also quite simple.");
  pseudo.highlight(1);
  av.displayInit();

  // Slide
  av.umsg("<code>top</code> points to the first node.");
  firstnode.highlight();
  pseudo.unhighlight(1);
  pseudo.highlight(3);
  av.step();

  // Slide
  av.umsg("Variable <code>removed</code> stores the top node's value as it is removed from the stack.");
  av.effects.copyValue(firstnode, arrIt, 0);
  firstnode.unhighlight();
  arrIt.highlight(0);
  av.step();

  // Slide
  av.umsg("The stack is updated by setting <code>top</code> to point to the next link in the stack.");
  arrIt.unhighlight();
  list.get(1).highlight();
  topPointer.target(list.get(1));
  list.layout();
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  av.step();

  // Slide
  av.umsg("The old node becomes garbage.");
  firstnode.addClass("unused");
  firstnode.edgeToNext().hide();
  list.layout();
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  av.step();

  // Slide
  av.umsg("Decrease the stack size by 1.");
  firstnode.hide();
  list.layout();
  pseudo.unhighlight(5);
  pseudo.highlight(6);
  av.step();

  // Slide
  av.umsg("The element value is returned.");
  arrIt.highlight();
  list.get(1).unhighlight();
  pseudo.unhighlight(6);
  pseudo.highlight(7);
  av.step();
  av.recorded();
});
