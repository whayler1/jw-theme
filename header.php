<!doctype html>
<html <?php language_attributes(); ?>>

	<head>
		<meta charset="utf-8">

		<?php // Google Chrome Frame for IE ?>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>

		<?php // mobile meta (hooray!) ?>
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
		<meta name="description" content="<?php bloginfo('description'); ?>">

		<?php // icons & favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) ?>
		<link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/library/images/apple-icon-touch.png">
		<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
		<!--[if IE]>
			<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
		<![endif]-->
		<?php // or, set /favicon.ico for IE10 win ?>
		<meta name="msapplication-TileColor" content="#fff">
		<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/library/images/win8-tile-icon.png">

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

		<?php // wordpress head functions ?>
		<?php wp_head(); ?>
		<?php // end of wordpress head ?>

		<?php // drop Google Analytics Here ?>
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		
		  ga('create', 'UA-7399043-1', 'jstn.name');
		  ga('send', 'pageview');
		
		</script>
		<?php // end analytics ?>

	</head>

	<body <?php body_class(); ?>>

		<div id="container" class="container">

			<header class="header" role="banner">

				<h1 class="jstn-lockup"><a href="<?php echo home_url(); ?>" rel="nofollow"><acronym title="Justin Dean Worsdale">JSTN</acronym></a></h1>
				
				<ul class="social-list">
					<li><a class="linked-in" href="http://www.linkedin.com/pub/justin-worsdale/39/317/960" target="_blank" title="view justin's linked in">linked in</a></li><li><a class="git-hub" href="https://github.com/whayler1" target="_blank" title="view justin's git hub">git hub</a></li><li><a class="email" href="mailto:jstn@jstn.name" target="_blank" title="email justin">email</a></li>
				</ul>
								
				<?php $categories = get_categories(); ?>
				
				<nav class="site-nav">
					<ul class="page-list">
						<li>
							<a href="/about/">About</a>
						</li>
						<li class="drop-down">
							<a href="javascript:void(0)">Categories</a>
							<ul class="cat-list">
							<?php foreach($categories as $category): ?><li><a href="<?php echo "/category/" .$category->slug; ?>"><?php echo $category->name; ?></a></li><?php endforeach; ?>
							</ul>
						</li>
					</ul>
				</nav>
				
			</header>
