/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
// Positions and notation for lists
$(document).ready(function() {
  "use strict";
  var av_name = "ListADT-Positions-CON";
  var av = new JSAV(av_name);
  var arrPositions = ["[&nbsp;", 20, ",", 23, ",", 12, ",", 15, "&nbsp;]", "", "", "", ""];
  var arrLength = 4;

  //calculate left margin for the JSAV array object
  var canvasWidth = $(".jsavcanvas").width();
  var arrWidth3 = arrPositions.length * 65;
  var leftMargin3 = (canvasWidth - arrWidth3) / 2;
  var i;
  var arrowArray = [];
  var arr = av.ds.array(arrPositions, {indexed: false}).hide();

  // Slide 1
  av.umsg("Since we want to be able to insert to the front or the back of the list as well as anywhere in between, there are actually $n+1$ possible insertion positions when there are $n$ elements in the list.");
  av.displayInit();

  // Slide 2
  av.umsg(`Here is a list with ${arrLength} elements.`);
  arr.show();
  for (i = 0; i < arrPositions.length / 2; i++) {
    var x = leftMargin3 + 183 + 80 * i;
    if (i == 0) x += 10;
    if (i >= arrLength) x -= 10;
    arrowArray[i] = av.g.line(x, 0, x, 20,
                              {"arrow-end": "classic-wide-long",
                               opacity: 0, "stroke-width": 2});
    if (i > arrLength) arrowArray[i].hide();
  }
  av.step();

  // Slide 3
  av.umsg("The arrows show the five possible positions where we can add an element.");
  for (i = 0; i <= arrLength; i++) arrowArray[i].show();
  av.step();

  // Slide 4
  for (i = 0; i <= arrLength; i++) arrowArray[i].hide();
  av.umsg("Now we want to add the value 10 between the values 20 and 23.");
  var insPos = 1;
  arrowArray[insPos].show();
  av.step();

  // Slide 6
  av.umsg("The resulting list will be:");
  arrowArray[insPos].hide();
  for (i = arrPositions.length - 3; i > insPos*2; i--) {
    av.effects.copyValue(arr, i, arr, i + 2);
  }
  arr.value(insPos*2+1, 10);
  arr.css([insPos*2+1], {color: "red"});
  av.step();

  // Slide 7
  arr.css([insPos*2+1], {color: "black"});
  av.umsg("Here is another example, showing appending 17 at the end of the list.");
  insPos = arrLength+1;
  arrowArray[insPos].show();
  av.step();

  // Slide 8
  arrowArray[insPos].hide();
  av.umsg("Here is the result of appending 17.");
  for (i = arrPositions.length - 3; i >= insPos*2; i--) {
    av.effects.copyValue(arr, i, arr, i + 2);
  }
  arr.value(insPos*2, ",");
  arr.value(insPos*2+1, 17);
  arr.css([insPos*2+1], {color: "red"});
  av.step();

  // Slide 9
  av.umsg("Here is the final list.");
  arr.css([insPos*2+1], {color: "black"});
  av.recorded();
});
