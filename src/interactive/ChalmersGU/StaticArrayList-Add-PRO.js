/*global window */
(function() {
  "use strict";
  var av,               // The JSAV object
      answerArr = [],   // The (internal) array that stores the correct answer
      cloneArr = [],    // Copy of (internal) array at start of exercise for reset
      jsavArr,          // The array that the user manipulates (JSAV object)
      inPosition,       // insertion location
      inValue,          // insertion value
      selected_index;   // Position that has been selected by user for swap

  var staticArrayListAddPRO = {
    userInput: null,        // Boolean: Tells us if user ever did anything

    // Initialise the exercise
    initJSAV: function(arr_size, insertPos, insertValue) {
      var i;

      inPosition = insertPos;
      inValue = insertValue;

      // Set up answer array
      answerArr.length = 0; // Out with the old
      for (i = 0; i < arr_size; i++) { // Give random numbers in range 0..999
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      for (i = 0; i < 4; i++) {
        answerArr.push(""); // Put blanks on end
      }
      cloneArr = answerArr.slice(0);                     // Now make a copy

      // correct answer
      answerArr.splice(inPosition, 0, inValue);

      reset();
      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
      $("#insert").click(function() { insert(); });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      var i;
      for (i = 0; i < jsavArr.size(); i++) {
        if (jsavArr.value(i) !== answerArr[i]) {
          return false;
        }
      }
      return true;
    }
  };

  // Click event handler on the array
  function clickHandler(index) {
    if (selected_index === -1) { // if nothing currently selected
      jsavArr.css(index, {"font-size": "110%"});
      selected_index = index;
      jsavArr.highlight(index);
    } else { // an array element is selected
      // Do not swap for the same index.
      if (selected_index !== index) {
        jsavArr.swap(selected_index, index);
        jsavArr.unhighlight(selected_index);
      }
      jsavArr.css(selected_index, {"font-size": "100%"});
      jsavArr.unhighlight(index);
      selected_index = -1;  // Reset to nothing selected
    }
    staticArrayListAddPRO.userInput = true;
  }

  // Insert button handler
  function insert() {
    if (selected_index !== -1) { // Do nothing if not selected
      jsavArr.value(selected_index, inValue);
      jsavArr.css(selected_index, {"background-color": "#ddd"});
      jsavArr.css(selected_index, {"font-size": "100%"});
      jsavArr.unhighlight(selected_index);
      selected_index = -1;
      staticArrayListAddPRO.userInput = true;
    }
  }

  // reset function definition
  function reset() {
    // Clear the old JSAV canvas.
    if ($("#StaticArrayListAddPRO")) { $("#StaticArrayListAddPRO").empty(); }

    // Set up the display
    av = new JSAV("StaticArrayListAddPRO");
    av.label(`add(${inPosition}, ${inValue})`, {left: 40, top: 0});

    // (Re-)initialize the displayed array object
    jsavArr = av.ds.array(cloneArr, {indexed: true, center: false, top: 40, left: 5});
    av.displayInit();
    av.recorded();

    jsavArr.click(clickHandler); // (Re-)bind click handler
    staticArrayListAddPRO.userInput = false;
    selected_index = -1;
  }

  window.staticArrayListAddPRO = window.staticArrayListAddPRO || staticArrayListAddPRO;
}());
