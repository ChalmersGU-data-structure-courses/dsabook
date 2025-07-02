/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";
  var av_name = "StaticArrayList-Vars-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
      "datatype ArrayList implements List:",
      "    internalArray = new Array(capacity)",
      "    size = 0",
    ], {lineNumbers: false}
  );

  ////////////////////////////////////////////////////////////////////////////////
  av.umsg(`
Let's take a look at the private data members for datatype <code>ArrayList</code>.
`);
  av.displayInit();

  ////////////////////////////////////////////////////////////////////////////////
  av.umsg(`
First, notice that datatype <code>ArrayList</code> implements the <code>List</code> interface.
This means that <code>ArrayList</code> is required to give implementations for
all of the methods listed as part of the <code>List</code> interface.
`);
  pseudo.highlight(1);
  av.step();

  ////////////////////////////////////////////////////////////////////////////////
  av.umsg(`
The first of the private data members is <code>internalArray</code>, the array which holds the list elements.
Because <code>internalArray</code> must be allocated at some fixed size,
the size of the array must be known when the list object is created.
`);
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  av.step();

  ////////////////////////////////////////////////////////////////////////////////
  av.umsg(`
At any given time the list actually holds some number of elements that can be less than
the maximum allowed by the array. This value is stored in <code>size</code>.
`);
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  av.step();

  ////////////////////////////////////////////////////////////////////////////////
  av.umsg(`
When creating a new <code>ArrayList</code>, we have to know the maximum capacity of the internal array.
`);
  pseudo.unhighlight(3);
  pseudo.highlight(2);
  av.step();

  ////////////////////////////////////////////////////////////////////////////////
  av.umsg(`
But since the actual array is empty, we set the array size to 0.
`);
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  av.recorded();
});
