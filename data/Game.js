let array=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

let clickBott=0, boton1= null, boton2 = null, primerClick=null, segundoClick=null, intento=0, puntos=0, time=false, tiempo = 45, tiempoRestante= null;

let mostarIntento = document.getElementById("intentos");
let mostrarPuntos = document.getElementById("correctos");
let mostrarTime = document.getElementById("time");

array.sort(()=> {return Math.random()-0.4});

console.log(array);




//audios

let canchero = new Audio("./Audios/canchero.wav");
let win = new Audio("./Audios/cantalo.wav");
let centro = new Audio("./Audios/centro.wav");
let daleboca = new Audio("./Audios/daleboca.wav");
let gol = new Audio("./Audios/gaal.wav");
let error = new Audio("./Audios/travesa.wav");
let palermo = new Audio("./Audios/geniopalermo.wav");
let roman = new Audio("./Audios/romaaaan.wav");
let boca = new Audio("./Audios/trompeta.wav");
let golpalermo = new Audio("./Audios/golpalermo.wav");
let ta = new Audio("./Audios/ta.wav");
let final = new Audio("./Audios/final.wav");



//funcion principal
function pulsar(id){

    if(time==false){

        contarTime();
        time=true;
    }
    clickBott++;

    if(clickBott==1){
        boton1 = document.getElementById(id);

        //imprimir en el html el primer resultado
        primerClick = array[id];
        boton1.innerHTML= `<img src="./Img/${primerClick}.png">`;        

        //bloquear el primer boton
        boton1.disabled=true;

        if(primerClick == 1){
            palermo.play();
        }else if(primerClick == 2){
            roman.play();
        }else if(primerClick  == 8){
            boca.play();
        }else{
            ta.play();
        }


    }else if(clickBott==2){
        boton2 = document.getElementById(id);

        //imprimir en el html el segundo resultado
        segundoClick = array[id];
        boton2.innerHTML= `<img src="./Img/${segundoClick}.png">`;
        

        //bloquear el segundo boton
        boton2.disabled=true;
        intento++;

        //imprimir en el html los intentos
        mostarIntento.innerHTML = `Intentos: ${intento}`;

        if(primerClick==segundoClick){

            if(segundoClick == 8){
                daleboca.play();
            }else if(segundoClick == 1){
                golpalermo.play();
            }else if(puntos < 7){
                gol.play();
            }
            
            
            //resetear el contador
            clickBott=0;
            puntos++;

            //imprimir en el html el puntaje
            mostrarPuntos.innerHTML = `Puntos: ${puntos}`;

            if(puntos==8){
                win.play();
                clearInterval(tiempoRestante);
                mostrarTime.innerHTML = `GANASTEE!! tiempo a favor: ${tiempo - time} segundos`;
            }

        }else{
            
            error.play();
            setTimeout(()=>{

                boton1.innerHTML = " ";
                boton2.innerHTML = " ";
                
                //habilitar denuevo los botones seleccionados
                boton1.disabled=false;
                boton2.disabled=false;

                //resetear el contador
                clickBott=0;
            },2000)
        }
    }
}

//funcion para temporizar
function contarTime(){
    tiempoRestante =setInterval(()=>{

        tiempo--;

        mostrarTime.innerHTML =`Tiempo: ${tiempo}`;
        if(tiempo == 14 && puntos <=2){
            canchero.play();
        }
        if(tiempo == 7){
            centro.play();
        }

        if(tiempo == 0){
            mostrarTime.innerHTML =`PERDISTEE!! TE QUEDASTE SIN TIEMPO`;
            clearInterval(tiempoRestante);
            bloquearBotones();
            final.play();
        }
    }, 1000)
}

//funcion para bloquear los botones una vez que se termine el tiempo
function bloquearBotones(){
    for(let i=0; i<=15; i++){
        let botonBloqueado = document.getElementById(i);
        botonBloqueado.innerHTML = `<img src="./Img/${array[i]}.png">`;
        botonBloqueado.disabled = true;
    }
}
