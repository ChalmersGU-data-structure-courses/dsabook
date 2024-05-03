// When ready
$(document).ready(function () {
    var toc = $(".nav-scroll")[0]

    console.log(toc);

    // Find an anchor tag with the same href as the current page (last part of the URL), skipping hashes
    var current = $(".nav-scroll a");

    // Find the current, previous, and next anchors
    var previous = null;
    var next = null;
    var top = null;
    var previousTitle = null;
    var nextTitle = null;
    var topTitle = null;

    for (var i = 0; i < current.length; i++) {
        var a = current[i].href.split("#")[0].split("/").pop();
        var b = window.location.pathname.split("/").pop();

        var bIsTop = b.match(/^\d+-/);
    
        // If it starts with a whole number followed by a -, it's a top-level section
        if (a.match(/^\d+-/) && !bIsTop) {
            top = current[i].href;
            topTitle = current[i].innerText;
        }

        console.log(a, b);
        if (a == b) {
            next = current[i + 1].href;
            nextTitle = current[i + 1].innerText;
            if (i > 0) {
                previous = current[i - 1].href;
                previousTitle = current[i - 1].innerText;
            }
            current = $(current[i]);
            chosen = true;
            break;
        }
    }

    console.log(current);

    // Scroll to the current anchor, with the top of the anchor at the top of the TOC
    if (current.length) {
        $(toc).animate({
            scrollTop: current[0].offsetTop - toc.clientHeight / 4
        }, 500);
    }

    // Make the anchor into a paragraph
    var p = $("<p style=\"margin: 0px\"></p>");
    p.append(current.contents());
    current.replaceWith(p);

    // Make the background white
    $(".nav-scroll").css("background-color", "white");

    var topRow = $('#top-nav');


    var index = $("<a class=\"col-8\" >Table of Contents ⬈</a>");
    index.click(function () {
        // Open index.html in a new tab
        window.open("index.html", "_blank");
    });
    var rowI = $("<div class=\"row\"></div>");
    rowI.append(index);

    var row = $("<div class=\"row\"></div>");

    $(".nav-scroll-header").prepend(row);

    $(".nav-scroll-header").prepend(rowI);

    var toCopy = [];

    if (next !== null) {
        var bnext = $("<p class=\"col-10 nav-btn\">Next: <a href=\"" + next + "\">" + nextTitle + "</a></p>");
        var rowN = $("<div class=\"row\"></div>");
        rowN.append(bnext);

        $(".nav-scroll-header").prepend(rowN);
        toCopy.push(rowN);
    }

    if (previous !== null) {
        var bprev = $("<p class=\"col-10 nav-btn\">Previous: <a href=\"" + previous + "\">" + previousTitle + "</a></p>");
        var rowP = $("<div class=\"row\"></div>");
        rowP.append(bprev);

        $(".nav-scroll-header").prepend(rowP);
        toCopy.push(rowP);
    }

    if (topTitle !== null) {
        var btop = $("<p class=\"col-10 nav-btn\">Top: <a href=\"" + top + "\">" + topTitle + "</a></p>");
        var rowT = $("<div class=\"row\"></div>");
        rowT.append(btop);

        $(".nav-scroll-header").prepend(rowT);
        toCopy.push(rowT);
    }

    for (var i = toCopy.length - 1; i >= 0; i--) {
        topRow.append(toCopy[i].clone());
    }

});