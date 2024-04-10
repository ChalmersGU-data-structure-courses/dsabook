/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Exchange Sort Lower Bound
$(document).ready(function() {
  "use strict";
  var av_name = "ExchangeSortCON";
  var av = new JSAV(av_name);

  var interpret = {
    "Slide 1": "What is the average number of inversions?",
    "Slide 2": "Consider a list $L$ containing $n$ values.",
    "Slide 3": "Define $L_R$ to be $L$ in reverse.",
    "Slide 4": "For example, if we have input list 3 4 1 2, the reverse list is 2 1 4 3",
    "Slide 5": "$L$ has ${n\\choose 2} = \\frac{n(n-1)}{2}$ distinct pairs of values, each of which could potentially be an inversion.",
    "Slide 6": "<br>In our example, we have 6 distinct pairs",
    "Slide 12": "Each such pair must either be an inversion in $L$ or in $L_R$.",
    "Slide 13": "<br>Here in the example, 3 comes before 4 in the original list, and 4 comes before 3 in the reverse list.",
    "Slide 14": "Thus, the total number of inversions in $L$ and $L_R$ together is exactly $\\frac{n(n-1)}{2}$",
    "Slide 15": "This means that the average number of inversions must be half of that, or $\\frac{n(n-1)}{4}$ per list.",
    "Slide 16": "We therefore know with certainty that any sorting algorithm which limits comparisons to adjacent items will cost at least $\\frac{n(n-1)}{4}=\\Omega(n^2)$ in the average case."
  };

  var arr1, arr3, arr4;
  var leftAlign = 100;
  var topAlign = 0;
  var labelSet = [];

  // Slide 1
  av.umsg(interpret["Slide 1"]);
  av.displayInit();

  //Slide 2
  av.umsg(interpret["Slide 2"]);
  arr1 = av.ds.array(["$x_1$", "$x_2$", "$x_3$", "...", "$x_{n-1}$", "$x_n$"],
                     {left: leftAlign, top: topAlign, indexed: false});
  labelSet.push(av.label("$L$", {left: leftAlign + 75, top: topAlign + 40}).css({"font-size": "22px", "text-align": "center", "font-style": "bold"}));
  av.step();

  //Slide 3
  av.umsg(interpret["Slide 3"]);
  av.ds.array(["$x_n$", "$x_{n-1}$", "...", "$x_3$", "$x_2$", "$x_1$"],
              {left: leftAlign + 250, top: topAlign, indexed: false});
  labelSet.push(av.label("$L_R$", {left: leftAlign + 325, top: topAlign + 40}).css({"font-size": "22px", "text-align": "center", "font-style": "bold"}));
  av.step();

  //Slide 4
  av.umsg(interpret["Slide 4"]);
  arr3 = av.ds.array([3, 4, 1, 2], {left: leftAlign + 25, top: topAlign + 100, indexed: false});
  arr4 = av.ds.array([2, 1, 4, 3], {left: leftAlign + 275, top: topAlign + 100, indexed: false});
  av.step();

  //Slide 5
  av.umsg(interpret["Slide 5"]);
  arr1.highlight();
  av.step();

  //Slide 6
  av.umsg(interpret["Slide 6"], {preserve: true});
  arr1.unhighlight();
  arr3.highlight([0, 1]);
  av.step();

  //Slide 7
  arr3.highlight(2);
  arr3.unhighlight(1);
  av.step();

  //Slide 8
  arr3.highlight(3);
  arr3.unhighlight(2);
  av.step();

  //Slide 9
  arr3.highlight([1, 2]);
  arr3.unhighlight([0, 3]);
  av.step();

  //Slide 10
  arr3.highlight(3);
  arr3.unhighlight(2);
  av.step();

  //Slide 11
  arr3.highlight(2);
  arr3.unhighlight(1);
  av.step();

  //Slide 12
  av.umsg(interpret["Slide 12"]);
  arr3.unhighlight();
  av.step();

  //Slide 13
  av.umsg(interpret["Slide 13"], {preserve: true});
  arr3.highlight([0, 1]);
  arr4.highlight([2, 3]);
  av.step();

  //Slide 14
  av.umsg(interpret["Slide 14"]);
  arr3.unhighlight();
  arr4.unhighlight();
  av.step();

  //Slide 15
  av.umsg(interpret["Slide 15"]);
  av.step();

  //Slide 16
  av.umsg(interpret["Slide 16"]);
  av.step();
  av.recorded();
});
