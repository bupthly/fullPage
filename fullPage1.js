/**
 * fullpage
 */

(function() {
	//var $ = function(id)
	var container = document.getElementsByClassName('page-wrapper')[0];

	var startPoint = {};
	var movePoint = {};
	var endPoint = {};
	var dir = true;   //滑动方向，为true表示向上滑动，false表示向下

	var height = window.innerHeight;
	var threshold = 0.15;

	var touchStart = function(e) {
		var page = e.target || e.srcElement;
		startPoint.x = e.touches[0].clientX;
		startPoint.y = e.touches[0].clientY;
		//alert(startPoint.y);
	}

	var touchMove = function(e) {
		e.preventDefault();
		var page = e.target || e.srcElement;
		movePoint.x = e.touches[0].clientX;
		movePoint.y = e.touches[0].clientY;
		var delta = movePoint.y - startPoint.y;
		if(delta > 0) {  //向下滑动，上一页进入
			dragDown(page, delta);
			dir = false;
		}
		else { //向上滑动，下一页进入
			dragUp(page, -delta);
			dir = true;
		}
	}

	var touchEnd = function(e) {
		var page = e.target || e.srcElement;
		endPoint.x = e.changedTouches[0].clientX;
		endPoint.y = e.changedTouches[0].clientY;
		var delta = Math.abs((endPoint.y - startPoint.y))/height;
		if(delta > threshold) { //超过阈值，可以进入下一屏
			if(dir) {
				nextSlide(page);
			}
			else {
				prevSlide(page);
			}
		}
		else {
			//未超过阈值，回到拖动前状态
			if(dir) {
				page.nextSibling.style.webkitTransform = "translate3d(0, 100%, 0)";
			}
			else {
				page.style.webkitTransform = "translate3d(0, 0, 0)";
			}
		}
	}

	var nextSlide = function(page) {
		var nextPage = page.nextSibling;
		if(nextPage.nodeType === 1) {
			nextPage.style.webkitTransform = "translate3d(0, 0, 0)";
		}
	}

	var prevSlide = function(page) {
		var prevPage = page.previousSibling;
		if(prevPage.nodeType === 1) {
			page.style.webkitTransform = "translate3d(0, 100%, 0)";
		}
	}

	var dragUp = function(page, delta) {
		var percent = (height - delta)/height * 100;
		var nextPage = page.nextSibling;
		if(nextPage.nodeType === 1) {
			nextPage.style.webkitTransform = "translate3d(0, " + percent + "%, 0)";
		}
	}

	var dragDown = function(page, delta) {
		var percent = delta/height * 100;
		var prevPage = page.previousSibling;
		if (prevPage.nodeType === 1) {
			page.style.webkitTransform = "translate3d(0, " + percent + "%, 0)";
		}
	}

	function initEvent() {
		container.addEventListener('touchstart', touchStart);
		container.addEventListener('touchmove', touchMove);
		container.addEventListener('touchend', touchEnd);
	}

	window.initEvent = initEvent;
}())
