class element{
    constructor(item){
        this.item = item
        this.hasText = false;
    }
}



const board = []
let moves = 1
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





function checkCol(board, j){
    if(!board[0][j].hasText){
        return false
    }

    const temp = board[0][j].item.textContent
    for(let i = 1 ; i < 3 ; i++){
        if(board[i][j].item.textContent !== temp){
            return false
        }
    }

    return true
}

function checkRow(board , i){
    if(!board[i][0].hasText){
        return false
    }

    const temp = board[i][0].item.textContent
    for(let j = 1 ; j < 3 ; j++){
        if(board[i][j].item.textContent !== temp){
            return false
        }
    }

    return true
}

function checkDiag(board){
    if(!board[0][0].hasText || !board[0][2].hasText){
        return false
    }

    

    const temp1 = board[0][0].item.textContent
    const temp2 = board[0][2].item.textContent

    function checkD1(){
        for(let i = 1 ; i < 3 ; i++){
            if(board[i][i].item.textContent !== temp1){
                return false
            }
        }
    
        return true
    
    }

    function checkD2(){
        for(let i = 1 ; i < 3 ; i++){
            if(board[i][2-i].item.textContent !== temp2){
                return false
            }
        }
    
        return true
    
    }

    return checkD1() || checkD2()
}

function winGame(){
    window.alert("You won")
    clearBoard(board)
    moves = 1
}


function isFilled(moves){
    return moves === 9
}


function checkMove(elmnt){
    return new Promise((resolve, reject)=>{
        if(elmnt.hasText){
            reject(window.alert("This move has already been played"))
        }

        else{
            resolve(()=>{
                elmnt.hasText = true
                if(moves % 2 === 1){
                    elmnt.item.textContent = "X"
                }

                else{
                    elmnt.item.textContent = "O"
                }
                moves++
            })
        }
    })
}


function checkState(elmn , i , j , moves, board){
    return new Promise((resolve, reject)=>{
        if(isFilled(moves)){
            resolve(()=>{

                window.alert("Game over")
                clearBoard(board)
                moves = 1
            })
        }

        if(checkCol(board,j) || checkRow(board,i) || checkDiag(board)){
            resolve(winGame)
        }
    })
}

const play = async (elmnt , i , j , moves , board)=>{
    try{
        const move = await checkMove(elmnt)
        move()
        const state = await checkState(elmnt, i , j , moves , board)
        state()
    }
    catch(err){
        console.error(err)
    }
}
function startGame(){
    board.forEach((row,i)=>{
        row.forEach((elmnt,j)=>{
            elmnt.item.addEventListener("click",()=>play(elmnt, i , j , moves , board))
        })
    })
}

startGame()