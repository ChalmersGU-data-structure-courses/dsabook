/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";
  var av_name = "LinkedList-Iteration-CON";
  var av = new JSAV(av_name);

  // Set up the list
  var l = av.ds.list({nodegap: 30, top: 35, left: 257});
  l.addFirst(15).addFirst(12).addFirst(10).addFirst(23).addFirst(20);
  l.layout();

  // Set up the various pointers
  var head = av.pointer("head", l.get(0), {anchor: "left top", myAnchor: "right bottom", right: -20, top: -20});
  var curr = av.pointer("current", l.get(0));
  head.hide();
  curr.hide();

  // Slide
  av.umsg(`
Here is a graphical depiction for a linked list storing five integers. The value stored in a pointer variable is indicated by an arrow "pointing" to something. A NULL pointer is indicated graphically by a diagonal slash through a pointer variable's box.
`);
  av.displayInit();

  // Slide
  av.umsg(`
The list's first node is accessed from a pointer named <code>head</code>. 
`);
  head.show();
  av.step();

  // Slide
  av.umsg(`
When iterating through the elements of the list, we need a temporary pointer <code>current</code> .
It starts with the <code>head</code>, and on each iteration updates itself by
following its own <code>next</code>.
`);
  curr.show();
  av.step();
  for (let i = 1; i < 5; i++) {
    curr.target(l.get(i));
    av.step();
  }

  // Slide
  curr.hide();
  av.umsg("This way we can easily get and set values of specific nodes. But how do we add or remove elements?");
  av.recorded();
});
