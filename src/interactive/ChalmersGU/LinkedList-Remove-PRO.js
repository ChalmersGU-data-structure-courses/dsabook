/*global JSAV, window */
(function() {
  "use strict";
  var av, // The JSAV object
      answerArr = [], // The (internal) array that stores the correct answer
      answerOrderArr = [], // The (internal) array that stores the correct order of nodes' ids
      answerCopyVal, // Correct value of the return 'box'.
      llist_head, // Stores the head node of the list
      orderArr = [], // Initial node ids of the JSAV list.
      listSize, // JSAV list size
      listArr = [], // Initial node elements' values for the JSAV list.
      jsavList, // JSAV list
      jsavCopyNode, // Return 'box'.
      connections = [], // Stores the node-pairs of the JSAV-List arrows.
      delPtr, // The pointer to the node to be deleted
      prevPtr, // The pointer to the prev node
      prevIdx, // The index of the prev node
      fromNode, // Stores the node whose pointer area is clicked.
      delPosition, // Index of the node to be deleted, starting counting from the next node of head
      selected_node; // Remember node that has been selected by user for swap

  var LinkedListRemovePRO = {
    userInput: null, // Boolean: Tells us if user ever did anything

    // Add an edge from obj1(node) to obj2(node)
    connection: function(obj1, obj2, jsav) {
      if (obj1 === obj2) { return; }
      var leftOffset = obj1.jsav.container.find(".jsavcanvas:first").offset().left;
      var topOffset = obj1.jsav.container.find(".jsavcanvas:first").offset().top;
      var fx = obj1.element.offset().left + 39 - leftOffset;
      var tx = obj2.element.offset().left + 2 - leftOffset;
      var fy = obj1.element.offset().top + 16 - topOffset;
      var ty = obj2.element.offset().top + 16 - topOffset;
      var fx1 = fx,
          fy1 = fy,
          tx1 = tx,
          ty1 = ty;

      var dx = Math.max(Math.abs(fx - tx) / 2, 35);
      var dy = Math.max(Math.abs(fy - ty) / 2, 35);
      if ((fy - ty > -10) && (fy - ty < 10) && ((tx - fx < 36) || (tx - fx > 38))) {
        dx = Math.min(Math.abs(fx - tx), 20);
        dy = Math.min(Math.abs(fx - tx) / 3, 50);
        tx += 22;
        ty += 15;
        fx1 = fx;
        fy1 = fy + dy;
        tx1 = tx + dx;
        ty1 = ty + dy;
      }
      var edge = jsav.g.path(["M", fx, fy, "C", fx1, fy1, tx1, ty1, tx, ty].join(","),
                             {"arrow-end": "classic-wide-long",
                              opacity: 100, "stroke-width": 2});

      obj1.llist_edgeToNext.element.remove();
      obj1.llist_edgeToNext = edge;
      obj1.llist_next = obj2;
    },

    // Function for connecting two nodes
    connect: function(obj1, obj2, jsav) {
      if (obj1 === obj2) { return; }
      LinkedListRemovePRO.connection(obj1, obj2, jsav);
      obj1.llist_next = obj2;
      obj1._next = obj2;
      for (var i = 0; i < connections.length; i++) {
        if ((connections[i].from === obj1) && (connections[i].to !== obj2)) {
          connections[i].to = obj2;
          return;
        }
      }
      connections.push({from: obj1, to: obj2});
    },

    // Click event handler on the list
    clickHandler: function(e) {
      // Check that the clicked node is reachable from "prev"
      if (!(this === prevPtr.target() ||
            this === prevPtr.target().llist_next ||
            this === (prevPtr.target().llist_next && prevPtr.target().llist_next.llist_next) ||
            (this === delPtr.target() && prevIdx === delPosition-1) ||
            this === jsavCopyNode))
      {
        if (selected_node !== null) {
          selected_node.removeClass("bgColor");
          selected_node = null;
        }
        if (fromNode !== null) {
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          fromNode = null;
        }
        console.log("NO");
        return;
      }

      var x = parseInt(e.pageX - $("#" + this.id()).offset().left, 10);
      var y = parseInt(e.pageY - $("#" + this.id()).offset().top, 10);
      if (x > 31 && x < 42 && y > 0 && y < 31) { // We are in the pointer part
        if (selected_node !== null) { // Clear prior node value selection
          selected_node.removeClass("bgColor");
          selected_node = null;
        }
        if (fromNode === null) { // Newly selecting a node pointer field
          $("#" + this.id() + " .jsavpointerarea:first").addClass("bgColor");
          fromNode = this;
        } else if (this.id() === fromNode.id()) { // re-clicked pointer
          $("#" + this.id() + " .jsavpointerarea:first").removeClass("bgColor");
          fromNode = null;
        } else { // Clicked a second pointer, so replace
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          $("#" + this.id() + " .jsavpointerarea:first").addClass("bgColor");
          fromNode = this;
        }
      } else // We are in the value part of the node
        if (fromNode !== null) { // We are connecting another node to this node
          // Note that this allows a node to point to itself
          LinkedListRemovePRO.connect(fromNode, this, av);
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          $("#" + this.id()).removeClass("bgColor");
          fromNode = null;
        } else if (selected_node === null) { // Hightlight it for next action
          this.addClass("bgColor");
          selected_node = this;
        } else { // Second value clicked, so will swap values
          this.value(selected_node.value());
          selected_node.removeClass("bgColor");
          av.effects.copyValue(selected_node, this);
          selected_node = null;
        }
      LinkedListRemovePRO.userInput = true;
    },

    // Click event handler of 'makenull' button.
    nullClickHandler: function() {
      if (fromNode !== null) { // If no node pointer field selected, do nothing
        $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
        // LinkedListRemovePRO.addTail(fromNode);
        if (fromNode.llist_edgeToNext) {
          fromNode.llist_edgeToNext.element.remove();
          fromNode.llist_next = null;
        }
        LinkedListRemovePRO.userInput = true;
      }
    },

    // Handle "MoveForward" button click
    moveforward: function() {
      var nextNode = prevPtr.target().llist_next;
      if (!nextNode) return;
      prevPtr.target(nextNode);
      prevIdx++;
      av.step();
    },

    // Reinitialize the exercise.
    reset: function() {
      // JSAV-List position.
      var leftMargin = 36,
          topMargin = 50;
      var i;
      // Reset the value of global variables.
      LinkedListRemovePRO.userInput = false;
      answerOrderArr.length = 0;
      connections = [];
      selected_node = null;
      fromNode = null;

      // Clear the old JSAV canvas.
      if ($("#LinkedList-Remove-PRO")) { $("#LinkedList-Remove-PRO").empty(); }

      // Set up the display
      av = new JSAV("LinkedList-Remove-PRO");
      jsavList = av.ds.list({nodegap: 30, top: topMargin, left: leftMargin});
      for (i = listSize-1; i >= 0; i--) {
        jsavList.addFirst(listArr[i]);
      }
      jsavList.layout();

      // 'return' JSAV array
      var jsavCopyList = av.ds.list({left: leftMargin + 10 + 73 * delPosition, top: topMargin + 70});
      jsavCopyList.addClass("hidePointerArea");
      jsavCopyList.addFirst("null");
      jsavCopyNode = jsavCopyList.first();
      jsavCopyList.layout();
      
      // 'return' Label
      av.label("return", {left: leftMargin - 35 + 73 * delPosition, top: topMargin + 74});

      // Create pointers
      prevIdx = 0;
      prevPtr = av.pointer("prev", jsavList.get(prevIdx));
      delPtr = av.pointer("remove this", jsavList.get(delPosition));

      for (i = 0; i < listSize; i++) {
        orderArr[i] = jsavList.get(i).id();
        jsavList.get(i).llist_next = jsavList.get(i).next();
        jsavList.get(i).llist_edgeToNext = jsavList.get(i).edgeToNext();
      }

      llist_head = jsavList.get(0);

      // Correct answer.
      for (i = 0; i < listSize; i++) {
        if (i !== delPosition) {
          answerOrderArr.push(orderArr[i]);
        }
      }
      answerCopyVal = jsavList.get(delPosition).value();
      av.displayInit();
      av.recorded();

      // (Re-)Bind click handlers
      jsavCopyList.click(LinkedListRemovePRO.clickHandler);
      jsavList.click(LinkedListRemovePRO.clickHandler);
    },

    // Initialise the exercise
    initJSAV: function(size, pos) {
      var i;
      // Out with the old
      answerArr.length = 0;
      answerOrderArr.length = 0;
      listSize = size;
      delPosition = pos;

      // Give random numbers in range 0..999
      for (i = 0; i < size; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      // Make a copy
      listArr = answerArr.slice(0);
      answerArr.splice(delPosition, 1);

      LinkedListRemovePRO.reset();

      // Set up click handlers
      $("#MoveForward").click(function() { LinkedListRemovePRO.moveforward(); });
      $("#MakeNull").click(function() { LinkedListRemovePRO.nullClickHandler(); });
      $("#reset").click(function() { LinkedListRemovePRO.reset(); });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      var i = 0;
      // Check the 'return' array
      if (answerCopyVal !== jsavCopyNode.value()) {
        return false;
      }
      // Check that the deleted node doesn't point to anything
      if (delPtr.target().llist_next) {
        return false;
      }
      var curr = llist_head;
      while (curr) {
        if ((curr.value() === answerArr[i]) && (curr.id() === answerOrderArr[i])) {
          curr = curr.llist_next;
          i++;
        } else {
          return false;
        }
      }
      return i === listSize-1;
    }

  };

  window.LinkedListRemovePRO = window.LinkedListRemovePRO || LinkedListRemovePRO;
}());
