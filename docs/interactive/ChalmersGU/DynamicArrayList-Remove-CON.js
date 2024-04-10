/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";
  var arrValues = [13, 12, 20, 8, "", "", "", ""];
  var maxSize = arrValues.length;
  var listSize = 4;

  var av_name = "DynamicArrayList-Remove-CON";
  var av = new JSAV(av_name);
  var leftMargin = 5,
      nodeWidth = 30,
      theTop = 35,
      arrow1_x = 22 + nodeWidth;

  var pseudo = av.code([
    "remove(i:int) : E",
    "    // Precondition: 0 <= i < listSize",
    "    x : E = internalArray[i]",
    "    for k in i+1, i+2, ..., listSize-1",
    "        internalArray[k] = internalArray[k+1]",
    "    listSize -= 1",
    "    internalArray[listSize] = null   // For garbage collection",
    "    if listSize < size of internalArray * MinLoadFactor",
    "        resizeArray(size of internalArray / CapacityMultiplier)",
    "    return x",
    "add(i:int, x:E)",
  ], {lineNumbers: false});

  var arr = av.ds.array(arrValues, {indexed: true, top: 20, left: 10});
  arr.hide();

  var arrValues2 = ["", "", "", ""];
  var arr2 = av.ds.array(arrValues2, {indexed: true, top: 70, left: 10});
  arr2.hide();

  var label1 = av.label(`remove(${listSize-1})`,
                        {before: arr, left: 100, top: -10}).hide();

  var label2 = av.label(`remove(${listSize-2})`,
                        {before: arr, left: 60, top: -10}).hide();

  var arrMS = av.ds.array([maxSize], {indexed: false, left: 150, top: 130}).hide();
  var labelMS = av.label("size of internalArray", {before: arrMS, left: 10, top: 134}).hide();

  var arrLS = av.ds.array([listSize], {indexed: false, left: 150, top: 165}).hide();
  var labelLS = av.label("listSize", {before: arrLS, left: 95, top: 169}).hide();

  var arrRem = av.ds.array([""], {indexed: false, left: 150, top: 200}).hide();
  var labelRem = av.label("x", {before: arrRem, left: 135, top: 204}).hide();

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
We will remove the last element in the list.
`);
  label1.show();
  pseudo.highlight(1);
  av.step();

  // Slide
  av.umsg(`
We copy the the value to be removed, and decrease <code>listSize</code>.
We don't have to move any elements, since we're deleting from the end of the list.
`);
  pseudo.unhighlight(1);
  pseudo.highlight([3,4,5,6,7]);
  labelRem.show();
  arrRem.show();
  av.effects.copyValue(arr, listSize-1, arrRem, 0);
  arrRem.highlight(0);
  arr.value(listSize-1, "");
  arr.addClass(listSize-1, "unused");
  arrLS.value(0, listSize-1);
  arrLS.highlight(0);
  av.step();

  // Slide
  arrRem.unhighlight(0);
  arrLS.unhighlight(0);
  av.umsg("The internal array now contains 3 elements, which is larger than 8/3, so we don't have to shrink it.");
  pseudo.unhighlight([3,4,5,6,7]);
  pseudo.highlight(8);
  av.step();

  // Slide
  av.umsg("Now we can return the removed value.");
  pseudo.unhighlight(8);
  pseudo.highlight(10);
  arrRem.highlight(0);
  av.step();

  // Slide
  label1.hide();
  labelRem.hide();
  arrRem.hide();
  arrRem.value(0, "");
  arrRem.unhighlight(0);
  pseudo.unhighlight(10);
  av.umsg("This was easy... but what if we remove another element?");
  av.step();

  // Slide
  av.umsg(`Now we want to remove the last value once again.`);
  label2.show();
  pseudo.highlight(1);
  av.step();

  // Slide
  av.umsg(`
We copy the the value to be removed, and decrease <code>listSize</code>.
We don't have to move any elements, since we're deleting from the end of the list.
`);
  pseudo.unhighlight(1);
  pseudo.highlight([3,4,5,6,7]);
  labelRem.show();
  arrRem.show();
  av.effects.copyValue(arr, listSize-2, arrRem, 0);
  arrRem.highlight(0);
  arr.value(listSize-2, "");
  arr.addClass(listSize-2, "unused");
  arrLS.value(0, listSize-2);
  arrLS.highlight(0);
  av.step();

  // Slide
  arrRem.unhighlight(0);
  arrLS.unhighlight(0);
  av.umsg("But now the internal array contains only 2 elements, which is fewer than 8/3, so we have to shrink it.");
  pseudo.unhighlight([3,4,5,6,7]);
  pseudo.highlight(8);
  av.step();

  // Slide
  av.umsg("Let's make it half the size.");
  pseudo.unhighlight(8);
  pseudo.highlight(9);
  av.step();

  // Slide
  av.umsg("First we create a new temporary array.");
  for (let i = 0; i < arrValues2.length; i++) arr2.addClass(i, "unused");
  arr2.show();
  av.step();

  // Slide
  av.umsg("Then we copy all elements from the older internal array.");  
  for (let i = 0; i < listSize-2; i++) {
    arr2.removeClass(i, "unused");
    av.effects.copyValue(arr, i, arr2, i);
    av.step();
  }

  // Slide
  av.umsg("Now we can make the temporary array the internal array, and continue with the <code>remove</code> method.");
  arr.hide();
  arr2.translateY(-50);
  av.step();

  // Slide
  av.umsg("Finally we can return the removed value.");
  pseudo.unhighlight(9);
  pseudo.highlight(10);
  arrRem.highlight(0);
  av.step();

  // Slide
  av.umsg(`
Removing from the end of the list is constant, most of the time. 
But now and then we have to resize the array, and then it is linear in the number of elements.
`);
  label2.hide();
  labelRem.hide();
  arrRem.hide();
  arrRem.unhighlight(0);
  pseudo.unhighlight(10);
  av.recorded();
});
