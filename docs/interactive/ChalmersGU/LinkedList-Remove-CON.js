/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";
  var av_name = "LinkedList-Remove-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
    "remove(i:int) : E",
    "    // Precondition: 0 <= i < listSize",
    "    if i == 0",
    "        removed : Node = head",
    "        head = removed.next",
    "    else",
    "        prev : Node = head",
    "        repeat i-1 times",
    "            prev = prev.next",
    "        removed : Node = prev.next",
    "        prev.next = removed.next",
    "    removed.next = null   // For garbage collection",
    "    listSize -= 1",
    "    return removed.elem",
  ], {lineNumbers: false});

  // Relative offsets
  var leftMargin = 220;
  var topMargin = 70;

  var l = av.ds.list({nodegap: 30, center: false, left: leftMargin, top: topMargin});
  l.addFirst(15).addFirst(12).addFirst(10).addFirst(23).addFirst(20);
  l.layout();
  av.pointer("head", l.get(0));

  var delPos = 3;
  var listSize = 5;
  av.label("listSize", {left: 20, top: topMargin-50});
  var listSizeArr = av.ds.array([listSize], {indexed: false, top: topMargin-55, left: 80});

  // Slide
  av.umsg("Now we look at the <code>remove</code> method.");
  pseudo.highlight(1);
  av.displayInit();

  // Slide
  av.umsg(`We want to remove the node at position ${delPos}, with value ${l.get(delPos).value()}.`);
  var prevNode = l.get(delPos-1);
  var delNode = prevNode.next();
  delNode.highlight();
  // l.layout({updateLeft: false}); // Do not change left position on update
  av.step();

  // Slide
  av.umsg(`First we move the <code>prev</code> pointer to the node before.`);
  var prevP = av.pointer("prev", l.get(0));
  pseudo.unhighlight(1);
  pseudo.highlight([7,8,9]);
  prevP.target(prevNode);
  av.step();

  // Slide
  av.umsg("Remember the node to remove, which is <code>prev.next</code>.");
  delNode.unhighlight();
  var delPtr = av.pointer("removed", delNode);
  pseudo.unhighlight([7,8,9]);
  pseudo.highlight(10);
  av.step();

  // Slide
  av.umsg("Reassign the <code>next</code> field of the <code>prev</code> node to point to the node following the one being deleted.");
  delNode.css({top: -30});
  delPtr.target(delNode);
  var delArrow = av.g.line(leftMargin+260, topMargin, leftMargin+295, topMargin+25,
                           {"arrow-end": "classic-wide-long", opacity: 0, "stroke-width": 2});
  delArrow.show();
  delNode.edgeToNext().hide();

  prevNode.next(delNode.next());
  prevNode.highlight();
  prevNode.next().highlight();
  pseudo.unhighlight(10);
  pseudo.highlight(11);
  l.layout({updateLeft: false});
  av.step();

  // Slide
  av.umsg("Set the <code>next</code> field node to be deleted to <code>null</code>. This removes the node from the linked list, and makes it possible to garbage delete it.");
  delArrow.hide();
  delNode.next("");
  pseudo.unhighlight(11);
  pseudo.highlight(12);
  av.step();

  // Slide
  av.umsg("Decrease the list size by 1.");
  prevNode.unhighlight();
  prevNode.next().unhighlight();
  pseudo.unhighlight(12);
  pseudo.highlight(13);
  listSizeArr.value(0, listSize-1);
  listSizeArr.highlight(0);
  av.step();

  // Slide
  av.umsg("Return the value of the node that was deleted.");
  listSizeArr.unhighlight(0);
  delNode.highlight();
  pseudo.unhighlight(13);
  pseudo.highlight(14);
  av.step();

  // Slide
  av.umsg("Finished! The removed node can now be garbage collected.");
  prevP.hide();
  delPtr.hide();
  delNode.hide();
  l.layout();
  listSizeArr.unhighlight(0);
  pseudo.unhighlight(14);
  av.recorded();
});
