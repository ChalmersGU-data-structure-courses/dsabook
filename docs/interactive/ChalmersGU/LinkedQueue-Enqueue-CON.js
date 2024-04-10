/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// List Queue enqueue method.
$(document).ready(function() {
  "use strict";
  var av_name = "LinkedQueue-Enqueue-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
    "enqueue(x:E)",
    "    newRear : E = new Node(x, null)",
    "    if queueSize == 0",
    "        front = newRear",
    "    else",
    "        rear.next = newRear",
    "    rear = newRear",
    "    queueSize += 1",
  ], {lineNumbers: false});

  var leftMargin = 10;
  var topMargin = 40;
  var list = av.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  list.addFirst(30).addFirst(21).addFirst(3).addFirst(42);
  var newNode = list.newNode("10");
  newNode.css({top: topMargin + 20});
  list.layout();
  newNode.hide();

  av.pointer("front", list.get(0));
  var rearP = av.pointer("rear", list.get(3));

  // Slide 1
  av.umsg("Let's look at how the <code>enqueue</code> operation works.");
  pseudo.setCurrentLine(1);
  av.displayInit();

  // Slide 2
  av.umsg("We will enqueue the the value 10. Create a new node with this value.");
  list.layout();
  pseudo.setCurrentLine(2);
  newNode.show();
  newNode.highlight();
  var endNode = list.get(3);
  endNode.next(newNode);
  endNode.edgeToNext().hide();
  list.layout({updateTop: false});
  av.step();

  // Slide 3
  av.umsg("The <code>next</code> field of the <code>rear</code> node is assigned to point to the new node.");
  newNode.unhighlight();
  endNode.edgeToNext().show();
  pseudo.setCurrentLine(6);
  list.layout({updateTop: false});
  av.step();

  // Slide 4
  av.umsg("Advance <code>rear</code> to point to the new link node.");
  list.layout();
  rearP.target(list.get(4));
  pseudo.setCurrentLine(7);
  av.step();

  // Slide 5
  av.umsg("Increase <code>queueSize</code> by 1.");
  pseudo.setCurrentLine(8);
  av.recorded();
});
