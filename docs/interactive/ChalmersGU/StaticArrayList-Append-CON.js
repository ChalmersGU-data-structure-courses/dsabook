/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";

  var arrValues = [13, 12, 20, 8, 3, "", "", ""];
  var maxSize = arrValues.length;
  var listSize = 5;
  var addValue = 23;

  var av_name = "StaticArrayList-Append-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
      "add(i:int, x:E)",
      "    // Precondition: listSize < size of internalArray",
      "    // Precondition: 0 <= i <= listSize",
      "    listSize += 1",
      "    for k in listSize-1, listSize-2, ..., i+1",
      "        internalArray[k] = internalArray[k-1]",
      "    internalArray[i] = x",
    ], {lineNumbers: false}
  );

  var arr = av.ds.array(arrValues, {indexed: true, top: 27, left: 10}).hide();

  var label = av.label("add(5, 23)", {before: arr, left: 80, top: -10}).hide();

  var arrMS = av.ds.array([8], {indexed: false, left: 150, top: 85}).hide();
  var labelMS = av.label("size of internalArray", {before: arrMS, left: 10, top: 89}).hide();

  var arrLS = av.ds.array([5], {indexed: false, left: 150, top: 120}).hide();
  var labelLS = av.label("listSize", {before: arrLS, left: 95, top: 124}).hide();

  // Slide
  av.umsg("Adding elements to the tail of an array-based list is easy.");
  for (let i = listSize; i < maxSize; i++) arr.addClass(i, "unused");
  av.displayInit();

  // Slide
  av.umsg(`
Here is an array-based list with ${listSize} elements. 
We will append the value ${addValue} to the end of the list.
`);
  label.show();
  pseudo.highlight(1);
  labelMS.show();
  arr.show();
  arrMS.show();
  arrLS.show();
  labelLS.show();
  av.step();

  // Slide
  av.umsg("We increase <code>listSize</code> by 1.");
  pseudo.unhighlight(1);
  pseudo.highlight(4);
  arr.removeClass(listSize, "unused");
  arrLS.value(0, 6);
  arrLS.highlight(0);
  av.step();

  // Slide
  av.umsg("We don't have to move any elements, since we're appending to the end of the list.");
  arrLS.unhighlight(0);
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  av.step();

  // Slide
  av.umsg("We simply add the value into the empty position after the current last element.");
  pseudo.unhighlight(5);
  pseudo.highlight(7);
  arrMS.unhighlight(0);
  arr.value(listSize, addValue);
  arr.highlight(listSize);
  av.step();

  // Slide
  av.umsg("Appending to the end of the list therefore requires constant time.");
  arr.unhighlight(listSize);
  pseudo.unhighlight(7);
  av.recorded();
});

