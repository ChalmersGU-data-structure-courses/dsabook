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
    av = new JSAV($("#jsavcontainer"));

  av.recorded(); // we are not recording an AV with an algorithm

  var interpret = {
    "av_array_label": "Table to be sorted",
    "av_temp_label": "temp variable",
    "av_ms_copy": "Copy {arr_at_i} from the array into the temp variable.",
    "av_ms_shift": "Shift all the elements, whose values are larger than {temp} (temp) and whose indices are smaller than {i} (i), one step to the right.",
    "av_ms_copy_back": "Copy {temp} back into its right place in the array. The array is now sorted between indices 0 and {i}"
  };

  function initialize() {

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

    jsav.displayInit();

    var j = 0;
    for (var i = 1; i < arraySize; i++) {
      jsavI.value(i);
      jsav.effects.copyValue(modelArray, i, modelTempArray, 0);
      jsav.umsg(interpret["av_ms_copy"], {fill: {arr_at_i: modelArray.value(i)}});
      jsav.stepOption("grade", true);
      jsav.step();
      j = i;
      jsavJ.value(j);
      while (j > 0 && modelArray.value(j - 1) > modelTempArray.value(0)) {
        jsav.effects.copyValue(modelArray, j - 1, modelArray, j);
        modelArray.layout();
        jsav.umsg(interpret["av_ms_shift"], {fill: {temp: modelTempArray.value(0), i: i}});
        jsav.stepOption("grade", true);
        jsav.step();
        j--;
        jsavJ.value(j);
      }
      jsav.effects.copyValue(modelTempArray, 0, modelArray, j);
      modelArray.layout();
      jsav.umsg(interpret["av_ms_copy_back"], {fill: {temp: modelTempArray.value(0), i: i}});
      jsav.stepOption("grade", true);
      jsav.step();
    }

    return [modelArray, modelTempArray];
  }

  var exercise = av.exercise(modelSolution, initialize, {feedback: "atend"});
  exercise.reset();

}(jQuery));
