// Support for plotting non-standard functions
// Written by Jieun Chon, Cliff Shaffer, Ville Karavirta and Nick Smallbone
(function() {
  "use strict";

  var Plot = {

    // Create and return a set of points used to draw a dashed line.
    // func: The function for the line being drawn
    drawDash: function(func, xStart, yStart, xEnd, xMax, yMax, height) {
      var points = [xStart, yStart, xEnd];
      var y = yStart - func(xMax) * height / yMax;
      points.push(y);
      return points;
    },


    // Create and return a set of points used to draw an arbitary function
    // func: The function being drawn, it is used to generate the y values
    // xStart: The x coordinate of the starting point of the function
    // yStart: The y coordinate of the starting point of the function
    // yEnd: The y coordinate of the ending point of the function
    // xMax: maximum number of steps in the x direction
    // yMax: maximum number of steps in the y direction
    // width: number of pixels in the width of the function
    // height: number of pixels in the height of the function
    // increment: Something to do with how big a step to take, to avoid jaggies
    // isLog: if true start at 1, if false start at 0
    // TODO: We should automate the incrementing process!
    drawCurve: function(func, xStart, yStart, yEnd, xMax, yMax, width, height, increment, isLog) {
      var points = [];
      var xStep = width / xMax;
      var start = isLog ? 1 : 0;
      var x, y;
      for (var i = start; i <= xMax; i += increment) {
        x = xStart + (i * xStep);
        y = yStart - ((func(i) / yMax) * height);
        if (y < yEnd) {
          y = yEnd;
          points.push([x, y]);
          break;
        }
        points.push([x, y]);
      }
      return points;
    },

    // Plots multiple functions. Does all the drawing including axes etc.
    // The canvas is 600x300 pixels.
    //
    // name: CSS name
    // width, height: plot size in pixels
    // xmargin, ymargin: margin size (note: x-axis labels are drawn in margin)
    // xMax, yMax: maximum x and y value to plot
    // boxX, boxY: if these are non-null a dashed box is drawn from
    //   (0,0) to (boxX, boxY); if one is non-null a line is drawn
    // funcs: list of functions to plot, each should be in the form
    //   ["name", function, "line colour"]
    //   e.g. ["sin", Math.sin, "red"]
    plotFuncs: function(name, width, height, xmargin, ymargin, xMax, yMax, boxX, boxY, funcs) {
      "use strict";
      var i;
      var av = new JSAV(name, {animationMode: "none"});
      var xStart = xmargin;
      var xEnd = xStart + width;  //end position of the x on the chart
      var yEnd = ymargin;
      var yStart = yEnd + height;  //end position of the y on the chart
      var xSteps = width / xMax;  //each pixels per 1 x-unit.
      var ySteps = height / yMax;  //each pixels per 1 y-unit.

      //x-axis 1
      av.g.line(xStart, yStart, xEnd, yStart, {"stroke-width": 2});

      //y-axis 1
      av.g.line(xStart, yStart, xStart, yEnd, {"stroke-width": 2});

      //draw x-axis lines for graph 1
      var stepx1 = width / 10;
      var x1 = xStart + stepx1;
      for (i = 0; i < 10; i++) {
        av.g.line(x1, yStart, x1, yStart+5, {"stroke-width": 0.8});
        x1 += stepx1;
      }

      // draw y-axis lines for graph 1:
      var stepy1 = height / 10;
      var y1 = yStart - stepy1;
      for (i = 0; i < 10; i++) {
        av.g.line(xStart-5, y1, xStart, y1, {"stroke-width": 0.8});
        y1 -= stepy1;
      }

      //plot1 x-axis labels
      var labelx1_x = xStart;
      var labelx1_y = yStart - 5;
      for (i = 0; i <= 10; i++) {
        var x = Math.floor(xMax/10 * i);
        var len = String(x).length;
        av.label(x, {left: labelx1_x-6*len/2, top: labelx1_y});
        labelx1_x += width/10;
      }

      // plot1 y-axis labels
      var labely1_x = xStart - 10;
      var labely1_y = yStart - 20;
      for (i = 0; i <= 10; i++) {
        var y = Math.floor(yMax/10 * i);
        var len = String(y).length;
        av.label(y, {left: labely1_x-6*len, top: labely1_y}).addClass("yLabel");
        labely1_y -= height/10;
      }

      if (!boxX) boxX = xMax;
      if (!boxY) boxY = yMax;
      var xBoxEnd = xStart + (width*boxX/xMax);
      var yBoxEnd = yStart - (height*boxY/yMax);

      //horizontal lines
      if (boxX != xMax) {
        av.g.line(xStart, yBoxEnd, xBoxEnd, yBoxEnd).addClass("dashBoxLine");
        av.g.line(xStart, yStart, xBoxEnd, yStart).addClass("dashBoxLine");
      }

      //vertical lines
      if (boxY != yMax) {
        av.g.line(xStart,  yBoxEnd, xStart, yStart).addClass("dashBoxLine");
        av.g.line(xBoxEnd, yBoxEnd, xBoxEnd, yStart).addClass("dashBoxLine");
      }

      function _autoplot(func, label, colour) {
        var curve = Plot.drawCurve(func, xStart, yStart, yEnd, xMax, yMax, width, height, xMax/width, false);
        av.g.polyline(curve, {"stroke-width": 3, "stroke": colour});
        var x, y, xofs, yofs;

        if (func(xMax) > yMax) {
            var lo = 0, hi = xMax;
            while (Math.floor(lo*xSteps) != Math.floor(hi*xSteps)) {
                var mid = (lo+hi)/2;
                if (func(mid) < yMax)
                    lo = mid;
                else
                    hi = mid;
            }

            x = lo;
            y = yMax;

            xofs = 5;
            yofs = -10;
        } else {
            x = xMax;
            y = func(xMax);

            xofs = 5;
            yofs = -3;
        }

        av.label(label, {left: xStart + x*xSteps + xofs, top: yStart - y*ySteps - 25 - yofs});
      }

      for (var i = 0; i < funcs.length; i++) {
        var func = funcs[i][0];
        var label = funcs[i][1];
        var colour = funcs[i][2];
        _autoplot(func, label, colour);
      }

      av.displayInit();
      av.recorded();
    }
  }; // Plot

  window.Plot = window.Plot || Plot;
}());
