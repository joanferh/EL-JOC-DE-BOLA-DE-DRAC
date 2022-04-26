
//LLISTA AMB ELS PARTICIPANTS PER BARREJAR-LOS
/*let personatges = ['Goku', 'Krilin','Follet tortuga', 'Ten Shin Han', 'Chaos', 'Cor Petit'];

console.log(personatges.sort())

const personatgesBarrejats = personatges.sort((a, b) => 0.5 - Math.random());

console.log(personatgesBarrejats);


let personatge1 = personatgesBarrejats[0]
console.log(personatge1)*/


//CREA CLASSE PERSONATGE
class Personatge{
    constructor(nom, urlphoto, pregunta1, pregunta2, pregunta3){
        this.nom = nom;
        this.urlphoto = urlphoto;
        this.pregunta1 = pregunta1;
        this.pregunta2 = pregunta2;
        this.pregunta3 = pregunta3;
    }
    get infoPersonatge(){
        return(`${this.nom}, ${this.pregunta1}, ${this.pregunta2}, ${this.pregunta3}`);
    }
    passaraNivell2(novapregunta1, novapregunta2, novapregunta3){
        this.pregunta1 = novapregunta1;
        this.pregunta2 = novapregunta2;
        this.pregunta3 = novapregunta3;
    }
}


// ASSIGNA UN OBJECTE PER CADA PERSONATGE
const goku = new Personatge('Goku', 'https://i1.wp.com/padresfrikis.com/wp-content/uploads/2015/08/goku.png?fit=400%2C532&ssl=1',['Qui és el mestre de Goku?','Follet tortuga'], 'Què li passa amb la lluna plena?', 'Quina és la seva primera bola de drac?');
console.log(goku.urlphoto);
const krillin = new Personatge('Krillin', 'https://static.wikia.nocookie.net/dragonball/images/b/b2/Krilin_DB_Artwork.png/revision/latest?cb=20161216144931&path-prefix=es', 'Quants puntets té al front', 'De quina religió és', 'Qui lelimina en el primer torneig darts marcials?');
console.log(krillin.urlphoto);
const jackieChun = new Personatge('Jackie Chun', 'https://64.media.tumblr.com/4decf9ce8e6a46bcf11d58a1a2c928c3/tumblr_mvevyfxuai1skb1z9o1_1280.png','Com es diu la seva casa?', 'És un vell verd?', 'Amb quin nom participa al primer torneig?');
const yamcha = new Personatge('Yamcha','https://static.wikia.nocookie.net/dragonball/images/3/3c/Yamcha_DB_Artwork.png/revision/latest?cb=20160806220010&path-prefix=es', 'Com es diu el seu acompanyant?', 'Quin és el seu atac?', 'Qui lelimina al primer torneig?');


//FUNCIÓ PER BARREJAR ELS PERSONATGES

function lottery(){

    // CREA UN ARRAY D'OBJECTES DELS PERSONATGES
    let participantsTots = [goku, krillin, jackieChun, yamcha];

    // BARREJA ALEATORIAMENT ELS OBJECTES DELS PERSONATGES
    const participantsBarrejats = participantsTots.sort((a, b) => 0.5 - Math.random());
    console.log(participantsBarrejats)
    console.log(participantsBarrejats[0].nom)
    console.log(goku.infoPersonatge)

    //ASSIGNA PLAYERS SEGONS SORTEIG DE participantsBarrejats
    let player1 = participantsBarrejats[0];
    let player2 = participantsBarrejats[1];
    let player3 = participantsBarrejats[2];
    let player4 = participantsBarrejats[3];

    // MOSTRA L'OBJECTE ASSOCIAT A CADA PLAYER
    console.log(player1);
    console.log(player2.nom);
    console.log(player3.nom);
    console.log(player4);

    let leftPlayer = document.getElementById('content');
    content.innerHTML = `
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-4">
                <div style="width:300px; height:auto; float:left; display:inline; margin-left:60px;">
                    <img src = '${player1.urlphoto}' height = '500' </img>
                </div>
           
            </div>
        </div>
    </div>`

}


lottery();




//PROVES

console.log(goku.pregunta1)
console.log(goku.infoPersonatge)
console.log(krillin.infoPersonatge)
console.log(krillin.pregunta3)

goku.passaraNivell2('nova pregunta 1?', 'nova pregunta 2?', 'nova pregunta 3?');
console.log(goku.infoPersonatge)


/*class Usuari{
    constructor(nom, cognom, edat, professio, merits){
        this._nom = nom;
        this._cognom = cognom;
        this._edat = edat;
        this._professio = professio;
        this._merits = merits
    }
    get fullInfo(){
        return(`Nom: ${this._nom} ${this._cognom}. Edat: ${this._edat}. Professió: ${this._professio} `)
    }
    set changeProfession(newprofession){
        this._professio = newprofession
    }
    get birthday(){
        this._edat++;
        return(`Happy birthday ${this._nom}! Feliços ${this._edat}!`)
    }
    afegirMerits(noumerit){
        this._merits.push(noumerit)
    }
}

class Permissos extends Usuari{
    constructor(nom, cognom, edat, professio, merits, sensepermissos, editor, administrador){
        super(nom, cognom, edat, professio, merits);
        this._sensepermissos = sensepermissos;
        this._editor = editor;
        this._administrador = administrador
    }

    
    
    get ferAdministrador(){
        this._sensepermissos = false;
        this._editor = false;
        this._administrador = true;
    }
    get ferEditor(){
        this._sensepermissos = false;
        this._editor = true;
        this._administrador = false;
    }
}

//const joan = new Usuari('Joan', 'Ferrer', 39, 'periodista');
//console.log(joan)

const joan = new Permissos('Joan', 'Ferrer', 39, 'periodista',[], true, false, false)
console.log(joan)
joan.afegirMerits('Futbol')
joan.afegirMerits('Informàtica')
joan.afegirMerits('Basquet')

console.log(joan)

console.log(joan.birthday)
console.log(joan.birthday)
console.log(joan.birthday)
console.log(joan.ferAdministrador)
console.log(joan)
console.log(joan.changeProfession = 'Informàtic')
console.log(joan)
console.log(joan.ferEditor)
console.log(joan)









console.log(joan.fullInfo)
console.log(joan)

console.log(joan._professio)
joan.changeProfession = 'advocat'
console.log(joan._professio)
console.log(joan.fullInfo)


console.log(joan.birthday)


for (let i in joan){
    console.log(i);
    console.log(joan[i])
}



/*const person = {
    _firstName: 'John',
    _lastName: 'Doe',
    get fullName() {
      if (this._firstName && this._lastName){
        return `${this._firstName} ${this._lastName}`;
      } else {
        return 'Missing a first name or a last name.';
      }
    }
  }
   
  // To call the getter method: 
  console.log(person.fullName); // 'John Doe'


/*var diasMes = {
    enero: 31,
    febrero: 28,
    marzo: 31,
    abril: 30,
    mayo: 31
}
for(let mes in diasMes){
    
    console.log(diasMes[mes])
}



//Genera un número aleatorio entre un rango de enteros
/*function patito(minimo, maximo)
{
    var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    return numero;
}

var piedra = 0;
var papel = 1;
var tijera = 2;

var opciones = ["Piedra", "Papel", "Tijera"];

var opcionUsuario;
var opcionMaquina = patito(0,2);

opcionUsuario = prompt("¿Qué eliges?\nPiedra: 0\nPapel: 1\nTijera: 2", 0);

alert("Elegiste " + opciones[opcionUsuario]);
alert("Javascript eligió " + opciones[opcionMaquina]);

if(opcionUsuario == piedra)
{
    if(opcionMaquina == piedra)
    {
        alert("Empate!");
    }
    else if(opcionMaquina == papel)
    {
        alert("Perdiste :( ");
    }
    else if(opcionMaquina == tijera)
    {
        alert("Ganaste!");
    }
}
else if(opcionUsuario == papel)
{
    if(opcionMaquina == piedra)
    {
        alert("Ganaste!");
    }
    else if(opcionMaquina == papel)
    {
        alert("Empate!");
    }
    else if(opcionMaquina == tijera)
    {
        alert("Perdiste!");
    }
}
else if(opcionUsuario == tijera)
{
    if(opcionMaquina == piedra)
    {
        alert("Perdiste!");
    }
    else if(opcionMaquina == papel)
    {
        alert("Ganaste!");
    }
    else if(opcionMaquina == tijera)
    {
        alert("Empate!");
    }
}
else
{
    alert("¿Pos qué carajo?");
}*/