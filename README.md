# tpr.modal-plugin
	A modal plugin for your web @ Antonio de la Mata López @ 2016

# Description
	tpr.modal-plugin is a plugin that uses jQuery and born in 
	order to give the programmer a completely customizable modal 
	in every sense. This component allows a large number of configurations 
	that can be set in instantiation time or post-instantiation.
	The main idea by the tpr.modal-plugin was designed is give to the 
	programmer a componente that have a good API for mutate the modal 
	behaviour in any time and when is necessary. Is by that that tpr.modal-plugin 
	is very flexible and usable in any frame or context.

# Requisites
	For use tpr.modal-plugin only is necessary importing jquery library in our project.


# The Plugin
	# Javascript
	The plugin is designed to work only with logic and not quite touch anything of
	styles, the plugin code does not modify or create any CSS property to any of the 
	HTML blocks the modal uses. This implies that is delegated to CSS full responsibility 
	for the display of modal.

	That is, we are totally separating the modal logic of their way to be. This does not 
	meet the vast majority of plugins of any kind and we think that is a good starting 
	point for designing our plugin.

	In any case only a number of CSS properties that are required to add much needed 
	modal behavior are used, but does not work with any "structural" or "visual" style.


	# CSS
	The style modal display is determined by the CSS, as is obvious. However in the 
	component we prefer to distinguish between structural and visual styles. Structural 
	styles are styles that modify the dimensional shape of the modal, ie sizes, paddings, 
	margins, etc. However visual styles change more visual properties such as color, font 
	sizes, etc.

	Why do we do this ?, because separating the styles in this way we can create a generic 
	styles for the shape of modal so not to repeat any of (structural) code and on the other 
	hand you can create color templates that modify the modal simply by changing the CSS class 
	and pass the (visual) plugin.

		# Structural styles
		As we discussed the CSS properties that are some structural consider as position, margin, 
		padding, etc. Here is an example:
		[class^=tpr-modalbox-] {
			position: relative;
			width: 30%;
		}

		Actually these properties affect only the root class of all modal, ie the class 
		tp-modalbox-"anything".

		# Visualization styles
		A display style would therefore be as follows:
		tpr-modalbox-grey {
			border: 1px solid lightgrey;
			background: white;
			border-radius: 2px;
		}

	# Create a new theme for our modal
	With this separation we can easily create new color schemes for our modal. How ?, easy, all
	you have to do is in our CSS file to create a class that is called something like tpr-modalbox-"ournewcolor". 
	Example tpr-modalbox-yellow.

	And then go create visual styles that change colors, font size, etc.

	/* My yellow theme (Default)*/
	.tpr-modalbox-yellow {
		border: 1px solid yellow;
		background: white;
		border-radius: 2px;
	}

	.tpr-modalbox-yellow .tpr-modal-topbar {
		background: yellow;
	}

	.tpr-modalbox-yellow .tpr-modal-morebox {
		background: grey;
		color: lightgrey;
	}
	/* My yellow theme (Default)*/

	And then you only need to pass it to the constructor of modal when it is 
	instantiated in the parameter "styleclass". Example:

	var modal = new TPRMODAL({
		styleclass : "tpr-modalbox-yellow",
		title      : "Warning",
		message    : "Warning!"
	});

# Properties (in construction)
	# closable
		Type Boolean
		Description This property indicate whether the modal can be closed with the upper-righ cross.

	# styleclass
		Type String
		Description This property indicate which is the class of our css that will be applied.
		This is the class that the modal will use to apply cascading styles. If you look at 
		the file tpr.modal-plugin.css in the css folder, you will notice that the fundamental 
		styles are applied on css root selectors "tpr-modalbox-", 
		which we call structural styles, since they are styles that only modify the position,
		Margins, etc. If we continue below, we can see that there is a class called "tpr-modalbox-gray",
		it is this class that provides the visual styles: colors, fonts,
		etc. There may be as many "tpr-modalbox-anything" as you would like to modify the
		visual styles. For example, we might have a "tpr-modalbox-network" to create error manners or
		incorrect data. For this we would have to create in our styles the class previously exposed
		and then begin to modify the styles of the inheritance. For example: .tpr-modalbox-red.tpr-modal-topbar {background: red: color: white;} would paint the top bar of the modal red and white text.

	# backlayer 
		Type Boolean
		Description Determine whether the modal has a div behind or is being inserted directly in the body element.
		
	# closeoutclick 
		Type Boolean
		Description Determines whether the modal closes when a click is detected outside of it.
	# moreinfo
		When we want or need show more info but we dont want that the modal grow excessively is a good idea insert 
		all text inside of More info box. This box is hidden by default but the user can see a button whit the text
		"More info" (by default, is editable) and when the user click on it then the box state pass to show and the 
		user can see all text now.
		# state 
			Type Boolean
			Description 
		# message 
			Type String
			Description Hidden text
		# buttontext 
			Type String
			Description More info button text
			Default More info
	# buttons
	Determines buttons inside of modal. You can add custom buttons.
		# accept
			Type Object|false
			Description Default accept button
			Default Object
			# text
			# class
		# cancel
			Type Object|false
			Description Default cancel button
			Default Object
			# text
			# class
		# close
			Type Object|false
			Description Default close button
			Default Object
			# text
			# class
	# title
		Type String
		Description The top title of the modal
		Default Default title
	# message
		Type String
		Description The message shown on the modal
		Default Default message
	# messageExplain
		Type String
		Description The More info box text
		Default  Default message


# API
	# setTitle(title) 
	Set modal title

	# setMessage(message)
	Set modal message

	# setMessageExplain(explain)
	Set modal explain message

	# setMoreinfoState(state)
	Show or hide 'More info' button

	# setMoreinfoButtonText(text)
	Set 'More info' button text

	# setStyle(styleClass)
	Set modal style

	# setClosable(closable)
	Sets whether the modal is curable. button cross at the top right of the modal 
	and the event closing the modal click when it is removed out of hiding.

	# show()
	Show modal

	# hide()
	Hide modal

	# setButtons(buttons)
	Set buttons


# UPDATES
	# Events oriented
	The plugin now works with events instead of callbacks. That is, for each button that appears 
	on the modal you can add a listener for an event with the same name of the button

	Example:
	buttons {
		accept : {
			....
		},
		otherbutton : {
			....
		}
	}

	Then

	modal.on ('accept', function () {
	});
	modal.on ('otherbutton', function () {
	});



	# Create method _insertChilds
	Before _insertChild existed to add a child element on another parent element, 
	the modal used the appen method of jquery. This call to that method has been 
	simplified by crushing the _insertChilds method which does the same but removing 
	the ugly append. This method receives two parameters, the parent and either a 
	child element, or an array of child elements.

