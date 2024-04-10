/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";
  var av_name = "LinkedList-Problems-CON";
  var av = new JSAV(av_name);

  // Linked list
  var l = av.ds.list({nodegap: 30, top: 40, left: 257});
  l.addFirst(15).addFirst(12).addFirst(10).addFirst(23).addFirst(20);
  l.layout();

  av.pointer("head", l.get(0));
  var curr = av.pointer("current", l.get(2));
  var dashlineLeftMargin = 452;    // Dash line in step 4
  var dashline = av.g.polyline([[dashlineLeftMargin, 66],
                                [dashlineLeftMargin + 13, 66],
                                [dashlineLeftMargin + 13, 30],
                                [dashlineLeftMargin + 83, 30],
                                [dashlineLeftMargin + 83, 66],
                                [dashlineLeftMargin + 101, 66]],
                               {"arrow-end": "classic-wide-long", opacity: 0,
                                "stroke-width": 2, "stroke-dasharray": "-"});

  // Slide
  av.umsg("Assume that we want to add or remove an element at a given position, which is pointed to by the <code>current</code> pointer.");
  av.displayInit();

  // Slide
    av.umsg("The problem is that we have no link to get us to the preceding node (shown in yellow). So we have no easy way to update the yellow node's <code>next</code> pointer.");
  l.get(1).highlight();
  av.step();

  // Slide
  av.umsg("Often we can get around this problem during addition or deletion by copying the value following the current node (in this case the value 12) back into the current node. Let's look at the example where we delete value 10.");
  l.get(1).unhighlight();
  l.get(3).highlight();
  av.step();

  // Slide
  av.umsg("First we remove the value 10 from the current node.");
  l.get(3).unhighlight();
  l.get(2).value("");
  l.get(2).highlight();
  av.step();

  // Slide
  av.umsg("Now we move the value 12 to the current node.");
  av.effects.moveValue(l.get(3), l.get(2));
  av.step();

  // Slide
  av.umsg("Now we can route around the un-needed node.");
  dashline.show();
  l.get(2).edgeToNext().hide();
  l.get(3).edgeToNext().hide();
  l.get(2).unhighlight();
  l.get(3).highlight();
  av.step();

  // Slide
  av.umsg("The node with a value of 10 is removed from the list.");
  dashline.hide();
  l.remove(3);
  l.get(2).edgeToNext().show();
  l.layout();
  av.step();

  // Slide
  av.umsg("Unfortunately, this approach does not work when the current node is the last one on the list, as in this example. Here we want to delete the node with value 15.");
  curr.hide();
  curr = av.pointer("current", l.get(3));
  av.step();

  // Slide
  av.umsg("But there is no way to update the <code>next</code> pointer of the node with value 12 (shown in yellow).");
  l.get(2).highlight();
  av.step();

  // Slide
  av.umsg("The solution is to have a pointer to the previous node instead of the current one. So if we want to delete the last node, we point to the node with value 12.");
  l.get(2).unhighlight();
  curr.hide();
  av.pointer("prev", l.get(2));
  av.recorded();
});
