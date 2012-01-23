/*http://www.jslint.com */
/*jslint browser: true, evil: true, indent: 2, plusplus: true */
/*global marked: false */

//(function () {
//  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  function html_encode(str) {
    return str.replace(/[&<>"']/g, function ($0) {
      return "&" + {"&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "#39"}[$0] + ";";
    });
  }

  function markup() {
    $("content").innerHTML = marked($("editor").value);
  }

  function html() {
    $("content").innerHTML = "<textarea>" +
      html_encode(marked($("editor").value)) + "</textarea>";
  }

  function json() {
    $("content").innerHTML = "<textarea>" +
      JSON.stringify(marked.lexer($("editor").value), null, 2) + "</textarea>";
  }

  function clearit() {
    $("content").innerHTML = "";
    $("editor").value = "# Hello World\n";
    localStorage.removeItem("markup");
  }

  function save() {
    localStorage.setItem("markup", $("editor").value);
  }

  function sel(a) {
    var l = document.links, i = 0;
    for (i = 0; i < l.length; i++) {
      if (l[i].classList.contains("selected")) {
        l[i].classList.remove("selected");
      }
    }
    if (typeof a === "object") {
      a.classList.add("selected");
    }
  }

  function get(u, a) {
    var x = new XMLHttpRequest();
    x.onreadystatechange = function () {
      var s = [], i = 0;
      if (x.readyState === 4 && x.status === 200) {
        $("content").innerHTML = u.match(/\.md$/) ?
            marked(x.responseText) : x.responseText;
        if (a) {
          sel(a);
        }
        s = $("content").getElementsByTagName("script");
        for (i = 0; i < s.length; i++) {
          eval(s[i].innerHTML);
        }
      }
    };
    x.open("GET", u, true);
    x.send();
  }

  function tab(a) {
    get(a.hash.replace(/^#/, ""), a);
  }


var DragHandler = {
  // private property.
  _oElem : null,

  // public method. Attach drag handler to an element.
  attach : function(oElem) {
    oElem.onmousedown = DragHandler._dragBegin;
    // callbacks
    oElem.dragBegin = new Function();
    oElem.drag = new Function();
    oElem.dragEnd = new Function();
    return oElem;
  },

  // private method. Begin drag process.
  _dragBegin : function(e) {
    var oElem = DragHandler._oElem = this;
    if (isNaN(parseInt(oElem.style.left))) { oElem.style.left = '0px'; }
    if (isNaN(parseInt(oElem.style.top))) { oElem.style.top = '0px'; }
    var x = parseInt(oElem.style.left);
    var y = parseInt(oElem.style.top);
    e = e ? e : window.event;
    oElem.mouseX = e.clientX;
    oElem.mouseY = e.clientY;
    oElem.dragBegin(oElem, x, y);
    document.onmousemove = DragHandler._drag;
    document.onmouseup = DragHandler._dragEnd;
    return false;
  },

  // private method. Drag (move) element.
  _drag : function(e) {
    var oElem = DragHandler._oElem;
    var x = parseInt(oElem.style.left);
    var y = parseInt(oElem.style.top);
    e = e ? e : window.event;
    oElem.style.left = x + (e.clientX - oElem.mouseX) + 'px';
    oElem.style.top = y + (e.clientY - oElem.mouseY) + 'px';
    oElem.mouseX = e.clientX;
    oElem.mouseY = e.clientY;
    oElem.drag(oElem, x, y);
    return false;
  },

  // private method. Stop drag process.
  _dragEnd : function() {
    var oElem = DragHandler._oElem;
    var x = parseInt(oElem.style.left);
    var y = parseInt(oElem.style.top);
    oElem.dragEnd(oElem, x, y);
    document.onmousemove = null;
    document.onmouseup = null;
    DragHandler._oElem = null;
  }
}

  window.onload = function () {
    if (location.hash && location.hash !== "#/") {
      get(location.hash.replace(/^#/, ""), true);
    } else {
      get("/lib/md/index.md");
    }
    if (localStorage.getItem("markup")) {
      $("editor").value = localStorage.getItem("markup");
    }
  };

//})(); // replace with }()); to pass jslint

/***
* Source: https://github.com/opensrc/opensrc.github.com/blob/master/lib/js/index.js
* License: http://www.gnu.org/licenses/agpl.html
* Version: 20120121
* Copyright: Mark Constable
***/
