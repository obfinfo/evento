jefex = 600;

document.addEventListener('keydown', function(evento) {
    if(evento.keyCode == 32){
        tocado();
    }
});

function tocado() {
    if(nivel.muerto == true) {
        player.y = inicio;
        jefe.x = jefex;
        jefe2.x = 900;
        jefe2.y = getRandomInt(20, 330)  ;
        jefe.y = getRandomInt(20, 330)  ;
        nivel.velocidad = 4; 
        nivel.muerto=false;
        nivel.puntuacion=0;
   } else {
    saltar();
   }
}

var img1, img2, img3, back;

function cargarImagenes() {
    img1 = new Image();
    img2 = new Image();
    img3 = new Image();
    back = new Image();

    img1.src = 'main.png';
    img2.src = 'jefe1.png';
    img3.src = 'jefe2.png';
    back.src = 'back.jpg';
}

var ancho = 700;
var alto = 380;
var canvas;
var ctx;
var nivel = {velocidad:4, puntuacion:0, muerto: false};
var inicio = 170;
var suelog= {x:0, y:0}

function inicializa() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    cargarImagenes();
}

var player = {y: inicio, x:80, vy: 0, gravedad:2, salto:20, vymax:9, saltando:false};
var jefe = {x:jefex, y:getRandomInt(20, 330)   };
var jefe2 = {x:900, y:getRandomInt(20, 330)   };

function dibujaRex() {
    ctx.drawImage(img1,0,0,403,373,80,player.y,70,50);
}

function dibujaJefe() {
    ctx.drawImage(img2,0,0,323,273,jefe.x,jefe.y,75,45);
}

function dibujaJefe2() {
    ctx.drawImage(img3,0,0,496,496,jefe2.x,jefe2.y,110,110);
}

function dibujaBack() {
    ctx.drawImage(back,suelog.x,0,566,200,0,suelog.y,566*3,200*2);
}

function logicaBack() {
    if(suelog.x > 566/2){
        suelog.x=0;
    }else{
        suelog.x+=0.1;
    }
}

function dibujarPunts() {
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(nivel.puntuacion,600,40);
}

function gameOver() {
    ctx.font = "bold 47px sans-serif";
    ctx.fillText("GAME OVER",ancho / 2 - 150,alto / 2);
}

function logicaJefe(jefe) {
    if(jefe.x < -100){
        jefe.x = ancho + 100;
        jefe.y = getRandomInt(20, 330);
        nivel.puntuacion++;
        nivel.velocidad = nivel.velocidad + 0.5;
    } else {
        jefe.x -= nivel.velocidad; 
    }
}

function colision() {
    if(jefe.x + 75 >= 70 && jefe.x <= 130){
        if(player.y+45 >= jefe.y && player.y <= jefe.y + 35){
            nivel.muerto = true;
            nivel.velocidad = 0;
            player.vy = 0;
            suelog.x=0;
            player.saltando = false;
            gameOver();
        }
    }
    if(jefe2.x + 50 >= 70 && jefe2.x <= 110){
        if(player.y+40 >= jefe2.y && player.y <= jefe2.y + 35){
            nivel.muerto = true;
            nivel.velocidad = 0;
            player.vy = 0;
            suelog.x=0;
            player.saltando = false;
            gameOver();
        }
    }
}

function saltar() {
    if (player.y<0+50) {
        
    }else{
        player.saltando = true;
        player.vy = player.salto;  
    }

}

function gravedad() {
    if(player.saltando){
        if(player.y >= 330){
            player.saltando=false;
            player.vy = 0;
            player.y = inicio;
            nivel.velocidad = 0;
            nivel.muerto = true;
            suelog.x=0;
            jefe.x = jefex;
        } else {
        player.vy -= player.gravedad;
        player.y -= player.vy;
        }
    }
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function borrarCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}

var fps = 43;
setInterval(function() {
    principal();
}, 1000/fps);

function principal() {
    if (nivel.muerto==false) {
        borrarCanvas();
        gravedad();
        colision();
        dibujaBack();
        logicaBack();
        logicaJefe(jefe);
        dibujaJefe();
        logicaJefe(jefe2);
        dibujaJefe2();
        dibujaRex();
        dibujarPunts(); 
    }else{
        gameOver();
    }
}
