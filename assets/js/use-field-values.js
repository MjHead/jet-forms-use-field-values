(function( $ ) {

	'use strict';

	$( document ).on( 'change.JetFormBuilderMain', 'form.jet-form-builder .jet-form-builder__field', function() {

		var $field = $( this );

		console.log( $field.attr( 'name' ) );

	} );

})( jQuery );
