<?php get_header(); ?>

			<div id="content" class="content">

				<div id="main" class="main" role="main">

					<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

						<article id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">
							
							<header class="article-header">

								<h1 class="h2" itemprop="headline"><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a><span class="categories"><?php printf( __( ' &mdash; %1$s') , get_the_category_list(' , ')); ?></span></h1>
								
							</header>
							
							<?php if(get_post_format() === false): ?>
							<?php $postImage = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' ); ?>
							
							<img class="post-image" src="<?php echo($postImage[0]); ?>">
							
							<?php endif; ?>
							
							<section class="entry-content clearfix">
								<?php the_content(); ?>
							</section>

							<footer class="article-footer">
								<p><?php printf( __( '<time class="updated" datetime="%1$s" pubdate>%2$s</time>'), get_the_time('Y-m-j'), get_the_time(get_option('date_format'))); ?>. Tagged: <?php the_tags( '<span class="tags-title">' . __( '', 'bonestheme' ) . '</span> ', ', ', '' ); ?></p>

							</footer>
							

						</article>

					<?php endwhile; ?>

					<?php else : ?>

						<article id="post-not-found" class="hentry clearfix">
								<header class="article-header">
									<h1><?php _e( 'Oops, Post Not Found!', 'bonestheme' ); ?></h1>
								</header>
								<section class="entry-content">
									<p><?php _e( 'Uh Oh. Something is missing. Try double checking things.', 'bonestheme' ); ?></p>
								</section>
								<footer class="article-footer">
										<p><?php _e( 'This is the error message in the single.php template.', 'bonestheme' ); ?></p>
								</footer>
						</article>

					<?php endif; ?>

				</div>

			</div>

<?php get_footer(); ?>
