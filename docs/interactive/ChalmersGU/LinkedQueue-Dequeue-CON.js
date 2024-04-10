/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// List Queue dequeue method.
$(document).ready(function() {
  "use strict";
  var av_name = "LinkedQueue-Dequeue-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
    "dequeue() : E",
    "    // Precondition: queueSize > 0",
    "    removed : Node = front",
    "    front = removed.next",
    "    removed.next = null   // For garbage collection",
    "    queueSize -= 1",
    "    if queueSize == 0",
    "        rear = null",
    "    return removed.elem",
  ], {lineNumbers: false});

  var leftMargin = 10;
  var topMargin = 50;

  var list = av.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  list.addFirst(30).addFirst(21).addFirst(3).addFirst(42);
  list.layout();

  var frontP = av.pointer("front", list.get(0));
  av.pointer("rear", list.get(3));

  var itP = av.pointer("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removed", list.get(0),
                       {arrowAnchor:"center bottom", myAnchor:"left center", top:60, left:20});
  itP.hide();

  // Slide
  av.umsg("Now for the <code>dequeue</code> operation.");
  pseudo.setCurrentLine(1);
  av.displayInit();

  // Slide
  av.umsg("Store the dequeued value.");
  list.get(0).highlight();
  itP.show();
  pseudo.setCurrentLine(3);
  av.step();

  // Slide
  av.umsg("Advance front to point to the new link node.");
  list.get(0).unhighlight();
  frontP.target(list.get(1));
  pseudo.setCurrentLine(4);
  av.step();

  // Slide
  av.umsg("Remove the next pointer of the removed node.");
  list.get(0).edgeToNext().hide();
  list.layout();
  pseudo.setCurrentLine(5);
  av.step();

  // Slide
  av.umsg("Decrease the queue size by 1.");
  pseudo.setCurrentLine(6);
  av.step();

  // Slide
  av.umsg("Check that the queue is not empty. If it were, this would be a special case requiring <code>rear</code> to be adjusted.");
  pseudo.setCurrentLine(7);
  av.step();

  // Slide
  av.umsg("Return the dequeued value.");
  list.get(0).highlight();
  pseudo.setCurrentLine(9);
  av.recorded();
});
