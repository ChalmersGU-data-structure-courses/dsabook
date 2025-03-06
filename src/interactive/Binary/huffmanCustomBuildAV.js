"use strict";
/*global alert: true, ODSA, console */
$(document).ready(function() {
  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret[".avTitle"], interpret["av_Authors"]));
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(ODSA.AV.reset);

  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////
  // Load the config object with interpreter and code created by odsaUtils.js

  var interpret = {
    ".avTitle": "Huffman Custom Build Visualization",
    "av_Authors": "Laura Avakian, Maoyuan Sun, Rich Episcopo, and Cliff Shaffer",
    "#about": "About",
    "#run": "Run",
    "#reset": "Reset",
    "av_arrValsPlaceholder": "Type some array values",
    "av_c1": "The following letters will be placed in a Huffman tree:",
    "av_c2": "This is the final Huffman coding tree.",
    "av_c3": "Now we see how the edges will be used to define the codes.",
    "av_c4": "Now we are ready to compute the Huffman code for each character.",
    "av_c5": "Here is a table showing all of the codes.",
    "av_c6": "The Huffman coding tree that we are using is: ",
    "av_c7": "Now let's use this tree to generate the Huffman codes for the letters.",
    "av_c8": "The word 'DEED' is represented by '10100101' and the word 'MUCK' is represented by '111111001110111101'.",
    "av_c9": "As an example, lets decode the bit string '10100101'.",
    "av_c10": "Code: 10100101. ",
    "av_c11": "We always begin at the root.",
    "av_c12": "Since the first bit it '1' we start by taking a right branch.",
    "av_c13": "Because the next bit is a '0' we take a left branch.",
    "av_c14": "We then take another right branch for the third bit '1' and arrive at the lead node corresponding to D.",
    "av_c15": "Thus, the first letter of the coded word is D",
    "av_c16": "We then begin at the root to start processing the next bit in the binary string.",
    "av_c17": "To decode the second letter, we make a left branche since the next two bit is '0'.",
    "av_c18": "This leads us to the leaf node E. The second letter is an E.",
    "av_c19": "We start at the root for the next bit.",
    "av_c20": "Similarly, the next bit is also a 0 which leads us to E again.",
    "av_c21": "We return to the root for the next bit",
    "av_c22": "The next bit is a 1 so we branch right.",
    "av_c23": "The next bit is a 0 so we branch left.",
    "av_c24": "This leads us to a D which is the final letter of \"DEED\".",
    "av_c25": "Sorting the data by frequency results in the following:",
    "av_c26": "Choose the two smallest numbers: ",
    "av_c27": "Merge them together to form a tree with sum \"",
    "av_c28": "\", and reorder the list.",
    "av_c29": "\"0\" is set to the edge connecting the left child of the node \"",
    "av_c30": "\"1\" is set to the edge connecting the right child of the node \"",
    "av_c31": "Huffman code for character \"",
    "av_c32": "\" is: \"",
    "av_c33": "\", which is the value along the path from the root \"",
    "av_c34": "\" to \""
  };

  for (let elem of ["run", "reset", "about"]) {
    document.getElementById(elem).setAttribute("value", interpret["#" + elem]);
  }

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings")),
      av = new JSAV($('.avcontainer'), {
        settings: settings
      });

  var arr;

  $("#arrayValues").attr("placeholder", "Type in pairs of chars and frequencies (e.g. \"A, 77, B, 23, C, 32\")");
  var arrayLayout = settings.add("layout", {
    "type": "select",
    "options": {
      "bar": "Bar",
      "array": "Array"
    },
    "label": "Array layout: ",
    "value": "bar"
  });

  ODSA.AV.initArraySize(5, 16, 8);

  //var arrValues = ODSA.AV.processArrayValues();
  //TODO make sure to check that these values are valid

  var freqs = [], // The frequency counts
      chars = [], // The characters
      trees = []; // Pointers to all of the partial Huffman trees

  var codeArray = [];

  var value;
  // initialization for all the arrays

  function runIt() {
    var arrValues = processArrayValues();

    if (arrValues) {
      var counter = 0;
      for (var i = 0; i < arrValues.length; i++) {
        if (i % 2 == 0 || i == 0) {
          chars[counter] = arrValues[i];
          console.log("chars: " + chars[counter]);
        } else {
          freqs[counter] = arrValues[i];
          console.log("freqs: " + freqs[counter]);
          counter++;
        }
      }

      var root;
      for (var i = 0; i < freqs.length; i++) {
        value = freqs[i] + "<br>" + chars[i];
        trees[i] = av.ds.binarytree({
          center: false
        });
        root = trees[i].root();
        root.value(value);
        root.freq = freqs[i];
      }

      // Initialize the display
      av.umsg(interpret["av_c1"]);
      HUFF.layAll(trees);
      av.displayInit();

      // Construct the huffman coding tree with animation.
      HUFF.huffBuild_animated(av, interpret, freqs, trees);

      av.umsg(interpret["av_c2"]);
      HUFF.layAll(trees);
      av.step();

      av.umsg(interpret["av_c3"]);
      av.step();

      // Animation for assigning the codes
      HUFF.setLabels_animated(av, interpret, trees[0], trees[0].root());

      av.umsg(interpret["av_c4"]);
      av.step();

      HUFF.showCodes_animated(av, interpret, freqs, chars, codeArray, trees[0]);

      trees[0].hide();
      av.umsg(interpret["av_c5"]);
      var matrixData = [
        ["<b>Char</b>", "<b>Freq</b>", "<b>Code</b>", "<b>Bits</b>"]
      ];
      for (var i = 0; i < freqs.length; i++) {
        matrixData.push([chars[i], freqs[i], codeArray[i], codeArray[i].length]);
      }
      var theMatrix = new av.ds.matrix(matrixData, {
        style: "plain"
      });
      av.recorded(); // done recording changes, will rewind
    }
  }

  // Validate the array values a user enters or generate an array of random numbers if none are provided
  function processArrayValues(upperLimit) {
    upperLimit = (upperLimit) ? upperLimit : 999;

    var i,
        initData = {},
        minSize = 4, //$('#arraysize').data('min'),
        maxSize = 16, //$('#arraysize').data('max'),
        msg = "Please enter " + minSize + " to " + maxSize + " positive integers between 0 and " + upperLimit,
        msg2 = "Please enter letters A-Z to match each frequency value (e.g. \"A, 77, B, 23, C, 32\")",
        msg3 = "Please enter in at least two pairs of single alphabetical characters followed by numerical frequencies (e.g. \"A, 92, B, 28\", or \"A, 92, B, 28, C, 98, etc...\")";

    if (!minSize || !maxSize) {
      console.warn('processArrayValues() called without calling initArraySize()');
    }

    // Convert user's values to an array,
    // assuming values are space separated
    var arrValues = $('#arrayValues').val().match(/[0-9a-zA-Z]+/g) || [];

    if (arrValues.length % 2 > 0 || arrValues.length < 4) {
      alert(msg3);
      return null;
    }

    if (arrValues.length === 0) { // Empty field
      // Generate (appropriate length) array of random numbers between 0 and the given upper limit
      for (i = 0; i < $('#arraysize').val(); i++) {
        arrValues[i] = Math.floor(Math.random() * (upperLimit + 1));
      }
      initData.gen_array = arrValues;
    } else {
      // Ensure user provided array is in correct range
      if (arrValues.length < minSize || arrValues.length > maxSize) {
        alert(msg);
        return null;
      }

      // Ensure every other user entered value is a positive integer
      for (i = 1; i < arrValues.length; i += 2) {
        arrValues[i] = Number(arrValues[i]);
        if (isNaN(arrValues[i]) || arrValues[i] < 0 || arrValues[i] > upperLimit) {
          alert(msg);
          return null;
        }
      }

      // Ensure the rest of user entered values are letters
      for (i = 0; i < arrValues.length; i += 2) {
        if (!(isNaN(arrValues[i]) || arrValues[i] < 0 || arrValues[i] > upperLimit)) {
          alert(msg2);
          return null;
        }
      }

      initData.user_array = arrValues;

      // Update the arraysize dropdown to match the length of the user entered array
      $('#arraysize').val(arrValues.length);
    }

    // Dynamically log initial state of text boxes
    $('input[type=text]').each(function(index, item) {
      var id = $(item).attr('id');

      if (id !== 'arrayValues') {
        initData['user_' + id] = $(item).val();
      }
    });

    // Dynamically log initial state of dropdown lists
    $('select').each(function(index, item) {
      var id = $(item).attr('id');
      initData['user_' + id] = $(item).val();
    });

    // Log initial state of exercise
    ODSA.AV.logExerciseInit(initData);

    return arrValues;
  }

});
