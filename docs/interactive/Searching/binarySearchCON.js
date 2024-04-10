/*global ODSA */
"use strict";
// Written by Pavel Hovhannisyan and Cliff Shaffer
$(document).ready(function () {
  var av_name = "binarySearchCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "The input is a sorted array, and in this example we will search for the record with key value 45. We will put a marker above 45 as a reminder that this is what we will be searching for.",
    "sc2": "We begin searching by considering the entire array, since we don't know where the value is that we are looking for. We indicate this fact by setting the left and right bounds to the ends of the array, at positions 0 and 15, respectively.",
    "sc3": "First step is to compute the position in the middle of the current subarray. We add the position of the left bound to the position of the right bound and divide by 2, giving us position 7. Look at the value in position 7, which is 41.",
    "sc4": "Since 41 is less then 45, we know that no values to the left of position 7 will have value 45. So we keep the right bound as it was, and move the left bound to position 8.",
    "sc5": "Now we compute the middle position between the current bounds (between array positions 8 and 15). Add the left bound value to the right bound value and divide the result by 2. This gives us index 11. Look at the value in position 11, which is 56.",
    "sc6": "Since 56 is larger then 45, we will keep the current left bound and move the right bound to position 10.",
    "sc7": "Now we compute the middle position between the current bounds (between array positions 8 and 10). Add the left bound value to the right bound value and divide the result by 2. This gives us index 9. Look at the value in position 9, which is 51.",
    "sc8": "Since 51 is larger then 45, we will keep the current left bound and move the right bound to position 8.",
    "sc9": "Now we compute the middle position between the current bounds (which is now only position 8). Add the left bound value to the right bound value and divide the result by 2. This gives us index 8. Look at the value in position 8, which is 45.",
    "sc10": "We have now found value 45, which is what we are looking for.",
    "sc11": "Note that if the value in position 8 had not been what we were looking for, we still would have stopped searching at this point because there is nowhere else to look. In that case, we would have returned -1 as a signal that the value is not there.",
    "sc12": "During the course of the binary search, we looked at the values in 4 array positions (shown in red)."
  };

  var pseudo = av.code([
    "# Return the position of an element in a list.",
    "# If the element is not found, return -1.",
    "def binarySearch(elements, e):",
    "    low = 0",
    "    high = len(elements) - 1",
    "    while low <= high:             # Stop when low and high meet",
    "        mid = (low + high) // 2    # Check middle of subarray",
    "        if elements[mid] < e:",
    "            low = mid + 1          # In right half",
    "        elif elements[mid] > e:",
    "            high = mid - 1         # In left half",
    "        else:",
    "            return mid             # Found it",
    "    return -1                      # Search value not in array",
  ], {lineNumbers: false,
      tags: {
        "sig": 3,
        "init": [4, 5],
        "while": 6,
        "compute": 7,
        "right": 9,
        "left": 11,
        "found": 13,
        "return": 14
      },
  });

  var theArray = [11, 13, 21, 26, 29, 36, 40, 41, 45, 51, 54, 56, 65, 72, 77, 83];
  var arr = av.ds.array(theArray, {indexed: true});

  // Slide 1
  av.umsg(interpret["sc1"]);
  arr.toggleArrow(8);
  pseudo.highlight("sig");
  av.displayInit();

  // Slide 2
  arr.highlight([0, 15]);
  av.umsg(interpret["sc2"]);
  pseudo.unhighlight("sig");
  pseudo.highlight("init");
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  arr.addClass(7, "processing");
  pseudo.unhighlight("init");
  pseudo.setCurrentLine("compute");
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"]);
  arr.removeClass(7, "processing").highlight(8);
  arr.unhighlight(0);
  arr.addClass([0, 1, 2, 3, 4, 5, 6, 7], "deemph");
  pseudo.setCurrentLine("right");
  av.step();

  // Slide 5
  av.umsg(interpret["sc5"]);
  arr.addClass(11, "processing");
  pseudo.setCurrentLine("compute");
  av.step();

  // Slide 6
  av.umsg(interpret["sc6"]);
  arr.removeClass(11, "processing").highlight(10);
  arr.unhighlight(15);
  arr.addClass([11, 12, 13, 14, 15], "deemph");
  pseudo.setCurrentLine("left");
  av.step();

  // Slide 7
  av.umsg(interpret["sc7"]);
  arr.addClass(9, "processing");
  pseudo.setCurrentLine("compute");
  av.step();

  // Slide 8
  av.umsg(interpret["sc8"]);
  arr.removeClass(9, "processing");
  arr.unhighlight(10);
  arr.addClass([9, 10, 11], "deemph");
  pseudo.setCurrentLine("left");
  av.step();

  // Slide 9
  av.umsg(interpret["sc9"]);
  arr.addClass(8, "processing");
  pseudo.setCurrentLine("compute");
  av.step();

  // Slide 10
  av.umsg(interpret["sc10"]);
  arr.removeClass(8, "processing");
  arr.addClass(8, "special");
  pseudo.setCurrentLine("found");
  av.step();

  // Slide 11
  av.umsg(interpret["sc11"]);
  pseudo.setCurrentLine(0); // Clears both "previous" and "current" line highlight
  pseudo.highlight("while");
  pseudo.highlight("return");
  av.step();

  // Slide 12
  pseudo.unhighlight("while");
  pseudo.unhighlight("return");
  av.umsg(interpret["sc12"]);
  arr.removeClass(true, "deemph");
  arr.unhighlight([7, 9]);
  arr.addClass([7, 9, 11], "special");
  av.recorded();
});
