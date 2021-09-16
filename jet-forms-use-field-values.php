<?php
/**
 * Plugin Name: JetFormBuilder - use field values
 * Plugin URI:
 * Description: Allows to use JetFormBuilder fields values as macros anywhere in the form content
 * Version:     1.0.0
 * Author:      Crocoblock
 * Author URI:  https://crocoblock.com/
 * License:     GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

add_action( 'wp_enqueue_scripts', 'jfufv_enqueue_scripts' );

function jfufv_enqueue_scripts() {
	wp_enqueue_script( 'jfufv-use-field-values', plugins_url( '/', __FILE__ ) . 'assets/js/use-field-values.js', array( 'jquery' ), '1.0.0', true );

	wp_localize_script( 'jfufv-use-field-values', 'jfufvSearcAttrs', apply_filters( 'jfufv_search_in_attrs', array(
		'href',
		'class',
		'src',
		'alt',
		'title',
	) ) );

}
