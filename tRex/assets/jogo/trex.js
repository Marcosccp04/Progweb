(function(){

	const FPS = 300;
	const MAX_NUVENS = 10;
	const MAX_PASSARO = 2;
	var gameLoop;
	var deserto;
	var dino;
	var nuvens = [];
	var cactos = [];
	var passaros = [];

	window.addEventListener("keydown", function(event){

		if(dino.status == 0){

			if(event.key == 'ArrowUp' || event.key == ' '){

				dino.status = 1;

			}else if(event.key == 'ArrowDown'){

				dino.status = 3;

			}

		}

	});

	window.addEventListener("keyup", function(event){

		if(event.key == "ArrowDown" && dino.status == 3){

			dino.status = 0;
			dino.element.style.width = '45px';

		}

	});

	function Deserto(){

		this.element = document.createElement("div");
		this.element.className = "deserto";
		document.body.appendChild(this.element);

		this.chao = document.createElement("div");
		this.chao.className = "chao";
		this.chao.style.backgroundPositionX = "0px";
		this.element.appendChild(this.chao);

	}

	Deserto.prototype.mover = function(){
		this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - 1) + "px";
	}

	function Dino(){

		this.sprites = {
			'correr1':'-766px',
			'correr2':'-810px',
			'pulando':'-678px',
			'agachado1': '-941px',
			'agachado2': '-1000px'
		};

		this.status = 0; // 0: correndo; 1: subindo; 2: descendo; 3: agachado
		this.alturaMaxima = "80px";
		this.element = document.createElement("div");
		this.element.className = "dino";
		this.element.style.backgroundPositionX = this.sprites.correr1;
		this.element.style.bottom = "0px";

		deserto.element.appendChild(this.element);

	}

	Dino.prototype.mover = function(){

		if(this.status == 0){

			this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correr1) ? this.sprites.correr2 : this.sprites.correr1;

		}else if(this.status == 1) {

			this.element.style.backgroundPositionX = this.sprites.pulando;
			this.element.style.bottom = (parseInt(this.element.style.bottom) + 1) + "px";

			if(this.element.style.bottom == this.alturaMaxima) this.status = 2;

		}else if(this.status == 2){

			this.element.style.bottom = (parseInt(this.element.style.bottom) - 1) + "px";
			if(this.element.style.bottom == "0px") this.status = 0;

		}else{

			this.element.style.width = '59px';
			this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.agachado1) ? this.sprites.agachado2 : this.sprites.agachado1;

		}

	}
14
	function Passaro () {
    	this.element = document.createElement("div");
    	this.element.className = "passaro";
    	this.element.style.right = "0px";
    	this.element.style.top = Math.floor(Math.random()*120) + "px";
    	deserto.element.appendChild(this.element);
    }

    Passaro.prototype.mover = function () {
    	this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }

	function Cacto(){

		this.sprites = [[-228, -246, -262, -279, -296, -313], [-332, -357, -382, -407, -457]];;

		this.element = document.createElement("div");
		this.element.className = "cacto";
		this.element.style.right = "0px";
		this.cacto.style.bottom = "0px";
		this.cacto.randomCacto = -1;
        this.cacto.id = "cacto_" + count_cacto;
        count_cacto++;
		deserto.element.appendChild(this.element);

	}

	Cacto.prototype.mover = function(){
		if(this.cacto.randomCacto == -1){
                this.cacto.randomCacto = Math.floor(Math.random()*3);
                if(this.cacto.randomCacto == 0){
                    
                    this.cacto.style.width = "19px";
                    this.cacto.style.height = "37px";
                    this.cacto.style.backgroundPositionX = "-227px";
                }
                if(this.cacto.randomCacto == 1){
                    
                    this.cacto.style.width = "26px";
                    this.cacto.style.height = "51px";
                    this.cacto.style.backgroundPositionX = "-331px";
                }
                if(this.cacto.randomCacto == 2){
                    
                    this.cacto.style.width = "51px";
                    this.cacto.style.height = "53px";
                    this.cacto.style.backgroundPositionX = "-430px";
                }
            }
            this.cacto.style.right = String(parseInt(this.cacto.style.right) + velocidade) + "px";
	}

	function run(){

		dino.mover();
		deserto.mover();

		nuvens.forEach(function(nuvem){
			nuvem.mover();
		});

		cactos.forEach(function(cacto){
			cacto.mover();
		});

		passaros.forEach(function (n) {
        	n.mover();
        });

		//Em caso de game over
		//clearInterval(gameLoop);

	}

	

	(function(){

		deserto = new Deserto();
		dino = new Dino();

		setInterval(run, 1000/FPS);

		setInterval(function(){

			if(nuvens.length == MAX_NUVENS && passaros.length == MAX_PASSARO) 

			deserto.element.removeChild(nuvens.shift().element);


			nuvens.push(new Nuvem());
			cactos.push(new Cacto());
			passaros.push(new Passaro());

		}, 1000);

	})();

})()