// When ready
$(document).ready(function () {
    var toc = $(".nav-scroll")[0]

    console.log(toc);

    // Find an anchor tag with the same href as the current page (last part of the URL), skipping hashes
    var current = $(".nav-scroll a");

    // Find the current, previous, and next anchors
    var previous = null;
    var next = null;
    var previousTitle = null;
    var nextTitle = null;

    for (var i = 0; i < current.length; i++) {
        var a = current[i].href.split("#")[0].split("/").pop();
        var b = window.location.pathname.split("/").pop();
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


    var index = $("<a class=\"col-8\" >Table of Contents ⬈</a>");
    index.click(function () {
        // Open index.html in a new tab
        window.open("index.html", "_blank");
    });
    var rowI = $("<div class=\"row\"></div>");
    rowI.append(index);

    // Add a botton to collapse the TOC
    var button = $("<a class=\"col-8\">(hide)</a>");

    button.click(function () {
        $(toc).toggleClass("display-none");
        if ($(toc).hasClass("display-none")) {
            button.text("(show)");
        } else {
            button.text("(hide)");
        }
    });

    var row = $("<div class=\"row\"></div>");
    row.append(button);

    $(".nav-scroll-header").prepend(row);

    $(".nav-scroll-header").prepend(rowI);

    if (next !== null) {
        var bnext = $("<p class=\"col-10 nav-btn\">Next: <a href=\"" + next + "\">" + nextTitle + "</a></p>");
        var rowN = $("<div class=\"row\"></div>");
        rowN.append(bnext);

        $(".nav-scroll-header").prepend(rowN);
    }

    if (previous !== null) {
        var bprev = $("<p class=\"col-10 nav-btn\">Previous: <a href=\"" + previous + "\">" + previousTitle + "</a></p>");
        var rowP = $("<div class=\"row\"></div>");
        rowP.append(bprev);

        $(".nav-scroll-header").prepend(rowP);
    }

    // Hide everything except the index button if the screen is too small (actively)
    $(window).resize(function () {
        if ($(window).width() < 768) {
            $(toc).addClass("display-none");
            button.text("(show)");
        } else {
            $(toc).removeClass("display-none");
            button.text("(hide)");
        }
    });

});