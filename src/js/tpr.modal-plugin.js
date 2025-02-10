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
class TPRModal {
  constructor(opts = {}) {
    this.defaults = {
      closable: true,
      styleClass: "tpr-modalbox-grey",
      backLayer: true,
      closeOutClick: true,
      moreInfo: {
        state: false,
        message: "",
        buttonText: "More info",
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

    this.options = { ...this.defaults, ...opts };
    this.$modal = {
      $modalBox: this._createElement("<div></div>"),
      $modalBackground: this._createElement(
        '<div class="tpr-modal-background"></div>'
      ),
      $modalTopBar: this._createElement('<div class="tpr-modal-topbar"></div>'),
      $modalContent: this._createElement(
        '<div class="tpr-modal-content"></div>'
      ),
      $modalBotBar: this._createElement('<div class="tpr-modal-botbar"></div>'),
      $modalMoreBox: this._createElement(
        '<div class="tpr-modal-morebox"></div>'
      ),
      $modalMoreLBtn: this._createElement(
        '<a href="#" class="tpr-modal-morebutton"></a>'
      ),
      $closeButton: this._createElement(
        '<a href="#" class="tpr-modal-close"></a>'
      ),
      $modalTitle: this._createElement("<p></p>"),
      $modalMessage: this._createElement("<p></p>"),
    };

    this.title = opts.title || "Default title";
    this.message = opts.message || "Default message";
    this.messageExplain = opts.messageExplain || "Default message explain";

    this.$body = $("body");
    this._buildModal();
    this._buildButtons();
    this._attachEvent(this.$modal.$closeButton, "click", () => this.hide());
  }

  _createElement(element) {
    return $(element);
  }

  _insertChilds(parent, childs) {
    if (parent && childs) {
      if (Array.isArray(childs)) {
        childs.forEach((child) => parent.append(child));
      } else {
        parent.append(childs);
      }
    }
  }

  _buildButtons() {
    this.$modal.$modalBotBar.empty();
    Object.entries(this.options.buttons).forEach(([index, element]) => {
      if (element !== false) {
        const $button = this._createElement(
          `<a href="#" class="tpr-modal-button ${element.class}">${element.text}</a>`
        );
        this._insertChilds(this.$modal.$modalBotBar, $button);
        this._attachEvent($button, "click", index);
      }
    });
  }

  _attachEvent(element, event, executor) {
    if (element && event && executor) {
      element.off(event).on(event, (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (typeof executor === "function") {
          executor();
        } else {
          this.$modal.$modalBox.trigger(executor, [this, element]);
        }
      });
    }
  }

  _buildModal() {
    const { styleClass, moreInfo, backLayer } = this.options;

    this.$modal.$modalBox.addClass(styleClass);

    // Top bar
    this._insertChilds(this.$modal.$modalTopBar, [
      this.$modal.$modalTitle.text(this.title),
      this.$modal.$closeButton,
    ]);

    // Content
    this._insertChilds(
      this.$modal.$modalContent,
      this.$modal.$modalMessage.text(this.message)
    );

    // More info
    this.$modal.$modalMoreLBtn.text(moreInfo.buttonText);
    this._insertChilds(this.$modal.$modalMoreBox, moreInfo.message);
    this._insertChilds(this.$modal.$modalContent, [
      this.$modal.$modalMoreLBtn,
      this.$modal.$modalMoreBox,
    ]);

    if (moreInfo.state) {
      this.$modal.$modalMoreLBtn.css({ display: "inline-block" });
      this._attachEvent(this.$modal.$modalMoreLBtn, "click", () => {
        this.$modal.$modalMoreBox.slideToggle();
      });
    }

    this._insertChilds(this.$modal.$modalBox, [
      this.$modal.$modalTopBar,
      this.$modal.$modalContent,
      this.$modal.$modalBotBar,
    ]);

    if (backLayer) {
      this.$modal.$modalBackground.appendTo(this.$body);
      this.$modal.$modalBox.appendTo(this.$modal.$modalBackground);

      if (this.options.closeOutClick) {
        this._attachEvent(this.$modal.$modalBackground, "click", () =>
          this.hide()
        );
      }
    } else {
      this.$modal.$modalBox.appendTo(this.$body);
    }

    if (!this.options.closable) {
      this.setClosable(false);
    }

    this._centerModal();
  }

  _centerModal() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const modalWidth = Math.floor(
      (this.$modal.$modalBox.innerWidth() / 100) * windowWidth
    );
    const modalHeight =
      Math.floor((this.$modal.$modalBox.innerHeight() / 100) * windowHeight) +
      400;

    const xPosition = windowWidth / 2 - modalWidth / 2;
    const yPosition = windowHeight / 2 - modalHeight / 2;

    this.$modal.$modalBox.css({
      left: `${xPosition}px`,
      top: `${yPosition}px`,
    });

    // Prevent propagation
    this._attachEvent(this.$modal.$modalBox, "click", () => false);
  }

  setTitle(title) {
    this.$modal.$modalTitle.text(title);
  }

  setMessage(message) {
    this.$modal.$modalMessage.text(message);
  }

  setMessageExplain(message) {
    this.$modal.$modalMoreBox.text(message);
  }

  setMoreInfoState(state) {
    if (state) {
      this.$modal.$modalMoreLBtn.css({ display: "inline-block" });
      this._attachEvent(this.$modal.$modalMoreLBtn, "click", () => {
        this.$modal.$modalMoreBox.slideToggle();
      });
    } else {
      this.$modal.$modalMoreLBtn.hide();
    }
  }

  setStyle(styleClass) {
    this.$modal.$modalBox.removeClass().addClass(styleClass);
  }

  setClosable(closable) {
    if (closable) {
      this.$modal.$closeButton.show();
      this._attachEvent(this.$modal.$modalBackground, "click", () =>
        this.$modal.$modalBackground.hide()
      );
    } else {
      this.$modal.$closeButton.hide();
      this.$modal.$modalBackground.off("click");
    }
  }

  setDefaultButtonsHide() {
    Object.values(this.options.buttons).forEach(
      (button) => (button.state = false)
    );
  }

  show() {
    this.$modal.$modalBackground.show();
  }

  hide() {
    this.$modal.$modalBackground.hide();
    this.$modal.$modalMoreBox.hide();
  }

  setButtons(buttons) {
    this.options.buttons = { ...this.options.buttons, ...buttons };
    this._buildButtons();
  }
}
