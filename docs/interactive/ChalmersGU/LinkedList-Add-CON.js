/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";
  var av_name = "LinkedList-Add-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
    "add(i, x):",
    "    if i == 0:",
    "        head = new Node(x, head)",
    "    else:",
    "        prev = head",
    "        repeat i-1 times:",
    "            prev = prev.next",
    "        prev.next = new Node(x, prev.next)",
    "    size = size + 1",
  ], {lineNumbers: false});

  // Offsets
  var leftMargin = 217;
  var topMargin = 40;

  // Make the main list
  var l = av.ds.list({nodegap: 30, top: topMargin, left: leftMargin});
  l.addFirst(15).addFirst(12).addFirst(10).addFirst(23).addFirst(20);
  l.layout();
  var headP = av.pointer("head", l.get(0));
  var prevP = av.pointer("prev", l.get(0));
  prevP.hide();

  var addPos = 3;
  var addValue = 42;
  var listSize = 5;
  av.label("size", {left: 45, top: -5});
  var listSizeArr = av.ds.array([listSize], {indexed: false, top: -15, left: 80});

  // Horizontal arrow in step 4 pointing to item 12
  var longArrow = av.g.line(leftMargin + 190, topMargin + 31,
                            leftMargin + 298, topMargin + 31,
                            {"arrow-end": "classic-wide-long",
                             opacity: 0, "stroke-width": 2});

  // Slide
  av.umsg(`
Here is an example showing how to add the value ${addValue} at position ${addPos},
i.e., between the values ${l.get(addPos-1).value()} and ${l.get(addPos).value()}.
`);
  pseudo.highlight(1);
  av.displayInit();

  // Slide
  av.umsg(`First we move the <code>prev</code> pointer to the node before position ${addPos}.`);
  prevP.show();
  pseudo.unhighlight(1);
  pseudo.highlight([5,6,7]);
  for (let i=0; i<addPos; i++) {
    prevP.target(l.get(i));
    av.step();
  }

  // Slide
  av.umsg("Create a new list node.");
  pseudo.unhighlight([5,6,7]);
  pseudo.highlight(8);
  var newNode = l.newNode("");
  // Set the position for the new node
  newNode.css({top: 50, left: 222});
  var node = l.get(addPos-1).next();
  l.get(addPos-1).next(newNode);
  newNode.next(node);
  l.get(addPos-1).edgeToNext().hide();
  l.get(addPos).edgeToNext().hide();
  longArrow.show();
  l.layout({updateTop: false});
  newNode.highlight();
  av.step();

  // Slide
  av.umsg(`Set the new node's value to ${addValue}.`);
  newNode.value(addValue);
  av.step();

  // Slide
  av.umsg("Assign the <code>next</code> field of the new node to point to what <code>prev.next</code> points to.");
  l.get(addPos).edgeToNext().show();
  l.layout({updateTop: false}); // Do not recalculate top coordinate
  av.step();

  // Slide
  av.umsg("Reassign <code>prev.next</code> to point to the new node.");
  newNode.unhighlight();
  l.get(addPos-1).highlight();
  l.get(addPos-1).edgeToNext().show();
  longArrow.hide();
  av.step();

  // Slide
  av.umsg("The new node is in its correct position in the list.");
  l.get(addPos-1).unhighlight();
  l.get(addPos).highlight();
  l.layout();
  av.step();

  // Slide
  av.umsg("Increase the list size by 1.");
  pseudo.unhighlight(8);
  pseudo.highlight(9);
  l.get(addPos).unhighlight();
  listSizeArr.value(0, listSize+1);
  listSizeArr.highlight(0);
  av.step();

  // Slide
  av.umsg("Finished!");
  prevP.hide();
  listSizeArr.unhighlight(0);
  pseudo.unhighlight(9);
  av.recorded();
});
