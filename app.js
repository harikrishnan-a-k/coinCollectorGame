// disabling double click zoom in mobile devices
document.body.addEventListener('dblclick',function(e){
	e.preventDefault();
})


function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

swal("Coin collector","collect 6 coins before time runs out, good luck","info");

let time=2*60;
function startTimer(){
		const id=window.setInterval(function(){

			if(time<0){
				clearInterval(id);
				swal("Coin collector",'time is up, you loose!!!',"warning",{button:'play again'});
				window.setTimeout(function(){window.location.reload();},3000);
				return;
			}
			let minutes=Math.floor(time/(60));
			let seconds=time%60;
			if (minutes < 10) minutes = "0" + minutes;
			if (seconds < 10) seconds = "0" + seconds; 
			document.querySelector('#minutes').innerText=minutes;
			document.querySelector('#seconds').innerText=seconds;
			time--;
		},1000)
}
const player=document.querySelector('#player');
const coin=document.querySelector('#coin');

console.log(isTouching(player,coin));
const positions={
	playerX:10,
	playerY:20,
	coinX:50,
	coinY:60,
	flipDirecrion:false,
	score:0,
	movePlayerCount:0,
	movePlayer(key){
		
		this.movePlayerCount++;
		if(this.movePlayerCount===2){
			startTimer();
		}
		const change=20; 
		
		switch (key) {
			case 'ArrowUp':
				this.playerY-=change;
				break;
			case 'ArrowDown':
				this.playerY+=change;
				break;
			case 'ArrowLeft':
				this.playerX-=change;
				this.flipDirecrion=true;
				break;
			case 'ArrowRight':
				this.playerX+=change;
				this.flipDirecrion=false;
				break;
		
			
		}
		
		player.style.transform=`translate(${this.playerX}px,${this.playerY}px)`;
		if(this.flipDirecrion===true)
			player.style.transform=` translate(${this.playerX}px,${this.playerY}px) scale(-1,1)`

		if(isTouching(player,coin)){
			const coinCollectSound=document.querySelector('#coinCollect');
			coinCollectSound.play();
			this.updateScore();
			this.moveCoin();
		}
	},
	moveCoin(){
		this.coinX=Math.floor(Math.random()*document.body.clientWidth);
		this.coinY=Math.floor(Math.random()*document.body.clientHeight);
		coin.style.transform=`translate(${this.coinX}px,${this.coinY}px)`;
	},
	updateScore(){
		this.score++;
		const scoreBorad=document.querySelector('#scoreBoard');
		scoreBorad.innerHTML+=`<img  src="https://gifimage.net/wp-content/uploads/2017/11/gold-coin-gif-11.gif" height="8vh" width="8vw">  `;
		
		this.checkWin();
	},
	checkWin(){
		if(this.score>=6){
			const winSound=document.querySelector('#winSound');
			winSound.play();
			swal('congratulations, you won!!!',"Coin Collector","success",{button:'play again'});
		  window.setTimeout(function(){window.location.reload();},3000);	
		}
	}
}
positions.movePlayer();
positions.moveCoin();
window.addEventListener('keyup',function(e){
	console.log('hai');
	console.log(e.key);
	if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){

		positions.movePlayer(e.key);
	}
});

document.querySelectorAll('button i').forEach(function(button){
	button.addEventListener('click',function(e){
		console.log(e.target.id);
		positions.movePlayer(e.target.id);
	});
});

