/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";

  var arrValues = [13, 12, 20, ""];
  var maxSize = arrValues.length;
  var listSize = 3;
  var addValue1 = 8;
  var addValue2 = 23;

  var av_name = "DynamicArrayList-Append-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
    "add(i:int, x:E)",
    "    // Precondition: 0 <= i <= listSize",
    "    if listSize >= size of internalArray",
    "        resizeArray(size of internalArray * CapacityMultiplier)",
    "    listSize += 1",
    "    for k in listSize-1, listSize-2, ..., i+1",
    "        internalArray[k] = internalArray[k-1]",
    "    internalArray[i] = x",
  ], {lineNumbers: false});

  var arr = av.ds.array(arrValues, {indexed: true, top: 20, left: 10});
  arr.hide();

  var arrValues2 = ["", "", "", "", "", "", "", ""];
  var arr2 = av.ds.array(arrValues2, {indexed: true, top: 70, left: 10});
  arr2.hide();

  var label1 = av.label(`add(${listSize}, ${addValue1})`,
                        {before: arr, left: 60, top: -10}).hide();

  var label2 = av.label(`add(${listSize+1}, ${addValue2})`,
                        {before: arr, left: 100, top: -10}).hide();

  var arrMS = av.ds.array([maxSize], {indexed: false, left: 150, top: 130}).hide();
  var labelMS = av.label("size of internalArray", {before: arrMS, left: 10, top: 134}).hide();

  var arrLS = av.ds.array([listSize], {indexed: false, left: 150, top: 165}).hide();
  var labelLS = av.label("listSize", {before: arrLS, left: 95, top: 169}).hide();

  // Slide
  av.umsg(`Here is an array-based list with ${listSize} elements.`);
  for (let i = listSize; i < maxSize; i++) arr.addClass(i, "unused");
  arr.show();
  arrMS.show();
  arrLS.show();
  labelMS.show();
  labelLS.show();
  av.displayInit();

  // Slide
  av.umsg(`
Here is an array-based list with ${listSize} elements. 
We will append the value ${addValue1} to the end of the list.
`);
  label1.show();
  pseudo.highlight(1);
  av.step();

  // Slide
  av.umsg("There is still space left in the internal array, so we don't have to resize it.");
  pseudo.unhighlight(1);
  pseudo.highlight(3);
  av.step();

  // Slide
  av.umsg("We increase the list size.");
  pseudo.unhighlight(3);
  pseudo.highlight(5);
  arrLS.value(0, listSize+1);
  arrLS.highlight(0);
  arr.removeClass(listSize, "unused");
  av.step();

  // Slide
  av.umsg("We don't have to move any elements, since we're appending to the end of the list.");
  pseudo.unhighlight(5);
  pseudo.highlight(6);
  av.step();

  // Slide 3
  av.umsg(`So we assign the next empty slot the value ${addValue1}.`);
  pseudo.unhighlight(6);
  pseudo.highlight(8);
  arr.value(listSize, addValue1);
  arr.highlight(listSize);
  av.step();

  // Slide 2
  label1.hide();
  arr.unhighlight(listSize);
  arrLS.unhighlight(0);
  pseudo.unhighlight(8);
  av.umsg("That was easy... but let's try to add another element.");
  av.step();

  // Slide 2
  av.umsg(`Now we want to append the value ${addValue2} to the end of the list.`);
  label2.show();
  pseudo.highlight(1);
  av.step();

  // Slide 3
  av.umsg("But the internal array is full, so we have to resize it.");
  pseudo.unhighlight(1);
  pseudo.highlight(3);
  av.step();

  // Slide 3
  av.umsg("Let's make it twice as large.");
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  av.step();

  // Slide 3
  av.umsg("First we create a new temporary array.");
  for (let i = 0; i < arrValues2.length; i++) arr2.addClass(i, "unused");
  arr2.show();
  av.step();

  // Slide 3
  av.umsg("Then we copy all elements from the older internal array.");  
  for (let i = 0; i < listSize+1; i++) {
    arr2.removeClass(i, "unused");
    av.effects.copyValue(arr, i, arr2, i);
    av.step();
  }

  // Slide 3
  av.umsg("Now we can make the temporary array the internal array, and continue with the <code>add</code> method.");
  arr.hide();
  arr2.translateY(-50);
  av.step();

  // Slide
  av.umsg("We increase the list size.");
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  arrLS.value(0, listSize+2);
  arrLS.highlight(0);
  arr2.removeClass(listSize+1, "unused");
  av.step();

  // Slide 3
  av.umsg("Again, we don't have to move any elements, since we're appending to the end of the list.");
  arrLS.unhighlight(0);
  pseudo.unhighlight(5);
  pseudo.highlight(6);
  av.step();

  // Slide 3
  av.umsg(`Finally we can assign the next empty slot the value ${addValue2}.`);
  pseudo.unhighlight(6);
  pseudo.highlight(8);
  arr2.value(listSize+1, addValue2);
  arr2.highlight(listSize+1);
  av.step();

  // Slide 5
  av.umsg(`
Appending to the end of the list is constant, most of the time. 
But now and then we have to resize the array, and then it is linear in the number of elements.
`);
  label2.hide();
  arr2.unhighlight(listSize+1);
  pseudo.unhighlight(8);
  av.recorded();
});

