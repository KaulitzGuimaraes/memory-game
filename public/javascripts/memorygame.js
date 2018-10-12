
"Enable Experimental JavaScript"
let gamePieces = ["../images/apple.png","../images/astah.jpg","../images/bootstap.jpg","../images/c.jpg",
    "../images/coursera.jpg","../images/cpp.jpg","../images/docker.png","../images/github.jpg","../images/ibm.jpg",
    "../images/java.png","../images/javascript.png","../images/jetbrains.png","../images/php.png","../images/pyhton.jpg",
    "../images/stackoverflow.png","../images/swift.png","../images/udemy.png","xcode.jpg"]
let NUMBER_OF_PIECES = 36

let TWO_PIECES = 2

let BACK_PIECE_IMAGE = "../images/back.jpg"

/**
 * TODO : CHANGE LISTENER In PIECE  TO ONCLICK()!; SHUFFLE THE IDS IN TABLE CONFIG
 */
/** MODEL **/

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
        this.image = BACK_PIECE_IMAGE
        this.coordinate = coordinate
        this.isTurn = false
        this.isClicked = false
        this.verifyIfPieceClick()
    }
    async turnPiece (){
        this.isTurn = true

        CurrentCoordinates.getCurrentCoordinates().addCoordinateInCurrentCoords(this.coordinate)
    }
    turnBackPiece (){
        this.isTurn = false
    }



    verifyIfPieceClick(){
        var instance = this
        document.querySelector("#"+ this.coordinate).addEventListener("click",function () {

            instance.turnPiece()
        })
    }
    toString(){
        return this.image
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
        alert("It is " + this.currentPlayer +" time!!!")
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
        this.ids = ids

    }
    assemblyTable(){

    }

    createTable(){
        var table = this.assemblyTable()
        document.querySelector("#table").innerHTML = table
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
            '<td id="Z_Z" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="Z_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="O_Z"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="O_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '</tr> ' +
            '</table>'


        return table
    }
}

class Table4x4 extends TableConfig{
    constructor(){
        super(4,["Z_Z","Z_O","Z_TW","Z_TH",
            "O_Z","O_O","O_TW","O_TH",
            "TW_Z","TW_O","TW_TW","TW_TH"
           "TH_Z",  "TH_O", "TH_TW", "TH_TH" ])
        this.createTable()

    }
    assemblyTable(){

        var table = '<table>' +
            '<tr><' +
            'td id="Z_Z" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="Z_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="Z_TW" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="Z_TH" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="O_Z"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="O_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="O_TW"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="O_TH" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="TW_Z"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TW_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TW_TW"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TW_TH" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="TH_Z"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TH_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TH_TW"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TH_TH" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '</tr>' +
            '</table>'


        return table
    }
}



class Table6x6 extends TableConfig{
    constructor(){
        super(6,[
            "Z_Z"," Z_O","Z_TW","Z_TH", "Z_FO","Z_FI",
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
            '<td id="Z_Z" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="Z_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="Z_TW" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="Z_TH" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="Z_FO" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="Z_FI" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="O_Z"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="O_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="O_TW"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="O_TH" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="O_FO" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="O_FI" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="TW_Z"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TW_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TW_TW"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TW_TH" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="TW_FO" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="TW_FI" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="TH_Z"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TH_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TH_TW"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="TH_TH" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="TH_FO" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="TH_FI" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="FO_Z"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="FO_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="FO_TW"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="FO_TH" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="FO_FO" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="FO_FI" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td  id="FI_Z"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="FI_O" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="FI_TW"  class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td  id="FI_TH" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="FI_FO" class="piecesListener"><img src="../images/back.jpg"/></td>' +
            '<td id="FI_FI" class="piecesListener"><img src="../images/back.jpg"/></td>' +
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
        this.listOfImages = {}
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
        return randomPiece = Math.floor((Math.random() * number) + 1)
    }
    insertPieces(){
       this.insertImages()
        var nPieces = -1
        while(nPieces < this.nPieces) {
            var piece1 = nPieces+1
            var piece2 = ++nPieces
           this.addPice(new PairPieces(nPieces,this.tableHTML.ids[piece1],this.tableHTML.ids[piece2]))
             this.listOfImages[piece1] = nPieces
             this.listOfImages[piece2] = nPieces
        }
    }


    insertImages(){
        imagesNumber = new Set()
        do{

            imagesNumber.add(this.getRandomPieceNumber())

        } while ( imagesNumber.length <this.nPieces)


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
    /*RODRIIGO*/
    assemblyHTML(data){
        var htmlLine = "<p>"+ data.nameWinner + "<br/>" + data.totalPointsWinner + "<br/>" + data.gameMode + "<br/>" + data.tableConfig   + "<br/>" + data.totalMatchTime +  "<br/>"+  "</p>"
      return htmlLine
    }
    showMatches(){
       var htmlHistory = ""
        for (var matchPos in this.matches){
            htmlHistory+= this.assemblyHTML(this.matches[matchPos])
            htmlHistory+="<br/>"
        }
        document.querySelector(".history").innerHTML = htmlHistory
    }
}




//Logic

//time difference : https://albert-gonzalez.github.io/easytimer.js/


//this.gameTime = diffHours(   this.gameTime, new Date())
class Game{

    constructor(tableConfig,name1, name2){
        this.verifyIfGameEnd()
        this.table = new Table(tableConfig)
        this.maxPoints = tableConfig
        this.table.addPice(new PairPieces("", "Z_Z","Z_O"))
        this.table.addPice(new PairPieces("", "O_Z","O_O"))
        this.gameMode = this.createPlayers("Roger","Gary")
        this.verifyIfUserClickInAPeace()



    }

    static getGame(){
        if(Game.instance == undefined){
            Game.instance = new Game(2)
        }
        return Game.instance
    }
     createPlayers(name1,name2){
        if(name2 != null){
            return  new Multiplayer(name1,name2)
        }else{
            return new SinglePlayer(name1)
        }
     }
     alertGameStart(){
        alert("THE MATCH IS STARTING");
         this.gameTime = new Date()
     }

     checkIfTheCurrentPlayerWonThePoint( answ){
        if(answ)
            this.gameMode.addPointToTheCurrentPlayer()
         else {
            alert("You've lost this point!!!")
        }
     }

     switchPlayerTurn(){
        this.gameMode.switchPlayer()
     }


     verifyIfGameEnd(){


         document.querySelector("body").addEventListener("click",function () {

             if(parseInt(Game.getGame().gameMode.points) == Game.getGame().maxPoints){
                 var bufferMatch  = new Match(Game.getGame().gameMode.getWinnerData()[0],Game.getGame().gameMode.getWinnerData()[1],
                     Game.getGame().gameMode.toString(),"",Game.getGame().table.tableConfiguration + "x" + Game.getGame().table.tableConfiguration)
                 HistoryGame.getHistoryGame().addMatch(bufferMatch)
                 console.log( HistoryGame.getHistoryGame().matches)
                 HistoryGame.getHistoryGame().showMatches()
                 alert("Game ended !!!!")
                 Game.instance.gameMode = null
               //  Game.instance.table = null

             }
         })




     }

      checkIfThereIsTwoCardsToCompare() {
         if ( CurrentCoordinates.getCurrentCoordinates().getCoordinatesLength() == TWO_PIECES) {


         var answ =  this.table.verifyIfPeacesMatch(CurrentCoordinates.getCurrentCoordinates().getCoordinate1(),CurrentCoordinates.getCurrentCoordinates().getCoordinate2())
         this.checkIfTheCurrentPlayerWonThePoint(answ)
         CurrentCoordinates.getCurrentCoordinates().eraseCurrentCoordinates()
         this.switchPlayerTurn()
             // get image ramdomly
             //get ids from a previous table
             //assembly pairs
             //to flip :  {"z_z": "image .."}
             // to turn unflipped : if uncliked : flip,, if unfliped : back.jpg
             //Onclik startGame : Instance game table = needed : Gametype : names
             // EXTRA choose table randomly

         }



     }

     verifyIfUserClickInAPeace(){
        var instance = this
        // noinspection JSAnnotator
         var classes = document.querySelectorAll(".piecesListener")
       classes = [].slice.call(classes)
         classes.forEach(function (item, idx) {
             item.addEventListener("click", function () {
                 instance.checkIfThereIsTwoCardsToCompare()

             })

})

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