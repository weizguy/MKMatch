


(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.binding();
			this.paused = false;
     		this.guess = null;
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var game = Memory;
			var $card = $(this);
			if(!game.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!game.guess){
					game.guess = $(this).attr("data-id");
				} else if(game.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					attempts ++;
					matchCount++;
					accuracy = Math.round(matchCount / attempts * 100); //percentage
					displayStats();
					game.guess = null;
				} else {
					game.guess = null;
					game.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
						attempts ++;
						accuracy = Math.round(matchCount / attempts * 100); //percentage
						displayStats();
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					game.win();
				}
			}
		},

		win: function(){
			gamesPlayed ++;
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.$game.show("slow");
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			openCharScreen();
			attempts = 0;
			accuracy = 0;
			matchCount = 0;
			displayStats();
    		$(".choice").fadeIn(5000);
		},

		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '<header><div id="char">Mortal Kombat</div><ul><li><img src="images/logo.png" id="logo" onclick="resetGame()"></li>	<li><a href="#">STATS: </a></li><li><a href="#">Games Played</a><div id="gamesPlayed"></div></li><li><a href="#">Accuracy</a><div id="accuracy"></div></li><li><a href="#">Attempts</a><div id="attempts"></div></li><li><img src="images/logo.png" id="logo" onclick="resetGame()"></li></ul></header>';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="images/cardback.png"\
				alt="Mortal Kombat" /></div></div>\
				</div>';
			});
			return frag;
		}
	};


	var cards = [
		{
			name: "Raiden",
			img: "images/raiden.jpg",
			id: 1,
		},
		{
			name: "Liu Kang",
			img: "images/liukang.jpg",
			id: 2
		},
		{
			name: "Mileena",
			img: "images/mileena.jpg",
			id: 3
		},
		{
			name: "Scorpion",
			img: "images/scorpion.jpg",
			id: 4
		},
		{
			name: "Subzero",
			img: "images/subzero.jpg",
			id: 5
		},
		{
			name: "Jax",
			img: "images/jax.jpg",
			id: 6
		},
		{
			name: "Johnny Cage",
			img: "images/johnnycage.jpg",
			id: 7
		},
		{
			name: "Kung Lao",
			img: "images/kunglao.jpg",
			id: 8
		},
		{
			name: "Reptile",
			img: "images/reptile.jpg",
			id: 9
		},
		{
			name: "Baraka",
			img: "images/baraka.jpg",
			id: 10
		},
		{
			name: "Kano",
			img: "images/kano.jpg",
			id: 11
		},
		{
			name: "Kitana",
			img: "images/kitana.jpg",
			id: 12
		},
	];
    
	Memory.init(cards);


})();

function openCharScreen() {
	//document.getElementById("charScreen").style.height = "100%";
	$("#charScreen").height('100%');
	$(".choice").fadeIn(5000);
}

function resetGame() {
	gamesPlayed ++;
	attempts = 0;
	accuracy = 0;
	matchCount = 0;
	displayStats();
}
var char = "";
	function closeCharScreen(name) {
		char = name;
		$('#char').html(char);
		$("#charScreen").height('0%');
	}

var attempts = 0, accuracy = 0, gamesPlayed = 0, matchCount = 0;
function displayStats() {
	$('#attempts').text(attempts);
	$('#accuracy').text(accuracy + '%');
	$('#gamesPlayed').text(gamesPlayed);
}

$(document).ready(function () {
	displayStats();
	if (screen.width < 500) {
		$('.choose').css('height', '18vh');
	}else
		$('.choose').css('height', '25vh');
});