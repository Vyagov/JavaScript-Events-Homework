
document.addEventListener("DOMContentLoaded", function () {
	'use strict';
	
	var keyLeft = 37,
	keyRight = 39,
	keySpace = 32,
	plMoveLeft = false,
	plMoveRight = false,
	tgMove = false,
	isGame = true,
	isLastBullet = false,
	countBullets = document.getElementById("bullets").innerHTML - 1,
	tgSpeed = 5,
	plSpeed = tgSpeed - 1,
	target = {
		width: document.getElementById("target").clientWidth,
		height: document.getElementById("target").clientHeight,
		tgMinMove: 0,
		tgMaxMove: document.getElementById("target-zone").clientWidth
	},
	player = {
		width: document.getElementById("player").clientWidth,
		height: document.getElementById("player").clientHeight,
		plMinMove: 0,
		plMaxMove: document.getElementById("player-zone").clientWidth
	};
	
	function targetMove() {
		if(target.tgMinMove >= target.tgMaxMove - target.width){
			tgMove = false;
		}
		   
		if(target.tgMinMove == 0){
			tgMove = true;
		}
		    
		tgMove ? target.tgMinMove += tgSpeed : target.tgMinMove -= tgSpeed;
		
		document.querySelector("#target").style.left = target.tgMinMove + "px";
	}
	
	function playerMove() {
		
		if (plMoveLeft && player.plMinMove > 0) {
			player.plMinMove -= plSpeed;
		}		
		if (plMoveRight && player.plMinMove < (player.plMaxMove - player.width)) {
			player.plMinMove += plSpeed;
		}
		
		document.querySelector("#player").style.left = player.plMinMove + "px";
	}

	function shooting(){
		if(countBullets >= 0 && isGame){
			document.getElementById("bullets").innerHTML = countBullets--;

			var bullet = document.createElement("div");
	
			bullet.className = "bullet";
			bullet.style.bottom = 80 + "px";
			bullet.style.left = (player.plMinMove + 43) + "px";

			document.getElementById("game-field").appendChild(bullet);
		}
	}
	
	function bulletMove(){
		var bullets = document.getElementsByClassName("bullet"),
		shot, i, hits, targetLeft, bulletLeft;
		
		for(i = 0; i < bullets.length; i++){
			shot = parseInt(bullets[i].style.bottom);
			bullets[i].style.bottom = shot + 8 + "px";
			
			if(shot > 485 && shot <= 580) {
				targetLeft = parseInt(document.getElementById("target").style.left);
				bulletLeft = parseInt(bullets[i].style.left);
				
				if(bulletLeft > targetLeft && bulletLeft < (targetLeft + target.width) && bulletLeft < (targetLeft + target.height)){
					hits = document.getElementById("score").innerHTML;
					hits++;
					document.getElementById("score").innerHTML = hits;
					bullets[i].parentNode.removeChild(bullets[i]);
					
					if (countBullets < 0 && (i == bullets.length - 1 || (i == 0 && bullets.length == 1))) {
						isLastBullet = true;
					}
				}
			}
			
			if (shot > 580) {
				bullets[i].parentNode.removeChild(bullets[i]);
				
				if (countBullets < 0 && (i == bullets.length - 1 || (i == 0 && bullets.length == 1))) {
					isLastBullet = true;
				}
			}
		}
	}
	
	document.addEventListener("keydown", function(e) {
		if (e.keyCode == keySpace) {
			shooting();
		}
	});
	   
	document.addEventListener("keydown", function(e) {
		if (e.keyCode == keyLeft) {
			plMoveLeft = true;
		}
		if (e.keyCode == keyRight) {
			plMoveRight = true;
		}
	});
	
	document.addEventListener("keyup", function(e) {
		if (e.keyCode == keyLeft) {
		        plMoveLeft = false;
		}
		if (e.keyCode == keyRight) {
		        plMoveRight = false;
		}
	});
	
	function gameOver() {
		var score = document.getElementById("score"),
		infoControls = document.getElementById("info-controls"),
		result = document.getElementById("result"),
		infoScore = document.getElementById("info-score"),
		infoRez = document.getElementById("infoRez"),
		bullets = document.getElementById("bullets"),
		image = document.getElementById("target");
		
		if (isLastBullet && score.innerHTML == 70) {
			isLastBullet = false;
		}
		
		function win() {
			if (score.innerHTML >= 70 && !isLastBullet) {
				isGame = false;
				image.style.background = "url(images/die-pig.png)";
				infoScore.style.color = "#00ff22";
				infoControls.style.visibility = "hidden";
				result.style.visibility = "visible";
				infoRez.innerHTML = "You WIN!";
				infoRez.style.color = "#00ff22";
			}
		}
		
		if (bullets.innerHTML == 0 && isLastBullet) {
			isGame = false;
			image.style.background = "url(images/happy-pig.png)";
			infoScore.style.color = "#ff2200";
			infoControls.style.visibility = "hidden";
			result.style.visibility = "visible";
			infoRez.innerHTML = "You LOSE!";
			infoRez.style.color = "#ff2200";
		}
	}
	
	function onFrame() {
		
		if (isGame) {
			targetMove();
			playerMove();
		}
		bulletMove();
		gameOver();
		requestAnimationFrame(onFrame);
	}
	
	requestAnimationFrame(onFrame);
});