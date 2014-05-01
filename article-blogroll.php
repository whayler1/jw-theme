							<article id="post-<?php the_ID(); ?>" <?php post_class( 'clearfix' ); ?> role="article">
								
								<?php $postImage = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' ); ?>
								
								<a class="post-image" href="<?php the_permalink(); ?>"><img src="<?php echo($postImage[0] ); ?>"></a>
								
								<div class="copy-block">
									<div>
										<header class="article-header">
		
											<h1 class="h2" itemprop="headline"><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a><span class="categories"><?php printf( __( ' &mdash; %1$s') , get_the_category_list(' , ')); ?></span></h1>
											
										</header>
		
										<section class="entry-content clearfix">
											<?php the_content($more_text); ?>
										</section>
									</div>
	
									<footer class="article-footer">
										<div><?php printf( __( '<time class="updated" datetime="%1$s" pubdate>%2$s</time>'), get_the_time('Y-m-j'), get_the_time(get_option('date_format'))); ?>. Tagged: <?php the_tags( '<span class="tags-title">' . __( '', 'bonestheme' ) . '</span> ', ', ', '' ); ?></div>
									</footer>
	
									<?php // comments_template(); // uncomment if you want to use them ?>
								</div>
							</article>