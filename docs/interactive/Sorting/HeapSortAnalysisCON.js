/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Heap Sort Analysis
$(document).ready(function() {
  "use strict";
  var av_name = "HeapSortAnalysisCON";
  var av = new JSAV(av_name);

  var interpret = {
	  "Slide 1": "The first step in heapsort is to heapify the array. This will cost <em>&theta;(n)</em> running time for an array of size <em>n</em>.<br> Consider the following structure of a Max Heap",
	  "Slide 2": "HeapSort swaps the root node containng the maximum key with the last node in the heap",
	  "Slide 3": "After swapping, the heap size is reduced by <em>1</em> and the Max-heap property may be violated, accordingly, the array should be re-heapified",
	  "Slide 4": "In the worst case, siftdown will push the root node towards the current last position in the heap",
	  "Slide 8": "This will requires <em>&LeftFloor;log(i)&RightFloor;</em> amount of work, where <em>i</em> is the index of the current last position in the heap",
	  "Slide 9": "Since this process is done till the heap is empty, the total amount of work can be modeled by the following summation",
	  "Slide 10": "Since most of the heap nodes are located towards the bottom of the heap, the distance from the root to the current last position in the heap will be in most cases <em>&LeftFloor;log(i)&RightFloor;</em>, thus this summation is bounded by <em>n log(n)</em>",
	  "Slide 11": "Accordingly, the total running time of heapsort is <em>&theta;(n + n log(n)) = &theta;(n log(n))</em>",
	  "Slide 12": "If all key values were equal, then Heapsort would cost <em>&theta;(n)</em> in the best case because every call to removemax would result in calls to siftdown that complete in constant time because the new root value never swaps with its children."
  };

  var arr = [];
  var numNodes = 31;
  var bh;

  function swap(index1, index2) {
    function treeswap(i1, i2) {
      bh.jsav.effects.swap(bh._treenodes[i1].element, bh._treenodes[i2].element, true);
    }
    JSAV.anim(treeswap).call(bh, index1, index2);
  }

  // Slide 1
  av.umsg(interpret["Slide 1"]);
  for (var i = 0; i < numNodes; i++) {
    arr.push(" ");
  }
  bh = av.ds.binheap(arr, {left: 100, top: 50, nodegap: 15});
  bh.element.hide();
  bh.layout();
  av.displayInit();

  // Slide 2
  av.umsg(interpret["Slide 2"]);
  bh.css([0, 30], {"background-color": "yellow"});
  av.step();

  // Slide 3
  av.umsg(interpret["Slide 3"]);
  swap(0, 30);
  bh.css(30, {"background-color": "grey"});
  bh.css(0, {"background-color": "red"});
  av.step();

  // Slide 4
  av.umsg(interpret["Slide 4"]);
  swap(0, 2);
  bh.css(0, {"background-color": "white"});
  bh.css(2, {"background-color": "red"});
  av.step();

  // Slide 5
  swap(2, 6);
  bh.css(2, {"background-color": "white"});
  bh.css(6, {"background-color": "red"});
  av.step();

  // Slide 6
  swap(6, 14);
  bh.css(6, {"background-color": "white"});
  bh.css(14, {"background-color": "red"});
  av.step();

  // Slide 7
  swap(14, 29);
  bh.css(14, {"background-color": "white"});
  bh.css(29, {"background-color": "green"});
  av.step();

  // Slide 8
  av.umsg(interpret["Slide 8"]);
  av.step();

  // Slide 9
  av.umsg(interpret["Slide 9"]);
  var label = av.label("<em>&Sigma;<sub>i&le;n</sub> &LeftFloor;log(i)&RightFloor;</em>",  {top: "-10px", left: "10px"}).css({"font-size": "16px", "text-align": "center"});
  bh.css([29, 30], {"background-color": "white"});
  av.step();

  // Slide 10
  label.hide();
  av.umsg(interpret["Slide 10"]);
  av.step();

  // Slide 11
  av.umsg(interpret["Slide 11"]);
  av.step();

  // Slide 12
  av.umsg(interpret["Slide 12"]);
  av.recorded();
});
