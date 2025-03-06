/*global ODSA Plot */
// Written by Jieun Chon

$(document).ready(function() {
  function _add(k) {
    return function(n) {
      var size = Math.ceil(n/k)*k;
      return size*(size-1)/(2*k);
    }
  }

  function _scale(k) {
    return function(n) {
      var size = 1;
      var copies = 0;
      while (size < n) {
        copies += size;
        size *= k;
      }
      return copies;
    }
  }

  Plot.plotFuncs("ListArrayDynamicZoomCON", 600, 200, 100, 25,
    1000000, 10000000, null, null,
    [[_add(1), "+1", "red"],
     [_add(100), "+100", "green"],
     [_add(10000), "+10000", "blue"],
     [_scale(1.1), "+10%", "yellow"],
     [_scale(1.5), "+50%", "orange"],
     [_scale(2), "+100%", "black"]]);
});
