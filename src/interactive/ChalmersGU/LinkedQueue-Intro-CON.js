/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// List-based Queue Introduction.
$(document).ready(function() {
  "use strict";
  var av_name = "LinkedQueue-Intro-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
    "class LinkedQueue: implements Queue:",
    "    front      // Pointer to front queue node",
    "    rear       // Pointer to rear queue node",
    "    queueSize  // Size of queue",
    "",
    "    LinkedQueue():",
    "        front = null",
    "        rear = null",
    "        queueSize = 0",
  ], {lineNumbers: false});

  var leftMargin = 20;
  var topMargin = 50;
  var list = av.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  list.addFirst(25).addFirst(10).addFirst(5).addFirst(42);
  list.layout();
  var frontP = av.pointer("front", list.get(0));
  var rearP = av.pointer("rear", list.get(3));

  // Would like to put this in Slide 2, but the slash doesn't hide correctly
  var listInit = av.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  listInit.addFirst(" ");
  listInit.layout();
  var frontIP = av.pointer("front", listInit.get(0), {left:-10, top:0});
  var rearIP = av.pointer("rear", listInit.get(0),
                          {anchor: "right top", myAnchor: "left bottom", left:-10, top:0});
  listInit.hide();
  frontIP.hide();
  rearIP.hide();

  // Slide
  av.umsg("Members <code>front</code> and <code>rear</code> are pointers to the front and rear queue elements, respectively.");
  pseudo.highlight([2,3]);
  av.displayInit();

  // Slide
  av.umsg("On initialization, the front and rear pointers will be null.");
  pseudo.unhighlight([2,3]);
  pseudo.highlight([7,8]);
  list.hide();
  frontP.hide();
  rearP.hide();
  // listInit.show();
  frontIP.show();
  rearIP.show();
  av.step();

  // Slide
  av.umsg("When the queue is nonempty, <code>front</code> will always point to the header node while rear points to the last node in the queue.");
  pseudo.unhighlight([7,8]);
  listInit.hide();
  frontIP.hide();
  rearIP.hide();
  list.show();
  frontP.show();
  rearP.show();
  av.recorded();
});
