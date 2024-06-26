/*global alert: true, ODSA, console */
$(document).ready(function() {
  "use strict";
  var av,     // JSAV library object
      arr,    // JSAV array
      pseudo; // pseudocode display

  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,       // get the interpreter
      settings = config.getSettings();      // Settings for the AV

      var code = [
        "function insertionSort(A):",
        "    for i in 1 ... length(A)-1:",
        "        j = i",
        "        while j > 0 and A[j] < A[j-1]:",
        "            swap(A, j, j-1)",
        "            j = j-1",
      ];
      var tags = {
        "sig": 1,
        "outloop": 2,
        "inloop": 4,
        "swap": 5,
        "end": 10
      };
    
  // Placeholder text translation needs to be set explicitly
  $("#arrayValues").attr("placeholder", interpret("av_arrValsPlaceholder"));

  // Initialize the arraysize dropdown list
  ODSA.AV.initArraySize(5, 16, 8);

  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  // Insertion Sort
  function insertionsort() {
    var i, j;
    av.umsg(interpret("av_c3"));
    pseudo.setCurrentLine("sig");
    arr.highlight([0]);
    arr.addClass(1, "processing");
    arr.addClass(1, "whitetext");
    av.step();
    for (i = 1; i < arr.size(); i++) { // Insert i'th record
      arr.addClass(i, "processing");
      arr.addClass(i, "whitetext");
      av.umsg(interpret("av_c4") + i);
      pseudo.setCurrentLine("outloop");
      av.step();
      av.umsg(interpret("av_c5"));
      pseudo.setCurrentLine("inloop");
      av.step();
      for (j = i; (j > 0) && (arr.value(j) < arr.value(j - 1)); j--) {
        arr.addClass(j, "processing");
        arr.addClass(j, "whitetext");
        arr.swap(j, j - 1); // swap the two indices
        arr.highlight(j).unhighlight(j - 1); // set highlights correctly
        arr.removeClass(j, "processing");
        arr.removeClass(j, "whitetext");
        arr.addClass(j - 1, "processing");
        arr.addClass(j - 1, "whitetext");
        av.umsg(interpret("av_c6"));
        pseudo.setCurrentLine("swap");
        av.step();
      }
      arr.highlight(j);
    }
    pseudo.setCurrentLine("end");
    av.umsg(interpret("av_c2"));
  }

  // Execute the "Run" button function
  function runIt() {
    var arrValues = ODSA.AV.processArrayValues();

    // If arrValues is null, the user gave us junk which they need to fix
    if (arrValues) {
      ODSA.AV.reset(true);
      av = new JSAV($(".avcontainer"), {settings: settings});

      // Create a new array using the layout the user has selected
      arr = av.ds.array(arrValues, {indexed: true, layout: "bar"});

      // Create the pseudocode display object
      pseudo = av.code(code, {lineNumbers: false, tags: tags});
      av.umsg(interpret("av_c1"));
      av.displayInit();
      insertionsort();
      arr.unhighlight();
      arr.removeClass(true, "processing");
      arr.removeClass(true, "whitetext");
      av.recorded(); // mark the end
    }
  }

  // Connect action callbacks to the HTML entities
  $("#about").click(about);
  $("#run").click(runIt);
  $("#ssperform").submit(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    runIt();
  });
  $("#reset").click(ODSA.AV.reset);
});
