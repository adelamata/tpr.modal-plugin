# tpr.modal-plugin
	A modal plugin for jQuery @ Antonio de la Mata López @ 2016

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
	instantiated in the parameter "styleClass". Example:

	var modal = new TPRMODAL({
		styleclass : "tpr-modalbox-yellow",
		title      : "Warning",
		message    : "Warning!"
	});
