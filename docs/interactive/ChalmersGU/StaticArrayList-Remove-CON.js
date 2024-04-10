/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";
  var arrValues = [13, 12, 20, 8, 3, "", "", ""];
  var maxSize = arrValues.length;
  var listSize = 5;
  var removeIndex = 1;

  var av_name = "StaticArrayList-Remove-CON";
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
      "    return x",
    ], {"lineNumbers": false}
  );

  var arr = av.ds.array(arrValues, {indexed: true, left: leftMargin, top: theTop});
  arr.hide();

  // Label in step 1
  var label = av.label(`remove(${removeIndex})`, {left: arrow1_x - 16, top: theTop - 40}).hide();

  //vertical arrow pointing to current position
  var arrow1 = av.g.line(arrow1_x, theTop - 5, arrow1_x, theTop + 15,
                         {"arrow-end": "classic-wide-long",
                          opacity: 0, "stroke-width": 2});

  //horizontal arrow in step 4
  var arrow2 = av.g.line(arrow1_x + 90, theTop+10, arrow1_x + 10, theTop+10,
                         {"arrow-end": "classic-wide-long",
                          opacity: 0, "stroke-width": 2});

  //arrays "it" and "listSize" for holding data fields
  var arrIt = av.ds.array([""], {indexed: false, left: 150, top: theTop + 70});
  var labelIt = av.label("x", {before: arrIt, left: 135, top: theTop + 75});
  arrIt.hide();
  labelIt.hide();

  var arrSize = av.ds.array([5], {indexed: false, left: 150, top: theTop + 105});
  var arrLabel = av.label("listSize", {before: arrSize, left: 95, top: theTop + 110});
  arrSize.hide();
  arrLabel.hide();

  // Slide
  av.umsg(`
Removing an element at a certain position requires shifting all later elements in the array by one position toward the head.
`);
  for (let i = listSize; i < maxSize; i++) arr.addClass(i, "unused");
  av.displayInit();

  // Slide
  av.umsg(`
Here is a list containing ${listSize} elements. 
We will remove the value ${arrValues[removeIndex]} in position ${removeIndex} of the array.
`);
  for (let i = listSize; i < maxSize; i++) arr.addClass(i, "unused");
  arr.highlight(removeIndex);
  arr.show();
  label.show();
  arrow1.show();
  arrSize.show();
  arrLabel.show();
  pseudo.highlight(1);
  av.step();

  // Slide
  av.umsg("Copy the element to be deleted.");
  arrIt.show();
  arrIt.highlight(0);
  labelIt.show();
  av.effects.copyValue(arr, removeIndex, arrIt, 0);
  pseudo.unhighlight(1);
  pseudo.highlight(3);
  av.step();

  // Slide
  // shift elements after current position one position to the left
  arr.unhighlight(removeIndex);
  av.umsg("Shift all elements after current element one position to the left.");
  arrow2.show();
  arrIt.unhighlight(0);
  pseudo.unhighlight(3);
  pseudo.highlight([4,5]);
  // for (let i = removeIndex+1; i < listSize; i++) arr.highlight(i);
  av.step();

  for (let i = removeIndex+1; i < listSize; i++) {
    av.effects.copyValue(arr, i, arr, i-1);
    // arr.value(i-1, "");
    av.step();
  }

  // Slide
  // for (let i = removeIndex+1; i < listSize; i++) arr.unhighlight(i);
  av.umsg(`
Decrease the list size by 1, from ${listSize} to ${listSize-1}.
`);
  pseudo.unhighlight([4,5]);
  pseudo.highlight(6);
  arr.addClass(listSize-1, "unused");
  arrSize.value(0, listSize-1);
  arrSize.highlight(0);
  av.step();

  // Slide
  av.umsg("To allow the interpreter to garbage collect, we have to set the previously final element to null.");
  arrow2.hide();
  arr.value(listSize-1, "");
  pseudo.unhighlight(6);
  pseudo.highlight(7);
  arrSize.unhighlight(0);
  av.step();

  // Slide 5
  av.umsg("Return the deleted element.");
  arrSize.unhighlight(0);
  arrIt.highlight(0);
  pseudo.unhighlight(7);
  pseudo.highlight(8);
  av.step();

  // Slide 6
  av.umsg("Since we might have to shift all of the remaining elements, deletion from an array-based list is $\\Theta(n)$ in the worst case if there are $n$ elements in the list.");
  arrIt.unhighlight(0);
  pseudo.unhighlight(8);
  av.recorded();
});
