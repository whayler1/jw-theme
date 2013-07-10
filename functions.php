<?php
/**
 * jw functions and definitions
 *
 * @package jw
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) )
	$content_width = 640; /* pixels */

/*
 * Load Jetpack compatibility file.
 */
require( get_template_directory() . '/inc/jetpack.php' );

if ( ! function_exists( 'jw_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 */
function jw_setup() {

	/**
	 * Custom template tags for this theme.
	 */
	require( get_template_directory() . '/inc/template-tags.php' );

	/**
	 * Custom functions that act independently of the theme templates
	 */
	require( get_template_directory() . '/inc/extras.php' );

	/**
	 * Customizer additions
	 */
	require( get_template_directory() . '/inc/customizer.php' );

	/**
	 * Make theme available for translation
	 * Translations can be filed in the /languages/ directory
	 * If you're building a theme based on jw, use a find and replace
	 * to change 'jw' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'jw', get_template_directory() . '/languages' );

	/**
	 * Add default posts and comments RSS feed links to head
	 */
	add_theme_support( 'automatic-feed-links' );

	/**
	 * Enable support for Post Thumbnails on posts and pages
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	/**
	 * This theme uses wp_nav_menu() in one location.
	 */
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'jw' ),
	) );

	/**
	 * Enable support for Post Formats
	 */
	add_theme_support( 'post-formats', array( 'aside', 'image', 'video', 'quote', 'link' ) );
}
endif; // jw_setup
add_action( 'after_setup_theme', 'jw_setup' );

/**
 * Setup the WordPress core custom background feature.
 *
 * Use add_theme_support to register support for WordPress 3.4+
 * as well as provide backward compatibility for WordPress 3.3
 * using feature detection of wp_get_theme() which was introduced
 * in WordPress 3.4.
 *
 * @todo Remove the 3.3 support when WordPress 3.6 is released.
 *
 * Hooks into the after_setup_theme action.
 */
function jw_register_custom_background() {
	$args = array(
		'default-color' => 'ffffff',
		'default-image' => '',
	);

	$args = apply_filters( 'jw_custom_background_args', $args );

	if ( function_exists( 'wp_get_theme' ) ) {
		add_theme_support( 'custom-background', $args );
	} else {
		define( 'BACKGROUND_COLOR', $args['default-color'] );
		if ( ! empty( $args['default-image'] ) )
			define( 'BACKGROUND_IMAGE', $args['default-image'] );
		add_custom_background();
	}
}
add_action( 'after_setup_theme', 'jw_register_custom_background' );

/**
 * Register widgetized area and update sidebar with default widgets
 */
function jw_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'jw' ),
		'id'            => 'sidebar-1',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', 'jw_widgets_init' );

/**
 * Enqueue scripts and styles
 */
function jw_scripts() {
	wp_enqueue_style( 'jw-style', get_stylesheet_uri() );
	
	/**
	 * libs
	 */
	
	wp_enqueue_script( '$', '//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js', array(), '', true );
	
	/**
	 * app core
	 */
	
	wp_enqueue_script( 'app-core', get_template_directory_uri() . '/js/app/app-core.js', array(), '1', true );
	
	/**
	 * app modules
	 */
	
	wp_enqueue_script( 'wpImageGallery', get_template_directory_uri() . '/js/module/mImageGallery.js', array(), '1', true );
	
	
	/**
	 * startAll
	 */
	
	wp_enqueue_script( 'startAll', get_template_directory_uri() . '/js/app/startAll.js', array(), '1', true );
	
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_singular() && wp_attachment_is_image() ) {
		wp_enqueue_script( 'jw-keyboard-image-navigation', get_template_directory_uri() . '/js/keyboard-image-navigation.js', array( 'jquery' ), '20120202' );
	}
}
add_action( 'wp_enqueue_scripts', 'jw_scripts' );

/**
 * Implement the Custom Header feature
 */
//require( get_template_directory() . '/inc/custom-header.php' );


/*
Plugin Name: WKS Images Shortcode
Plugin URI: http://www.webkitstudio.com/wordpress-plugins/wks-images-shortcode
Description: The built-in gallery shortcode outputs a lot of extra code, which can be difficult to customize. The built-in gallery shortcode also adds css to your page. This alternative shortcode will output the images as a simple list, and is more semantic. The list can be styled through your theme's style.css file. There are several attributes, see the plugin's website for details.
Version: 1.0.0
Author: WebKit Studio
Author URI: http://www.webkitstudio.com/wordpress-plugins/
*/

add_shortcode('images','image_listings');

function image_listings($atts, $content = null)
{
	extract(shortcode_atts(array(
		'small_image' => 'thumbnail',
		'large_image' => 'large',
		'captions' => '',
		'link' => '',
		'link_title' => '',
		'lightbox_group' => '',
		'class' => '',
		'parent_wrap' => 'div',
		'child_wrap' => '',
		'id' => ''
		), $atts));

	global $post;
	$images = get_posts( 'post_type=attachment&post_mime_type=image&numberposts=-1&post_parent='.$post->ID.'&orderby=menu_order&order=ASC' );
	if ( empty($images) ) {
		echo '<p>No images found</p>';
	} else {
		$id = ( $id != '' ) ? ' id="'.$id.'"' : '';
		$class = ( $class != '' ) ? ' class="'.$class.'"' : '';
		$html = ($parent_wrap!='')?"<{$parent_wrap}{$id}{$class}>":'';
		$lightbox = ($lightbox_group=='')?'':' rel="lightbox['.$lightbox_group.']"';
		foreach ( $images as $image ) {
			//$image_title = ($link_title=='true')?' title="'.ucwords(str_replace('-',' ',$image->post_title)).'"':'';
			$alt = ($link_title=='true')?' alt="'.ucwords(str_replace('-',' ',$image->post_title)).'"':'';
			$image_alt = ($alt!='')?' alt="'.$alt.'"':'';
			$lrg_image = wp_get_attachment_image_src($image->ID,$large_image);
			$thumb_image = wp_get_attachment_image_src( $image->ID, $small_image );
			$html .= ($child_wrap!='')?"<{$child_wrap}>":'';
			$html .= ($link=='true')?"<a href=\"{$lrg_image[0]}\"{$lightbox} id=\"img-".$image->ID."\">":'';
			$html .= '<img src="'.$thumb_image[0].'" width="'.$thumb_image[1].'" height="'.$thumb_image[2].'"'.$alt.' />';
			$html .= ($link=='true')?"</a>":"";
			$html .= ($captions=='true')?"<span>".ucwords(str_replace('-',' ',$image->post_title))."</span>":'';
			$html .= ($child_wrap!='')?"</{$child_wrap}>":'';
			$lrg_image = '';
		}
		$html .= ($parent_wrap!='')?"</{$parent_wrap}>":'';
		return $html;
	}
}
