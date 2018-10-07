
"Enable Experimental JavaScript"
let gamePieces = ["../images/apple.png","../images/astah.jpg","../images/bootstap.jpg","../images/c.jpg",
    "../images/coursera.jpg","../images/cpp.jpg","../images/docker.png","../images/github.jpg","../images/ibm.jpg",
    "../images/java.png","../images/javascript.png","../images/jetbrains.png","../images/php.png","../images/pyhton.jpg",
    "../images/stackoverflow.png","../images/swift.png","../images/udemy.png","xcode.jpg"]
let NUMBER_OF_PIECES = 36

let TWO_PIECES = 2

let BACK_PIECE_IMAGE = "../images/back.jpg"

/** MODEL **/

class CurrentCoordinates {

        constructor(){

        this.currentCoords = []
    }

     static getCurrentCoordinates(){
        if (CurrentCoordinates.instance == undefined){
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


       if( this.compareCoordinates(coordinate1, coordinate2)
       || this.compareCoordinates(coordinate2,coordinate1)){


           return true
       }


        return false

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
            alert("No one won!!!!")
        }
    }

    toString(){
        return "Multiplayer"
    }

}
//Table
class  Table{
    constructor(tableConfiguration){
        this.pieces =[]
        this.tableConfiguration = tableConfiguration
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
}




//Logic

//time difference

function diffHours(dt2, dt1)
{

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));

}
//this.gameTime = diffHours(   this.gameTime, new Date())
class Game{

    constructor(tableConfig,name1, name2){

        this.table = new Table(tableConfig)
        this.maxPoints = tableConfig
        this.table.addPice(new PairPieces("", "Z_Z","Z_O"))
        this.table.addPice(new PairPieces("", "O_Z","O_O"))
        this.gameMode = this.createPlayers("Roger","Mary")
        this.verifyIfUserClickInAPeace()
        this.verifyIfGameEnd()


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

        var instance = this
         document.querySelector("body").addEventListener("click",function () {
             if(parseInt(instance.gameMode.points) == instance.maxPoints){
                 var bufferMatch  = new Match(instance.gameMode.getWinnerData()[0],instance.gameMode.getWinnerData()[1],
                     instance.gameMode.toString(),"",instance.table.tableConfiguration + "x" + instance.table.tableConfiguration)
                 HistoryGame.getHistoryGame().addMatch(bufferMatch)
                 console.log(HistoryGame.getHistoryGame().matches)
             }
         })




     }

      checkIfThereIsTwoCardsToCompare() {
         if ( CurrentCoordinates.getCurrentCoordinates().getCoordinatesLength() == TWO_PIECES) {


         var answ =  this.table.verifyIfPeacesMatch(CurrentCoordinates.getCurrentCoordinates().getCoordinate1(),CurrentCoordinates.getCurrentCoordinates().getCoordinate2())
         this.checkIfTheCurrentPlayerWonThePoint(answ)
         CurrentCoordinates.getCurrentCoordinates().eraseCurrentCoordinates()
         this.switchPlayerTurn()

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