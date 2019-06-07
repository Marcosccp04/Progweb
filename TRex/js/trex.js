(function () {

    const FPS = 300;
    const PROB_NUVEM = 5;
    const PROB_OBSTA = 5;
    const PROB_VOADOR = 5;
    var gameLoop;
    var deserto;
    var pausado = 0;
    var dino;
    var contador;
    var noite = 0;
    var mudaTempo = 0;
    var dVoador = [];
    var opstaculo = [];
    var nuvens = [];

    function init () {
        deserto = new Deserto();
        dino = new Dino();
        contador = new Contador();
        gameLoop = setInterval(run, 1000/FPS);
    }
    window.addEventListener("keydown", function (e) {
        pausado = 1;
        if (e.key == "p") pausado = 0;
    });
    window.addEventListener("keydown", function (e) {
        if (e.key == "ArrowUp"  && dino.status==0){
            dino.status = 1;
        }
    });
    window.addEventListener("keydown", function (e) {
        if (e.key == "ArrowUp"  && dino.status==3){
         dino.status = 0;
        }
        
    });
    window.addEventListener("keydown", function (e) {
        if (e.key == "ArrowDown"  && dino.status==0){
            pausado = 1; 
            dino.status = 3;
        }
    });
  
    function Deserto () {
        this.status = 1;
        this.element = document.createElement("div");
        this.element.className = "deserto";
        document.body.appendChild(this.element);

        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.chao.style.backgroundPositionX = "0px";
        this.element.appendChild(this.chao);
    }

    Deserto.prototype.mover = function() {
        if(this.status == 1){
            this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - 1) + "px";
        }
    }

    function Dino () {
        this.sprites = {
            'correrAgachado1':'-941px',
            'correrAgachado2':'-1000px',
            'correr1':'-766px',
            'correr2':'-810px',
            'pulando':'-678px'
        };
        this.status = 0; // 0:correndo; 1:subindo; 2: descendo; 3: agachado
        this.alturaMaxima = "80px";
        this.element = document.createElement("div");
        this.element.className = "dino";
        this.element.style.backgroundPositionX = this.sprites.correr1;
        this.element.style.bottom = "0px";
        deserto.element.appendChild(this.element);
    }   
    
    Dino.prototype.correr = function () {
        if (this.status == 0) {
            this.element.className = "dino";
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correr1)?this.sprites.correr2:this.sprites.correr1;
        }
        else if (this.status == 1) {
            this.element.className = "dino";
            this.element.style.backgroundPositionX = this.sprites.pulando;
            this.element.style.bottom = (parseInt(this.element.style.bottom) + 1) + "px";
            if (this.element.style.bottom == this.alturaMaxima) this.status = 2;
        }
        else if (this.status == 2) {
            this.element.className = "dino";
            this.element.style.bottom = (parseInt(this.element.style.bottom) - 1) + "px";
            if (this.element.style.bottom == "0px") this.status = 0;
        }
        else if (this.status == 3){
            this.element.className = "dinoAgachado";
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correrAgachado1)?this.sprites.correrAgachado2:this.sprites.correrAgachado1;
        }
    }

    function Nuvem () {
        this.status = 1;
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "0px";
        this.element.style.top = Math.floor(Math.random()*120) + "px";
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function () {
        if(this.status == 1){
            this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
        }
    }
    
    function DinoVoador () {
        this.sprites = {
            'correr1':'-134px',
            'correr2':'-180px',
        }
        this.status = 0;
        this.element = document.createElement("div");
        this.element.className = "dinoVoador";
        this.element.style.right = "0px";
        this.element.style.backgroundPositionX = this.sprites.correr1;
        this.element.style.top = Math.floor(Math.random()*80) + "px";
        deserto.element.appendChild(this.element);
    }

    DinoVoador.prototype.mover = function () {
        if (this.status == 0) {
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correr1)?this.sprites.correr2:this.sprites.correr1;
        }
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px"
    }

    function Opstaculo () {
        this.element = document.createElement("div");
        this.element.className = "opstaculo";
        this.element.style.right = "0px";
        this.element.style.bottom = "0px"; 
        deserto.element.appendChild(this.element);
    }

    Opstaculo.prototype.mover = function () {
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }

    function OpstaculoMedio () {
        this.element = document.createElement("div");
        this.element.className = "opstaculoMedio";
        this.element.style.right = "0px";
        this.element.style.bottom = "0px"; 
        deserto.element.appendChild(this.element);
    }

    OpstaculoMedio.prototype.mover = function () {
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }
    function Contador() {
        this.element = document.createElement("div");
        this.element.className = "zero";
        this.element.style.right = "-430px";
        this.element.style.top = "2px";
        deserto.element.appendChild(this.element);
              
  }
      function run () {
       
        if(pausado == 1){
            //mudaTempo++;
            /*if(mudaTempo % 1000 == 0){
                if(noite == 1){
                    noite = 0;
                }else{
                    noite = 1;
                }
            }*/
            var probOpsta = Math.floor((Math.random()*1500)+1);
            dino.correr();
            deserto.mover();
            if (Math.floor(Math.random()*1000) <= PROB_NUVEM) {
                nuvens.push(new Nuvem());
            }

            nuvens.forEach(function (n) {
                n.mover();
            });

            if (Math.floor(Math.random()*1000) <= PROB_VOADOR) {
                dVoador.push(new DinoVoador());
            }
            dVoador.forEach(function (n) {
                n.mover();
            });
            if ( probOpsta <= PROB_OBSTA) {
                if((probOpsta % 2) == 0){
                    opstaculo.push(new Opstaculo());
                }else{
                    opstaculo.push(new OpstaculoMedio());
                }
            }
            opstaculo.forEach(function (n) {
                n.mover();
            });

        }
    /*if(dino.backgroundPositionY == opstaculo.backgroundPositionY){
        pausado = 0;
    }*/
        //Em caso de game over
        //clearInterval(gameLoop);
    }
    init();
})();