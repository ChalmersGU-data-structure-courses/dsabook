// Written by Yujie Chen, Summer 2019
/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "SortNotationS1CON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "Consider a list <em>L</em> containing seven records, named <em>r</em><sub>1</sub> through <em>r</em><sub>7</sub>.",
    "sc2": "The records could be complex, with many fields. But assume that each record includes a particular field that we will call the <i>key</i>. In this example, the associated keys are 3 1 7 6 4 7 0.",
    "sc3": "The <b>Sorting Problem</b> is to arrange the records into any order <em>s</em> such that records <em>r<sub>s<sub>1</sub></sub></em>, <em>r<sub>s<sub>2</sub></sub></em>, ..., <em>r<sub>s<sub>n</sub></sub></em> have keys obeying the property <em>k<sub>s<sub>1</sub></sub> ≤ k<sub>s<sub>2</sub></sub> ≤ ... ≤ k<sub>s<sub>n</sub></sub></em>. In other words, the sorting problem is to arrange a set of records so that the values of their key fields are in non-decreasing order.",
    "sc4": "Define <em>L<sub>S</sub></em> to be a sorted version of <em>L</em>. The records in <em>L<sub>S</sub></em> are arranged so that the keys are in non-decreasing order. Records <em>r<sub>3</sub></em> and <em>r<sub>6</sub></em> could have appeared in either order since their key values are the same."
};

  var leftAlign = 150;
  var topAlign = 5;
  var rArray = ["<em>r<sub>1</sub></em>", "<em>r<sub>2</sub></em>", "<em>r<sub>3</sub></em>", "<em>r<sub>4</sub></em>", 
                "<em>r<sub>5</sub></em>", "<em>r<sub>6</sub></em>", "<em>r<sub>7</sub></em>"];
  // Slide 1
  av.umsg(interpret["sc1"]);
  av.ds.array(rArray,
              {left: leftAlign, top: topAlign + 25, indexed: false});
  av.label("<em>L</em>", {left: leftAlign + 95, top: topAlign - 20}).css({"font-size": "22px", "text-align": "center", "font-style": "bold"});
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
  av.label("<em>L<sub>S</sub></em>", {left: leftAlign + 375, top: topAlign - 20}).css({"font-size": "22px", "text-align": "center", "font-style": "bold"});
  av.ds.array(rArray,
              {left: leftAlign + 300, top: topAlign + 25, indexed: false});
  av.ds.array([0, 1, 3, 4, 6, 7, 7],
              {left: leftAlign + 300, top: topAlign + 54, indexed: false});
  av.recorded();
});
