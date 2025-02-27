/*global alert: true, ODSA, console */
$(document).ready(function() {
  "use strict";
  var av,     // for JSAV av
      arr,    // for the JSAV array
      pseudo; // for the pseudocode display

  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,       // get the interpreter
      settings = config.getSettings();      // Settings for the AV

  var code = [
    "function selectionSort(A):",
    "    N = A.size()",
    "    for i = 1 to N-1:               // Select i'th biggest element",
    "        bigindex = 0                // Current biggest index",
    "        for j = 1 to N-i+1:         // Find the max value",
    "            if A[j] > A[bigindex]:  // Found something bigger",
    "                bigindex = j        // Remember bigger index",
    "        swap(A, bigindex, N-i)      // Put it into place",
  ];
  var tags = {
    "sig": 1,
    "outloop": 3,
    "initbig": 4,
    "inloop": 5,
    "compare": 6,
    "setbig": 7,
    "swap": 8,
    "end": 10
  };

  // Placeholder text translation needs to be set explicitly
  $("#arrayValues").attr("placeholder", interpret("av_arrValsPlaceholder"));

  // Placeholder text translation needs to be set explicitly
  $("#arrayValues").attr("placeholder", interpret("av_arrValsPlaceholder"));

  // Initialize the arraysize dropdown list
  ODSA.AV.initArraySize(5, 16, 8);

  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  // Selection sort
  function selectionsort() {
    var i, j, bigindex;
    av.umsg(interpret("av_c3"));
    pseudo.setCurrentLine("sig");
    av.step();
    for (i = 1; i < arr.size(); i++) {
      av.umsg(interpret("av_c4") + i);
      pseudo.setCurrentLine("outloop");
      av.step();
      av.umsg(interpret("av_c5"));
      pseudo.setCurrentLine("initbig");
      bigindex = 0;
      arr.addClass(0, "special");
      av.step();
      av.umsg(interpret("av_c6"));
      pseudo.setCurrentLine("inloop");
      av.step();
      for (j = 1; j < arr.size() - i + 1; j++) {
        arr.addClass(j, "processing");
        av.umsg(interpret("av_c7"));
        pseudo.setCurrentLine("compare");
        av.step();
        if (arr.value(j) > arr.value(bigindex)) {
          av.umsg(interpret("av_c8"));
          arr.removeClass(bigindex, "special");
          pseudo.setCurrentLine("setbig");
          bigindex = j;
          arr.addClass(bigindex, "special");
          av.step();
        }
        arr.removeClass(j, "processing");
      }
      av.umsg(interpret("av_c9"));
      pseudo.setCurrentLine("swap");
      av.step();
      if (bigindex !== (arr.size() - i)) {
        arr.swap(bigindex, arr.size() - i); // swap the two indices
        arr.removeClass(bigindex, "special");
        arr.addClass(arr.size() - i, "special");
      }
      av.step();
      av.umsg(interpret("av_c10"));
      arr.removeClass(arr.size() - i, "special");
      arr.addClass(arr.size() - i, "deemph");
      av.step();
    }
    av.umsg(interpret("av_c2"));
    arr.addClass(0, "deemph");
    pseudo.setCurrentLine("end");
  }

  // Execute the "Run" button function
  function runIt() {
    var arrValues = ODSA.AV.processArrayValues();

    // If arrValues is null, the user gave us junk which they need to fix
    if (arrValues) {
      ODSA.AV.reset(true);
      av = new JSAV($(".avcontainer"), {settings: settings});

      // Create a new array using the bar layout
      arr = av.ds.array(arrValues, {indexed: true, layout: "bar"});

      // Create the pseudocode display object
      pseudo = av.code(code, {lineNumbers: false, tags: tags});

      av.umsg(interpret("av_c1"));
      av.displayInit();
      selectionsort();
      av.recorded(); // mark the end
      ODSA.AV.sendResizeMsg();
    }
  }

  // Connect action callbacks to the HTML entities
  $("#about").click(about);
  $("#run").click(runIt);
  $("#ssperform").submit(function(evt) {
    // pressing return in 'Your values:' box -> runIt
    evt.stopPropagation();
    evt.preventDefault();
    runIt();
  });
  $("#reset").click(ODSA.AV.reset);
});
