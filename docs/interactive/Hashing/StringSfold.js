"use strict";
/*global ODSA */
(function ($) {
  // Declare and initialize state variables
  var keyValue = $('#keyvalue').val();
  
  // Convenience function for writing output messages
  var tell = function (msg) { $('p.output').html(msg); };

  // Validate Table size field
  function CheckKey() {
    keyValue = $('#keyvalue').val();
  }

  function sfold(s) {
    var sum = 0;
    for (var i = 0; i < s.length; i++) {
      sum = (31 * sum + s.charCodeAt(i)) % (2**32);
    }
    return sum;
  }

  // Main action: Result of clicking "Calculate" button
  function Calculate() {
    var i;
    ODSA.AV.logExerciseInit({'user_key': keyValue});
    var output = sfold($.trim(keyValue));
    tell('<br/>' + output);
    ODSA.AV.awardCompletionCredit();
  }

  // Action callbacks for form entities
  $('#keyvalue').focusout(CheckKey);
  $('#calculate').click(Calculate);
}(jQuery));
