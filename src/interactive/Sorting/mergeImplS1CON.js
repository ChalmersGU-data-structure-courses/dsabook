/*global ODSA */
$(document).ready(function() {
  "use strict";

  var av_name = "mergeImplS1CON";

  var array = [5, 8, 17, 25, 30, 2, 4, 11, 20, 23];
  var empty = [];
  empty.length = array.length;
  var av = new JSAV(av_name);

  var arr = av.ds.array(array, {indexed: true, center: true, layout: "array"});


  av.umsg("Initially, we have the two sorted sublists in array A.");
  av.displayInit();

  av.umsg("Create an empty temporary array.");
  var arrtemp = av.ds.array(empty, {indexed: true, center: true, layout: "array"});
  av.step();

  let tomove;
  let i = 0, left = 0, mid = array.length >> 1;
  av.umsg("First compare the smallest values in each sublist.");
  arr.highlight(left);
  arr.highlight(mid);
  av.step();
  if (array[left] <= array[mid]) {
    av.umsg(`The smaller value is ${array[left]} in the left list.`);
    tomove = left++;
  } else {
    av.umsg(`The smaller value is ${array[mid]} in the right list.`);
    tomove = mid++;
  }
  av.step();
  av.umsg(`Copy it to position ${i} of the temp array.`);
  av.effects.copyValue(arr, tomove, arrtemp, i);
  arr.unhighlight(tomove);
  arr.addClass(tomove, "deemph");
  av.step();
  while (++i < array.length) {
    if (left >= array.length >> 1) {
      av.umsg("The left list is exhausted, copy all remaining elements from the right list.");
      tomove = mid++;
    } else if (mid >= array.length) {
      av.umsg("The right list is exhausted, copy all remaining elements from the left list.");
      tomove = left++;
    } else {
      av.umsg(i > 1 ? "Compare the smallest values in each list." :
              "Continue in this way, at each step comparing the smallest values in each list.");
      arr.highlight(left);
      arr.highlight(mid);
      av.step();
      tomove = array[left] <= array[mid] ? left++ : mid++;
      av.umsg(`Copy the smaller value to position ${i}.`);
    }
    av.effects.copyValue(arr, tomove, arrtemp, i);
    arr.unhighlight(tomove);
    arr.addClass(tomove, "deemph");
    av.step();
  }

  av.umsg("Finally, copy everything back from temp to A.");
  for (i = 0; i < empty.length; i++) {
    av.effects.copyValue(arrtemp, i, arr, i);
    arr.removeClass(i, "deemph");
    arrtemp.addClass(i, "deemph");
  }
  av.recorded();
});
