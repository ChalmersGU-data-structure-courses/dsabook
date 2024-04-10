/* global ODSA, ClickHandler */
(function ($) {
  "use strict";
  var arraySize = 10,
    initialArray,
    initialTempArray,
    barArray,
    tempArray,
    $arrayLabel,
    $tempLabel,
    clickHandler,
    config = {}, // ODSA.UTILS.loadConfig({'av_container': 'jsavcontainer'}),
    av = new JSAV($("#jsavcontainer"));

  av.recorded(); // we are not recording an AV with an algorithm

  var interpret = {
    ".exerciseTitle": "Insertion Sort",
    ".instructLabel": "Instructions:",
    ".instructions": "Use Insertion Sort to sort the table given below in ascending order. Click on an item to select it and copy its value to another position by clicking on the new position.",
    "av_array_label": "Table to be sorted",
    "av_temp_label": "temp variable",
    "av_ms_copy": "Copy {arr_at_i} from the array into the temp variable.",
    "av_ms_shift": "Shift all the elements, whose values are larger than {temp} (temp) and whose indices are smaller than {i} (i), one step to the right.",
    "av_ms_copy_back": "Copy {temp} back into its right place in the array. The array is now sorted between indices 0 and {i}"
  };

  var pseudo = av.code([
    "def insertionsort(A):",
    "    for i in range(1, len(A)): # Insert i'th record",
    "        temp = A[i]",
    "        j = i",
    "        while j > 0 and temp < A[j-1]:",
    "            A[j] = A[j-1]",
    "            j -= 1",
    "        A[j] = temp",
  ], {lineNumbers: false,
      visible: true,
      tags: {
        "highlight": [3, 6, 8],
        "copy_to_tmp": 3,
        "shift": 6,
        "copy_back": 8
      }
  });


  function initialize() {

    // show the code
    if (!pseudo && config.code) {
      pseudo = av.code($.extend({after: {element: $(".instructions")}, visible: true}, config.code));
      pseudo.highlight(config.code.tags.highlight);
    }

    // initialize click handler
    if (typeof clickHandler === "undefined") {
      clickHandler = new ClickHandler(av, exercise, {
        selectedClass: "selected",
        effect: "copy"
      });
    }
    clickHandler.reset();

    // remove old elements
    if (barArray) {
      clickHandler.remove(barArray);
      barArray.clear();
    }
    if (tempArray) {
      clickHandler.remove(tempArray);
      tempArray.clear();
    }
    if ($tempLabel) {
      $tempLabel.remove();
    }
    if ($arrayLabel) {
      $arrayLabel.remove();
    }

    // initialize the bar array
    initialArray = JSAV.utils.rand.numKeys(10, 100, arraySize);
    barArray = av.ds.array(initialArray, {indexed: true, layout: "bar"});
    clickHandler.addArray(barArray);

    // initialize temp variable
    initialTempArray = [];
    initialTempArray[0] = Math.floor(JSAV.utils.rand.random() * 100) + 10;
    tempArray = av.ds.array(initialTempArray, {indexed: false});
    clickHandler.addArray(tempArray);

    // create labels
    $tempLabel = $("<p>" + interpret["av_temp_label"] + "</p>")
      .insertBefore(tempArray.element);
    $arrayLabel = $("<p>" + interpret["av_array_label"] + "</p>")
      .insertBefore(barArray.element);

    $tempLabel.add($arrayLabel)
      .css("text-align", "center")
      .css("font-weight", "bold")
      .css("margin-bottom", -10);


    return [barArray, tempArray];
  }

  function modelSolution(jsav) {
    var jsavI = jsav.variable(1, {label: "i:", visible: true, left: 10});
    var jsavJ = jsav.variable(0, {label: "j:", visible: true, left: 10, top: 60});

    var modelArray = jsav.ds.array(initialArray, {indexed: true, layout: "bar"});
    var modelTempArray = jsav.ds.array(initialTempArray);

    jsav._undo = [];
    modelArray.layout();

    var msCode;
    if (config.code) {
      msCode = jsav.code(config.code).show();
    }

    jsav.displayInit();

    var j = 0;
    for (var i = 1; i < arraySize; i++) {
      jsavI.value(i);
      jsav.effects.copyValue(modelArray, i, modelTempArray, 0);
      jsav.umsg(interpret["av_ms_copy"], {fill: {arr_at_i: modelArray.value(i)}});
      if (config.code) {
        msCode.setCurrentLine(config.code.tags.copy_to_tmp);
      }
      jsav.stepOption("grade", true);
      jsav.step();
      j = i;
      jsavJ.value(j);
      while (j > 0 && modelArray.value(j - 1) > modelTempArray.value(0)) {
        jsav.effects.copyValue(modelArray, j - 1, modelArray, j);
        modelArray.layout();
        jsav.umsg(interpret["av_ms_shift"], {fill: {temp: modelTempArray.value(0), i: i}});
        if (config.code) {
          msCode.setCurrentLine(config.code.tags.shift);
        }
        jsav.stepOption("grade", true);
        jsav.step();
        j--;
        jsavJ.value(j);
      }
      jsav.effects.copyValue(modelTempArray, 0, modelArray, j);
      modelArray.layout();
      jsav.umsg(interpret["av_ms_copy_back"], {fill: {temp: modelTempArray.value(0), i: i}});
      if (config.code) {
        msCode.setCurrentLine(config.code.tags.copy_back);
      }
      jsav.stepOption("grade", true);
      jsav.step();
    }

    return [modelArray, modelTempArray];
  }

  var exercise = av.exercise(modelSolution, initialize, {feedback: "atend"});
  exercise.reset();

}(jQuery));
