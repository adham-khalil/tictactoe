class element{
    constructor(item){
        this.item = item
        this.hasText = false;
    }
}



const board = []
let move = 1
for(let i = 0 ; i < 3 ; i++){
    board[i] = []
    for(let j = 0 ; j < 3 ; j++){
        const id = "#e" + i + j
        board[i][j] = new element(document.querySelector(id))
        
    }
}


function clearBoard(board){
    board.forEach(row=>{
        row.forEach(element=>{
            element.item.textContent = ""
            element.hasText = false
        })
    })
}





function checkCol(board , j){
    const temp = board[0][j].item.textContent

    for(let i = 1 ; i < 3 ; ++i){
        if(board[i][j].item.textContent != temp){
            return false
        }
    }
    return true &&  board[0][j].hasText

}


function checkRow(board , i ){
    const temp = board[i][0].item.textContent

    for(let j = 1 ; j < 3 ; ++j){
        if(temp != board[i][j].item.textContent){
            return false
        }
    }

    return true && board[i][0].hasText
}

function checkDiagonal(board){
    const temp1 = board[0][0].item.textContent
    const temp2 = board[0][2].item.textContent
    if(!board[0][0].hasText && !board[0][2].hasText){
        return false
    }
    function checkD1(i,j){
        if(i === 2 && board[i][j].item.textContent === temp1){
            return true
        }

        else if(board[i][j].item.textContent != temp1){
            return false
        }

        else{
            return checkD1(i+1,j+1)
        }

    }

    function checkD2(i,j){
        if(i === 2 && board[i][j].item.textContent === temp2){
            return true
        }

        else if(board[i][j].item.textContent != temp2){
            return false
        }

        else{
            return checkD1(i+1,j-1)
        }

    }

    return checkD1(1,1) || checkD2(1,1)
}

function checkWin(board){
    for(let i = 0 ; i < 3 ; i++){
        if(checkCol(board,i) || checkRow(board,i)){
            return true
        }
    }

    return checkDiagonal(board)
}


function isFilled(moves){
    return moves === 9
}

function checkGame(elmnt){
    return new Promise((resolve, reject)=>{
        if(elmnt.hasText){
            reject(window.alert("This move has already been played"))
        }

        else if(isFilled(move)){
            reject(window.alert("Game Over"))
            clearBoard(board)
            move = 1
        }

        else if(checkWin(board)){
            console.log("adham")
            reject(window.alert("You won"))
            clearBoard(board)
            move = 1
        }

        else{
            
            resolve(()=>{
                elmnt.hasText = true
                if(move % 2 === 1){
                    elmnt.item.textContent = "X"
                }

                else{
                    elmnt.item.textContent = "O"
                }
                move++
            })
        }
    })
}

async function play(elmnt){
    try{
        const start = await checkGame(elmnt)
        start()

    }

    catch(err){
        console.log("could not place item",err)
    }
}


function startGame(){
    board.forEach(row=>{
        row.forEach(elmnt=>{
            elmnt.item.addEventListener("click", ()=>{
                play(elmnt)
            })
        })
    })
}

startGame()