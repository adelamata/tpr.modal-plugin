/**
 *
 * Copyright (c) 2016 Antonio Ángel de la Mata López
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 **/
(function (window, jQuery, undefined) {
  TPRMODAL = function (opts) {
    this.defaults = {
      closable: true,
      styleclass: "tpr-modalbox-grey",
      backlayer: true,
      closeoutclick: true,
      moreinfo: {
        state: false,
        message: "",
        buttontext: "More info",
      },
      buttons: {
        accept: {
          state: true,
          text: "Accept",
          class: "default",
        },
        cancel: {
          state: true,
          text: "Cancel",
          class: "default",
        },
        close: {
          state: true,
          text: "Close",
          class: "default-close",
        },
      },
    };

    this.$modal = {
      $modalbox: this._createElement("<div></div>"),
      $modalbackground: this._createElement(
        '<div class="tpr-modal-background"></div>'
      ),
      $modaltopbar: this._createElement('<div class="tpr-modal-topbar"></div>'),
      $modalcontent: this._createElement(
        '<div class="tpr-modal-content"></div>'
      ),
      $modalbotbar: this._createElement('<div class="tpr-modal-botbar"></div>'),
      $modalmorebox: this._createElement(
        '<div class="tpr-modal-morebox"></div>'
      ),
      $modalmorelbtn: this._createElement(
        '<a href="#" class="tpr-modal-morebutton"></a>'
      ),
      $closebutton: this._createElement(
        '<a href="#" class="tpr-modal-close" ></a>'
      ),
      $modaltitle: this._createElement("<p></p>"),
      $modalmessage: this._createElement("<p></p>"),
    };

    this.options = {};
    $.extend(true, this.options, this.defaults, opts);

    this.$el = this.$modal.$modalbox;
    this.$body = jQuery("body");

    //
    // Modal texts
    this.title = (opts && opts.title) || "Default title";
    this.message = (opts && opts.message) || "Default message";
    this.messageExplain =
      (opts && opts.messageExplain) || "Default message explain";

    //
    // Modal construction
    this.constructor();
  };

  TPRMODAL.prototype = {
    _insertChilds: function (parent, childs) {
      var self = this;
      if (parent && childs) {
        if (childs.length) {
          for (var i = 0; i < childs.length; i++) {
            parent.append(childs[i]);
          }
        } else {
          parent.append(childs);
        }
      }
    },
    _createElement: function (element) {
      var self = this;
      if (element) {
        return jQuery(element);
      }
    },
    _buildButtons: function () {
      var self = this;
      self.$modal.$modalbotbar.empty();

      //
      // Configure botbar
      $.each(self.options.buttons, function (index, element) {
        if (element !== false) {
          var $button = self._createElement(
            '<a href="#" class="tpr-modal-button ' +
              element.class +
              '">' +
              element.text +
              "</a>"
          );
          self._insertChilds(self.$modal.$modalbotbar, $button);
          self._attachEvent($button, "click", index);
        }
      });
    },

    _attachEvent: function (element, event, executor) {
      var self = this;
      if (element && event && executor) {
        if (!$.isFunction(executor)) {
          element.off(event);
          element.on(event, function (event) {
            event.stopPropagation();
            event.preventDefault();

            self.$modal.$modalbox.trigger(executor, [self, element]);
          });
        } else {
          element.off(event);
          element.on(event, function (event) {
            event.stopPropagation();
            event.preventDefault();

            executor();
          });
        }
      }
    },

    _buildModal: function () {
      var self = this;

      //
      // Set parent class that determine
      // style of the entire modal
      self.$modal.$modalbox.addClass(self.options.styleclass);

      //
      // Configure topbar
      self._insertChilds(self.$modal.$modaltopbar, [
        self.$modal.$modaltitle.text(self.title),
        self.$modal.$closebutton,
      ]);

      //
      // Configure content
      self._insertChilds(
        self.$modal.$modalcontent,
        self.$modal.$modalmessage.text(self.message)
      );

      //
      // Has more info box?
      self.$modal.$modalmorelbtn.text(self.options.moreinfo.buttontext);
      self._insertChilds(
        self.$modal.$modalmorebox,
        self.options.moreinfo.message
      );

      self._insertChilds(self.$modal.$modalcontent, [
        self.$modal.$modalmorelbtn,
        self.$modal.$modalmorebox,
      ]);

      if (self.options.moreinfo.state === true) {
        self.$modal.$modalmorelbtn.css({ display: "inline-block" });
        self._attachEvent(self.$modal.$modalmorelbtn, "click", function () {
          self.$modal.$modalmorebox.slideToggle();
        });
      }

      self._insertChilds(self.$modal.$modalbox, [
        self.$modal.$modaltopbar,
        self.$modal.$modalcontent,
        self.$modal.$modalbotbar,
      ]);

      // Has background?
      if (self.options.backlayer === true) {
        self.$modal.$modalbackground.appendTo(self.$body);
        self.$modal.$modalbox.appendTo(self.$modal.$modalbackground);

        //
        // When click on background close?
        if (self.options.closeoutclick) {
          self._attachEvent(self.$modal.$modalbackground, "click", function () {
            self.hide();
          });
        }
      } else {
        self.$modal.$modalbox.appendTo(self.$body);
      }

      //
      // Is cosable?
      if (!self.options.closable) {
        self.setClosable(false);
      }

      //
      // CENTER MODAL
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var modalWidth = Math.floor(
        (self.$modal.$modalbox.innerWidth() / 100) * windowWidth
      );
      var modalHeight =
        Math.floor((self.$modal.$modalbox.innerHeight() / 100) * windowHeight) +
        400;

      var xPosition = windowWidth / 2 - modalWidth / 2;
      var yPosition = windowHeight / 2 - modalHeight / 2;

      //
      // SET x, y POSITIONS
      self.$modal.$modalbox.css({
        left: xPosition + "px",
        top: yPosition + "px",
      });

      //
      // This event stop propagation from inner modalbox tags
      self._attachEvent(self.$modal.$modalbox, "click", function () {
        return false;
      });

      self.$el = self.$modal.$modalmorebox;
    },
    on: function (event, callback) {
      var self = this;
      self.$modal.$modalbox.off(event);
      self.$modal.$modalbox.on(event, callback);
    },

    //
    // Configure modal text
    setTitle: function (title) {
      var self = this;
      self.$modal.$modaltitle.text(title);
    },
    setMessage: function (message) {
      var self = this;
      self.$modal.$modalmessage.text(message);
    },
    setMessageExplain: function (msg) {
      var self = this;
      self.$modal.$modalmorebox.text(msg);
    },
    setMoreinfoState: function (state) {
      var self = this;
      if (state) {
        self.$modal.$modalmorelbtn.css({ display: "inline-block" });
        self._attachEvent(self.$modal.$modalmorelbtn, "click", function () {
          self.$modal.$modalmorebox.slideToggle();
        });
      } else {
        self.$modal.$modalmorelbtn.hide();
      }
    },
    setMoreinfoButtonText: function (text) {
      var self = this;
      if (text) {
        self.$modal.$modalmorelbtn.text(text);
      }
    },
    setStyle: function (styleClass) {
      var self = this;
      var cClass = self.$modal.$modalbox.attr("class");
      self.$modal.$modalbox.addClass(styleClass).removeClass(cClass);
    },

    setClosable: function (closable) {
      var self = this;
      if (closable === true) {
        self.$modal.$closebutton.show();
        self._attachEvent(self.$modal.$modalbackground, "click", function () {
          self.$modal.$modalbackground.hide();
        });
      } else {
        self.$modal.$closebutton.hide();
        self.$modal.$modalbackground.off("click");
      }
    },

    setDefaultButtonsHide: function () {
      var self = this;
      $.each(self.options.buttons, function (index, element) {
        element.state = false;
      });
    },

    //
    // Visibility control
    show: function () {
      var self = this;
      self.$modal.$modalbackground.show();
    },
    hide: function () {
      var self = this;
      self.$modal.$modalbackground.hide();
      self.$modal.$modalmorebox.hide();
    },

    setButtons: function (buttons) {
      var self = this;
      $.extend(true, self.options.buttons, buttons);
      self._buildButtons();
    },

    constructor: function () {
      var self = this;

      // First step, build DOM element
      self._buildModal();
      self._buildButtons();
      self._attachEvent(self.$modal.$closebutton, "click", function () {
        self.hide();
      });
    },
  };
})(window, $);
