/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "BinaryTreeMistakesCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "When you write a recursive method that traverses a binary tree, you should avoid the following common mistakes.",
    "sc2": "Do not forget to check if the root is null",
    "sc3": "Making a recursive call does not itself do anything with the return value.",
    "sc4": "This line computes the correct value. But it does not go anywhere, as it is missing the return."
  };

  var pseudo = av.code([
    "function bad_count(node):",
    "    if node is null: return 0",
    "    bad_count(root.left)",
    "    1 + bad_count(root.left) + bad_count(root.right)",
  ], {lineNumbers: false,
      tags: {
        "treenull": 2,
        "reccall": 3,
        "compute": 4
    },
  });

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  pseudo.setCurrentLine("treenull");
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  pseudo.setCurrentLine("reccall");
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"]);
  pseudo.setCurrentLine("compute");
  av.recorded();
});
