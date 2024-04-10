/*global ODSA */
// Explain why sets top at position n-1.
$(document).ready(function() {
  "use strict";
  var av_name = "DynamicArrayStack-Top-CON";
  // // Load the config object with interpreter and code created by odsaUtils.js
  // var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  //     interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Relative offsets
  var leftMargin = 300;
  var topMargin = 25;

  // We start with an inverted stack
  var arr = av.ds.array([81, 5, 45, 12, "", "", "", ""],
                        {indexed: true, left: leftMargin, top: topMargin});

  // Vertical arrows
  var arrow1_x = leftMargin + 17;
  var arrow1 = av.g.line(arrow1_x, topMargin - 5, arrow1_x, topMargin + 15,
                         {"arrow-end": "classic-wide-long",
                          opacity: 100, "stroke-width": 2});

  var arrow2_x = leftMargin + 107;
  var arrow2 = av.g.line(arrow2_x, topMargin - 5, arrow2_x, topMargin + 15,
                         {"arrow-end": "classic-wide-long",
                          opacity: 100, "stroke-width": 2});
  arrow2.hide();

  var arrow3_x = leftMargin + 77;
  var arrow3 = av.g.line(arrow3_x, topMargin - 5, arrow3_x, topMargin + 15,
                         {"arrow-end": "classic-wide-long",
                          opacity: 100, "stroke-width": 2});
  arrow3.hide();

  // Array and label for "top" variable
  var topArr = av.ds.array([0], {left: leftMargin - 100, top: topMargin});
  av.label("top", {left: leftMargin - 130, top: topMargin + 5});

  // Slide 1
  av.umsg("One choice is to make the top be at position 0 in the array. In terms of list functions, all push and pop operations would then be on the element at position 0.");
  arr.highlight(0);
  arr.addClass([4, 5, 6, 7], "unused");
  av.displayInit();

  // Slide 2
  av.umsg("This implementation is inefficient, because now every push or pop operation will require that all elements currently in the stack be shifted one position in the array, for a cost of $\\theta(n)$ if there are $n$ elements.");
  arr.highlight([1, 2, 3]);
  av.step();

  // Slide 3
  av.umsg("The other choice is have the top element be at position $n-1$ when there are $n$ elements in the stack. In other words, as elements are pushed onto the stack, they are appended to the end of the list.");
  arr.unhighlight([0, 1, 2]);
  arr.swap(0, 3); arr.swap(1, 2);
  arrow1.hide();
  arrow2.show();
  topArr.value(0, 4);
  av.step();

  // Slide 4
  av.umsg("Method <code>pop</code> removes the last element. In this case, the cost for each push or pop operation is only $\\theta(1)$.");
  arr.value(3, "");
  arr.addClass(3, "unused");
  arr.unhighlight(3);
  arrow2.hide();
  arrow3.show();
  topArr.value(0, 3);
  av.step();

  // Slide 5
  av.umsg("For the implementation of <code>DynamicArrayStack</code>, <code>top</code> <em>could have been defined</em> to be the index for the top element in the stack. If this had been done, the empty list would initialize <code>top</code> as -1.");
  arr.value(0, "");
  arr.value(1, "");
  arr.value(2, "");
  arr.addClass([0, 1, 2], "unused");
  arrow3.hide();
  topArr.value(0, -1);
  topArr.highlight(0);
  av.step();

  // Slide 6
  av.umsg("Instead we define <code>top</code> to be the array index of <em>the first free position</em> in the stack. Thus, an empty stack has <code>top</code> set to 0, the first available free position in the array. This makes <code>top</code> behave exactly as <code>listSize</code> for dynamic array lists.");
  arrow1.show();
  topArr.value(0, 0);
  arr.highlight(0);
  av.recorded();
});
