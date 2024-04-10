/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";
  var av_name = "LinkedList-AddSpecial-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
    "add(i:int, x:E)",
    "    // Precondition: 0 <= i <= listSize",
    "    if i == 0",
    "        head = new Node(x, head)",
    "    else",
    "        prev : Node = head",
    "        repeat i-1 times",
    "            prev = prev.next",
    "        prev.next = new Node(x, prev.next)",
    "    listSize += 1",
  ], {lineNumbers: false});

  // Offsets
  var leftMargin = 200;
  var topMargin = 40;

  // Make the main list
  var l = av.ds.list({nodegap: 30, top: topMargin, left: leftMargin});
  l.addFirst(15).addFirst(12).addFirst(10).addFirst(23).addFirst(20);
  l.layout();
  var headP = av.pointer("head", l.get(0));

  var addValueLast = 42;
  var addValueFirst = 34;
  var listSize = 5;
  av.label("listSize", {left: 20, top: 10});
  var listSizeArr = av.ds.array([5], {indexed: false, top: 5, left: 80});

  // Slide
  av.umsg(`
Inserting at the beginning of the list works a bit differently. 
In this example we want to insert the value ${addValueFirst}.
`);
  pseudo.highlight(1);
  var newNode = l.newNode(addValueFirst);
  newNode.css({top: 50});  // Set the position for the new node
  l.addFirst(newNode);
  l.get(0).hide();
  l.get(0).edgeToNext().hide();
  l.layout({updateTop: false}); // Do not recalculate top coordinates
  av.displayInit();

  // Slide
  av.umsg(`The beginning of the list is position 0, so this is a special case.`);
  pseudo.unhighlight(1);
  pseudo.highlight(3);
  av.step();

  // Slide
  av.umsg(`Create a new list node and set its value to ${addValueFirst}.`);
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  l.get(0).show();
  l.get(0).highlight();
  av.step();

  // Slide
  av.umsg("Assign the <code>next</code> field of the new node to point to what <code>head</code> points to.");
  l.get(0).unhighlight();
  l.get(0).edgeToNext().show();
  l.layout({updateTop: false}); // Do not recalculate top coordinates
  av.step();

  // Slide
  av.umsg("Reassign <code>head</code> to point to the new node.");
  l.layout();
  headP.target(l.get(0));
  av.step();

  // Slide
  av.umsg("Increase the list size by 1.");
  pseudo.unhighlight(4);
  pseudo.highlight(10);
  l.get(0).unhighlight();
  listSizeArr.value(0, listSize+1);
  listSizeArr.highlight(0);
  av.step();

  // Slide
  // Reset the list for the next example
  av.umsg(`
Here is an example showing appending at the end of the list, i.e. at position ${listSize+1}.
We want to append the value ${addValueLast}.
`);
  listSizeArr.unhighlight(0);
  pseudo.unhighlight(10);
  pseudo.highlight(1);
  av.step();

  // Slide
  av.umsg(`First we move the <code>prev</code> pointer to the final node.`);
  var prevP = av.pointer("prev", l.get(0));
  pseudo.unhighlight(1);
  pseudo.highlight([6,7,8]);
  prevP.target(l.get(listSize));
  av.step();

  // Slide
  av.umsg(`Create a new list node and set its value to ${addValueLast}.`);
  pseudo.unhighlight([6,7,8]);
  pseudo.highlight(9);
  newNode = l.newNode(addValueLast);
  newNode.css({top: 50, left: 440});  // Set the position for the new node
  newNode.highlight();
  av.step();

  // Slide
  av.umsg("Assign the <code>next</code> field of the new node to point to what <code>prev.next</code> points to. Note that this doesn't change anything, since it already points to null.");
  av.step();

  // Slide
  av.umsg("Reassign <code>prev.next</code> to point to the new node.");
  newNode.unhighlight();
  l.get(listSize).next(newNode);
  l.get(listSize+1).highlight();
  l.layout();
  av.step();

  // Slide
  av.umsg("Increase the list size by 1.");
  pseudo.unhighlight(9);
  pseudo.highlight(10);
  l.get(listSize).unhighlight();
  l.get(listSize+1).unhighlight();
  listSizeArr.value(0, listSize+2);
  listSizeArr.highlight(0);
  av.step();

  // Slide
  av.umsg("Finished!");
  prevP.hide();
  listSizeArr.unhighlight(0);
  pseudo.unhighlight(10);
  av.recorded();
});

