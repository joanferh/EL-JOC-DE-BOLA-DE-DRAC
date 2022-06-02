from crypt import methods
from flask import Flask, render_template
import json
from flask import request
import pymysql
import pymysql.cursors



app = Flask(__name__)

if __name__ == "__main__":
    app.run(debug=True)


def connectDatabase():
    return pymysql.connect(host='yahabla.mysql.pythonanywhere-services.com', user = 'yahabla', password = 'L4yY5lt9Qu', database = 'yahabla$elgrantorneig')
    return pymysql.connect(host='localhost', user = 'root', password = '', database = 'boladedrac')
    return pymysql.connect(host='sql11.freemysqlhosting.net', user = 'sql11484420', password = 'L4yY5lt9Qu', database = 'sql11484420')


@app.route('/')
def index():
    #try:     
        #getBBDDlanding()
        #getBBDDfullscores()
        con=connectDatabase()
        cursor=con.cursor()
        sql = "SELECT * FROM scores"
        #print(sql)
        cursor.execute(sql)
        allScores = cursor.fetchall()
        con.commit()
        cursor.close()
        con.close()
        #print(cursor
        #print(allScores)
        #print(type(allScores))

        allScores=list(allScores)
        #print(allScores[0][0])
        #print(allScores[0])
        #print(type(allScores))
        #print(allScores)
        #print(allScores[0])
        #print(allScores[0][0])

        allscoresjson = []
        #print(type(allscoresjson))
        for i in range(len(allScores)):
            avatar = '"avatar":' + str('"' + allScores[i][1] + '"')
            nom = '"nom":' + str('"' + allScores[i][2] + '"')
            puntuacio = '"puntuacio":' + str(allScores[i][3])
            seconds = '"seconds":' + str(allScores[i][4])
            time = '"time":' + str('"' + allScores[i][5] + '"')
            newScore = '{'+ avatar + ',' + nom + ',' + puntuacio + ',' + seconds + ',' + time +'}'
            allscoresjson.append(newScore)


        allScores= str(allscoresjson)
        allScores=allScores.replace("'","")
        #allScores=allScores.replace(")","}")
        #print(allScores)
        
        return render_template('index.html', allScores=allScores)
    
    #except:
        return render_template('404.html')


@app.route('/videoyoutube')
def video():
    return render_template('videoyoutube.html')



@app.route('/setBBDD', methods=['POST'])
def setBBDD():
    output = request.get_json()
    #print(output) # This is the output that was stored in the JSON within the browser
    #print(type(output))
    result = json.loads(output) #this converts the json output to a python dictionary
    #print(result) # Printing the new dictionary
    #print(type(result))#this shows the json converted as a python list
    #return result
    #print(result[0])

    
    con = connectDatabase()
    cursor = con.cursor()
    sql = "INSERT INTO scores (avatar, nom, puntuacio, seconds, time) VALUES ('{0}','{1}','{2}','{3}','{4}')".format(result[0], result[1], result[2], result[3], result[4] )
    #sql = "CREATE TABLE novaprova (nova VARCHAR(200), prova VARCHAR(200))"
    #print(sql)
    cursor.execute(sql)
    #print(cursor)
    con.commit()
    con.close()
    return result

@app.route('/getBBDDlanding', methods=['GET'])
def getBBDDlanding():
    con = connectDatabase()
    cursor = con.cursor()
    sql = "SELECT * FROM scores ORDER BY puntuacio DESC, seconds ASC LIMIT 5"
    print(sql)
    cursor.execute(sql)
    fiveScores = cursor.fetchall()
    print(fiveScores)
    #print(cursor)
    con.commit()
    con.close()
    print(type(fiveScores))


    fiveScoresJSON = []
    #print(type(allscoresjson))
    for i in range(len(fiveScores)):
        avatar = '"avatar":' + str('"' + fiveScores[i][1] + '"')
        nom = '"nom":' + str('"' + fiveScores[i][2] + '"')
        puntuacio = '"puntuacio":' + str(fiveScores[i][3])
        seconds = '"seconds":' + str(fiveScores[i][4])
        time = '"time":' + str('"' + fiveScores[i][5] + '"')
        newScore = '{'+ avatar + ',' + nom + ',' + puntuacio + ',' + seconds + ',' + time +'}'
        fiveScoresJSON.append(newScore)


    fiveScores= str(fiveScoresJSON)
    fiveScores=fiveScores.replace("'","")
    print(fiveScores)

    return fiveScores




@app.route('/getBBDDfullscores', methods=['POST','GET'])
def getBBDDfullscores():
    output = request.get_json()
    print(output)
    print(type(output))

    result=list(output.values())[0]
    print(result)



    con = connectDatabase()
    cursor = con.cursor()
    sql = "SELECT * FROM scores ORDER BY puntuacio DESC, seconds ASC LIMIT {0},50".format(result)
    print(sql)
    cursor.execute(sql)
    fiftyScores = cursor.fetchall()
    print(fiftyScores)
    #print(cursor)
    con.commit()
    con.close()
    print(type(fiftyScores))


    fiftyScoresJSON = []
    #print(type(allscoresjson))
    for i in range(len(fiftyScores)):
        avatar = '"avatar":' + str('"' + fiftyScores[i][1] + '"')
        nom = '"nom":' + str('"' + fiftyScores[i][2] + '"')
        puntuacio = '"puntuacio":' + str(fiftyScores[i][3])
        seconds = '"seconds":' + str(fiftyScores[i][4])
        time = '"time":' + str('"' + fiftyScores[i][5] + '"')
        newScore = '{'+ avatar + ',' + nom + ',' + puntuacio + ',' + seconds + ',' + time +'}'
        fiftyScoresJSON.append(newScore)


    fiftyScores= str(fiftyScoresJSON)
    fiftyScores=fiftyScores.replace("'","")
    print(fiftyScores)

    return fiftyScores


