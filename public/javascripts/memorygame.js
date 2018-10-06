let gamePieces = ["../images/apple.png","../images/astah.jpg","../images/bootstap.jpg","../images/c.jpg",
    "../images/coursera.jpg","../images/cpp.jpg","../images/docker.png","../images/github.jpg","../images/ibm.jpg",
    "../images/java.png","../images/javascript.png","../images/jetbrains.png","../images/php.png","../images/pyhton.jpg",
    "../images/stackoverflow.png","../images/swift.png","../images/udemy.png","xcode.jpg"]
let NUMBER_OF_PIECES = 36

let TWO_CARDS = 2


var currentCoords = []
/** MODEL **/


//Pieces
class Piece{

    constructor(coordinate){
        this.image = "../images/back.jpg"
        this.coordinate = coordinate
        this.isTurn = false
        this.verifyIfPieceClick()
    }
    async turnPiece (){
        this.isTurn = true
       currentCoords.push(this.coordinate)
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


    compareCoordinates(coordinate1, coordinate2) {
        return (this.piece1.coordinate.localeCompare(coordinate1) == 0 & this.piece2.coordinate.localeCompare(coordinate2) == 0)
    }
}
//Player

class Player{
    constructor(name){
        this.name = name
        this.points = 0

    }

    addPoint(){
        this.points++
    }
     toString(){
        return this.name
     }
}


class SinglePlayer{
    constructor(name){
        this.player = new Player(name)
    }
    toString(){
        return "SinglePlayer"
    }
    addPointToTheCurrentPlayer(){
        this.currentPlayer.addPoint()
    }
}
class Multiplayer{
    constructor(name1,name2){
        this.player1 = new Player(name1)
        this.player2 = new Player(name2)
        this.currentPlayer = this.player1
    }

    alertTheTurn(player){
        alert("It is " + player +"time!!!")
    }

    switchPlayer(){

        if(this.currentPlayer == this.player1){
            this.currentPlayer = this.player2
        }else{
            this.currentPlayer = this.player1
        }
        this.alertTheTurn(this.currentPlayer)
    }
    addPointToTheCurrentPlayer(){
        this.currentPlayer.addPoint()
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
    constructor(nameWinner,totalPointsWinner,gameMode,totalMatchTime){
        this.nameWinner = nameWinner
        this.totalPointsWinner = totalPointsWinner
        this.gameMode = gameMode
        this.totalMatchTime = totalMatchTime
    }
}
//HistoryGame
class HistoryGame{
    constructor(){
        this.matches = []
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
         //ASSEMBLY TABLE IN HERE
        this.gameMode = this.createPlayers()
        this.clickTimes = 0
        this.verifyIfUserClickInApeace()


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

      checkIfThereIsTwoCardsToCompare() {
         if ( currentCoords.length == TWO_CARDS) {

             this.clickTimes = 0
         var answ =  this.table.verifyIfPeacesMatch(currentCoords[0],currentCoords[1])

             console.log(answ)
         currentCoords = []

         }



     }

     verifyIfUserClickInApeace(){
        var instance = this
        // noinspection JSAnnotator
         var classes = document.querySelectorAll("body")
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