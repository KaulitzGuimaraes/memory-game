
"Enable Experimental JavaScript"

let dprIan = ['../images/dprian0.jpg', 
              '../images/dprian1.jpg',
              '../images/dprian2.jpg',
              '../images/dprian3.jpg',
              '../images/dprian4.jpg',
              '../images/dprian5.jpg',
              '../images/dprian6.jpg',
              '../images/dprian7.jpg',
              '../images/dprian8.jpg',
              '../images/dprian9.jpg',
              '../images/dprian10.jpg',
              '../images/dprian11.jpg',
              '../images/dprian12.jpg',
              '../images/dprian13.jpg',
              '../images/dprian14.jpg',
              '../images/dprian15.jpg',
              '../images/dprian16.jpg',
              '../images/dprian17.jpg']
let woodz = ['../images/woodz0.jpeg', 
            '../images/woodz1.jpeg',  
            '../images/woodz2.jpeg',
            '../images/woodz3.jpeg', 
            '../images/woodz4.jpeg', 
            '../images/woodz5.jpeg', 
            '../images/woodz6.jpeg',
            '../images/woodz7.jpeg', 
            '../images/woodz8.jpeg', 
            '../images/woodz9.jpeg', 
            '../images/woodz10.jpeg',
            '../images/woodz11.jpeg', 
            '../images/woodz12.jpeg', 
            '../images/woodz13.jpeg', 
            '../images/woodz14.jpeg',
            '../images/woodz15.jpeg', 
            '../images/woodz16.jpeg', 
            '../images/woodz17.jpeg']
let jackson = ['../images/jackson0.jpeg', 
                '../images/jackson1.jpeg', 
                '../images/jackson2.jpeg',
                '../images/jackson3.jpeg',
                '../images/jackson4.jpeg',
                '../images/jackson5.jpeg', 
                '../images/jackson6.jpeg',
                '../images/jackson7.jpeg', 
                '../images/jackson8.jpeg',
                '../images/jackson9.jpeg',
                '../images/jackson10.jpeg',
                '../images/jackson11.jpeg',
                '../images/jackson12.jpeg',
                '../images/jackson13.jpeg',
                '../images/jackson14.jpeg',
                '../images/jackson15.jpeg',
                '../images/jackson16.jpeg',
                '../images/jackson17.jpeg']
var gamePieces  = null
var NUMBER_OF_PIECES = null
let NUMBER_OF_OPTIONS = 3
let TWO_PIECES = 2

rules =
    "<h2>RULES</h2>" +
    "<ol>" +
    "<li>You must choose the theme and the table configuration</li>" +
    "<li>If you want to play as  a Single Player, let the name of player 2 in blank</li>" +
    "<li>The first player is the  name1 </li>" +
    "<li>The game ends when the last pair of pieces is founded.</li>" +
    "<li>You can flip all th pieces with button 'FLIP', it will not change  your game dynamic, <br/> if you want to untap the pieces, click in 'BACK' </li>" +
    "<li>Have a nice game!!!</li>" +
    "</ol>"

//FRONT END FUNCTIONS


var tableConfig = [undefined,2,4,6]

var themes = [undefined,jackson,dprIan,woodz]
var cssThemes = [undefined,"../css/jackson.css","../css/dprian.css","../css/woodz.css"]
function startGame() {
    var name1 =  document.querySelector("#name1").value
    if(name1 === ""){
        swal({
            width: '36rem',
            type: 'error',
            title: 'Oops...',
            text: "You must fill 'First Player' field",
          })
        return
    }
    var name2 =  document.querySelector("#name2").value
    var theme = document.querySelector('input[name="theme"]:checked').value
    backTheme = theme
    var tableConfigN = document.querySelector('input[name="table"]:checked').value
    Game.getGame(tableConfig[tableConfigN],themes[theme],name1,name2)
    document.querySelectorAll("link")[2].setAttribute("href",cssThemes[theme])
    setTimeout(function () {
        document.querySelector("#click").click()
    },100)


}

function stopGame() {
    swal({
        title: "You game has been stopped!!!",
        showConfirmButton: false,
        type: 'warning',
        timer: 1000
      })
    Game.instance = undefined
    document.querySelector("#table").innerHTML = rules
}

function dealWithUnclickedPieces(unclick) {

    var htmlTds = getPiecesToShow()

    for (var pos in htmlTds){
        try {

            document.querySelector('#' + htmlTds[pos].id).innerHTML = "<img src='"+ getImage(unclick,htmlTds[pos].id)+"' alt=''/>"
            verifyIfPiecesAreClickedOrUnclicked(unclick,htmlTds[pos].id)

        }catch (err){

            break
        }

    }

}

function verifyIfPiecesAreClickedOrUnclicked(unclick,id){
    if(unclick){
        document.querySelector('#'+id).style.pointerEvents = "auto"
    }else{
        document.querySelector('#'+id).style.pointerEvents = "none"
    }
}

function  verifyIfPieceClick(piece){
    document.getElementById(piece).innerHTML = '<img src='+ gamePieces[ Game.instance.table.listOfImages[String(piece)]] +' alt=""/>'
    setTimeout(function () {
        CurrentCoordinates.getCurrentCoordinates().addCoordinateInCurrentCoords(piece)
        Game.getGame().verifyIfUserClickInAPeace()
        Game.getGame().verifyIfGameEnd()
    },500)
}

function getImage(unclick,pos) {
    if(unclick){
        return "../images/back"+backTheme+".jpg"
    }else {
        var imgPos
        imgPos = Game.getGame().table.listOfImages[pos]
        return gamePieces[imgPos]
    }

}



function getPiecesToShow() {
    var htmlTds = document.querySelectorAll(".unclicked")
    return htmlTds;
}

function chooseRandomly() {
    var rand1 = Math.floor((Math.random() * NUMBER_OF_OPTIONS)  )
    document.querySelectorAll('input[name="theme"]')[rand1].click()
    var rand2 = Math.floor((Math.random() * NUMBER_OF_OPTIONS)  )

    document.querySelectorAll('input[name="table"]')[rand2].click()
}

/*
BACKEND CODE
 */



class CurrentCoordinates {

        constructor(){

        this.currentCoords = []
    }

     static getCurrentCoordinates(){
        if  ( (CurrentCoordinates.instance == undefined)){
            CurrentCoordinates.instance = new CurrentCoordinates()
        }
        return CurrentCoordinates.instance
     }
     addCoordinateInCurrentCoords(coordinate){

        this.currentCoords.push(coordinate)
    }
    eraseCurrentCoordinates(){
        this.currentCoords =[]
    }
    getCoordinate1(){
        return this.currentCoords[0]
    }
    getCoordinate2(){
        return this.currentCoords[1]
    }

    getCoordinatesLength(){
        return this.currentCoords.length
    }

}


//Pieces
class Piece{

    constructor(coordinate){
        this.coordinate = coordinate

    }

    



}

class PairPieces {
    constructor(imageName, coordinate1,coordinate2){
        this.imageName = imageName
        this.piece1 = new Piece(coordinate1)
        this.piece2 = new Piece(coordinate2)

    }

    isPairMatch( coordinate1,coordinate2){


       return (this.compareCoordinates(coordinate1, coordinate2)
       || this.compareCoordinates(coordinate2,coordinate1))
    }

    compareCoordinate(coordinate,piece){

        return piece.coordinate.localeCompare(coordinate) == 0
    }

    comparePairOfCoodinates(pair1,pair2){
        return ( pair1 & pair2)
    }
    compareCoordinates(coordinate1, coordinate2) {
      var isFirstPairMatch = this.comparePairOfCoodinates( this.compareCoordinate(coordinate1,this.piece1),
          this.compareCoordinate(coordinate2,this.piece2))
      var isSecondPairMatch  = this.comparePairOfCoodinates(this.compareCoordinate(coordinate1,this.piece2),
          this.compareCoordinate(coordinate2,this.piece1))


        return ( (isFirstPairMatch ) | (isSecondPairMatch))
    }
}
//Player

class Player{
    constructor(name){
        this.name = name
        this.points = 0

    }

    addPoint(){

        this.points+=1
    }
     toString(){
        return this.name
     }



}



class Players{

  constructor(name){
     this.points = 0
      this.currentPlayer = new Player(name)

  }

    switchPlayer(){

    }

    addPointToTheCurrentPlayer(){
      this.points +=1
        this.currentPlayer.addPoint()
    }
    checkWhoWon(){

    }
    getWinnerData(){
      this.checkWhoWon()
      var data = [this.currentPlayer.name,this.currentPlayer.points]
        return data
    }

}


class SinglePlayer extends Players{
    constructor(name){

        super(name)

    }
    toString(){
        return "SinglePlayer"
    }

}
class Multiplayer extends  Players{
    constructor(name1,name2){
        super(name1)
        this.player1 = this.currentPlayer
        this.player2 = new Player(name2)


    }
    setPlayerXAsCurrent( player){
        this.currentPlayer = player
    }

    alertTheTurn(){
        swal("It is " + this.currentPlayer +" time!!!")
    }

    switchPlayer(){

        if(this.currentPlayer == this.player1){
            this.setPlayerXAsCurrent( this.player2)

        }else{
            this.setPlayerXAsCurrent( this.player1)
        }
        this.alertTheTurn()
    }
    checkWhoWon(){
        if(this.player1.points > this.player2.points){
            this.currentPlayer = this.player1
        }else if(this.player1.points < this.player2.points){

                this.currentPlayer = this.player2

        } else {
            this.currentPlayer = new Player(this.player1 + " and " + this.player2)
            this.currentPlayer.points = this.points

        }
    }

    toString(){
        return "Multiplayer"
    }

}
//Table
class TableConfig{
    constructor(config,ids){
        this.config = config
        this.ids = this.shuffle(ids)


    }


    assemblyTable(){

    }

    createTable(){
        var table = this.assemblyTable()
        document.querySelector("#table").innerHTML = table
    }
     shuffle(array) {


            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }


        return array;
    }

}

class Table2x2 extends TableConfig {
    constructor() {
        super(2, ["Z_Z", "Z_O", "O_Z", "O_O"])
        this.createTable()

    }

    assemblyTable() {

        var table = '<table>' +
            ' <tr> ' +
            '<td id="Z_Z" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt="oi" onclick="verifyIfPieceClick(this.id)"/></td>' +
            '<td id="Z_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="O_Z"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="O_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr> ' +
            '</table>'


        return table
    }
}

class Table4x4 extends TableConfig{
    constructor(){
        super(4,["Z_Z","Z_O","Z_TW","Z_TH",
            "O_Z","O_O","O_TW","O_TH",
            "TW_Z","TW_O","TW_TW","TW_TH",
           "TH_Z",  "TH_O", "TH_TW", "TH_TH" ])
        this.createTable()

    }
    assemblyTable(){

        var table = '<table>' +
            '<tr><' +
            'td id="Z_Z" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="Z_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="Z_TW" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="Z_TH" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="O_Z"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="O_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="O_TW"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="O_TH" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="TW_Z"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TW_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TW_TW"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TW_TH" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="TH_Z"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TH_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TH_TW"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TH_TH" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr>' +
            '</table>'


        return table
    }
}



class Table6x6 extends TableConfig{
    constructor(){
        super(6,[
            "Z_Z","Z_O","Z_TW","Z_TH", "Z_FO","Z_FI",
            "O_Z",  "O_O","O_TW","O_TH", "O_FO","O_FI",
            "TW_Z", "TW_O","TW_TW","TW_TH", "TW_FO","TW_FI",
            "TH_Z",  "TH_O", "TH_TW", "TH_TH", "TH_FO","TH_FI",
            "FO_Z",  "FO_O", "FO_TW", "FO_TH", "FO_FO","FO_FI",
            "FI_Z",  "FI_O", "FI_TW", "FI_TH", "FI_FO","FI_FI"
             ])
        this.createTable()

    }
    assemblyTable(){

        var table = '<table>' +
            '<tr>' +
            '<td id="Z_Z" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="Z_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="Z_TW" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="Z_TH" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="Z_FO" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="Z_FI" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="O_Z"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="O_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="O_TW"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="O_TH" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="O_FO" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="O_FI" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="TW_Z"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TW_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TW_TW"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TW_TH" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="TW_FO" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="TW_FI" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="TH_Z"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TH_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TH_TW"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="TH_TH" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="TH_FO" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="TH_FI" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="FO_Z"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="FO_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="FO_TW"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="FO_TH" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="FO_FO" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="FO_FI" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="FI_Z"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="FI_O" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="FI_TW"  class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td  id="FI_TH" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="FI_FO" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '<td id="FI_FI" class="unclicked" onclick="verifyIfPieceClick(this.id)"><img src="../images/back'+backTheme+'.jpg" alt=""/></td>' +
            '</tr>' +
            '</table>'


        return table
    }
}



class Table{
    constructor(tableConfiguration){
        this.pieces =[]
        this.tableConfiguration = tableConfiguration
        this.nPieces =( Math.pow(this.tableConfiguration,2))/TWO_PIECES
        this.tableHTML = this.searchTableConfig()
        this.ids = this.tableHTML.ids
        this.listOfImages = {}

        this.imageNumbers = this.insertImages()
        this.insertPieces()
    }


    searchTableConfig(){
       switch (this.tableConfiguration ){
           case 2 :
               return new Table2x2()
                break
           case 4 :
               return new Table4x4()
                break
           case 6 :
               return  new Table6x6()
              break
       }
    }
    getRandomPieceNumber(number = NUMBER_OF_PIECES){
        return  Math.floor((Math.random() * number) + 1)
    }
    insertPieces(){

        var nPieces = -1
        while(nPieces < Math.pow(this.tableConfiguration,2)-1) {

            nPieces +=1

            var piece1 = nPieces
            var imgPos = parseInt(nPieces/2)
            nPieces +=1

            var piece2 = (nPieces)
             this.addPice(new PairPieces( this.imageNumbers[imgPos],this.ids[piece1],this.ids[piece2]))
             this.listOfImages[String(this.ids[piece1])] =  this.imageNumbers[imgPos]
             this.listOfImages[String(this.ids[piece2])] =this.imageNumbers[imgPos]
        }
    }


    insertImages(){
        var myArr
        if(this.tableConfiguration == 6){
           myArr = this.tableHTML.shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17])
        }else {
            var imagesNumber = new Set()
            do{

                imagesNumber.add(this.getRandomPieceNumber())

            } while ( imagesNumber.size <this.nPieces)
             myArr =Array.from(imagesNumber)
        }

        return myArr
    }



    addPice(piece){
        this.pieces.push(piece)
    }

    verifyIfPeacesMatch(coordinate1,coordinate2){
        var answ = false

        for (var pairPeacesPos in this.pieces){
            answ = this.pieces[pairPeacesPos].isPairMatch(coordinate1,coordinate2)
             if (answ){
                break
             }
          }

        return answ

    }

}
//Match
class Match{
    constructor(nameWinner,totalPointsWinner,gameMode,totalMatchTime, tableConfig){
        this.nameWinner = nameWinner
        this.totalPointsWinner = totalPointsWinner
        this.gameMode = gameMode
        this.tableConfig = tableConfig
        this.totalMatchTime = totalMatchTime
    }
}
//HistoryGame
class HistoryGame{
    constructor(){
        this.matches = []
    }
   static getHistoryGame(){
        if(HistoryGame.instance == undefined){
            HistoryGame.instance = new HistoryGame()
        }
        return HistoryGame.instance
    }



         addMatch(match){
        this.matches.push(match)
    }

    assemblyHTML(data){
        let min =(data.totalMatchTime/ 60).toFixed(2);
        var htmlLine = "<p>"+"Winner's name : " +  data.nameWinner + ".<br/>" +
           "Total Points : " +  data.totalPointsWinner + ".<br/>" +
           "Game mode : "+  data.gameMode + ".<br/>" +
            "Table : " + data.tableConfig   + ".<br/>" +
            "Total time : " + min + " minutes."+ "<br/>"+
            "</p>"
      return htmlLine
    }
    showMatches(){
       var htmlHistory = ""
        for (var matchPos in this.matches){
            htmlHistory+= this.assemblyHTML(this.matches[matchPos])
            htmlHistory+="<br/>"
        }
        document.querySelector("#history").innerHTML = htmlHistory
    }
}




//Logic

//time difference : https://albert-gonzalez.github.io/easytimer.js/


//this.gameTime = diffHours(   this.gameTime, new Date())
class Game{

    constructor(tableConfig,theme,name1, name2){

        this.chooseTheme(theme)
        this.table = new Table(tableConfig)
        this.maxPoints = Math.pow(tableConfig,2)/2
        this.gameMode = this.createPlayers(name1,name2)
        this.alertGameStart()

    }
    chooseTheme(theme){
         gamePieces = theme
         NUMBER_OF_PIECES = gamePieces.length-1
    }

    static getGame(tableConfig,theme, name1,name2){
        if(Game.instance == undefined){
            Game.instance = new Game(tableConfig,theme,name1,name2)
        }
        return Game.instance
    }
     createPlayers(name1,name2){
        if(String(name2) !== ""){
            return  new Multiplayer(name1,name2)
        }else{
            return new SinglePlayer(name1)
        }
     }
     alertGameStart(){
        swal({
            position: 'center',
            type: 'success',
            title: 'THE MATCH IS STARTING',
            showConfirmButton: false,
            timer: 1500
          })
         this.timeMatch= new Date()
     }

     checkIfTheCurrentPlayerWonThePoint( answ){
        if(answ){
            this.setUnclicakble(CurrentCoordinates.getCurrentCoordinates().getCoordinate1());
            this.setUnclicakble(CurrentCoordinates.getCurrentCoordinates().getCoordinate2());
            this.gameMode.addPointToTheCurrentPlayer()
            swal({
                title: "You've won this point!!",
                showConfirmButton: false,
                type: 'success',
                timer: 1000
              })
            this.setIdClicked(CurrentCoordinates.getCurrentCoordinates().getCoordinate1());
            this.setIdClicked(CurrentCoordinates.getCurrentCoordinates().getCoordinate2());
        }

         else {

            swal({
                title: "You've lost this point!!!",
                showConfirmButton: false,
                type: 'info',
                timer: 1000
              })
            this.backToBack(CurrentCoordinates.getCurrentCoordinates().getCoordinate1())
            this.backToBack(CurrentCoordinates.getCurrentCoordinates().getCoordinate2())
        }
     }

    setIdClicked(coordinate) {
        document.getElementById(coordinate).className = "clicked"

    }

    backToBack(id){
        document.querySelector("#" + id).innerHTML = '<img src="../images/back'+backTheme+'.jpg" alt=""/>'
    }
    setUnclicakble(id) {
        document.querySelector('#' + id).style.pointerEvents = "none"
    }

    switchPlayerTurn(){
        this.gameMode.switchPlayer()
     }


    verifyIfGameEnd(){




             if(parseInt(Game.getGame().gameMode.points) === Game.getGame().maxPoints){
                 this.timeMatch= (new Date() - this.timeMatch ) /1000
                 var bufferMatch  = new Match(Game.getGame().gameMode.getWinnerData()[0],Game.getGame().gameMode.getWinnerData()[1],
                     Game.getGame().gameMode.toString(),this.timeMatch,Game.getGame().table.tableConfiguration + "x" + Game.getGame().table.tableConfiguration)
                 HistoryGame.getHistoryGame().addMatch(bufferMatch)
                 console.log( HistoryGame.getHistoryGame().matches)
                 HistoryGame.getHistoryGame().showMatches()
                 swal({
                    title: "Game ended !!!!",
                    showConfirmButton: false,
                    type: 'warning',
                    timer: 1000
                  })
                 Game.instance = undefined
                 document.querySelector("#table").innerHTML = rules


             }





     }

      checkIfThereIsTwoCardsToCompare() {
         if ( CurrentCoordinates.getCurrentCoordinates().getCoordinatesLength() === TWO_PIECES) {


         var answ =  this.table.verifyIfPeacesMatch(CurrentCoordinates.getCurrentCoordinates().getCoordinate1(),CurrentCoordinates.getCurrentCoordinates().getCoordinate2())
         this.checkIfTheCurrentPlayerWonThePoint(answ)
         CurrentCoordinates.getCurrentCoordinates().eraseCurrentCoordinates()
         this.switchPlayerTurn()
         }



     }

     verifyIfUserClickInAPeace(){

        // noinspection JSAnnotator
                 this.checkIfThereIsTwoCardsToCompare()

     }
}

/*
class Pieces{


    constructor(tableSize){
        this.tableSize = tableSize
        this.pieces = new Set()

    }
    calculateRadomValue (){
        return Math.floor((Math.random() * NUMBER_OF_PIECES) + 1)
    }

    random(){
       var piecePos =  this.calculateRadomValue()
        while(this.pieces.has(gamePieces[piecePos])){
           piecePos = this.calculateRadomValue()
        }

    }
    shufflePieces(){

    }

}*/