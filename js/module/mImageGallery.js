/**
 * Handles functionality of image gallery on single blog posts
 *
 * @author Justin Worsdale
 */
 
JW.App.addModule(".entry-gallery", function(JW) {
	
	var SELECTOR_IMGS = ".entry-gallery .hero-container img",
		CLASS_LOADED = "loaded",
		CLASS_SELECTED = "selected",
		CLASS_WAS_SELECTED = "was-selected",
		heroContainer = $(".entry-gallery .hero-container")[0],
		$imgs = $(SELECTOR_IMGS),
		imgsLength,
		currentImgNodeNum,
		currentTopImage,
		prevTopImage,
		
		onImgLoad = function(e) {
			
			this.className += " " + CLASS_LOADED;
		};
	
	return {
	
		init: function() {
			
				var img,
					i = 0;
				
				for( ; i < 2; i++ ) {
					
					img = document.createElement("img");
					heroContainer.insertAdjacentHTML("afterbegin", img.outerHTML);
				}
				
				$imgs = $(SELECTOR_IMGS);
				imgsLength = $imgs.length;
				currentImgNodeNum = imgsLength - 1;
				currentTopImage = $imgs[currentImgNodeNum];
				
				$imgs.load(onImgLoad)
				
				currentTopImage.className = CLASS_LOADED;
		},
		
		events: {
			click: "ul li > a"
		},
		
		onclick: function(event, target) {
			
			var targetHref = target.href,
				currentImgNode = $imgs[currentImgNodeNum],
				nextImgNodeNum = 0,
				i = 0,
				img;
			
			if(event.preventDefault) {
				event.preventDefault();
			}
				
			if(targetHref !== $imgs[currentImgNodeNum].src) {
				
				if(!$(currentImgNode).hasClass(CLASS_LOADED)) {
					
					currentImgNode.src = targetHref;
				}else {
					
					if(currentImgNodeNum + 1 < imgsLength) {
						nextImgNodeNum = currentImgNodeNum + 1;
					}
					
					for( ; i < imgsLength; i++ ) {
						
						img = $imgs[i];
						
						switch(i) {
							case currentImgNodeNum:
								
								img.className = CLASS_WAS_SELECTED + " " + CLASS_LOADED;
								break;
							case nextImgNodeNum:
								
								img.src = "";
								img.className = CLASS_SELECTED;
								img.src = targetHref;
								break;
							default:
								
								img.className = "";
						}
					}
					
					currentImgNodeNum = nextImgNodeNum;	
				}
			}
			
			return false;
		}
		
	}
});