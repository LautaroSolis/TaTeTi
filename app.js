function init(){
    const playerTitle = document.querySelector('.playerTitle');
    const rematchButton = document.querySelector('.rematch');
    const items = document.querySelectorAll('.item');
    const gridArray = Array.from(items);
    let tracking = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let currentPlayer = 'playerX';

    /* recorriendo todos los elementos del tablero */
    items.forEach(item => {
        item.addEventListener('click', (e)=> {
            /* movimiento del jugador */
            const index = gridArray.indexOf(e.target);
            if(
                items[index].classList.contains('playerX') ||
                items[index].classList.contains('computer') 
            ) {
                return;
            }

            items[index].classList.add('playerX');

            /* empalmar el movimiento de la lista de seguimiento */
            const spliceNr = tracking.indexOf(index + 1)
            tracking.splice(spliceNr, 1);

            /* wincheck del jugador */

            if(winCheck('playerX', items)){
                playerTitle.innerHTML = "Ganaste!!"
                document.body.classList.add('over')
            }

            /* check por empate */
            if(tracking.length === 0){
                playerTitle.innerHTML = "es un empate";
                document.body.classList.add('over');
                return;
            }

            /* movimientos de la pc */
            const random = Math.floor(Math.random() * tracking.length);
            const computerIndex = tracking[random];
            items[computerIndex -1].classList.add('computer');

            /* empalmar el movimiento de la pc de la lista de seguimiento */
            tracking.splice( random, 1);

            /* wincheck de la pc */
            if(winCheck('computer', items)){
                playerTitle.innerHTML = "Pc gana!!"
                document.body.classList.add('over');
            }
        })
    })

    rematchButton.addEventListener('click', ()=>{
        location.reload();      
    })
}
init();

function winCheck(playerName, items){
    function check(pos1, pos2, pos3){
        if(
            items[pos1].classList.contains(playerName) &
            items[pos2].classList.contains(playerName) &
            items[pos3].classList.contains(playerName)
        ){
            return true;
        }else{
            return false;
        }
    }
    if( check(0, 3, 6) ) return true;
    else if (check(1, 4, 7) ) return true;
    else if (check(2, 5, 8) ) return true;
    else if (check(0, 1, 2) ) return true;
    else if (check(3, 4, 5) ) return true;
    else if (check(6, 7, 8) ) return true;
    else if (check(0, 4, 8) ) return true;
    else if (check(2, 4, 6) ) return true;

}