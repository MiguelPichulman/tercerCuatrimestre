let nota= 7;

if (nota>=9){
    console.log("excelente");
}else if (nota>=6){
    console.log("aprobado");  
}else{
    console.log("reprobado");
}

let dia=1;

switch (dia){
    case 1:
        console.log("lunes");
        break;
    case 2:
        console.log("martes");
        break;
    case 3:
        console.log("miercoles");
        break;
    default:
        console.log("dia invalido");
}

for (let i=0; i<5; i++){
    console.log("iteracion:", i);
}

let n=1;
while(n<=3){
    console.log("numero:", n);
    n++;
}

let x=1;
do{
    console.log("ejecutado:",x)
    x++;
}while(x<=3);

let numeros=[1,2,3];
numeros.forEach((num, i)=>{
    console.log(`posicion ${i}:${num*2}`);
})