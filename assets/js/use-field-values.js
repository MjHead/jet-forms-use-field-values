(function( $ ) {

	'use strict';

	const replaceStack = [];

	const getFieldMask = function( name ) {
		return '%FIELD::' + name + '%';
	}

	const isRadio = function( $field ) {

		if ( 'INPUT' !== $field.prop( 'tagName' ) ) {
			return false;
		}

		if ( ! [ 'checkbox', 'radio' ].includes( $field.attr( 'type' ) ) ) {
			return false;
		}

		return true;

	}

	const fillStack = function( node ) {

		var $field = $( node );
		var fieldName = $field.attr( 'name' );
		var $form  = $field.closest( 'form.jet-form-builder' );

		// Replace attrs
		var querySelector = [];
		var $matchedNodes = null;

		for ( var i = 0; i < window.jfufvSearcAttrs.length; i++ ) {
			querySelector.push( '[' + window.jfufvSearcAttrs[ i ] + '*="' + getFieldMask( fieldName ) + '"]' );
		}

		$matchedNodes = $form.find( querySelector.join( ', ' ) );

		if ( $matchedNodes.length ) {

			$matchedNodes.each( function( index, el ) {

				var $node = $( el );

				$.each( el.attributes, function() {
					if ( this.value.includes( getFieldMask( fieldName ) ) ) {

						replaceStack.push( {
							fieldName: fieldName,
							isAttr: true,
							attr: this.name,
							initialValue: this.value,
							isRadio: isRadio( $field ),
							el: el,
							form: $form[0],
						} );

						this.value = this.value.replace( getFieldMask( fieldName ), $field.val() );
					}
				});

			} );
		}

		// Replace content
		$matchedNodes = $form.find( '*:contains(' + getFieldMask( fieldName ) + ')' );

		if ( $matchedNodes.length ) {

			$matchedNodes.each( function( index, el ) {
				if ( ! el.children.length && el.innerText.includes( getFieldMask( fieldName ) ) ) {
					replaceStack.push( {
						fieldName: fieldName,
						isContent: true,
						initialValue: el.innerText,
						isRadio: isRadio( $field ),
						el: el,
						form: $form[0],
					} );
					el.innerText = el.innerText.replace( getFieldMask( fieldName ), $field.val() );
				}
			} );
		}
	}

	const replaceFieldValues = function( node ) {

		var $field = $( node );
		var fieldName = $field.attr( 'name' );
		var $form  = $field.closest( 'form.jet-form-builder' );

		for ( var i = 0; i < replaceStack.length; i++ ) {

			if ( fieldName !== replaceStack[ i ].fieldName || $form[0] !== replaceStack[ i ].form ) {
				continue;
			}

			console.log( fieldName );

			var value = replaceStack[ i ].initialValue;

			value = value.replace( getFieldMask( fieldName ), $field.val() )

			if ( replaceStack[ i ].isAttr ) {
				$( replaceStack[ i ].el ).attr( replaceStack[ i ].attr, value );
			} else {
				replaceStack[ i ].el.innerText = value;
			}

		}

	};

	$( document ).on( 'change.JetFormBuilderMain', 'form.jet-form-builder .jet-form-builder__field', function() {
		replaceFieldValues( this );
	} );

	$( 'form.jet-form-builder .jet-form-builder__field' ).each( function() {

		var $this = $( this );

		fillStack( this );

		if ( isRadio( $this ) && $this.attr( 'checked' ) ) {
			replaceFieldValues( this );
		} else if ( ! isRadio( $this ) ) {
			replaceFieldValues( this );
		}

	} );

})( jQuery );
