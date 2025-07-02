/*global window */
(function() {
  "use strict";
  var hashFuncSfold = {
    // Generate a key
    genKey: function(len) {
      return Math.random().toString(36).substring(2, len + 2);
    },

    // Return the computed Answer
    genAnswer: function(k, M) {
      var output = 0;
      for (var i = 0; i < k.length; i++) {
        output = (31 * output + k.charCodeAt(i)) % (2**32);
      }
      return output % M;
    }

  };

  window.hashFuncSfold = window.hashFuncSfold || hashFuncSfold;
}());
