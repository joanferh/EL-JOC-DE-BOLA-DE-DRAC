
let humanNamePlayer='';
let score = 0;
let level = 1;
let infoUsuari={}
let cronometre = 0;
let timer;
let tempsFinal;
let minutesAndSeconds;
let scoresBBDD;




//CREA CLASSE PERSONATGE
class Personatge{
    constructor(nom, urlphoto, pregunta1, resposta1, pregunta2, resposta2, pregunta3, resposta3){
        this.nom = nom;
        this.urlphoto = urlphoto;
        this.pregunta1 = pregunta1;
        this.resposta1 = resposta1;
        this.respostacorrecte1 = resposta1[0];
        this.pregunta2 = pregunta2;
        this.resposta2 = resposta2;
        this.respostacorrecte2 = resposta2[0];
        this.pregunta3 = pregunta3;
        this.respostacorrecte3 = resposta3[0];
        this.resposta3 = resposta3;

    }
    get infoPersonatge(){
        return(`${this.nom}, ${this.pregunta1}, ${this.pregunta2}, ${this.pregunta3}`);
    }

    levelUp(novapregunta1, novaresposta1, novapregunta2, novaresposta2, novapregunta3, novaresposta3){

        this.pregunta1 = novapregunta1;
        this.resposta1 = novaresposta1;
        this.respostacorrecte1 = novaresposta1[0];
        this.pregunta2 = novapregunta2;
        this.resposta2 = novaresposta2;
        this.respostacorrecte2 = novaresposta2[0];
        this.pregunta3 = novapregunta3;
        this.resposta3 = novaresposta3;
        this.respostacorrecte3 = novaresposta3[0];
    }
}



// LLISTA DE PERSONATGES
// ASSIGNA UN OBJECTE PER CADA PERSONATGE
let goku = new Personatge('Goku', 'static/img/Goku.png','Qui és el primer mestre d\'en Goku',['Avi Gohan', 'Follet Tortuga', 'Yamcha', 'Tau Pai Pai'], 'Què li passa al Goku amb la lluna plena?',['Es transforma en un mico gegant', 'Perd la força', 'S\'adorm fins al dia següent','Es transforma en super guerrer'], 'Quantes estrelles té primera bola de drac d\'en Goku?', [4]);
let krillin = new Personatge('Krillin', 'static/img/Krillin.png', 'Quants puntets té al front, en Krillin?', [6],'De quina religió és en Krillin?',['Budisme','Hinduisme','Taoisme','No és de cap religió'], 'Qui elimina en Krillin en el primer torneig d\'arts marcials?',['Jackie Chun','Goku','Yamcha','Nam']);
let jackieChun = new Personatge('Jackie Chun', 'static/img/Jackie Chun.png','On viu en Jackie Chun?',['Kame House','Kame Home','Kame Hame','Muten House'], 'Què destrossa en Jackie Chun?',['La lluna','El ring','La graderia','El gong'], 'En quina posició queda en Jackie Chun al primer torneig de la sèrie?',['Campió', 'Sots campió','Tercer','No hi participa']);
let yamcha = new Personatge('Yamcha','static/img/Yamcha.png', 'Com es diu el millor amic d\'en Yamcha?', ['Puar','Ulong','Bulma','Goku'],'Quin és l\'atac preferit d\'en Yamcha?',['L\'atac del puny d\'ullals de llop','La mossegada del llop','La picada de la cobra','Les urpes del tigre'], 'Qui elimina en Yamcha al primer torneig?',['Jackie Chun','Goku','Krillin','Bacterian']);
let nam = new Personatge('Nam', 'static/img/Nam.png', 'Quants participants hi ha al torneig?', ['137', '85', '8', '457'], 'Per què en Nam vol guanyar el torneig?',['Per comprar aigua pel seu poblat','Per pagar els deutes de la seva familia','Per aconseguir el reconeixemenent de la seva tribu','Per poder tornar a casa, amb la seva familia'], 'A qui derrota en Nam a la primera eliminatòria?', ['Ranfan','Giran','Bacterian','Yamcha'],);
let bacterian = new Personatge('Bacterian', 'static/img/Bacterian.png', 'Quantes vegades s\'ha dutxat en Bacterian en tota la vida?', ['Cap','Una vegada, per accident', 'Una vegada, quan va néixer', 'Es dutxa habitualment'], 'Com aconsegueix en Krillin esquivar la pudor d\'en Bacterian?',['S\'adona que no té nas i, per tant, no olora res','Conté la respiració', 'Fa meditació i aconsegueix no olorar res', 'Li tira un cubell d\'aigua per netejar-lo'], 'Què fa servir el comentarista del combat per protegir-se de la pudor d\'en Bacterian?', ['Una màscara de radioactivitat','Una mascareta FFP3','Una pinça','Un mocador'],);
let ranfan = new Personatge('Ranfan', 'static/img/Ranfan.png', 'Qui elimina la Ranfan?', ['Nam','Giran','Krillin','Jackie Chun'], 'En quin personatge d\'El Doctor Slump està inspirada la Ranfan?',['Renault Citroën','Arale Norimaki','Midori Yamabuki','Akane Kimidori'], 'Què fa la Ranfan per distreure els adversaris?', ['Es despulla','Els fa un petó als llavis','Els susurra a la orella','Els ensenya un pit'],);
let giran = new Personatge('Giran', 'static/img/Giran.png', 'Quina tècnica fa servir en Giran contra en Goku?', ['La cola de Guru-Guru','El salt Pinoral', 'El cop de puny de l\'òs','La fiblada de cua' ], 'Com es rendeix en Giran contra en Goku?',['Treu una bandera blanca','Abandona voluntàriament el ring','Es posa a plorar demanant clemència','Se\'n va volant mort de por' ], 'Per què s\'ajorna el combat entre en Goku i en Giran fins el dia següent?', ['Perquè es posa a ploure', 'Perquè no apareix l\'àrbitre','Perquè en Goku es queda adormit','Perquè no apareix el públic'],);

// CREA UN ARRAY D'OBJECTES DELS PERSONATGES
let participantsTots = [goku, krillin, jackieChun, yamcha, nam, bacterian, giran, ranfan];
let participantsBarrejats = []



//FUNCTIONS

function add5Scores(){
    scoreGoku={"avatar":"Goku","nom":"Goku","puntuacio":0,"seconds":0,"time":"00:00"};
    scoreKrillin={"avatar":"Krillin","nom":"Krillin","puntuacio":0,"seconds":0,"time":"00:00"};
    scoreYamcha={"avatar":"Yamcha","nom":"Yamcha","puntuacio":0,"seconds":0,"time":"00:00"};
    scoreJackieChun={"avatar":"Jackie Chun","nom":"Jackie Chun","puntuacio":0,"seconds":0,"time":"00:00"};
    scoreBacterian={"avatar":"Bacterian","nom":"Bacterian","puntuacio":0,"seconds":0,"time":"00:00"};


    localStorage.setItem('scoresList', JSON.stringify([scoreGoku, scoreKrillin, scoreYamcha, scoreJackieChun, scoreBacterian]));
}


//LANDING PAGE ALL SCORES
function landing(){
    
    
    stopClock();
    resetClock();	
    console.log(goku);
    console.log(goku.pregunta1);
    //goku.levelUp('lv2','lv2','lv2','lv2','lv2','lv2',);
    console.log(goku);
    console.log(level)
	
    score = 0;
    level = 1;
    participantsTots = [goku, krillin, jackieChun, yamcha, nam, bacterian, giran, ranfan];
    participantsBarrejats = [];
    console.log('ok');

    // ALLSCORES VE DE PHPMYADMIN, PER FER LA CLASSIFICACIÓ GLOBAL DE TOTS ELS JUGADORS. EL SELECT ES RECULL A RUN.PY, ES PASSA A INDEX.HTML AMB RENDER TEMPLATE,
    // SE LI DONA FORMAT JSON, I ES PASSA A APP.JS AMB UN ID DE LABEL BUIT. UN COP A APP.JS, L'ESTRING ES CONVERTEIX A OBJECTE AMB JSON.PARSE

    allScores = document.getElementById('allScores').getAttribute("value");
    console.log(allScores)
    console.log(typeof allScores)
    // AQUÍ, A MÉS DE CONVERTIR-SE EN OBJECTE JSON, LI CANVIEM EL NOM A ALLSCORES PER DIR-SE SCORESLIST, QUE ÉS EL NOM DEFINIT PER AIXÒ DES DEL PRINCIPI, AMB LOCAL STORAGE
    scoresList=JSON.parse(allScores)
    console.log(scoresList)
    console.log(typeof scoresList)
  



    // LOCALSTORAGE, PER ACONSEGUIR LES PUTUACIONS NOMÉS DEL JUGADOR

    /*scoresList =  localStorage.getItem('scoresList')
    console.log(typeof allScores)
    
    console.log(scoresList);
    scoresList = JSON.parse(scoresList);
    console.log(scoresList);

    if(scoresList === null){
    	add5Scores();
    }

    scoresList =  JSON.parse(localStorage.getItem('scoresList'));*/

    //scoresList = scoresList.sort(((a, b) => b.puntuacio - a.puntuacio));

    scoresList.sort ((a, b) => {
        // Comparamos la propiedad puntuacio de scoresList.
      
        if (a.puntuacio < b.puntuacio) return 1;
        if (a.puntuacio  > b.puntuacio ) return -1;
        else {
          // Si la propiedad puntuacio de scoresList es igual, ordenar por tiempo.
      
          if (a.seconds > b.seconds) return 1;
          else if (a.seconds < b.seconds) return -1;
          return 0;
        }
      })


    console.log(scoresList);



    let primerClassificat = scoresList[0];
    console.log(primerClassificat);
    console.log(primerClassificat.nom);    
    let segonClassificat = scoresList[1];
    let tercerClassificat = scoresList[2];
    let quartClassificat = scoresList[3];
    let cinqueClassificat = scoresList[4];


    document.getElementById('content').innerHTML = ``
    document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
    document.getElementById('score').innerHTML = ` SCORE: ${score}`;
    document.getElementById('title').innerHTML = ``;
    /*document.getElementById('content').innerHTML =`


    <div class="d-grid gap-2">
        <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
            <a class="btn btn-success btn-lg btn-block" onclick="humanPlayerName()" >BENVINGUT AL 21è TORNEIG DE LES ARTS MARCIALS</a>
            <a class="btn btn-success btn-lg btn-block" onclick="humanPlayerName()" >PARTICIPA-HI ARA!</a>
        </div>
    </div>
    
    <div class="container">
        <div class="row pt-5">
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                <div class="video-responsive">
                    <iframe width="560" height="315" 
                        src="https://www.youtube.com/embed/bJZDX0k8ikY?rel=0"
                        title="Presentació del torneig" 
                        frameborder="0" 
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" 
                        allowfullscreen>
                    </iframe>
                </div> 
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">

                <div class= "card" style="height: auto; width: 22rem; padding: 10px 10px 0px 10px; margin-left:5px">
                    <table class='table table-hover'>
                        <thead style='text-align: center'>

                            <div class="btn-group" role="group" aria-label="scores">
                                <button type="button" class="btn btn-danger">ALL SCORES</button>
                                <button type="button" class="btn btn-secondary" onclick=landingMyScores()>MY SCORES</button>
                            </div>

                        </thead>
                        <tbody>
                            <tr>
                                <td align='center' style="width:10%"><h3>1</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${primerClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${primerClassificat.nom}</h5></td>
                                <td align='center' style="width:21%"><h5>${primerClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:24%"><h5>${primerClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>2</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${segonClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${segonClassificat.nom}</h5></td>
                                <td align='center' style="width:21%"><h5>${segonClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:24%"><h5>${segonClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>3</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${tercerClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${tercerClassificat.nom}</h5></td>
                                <td align='center' style="width:21%"><h5>${tercerClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:24%"><h5>${tercerClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>4</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${quartClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${quartClassificat.nom}</h5></td>
                                <td align='center' style="width:21%"><h5>${quartClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:24%"><h5>${quartClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>5</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${cinqueClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${cinqueClassificat.nom}</h5></td>
                                <td align='center' style="width:21%"><h5>${cinqueClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:24%"><h5>${cinqueClassificat.time}</h5></td>
                            </tr>

                            <tr>
                                <td colspan='5' align='center'>
                                    
                                    <img src='static/img/signomas.png' height="20px" onclick="fullScores()">
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>  
            </div>
        </div>
    </div>    

`
}*/


    document.getElementById('inscripcio').innerHTML = `
    <div class="d-grid gap-2">
        <div style="margin-left: auto; margin-right: auto; padding-top: 15px;">
            <a class="btn btn-success btn-lg btn-block" onclick="humanPlayerName()" >BENVINGUT AL 21è TORNEIG DE LES ARTS MARCIALS</a>
            <br>
            <div style="padding-top:10px;">
                <p class="text-center" ><a class="btn btn-danger btn-lg btn-block" onclick="humanPlayerName()">JUGAR</a></p>
            </div>
        </div>
    </div>  
    `;

    document.getElementById('videofoto').innerHTML = `

    
    <div class="img-responsive">

        <img src='/static/img/participantsgranplay.png'/>

    </div> 

    `;

    document.getElementById('boxscores').innerHTML =`


    <div class= "card" style="height: auto; width: 22rem; padding: 10px 10px 0px 10px; margin-left:5px">
        <table class='table table-hover'>
            <thead style='text-align: center'>

                <div class="btn-group" role="group" aria-label="scores">
                    <button type="button" class="btn btn-danger">ALL SCORES</button>
                    <button type="button" class="btn btn-secondary" onclick=landingMyScores()>MY SCORES</button>
                </div>

            </thead>
            <tbody>
                <tr>
                    <td align='center' style="width:10%"><h3>1</h3></td>
                    <td align='center' style="width:10%"><h5><img src='static/img/${primerClassificat.avatar}.png' height='35px'</h5></td>
                    <td align='center' style="width:35%"><h5>${primerClassificat.nom}</h5></td>
                    <td align='center' style="width:21%"><h5>${primerClassificat.puntuacio}</h5></td>
                    <td align='center' style="width:24%"><h5>${primerClassificat.time}</h5></td>
                </tr>
                <tr>
                    <td align='center' style="width:10%"><h3>2</h3></td>
                    <td align='center' style="width:10%"><h5><img src='static/img/${segonClassificat.avatar}.png' height='35px'</h5></td>
                    <td align='center' style="width:35%"><h5>${segonClassificat.nom}</h5></td>
                    <td align='center' style="width:21%"><h5>${segonClassificat.puntuacio}</h5></td>
                    <td align='center' style="width:24%"><h5>${segonClassificat.time}</h5></td>
                </tr>
                <tr>
                    <td align='center' style="width:10%"><h3>3</h3></td>
                    <td align='center' style="width:10%"><h5><img src='static/img/${tercerClassificat.avatar}.png' height='35px'</h5></td>
                    <td align='center' style="width:35%"><h5>${tercerClassificat.nom}</h5></td>
                    <td align='center' style="width:21%"><h5>${tercerClassificat.puntuacio}</h5></td>
                    <td align='center' style="width:24%"><h5>${tercerClassificat.time}</h5></td>
                </tr>
                <tr>
                    <td align='center' style="width:10%"><h3>4</h3></td>
                    <td align='center' style="width:10%"><h5><img src='static/img/${quartClassificat.avatar}.png' height='35px'</h5></td>
                    <td align='center' style="width:35%"><h5>${quartClassificat.nom}</h5></td>
                    <td align='center' style="width:21%"><h5>${quartClassificat.puntuacio}</h5></td>
                    <td align='center' style="width:24%"><h5>${quartClassificat.time}</h5></td>
                </tr>
                <tr>
                    <td align='center' style="width:10%"><h3>5</h3></td>
                    <td align='center' style="width:10%"><h5><img src='static/img/${cinqueClassificat.avatar}.png' height='35px'</h5></td>
                    <td align='center' style="width:35%"><h5>${cinqueClassificat.nom}</h5></td>
                    <td align='center' style="width:21%"><h5>${cinqueClassificat.puntuacio}</h5></td>
                    <td align='center' style="width:24%"><h5>${cinqueClassificat.time}</h5></td>
                </tr>

                <tr>
                    <td colspan='5' align='center'>
                        
                        <img src='static/img/signomas.png' height="20px" onclick="fullScores()">
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>  

`
}



//LANDING PAGE MY SCORES
function landingMyScores(){

    stopClock();
    resetClock();	
    console.log(goku);
    console.log(goku.pregunta1);
    //goku.levelUp('lv2','lv2','lv2','lv2','lv2','lv2',);
    console.log(goku);
    console.log(level)
	
    score = 0;
    level = 1;
    participantsTots = [goku, krillin, jackieChun, yamcha, nam, bacterian, giran, ranfan];
    participantsBarrejats = [];
    console.log('ok');

    // ALLSCORES VE DE PHPMYADMIN, PER FER LA CLASSIFICACIÓ GLOBAL DE TOTS ELS JUGADORS. EL SELECT ES RECULL A RUN.PY, ES PASSA A INDEX.HTML AMB RENDER TEMPLATE,
    // SE LI DONA FORMAT JSON, I ES PASSA A APP.JS AMB UN ID DE LABEL BUIT. UN COP A APP.JS, L'ESTRING ES CONVERTEIX A OBJECTE AMB JSON.PARSE

    /*allScores = document.getElementById('allScores').getAttribute("value");
    console.log(allScores)
    console.log(typeof allScores)
    allScores=JSON.parse(allScores)
    console.log(allScores)
    console.log(typeof allScores)*/
  



    // LOCALSTORAGE, PER ACONSEGUIR LES PUTUACIONS NOMÉS DEL JUGADOR

    scoresList =  localStorage.getItem('scoresList')
    console.log(typeof allScores)
    
    console.log(scoresList);
    scoresList = JSON.parse(scoresList);
    console.log(scoresList);
    
    //console.log(scoresList.length);

    /*if(scoresList === null){
    	add5Scores();
    }

    scoresList =  JSON.parse(localStorage.getItem('scoresList'));*/


 
    if(scoresList == null){    
        console.log('null');  
        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = ` SCORE: ${score}`;
        document.getElementById('title').innerHTML = ``;
        document.getElementById('content').innerHTML =``;

        document.getElementById('inscripcio').innerHTML = `
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 15px;">
                <a class="btn btn-success btn-lg btn-block" onclick="humanPlayerName()" >BENVINGUT AL 21è TORNEIG DE LES ARTS MARCIALS</a>
                <br>
                <div style="padding-top:10px;">
                    <p class="text-center" ><a class="btn btn-danger btn-lg btn-block" onclick="humanPlayerName()">JUGAR</a></p>
                </div>
            </div>
        </div>    
        `;
    
        document.getElementById('videofoto').innerHTML = `
    
        
        <div class="img-responsive" >
    
            <img src='/static/img/participantsgranplay.png'/>
    
        </div> 
    
        `;

        document.getElementById('boxscores').innerHTML =`


        <div class= "card" style="height: auto; width: 22rem; padding: 10px 10px 0px 10px; margin-left:5px">
        <table class='table table-hover'>
            <thead style='text-align: center'>

                <div class="btn-group" role="group" aria-label="scores">
                    <button type="button" class="btn btn-secondary" onclick=landing()>ALL SCORES</button>
                    <button type="button" class="btn btn-danger">MY SCORES</button>
                </div>

            </thead>
            <tbody>
                <tr>
                    <td align='center' style="width:10%"><h3>1</h3></td>
                    <td align='center' style="width:10%"></td>
                    <td align='center' style="width:35%"></td>
                    <td align='center' style="width:21%"></td>
                    <td align='center' style="width:24%"></td>
                </tr>
                <tr>
                    <td align='center' style="width:10%"><h3>2</h3></td>
                    <td align='center' style="width:10%"></td>
                    <td align='center' style="width:35%"></td>
                    <td align='center' style="width:21%"></td>
                    <td align='center' style="width:24%"></td>
                </tr>
                <tr>
                    <td align='center' style="width:10%"><h3>3</h3></td>
                    <td align='center' style="width:10%"></td>
                    <td align='center' style="width:35%"></td>
                    <td align='center' style="width:21%"></td>
                    <td align='center' style="width:24%"></td>
                </tr>
                </tr>
                <tr>
                    <td align='center' style="width:10%"><h3>4</h3></td>
                    <td align='center' style="width:10%"></td>
                    <td align='center' style="width:35%"></td>
                    <td align='center' style="width:21%"></td>
                    <td align='center' style="width:24%"></td>
                <tr>
                    <td align='center' style="width:10%"><h3>5</h3></td>
                    <td align='center' style="width:10%"></td>
                    <td align='center' style="width:35%"></td>
                    <td align='center' style="width:21%"></td>
                    <td align='center' style="width:24%"></td>
                </tr>

                <tr>
                    <td colspan='5' align='center'>
                        
                        <img src='static/img/signomas.png' height="20px" onclick="myFullScores()">
                        
                    </td>
                </tr>
            </tbody>
        </table>
         `  
    }else if(scoresList.length == 1){

        let primerClassificat = scoresList[0];
        console.log('prova')


        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = ` SCORE: ${score}`;
        document.getElementById('title').innerHTML = ``;
        document.getElementById('content').innerHTML =``;

        
        document.getElementById('inscripcio').innerHTML = `
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 15px;">
                <a class="btn btn-success btn-lg btn-block" onclick="humanPlayerName()" >BENVINGUT AL 21è TORNEIG DE LES ARTS MARCIALS</a>
                <br>
                <div style="padding-top:10px;">
                    <p class="text-center" ><a class="btn btn-danger btn-lg btn-block" onclick="humanPlayerName()">JUGAR</a></p>
                </div>
            </div>
        </div>   
        `;
    
        document.getElementById('videofoto').innerHTML = `
    
        
        <div class="img-responsive" >
    
            <img src='/static/img/participantsgranplay.png'/>
    
        </div> 
    
        `;

        document.getElementById('boxscores').innerHTML =`

        <div class= "card" style="height: auto; width: 22rem; padding: 10px 10px 0px 10px; margin-left:5px">
            <table class='table table-hover'>
                <thead style='text-align: center'>

                    <div class="btn-group" role="group" aria-label="scores">
                        <button type="button" class="btn btn-secondary" onclick=landing()>ALL SCORES</button>
                        <button type="button" class="btn btn-danger">MY SCORES</button>
                    </div>

                </thead>
                <tbody>
                    <tr>
                        <td align='center' style="width:10%"><h3>1</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${primerClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${primerClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${primerClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${primerClassificat.time}</h5></td>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>2</h3></td>
                        <td align='center' style="width:10%"></td>
                        <td align='center' style="width:35%"></td>
                        <td align='center' style="width:21%"></td>
                        <td align='center' style="width:24%"></td>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>3</h3></td>
                        <td align='center' style="width:10%"></td>
                        <td align='center' style="width:35%"></td>
                        <td align='center' style="width:21%"></td>
                        <td align='center' style="width:24%"></td>
                    </tr>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>4</h3></td>
                        <td align='center' style="width:10%"></td>
                        <td align='center' style="width:35%"></td>
                        <td align='center' style="width:21%"></td>
                        <td align='center' style="width:24%"></td>
                    <tr>
                        <td align='center' style="width:10%"><h3>5</h3></td>
                        <td align='center' style="width:10%"></td>
                        <td align='center' style="width:35%"></td>
                        <td align='center' style="width:21%"></td>
                        <td align='center' style="width:24%"></td>
                    </tr>

                    <tr>
                        <td colspan='5' align='center'>
                            
                            <img src='static/img/signomas.png' height="20px" onclick="myFullScores()">
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>  
            `

    }else if(scoresList.length == 2){


        scoresList.sort ((a, b) => {
            // Comparamos la propiedad puntuacio de scoresList.
        
            if (a.puntuacio < b.puntuacio) return 1;
            if (a.puntuacio  > b.puntuacio ) return -1;
            else {
            // Si la propiedad puntuacio de scoresList es igual, ordenar por tiempo.
        
            if (a.seconds > b.seconds) return 1;
            else if (a.seconds < b.seconds) return -1;
            return 0;
            }
        })

        let primerClassificat = scoresList[0];
        let segonClassificat = scoresList[1];
        console.log('prova')


        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = ` SCORE: ${score}`;
        document.getElementById('title').innerHTML = ``;
        document.getElementById('content').innerHTML =``;

        document.getElementById('inscripcio').innerHTML = `
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 15px;">
                <a class="btn btn-success btn-lg btn-block" onclick="humanPlayerName()" >BENVINGUT AL 21è TORNEIG DE LES ARTS MARCIALS</a>
                <br>
                <div style="padding-top:10px;">
                    <p class="text-center" ><a class="btn btn-danger btn-lg btn-block" onclick="humanPlayerName()">JUGAR</a></p>
                </div>
            </div>
        </div> 
        `;
    
        document.getElementById('videofoto').innerHTML = `
    
        
        <div class="img-responsive" >
    
            <img src='/static/img/participantsgranplay.png'/>
    
        </div> 
    
        `;

        document.getElementById('boxscores').innerHTML =`

        <div class= "card" style="height: auto; width: 22rem; padding: 10px 10px 0px 10px; margin-left:5px">
            <table class='table table-hover'>
                <thead style='text-align: center'>

                    <div class="btn-group" role="group" aria-label="scores">
                        <button type="button" class="btn btn-secondary" onclick=landing()>ALL SCORES</button>
                        <button type="button" class="btn btn-danger">MY SCORES</button>
                    </div>

                </thead>
                <tbody>
                    <tr>
                        <td align='center' style="width:10%"><h3>1</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${primerClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${primerClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${primerClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${primerClassificat.time}</h5></td>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>2</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${segonClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${segonClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${segonClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${segonClassificat.time}</h5></td>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>3</h3></td>
                        <td align='center' style="width:10%"></td>
                        <td align='center' style="width:35%"></td>
                        <td align='center' style="width:21%"></td>
                        <td align='center' style="width:24%"></td>
                    </tr>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>4</h3></td>
                        <td align='center' style="width:10%"></td>
                        <td align='center' style="width:35%"></td>
                        <td align='center' style="width:21%"></td>
                        <td align='center' style="width:24%"></td>
                    <tr>
                        <td align='center' style="width:10%"><h3>5</h3></td>
                        <td align='center' style="width:10%"></td>
                        <td align='center' style="width:35%"></td>
                        <td align='center' style="width:21%"></td>
                        <td align='center' style="width:24%"></td>
                    </tr>

                    <tr>
                        <td colspan='5' align='center'>
                            
                            <img src='static/img/signomas.png' height="20px" onclick="myFullScores()">
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>  
            `
        
    }else if(scoresList.length == 3){


        scoresList.sort ((a, b) => {
            // Comparamos la propiedad puntuacio de scoresList.
        
            if (a.puntuacio < b.puntuacio) return 1;
            if (a.puntuacio  > b.puntuacio ) return -1;
            else {
            // Si la propiedad puntuacio de scoresList es igual, ordenar por tiempo.
        
            if (a.seconds > b.seconds) return 1;
            else if (a.seconds < b.seconds) return -1;
            return 0;
            }
        })

        let primerClassificat = scoresList[0];
        let segonClassificat = scoresList[1];
        let tercerClassificat = scoresList[2];
        console.log('prova')


        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = ` SCORE: ${score}`;
        document.getElementById('title').innerHTML = ``;
        document.getElementById('content').innerHTML =``;

        document.getElementById('inscripcio').innerHTML = `
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 15px;">
                <a class="btn btn-success btn-lg btn-block" onclick="humanPlayerName()" >BENVINGUT AL 21è TORNEIG DE LES ARTS MARCIALS</a>
                <br>
                <div style="padding-top:10px;">
                    <p class="text-center" ><a class="btn btn-danger btn-lg btn-block" onclick="humanPlayerName()">JUGAR</a></p>
                </div>
            </div>
        </div>
        `;
    
        document.getElementById('videofoto').innerHTML = `
    
        
        <div class="img-responsive" >
    
            <img src='/static/img/participantsgranplay.png'/>
    
        </div> 
    
        `;

        document.getElementById('boxscores').innerHTML =`

        <div class= "card" style="height: auto; width: 22rem; padding: 10px 10px 0px 10px; margin-left:5px">
            <table class='table table-hover'>
                <thead style='text-align: center'>

                    <div class="btn-group" role="group" aria-label="scores">
                        <button type="button" class="btn btn-secondary" onclick=landing()>ALL SCORES</button>
                        <button type="button" class="btn btn-danger">MY SCORES</button>
                    </div>

                </thead>
                <tbody>
                    <tr>
                        <td align='center' style="width:10%"><h3>1</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${primerClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${primerClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${primerClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${primerClassificat.time}</h5></td>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>2</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${segonClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${segonClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${segonClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${segonClassificat.time}</h5></td>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>3</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${tercerClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${tercerClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${tercerClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${tercerClassificat.time}</h5></td>
                    </tr>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>4</h3></td>
                        <td align='center' style="width:10%"></td>
                        <td align='center' style="width:35%"></td>
                        <td align='center' style="width:21%"></td>
                        <td align='center' style="width:24%"></td>
                    <tr>
                        <td align='center' style="width:10%"><h3>5</h3></td>
                        <td align='center' style="width:10%"></td>
                        <td align='center' style="width:35%"></td>
                        <td align='center' style="width:21%"></td>
                        <td align='center' style="width:24%"></td>
                    </tr>

                    <tr>
                        <td colspan='5' align='center'>
                            
                            <img src='static/img/signomas.png' height="20px" onclick="myFullScores()">
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>  
            `

    }else if(scoresList.length == 4){


        scoresList.sort ((a, b) => {
            // Comparamos la propiedad puntuacio de scoresList.
        
            if (a.puntuacio < b.puntuacio) return 1;
            if (a.puntuacio  > b.puntuacio ) return -1;
            else {
            // Si la propiedad puntuacio de scoresList es igual, ordenar por tiempo.
        
            if (a.seconds > b.seconds) return 1;
            else if (a.seconds < b.seconds) return -1;
            return 0;
            }
        })

        let primerClassificat = scoresList[0];
        let segonClassificat = scoresList[1];
        let tercerClassificat = scoresList[2];
        let quartClassificat = scoresList[3];
        let cinqueClassificat = scoresList[4];
        console.log('prova')


        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = ` SCORE: ${score}`;
        document.getElementById('title').innerHTML = ``;
        document.getElementById('content').innerHTML =``;


        document.getElementById('inscripcio').innerHTML = `
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 15px;">
                <a class="btn btn-success btn-lg btn-block" onclick="humanPlayerName()" >BENVINGUT AL 21è TORNEIG DE LES ARTS MARCIALS</a>
                <br>
                <div style="padding-top:10px;">
                    <p class="text-center" ><a class="btn btn-danger btn-lg btn-block" onclick="humanPlayerName()">JUGAR</a></p>
                </div>
            </div>
        </div>
        `;
    
        document.getElementById('videofoto').innerHTML = `
    
        
        <div class="img-responsive" >
    
            <img src='/static/img/participantsgranplay.png'/>
    
        </div> 
    
        `;

        document.getElementById('boxscores').innerHTML =`

        <div class= "card" style="height: auto; width: 22rem; padding: 10px 10px 0px 10px; margin-left:5px">
            <table class='table table-hover'>
                <thead style='text-align: center'>

                    <div class="btn-group" role="group" aria-label="scores">
                        <button type="button" class="btn btn-secondary" onclick=landing()>ALL SCORES</button>
                        <button type="button" class="btn btn-danger">MY SCORES</button>
                    </div>

                </thead>
                <tbody>
                    <tr>
                        <td align='center' style="width:10%"><h3>1</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${primerClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${primerClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${primerClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${primerClassificat.time}</h5></td>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>2</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${segonClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${segonClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${segonClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${segonClassificat.time}</h5></td>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>3</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${tercerClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${tercerClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${tercerClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${tercerClassificat.time}</h5></td>
                    </tr>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>4</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${quartClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${quartClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${quartClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${quartClassificat.time}</h5></td>
                    <tr>
                        <td align='center' style="width:10%"><h3>5</h3></td>
                        <td align='center' style="width:10%"></td>
                        <td align='center' style="width:35%"></td>
                        <td align='center' style="width:21%"></td>
                        <td align='center' style="width:24%"></td>
                    </tr>

                    <tr>
                        <td colspan='5' align='center'>
                            
                            <img src='static/img/signomas.png' height="20px" onclick="myFullScores()">
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>  
            `
    
    }else{


        scoresList.sort ((a, b) => {
            // Comparamos la propiedad puntuacio de scoresList.
        
            if (a.puntuacio < b.puntuacio) return 1;
            if (a.puntuacio  > b.puntuacio ) return -1;
            else {
            // Si la propiedad puntuacio de scoresList es igual, ordenar por tiempo.
        
            if (a.seconds > b.seconds) return 1;
            else if (a.seconds < b.seconds) return -1;
            return 0;
            }
        })

        let primerClassificat = scoresList[0];
        let segonClassificat = scoresList[1];
        let tercerClassificat = scoresList[2];
        let quartClassificat = scoresList[3];
        let cinqueClassificat = scoresList[4];
        console.log('prova')


        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = ` SCORE: ${score}`;
        document.getElementById('title').innerHTML = ``;
        document.getElementById('content').innerHTML =``;


        document.getElementById('inscripcio').innerHTML = `
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 15px;">
                <a class="btn btn-success btn-lg btn-block" onclick="humanPlayerName()" >BENVINGUT AL 21è TORNEIG DE LES ARTS MARCIALS</a>
                <br>
                <div style="padding-top:10px;">
                    <p class="text-center" ><a class="btn btn-danger btn-lg btn-block" onclick="humanPlayerName()">JUGAR</a></p>
                </div>
            </div>
        </div>
        `;
    
        document.getElementById('videofoto').innerHTML = `
    
        
        <div class="img-responsive" >
    
            <img src='/static/img/participantsgranplay.png'/>
    
        </div> 
    
        `;

        document.getElementById('boxscores').innerHTML =`

        <div class= "card" style="height: auto; width: 22rem; padding: 10px 10px 0px 10px; margin-left:5px">
            <table class='table table-hover'>
                <thead style='text-align: center'>

                    <div class="btn-group" role="group" aria-label="scores">
                        <button type="button" class="btn btn-secondary" onclick=landing()>ALL SCORES</button>
                        <button type="button" class="btn btn-danger">MY SCORES</button>
                    </div>

                </thead>
                <tbody>
                    <tr>
                        <td align='center' style="width:10%"><h3>1</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${primerClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${primerClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${primerClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${primerClassificat.time}</h5></td>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>2</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${segonClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${segonClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${segonClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${segonClassificat.time}</h5></td>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>3</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${tercerClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${tercerClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${tercerClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${tercerClassificat.time}</h5></td>
                    </tr>
                    </tr>
                    <tr>
                        <td align='center' style="width:10%"><h3>4</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${quartClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${quartClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${quartClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${quartClassificat.time}</h5></td>
                    <tr>
                        <td align='center' style="width:10%"><h3>5</h3></td>
                        <td align='center' style="width:10%"><h5><img src='static/img/${cinqueClassificat.avatar}.png' height='35px'</h5></td>
                        <td align='center' style="width:35%"><h5>${cinqueClassificat.nom}</h5></td>
                        <td align='center' style="width:21%"><h5>${cinqueClassificat.puntuacio}</h5></td>
                        <td align='center' style="width:24%"><h5>${cinqueClassificat.time}</h5></td>
                    </tr>

                    <tr>
                        <td colspan='5' align='center'>
                            
                            <img src='static/img/signomas.png' height="20px" onclick="myFullScores()">
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>  
            `
    }
   
}


function fullScores(){
    

    stopClock();
    resetClock();
    score=0;

    let contingut = document.getElementById('content');
    
    document.getElementById('level').innerHTML = ``;
    document.getElementById('score').innerHTML = ``;
    document.getElementById('inscripcio').innerHTML = ``;
    document.getElementById('boxscores').innerHTML = ``;
    document.getElementById('videofoto').innerHTML = ``;
    document.getElementById('title').innerHTML = ` 
    <div class="container">
        <div style="margin-left: auto; margin-right: auto; float:left; padding-top:20px;  padding-bottom:10px; float:center;"><h3>ALL SCORES</h3></div>
        <div style="margin-left: auto; margin-right: 40px; float:right; position:fixed; right:0; margin-top:20px;" class="btn btn-success btn-lg btn-block" onclick="landing()" >INICI</div>
    </div>
    `
    
    contingut.innerHTML =``;

    let scoresList=[];



    // RECUPEREM LES DADES
    // ALLSCORES VE DE PHPMYADMIN, PER FER LA CLASSIFICACIÓ GLOBAL DE TOTS ELS JUGADORS. EL SELECT ES RECULL A RUN.PY, ES PASSA A INDEX.HTML AMB RENDER TEMPLATE,
    // SE LI DONA FORMAT JSON, I ES PASSA A APP.JS AMB UN ID DE LABEL BUIT. UN COP A APP.JS, L'STRING ES CONVERTEIX A OBJECTE AMB JSON.PARSE

    allScores = document.getElementById('allScores').getAttribute("value");
    console.log(allScores)
    console.log(typeof allScores)

    // AQUÍ, A MÉS DE CONVERTIR-SE EN OBJECTE JSON, LI CANVIEM EL NOM A ALLSCORES PER DIR-SE SCORESLIST, QUE ÉS EL NOM DEFINIT PER AIXÒ DES DEL PRINCIPI, AMB LOCAL STORAGE
    scoresList=JSON.parse(allScores)
    console.log(scoresList)
    console.log(typeof scoresList)


    console.log(scoresList);

/*
    /////////////////////////////////// OBJECTIU: COLOREJAR ELS MEUS RESULTATS A LA LLISTA GENERAL///////////////////
    
    // RECUPEREM ELS SCORES DEL LOCAL STORAGE, ÉS A DIR, MY SCORES
    scoresListLocalStorage =  JSON.parse(localStorage.getItem('scoresList'));

    scoresList.sort ((a, b) => {
        // Comparamos la propiedad puntuacio de scoresList.
      
        if (a.puntuacio < b.puntuacio) return 1;
        if (a.puntuacio  > b.puntuacio ) return -1;
        else {
          // Si la propiedad puntuacio de scoresList es igual, ordenar por tiempo.
      
          if (a.seconds > b.seconds) return 1;
          else if (a.seconds < b.seconds) return -1;
          return 0;
        }
    })

    console.log(scoresList);
    console.log(scoresListLocalStorage);

    // SI SCORESLISTLCCALSTORAGE ESTÀ BUIT, ÉS A DIR, ÉS NULL, IMPRIMIM LA LLISTA SENSE COLOREJAR, NOMÉS AGAFANT LA BBDD DE SCORSELIST

    if(scoresListLocalStorage === null){
        for(let i = 0; i < scoresList.length; i++){
            //console.log(tasks[i])
            let position = i;
            let avatar = scoresList[i].avatar;
            let nom = scoresList[i].nom;
            let puntuacio = scoresList[i].puntuacio;
            let seconds = scoresList[i].seconds;
            let time = scoresList[i].time;
            //console.log(avatar);
            
        
            
            contingut.innerHTML +=`
            <div class="container">
                <div class="col-12" style="display: flex; align-items: center; justify-content: center;">
                    <div class= "card" style="height: 4rem; width: 40rem;">
                        <table class='table table-hover'>
                            <tbody style='text-align: center;'>
                                <tr>
                                    <td align='center' style="width:17%"><h3>${position + 1}</h3></td>
                                    <td align='center' style="width:9%"><h5><img src='static/img/${avatar}.png' height='35px'</h5></td>
                                    <td align='center' style="width:29%"><h5>${nom}</h5></td>
                                    <td align='center' style="width:21%"><h4>${puntuacio}</h4></td>
                                    <td align='center' style="width:24%"><h5>${time}</h5></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`
        }
        contingut.innerHTML +=`
    
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding: 1em ;">
                <a class="btn btn-success btn-lg btn-block" onclick="landing()" >INICI</a>
            </div>
        </div> 
        `   

        
    }else{

        // TANT A SCORELIST COM A SCORELISTLOCALSTORAGE LI AFEGIM LA PROPIETAT REPE:FALSE

        for(let i = 0; i < scoresList.length; i++){
            scoresList[i].repe=false;    
        }
        console.log(scoresList);

        for(let j = 0; j < scoresListLocalStorage.length; j++){
            scoresListLocalStorage[j].repe=false;
        }

        console.log(scoresListLocalStorage);


        //AGAFEM ELS VALORS DELS DOS OBJECTES

        let valuesAllScores = Object.values(scoresList);
        let valuesMyScores = Object.values(scoresListLocalStorage);
        //console.log(valuesAllScores[0]);
        //console.log(valuesMyScores[0]);

        // FEM DOS BUCLES PER TROBAR LES COINCIDENCIES ALS OBJECTES. QUAN HI HA UNA COINCIDÈNCIA, CANVIEM LA PROPIETAT REPE A TRUE

        for(let i = 0; i < scoresList.length; i++){
            for(let j=0; j<scoresListLocalStorage.length; j++){
                //console.log(valuesAllScores[i]);
                //console.log(valuesMyScores[j]);
                if(JSON.stringify(valuesAllScores[i])===JSON.stringify(valuesMyScores[j])){
                    scoresList[i].repe=true;
                    console.log(scoresList[i]);

                    console.log('repetits');
                    //console.log(JSON.stringify(valuesAllScores[i]));
                    //console.log(JSON.stringify(valuesMyScores[j]));
                }
            }
            
        }
        console.log(scoresList); 

        // ORDENENEM PER PUNTUACIÓ I, SI CAL, PER TEMPS

        scoresList.sort ((a, b) => {
            // Comparamos la propiedad puntuacio de scoresList.
        
            if (a.puntuacio < b.puntuacio) return 1;
            if (a.puntuacio  > b.puntuacio ) return -1;
            else {
            // Si la propiedad puntuacio de scoresList es igual, ordenar por tiempo.
        
            if (a.seconds > b.seconds) return 1;
            else if (a.seconds < b.seconds) return -1;
            return 0;
            }
        })

        // FINALMENT, ASSIGNEM VARIABLES A LES PROPIETATS DE SCORESLIST. SI REPE:TRUE, LI POSEM VERMELL DE BACKGROUND COLOR. SI ELSE (REPE:FALSE), EL DEIXEM EN BLANC

        let position = 0;
        for(let clave in scoresList){
            position += 1
            console.log(position)
            let avatar = scoresList[clave].avatar;
            let nom = scoresList[clave].nom;
            console.log(nom);
            let puntuacio = scoresList[clave].puntuacio;
            let seconds = scoresList[clave].seconds;
            let time = scoresList[clave].time;

            //console.log(clave);
            if(scoresList[clave].repe === true){
                console.log(scoresList[clave]);
                console.log('repe es true');
                contingut.innerHTML +=`
                    <div class="container">
                        <div class="col-12" style="display: flex; align-items: center; justify-content: center;">
                            <div class= "card" style="height: 4rem; width: 40rem;">
                                <table class='table table-hover'>
                                    <tbody style='text-align: center; background-color:#FCBEB1;'>
                                        <tr>
                                            <td align='center' style="width:17%"><h3>${position}</h3></td>
                                            <td align='center' style="width:9%"><h5><img src='static/img/${avatar}.png' height='35px'</h5></td>
                                            <td align='center' style="width:29%"><h5>${nom}</h5></td>
                                            <td align='center' style="width:21%"><h4>${puntuacio}</h4></td>
                                            <td align='center' style="width:24%"><h5>${time}</h5></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>`

            }else{
                console.log('repe es fals')  
                contingut.innerHTML +=`
                <div class="container">
                    <div class="col-12" style="display: flex; align-items: center; justify-content: center;">
                        <div class= "card" style="height: 4rem; width: 40rem;">
                            <table class='table table-hover'>
                                <tbody style='text-align: center;'>
                                    <tr>
                                        <td align='center' style="width:17%"><h3>${position}</h3></td>
                                        <td align='center' style="width:9%"><h5><img src='static/img/${avatar}.png' height='35px'</h5></td>
                                        <td align='center' style="width:29%"><h5>${nom}</h5></td>
                                        <td align='center' style="width:21%"><h4>${puntuacio}</h4></td>
                                        <td align='center' style="width:24%"><h5>${time}</h5></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>`

            }
        }

    }   
    contingut.innerHTML +=`

    <div class="d-grid gap-2">
        <div style="margin-left: auto; margin-right: auto; padding: 1em ;">
            <a class="btn btn-success btn-lg btn-block" onclick="landing()" >INICI</a>
        </div>
    </div> 
    `
}
    */
    //CODI SNSE COLOREJAR ELS RESULTATS REPETITS A ALL SCORES I MY SCORES
    scoresList.sort ((a, b) => {
        // Comparamos la propiedad puntuacio de scoresList.
      
        if (a.puntuacio < b.puntuacio) return 1;
        if (a.puntuacio  > b.puntuacio ) return -1;
        else {
          // Si la propiedad puntuacio de scoresList es igual, ordenar por tiempo.
      
          if (a.seconds > b.seconds) return 1;
          else if (a.seconds < b.seconds) return -1;
          return 0;
        }
    })

    for(let i = 0; i < scoresList.length; i++){
        //console.log(tasks[i])
        let position = i;
        let avatar = scoresList[i].avatar;
        let nom = scoresList[i].nom;
        let puntuacio = scoresList[i].puntuacio;
        let seconds = scoresList[i].seconds;
        let time = scoresList[i].time;
        //console.log(avatar);
    
        
        contingut.innerHTML +=`
        <div class="container">
            <div class="col-12" style="display: flex; align-items: center; justify-content: center;">
                <div class= "card" style="height: 4rem; width: 40rem;">
                    <table class='table table-hover'>
                        <tbody style='text-align: center;'>
                            <tr>
                                <td align='center' style="width:15%"><h3>${position + 1}</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:30%"><h5>${nom}</h5></td>
                                <td align='center' style="width:21%"><h4>${puntuacio}</h4></td>
                                <td align='center' style="width:24%"><h5>${time}</h5></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`
    }
    contingut.innerHTML +=`

        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding: 1em ;">
                <a class="btn btn-success btn-lg btn-block" onclick="landing()" >INICI</a>
            </div>
        </div> 
        `   
}





// CLASSIFICACIO COMPLETA MY SCORES
function myFullScores(){
    
    stopClock();
    resetClock();
    score=0;
    

    document.getElementById('level').innerHTML = ``;
    document.getElementById('score').innerHTML = ``;
    document.getElementById('content').innerHTML =``;
    document.getElementById('inscripcio').innerHTML = ``;
    document.getElementById('boxscores').innerHTML = ``;
    document.getElementById('videofoto').innerHTML = ``;
    document.getElementById('title').innerHTML = ` 
    <div class="container">
        <div style="margin-left: auto; margin-right: auto; float:left; padding-top:20px;  padding-bottom:10px; float:center;"><h3>MY SCORES</h3></div>
        <div style="margin-left: auto; margin-right: 40px; float:right; position:fixed; right:0; margin-top:20px;" class="btn btn-success btn-lg btn-block" onclick="landing()" >INICI</div>
    </div>

    
    `
    ;
    document.getElementById('content').innerHTML =``;

    let scoresList=[];
    scoresList =  JSON.parse(localStorage.getItem('scoresList'));
    //scoresList = scoresList.sort(((a, b) => b.puntuacio - a.puntuacio));

    scoresList.sort ((a, b) => {
        // Comparamos la propiedad puntuacio de scoresList.
      
        if (a.puntuacio < b.puntuacio) return 1;
        if (a.puntuacio  > b.puntuacio ) return -1;
        else {
          // Si la propiedad puntuacio de scoresList es igual, ordenar por tiempo.
      
          if (a.seconds > b.seconds) return 1;
          else if (a.seconds < b.seconds) return -1;
          return 0;
        }
    })


    console.log(scoresList);

    for(let i = 0; i < scoresList.length; i++){
        //console.log(tasks[i])
        let position = i;
        let avatar = scoresList[i].avatar;
        let nom = scoresList[i].nom;
        let puntuacio = scoresList[i].puntuacio;
        let seconds = scoresList[i].seconds;
        let time = scoresList[i].time;
        //console.log(avatar);
    
        
        document.getElementById('content').innerHTML +=`
        <div class="container">
            <div class="col-12" style="display: flex; align-items: center; justify-content: center;">
                <div class= "card" style="height: 4rem; width: 40rem;">
                    <table class='table table-hover'>
                        <tbody style='text-align: center;'>
                            <tr>
                                <td align='center' style="width:15%"><h3>${position + 1}</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:30%"><h5>${nom}</h5></td>
                                <td align='center' style="width:21%"><h4>${puntuacio}</h4></td>
                                <td align='center' style="width:24%"><h5>${time}</h5></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`
    }
    document.getElementById('content').innerHTML +=`

    <div class="d-grid gap-2">
        <div style="margin-left: auto; margin-right: auto; padding: 1em ;">
            <a class="btn btn-success btn-lg btn-block" onclick="landing()" >INICI</a>
        </div>
    </div> 
    `
   
}


// FUNCIÓ PER GUARDAR EL NOM
function humanPlayerName(){
    humanNamePlayer='';
    score=0;
    level=1;

    document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
    document.getElementById('score').innerHTML = `SCORE: ${score}`;
    document.getElementById('content').innerHTML =``;
    document.getElementById('inscripcio').innerHTML = ``;
    document.getElementById('boxscores').innerHTML = ``;
    document.getElementById('videofoto').innerHTML = ``;
    document.getElementById('content').innerHTML =`
    <div class="container-fluid">
            <div class="row pt-5 d-flex justify-content-center align-items-center">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <form id='humanName'>
                                <div>
                                    <input type="text" id="humanNamePlayer" placeholder="Nom (màxim 15 lletres)" class="form-control" required maxlength="15">    
                                </div>

                                <div class="d-grid gap-2">
                                    <button type="submit" value="submit" onclick="avatar()" class="btn btn-primary btn-block">
                                        Acceptar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        `
    console.log(humanNamePlayer)
}

//document.getElementById('inscripcio').addEventListener('submit', humanPlayerName);
//document.getElementById('humanName').addEventListener('submit', saveName);


//FUNCIÓ PER ESCOLLIR L'AVATAR DEL HUMAN PLAYER (I GUARDAR EL NOM POSAT ABANS)

function bigImg(x) {
    x.style.width = "320px";
    }
  
  function normalImg(x) {
    x.style.width = "280px";
    }   

function avatar(){
    
    score=0;
    level=1;
    stopClock();
    resetClock();

    document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
    document.getElementById('score').innerHTML = `SCORE: ${score}`;

    console.log(humanNamePlayer);    

    if(humanNamePlayer.length == 0){
        if(document.getElementById('humanNamePlayer').value.length == 0){
            alert('Posa un nom');
            return humanPlayerName();
        }else{
        humanNamePlayer = document.getElementById('humanNamePlayer').value;
        }
    }
    console.log(humanNamePlayer);
    
    document.getElementById('content').innerHTML=`


    <div class="d-grid gap-2">
        <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
            <div class="btn btn-light btn-lg btn-block" >${humanNamePlayer}, ESCULL PERSONATGE</div>
        </div>
    </div>



    `
    participantsTots = [goku, krillin, jackieChun, yamcha, nam, bacterian, giran, ranfan];

    for(let i = 0; i < participantsTots.length; i++){
        photoAvatar=participantsTots[i].urlphoto;
        nameAvatar=participantsTots[i].nom;

    
        document.getElementById('content').innerHTML +=`
        

        <button id="${nameAvatar}" class="btn" onclick=(sortejant(this.id))>
            <img onmouseover="bigImg(this)" onmouseout="normalImg(this)" src="${photoAvatar}" width="280" border="0">
        </button>    
        `
        //(quadreEliminatories(this.id))
    }

}

let nomUsuari = {};
let player1 = {};
let player2 = {};
let player3 = {};
let player4 = {};
let player5 = {};
let player6 = {};
let player7 = {};

function sortejant(nameAvatar){

    nameAvatar=nameAvatar;

    document.getElementById('content').innerHTML=`

    <div class="container" style="display: flex; justify-content: center; align-items: center;",>    
        <div style= "position: absolute; top: 50%; left: 40%; margin: -25px 0 0 -25px;">
            <img src='static/img/sortejant.gif' width="60%"  frameBorder="0" class="giphy-embed">
            <h2 style="color:rgb(228, 7, 7);font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;-webkit-text-stroke:1px black">
            SORTEJANT ELIMINATÒRIES...
            </h2>
        </div>
    </div>
    `    
    
    setTimeout(quadreEliminatories,1800, nameAvatar);
}

//FUNCIÓ PER RECOLLIR NOM I AVATAR I MOSTRAR LES ELIMINATÒRIES
function quadreEliminatories(nameAvatar){
    //alert(nameAvatar);
    //console.log(nameAvatar)
    //console.log(humanNamePlayer)

    infoUsuari={
        nom: humanNamePlayer,
        avatar : nameAvatar,
    }

    nomUsuari=infoUsuari.avatar;
    

    // GUARDEM NOM I AVATAR AL LOCAL STORAGE
    let arxiuInfoUsuari = [];
    arxiuInfoUsuari.push(infoUsuari);
    localStorage.setItem('arxiuInfoUsuari', JSON.stringify(arxiuInfoUsuari))

    //TREU DE LA LLISTA EL PERSONATGE QUE HA ESCOLLIT L'USUARI, PERQUÈ NO ES PUGUI ENFRONTAR A ELL
    console.log(participantsTots);
    console.log(nameAvatar);
    participantsTots = participantsTots.filter((item) => item.nom !== nameAvatar);
   
    
    // BARREJA ALEATORIAMENT ELS OBJECTES DELS PERSONATGES
    participantsBarrejats = participantsTots.sort((a, b) => 0.5 - Math.random());
    console.log(participantsBarrejats);

    //console.log(participantsBarrejats[0].nom)
    //console.log(goku.infoPersonatge)

    //ASSIGNA PLAYERS SEGONS SORTEIG DE participantsBarrejats
    player1 = participantsBarrejats[0];
    console.log(player1.nom);
    console.log(player1.resposta1);
    console.log(player1.respostacorrecte1);
    player2 = participantsBarrejats[1];
    player3 = participantsBarrejats[2];
    player4 = participantsBarrejats[3];
    player5 = participantsBarrejats[4];
    player6 = participantsBarrejats[5];
    player7 = participantsBarrejats[6];


    // MOSTRA L'OBJECTE ASSOCIAT A CADA PLAYER
    console.log(humanNamePlayer);
    console.log(player1.nom);
    console.log(player2.nom);
    console.log(player3.nom);
    console.log(player4.nom);
    console.log(player5.nom);
    console.log(player6.nom);
    console.log(player7.nom);

    document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
    document.getElementById('score').innerHTML = `SCORE: ${score}`;
    document.getElementById('content').innerHTML=`
    <div class="container">
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                <div class="btn btn-light btn-lg btn-block">QUARTS DE FINAL</div>
            </div>
        </div>

            <div class="row">

                <div class="col-5 col-md-2">
                    <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${infoUsuari.avatar}.png' height = '250' class="centrar" >
                    <h3>${infoUsuari.nom}</h3>
                    </div>
                </div>

                <div class="col-2 col-md-1">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/versus3.png' height = '200' class="centrar" >
                        
                    </div>
                </div>


                <div class="col-5 col-md-2">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${player1.nom}.png' height = '250' class="centrar" >
                        <h3>${player1.nom}</h3>
                        
                    </div>
                </div>
                
                <div class="col-12 col-md-2"></div>

                <div class="col-5 col-md-2">
                    <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${player2.nom}.png' height = '250' class="centrar" >
                    <h3>${player2.nom}</h3>
                    </div>
                </div>

                <div class="col-2 col-md-1">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/versus3.png' height = '200' class="centrar" >
                        
                    </div>
                </div>


                <div class="col-5 col-md-2">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${player3.nom}.png' height = '250' class="centrar" >
                        <h3>${player3.nom}</h3>
                    </div>
                </div>
            </div>

            <div class="d-grid gap-2">
                <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                    <a class="btn btn-success btn-lg btn-block" onclick="quarts()">INICI DEL TORNEIG</a>
                </div>
            </div>

            <div class="row">

                <div class="col-5 col-md-2">
                    <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${player4.nom}.png' height = '250' class="centrar" >
                    <h3>${player4.nom}</h3>
                    </div>
                </div>

                <div class="col-2 col-md-1">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/versus3.png' height = '200' class="centrar" >
                        
                    </div>
                </div>


                <div class="col-5 col-md-2">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${player5.nom}.png' height = '250' class="centrar" >
                        <h3>${player5.nom}</h3>
                        
                    </div>
                </div>
                
                <div class="col-12 col-md-2"></div>

                <div class="col-5 col-md-2">
                    <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${player6.nom}.png' height = '250' class="centrar" >
                    <h3>${player6.nom}</h3>
                    </div>
                </div>

                <div class="col-2 col-md-1">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/versus3.png' height = '200' class="centrar" >
                        
                    </div>
                </div>


                <div class="col-5 col-md-2">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${player7.nom}.png' height = '250' class="centrar" >
                        <h3>${player7.nom}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `
}

function quarts(){

    if(cronometre == 0){
	startClock();
    }
    
    	

    console.log(nomUsuari);
    console.log(player1.nom);
    console.log(player1.pregunta1);
    console.log(player1.resposta1);
    console.log(player1.resposta1.length);

    //FEM ARRAY AMB LES 3 POSSIBILITATS DE PREGUNTA, RESPOSTA I CORRECTE, I LI ASSIGNEM UN RANDOM ALEATORI PER ANAR CANVIANT LES COMBINACIONS DE PREGUNTES

    totesLesPreguntes = [player1.pregunta1, player1.pregunta2, player1.pregunta3];
    totesLesRespostes = [player1.resposta1, player1.resposta2, player1.resposta3];
    totesLesCorrectes = [player1.respostacorrecte1, player1.respostacorrecte2, player1.respostacorrecte3];
    aleatori= Math.round(Math.random()*2); //NUMERO ALEATORI ENTRE 0 I 2 (INCLOSOS)
    console.log(aleatori);
    preguntaAleatoria=totesLesPreguntes[aleatori];
    respostaAleatoria = totesLesRespostes[aleatori];
    correcteAleatoria = totesLesCorrectes[aleatori];

    console.log(preguntaAleatoria);
    console.log(respostaAleatoria);
    console.log(correcteAleatoria);
    

    //alert('quarts');

    if(respostaAleatoria.length != 4){
        //alert('nomes una opció');
        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = `SCORE: ${score}`;
        document.getElementById('content').innerHTML = `
        <div class="container">
            <div class="d-grid gap-2">
                <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                    <div class="btn btn-light btn-lg btn-block">QUARTS DE FINAL</div>
                </div>
            </div>
            <div class="row pt-5">
                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${nomUsuari}.png' height = '400'> </img>
                    </div>
                </div>
                <div class="col-md-2">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                    </div>
                </div>

                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${player1.nom}.png' height = '400'> </img>
                    </div>
                </div>
                <h3>${preguntaAleatoria}</h3>
                </div>
                <div class="d-grid gap-2">
                    <div style="margin-left: auto; margin-right: auto; padding-top: 10px;">
                        <form>
                            <div>
                                <input type="text" id="resposta" placeholder="Resposta" class="form-control">    
                            </div>

                            <div class="d-grid gap-2">
                                <button type="submit" onclick="checkAnswerQuarts()" class="btn btn-primary btn-block">
                                    Acceptar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`
        

    }else{
        
        let respostes1Barrejades = respostaAleatoria.sort((a, b) => 0.5 - Math.random());
        console.log(respostes1Barrejades);
        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = `SCORE: ${score}`;
        document.getElementById('content').innerHTML = `
        <div class="container">
            <div class="d-grid gap-2">
                <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                    <div class="btn btn-light btn-lg btn-block">QUARTS DE FINAL</div>
                </div>
            </div>
            <div class="row pt-5">
                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${nomUsuari}.png' height = '400'> </img>
                    </div>
                </div>
                <div class="col-md-2">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                    </div>
                </div>
                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${player1.nom}.png' height = '400'> </img>
                    </div>
                </div>
                <h3>${preguntaAleatoria}</h3>
                </div>
                <div class="row pt-3">
                    <div style="display: inline-block; text-align: center;">

                        <button id= "opcio1" type="button" onclick=checkMultiAnswerQuarts(opcio1) value="${respostes1Barrejades[0]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[0]}</button>

                        <button id= "opcio2" type="button" onclick=checkMultiAnswerQuarts(opcio2) value="${respostes1Barrejades[1]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[1]}</button>

                        <button id= "opcio3" type="button" onclick=checkMultiAnswerQuarts(opcio3) value="${respostes1Barrejades[2]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[2]}</button>

                        <button id= "opcio4" type="button" onclick=checkMultiAnswerQuarts(opcio4) value="${respostes1Barrejades[3]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[3]}</button>
                    </div>
                </div>
            </div>
        </div>`
    }

}

function checkAnswerQuarts(){

    resposta = document.getElementById('resposta').value;
    resposta = resposta.toLowerCase();
    console.log(resposta);
    console.log(correcteAleatoria);
    if(resposta == correcteAleatoria){
        score +=100;
        //alert('CORRECTE');
        correcteQuarts();   
    }else{
	    getTimeClock();
        stopClock();
        saveScore();
        //alert('INCORRECTE. Torna a començar');
        incorrecteQuarts();
    }
}

function checkMultiAnswerQuarts(id){

    console.log(id.value);
    console.log(id);
    console.log(correcteAleatoria);
    if(id.value === correcteAleatoria){
        score +=100;
        //alert('CORRECTE');
        correcteQuarts();            
    }else{
	    getTimeClock();
        stopClock();
        saveScore();
	    //alert('INCORRECTE. Torna a començar');
        incorrecteQuarts();
    }
}

function correcteQuarts(){
    document.getElementById('content').innerHTML=`
    <div class="container">
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                <div class="btn btn-light btn-lg btn-block">QUARTS DE FINAL</div>
            </div>
        </div>
        <div class="row pt-5">
            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${nomUsuari}.png' height = '400'> </img>
                </div>
            </div>
            <div class="col-md-2">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                </div>
            </div>

            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${player1.nom}.png' height = '400'> </img>
                </div>
            </div>
            <h3>CORRECTE!</h3>
            <h3>Has guanyat 100 punts</h3>
            </div>
            <div class="d-grid gap-2">
                <div style="margin-left: auto; margin-right: auto; padding-top: 10px;">
                    <div class="d-grid gap-2">
                        <button type="submit" onclick="quadreSemifinals()" class="btn btn-lg btn-success btn-block">SEGÜENT RONDA</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `

}

function incorrecteQuarts(){
    document.getElementById('content').innerHTML=`
    <div class="container">
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                <div class="btn btn-light btn-lg btn-block">QUARTS DE FINAL</div>
            </div>
        </div>
        <div class="row pt-5">
            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${nomUsuari}.png' height = '400'> </img>
                </div>
            </div>
            <div class="col-md-2">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                </div>
            </div>

            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${player1.nom}.png' height = '400'> </img>
                </div>
            </div>
            <h3>INCORRECTE</h3>
            <h3>En ${player1.nom} t'ha eliminat del torneig. Has aconseguit ${score} punts.</h3>
            </div>
            <div class="row pt-3">
                <div style="display: inline-block; text-align: center;">

                    <button type="button" onclick=avatar() class="btn btn-lg btn-success mt-1">TORNAR A JUGAR</button>

                    <button type="button" onclick=location.reload(true) class="btn btn-lg btn-success mt-1">INICI</button>

                </div>
            </div>
        </div>
    </div>

    `

}

function quadreSemifinals(){	
    document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
    document.getElementById('score').innerHTML = `SCORE: ${score}`;
    document.getElementById('content').innerHTML=`
    <div class="container">
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                <div class="btn btn-light btn-lg btn-block">SEMIFINALS</div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-5 col-md-2">
                <div style="margin-left: 50px; display:inline">
                <img src = 'static/img/${infoUsuari.avatar}.png' height = '250' class="centrar" >
                <h3>${infoUsuari.nom}</h3>
                </div>
            </div>

            <div class="col-2 col-md-1">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/versus3.png' height = '200' class="centrar" >
                    
                </div>
            </div>


            <div class="col-5 col-md-2">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${player2.nom}.png' height = '250' class="centrar" >
                    <h3>${player2.nom}</h3>
                    
                </div>
            </div>
            
            <div class="col-12 col-md-2"></div>

            <div class="col-5 col-md-2">
                <div style="margin-left: 50px; display:inline">
                <img src = 'static/img/${player4.nom}.png' height = '250' class="centrar" >
                <h3>${player4.nom}</h3>
                </div>
            </div>

            <div class="col-2 col-md-1">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/versus3.png' height = '200' class="centrar" >
                    
                </div>
            </div>

            <div class="col-5 col-md-2">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${player6.nom}.png' height = '250' class="centrar" >
                    <h3>${player6.nom}</h3>
                </div>
            </div>
            <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                <a class="btn btn-success btn-lg btn-block" onclick="semifinals()">SOM-HI!</a>
            </div>
        </div>

    </div>

    `
}

function semifinals(){
    //FEM ARRAY AMB LES 3 POSSIBILITATS DE PREGUNTA, RESPOSTA I CORRECTE, I LI ASSIGNEM UN RANDOM ALEATORI PER ANAR CANVIANT LES COMBINACIONS DE PREGUNTES

    totesLesPreguntes = [player2.pregunta1, player2.pregunta2, player2.pregunta3];
    totesLesRespostes = [player2.resposta1, player2.resposta2, player2.resposta3];
    totesLesCorrectes = [player2.respostacorrecte1, player2.respostacorrecte2, player2.respostacorrecte3];
    aleatori= Math.round(Math.random()*2); //NUMERO ALEATORI ENTRE 0 I 2 (INCLOSOS)
    console.log(aleatori);
    preguntaAleatoria=totesLesPreguntes[aleatori];
    respostaAleatoria = totesLesRespostes[aleatori];
    correcteAleatoria = totesLesCorrectes[aleatori];

    console.log(preguntaAleatoria);
    console.log(respostaAleatoria);
    console.log(correcteAleatoria);
    

    //alert('quarts');

    if(respostaAleatoria.length != 4){
        //alert('nomes una opció');
        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = `SCORE: ${score}`;
        document.getElementById('content').innerHTML = `
        <div class="container">
            <div class="d-grid gap-2">
                <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                    <div class="btn btn-light btn-lg btn-block">SEMIFINALS</div>
                </div>
            </div>
            <div class="row pt-5">
                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${nomUsuari}.png' height = '400'> </img>
                    </div>
                </div>
                <div class="col-md-2">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                    </div>
                </div>
                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${player2.nom}.png' height = '400'> </img>
                    </div>
                </div>
                <h3>${preguntaAleatoria}</h3>
                </div>
                <div class="d-grid gap-2">
                    <div style="margin-left: auto; margin-right: auto; padding-top: 10px;">
                        <form>
                            <div>
                                <input type="text" id="resposta" placeholder="Resposta" class="form-control">    
                            </div>

                            <div class="d-grid gap-2">
                                <button type="submit" onclick="checkAnswerSemifinals()" class="btn btn-primary btn-block">
                                    Acceptar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`
        

    }else{
        
        let respostes1Barrejades = respostaAleatoria.sort((a, b) => 0.5 - Math.random());
        console.log(respostes1Barrejades);
        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = `SCORE: ${score}`;
        document.getElementById('content').innerHTML = `
        <div class="container">
            <div class="d-grid gap-2">
                <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                    <div class="btn btn-light btn-lg btn-block">SEMIFINALS</div>
                </div>
            </div>
            <div class="row pt-5">
                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${nomUsuari}.png' height = '400'> </img>
                    </div>
                </div>
                <div class="col-md-2">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                    </div>
                </div>
                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${player2.nom}.png' height = '400'> </img>
                    </div>
                </div>
                <h3>${preguntaAleatoria}</h3>
                </div>
                <div class="row pt-3">
                    <div style="display: inline-block; text-align: center;">

                        <button id= "opcio1" type="button" onclick=checkMultiAnswerSemifinals(opcio1) value="${respostes1Barrejades[0]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[0]}</button>

                        <button id= "opcio2" type="button" onclick=checkMultiAnswerSemifinals(opcio2) value="${respostes1Barrejades[1]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[1]}</button>

                        <button id= "opcio3" type="button" onclick=checkMultiAnswerSemifinals(opcio3) value="${respostes1Barrejades[2]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[2]}</button>

                        <button id= "opcio4" type="button" onclick=checkMultiAnswerSemifinals(opcio4) value="${respostes1Barrejades[3]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[3]}</button>
                    </div>
                </div>
            </div>
        </div>`
    }
}

function checkAnswerSemifinals(){

    resposta = document.getElementById('resposta').value;
    resposta = resposta.toLowerCase();
    console.log(resposta);
    console.log(correcteAleatoria);
    if(resposta == correcteAleatoria){
        score +=250;
        //alert('CORRECTE. Cap a la final!');
        quadreFinal();   
    }else{
	    getTimeClock();
        stopClock();
        saveScore();
        //alert('INCORRECTE. Torna a començar');
        incorrecteSemis();
    }
}

function checkMultiAnswerSemifinals(id){

    console.log(id.value);
    console.log(id);
    console.log(correcteAleatoria);
    if(id.value === correcteAleatoria){
        score +=250;
        //alert('CORRECTE. Cap a la final!');
        correcteSemis();            
    }else{
	    getTimeClock();
        stopClock();
        saveScore();
        //alert('INCORRECTE. Torna a començar');
        incorrecteSemis();
    }
}

function correcteSemis(){
    document.getElementById('content').innerHTML=`
    <div class="container">
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                <div class="btn btn-light btn-lg btn-block">SEMIFINALS</div>
            </div>
        </div>  
        <div class="row pt-5">
            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${nomUsuari}.png' height = '400'> </img>
                </div>
            </div>
            <div class="col-md-2">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                </div>
            </div>

            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${player2.nom}.png' height = '400'> </img>
                </div>
            </div>
            <h3>CORRECTE!</h3>
            <h3>Has guanyat 250 punts</h3>
            </div>
            <div class="d-grid gap-2">
                <div style="margin-left: auto; margin-right: auto; padding-top: 10px;">
                    <div class="d-grid gap-2">
                        <button type="submit" onclick="quadreFinal()" class="btn btn-success btn-block">SEGÜENT RONDA</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `

}

function incorrecteSemis(){
    document.getElementById('content').innerHTML=`
    <div class="container">
    <div class="d-grid gap-2">
        <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
            <div class="btn btn-light btn-lg btn-block">SEMIFINALS</div>
        </div>
    </div>
        <div class="row pt-5">
            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${nomUsuari}.png' height = '400'> </img>
                </div>
            </div>
            <div class="col-md-2">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                </div>
            </div>

            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${player2.nom}.png' height = '400'> </img>
                </div>
            </div>
            <h3>INCORRECTE</h3>
            <h3>En ${player2.nom} t'ha eliminat del torneig. Has aconseguit ${score} punts.</h3>
            </div>
            <div class="row pt-3">
                <div style="display: inline-block; text-align: center;">

                    <button type="button" onclick=avatar() class="btn btn-lg btn-success mt-1">TORNAR A JUGAR</button>

                    <button type="button" onclick=location.reload(true) class="btn btn-lg btn-success mt-1">INICI</button>

                </div>
            </div>
        </div>
    </div>

    `

}

function quadreFinal(){
    document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
    document.getElementById('score').innerHTML = `SCORE: ${score}`;
    document.getElementById('content').innerHTML=`
    <div class="container">
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                <div class="btn btn-light btn-lg btn-block">FINAL</div>
            </div>
        </div>  
        <div class="row">

            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${infoUsuari.avatar}.png' height = '400' class="centrar" >
                </div>
            </div>
    
            <div class="col-md-2">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                </div>
            </div>
    
    
            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${player6.nom}.png' height = '400' class="centrar" >
                </div>
            </div>
        
        
            </div>
            <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                <a class="btn btn-success btn-lg btn-block" onclick="final()">QUE COMENCI LA FINAL!</a>
            </div>
        </div>
    </div>
    `
}

function final(){

    //FEM ARRAY AMB LES 3 POSSIBILITATS DE PREGUNTA, RESPOSTA I CORRECTE, I LI ASSIGNEM UN RANDOM ALEATORI PER ANAR CANVIANT LES COMBINACIONS DE PREGUNTES

    totesLesPreguntes = [player6.pregunta1, player6.pregunta2, player6.pregunta3];
    totesLesRespostes = [player6.resposta1, player6.resposta2, player6.resposta3];
    totesLesCorrectes = [player6.respostacorrecte1, player6.respostacorrecte2, player6.respostacorrecte3];
    aleatori= Math.round(Math.random()*2); //NUMERO ALEATORI ENTRE 0 I 2 (INCLOSOS)
    console.log(aleatori);
    preguntaAleatoria=totesLesPreguntes[aleatori];
    respostaAleatoria = totesLesRespostes[aleatori];
    correcteAleatoria = totesLesCorrectes[aleatori];

    console.log(preguntaAleatoria);
    console.log(respostaAleatoria);
    console.log(correcteAleatoria);
    

    //alert('quarts');

    if(respostaAleatoria.length != 4){
        //alert('nomes una opció');
        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = `SCORE: ${score}`;
        document.getElementById('content').innerHTML = `
        <div class="container">
            <div class="d-grid gap-2">
                <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                    <div class="btn btn-light btn-lg btn-block">FINAL</div>
                </div>
            </div>  
            <div class="row">

                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${infoUsuari.avatar}.png' height = '400' class="centrar" >
                    </div>
                </div>
        
                <div class="col-md-2">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                    </div>
                </div>
        
        
                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${player6.nom}.png' height = '400' class="centrar" >
                    </div>
                </div>


                <h3>${preguntaAleatoria}</h3>

                <div class="d-grid gap-2">
                    <div style="margin-left: auto; margin-right: auto; padding-top: 10px;">
                        <form>
                            <div>
                                <input type="text" id="resposta" placeholder="Resposta" class="form-control">    
                            </div>

                            <div class="d-grid gap-2">
                                <button type="submit" onclick="checkAnswerFinal()" class="btn btn-primary btn-block">
                                    Acceptar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`
        

    }else{
        
        let respostes1Barrejades = respostaAleatoria.sort((a, b) => 0.5 - Math.random());
        console.log(respostes1Barrejades);
        document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
        document.getElementById('score').innerHTML = `SCORE: ${score}`;
        document.getElementById('content').innerHTML = `
        <div class="container">
            <div class="d-grid gap-2">
                <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                    <div class="btn btn-light btn-lg btn-block">FINAL</div>
                </div>
            </div>  
            <div class="row">

                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${infoUsuari.avatar}.png' height = '400' class="centrar" >
                    </div>
                </div>
        
                <div class="col-md-2">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                    </div>
                </div>
        
        
                <div class="col-md-5">
                    <div style="margin-left: 50px; display:inline">
                        <img src = 'static/img/${player6.nom}.png' height = '400' class="centrar" >
                    </div>
                </div>

                <h3>${preguntaAleatoria}</h3>

                <div class="row pt-3">
                    <div style="display: inline-block; text-align: center;">

                        <button id= "opcio1" type="button" onclick=checkMultiAnswerFinal(opcio1) value="${respostes1Barrejades[0]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[0]}</button>

                        <button id= "opcio2" type="button" onclick=checkMultiAnswerFinal(opcio2) value="${respostes1Barrejades[1]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[1]}</button>

                        <button id= "opcio3" type="button" onclick=checkMultiAnswerFinal(opcio3) value="${respostes1Barrejades[2]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[2]}</button>

                        <button id= "opcio4" type="button" onclick=checkMultiAnswerFinal(opcio4) value="${respostes1Barrejades[3]}" class="btn btn-lg btn-success mt-1">${respostes1Barrejades[3]}</button>
                    </div>
                </div>
            </div>
        </div>`
    }
}

function checkAnswerFinal(){

    resposta = document.getElementById('resposta').value;
    resposta = resposta.toLowerCase();
    console.log(resposta);
    console.log(correcteAleatoria);
    if(resposta == correcteAleatoria){
        score +=500;
	if(level<5){
        campio();
	}else{
	console.log('campio total')
	campioTotal();
	}
    }else{
	    getTimeClock();
        stopClock();
        saveScore();
        //alert('INCORRECTE. Torna a començar');
        incorrecteFinal();
    }
}

function checkMultiAnswerFinal(id){

    console.log(id.value);
    console.log(id);
    console.log(correcteAleatoria);
    if(id.value === correcteAleatoria){
        score +=500;
	if(level<5){
        campio();
	}else{
	campioTotal();
	}         
    }else{
	    getTimeClock();
        stopClock();
        saveScore();
        //alert('INCORRECTE. Torna a començar');
        incorrecteFinal();
    }
}

function incorrecteFinal(){
    document.getElementById('content').innerHTML=`
    <div class="container">
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                <div class="btn btn-light btn-lg btn-block">FINAL</div>
            </div>
        </div>  
        <div class="row pt-5">
            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${nomUsuari}.png' height = '400'> </img>
                </div>
            </div>
            <div class="col-md-2">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/versus3.png' height = '300' class="centrar" >
                </div>
            </div>

            <div class="col-md-5">
                <div style="margin-left: 50px; display:inline">
                    <img src = 'static/img/${player6.nom}.png' height = '400'> </img>
                </div>
            </div>
            <h3>INCORRECTE</h3>
            <h3>En ${player6.nom} t'ha eliminat del torneig. Has aconseguit ${score} punts.</h3>
            </div>
            <div class="row pt-3">
                <div style="display: inline-block; text-align: center;">

                    <button type="button" onclick=avatar() class="btn btn-lg btn-success mt-1">TORNAR A JUGAR</button>

                    <button type="button" onclick=location.reload(true) class="btn btn-lg btn-success mt-1">INICI</button>

                </div>
            </div>
        </div>
    </div>

    `

}

function campio(){
	getTimeClock();
    document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
    document.getElementById('score').innerHTML = `SCORE: ${score}`;
    document.getElementById('content').innerHTML = `
    <div class="container">
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                <div class="btn btn-light btn-lg btn-block">CAMPIÓ!</div>
            </div>
        </div>  
        <div class="row">

            <div class="col-12 col-md-12">
                <div style="margin-left: 50px; display:inline">
                <img src = 'static/img/${infoUsuari.avatar}.png' height = '400' class="centrar" >
                </div>
            </div>
        </div>

        <h3>CORRECTE!</h3>
        <h3>HAS GUANYAT 500 PUNTS</h3>

        <div class="row pt-3">
            <div style="display: inline-block; text-align: center;">

                <button id= "opcio1" type="button" onclick=pujarNivell() class="btn btn-lg btn-success mt-1">PUJAR DE NIVELL</button>

                <button id= "opcio3" type="button" onclick=saveScoreAndGoLanding() class="btn btn-lg btn-success mt-1">SORTIR</button>

            </div>
        </div>
            
            
    </div>`
        
}

function campioTotal(){
	console.log('campio total');
	getTimeClock();
	saveScore();
        stopClock(); 
    	goku = new Personatge('Goku', 'static/img/goku.png','Qui és el primer mestre d\'en Goku',['Avi Gohan', 'Follet Tortuga', 'Yamcha', 'Tau Pai Pai'], 'Què li passa al Goku amb la lluna plena?',['Es transforma en un mico gegant', 'Perd la força', 'S\'adorm fins al dia següent','Es transforma en super guerrer'], 'Quantes estrelles té la primera bola de drac d\'en Goku?', [4]);
	krillin = new Personatge('Krillin', 'static/img/krillin.png', 'Quants puntets té al front, en Krillin?', [6],'De quina religió és en Krillin?',['Budisme','Hinduisme','Taoisme','No és de cap religió'], 'Qui elimina en Krillin en el primer torneig d\'arts marcials?',['Jackie Chun','Goku','Yamcha','Nam']);
	jackieChun = new Personatge('Jackie Chun', 'static/img/jackie chun.png','On viu en Jackie Chun?',['Kame House','Kame Home','Kame Hame','Muten House'], 'Què destrossa en Jackie Chun?',['La lluna','El ring','La graderia','El gong'], 'En quina posició queda en Jackie Chun al primer torneig de la sèrie?',['Campió', 'Sots campió','Tercer','No hi participa']);
	yamcha = new Personatge('Yamcha','static/img/yamcha.png', 'Com es diu el millor amic d\'en Yamcha?', ['Puar','Ulong','Bulma','Goku'],'Quin és l\'atac preferit d\'en Yamcha?',['L\'atac del puny d\'ullals de llop','La mossegada del llop','La picada de la cobra','Les urpes del tigre'], 'Qui elimina en Yamcha al primer torneig?',['Jackie Chun','Goku','Krillin','Bacterian']);
	nam = new Personatge('Nam', 'static/img/nam.png', 'Quants participants hi ha al torneig?', ['137', '85', '8', '457'], 'Per què en Nam vol guanyar el torneig?',['Per comprar aigua pel seu poblat','Per pagar els deutes de la seva familia','Per aconseguir el reconeixemenent de la seva tribu','Per poder tornar a casa, amb la seva familia'], 'A qui derrota en Nam a la primera eliminatòria?', ['Ranfan','Giran','Bacterian','Yamcha'],);
	bacterian = new Personatge('Bacterian', 'static/img/bacterian.png', 'Quantes vegades s\'ha dutxat en Bacterian en tota la vida?', ['Cap','Una vegada, per accident', 'Una vegada, quan va néixer', 'Es dutxa habitualment'], 'Com aconsegueix en Krillin esquivar la pudor d\'en Bacterian?',['S\'adona que no té nas i, per tant, no olora res','Conté la respiració', 'Fa meditació i aconsegueix no olorar res', 'Li tira un cubell d\'aigua per netejar-lo'], 'Què fa servir el comentarista del combat per protegir-se de la pudor d\'en Bacterian?', ['Una màscara de radioactivitat','Una mascareta FFP3','Una pinça','Un mocador'],);
	ranfan = new Personatge('Ranfan', 'static/img/ranfan.png', 'Qui elimina la Ranfan?', ['Nam','Giran','Krillin','Jackie Chun'], 'En quin personatge d\'El Doctor Slump està inspirada la Ranfan?',['Renault Citroën','Arale Norimaki','Midori Yamabuki','Akane Kimidori'], 'Què fa la Ranfan per distreure els adversaris?', ['Es despulla','Els fa un petó als llavis','Els susurra a la orella','Els ensenya un pit'],);
	giran = new Personatge('Giran', 'static/img/giran.png', 'Quina tècnica fa servir en Giran contra en Goku?', ['La cola de Guru-Guru','El salt Pinoral', 'El cop de puny de l\'òs','La fiblada de cua' ], 'Com es rendeix en Giran contra en Goku?',['Treu una bandera blanca','Abandona voluntàriament el ring','Es posa a plorar demanant clemència','Se\'n va volant mort de por' ], 'Per què s\'ajorna el combat entre en Goku i en Giran fins el dia següent?', ['Perquè es posa a ploure', 'Perquè no apareix l\'àrbitre','Perquè en Goku es queda adormit','Perquè no apareix el públic'],);
		
    document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
    document.getElementById('score').innerHTML = `SCORE: ${score}`;
    document.getElementById('content').innerHTML = `
    <div class="container">
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
                <div class="btn btn-light btn-lg btn-block">CAMPIÓ TOTAL!</div>
            </div>
        </div> 
        <div class="row">

            <div class="col-12 col-md-12">
                <div style="margin-left: 50px; display:inline">
                <img src = 'static/img/${infoUsuari.avatar}.png' height = '400' class="centrar" >
                </div>
            </div>
        </div>

    
        <div class="d-grid gap-2">
            <div style="margin-left: auto; margin-right: auto; padding-top: 10px;">
                <div class="btn btn-light btn-lg btn-block">Has aconseguit la màxima puntuació: ${score} punts, en ${minutesAndSeconds}. Ets capaç de millorar el teu temps?</div>
            </div>
        </div> 


        <div class="row pt-3">
            <div style="display: inline-block; text-align: center;">

                <button id= "opcio1" type="button" onclick=avatar() class="btn btn-lg btn-success mt-1">TORNAR A JUGAR</button>

                <button id= "opcio3" type="button" onclick=location.reload(true) class="btn btn-lg btn-success mt-1">SORTIR</button>

            </div>
        </div>
            
            
    </div>`
        
}


function pujarNivell(){
    //alert('pujar nivell');
    nameAvatar = infoUsuari.avatar;
    console.log(nameAvatar);

    	switch(level){
            case 1:
            	goku.levelUp('Quin actor de doblatge posa veu al primer Goku?',['Maria Moscardó','Mònica Padrós','Joan Ferrer', 'Manuel Rodríguez'],'Quina tècnica fa servir en Goku a la final del torneig?',['La del mico', 'La del borratxo', 'La del despistat', 'La del ballarí'],'Com acaba en Goku la final del torneig?',['Despullat','Begut','Plorant','Menjant']);
            	krillin.levelUp('Com es diu el temple on en Krillin comença els seus entrenaments?',['Orin','Yangon','Taktsang','Tian Tan'],'En quin any neix en Krillin?',['736','745','1986','556'],'Qui s\'enfronta a algun antic company de temple d\'en Krillin?',['Krillin i Yamcha','Krillin','Yamcha','Ningú']);
            	jackieChun.levelUp('Quina tècnica fa servir en Jackie Chun contra en Goku?',['El puny borratxo','El ball de la tortuga','L\'atac d\'en Kaito','El ball verd'],'Com derrota en Jackie Chun a en Yamcha?',['Amb una ràfega de vent que el fa caure del ring','Amb un kame hame que el fa caure del ring','En Yamcha es rendeix','Amb la tècnica del borratxo'],'Què li passa a en Jackie Chun quan la Ranfan es despulla',['Li surt sang del nas','Se li cau la baba','Es desmaia','Li vol tocar el cul']);
            	yamcha.levelUp('Com cau eliminat en Yamcha a mans d\en Jackie Chun?',['El llença fora del ring','El deixa KO amb un cop a l\'esquena','El deixa estabornit amb un kame hame','En Jackie Chun mai ha eliminat en Yamcha'],'Quin actor de doblatge posa la veu al primer Yamcha?',['Jordi Ribes','Raul Castellano','Moisés Lara', 'Edgar Reig'],'Quin nom té el significat de \'Yamcha\' en japonès?',['Beure te','Llop solitari','Home del desert','Lluitador d\'arts marcials']);
            	bacterian.levelUp('Quantes dents té en Bacterian?',['13','3','5','Cap'],'Com cau fulminat en Bacterian al torneig?',['En Krillin es tira un pet a la seva cara', 'En Krillin li fa olorar el seu propi alè', 'En Yamcha el llença fora del ring', 'Cau desmaiat mirant una foto d\'una noia despullada'],'Quin és el passatemps preferit d\'en Bacterian?', ['Entrenar mosques','Tirar-se pets','Ensumar-se l\'alè','Matar rates']);
            	nam.levelUp('Quantes cisternes d\'aigua hi ha a la càpsula que li dona a en Nam en Follet tortuga?',[2],'Qui captura en Nam quan va en buscar aigua pel seu poble?',['Un pterodàctil','En Giran','Una àguila imperial','En Tambourine'],'Amb quina tècnica en Nam està a punt de guanyar en Goku?',['Atac aeri amb els braços creuats','Ki Sense','Shura Gekiretsuken', 'Tècnica de l\'imatge residual']);
            	ranfan.levelUp('Com es diu l\'atac de la Ranfan?',['El puny de calor', 'La patada sensual', 'El cop de puny sexy', 'La voltereta de l\'amor'],'Quin estil de lluita fa servir la Ranfan?',['Aikido', 'Jiu-jitsu','Karate','Taekwondo'],'Quin número treu la Ranfan als emparellaments del quadre final del torneig?',['6','3','5','8']);
            	giran.levelUp('Quan pesa en Giran?',['211 kg','500 kg', '908kg', '146 kg'],'Per què comença tard el combat entre en Giran i en Goku?',['En Goku està dormint','En Giran està acabant d\'esmorzar','S\'ha de netejar el ring','En Giran vol posar nerviós en Goku'],'En quin any neix en Giran?',['717','859','763','523']);
            	break;
            case 2:
            	goku.levelUp('Quin número li toca a en Goku a les eliminatòries del primer torneig?',['70', '85', '43', '14'],'Quina edat té en Goku al 21è Torneig de les Arts Marcials?',['12','15','9','10'],'Qui salva en Goku de sortir del ring quan s\'enfronta a en Gillian?',[' El núvol Kinton','La Bulma','En Krillin','Fa un kame hame']);
            	krillin.levelUp('Quin número li toca a en Krillin a les eliminatòries del primer torneig?',['93', '23', '98', '56'],'Quin significat tenen els 6 punts al cap d\'en Krillin?',['Són un ritual de l\'ordre xinesa Foguangshan','Serveixen per espantar els 6 dimonis de l\'infern','Va ser una aposta perduda amb els seus antics companys d\'entrenament','No tenen cap significat conegut'],'Quina edat té en Krillin al 21è Torneig de les Arts Marcials?',['13','16','11','9']);
            	jackieChun.levelUp('En quin any neix en Jackie Chun?',['430','524','1709','895'],'Quan triga a ser reconstruida la lluna després que en Jackie Chun la destrueixi?',['8 anys','2 mesos','30 anys','En realitat mai la destrueix'],'Qui és el primer que sospita sobre la verdadera identitat d\'en Jackie Chun?',['Yamcha','Goku','Krillin','Bulma']);
            	yamcha.levelUp('En quin any neix en Yamcha?',['733','890','234','1989'],'Més endavant, quin esport pratica en Yamcha?',['Beisbol','Futbol','Tenis','Rugbi'],'Quan medeix en Yamcha?',['1,83','1,92', '1,86', '1,76']);
            	bacterian.levelUp('Quan medeix en Bacterian',['2,13', '2,56', '2,98', '3,34'],'Quan pesa en Bacterian?',['196,5 kg','289,5 kg','145 kg','No se sap'],'On apareix el Bacterian quan el ressucita en Sheron?',['Deixalleria','Desert','Cementiri','Mai ressucita']);
            	nam.levelUp('Qui assassina en Nam poc després del 22è torneig d\'Arts Marcials?',['Tambourine','Cor Petit','Tau Pai Pai','Pamputt'],'Finalment, què salva el poble d\'en Nam de la sequera?',['El llac màgic','La cascada màgica','El riu sagrat','L\'oasi del cel'],'Quin nom té el puntet del front d\'en Nam?',['Bindi','Pinti','Ring','Sindi']);
            	ranfan.levelUp('Quan medeix la Ranfan?',['1,68', '1,73', '1,57', '1,79'],'Quina edat té la Ranfan quan participa al torneig?',['23','17','28', '21'],'Com es diu el futur marit de la Ranfan?',['Trunks','Akira','Satan','No se sap']);
            	giran.levelUp('Amb què està enganxada la presa que construeix en Giran i que deixa sense aigua el poble d\'en Nam?',['Cola de Guru-Guru', 'Saliva de dinosaure', 'Baba de Shuu', 'No està enganxada amb res'],'Quan medeix en Giran?',['1,97','2,15','1,83','4,45'],'De quin color és la capa d\'en Giran quan està al bar?',['Blava','Vermella','Groga','Negra']);
            	break;
            case 3:
            	goku.levelUp('Quin actor de doblatge posa veu al primer Goku?',['Maria Moscardó','Mònica Padrós','Joan Ferrer', 'Manuel Rodríguez'],'Quina tècnica fa servir en Goku a la final del torneig?',['La del mico', 'La del borratxo', 'La del despistat', 'La del ballarí'],'Com acaba en Goku la final del torneig?',['Despullat','Begut','Plorant','Menjant']);
            	krillin.levelUp('Com es diu el temple on en Krillin comença els seus entrenaments?',['Orin','Yangon','Taktsang','Tian Tan'],'En quin any neix en Krillin?',['736','745','1986','556'],'Qui s\'enfronta a algun antic company de temple d\'en Krillin?',['Krillin i Yamcha','Krillin','Yamcha','Ningú']);
            	jackieChun.levelUp('Quina tècnica fa servir en Jackie Chun contra en Goku?',['El puny borratxo','El ball de la tortuga','L\'atac d\'en Kaito','El ball verd'],'Com derrota en Jackie Chun a en Yamcha?',['Amb una ràfega de vent que el fa caure del ring','Amb un kame hame que el fa caure del ring','En Yamcha es rendeix','Amb la tècnica del borratxo'],'Què li passa a en Jackie Chun quan la Ranfan es despulla',['Li surt sang del nas','Se li cau la baba','Es desmaia','Li vol tocar el cul']);
            	yamcha.levelUp('Com cau eliminat en Yamcha a mans d\en Jackie Chun?',['El llença fora del ring','El deixa KO amb un cop a l\'esquena','El deixa estabornit amb un kame hame','En Jackie Chun mai ha eliminat en Yamcha'],'Quin actor de doblatge posa la veu al primer Yamcha?',['Jordi Ribes','Raul Castellano','Moisés Lara', 'Edgar Reig'],'Quin nom té el significat de \'Yamcha\' en japonès?',['Beure te','Llop solitari','Home del desert','Lluitador d\'arts marcials']);
            	bacterian.levelUp('Quantes dents té en Bacterian?',['13','3','5','Cap'],'Com cau fulminat en Bacterian al torneig?',['En Krillin es tira un pet a la seva cara', 'En Krillin li fa olorar el seu propi alè', 'En Yamcha el llença fora del ring', 'Cau desmaiat mirant una foto d\'una noia despullada'],'Quin és el passatemps preferit d\'en Bacterian?', ['Entrenar mosques','Tirar-se pets','Ensumar-se l\'alè','Matar rates']);
            	nam.levelUp('Quantes cisternes d\'aigua hi ha a la càpsula que li dona a en Nam en Follet tortuga?',[2],'Qui captura en Nam quan va en buscar aigua pel seu poble?',['Un pterodàctil','En Giran','Una àguila imperial','En Tambourine'],'Amb quina tècnica en Nam està a punt de guanyar en Goku?',['Atac aeri amb els braços creuats','Ki Sense','Shura Gekiretsuken', 'Tècnica de l\'imatge residual']);
            	ranfan.levelUp('Com es diu l\'atac de la Ranfan?',['El puny de calor', 'La patada sensual', 'El cop de puny sexy', 'La voltereta de l\'amor'],'Quin estil de lluita fa servir la Ranfan?',['Aikido', 'Jiu-jitsu','Karate','Taekwondo'],'Quin número treu la Ranfan als emparellaments del quadre final del torneig?',['6','3','5','8']);
            	giran.levelUp('Quan pesa en Giran?',['211 kg','500 kg', '908kg', '146 kg'],'Per què comença tard el combat entre en Giran i en Goku?',['En Goku està dormint','En Giran està acabant d\'esmorzar','S\'ha de netejar el ring','En Giran vol posar nerviós en Goku'],'En quin any neix en Giran?',['717','859','763','523']);
            	break;
            case 4:
            	goku.levelUp('Quin número li toca a en Goku a les eliminatòries del primer torneig?',['70', '85', '43', '14'],'Quina edat té en Goku al 21è Torneig de les Arts Marcials?',['12','15','9','10'],'Qui salva en Goku de sortir del ring quan s\'enfronta a en Gillian?',[' El núvol Kinton','La Bulma','En Krillin','Fa un kame hame']);
            	krillin.levelUp('Quin número li toca a en Krillin a les eliminatòries del primer torneig?',['93', '23', '98', '56'],'Quin significat tenen els 6 punts al cap d\'en Krillin?',['Són un ritual de l\'ordre xinesa Foguangshan','Serveixen per espantar els 6 dimonis de l\'infern','Va ser una aposta perduda amb els seus antics companys d\'entrenament','No tenen cap significat conegut'],'Quina edat té en Krillin al 21è Torneig de les Arts Marcials?',['13','16','11','9']);
            	jackieChun.levelUp('En quin any neix en Jackie Chun?',['430','524','1709','895'],'Quan triga a ser reconstruida la lluna després que en Jackie Chun la destrueixi?',['8 anys','2 mesos','30 anys','En realitat mai la destrueix'],'Qui és el primer que sospita sobre la verdadera identitat d\'en Jackie Chun?',['Yamcha','Goku','Krillin','Bulma']);
            	yamcha.levelUp('En quin any neix en Yamcha?',['733','890','234','1989'],'Més endavant, quin esport pratica en Yamcha?',['Beisbol','Futbol','Tenis','Rugbi'],'Quan medeix en Yamcha?',['1,83','1,92', '1,86', '1,76']);
            	bacterian.levelUp('Quan medeix en Bacterian',['2,13', '2,56', '2,98', '3,34'],'Quan pesa en Bacterian?',['196,5 kg','289,5 kg','145 kg','No se sap'],'On apareix el Bacterian quan el ressucita en Sheron?',['Deixalleria','Desert','Cementiri','Mai ressucita']);
            	nam.levelUp('Qui assassina en Nam poc després del 22è torneig d\'Arts Marcials?',['Tambourine','Cor Petit','Tau Pai Pai','Pamputt'],'Finalment, què salva el poble d\'en Nam de la sequera?',['El llac màgic','La cascada màgica','El riu sagrat','L\'oasi del cel'],'Quin nom té el puntet del front d\'en Nam?',['Bindi','Pinti','Ring','Sindi']);
            	ranfan.levelUp('Quan medeix la Ranfan?',['1,68', '1,73', '1,57', '1,79'],'Quina edat té la Ranfan quan participa al torneig?',['23','17','28', '21'],'Com es diu el futur marit de la Ranfan?',['Trunks','Akira','Satan','No se sap']);
            	giran.levelUp('Amb què està enganxada la presa que construeix en Giran i que deixa sense aigua el poble d\'en Nam?',['Cola de Guru-Guru', 'Saliva de dinosaure', 'Baba de Shuu', 'No està enganxada amb res'],'Quan medeix en Giran?',['1,97','2,15','1,83','4,45'],'De quin color és la capa d\'en Giran quan està al bar?',['Blava','Vermella','Groga','Negra']);
            	break;
	   
	}
	level+=1;
    	sortejant(nameAvatar);
 
}


function startClock(){
	let l = document.getElementById("counter");
    l.innerHTML = `${'Time: '}` + cronometre;
    cronometre++;
    timer = setTimeout("startClock()",1000);
}

function stopClock(){
	clearTimeout(timer);
}

function resetClock(){
	let l = document.getElementById("counter");
	cronometre = 0;
    l.innerHTML = `${'Time: '}` + cronometre;
}

function getTimeClock(){

	let l = document.getElementById("counter");
	l.innerHTML = `${'Time: '}` + cronometre;
	tempsFinal = cronometre;
	console.log(tempsFinal);
    secondsToMinutes(tempsFinal);

}

function secondsToMinutes(){
    minutes = Math.floor(tempsFinal / 60);
    minutes = ("0" + minutes).slice(-2);
    seconds = tempsFinal % 60;
    seconds = ("0" + seconds).slice(-2);
    minutesAndSeconds = minutes + ':' + seconds;
    console.log(minutesAndSeconds)

}

/*function saveScore(){
    

    const finalScore = {
        avatar: infoUsuari.avatar,
        nom: humanNamePlayer,
        puntuacio: score,
        seconds: tempsFinal,
        time: minutesAndSeconds
    }
    //console.log(finalScore);

    if(localStorage.getItem('scoresList') == null){
        let scoresList = [];
        scoresList.push(finalScore);
        localStorage.setItem('scoresList', JSON.stringify(scoresList))
    }else{
        scoresList = JSON.parse(localStorage.getItem('scoresList'));
        //console.log(scoresList);
        scoresList.push(finalScore);
        localStorage.setItem('scoresList', JSON.stringify(scoresList))

    }
}*/


function saveScore(){

    //GUARDA L'SCORE FINAL A LA BBDD

    let finalScore=[infoUsuari.avatar, humanNamePlayer, score, tempsFinal, minutesAndSeconds];
    //const firstname = "Joan";
    //const lastname = "Ferrer";
    //const dict_values = {firstname, lastname} //Pass the javascript variables to a dictionary.  NO CAL//
    scoresBBDD = JSON.stringify(finalScore); // Stringify converts a JavaScript object or value to a JSON string
    console.log(scoresBBDD); // Prints the variables to console window, which are in the JSON format
    //alert(scoresBBDD)
    $.ajax({
        url:"/setBBDD",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(scoresBBDD)}); 
        console.log(scoresBBDD);
        //alert(scoresBBDD);

    // GUARDA L'SCORE FINAL AL LOCAL STORAGE

    finalScore = {
        avatar: infoUsuari.avatar,
        nom: humanNamePlayer,
        puntuacio: score,
        seconds: tempsFinal,
        time: minutesAndSeconds
    }
    //console.log(finalScore);

    if(localStorage.getItem('scoresList') == null){
        let scoresList = [];
        scoresList.push(finalScore);
        localStorage.setItem('scoresList', JSON.stringify(scoresList))
    }else{
        scoresList = JSON.parse(localStorage.getItem('scoresList'));
        //console.log(scoresList);
        scoresList.push(finalScore);
        localStorage.setItem('scoresList', JSON.stringify(scoresList))

    }

}

function saveScoreAndGoLanding(){

    //GUARDA L'SCORE FINAL A LA BBDD

    let finalScore=[infoUsuari.avatar, humanNamePlayer, score, tempsFinal, minutesAndSeconds];
    //const firstname = "Joan";
    //const lastname = "Ferrer";
    //const dict_values = {firstname, lastname} //Pass the javascript variables to a dictionary.  NO CAL//
    scoresBBDD = JSON.stringify(finalScore); // Stringify converts a JavaScript object or value to a JSON string
    console.log(scoresBBDD); // Prints the variables to console window, which are in the JSON format
    //alert(scoresBBDD)
    $.ajax({
        url:"/setBBDD",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(scoresBBDD)}); 
        console.log(scoresBBDD);
        //alert(scoresBBDD);

    // GUARDA L'SCORE FINAL AL LOCAL STORAGE

    finalScore = {
        avatar: infoUsuari.avatar,
        nom: humanNamePlayer,
        puntuacio: score,
        seconds: tempsFinal,
        time: minutesAndSeconds
    }
    //console.log(finalScore);

    if(localStorage.getItem('scoresList') == null){
        let scoresList = [];
        scoresList.push(finalScore);
        localStorage.setItem('scoresList', JSON.stringify(scoresList))
    }else{
        scoresList = JSON.parse(localStorage.getItem('scoresList'));
        //console.log(scoresList);
        scoresList.push(finalScore);
        localStorage.setItem('scoresList', JSON.stringify(scoresList))

    };
    location.reload(true);

}

function saveScoreAndGofullScores(){

    //GUARDA L'SCORE FINAL A LA BBDD

    let finalScore=[infoUsuari.avatar, humanNamePlayer, score, tempsFinal, minutesAndSeconds];
    //const firstname = "Joan";
    //const lastname = "Ferrer";
    //const dict_values = {firstname, lastname} //Pass the javascript variables to a dictionary.  NO CAL//
    scoresBBDD = JSON.stringify(finalScore); // Stringify converts a JavaScript object or value to a JSON string
    console.log(scoresBBDD); // Prints the variables to console window, which are in the JSON format
    //alert(scoresBBDD)
    $.ajax({
        url:"/setBBDD",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(scoresBBDD)}); 
        console.log(scoresBBDD);
        //alert(scoresBBDD);

    // GUARDA L'SCORE FINAL AL LOCAL STORAGE

    finalScore = {
        avatar: infoUsuari.avatar,
        nom: humanNamePlayer,
        puntuacio: score,
        seconds: tempsFinal,
        time: minutesAndSeconds
    }
    //console.log(finalScore);

    if(localStorage.getItem('scoresList') == null){
        let scoresList = [];
        scoresList.push(finalScore);
        localStorage.setItem('scoresList', JSON.stringify(scoresList))
    }else{
        scoresList = JSON.parse(localStorage.getItem('scoresList'));
        //console.log(scoresList);
        scoresList.push(finalScore);
        localStorage.setItem('scoresList', JSON.stringify(scoresList))

    };
    fullScores();

}   


/*let arxiuInfoUsuari = [];
arxiuInfoUsuari.push(infoUsuari);
localStorage.setItem('arxiuInfoUsuari', JSON.stringify(arxiuInfoUsuari))*/

//document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;



//-----------------------------------------

//EXECUTE

landing();
