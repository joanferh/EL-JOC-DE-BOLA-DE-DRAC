source env/bin/activate
export FLASK_ENV=development



Your account number is: 522949


Server: sql11.freemysqlhosting.net
Name: sql11484420
Username: sql11484420
Password: L4yY5lt9Qu
Port number: 3306



''' if nomnen != "":
kidname = request.form['kidname'].capitalize()
con = connectDatabase()
cursor = con.cursor()
sql = "UPDATE infokid SET kidname = '{0}' WHERE kidname = '{1}'".format(kidname,nomnen[1])
print(sql)
cursor.execute(sql)
con.commit()
con.close()'''


from flask import Flask, render_template, request, redirect, url_for, flash
import random

<style>
    .footer {
    background-color: black;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    color: white;
    }   
</style>


app = Flask(__name__)
app.secret_key = 'mysecretkey'



@app.route('/')
def formulari():
    return render_template ("formulari.html")


@app.route('/diccionari')
def consultar():
    llistabuida=[]
    diccionari = open('diccionari.txt', 'r+')
    lineas = diccionari.readlines()  # crea una llista del .txt  
    for cadalinea in lineas:  # itera per cada element de la llista
        lineamaca = cadalinea.replace('\n', '').split(';')  # a cada linea li treu la \n i divideix on hi ha ; creant noves llistes de cada element de la llista d'abans
        #print(lineamaca)
        llistabuida.append(lineamaca)
    #print(llistabuida)
    diccionari.close()

    return render_template("diccionari.html", definicions=llistabuida)


@app.route('/afegir',methods=['POST'])    
def afegir():
    if request.method == 'POST':
        quediu = request.form['quediu'].capitalize().strip()
        quevoldir = request.form['quevoldir'].capitalize().strip()
        quediu=quediu.replace(' ',('_'))
        quevoldir=quevoldir.replace(' ',('_'))
        diccionari= open('diccionari.txt', 'a')
        diccionari.write(quediu + ';' + quevoldir + '\n')
        diccionari.close()
        print(quediu)
        print(quevoldir)
        flash('Paraula afegida! '+ ' ' + quediu + ': '+ quevoldir)
        return redirect(url_for('formulari'))



@app.route('/eliminar/<string:id>')
def eliminar(id):
    #print(id)
    diccionari = open('diccionari.txt', 'r+')
    lineas = diccionari.readlines()  # crea una llista del .txt  
    print(lineas)
    #diccionari.seek(0)  # portem el punter al principi de tot
    diccionari.close() #tanquem diccionari en mode lectura


    diccionari = open('diccionari.txt', 'w') #obrim diccionari en mode sobreescritura, per sobreescriure el fitxer amb el valor eliminat
    for cadalinea in lineas: #transformem cada linea en un element de llista, amb 2 valors
        lineamaca = cadalinea.replace('\n', '').split(';') #treiem salt de linea i dividim el valor en 2 on està ';'
        #print(lineamaca[0], lineamaca[1])
        #print(lineamaca)
        if id in lineamaca: #on l'id sigui el que volem borrar, borra aquesta llista de 2 valors
            del lineamaca[:]
        
        rectificat={} #diccionari buit per volcar tot menys la definició eliminada
        #print(lineamaca)
        #print(lineamaca[0], lineamaca[1])
        for nou in lineamaca: #recorrem la llista i afegim cada item al nou diccionari
            #print(nou)
            rectificat[lineamaca[0]] = lineamaca[1] #a rectificat, el primer valor és la key i el segon, el value
        
        for quediu, quevoldir in rectificat.items():  # items devuelve una lista de tuplas, cada tupla se compone de dos elementos: el primero será la clave y el segundo, su valor.
            diccionari.write('%s;%s\n' % (quediu, quevoldir)) # escrivim al txt els nous valors
            
    #print(lineas)
    diccionari.close() #tanquem diccionari
    flash('Paraula esborrada!')
    return redirect(url_for('consultar'))


@app.route('/editar/<string:id>')
def editar(id):
    
    diccionari = open('diccionari.txt', 'r+')
    lineas = diccionari.readlines()  # crea una llista del .txt  
    #print(lineas)
    diccionari.close()

    diccionari = open('diccionari.txt', 'w')
    for cadalinea in lineas: #transformem cada linea en un element de llista, amb 2 valors
        lineamaca = cadalinea.replace('\n', '').split(';') #treiem salt de linea i dividim el valor en 2 on està ';'
        #print(lineamaca[0], lineamaca[1])
        #print(lineamaca)
        if id in lineamaca: #on l'id sigui el que volem borrar, borra aquesta llista de 2 valors
            global editar1
            global editar2
            editar1 = lineamaca[0]
            editar2 = lineamaca[1]
            del lineamaca[:]
            print(lineamaca)
        
        editat={} #diccionari buit per volcar tot menys la definició eliminada
        #print(lineamaca)
        #print(lineamaca[0], lineamaca[1])
        for nou in lineamaca: #recorrem la llista i afegim cada item al nou diccionari
            #print(nou)
            editat[lineamaca[0]] = lineamaca[1] #a rectificat, el primer valor és la key i el segon, el value
        #diccionari.seek(0)

        for quediu, quevoldir in editat.items():  # items devuelve una lista de tuplas, cada tupla se compone de dos elementos: el primero será la clave y el segundo, su valor.
            diccionari.write('%s;%s\n' % (quediu, quevoldir)) # escrivim al txt els nous valors
    

    print(editar1)
    print(editar2)
    #diccionari.seek(0)  # portem el punter al principi de tot
    diccionari.close() #tanquem diccionari en mode lectura
    
    return render_template('editar.html', quediu = editar1 , quevoldir = editar2)
    #return 'ok'

@app.route('/editar/<string:id>', methods=['POST'])
def actualitzar(id):
    if request.method == 'POST':
        quediu = request.form['quediu'].capitalize().strip()
        quevoldir = request.form['quevoldir'].capitalize().strip()
        quediu=quediu.replace(' ',('_'))
        quevoldir=quevoldir.replace(' ',('_'))
        diccionari= open('diccionari.txt', 'a')
        diccionari.write(quediu + ';' + quevoldir + '\n')
        diccionari.close()
        print(quediu)
        print(quevoldir)
        flash('Paraula afegida! '+ ' ' + quediu + ': '+ quevoldir)
        return redirect(url_for('consultar'))

@app.route('/joc')
def joc():
    diccionarideltxt = {}
    diccionari = open('diccionari.txt', 'r')
    lineas = diccionari.readlines()
    for cadalinea in lineas:
        llistadelineas = cadalinea.replace('\n', '').split(';')
        diccionarideltxt[llistadelineas[0]] = llistadelineas[1]
    diccionari.close()

    llistanomsbons = list(diccionarideltxt.keys())
    llistanomsmarti = list(diccionarideltxt.values())

    compteenrere = 5 
    
    llistaaleatoris = []
    #print(llistanomsbons)
    #print(llistanomsmarti)
    aleatori = random.choice(llistanomsmarti)
    
    print(aleatori)
    
    return render_template('joc.html', aleatori=aleatori, compteenrere=compteenrere)


@app.route('/joc2', methods=['POST'])
def joc2():
    if request.method == 'POST':
        quevoldir = request.form['quevoldir'].capitalize().strip()
        quevoldir=quevoldir.replace(' ',('_'))
    marcador = 0
    compteenrere = 5
    diccionarideltxt = {}
    diccionari = open('diccionari.txt', 'r')
    lineas = diccionari.readlines()
    for cadalinea in lineas:
        llistadelineas = cadalinea.replace('\n', '').split(';')
        diccionarideltxt[llistadelineas[0]] = llistadelineas[1]
    diccionari.close()

    llistanomsbons = list(diccionarideltxt.keys())
    llistanomsmarti = list(diccionarideltxt.values())


    if quevoldir in llistanomsbons:
        print('Correcte!')
        flash('Correcte!')
        #marcador = marcador + 1
    else:
        print('No és correcte!')
        flash('No és correcte!')
        #compteenrere = compteenrere - 1

    aleatori = random.choice(llistanomsmarti)
    compteenrere = compteenrere - 1
    print(compteenrere)
    diccionari.close()
    
    
    return render_template('joc3.html', aleatori=aleatori, compteenrere=compteenrere)


@app.route('/joc3', methods=['POST'])
def joc3():
    if request.method == 'POST':
        quevoldir = request.form['quevoldir'].capitalize().strip()
        quevoldir=quevoldir.replace(' ',('_'))
    marcador = 0
    compteenrere = 5
    diccionarideltxt = {}
    diccionari = open('diccionari.txt', 'r')
    lineas = diccionari.readlines()
    for cadalinea in lineas:
        llistadelineas = cadalinea.replace('\n', '').split(';')
        diccionarideltxt[llistadelineas[0]] = llistadelineas[1]
    diccionari.close()

    llistanomsbons = list(diccionarideltxt.keys())
    llistanomsmarti = list(diccionarideltxt.values())


    if quevoldir in llistanomsbons:
        print('Correcte!')
        flash('Correcte!')
        #marcador = marcador + 1
    else:
        print('No és correcte!')
        flash('No és correcte!')
        #compteenrere = compteenrere - 1

    aleatori = random.choice(llistanomsmarti)
    compteenrere = compteenrere - 2
    print(compteenrere)
    diccionari.close()
    
    return ('final')
    #return render_template('joc3.html', aleatori=aleatori, compteenrere=compteenrere)



#LANDINNG PAGE NOMÉS AMB TOP SCORES

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
    allScores=JSON.parse(allScores)
    console.log(allScores)
    console.log(typeof allScores)
  



    // LOCALSTORAGE, PER ACONSEGUIR LES PUTUACIONS NOMÉS DEL JUGADOR

    scoresList =  localStorage.getItem('scoresList')
    console.log(typeof allScores)
    
    console.log(scoresList);
    scoresList = JSON.parse(scoresList);
    console.log(scoresList);

    if(scoresList === null){
    	add5Scores();
    }

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



    let primerClassificat = scoresList[0];
    console.log(primerClassificat);
    console.log(primerClassificat.nom);    
    let segonClassificat = scoresList[1];
    let tercerClassificat = scoresList[2];
    let quartClassificat = scoresList[3];
    let cinqueClassificat = scoresList[4];



    document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
    document.getElementById('score').innerHTML = ` SCORE: ${score}`;
    document.getElementById('title').innerHTML = ``;
    document.getElementById('content').innerHTML =`


    <div class="d-grid gap-2">
        <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
            <a class="btn btn-success btn-lg btn-block" onclick="humanPlayerName()" >INSCRIPCIÓ AL 21è TORNEIG DE LES ARTS MARCIALS</a>
        </div>
    </div>
    
    <div class="container" style="style="padding-right:10rem; padding-left:10rem; margin-left:10px;">
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
                            <h3>TOP SCORES</h3>
                        </thead>
                        <tbody>
                            <tr>
                                <td align='center' style="width:10%"><h3>1</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${primerClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${primerClassificat.nom}</h5></td>
                                <td align='center' style="width:20%"><h5>${primerClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:25%"><h5>${primerClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>2</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${segonClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${segonClassificat.nom}</h5></td>
                                <td align='center' style="width:20%"><h5>${segonClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:25%"><h5>${segonClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>3</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${tercerClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${tercerClassificat.nom}</h5></td>
                                <td align='center' style="width:20%"><h5>${tercerClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:25%"><h5>${tercerClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>4</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${quartClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${quartClassificat.nom}</h5></td>
                                <td align='center' style="width:20%"><h5>${quartClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:25%"><h5>${quartClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>5</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${cinqueClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${cinqueClassificat.nom}</h5></td>
                                <td align='center' style="width:20%"><h5>${cinqueClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:25%"><h5>${cinqueClassificat.time}</h5></td>
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
}








onclick="window.location.href='/'"

<button id= "opcio2" type="button" onclick=fullScores() class="btn btn-lg btn-success mt-1">CLASSIFICACIÓ GENERAL</button>




/*

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



    document.getElementById('level').innerHTML = ` LEVEL ${level}/5 `;
    document.getElementById('score').innerHTML = ` SCORE: ${score}`;
    document.getElementById('title').innerHTML = ``;
    document.getElementById('content').innerHTML =`


    <div class="d-grid gap-2">
        <div style="margin-left: auto; margin-right: auto; padding-top: 40px;">
            <a class="btn btn-success btn-lg btn-block" onclick="humanPlayerName()" >INSCRIPCIÓ AL 21è TORNEIG DE LES ARTS MARCIALS</a>
        </div>
    </div>
    
    <div class="container" style="style="padding-right:10rem; padding-left:10rem; margin-left:10px;">
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
                                <button type="button" class="btn btn-secondary" onclick=landing()>ALL SCORES</button>
                                <button type="button" class="btn btn-danger">MY SCORES</button>
                            </div>

                        </thead>
                        <tbody>
                            <tr>
                                <td align='center' style="width:10%"><h3>1</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${primerClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${primerClassificat.nom}</h5></td>
                                <td align='center' style="width:20%"><h5>${primerClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:25%"><h5>${primerClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>2</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${segonClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${segonClassificat.nom}</h5></td>
                                <td align='center' style="width:20%"><h5>${segonClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:25%"><h5>${segonClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>3</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${tercerClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${tercerClassificat.nom}</h5></td>
                                <td align='center' style="width:20%"><h5>${tercerClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:25%"><h5>${tercerClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>4</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${quartClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${quartClassificat.nom}</h5></td>
                                <td align='center' style="width:20%"><h5>${quartClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:25%"><h5>${quartClassificat.time}</h5></td>
                            </tr>
                            <tr>
                                <td align='center' style="width:10%"><h3>5</h3></td>
                                <td align='center' style="width:10%"><h5><img src='static/img/${cinqueClassificat.avatar}.png' height='35px'</h5></td>
                                <td align='center' style="width:35%"><h5>${cinqueClassificat.nom}</h5></td>
                                <td align='center' style="width:20%"><h5>${cinqueClassificat.puntuacio}</h5></td>
                                <td align='center' style="width:25%"><h5>${cinqueClassificat.time}</h5></td>
                            </tr>

                            <tr>
                                <td colspan='5' align='center'>
                                    
                                    <img src='static/img/signomas.png' height="20px" onclick="myFullScores()">
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>  
            </div>
        </div>
    </div>    




`*/



document.getElementById('formTask').addEventListener('submit', saveTask);