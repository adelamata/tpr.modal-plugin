
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
	(function (window, $, undefined) {

		
		TPRMODAL = function (opts) {

			this.defaults   = {
				closable   : true,
				styleclass : 'tpr-modalbox-grey',
				backlayer  : {
					state : true
				},
				closeoutclick : true,
				moreinfo   : {
					state   	: false,
					message 	: "",
					buttontext  : "More info"
				},
				buttons    : {
					accept : {
						state   : true,
						text    : 'Accept',
						class   : 'default',
						click   : function () {
							console.log ("accept");
						}
					},
					cancel : {
						state   : true,
						text    : 'Cancel',
						class   : 'default',
						click  : function () {
							console.log ("cancel");
						}
					},
					close  : {
						state   : true,
						text    : 'Close',
						class   : 'default-close',
						click   : function () {
							this.$modal.$modalbackground.hide ();
						}
					}
				}
			};

			this.$modal  = {
				//
				//
				$modalbox        : this._createElement ('div'),


				//
				//
				$modalbackground : this._createElement ('div', 'tpr-modal-background'),

				//
				//
				$modaltopbar     : this._createElement ('div', 'tpr-modal-topbar'),

				//
				//
				$modalcontent    : this._createElement ('div', 'tpr-modal-content'),

				//
				//
				$modalbotbar     : this._createElement ('div', 'tpr-modal-botbar'),

				//
				//
				$modalmorebox    : this._createElement ('div', 'tpr-modal-morebox'),
				$modalmorelbtn   : this._createElement ('a', 'tpr-modal-morebutton'),


				$closebutton     : this._createElement ('a', 'tpr-modal-close'),


				$modaltitle      : this._createElement ('p'),
				$modalmessage    : this._createElement ('p'),
				$modalmoremsg    : this._createElement ('p')
			};

			this.options = {};
			$.extend(true, this.options ,this.defaults, opts);

			//
			// Modal texts
			this.title   		= (opts && opts.title)  		|| "Default title";
			this.message 		= (opts && opts.message) 		|| "Default message";
			this.messageExplain = (opts && opts.messageExplain) || "Default message explain";

			//
			// Modal construction
			this.constructor ();
			
		};

		TPRMODAL.prototype = {

			_empty         : function (element) {
				var self = this;
				while (element.firstChild) {
				    element.removeChild(element.firstChild);
				}
			},
			_setStyle      : function (element, styles) {
				var self = this;
				for (style in styles) {
					element.style [style] = styles [style];
				}
			},

			_setClass      : function (element, eClass) {
				var self = this;
				element.setAttribute ('class', eClass);
			},

			_createElement : function (element, eClass) {
				var self 	= this;
				var element	= document.createElement (element);

				if (eClass) {
					self._setClass (element, eClass);
				}
				return element;
			},


			_buildButtons : function () {
				var self = this;
				self._empty (self.$modal.$modalbotbar);

				//
				// Configure botbar
				$.each (self.options.buttons, function (index, element) {
					if (element.state === true) {
						var $button 	 = self._createElement ('a', 'tpr-modal-button ' + element.class);
							$button.text = element.text;
							self._attachEvent ($button, 'click', function () {
								element.click.call (self);
							});

						self.$modal.$modalbotbar.appendChild ($button);
					}
				});
			},

			_buildModal   : function () {
				var self = this;

				//
				// Set parent class that determine
				// style of the entire modal
				self._setClass (self.$modal.$modalbox, self.options.styleclass);
				

				//
				// Configure topbar
				self.$modal.$modaltitle.text = self.title
				self.$modal.$modaltopbar.appendChild (self.$modal.$modaltitle);
				self.$modal.$modaltopbar.appendChild (self.$modal.$closebutton);
		

				//
				// Configure content
				self.$modal.$modalmessage.text = self.message
				self.$modal.$modalcontent.appendChild (self.$modal.$modalmessage);

				//
				// Has more info box?
				self.$modal.$modalmorelbtn.text = self.options.moreinfo.buttontext;
				self.$modal.$modalmoremsg.text  = self.options.moreinfo.message;
				self.$modal.$modalmorebox.appendChild (self.$modal.$modalmoremsg);

				self.$modal.$modalcontent.appendChild (self.$modal.$modalmorelbtn);
				self.$modal.$modalcontent.appendChild (self.$modal.$modalmorebox);

				if (self.options.moreinfo.state === true) {
					self.$modal.$modalmorelbtn.css({"display" : "inline-block"});
					self._attachEvent (self.$modal.$modalmorelbtn, 'click', function () {
						self.$modal.$modalmorebox.slideToggle();
					});
				}


				self.$modal.$modalbox.appendChild (self.$modal.$modaltopbar);
				self.$modal.$modalbox.appendChild (self.$modal.$modalcontent);
				self.$modal.$modalbox.appendChild (self.$modal.$modalbotbar);


				// Has background?
				if (self.options.backlayer) {
					self.$modal.$modalbox.style.display = 'inline-block';
					self.$modal.$modalbackground.appendChild (self.$modal.$modalbox);
					document.getElementsByTagName ('body')[0].appendChild (self.$modal.$modalbackground);
				
					//
					// When click on background close?
					if (self.options.closeoutclick) {
						self._attachEvent (self.$modal.$modalbackground, 'click', function () {
							self.hide ();
						});
					}
				} else {
					self.$modal.$modalbox.appendTo ($('body'));
				}

				//
				// Is cosable?
				if (!self.options.closable) {
					self.setClosable (false);
				}

				//
				// CENTER MODAL
				var windowWidth  = window.innerWidth; 
				var windowHeight = window.innerHeight;
				var modalWidth   = Math.floor ((self.$modal.$modalbox.offsetWidth / 100) * windowWidth);
				var modalHeight  = Math.floor ((self.$modal.$modalbox.offsetHeight / 100) * windowHeight) + 400;
				
				var xPosition    = (windowWidth / 2) - (modalWidth / 2);
				var yPosition    = (windowHeight / 2) - (modalHeight / 2);

				console.log (self.$modal.$modalbox.offsetWidth);
				//
				// SET x, y POSITIONS
				self._setStyle (self.$modal.$modalbox, {
					"left" : xPosition + 'px',
					"top"  : yPosition + 'px'
				});

				//
				// This event stop propagation from inner modalbox tags
				self._attachEvent (self.$modal.$modalbox, 'click', function () {
					return false;
				});
			},

			_attachEvent : function (element, event, callback) {
				var self = this;
				if (element && event && callback) {
					element.removeEventListener (event, callback, false);
					element.addEventListener (event, function (event) {
						event.stopPropagation();
						callback.call (self);
					});
				}
			},

			//
			// Configure modal text
			setTitle   		  : function (title) {
				var self = this;
				self.$modal.$modaltitle.text = title;
			},
			setMessage 		  : function (message) {
				var self = this;
				self.$modal.$modalmessage.text = message;
			},
			setMessageExplain : function (msg) {
				var self = this;
				self.$modal.$modalmorebox.text = msg;
			},
			setMoreinfoState  : function (state) {
				var self = this;
				if (state) {
					self.$modal.$modalmorelbtn.css({"display" : "inline-block"});
					self._attachEvent (self.$modal.$modalmorelbtn, 'click', function () {
						self.$modal.$modalmorebox.slideToggle();
					});

				} else {
					self.$modal.$modalmorelbtn.hide();
				}

			},
			setMoreinfoButtonText : function (text) {
				var self = this;
				if (text) {
					self.$modal.$modalmorelbtn.text = text;
				}
			},
			setStyle          : function (styleClass) {
				var self   = this;
				var cClass = self.$modal.$modalbox.attr ('class');
				self.$modal.$modalbox
					.addClass (styleClass)
					.removeClass (cClass);
			},

			setClosable : function (closable) {
				var self = this;
				if (closable === true) {
					self.$modal.$closebutton.show ();
					self._attachEvent (self.$modal.$modalbackground, 'click', function () {
						self.$modal.$modalbackground.hide ();
					});
				}else {
					self.$modal.$closebutton.hide ();
					self.$modal.$modalbackground.off ('click');
				}
			},

			//
			// Visibility control
			show : function () {
				var self = this;
				self.$modal.$modalbackground.style.display = 'inline-block';
			},
			hide : function () {
				var self = this;
				self.$modal.$modalbackground.style.display  = 'none';
				self.$modal.$modalmorebox.style.display 	= 'none';
			},

			setButtons : function (buttons) {
				var self = this;  
				 $.extend (true, self.options.buttons, buttons);
				 self._buildButtons ();
			},

			constructor : function () {
				var self = this;

				// First step, build DOM element
				self._buildModal ();
				self._buildButtons ();
				self._attachEvent (self.$modal.$closebutton, 'click', function () {
					self.hide ();
				});
			}
		};


	})(window, jQuery);