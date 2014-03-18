<?php get_header(); ?>

			<div class="content">

				<div class="inner-content">

						<div class="main" class="first clearfix" role="main">

							<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

							<article id="post-<?php the_ID(); ?>" <?php post_class( 'clearfix' ); ?> role="article">
								
								<?php $postImage = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' ); ?>
								
								<a class="post-image" href="<?php the_permalink(); ?>"><img src="<?php echo($postImage[0] ); ?>"></a>
								
								<div class="copy-block">
									<div>
										<header class="article-header">
		
											<h1 class="h2"><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a><span class="time"><?php printf( __( ' &mdash; <time class="updated" datetime="%1$s" pubdate>%2$s</time>'), get_the_time('Y-m-j'), get_the_time(get_option('date_format'))); ?></span></h1>
											
										</header>
		
										<section class="entry-content clearfix">
											<?php the_content($more_text); ?>
										</section>
									</div>
	
									<footer class="article-footer">
										<p><?php the_tags( '<span class="tags-title">' . __( '', 'bonestheme' ) . '</span> ', ', ', '' ); ?> | <span class="categories"><?php printf( __( '%1$s') , get_the_category_list(', ')); ?></span></p>
	
									</footer>
	
									<?php // comments_template(); // uncomment if you want to use them ?>
								</div>
							</article>

							<?php endwhile; ?>

									<?php if ( function_exists( 'bones_page_navi' ) ) { ?>
											<?php bones_page_navi(); ?>
									<?php } else { ?>
											<nav class="wp-prev-next">
													<ul class="clearfix">
														<li class="prev-link"><?php next_posts_link( __( '&laquo; Older Entries', 'bonestheme' )) ?></li>
														<li class="next-link"><?php previous_posts_link( __( 'Newer Entries &raquo;', 'bonestheme' )) ?></li>
													</ul>
											</nav>
									<?php } ?>

							<?php else : ?>

									<article id="post-not-found" class="hentry clearfix">
											<header class="article-header">
												<h1><?php _e( 'Oops, Post Not Found!', 'bonestheme' ); ?></h1>
										</header>
											<section class="entry-content">
												<p><?php _e( 'Uh Oh. Something is missing. Try double checking things.', 'bonestheme' ); ?></p>
										</section>
										<footer class="article-footer">
												<p><?php _e( 'This is the error message in the index.php template.', 'bonestheme' ); ?></p>
										</footer>
									</article>

							<?php endif; ?>

						</div>

				</div>

			</div>

<?php get_footer(); ?>
