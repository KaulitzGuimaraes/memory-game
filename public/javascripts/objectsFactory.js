let gamePieces = ["apple.png","astah.jpg","bootstap.jpg","c.jpg",
    "coursera.jpg","cpp.jpg","docker.png","github.jpg","ibm.jpg",
    "java.png","javascript.png","jetbrains.png","php.png","pyhton.jpg",
    "stackoverflow.png","swift.png","udemy.png","xcode.jpg"]
let NUMBER_OF_PIECES = 36
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

}