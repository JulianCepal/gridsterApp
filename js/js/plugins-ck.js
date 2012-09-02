// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function() {
  log.history = log.history || [];
  log.history.push(arguments);
  if (this.console) {
    arguments.callee = arguments.callee.caller;
    console.log(Array.prototype.slice.call(arguments));
  }
};

(function(e) {
  function t() {}
  for (var n = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), r; r = n.pop(); ) e[r] = e[r] || t;
})(window.console = window.console || {});

window.log = function() {
  log.history = log.history || [];
  log.history.push(arguments);
  if (this.console) {
    arguments.callee = arguments.callee.caller;
    console.log(Array.prototype.slice.call(arguments));
  }
};

(function(e) {
  function t() {}
  for (var n = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), r; r = n.pop(); ) e[r] = e[r] || t;
})(window.console = window.console || {});

(function(e) {
  var t = 0;
  e.fn.mobileMenu = function(n) {
    function r(n) {
      return n.attr("id") ? e("#mobileMenu_" + n.attr("id")).length > 0 : (t++, n.attr("id", "mm" + t), e("#mobileMenu_mm" + t).length > 0);
    }
    function s(t) {
      t.hide();
      e("#mobileMenu_" + t.attr("id")).show();
    }
    function o(t) {
      if (t.is("ul, ol")) {
        var n = '<select id="mobileMenu_' + t.attr("id") + '" class="mobileMenu">';
        n += '<option value="">' + a.topOptionText + "</option>";
        t.find("li").each(function() {
          var t = "", r = e(this).parents("ul, ol").length;
          for (i = 1; i < r; i++) t += a.indentString;
          r = e(this).find("a:first-child").attr("href");
          t += e(this).clone().children("ul, ol").remove().end().text();
          n += '<option value="' + r + '">' + t + "</option>";
        });
        n += "</select>";
        t.parent().append(n);
        e("#mobileMenu_" + t.attr("id")).change(function() {
          var t = e(this);
          t.val() !== null && (document.location.href = t.val());
        });
        s(t);
      } else alert("mobileMenu will only work with UL or OL elements!");
    }
    function u(t) {
      e(window).width() < a.switchWidth && !r(t) ? o(t) : e(window).width() < a.switchWidth && r(t) ? s(t) : !(e(window).width() < a.switchWidth) && r(t) && (t.show(), e("#mobileMenu_" + t.attr("id")).hide());
    }
    var a = {
      switchWidth: 768,
      topOptionText: "Select a page",
      indentString: "&nbsp;&nbsp;&nbsp;"
    };
    return this.each(function() {
      n && e.extend(a, n);
      var t = e(this);
      e(window).resize(function() {
        u(t);
      });
      u(t);
    });
  };
})(jQuery);

(function(e) {
  function t(e, t) {
    for (var n = e, r = 0; e = e[t]; ) n.tagName == e.tagName && r++;
    return r;
  }
  function n(e, n, r) {
    e = t(e, r);
    if (n == "odd" || n == "even") r = 2, e -= n != "odd"; else {
      var i = n.indexOf("n");
      i > -1 ? (r = parseInt(n, 10) || parseInt(n.substring(0, i) + "1", 10), e -= (parseInt(n.substring(i + 1), 10) || 0) - 1) : (r = e + 1, e -= parseInt(n, 10) - 1);
    }
    return (r < 0 ? e <= 0 : e >= 0) && e % r == 0;
  }
  var r = {
    "first-of-type": function(e) {
      return t(e, "previousSibling") == 0;
    },
    "last-of-type": function(e) {
      return t(e, "nextSibling") == 0;
    },
    "only-of-type": function(e) {
      return r["first-of-type"](e) && r["last-of-type"](e);
    },
    "nth-of-type": function(e, t, r) {
      return n(e, r[3], "previousSibling");
    },
    "nth-last-of-type": function(e, t, r) {
      return n(e, r[3], "nextSibling");
    }
  };
  e.extend(e.expr[":"], r);
})(jQuery);

(function(e, t, n) {
  function s(e) {
    var t = {}, r = /^jQuery\d+$/;
    n.each(e.attributes, function(e, n) {
      n.specified && !r.test(n.name) && (t[n.name] = n.value);
    });
    return t;
  }
  function o() {
    var e = n(this);
    e.val() === e.attr("placeholder") && e.hasClass("placeholder") && (e.data("placeholder-password") ? e.hide().next().show().focus().attr("id", e.removeAttr("id").data("placeholder-id")) : e.val("").removeClass("placeholder"));
  }
  function u() {
    var e, t = n(this), r = t, i = this.id;
    if (t.val() === "") {
      if (t.is(":password")) {
        if (!t.data("placeholder-textinput")) {
          try {
            e = t.clone().attr({
              type: "text"
            });
          } catch (u) {
            e = n("<input>").attr(n.extend(s(this), {
              type: "text"
            }));
          }
          e.removeAttr("name").data("placeholder-password", !0).data("placeholder-id", i).bind("focus.placeholder", o);
          t.data("placeholder-textinput", e).data("placeholder-id", i).before(e);
        }
        t = t.removeAttr("id").hide().prev().attr("id", i).show();
      }
      t.addClass("placeholder").val(t.attr("placeholder"));
    } else t.removeClass("placeholder");
  }
  var r = "placeholder" in t.createElement("input"), i = "placeholder" in t.createElement("textarea");
  if (r && i) {
    n.fn.placeholder = function() {
      return this;
    };
    n.fn.placeholder.input = n.fn.placeholder.textarea = !0;
  } else {
    n.fn.placeholder = function() {
      return this.filter((r ? "textarea" : ":input") + "[placeholder]").bind("focus.placeholder", o).bind("blur.placeholder", u).trigger("blur.placeholder").end();
    };
    n.fn.placeholder.input = r;
    n.fn.placeholder.textarea = i;
    n(function() {
      n("form").bind("submit.placeholder", function() {
        var e = n(".placeholder", this).each(o);
        setTimeout(function() {
          e.each(u);
        }, 10);
      });
    });
    n(e).bind("unload.placeholder", function() {
      n(".placeholder").val("");
    });
  }
})(this, document, jQuery);

(function(e, t, n, r) {
  function i(t) {
    return t[0] && e.isPlainObject(t[0]) ? this.data = t[0] : this.el = t, this.isCoords = !0, this.coords = {}, this.init(), this;
  }
  var s = i.prototype;
  s.init = function() {
    this.set(), this.original_coords = this.get();
  }, s.set = function(e, t) {
    var n = this.el;
    n && !e && (this.data = n.offset(), this.data.width = n.width(), this.data.height = n.height());
    if (n && e && !t) {
      var r = n.offset();
      this.data.top = r.top, this.data.left = r.left;
    }
    var i = this.data;
    return this.coords.x1 = i.left, this.coords.y1 = i.top, this.coords.x2 = i.left + i.width, this.coords.y2 = i.top + i.height, this.coords.cx = i.left + i.width / 2, this.coords.cy = i.top + i.height / 2, this.coords.width = i.width, this.coords.height = i.height, this.coords.el = n || !1, this;
  }, s.update = function(t) {
    if (!t && !this.el) return this;
    if (t) {
      var n = e.extend({}, this.data, t);
      return this.data = n, this.set(!0, !0);
    }
    return this.set(!0), this;
  }, s.get = function() {
    return this.coords;
  }, e.fn.coords = function() {
    if (this.data("coords")) return this.data("coords");
    var e = new i(this, arguments[0]);
    return this.data("coords", e), e;
  };
})(jQuery, window, document), function(e, t, n, r) {
  function i(t, n, r) {
    this.options = e.extend(s, r), this.$element = t, this.last_colliders = [], this.last_colliders_coords = [], typeof n == "string" || n instanceof jQuery ? this.$colliders = e(n, this.options.colliders_context).not(this.$element) : this.colliders = e(n), this.init();
  }
  var s = {
    colliders_context: n.body
  }, o = i.prototype;
  o.init = function() {
    this.find_collisions();
  }, o.overlaps = function(e, t) {
    var n = !1, r = !1;
    if (t.x1 >= e.x1 && t.x1 <= e.x2 || t.x2 >= e.x1 && t.x2 <= e.x2 || e.x1 >= t.x1 && e.x2 <= t.x2) n = !0;
    if (t.y1 >= e.y1 && t.y1 <= e.y2 || t.y2 >= e.y1 && t.y2 <= e.y2 || e.y1 >= t.y1 && e.y2 <= t.y2) r = !0;
    return n && r;
  }, o.detect_overlapping_region = function(e, t) {
    var n = "", r = "";
    return e.y1 > t.cy && e.y1 < t.y2 && (n = "N"), e.y2 > t.y1 && e.y2 < t.cy && (n = "S"), e.x1 > t.cx && e.x1 < t.x2 && (r = "W"), e.x2 > t.x1 && e.x2 < t.cx && (r = "E"), n + r || "C";
  }, o.calculate_overlapped_area_coords = function(t, n) {
    var r = Math.max(t.x1, n.x1), i = Math.max(t.y1, n.y1), s = Math.min(t.x2, n.x2), o = Math.min(t.y2, n.y2);
    return e({
      left: r,
      top: i,
      width: s - r,
      height: o - i
    }).coords().get();
  }, o.calculate_overlapped_area = function(e) {
    return e.width * e.height;
  }, o.manage_colliders_start_stop = function(t, n, r) {
    var i = this.last_colliders_coords;
    for (var s = 0, o = i.length; s < o; s++) e.inArray(i[s], t) === -1 && n.call(this, i[s]);
    for (var u = 0, f = t.length; u < f; u++) e.inArray(t[u], i) === -1 && r.call(this, t[u]);
  }, o.find_collisions = function(t) {
    var n = this, r = [], i = [], s = this.colliders || this.$colliders, o = s.length, u = n.$element.coords().update(t || !1).get();
    while (o--) {
      var f = n.$colliders ? e(s[o]) : s[o], l = f.isCoords ? f : f.coords(), c = l.get(), h = n.overlaps(u, c);
      if (!h) continue;
      var p = n.detect_overlapping_region(u, c);
      if (p === "C") {
        var d = n.calculate_overlapped_area_coords(u, c), v = n.calculate_overlapped_area(d), m = {
          area: v,
          area_coords: d,
          region: p,
          coords: c,
          player_coords: u,
          el: f
        };
        n.options.on_overlap && n.options.on_overlap.call(this, m), r.push(l), i.push(m);
      }
    }
    return (n.options.on_overlap_stop || n.options.on_overlap_start) && this.manage_colliders_start_stop(r, n.options.on_overlap_stop, n.options.on_overlap_start), this.last_colliders_coords = r, i;
  }, o.get_closest_colliders = function(e) {
    var t = this.find_collisions(e), n = 100;
    return t.sort(function(e, t) {
      return e.area <= n ? 1 : e.region === "C" && t.region === "C" ? e.coords.y1 < t.coords.y1 || e.coords.x1 < t.coords.x1 ? -1 : 1 : e.area < t.area ? 1 : 1;
    }), t;
  }, e.fn.collision = function(e, t) {
    return new i(this, e, t);
  };
}(jQuery, window, document), function(e, t) {
  e.debounce = function(e, t, n) {
    var r;
    return function() {
      var i = this, s = arguments, o = function() {
        r = null, n || e.apply(i, s);
      };
      n && !r && e.apply(i, s), clearTimeout(r), r = setTimeout(o, t);
    };
  }, e.throttle = function(e, t) {
    var n, r, i, s, o, u, a = debounce(function() {
      o = s = !1;
    }, t);
    return function() {
      n = this, r = arguments;
      var l = function() {
        i = null, o && e.apply(n, r), a();
      };
      return i || (i = setTimeout(l, t)), s ? o = !0 : u = e.apply(n, r), a(), s = !0, u;
    };
  };
}(window), function(e, t, n, r) {
  function i(t, r) {
    this.options = e.extend({}, s, r), this.$body = e(n.body), this.$container = e(t), this.$dragitems = e(this.options.items, this.$container), this.is_dragging = !1, this.player_min_left = 0 + this.options.offset_left, this.init();
  }
  var s = {
    items: ".gs_w",
    distance: 1,
    limit: !0,
    offset_left: 0,
    autoscroll: !0
  }, o = e(t), u = "ontouchstart" in t, a = {
    start: u ? "touchstart" : "mousedown.draggable",
    move: u ? "touchmove" : "mousemove.draggable",
    end: u ? "touchend" : "mouseup.draggable"
  }, f = i.prototype;
  f.init = function() {
    this.calculate_positions(), this.$container.css("position", "relative"), this.enable(), e(t).bind("resize", throttle(e.proxy(this.calculate_positions, this), 200));
  }, f.get_actual_pos = function(e) {
    var t = e.position();
    return t;
  }, f.get_mouse_pos = function(e) {
    if (u) {
      var t = e.originalEvent;
      e = t.touches.length ? t.touches[0] : t.changedTouches[0];
    }
    return {
      left: e.clientX,
      top: e.clientY
    };
  }, f.get_offset = function(e) {
    e.preventDefault();
    var t = this.get_mouse_pos(e), n = Math.round(t.left - this.mouse_init_pos.left), r = Math.round(t.top - this.mouse_init_pos.top), i = Math.round(this.el_init_offset.left + n - this.baseX), s = Math.round(this.el_init_offset.top + r - this.baseY + this.scrollOffset);
    return this.options.limit && (i > this.player_max_left ? i = this.player_max_left : i < this.player_min_left && (i = this.player_min_left)), {
      left: i,
      top: s,
      mouse_left: t.left,
      mouse_top: t.top
    };
  }, f.manage_scroll = function(e) {
    var t, n = o.scrollTop(), r = n, i = r + this.window_height, s = i - 50, u = r + 50, a = e.mouse_left, f = r + e.mouse_top, l = this.doc_height - this.window_height + this.player_height;
    f >= s && (t = n + 30, t < l && (o.scrollTop(t), this.scrollOffset = this.scrollOffset + 30)), f <= u && (t = n - 30, t > 0 && (o.scrollTop(t), this.scrollOffset = this.scrollOffset - 30));
  }, f.calculate_positions = function(e) {
    this.window_height = o.height();
  }, f.drag_handler = function(t) {
    var n = t.target.nodeName;
    if (t.which !== 1 && !u) return;
    if (n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || n === "BUTTON") return;
    var r = this, i = !0;
    return this.$player = e(t.currentTarget), this.el_init_pos = this.get_actual_pos(this.$player), this.mouse_init_pos = this.get_mouse_pos(t), this.offsetY = this.mouse_init_pos.top - this.el_init_pos.top, this.$body.on(a.move, function(e) {
      var t = r.get_mouse_pos(e), n = Math.abs(t.left - r.mouse_init_pos.left), s = Math.abs(t.top - r.mouse_init_pos.top);
      return n > r.options.distance || s > r.options.distance ? i ? (i = !1, r.on_dragstart.call(r, e), !1) : (r.is_dragging == 1 && r.on_dragmove.call(r, e), !1) : !1;
    }), !1;
  }, f.on_dragstart = function(t) {
    t.preventDefault(), this.drag_start = !0, this.is_dragging = !0;
    var r = this.$container.offset();
    return this.baseX = Math.round(r.left), this.baseY = Math.round(r.top), this.doc_height = e(n).height(), this.options.helper === "clone" ? (this.$helper = this.$player.clone().appendTo(this.$container).addClass("helper"), this.helper = !0) : this.helper = !1, this.scrollOffset = 0, this.el_init_offset = this.$player.offset(), this.player_width = this.$player.width(), this.player_height = this.$player.height(), this.player_max_left = this.$container.width() - this.player_width + this.options.offset_left, this.options.start && this.options.start.call(this.$player, t, {
      helper: this.helper ? this.$helper : this.$player
    }), !1;
  }, f.on_dragmove = function(e) {
    var t = this.get_offset(e);
    this.options.autoscroll && this.manage_scroll(t), (this.helper ? this.$helper : this.$player).css({
      position: "absolute",
      left: t.left,
      top: t.top
    });
    var n = {
      position: {
        left: t.left,
        top: t.top
      }
    };
    return this.options.drag && this.options.drag.call(this.$player, e, n), !1;
  }, f.on_dragstop = function(e) {
    var t = this.get_offset(e);
    this.drag_start = !1;
    var n = {
      position: {
        left: t.left,
        top: t.top
      }
    };
    return this.options.stop && this.options.stop.call(this.$player, e, n), this.helper && this.$helper.remove(), !1;
  }, f.on_select_start = function(e) {
    return !1;
  }, f.enable = function() {
    this.$container.on("selectstart", this.on_select_start), this.$container.on(a.start, this.options.items, e.proxy(this.drag_handler, this)), this.$body.on(a.end, e.proxy(function(e) {
      this.is_dragging = !1, this.$body.off(a.move), this.drag_start && this.on_dragstop(e);
    }, this));
  }, f.disable = function() {
    this.$container.off(a.start), this.$body.off(a.end), this.$container.off("selectstart", this.on_select_start);
  }, f.destroy = function() {
    this.disable(), e.removeData(this.$container, "drag");
  }, e.fn.drag = function(t) {
    return this.each(function() {
      e.data(this, "drag") || e.data(this, "drag", new i(this, t));
    });
  };
}(jQuery, window, document), function(e, t, n, r) {
  function i(t, n) {
    this.options = e.extend(!0, s, n), this.$el = e(t), this.$wrapper = this.$el.parent(), this.$widgets = e(this.options.widget_selector, this.$el).addClass("gs_w"), this.widgets = [], this.$changed = e([]), this.wrapper_width = this.$wrapper.width(), this.min_widget_width = this.options.widget_margins[0] * 2 + this.options.widget_base_dimensions[0], this.min_widget_height = this.options.widget_margins[1] * 2 + this.options.widget_base_dimensions[1], this.init();
  }
  var s = {
    widget_selector: "> li",
    widget_margins: [ 10, 10 ],
    widget_base_dimensions: [ 400, 225 ],
    extra_rows: 0,
    extra_cols: 0,
    min_cols: 1,
    min_rows: 15,
    max_size_x: 6,
    autogenerate_stylesheet: !0,
    avoid_overlapped_widgets: !0,
    serialize_params: function(e, t) {
      return {
        col: t.col,
        row: t.row,
        size_x: t.size_x,
        size_y: t.size_y
      };
    },
    collision: {},
    draggable: {
      distance: 4
    }
  };
  i.generated_stylesheets = [];
  var o = i.prototype;
  o.init = function() {
    this.generate_grid_and_stylesheet(), this.get_widgets_from_DOM(), this.set_dom_grid_height(), this.$wrapper.addClass("ready"), this.draggable(), e(t).bind("resize", throttle(e.proxy(this.recalculate_faux_grid, this), 200));
  }, o.disable = function() {
    return this.$wrapper.find(".player-revert").removeClass("player-revert"), this.drag_api.disable(), this;
  }, o.enable = function() {
    return this.drag_api.enable(), this;
  }, o.add_widget = function(t, n, r, i, s) {
    var o;
    n || (n = 1), r || (r = 1), !i & !s ? o = this.next_position(n, r) : (o = {
      col: i,
      row: s
    }, this.empty_cells(i, s, n, r));
    var u = e(t).attr({
      "data-col": o.col,
      "data-row": o.row,
      "data-sizex": n,
      "data-sizey": r
    }).addClass("gs_w").appendTo(this.$el).hide();
    return this.$widgets = this.$widgets.add(u), this.register_widget(u), this.add_faux_rows(o.size_y), this.set_dom_grid_height(), u.fadeIn();
  }, o.resize_widget = function(t, n, r) {
    var i = t.coords().grid;
    n || (n = i.size_x), r || (r = i.size_y), n > this.cols && (n = this.cols);
    var s = this.get_cells_occupied(i), o = i.size_x, u = i.size_y, f = i.col, l = f, c = n > o, h = r > u;
    if (f + n - 1 > this.cols) {
      var p = f + (n - 1) - this.cols, d = f - p;
      l = Math.max(1, d);
    }
    var v = {
      col: l,
      row: i.row,
      size_x: n,
      size_y: r
    }, m = this.get_cells_occupied(v), g = [];
    e.each(s.cols, function(t, n) {
      e.inArray(n, m.cols) === -1 && g.push(n);
    });
    var y = [];
    e.each(m.cols, function(t, n) {
      e.inArray(n, s.cols) === -1 && y.push(n);
    });
    var b = [];
    e.each(s.rows, function(t, n) {
      e.inArray(n, m.rows) === -1 && b.push(n);
    });
    var w = [];
    e.each(m.rows, function(t, n) {
      e.inArray(n, s.rows) === -1 && w.push(n);
    }), this.remove_from_gridmap(i);
    if (y.length) {
      var E = [ l, i.row, n, Math.min(u, r), t ];
      this.empty_cells.apply(this, E);
    }
    if (w.length) {
      var S = [ l, i.row, n, r, t ];
      this.empty_cells.apply(this, S);
    }
    i.col = l, i.size_x = n, i.size_y = r, this.add_to_gridmap(v, t), t.data("coords").update({
      width: n * this.options.widget_base_dimensions[0] + (n - 1) * this.options.widget_margins[0] * 2,
      height: r * this.options.widget_base_dimensions[1] + (r - 1) * this.options.widget_margins[1] * 2
    }), r > u && this.add_faux_rows(r - u), t.attr({
      "data-col": l,
      "data-sizex": n,
      "data-sizey": r
    });
    if (g.length) {
      var x = [ g[0], i.row, g.length, Math.min(u, r), t ];
      this.remove_empty_cells.apply(this, x);
    }
    if (b.length) {
      var T = [ l, i.row, n, r, t ];
      this.remove_empty_cells.apply(this, T);
    }
    return t;
  }, o.empty_cells = function(t, n, r, i, s) {
    var o = this.widgets_below({
      col: t,
      row: n - i,
      size_x: r,
      size_y: i
    });
    return o.not(s).each(e.proxy(function(t, r) {
      var s = e(r).coords().grid;
      if (!(s.row <= n + i - 1)) return;
      var o = n + i - s.row;
      this.move_widget_down(e(r), o);
    }, this)), this.set_dom_grid_height(), this;
  }, o.remove_empty_cells = function(t, n, r, i, s) {
    var o = this.widgets_below({
      col: t,
      row: n,
      size_x: r,
      size_y: i
    });
    return o.not(s).each(e.proxy(function(t, n) {
      this.move_widget_up(e(n), i);
    }, this)), this.set_dom_grid_height(), this;
  }, o.next_position = function(e, t) {
    e || (e = 1), t || (t = 1);
    var n = this.gridmap, r = n.length, i = [];
    for (var s = 1; s < r; s++) {
      var o = n[s].length;
      for (var u = 1; u <= o; u++) {
        var a = this.can_move_to({
          size_x: e,
          size_y: t
        }, s, u);
        a && i.push({
          col: s,
          row: u,
          size_y: t,
          size_x: e
        });
      }
    }
    return i.length ? this.sort_by_row_and_col_asc(i)[0] : !1;
  }, o.remove_widget = function(t, n) {
    var r = t instanceof jQuery ? t : e(t), i = r.coords().grid;
    this.cells_occupied_by_placeholder = {}, this.$widgets = this.$widgets.not(r);
    var s = this.widgets_below(r);
    this.remove_from_gridmap(i), r.fadeOut(e.proxy(function() {
      r.remove(), s.each(e.proxy(function(t, n) {
        this.move_widget_up(e(n), i.size_y);
      }, this)), this.set_dom_grid_height(), n && n.call(this, t);
    }, this));
  }, o.serialize = function(t) {
    t || (t = this.$widgets);
    var n = [];
    return t.each(e.proxy(function(t, r) {
      n.push(this.options.serialize_params(e(r), e(r).coords().grid));
    }, this)), n;
  }, o.serialize_changed = function() {
    return this.serialize(this.$changed);
  }, o.register_widget = function(e) {
    var t = {
      col: parseInt(e.attr("data-col"), 10),
      row: parseInt(e.attr("data-row"), 10),
      size_x: parseInt(e.attr("data-sizex"), 10),
      size_y: parseInt(e.attr("data-sizey"), 10),
      el: e
    };
    return this.options.avoid_overlapped_widgets && !this.can_move_to({
      size_x: t.size_x,
      size_y: t.size_y
    }, t.col, t.row) && (t = this.next_position(t.size_x, t.size_y), t.el = e, e.attr({
      "data-col": t.col,
      "data-row": t.row,
      "data-sizex": t.size_x,
      "data-sizey": t.size_y
    })), e.data("coords", e.coords()), e.data("coords").grid = t, this.add_to_gridmap(t, e), this.widgets.push(e), this;
  }, o.update_widget_position = function(e, t) {
    return this.for_each_cell_occupied(e, function(e, n) {
      if (!this.gridmap[e]) return this;
      this.gridmap[e][n] = t;
    }), this;
  }, o.remove_from_gridmap = function(e) {
    return this.update_widget_position(e, !1);
  }, o.add_to_gridmap = function(t, n) {
    this.update_widget_position(t, n || t.el);
    if (t.el) {
      var r = this.widgets_below(t.el);
      r.each(e.proxy(function(t, n) {
        this.move_widget_up(e(n));
      }, this));
    }
  }, o.draggable = function() {
    var t = this, n = e.extend(!0, {}, this.options.draggable, {
      offset_left: this.options.widget_margins[0],
      start: function(n, r) {
        t.$widgets.filter(".player-revert").removeClass("player-revert"), t.$player = e(this), t.$helper = t.options.draggable.helper === "clone" ? e(r.helper) : t.$player, t.helper = !t.$helper.is(t.$player), t.on_start_drag.call(t, n, r), t.$el.trigger("gridster:dragstart");
      },
      stop: function(e, n) {
        t.on_stop_drag.call(t, e, n), t.$el.trigger("gridster:dragstop");
      },
      drag: throttle(function(e, n) {
        t.on_drag.call(t, e, n), t.$el.trigger("gridster:drag");
      }, 60)
    });
    return this.drag_api = this.$el.drag(n).data("drag"), this;
  }, o.on_start_drag = function(t, n) {
    this.$helper.add(this.$player).add(this.$wrapper).addClass("dragging"), this.$player.addClass("player"), this.player_grid_data = this.$player.coords().grid, this.placeholder_grid_data = e.extend({}, this.player_grid_data), this.$el.css("height", this.$el.height() + this.player_grid_data.size_y * this.min_widget_height);
    var r = this.faux_grid, i = this.$player.data("coords").coords;
    this.cells_occupied_by_player = this.get_cells_occupied(this.player_grid_data), this.cells_occupied_by_placeholder = this.get_cells_occupied(this.placeholder_grid_data), this.last_cols = [], this.last_rows = [], this.collision_api = this.$helper.collision(r, this.options.collision), this.$preview_holder = e("<li />", {
      "class": "preview-holder",
      "data-row": this.$player.attr("data-row"),
      "data-col": this.$player.attr("data-col"),
      css: {
        width: i.width,
        height: i.height
      }
    }).appendTo(this.$el), this.options.draggable.start && this.options.draggable.start.call(this, t, n);
  }, o.on_drag = function(e, t) {
    if (this.$player === null) return !1;
    var n = {
      left: t.position.left + this.baseX,
      top: t.position.top + this.baseY
    };
    this.colliders_data = this.collision_api.get_closest_colliders(n), this.on_overlapped_column_change(this.on_start_overlapping_column, this.on_stop_overlapping_column), this.on_overlapped_row_change(this.on_start_overlapping_row, this.on_stop_overlapping_row), this.helper && this.$player && this.$player.css({
      left: t.position.left,
      top: t.position.top
    }), this.options.draggable.drag && this.options.draggable.drag.call(this, e, t);
  }, o.on_stop_drag = function(e, t) {
    this.$helper.add(this.$player).add(this.$wrapper).removeClass("dragging"), t.position.left = t.position.left + this.baseX, t.position.top = t.position.top + this.baseY, this.colliders_data = this.collision_api.get_closest_colliders(t.position), this.on_overlapped_column_change(this.on_start_overlapping_column, this.on_stop_overlapping_column), this.on_overlapped_row_change(this.on_start_overlapping_row, this.on_stop_overlapping_row), this.$player.addClass("player-revert").removeClass("player").attr({
      "data-col": this.placeholder_grid_data.col,
      "data-row": this.placeholder_grid_data.row
    }).css({
      left: "",
      top: ""
    }), this.$changed = this.$changed.add(this.$player), this.cells_occupied_by_player = this.get_cells_occupied(this.placeholder_grid_data), this.set_cells_player_occupies(this.placeholder_grid_data.col, this.placeholder_grid_data.row), this.$player.coords().grid.row = this.placeholder_grid_data.row, this.$player.coords().grid.col = this.placeholder_grid_data.col, this.options.draggable.stop && this.options.draggable.stop.call(this, e, t), this.$preview_holder.remove(), this.$player = null, this.$helper = null, this.placeholder_grid_data = {}, this.player_grid_data = {}, this.cells_occupied_by_placeholder = {}, this.cells_occupied_by_player = {}, this.set_dom_grid_height();
  }, o.on_overlapped_column_change = function(t, n) {
    if (!this.colliders_data.length) return;
    var r = this.get_targeted_columns(this.colliders_data[0].el.data.col), i = this.last_cols.length, s = r.length, o;
    for (o = 0; o < s; o++) e.inArray(r[o], this.last_cols) === -1 && (t || e.noop).call(this, r[o]);
    for (o = 0; o < i; o++) e.inArray(this.last_cols[o], r) === -1 && (n || e.noop).call(this, this.last_cols[o]);
    return this.last_cols = r, this;
  }, o.on_overlapped_row_change = function(t, n) {
    if (!this.colliders_data.length) return;
    var r = this.get_targeted_rows(this.colliders_data[0].el.data.row), i = this.last_rows.length, s = r.length, o;
    for (o = 0; o < s; o++) e.inArray(r[o], this.last_rows) === -1 && (t || e.noop).call(this, r[o]);
    for (o = 0; o < i; o++) e.inArray(this.last_rows[o], r) === -1 && (n || e.noop).call(this, this.last_rows[o]);
    this.last_rows = r;
  }, o.set_player = function(e, t, n) {
    var r = this;
    n || this.empty_cells_player_occupies();
    var i = n ? {
      col: e
    } : r.colliders_data[0].el.data, s = i.col, o = t || i.row;
    this.player_grid_data = {
      col: s,
      row: o,
      size_y: this.player_grid_data.size_y,
      size_x: this.player_grid_data.size_x
    }, this.cells_occupied_by_player = this.get_cells_occupied(this.player_grid_data);
    var u = this.get_widgets_overlapped(this.player_grid_data), a = this.widgets_constraints(u);
    this.manage_movements(a.can_go_up, s, o), this.manage_movements(a.can_not_go_up, s, o);
    if (!u.length) {
      var f = this.can_go_player_up(this.player_grid_data);
      f !== !1 && (o = f), this.set_placeholder(s, o);
    }
    return {
      col: s,
      row: o
    };
  }, o.widgets_constraints = function(t) {
    var n = e([]), r, i = [], s = [];
    return t.each(e.proxy(function(t, r) {
      var o = e(r), u = o.coords().grid;
      this.can_go_widget_up(u) ? (n = n.add(o), i.push(u)) : s.push(u);
    }, this)), r = t.not(n), {
      can_go_up: this.sort_by_row_asc(i),
      can_not_go_up: this.sort_by_row_desc(s)
    };
  }, o.sort_by_row_asc = function(t) {
    return t = t.sort(function(t, n) {
      return t.row || (t = e(t).coords().grid, n = e(n).coords().grid), t.row > n.row ? 1 : -1;
    }), t;
  }, o.sort_by_row_and_col_asc = function(e) {
    return e = e.sort(function(e, t) {
      return e.row > t.row || e.row == t.row && e.col > t.col ? 1 : -1;
    }), e;
  }, o.sort_by_col_asc = function(e) {
    return e = e.sort(function(e, t) {
      return e.col > t.col ? 1 : -1;
    }), e;
  }, o.sort_by_row_desc = function(e) {
    return e = e.sort(function(e, t) {
      return e.row + e.size_y < t.row + t.size_y ? 1 : -1;
    }), e;
  }, o.manage_movements = function(t, n, r) {
    return e.each(t, e.proxy(function(e, t) {
      var i = t, s = i.el, o = this.can_go_widget_up(i);
      if (o) this.move_widget_to(s, o), this.set_placeholder(n, o + i.size_y); else {
        var u = this.can_go_player_up(this.player_grid_data);
        if (!u) {
          var a = r + this.player_grid_data.size_y - i.row;
          this.move_widget_down(s, a), this.set_placeholder(n, r);
        }
      }
    }, this)), this;
  }, o.is_player = function(e, t) {
    if (t && !this.gridmap[e]) return !1;
    var n = t ? this.gridmap[e][t] : e;
    return n && (n.is(this.$player) || n.is(this.$helper));
  }, o.is_player_in = function(t, n) {
    var r = this.cells_occupied_by_player || {};
    return e.inArray(t, r.cols) >= 0 && e.inArray(n, r.rows) >= 0;
  }, o.is_placeholder_in = function(t, n) {
    var r = this.cells_occupied_by_placeholder || {};
    return this.is_placeholder_in_col(t) && e.inArray(n, r.rows) >= 0;
  }, o.is_placeholder_in_col = function(t) {
    var n = this.cells_occupied_by_placeholder || [];
    return e.inArray(t, n.cols) >= 0;
  }, o.is_empty = function(e, t) {
    return typeof this.gridmap[e] != "undefined" && typeof this.gridmap[e][t] != "undefined" && this.gridmap[e][t] === !1 ? !0 : !1;
  }, o.is_occupied = function(e, t) {
    return this.gridmap[e] ? this.gridmap[e][t] ? !0 : !1 : !1;
  }, o.is_widget = function(e, t) {
    var n = this.gridmap[e];
    return n ? (n = n[t], n ? n : !1) : !1;
  }, o.is_widget_under_player = function(e, t) {
    return this.is_widget(e, t) ? this.is_player_in(e, t) : !1;
  }, o.get_widgets_under_player = function() {
    var t = this.cells_occupied_by_player || {
      cols: [],
      rows: []
    }, n = e([]);
    return e.each(t.cols, e.proxy(function(r, i) {
      e.each(t.rows, e.proxy(function(e, t) {
        this.is_widget(i, t) && (n = n.add(this.gridmap[i][t]));
      }, this));
    }, this)), n;
  }, o.set_placeholder = function(t, n) {
    var r = e.extend({}, this.placeholder_grid_data), i = this.widgets_below({
      col: r.col,
      row: r.row,
      size_y: r.size_y,
      size_x: r.size_x
    }), s = t + r.size_x - 1;
    s > this.cols && (t -= s - t);
    var o = this.placeholder_grid_data.row < n, u = this.placeholder_grid_data.col !== t;
    this.placeholder_grid_data.col = t, this.placeholder_grid_data.row = n, this.cells_occupied_by_placeholder = this.get_cells_occupied(this.placeholder_grid_data), this.$preview_holder.attr({
      "data-row": n,
      "data-col": t
    }), (o || u) && i.each(e.proxy(function(n, i) {
      this.move_widget_up(e(i), this.placeholder_grid_data.col - t + r.size_y);
    }, this));
  }, o.can_go_player_up = function(e) {
    var t = e.row + e.size_y - 1, n = !0, r = [], i = 1e4, s = this.get_widgets_under_player();
    return this.for_each_column_occupied(e, function(e) {
      var o = this.gridmap[e], u = t + 1;
      r[e] = [];
      while (--u > 0) {
        if (!(this.is_empty(e, u) || this.is_player(e, u) || this.is_widget(e, u) && o[u].is(s))) break;
        r[e].push(u), i = u < i ? u : i;
      }
      if (r[e].length === 0) return n = !1, !0;
      r[e].sort();
    }), n ? this.get_valid_rows(e, r, i) : !1;
  }, o.can_go_widget_up = function(e) {
    var t = e.row + e.size_y - 1, n = !0, r = [], i = 1e4;
    return e.col < this.player_grid_data.col && e.col + e.size_y - 1 > this.player_grid_data.col + this.player_grid_data.size_y - 1 ? !1 : (this.for_each_column_occupied(e, function(s) {
      var o = this.gridmap[s];
      r[s] = [];
      var u = t + 1;
      while (--u > 0) {
        if (this.is_widget(s, u) && !this.is_player_in(s, u) && !o[u].is(e.el)) break;
        !this.is_player(s, u) && !this.is_placeholder_in(s, u) && !this.is_player_in(s, u) && r[s].push(u), u < i && (i = u);
      }
      if (r[s].length === 0) return n = !1, !0;
      r[s].sort();
    }), n ? this.get_valid_rows(e, r, i) : !1);
  }, o.get_valid_rows = function(t, n, r) {
    var i = t.row, s = t.row + t.size_y - 1, o = t.size_y, u = r - 1, f = [];
    while (++u <= s) {
      var l = !0;
      e.each(n, function(t, n) {
        e.isArray(n) && e.inArray(u, n) === -1 && (l = !1);
      });
      if (l === !0) {
        f.push(u);
        if (f.length === o) break;
      }
    }
    var c = !1;
    return o === 1 ? f[0] !== i && (c = f[0] || !1) : f[0] !== i && (c = this.get_consecutive_numbers_index(f, o)), c;
  }, o.get_consecutive_numbers_index = function(e, t) {
    var n = e.length, r = [], i = !0, s = -1;
    for (var o = 0; o < n; o++) {
      if (i || e[o] === s + 1) {
        r.push(o);
        if (r.length === t) break;
        i = !1;
      } else r = [], i = !0;
      s = e[o];
    }
    return r.length >= t ? e[r[0]] : !1;
  }, o.get_widgets_overlapped = function() {
    var t, n = e([]), r = [], i = this.cells_occupied_by_player.rows.slice(0);
    return i.reverse(), e.each(this.cells_occupied_by_player.cols, e.proxy(function(t, s) {
      e.each(i, e.proxy(function(t, i) {
        if (!this.gridmap[s]) return !0;
        var o = this.gridmap[s][i];
        this.is_occupied(s, i) && !this.is_player(o) && e.inArray(o, r) === -1 && (n = n.add(o), r.push(o));
      }, this));
    }, this)), n;
  }, o.on_start_overlapping_column = function(e) {
    this.set_player(e, !1);
  }, o.on_start_overlapping_row = function(e) {
    this.set_player(!1, e);
  }, o.on_stop_overlapping_column = function(e) {
    this.set_player(e, !1);
    var t = this;
    this.for_each_widget_below(e, this.cells_occupied_by_player.rows[0], function(e, n) {
      t.move_widget_up(this, t.player_grid_data.size_y);
    });
  }, o.on_stop_overlapping_row = function(e) {
    this.set_player(!1, e);
    var t = this, n = this.cells_occupied_by_player.cols;
    for (var r = 0, i = n.length; r < i; r++) this.for_each_widget_below(n[r], e, function(e, n) {
      t.move_widget_up(this, t.player_grid_data.size_y);
    });
  }, o.move_widget_to = function(t, n) {
    var r = this, i = t.coords().grid, s = n - i.row, o = this.widgets_below(t), u = this.can_move_to(i, i.col, n, t);
    return u === !1 ? !1 : (this.remove_from_gridmap(i), i.row = n, this.add_to_gridmap(i), t.attr("data-row", n), this.$changed = this.$changed.add(t), o.each(function(t, n) {
      var i = e(n), s = i.coords().grid, o = r.can_go_widget_up(s);
      o && o !== s.row && r.move_widget_to(i, o);
    }), this);
  }, o.move_widget_up = function(t, n) {
    var r = t.coords().grid, i = r.row, s = [], o = !0;
    n || (n = 1);
    if (!this.can_go_up(t)) return !1;
    this.for_each_column_occupied(r, function(r) {
      if (e.inArray(t, s) === -1) {
        var o = t.coords().grid, u = i - n;
        u = this.can_go_up_to_row(o, r, u);
        if (!u) return !0;
        var l = this.widgets_below(t);
        this.remove_from_gridmap(o), o.row = u, this.add_to_gridmap(o), t.attr("data-row", o.row), this.$changed = this.$changed.add(t), s.push(t), l.each(e.proxy(function(t, r) {
          this.move_widget_up(e(r), n);
        }, this));
      }
    });
  }, o.move_widget_down = function(t, n) {
    var r = t.coords().grid, i = r.row, s = [], o = n;
    if (!t) return !1;
    if (e.inArray(t, s) === -1) {
      var u = t.coords().grid, f = i + n, l = this.widgets_below(t);
      this.remove_from_gridmap(u), l.each(e.proxy(function(t, n) {
        var r = e(n), i = r.coords().grid, s = this.displacement_diff(i, u, o);
        s > 0 && this.move_widget_down(r, s);
      }, this)), u.row = f, this.update_widget_position(u, t), t.attr("data-row", u.row), this.$changed = this.$changed.add(t), s.push(t);
    }
  }, o.can_go_up_to_row = function(t, n, r) {
    var i = this.gridmap, s = !0, o = [], u = t.row, f;
    this.for_each_column_occupied(t, function(e) {
      var t = i[e];
      o[e] = [], f = u;
      while (f--) {
        if (!this.is_empty(e, f) || !!this.is_placeholder_in(e, f)) break;
        o[e].push(f);
      }
      if (!o[e].length) return s = !1, !0;
    });
    if (!s) return !1;
    f = r;
    for (f = 1; f < u; f++) {
      var l = !0;
      for (var c = 0, h = o.length; c < h; c++) o[c] && e.inArray(f, o[c]) === -1 && (l = !1);
      if (l === !0) {
        s = f;
        break;
      }
    }
    return s;
  }, o.displacement_diff = function(e, t, n) {
    var r = e.row, i = [], s = t.row + t.size_y;
    this.for_each_column_occupied(e, function(e) {
      var t = 0;
      for (var n = s; n < r; n++) this.is_empty(e, n) && (t += 1);
      i.push(t);
    });
    var o = Math.max.apply(Math, i);
    return n -= o, n > 0 ? n : 0;
  }, o.widgets_below = function(t) {
    var n = e.isPlainObject(t) ? t : t.coords().grid, r = this, i = this.gridmap, s = n.row + n.size_y - 1, o = e([]);
    return this.for_each_column_occupied(n, function(t) {
      r.for_each_widget_below(t, s, function(t, n) {
        if (!r.is_player(this) && e.inArray(this, o) === -1) return o = o.add(this), !0;
      });
    }), this.sort_by_row_asc(o);
  }, o.set_cells_player_occupies = function(e, t) {
    return this.remove_from_gridmap(this.placeholder_grid_data), this.placeholder_grid_data.col = e, this.placeholder_grid_data.row = t, this.add_to_gridmap(this.placeholder_grid_data, this.$player), this;
  }, o.empty_cells_player_occupies = function() {
    return this.remove_from_gridmap(this.placeholder_grid_data), this;
  }, o.can_go_up = function(e) {
    var t = e.coords().grid, n = t.row, r = n - 1, i = this.gridmap, s = [], o = !0;
    return n === 1 ? !1 : (this.for_each_column_occupied(t, function(e) {
      var t = this.is_widget(e, r);
      if (this.is_occupied(e, r) || this.is_player(e, r) || this.is_placeholder_in(e, r) || this.is_player_in(e, r)) return o = !1, !0;
    }), o);
  }, o.can_move_to = function(e, t, n) {
    var r = this.gridmap, i = e.el, s = {
      size_y: e.size_y,
      size_x: e.size_x,
      col: t,
      row: n
    }, o = !0, u = t + e.size_x - 1;
    return u > this.cols ? !1 : (this.for_each_cell_occupied(s, function(t, n) {
      var r = this.is_widget(t, n);
      r && (!e.el || r.is(i)) && (o = !1);
    }), o);
  }, o.get_targeted_columns = function(e) {
    var t = (e || this.player_grid_data.col) + (this.player_grid_data.size_x - 1), n = [];
    for (var r = e; r <= t; r++) n.push(r);
    return n;
  }, o.get_targeted_rows = function(e) {
    var t = (e || this.player_grid_data.row) + (this.player_grid_data.size_y - 1), n = [];
    for (var r = e; r <= t; r++) n.push(r);
    return n;
  }, o.get_cells_occupied = function(e) {
    var t = {
      cols: [],
      rows: []
    }, n;
    arguments[1] instanceof jQuery && (e = arguments[1].coords().grid);
    for (n = 0; n < e.size_x; n++) {
      var r = e.col + n;
      t.cols.push(r);
    }
    for (n = 0; n < e.size_y; n++) {
      var i = e.row + n;
      t.rows.push(i);
    }
    return t;
  }, o.for_each_cell_occupied = function(e, t) {
    return this.for_each_column_occupied(e, function(n) {
      this.for_each_row_occupied(e, function(e) {
        t.call(this, n, e);
      });
    }), this;
  }, o.for_each_column_occupied = function(e, t) {
    for (var n = 0; n < e.size_x; n++) {
      var r = e.col + n;
      t.call(this, r, e);
    }
  }, o.for_each_row_occupied = function(e, t) {
    for (var n = 0; n < e.size_y; n++) {
      var r = e.row + n;
      t.call(this, r, e);
    }
  }, o._traversing_widgets = function(t, n, r, i, s) {
    var o = this.gridmap;
    if (!o[r]) return;
    var u, f, l = t + "/" + n;
    if (arguments[2] instanceof jQuery) {
      var c = arguments[2].coords().grid;
      r = c.col, i = c.row, s = arguments[3];
    }
    var h = [], p = i, d = {
      "for_each/above": function() {
        while (p--) if (p > 0 && this.is_widget(r, p) && e.inArray(o[r][p], h) === -1) {
          u = s.call(o[r][p], r, p), h.push(o[r][p]);
          if (u) break;
        }
      },
      "for_each/below": function() {
        for (p = i + 1, f = o[r].length; p < f; p++) if (this.is_widget(r, p) && e.inArray(o[r][p], h) === -1) {
          u = s.call(o[r][p], r, p), h.push(o[r][p]);
          if (u) break;
        }
      }
    };
    d[l] && d[l].call(this);
  }, o.for_each_widget_above = function(e, t, n) {
    return this._traversing_widgets("for_each", "above", e, t, n), this;
  }, o.for_each_widget_below = function(e, t, n) {
    return this._traversing_widgets("for_each", "below", e, t, n), this;
  }, o.get_highest_occupied_cell = function() {
    var e, t = this.gridmap, n = [], r = [];
    for (var i = t.length - 1; i >= 1; i--) for (e = t[i].length - 1; e >= 1; e--) if (this.is_widget(i, e)) {
      n.push(e), r[e] = i;
      break;
    }
    var s = Math.max.apply(Math, n);
    return this.highest_occupied_cell = {
      col: r[s],
      row: s
    }, this.highest_occupied_cell;
  }, o.get_widgets_from = function(t, n) {
    var r = this.gridmap, i = e();
    return t && (i = i.add(this.$widgets.filter(function() {
      var n = e(this).attr("data-col");
      return n === t || n > t;
    }))), n && (i = i.add(this.$widgets.filter(function() {
      var t = e(this).attr("data-row");
      return t === n || t > n;
    }))), i;
  }, o.set_dom_grid_height = function() {
    var e = this.get_highest_occupied_cell().row;
    return this.$el.css("height", e * this.min_widget_height), this;
  }, o.generate_stylesheet = function(t) {
    var n = "", r = this.options.max_size_x, s = 0, o = 0, u, l;
    t || (t = {}), t.cols || (t.cols = this.cols), t.rows || (t.rows = this.rows), t.namespace || (t.namespace = ""), t.widget_base_dimensions || (t.widget_base_dimensions = this.options.widget_base_dimensions), t.widget_margins || (t.widget_margins = this.options.widget_margins), t.min_widget_width = t.widget_margins[0] * 2 + t.widget_base_dimensions[0], t.min_widget_height = t.widget_margins[1] * 2 + t.widget_base_dimensions[1];
    var c = e.param(t);
    if (e.inArray(c, i.generated_stylesheets) >= 0) return !1;
    i.generated_stylesheets.push(c);
    for (u = t.cols; u >= 0; u--) n += t.namespace + ' [data-col="' + (u + 1) + '"] { left:' + (u * t.widget_base_dimensions[0] + u * t.widget_margins[0] + (u + 1) * t.widget_margins[0]) + "px;} ";
    for (u = t.rows; u >= 0; u--) n += t.namespace + ' [data-row="' + (u + 1) + '"] { top:' + (u * t.widget_base_dimensions[1] + u * t.widget_margins[1] + (u + 1) * t.widget_margins[1]) + "px;} ";
    for (var h = 1; h <= t.rows; h++) n += t.namespace + ' [data-sizey="' + h + '"] { height:' + (h * t.widget_base_dimensions[1] + (h - 1) * t.widget_margins[1] * 2) + "px;}";
    for (var p = 1; p <= r; p++) n += t.namespace + ' [data-sizex="' + p + '"] { width:' + (p * t.widget_base_dimensions[0] + (p - 1) * t.widget_margins[0] * 2) + "px;}";
    return this.add_style_tag(n);
  }, o.add_style_tag = function(e) {
    var t = n, r = t.createElement("style");
    return t.getElementsByTagName("head")[0].appendChild(r), r.setAttribute("type", "text/css"), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(n.createTextNode(e)), this;
  }, o.generate_faux_grid = function(e, t) {
    this.faux_grid = [], this.gridmap = [];
    var n, r;
    for (n = t; n > 0; n--) {
      this.gridmap[n] = [];
      for (r = e; r > 0; r--) this.add_faux_cell(r, n);
    }
    return this;
  }, o.add_faux_cell = function(t, n) {
    var r = e({
      left: this.baseX + (n - 1) * this.min_widget_width,
      top: this.baseY + (t - 1) * this.min_widget_height,
      width: this.min_widget_width,
      height: this.min_widget_height,
      col: n,
      row: t,
      original_col: n,
      original_row: t
    }).coords();
    return this.gridmap[n][t] = !1, this.faux_grid.push(r), this;
  }, o.add_faux_rows = function(e) {
    var t = this.rows, n = t + (e || 1);
    for (var r = n; r > t; r--) for (var i = this.cols; i >= 1; i--) this.add_faux_cell(r, i);
    return this.rows = n, this.options.autogenerate_stylesheet && this.generate_stylesheet(), this;
  }, o.recalculate_faux_grid = function() {
    var n = this.$wrapper.width();
    return this.baseX = (e(t).width() - n) / 2, this.baseY = this.$wrapper.offset().top, e.each(this.faux_grid, e.proxy(function(e, t) {
      this.faux_grid[e] = t.update({
        left: this.baseX + (t.data.col - 1) * this.min_widget_width,
        top: this.baseY + (t.data.row - 1) * this.min_widget_height
      });
    }, this)), this;
  }, o.get_widgets_from_DOM = function() {
    return this.$widgets.each(e.proxy(function(t, n) {
      this.register_widget(e(n));
    }, this)), this;
  }, o.generate_grid_and_stylesheet = function() {
    var n = this.$wrapper.width(), r = this.$wrapper.height(), i = Math.floor(n / this.min_widget_width) + this.options.extra_cols, s = this.$widgets.map(function() {
      return e(this).attr("data-col");
    });
    s = Array.prototype.slice.call(s, 0), s.length || (s = [ 0 ]);
    var o = Math.max.apply(Math, s), u = this.options.extra_rows;
    return this.$widgets.each(function(t, n) {
      u += +e(n).attr("data-sizey");
    }), this.cols = Math.max(o, i, this.options.min_cols), this.rows = Math.max(u, this.options.min_rows), this.baseX = (e(t).width() - n) / 2, this.baseY = this.$wrapper.offset().top, this.options.autogenerate_stylesheet && this.generate_stylesheet(), this.generate_faux_grid(this.rows, this.cols);
  }, e.fn.gridster = function(t) {
    return this.each(function() {
      e(this).data("gridster") || e(this).data("gridster", new i(this, t));
    });
  };
}(jQuery, window, document);