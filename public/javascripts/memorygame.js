let gamePieces = ["apple.png","astah.jpg","bootstap.jpg","c.jpg",
    "coursera.jpg","cpp.jpg","docker.png","github.jpg","ibm.jpg",
    "java.png","javascript.png","jetbrains.png","php.png","pyhton.jpg",
    "stackoverflow.png","swift.png","udemy.png","xcode.jpg"]
let NUMBER_OF_PIECES = 36




/** MODEL **/



//Pieces
class Piece{

    constructor(coordinate){
        this.coordinate = coordinate
        this.isTurn = false
    }
    turnPiece (){
        this.isTurn = true
    }
    turnBackPiece (){
        this.isTurn = false
    }
}

class PairPieces {
    constructor(imageName, coordinate1,coordinate2){
        this.imageName = imageName
        this.piece1 = new Piece(coordinate1)
        this.piece2 = new Piece(coordinate2)
    }

    isPairMatch( coordinate1,coordinate2){
        return (this.piece1.coordinate == coordinate1 & this.piece2 == coordinate2)

    }


}
//Player

class Player{
    constructor(name){
        this.name = name
        this.points = 0
        a = new Object()

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
        this.tableConfiguration = tableConfiguration
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