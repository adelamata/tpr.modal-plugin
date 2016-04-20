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
		# Structural styles
		# Visualization styles