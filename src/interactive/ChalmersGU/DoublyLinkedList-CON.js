/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
// Diagram showing the doubly linked list
$(document).ready(function() {
  "use strict";
  var av = new JSAV("DoublyLinkedList-CON");
  // Relative offsets
  var leftMargin = 180;
  var topMargin = 40;
  // JSAV list
  var l = av.ds.dlist({nodegap: 30, center: false, left: leftMargin, top: topMargin});
  l.addFirst(42).addFirst(15).addFirst(12).addFirst(23).addFirst(20).addFirst(8);
  l.layout();
  av.pointer("head", l.get(0));
  av.pointer("tail", l.get(5));
  av.displayInit();
  av.recorded();
});
