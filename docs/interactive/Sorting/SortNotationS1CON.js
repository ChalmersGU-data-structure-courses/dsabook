// Written by Yujie Chen, Summer 2019
/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "SortNotationS1CON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "Consider a list $L$ containing seven records, named $r_1$ through $r_7$.",
    "sc2": "The records could be complex, with many fields. But assume that each record includes a particular field that we will call the <i>key</i>. In this example, the associated keys are 3 1 7 6 4 7 0.",
    "sc3": "The <b>Sorting Problem</b> is to arrange the records into any order $s$ such that records $r_{s_1}$, $r_{s_2}$, ..., $r_{s_n}$ have keys obeying the property $k_{s_1} \\leq k_{s_2} \\leq ... \\leq k_{s_n}$. In other words, the sorting problem is to arrange a set of records so that the values of their key fields are in non-decreasing order.",
    "sc4": "Define $L_S$ to be a sorted version of $L$. The records in $L_S$ are arranged so that the keys are in non-decreasing order. Records $r_3$ and $r_6$ could have appeared in either order since their key values are the same."
};

  var leftAlign = 150;
  var topAlign = 5;

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.ds.array(["$r_1$", "$r_2$", "$r_3$", "$r_4$", "$r_5$", "$r_6$", "$r_7$"],
              {left: leftAlign, top: topAlign + 25, indexed: false});
  av.label("$L$", {left: leftAlign + 95, top: topAlign - 20}).css({"font-size": "22px", "text-align": "center", "font-style": "bold"});
  av.displayInit();
  av.step();

  // Slide 2
  av.umsg(interpret["sc2"]);
  av.ds.array([3, 1, 7, 6, 4, 7, 0],
              {left: leftAlign, top: topAlign + 54, indexed: false});
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"]);
  av.label("$L_s$", {left: leftAlign + 375, top: topAlign - 20}).css({"font-size": "22px", "text-align": "center", "font-style": "bold"});
  av.ds.array(["$r_7$", "$r_2$", "$r_1$", "$r_5$", "$r_4$", "$r_3$", "$r_6$"],
              {left: leftAlign + 300, top: topAlign + 25, indexed: false});
  av.ds.array([0, 1, 3, 4, 6, 7, 7],
              {left: leftAlign + 300, top: topAlign + 54, indexed: false});
  av.recorded();
});
