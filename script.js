// Decalring all the necessary variables
var activePlayer, scores, gamePlaying, roundScore, dice1, dice2, winningScore, backImgToss, backgroundMusic, diceRollToss, diceRollSfx, player1, player2;

// Reloading Game
reload()
initiate ()



// ROLL DICE Button
document.querySelector('#roll-dice').addEventListener('click', function () {
    if (gamePlaying) {
        diceRollSfx = new Audio
        diceRollSfx.src = 'Dice roll - 2.3gp.mp4'
        diceRollSfx.volume = .2
        diceRollSfx.play()
 
        document.querySelector('#dice1').style.display = 'block';
        document.querySelector('#dice2').style.display = 'block'


        dice1 = Math.floor(Math.random() * 6) + 1
        dice2 = Math.floor(Math.random() * 6) + 1
        document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice2').src = 'dice-' + dice2 + '.png'
    
        if (dice1 === 6 && dice2 === 6) {
            scores[activePlayer] = 0;
            roundScore = 0
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
    
            nextPlayer ()
    
        } else if (dice1 === 1 || dice2 === 1) {
            roundScore = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore

            nextPlayer ()
        
        } else {
            roundScore += (dice1 + dice2);
    
            document.querySelector('#current-' + activePlayer).textContent = roundScore

        }
    
    }
})


// HOLD Button
document.querySelector('#hold').addEventListener('click', function () {
    if (gamePlaying) {
        if (document.querySelector('#final-score').value != 0) {
            winningScore = document.querySelector('#final-score').value
        }
        scores[activePlayer] += roundScore
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
    
    
        document.querySelector('#dice1').style.display = 'none';
        document.querySelector('#dice2').style.display = 'none';

        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore

        if (scores[activePlayer] >= winningScore) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        }
        
        nextPlayer()    
    }
})


// NEW GAME Button
document.querySelector('#new-game').addEventListener('click', initiate)

function reload () {
    document.querySelector('#next-1').addEventListener('click', function() {
        document.querySelector('#rules-container').style.display = 'none';
        document.querySelector('#player-names-container').style.display = 'initial';
    })

    document.querySelector('#next-2').addEventListener('click', function () {
        player1 = document.querySelector('#player-1-name').value.toUpperCase()
        player2 = document.querySelector('#player-2-name').value.toUpperCase()

        document.querySelector('#name-0').textContent = player1
        document.querySelector('#name-1').textContent = player2

        if (player1 == '' || player2 == '') {
            return document.querySelector('#name-validator').textContent = 'You cannot keep the player\'s names empty'
        } else if (player1.length <= 2 || player2.length <= 2) {
            return document.querySelector('#name-validator').textContent = 'The names should be at least 3 characters long!'
        }
        else if (player1 == player2) {
            return document.querySelector('#name-validator').textContent = 'You cannot play with players with the same name. Hint: You can use a Number to make the names different'
        } else {
            document.querySelector('#player-names-container').style.display = 'none';
            document.querySelector('.wrapper').style.display = 'initial'
        }
    })
}


// Game restarting Function
function initiate () {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    winningScore = 100

    gamePlaying = true;

    backgroundMusic = new Audio;
    backgroundMusic.src = 'back-audio.3gp';
    backgroundMusic.volume = 0.1;
    backgroundMusic.play()

    document.body.style.backgroundImage = "url('Back - 1.jpg')"

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = 0;

    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;

    document.querySelector('#name-0').textContent = player1;
    document.querySelector('#name-1').textContent = player2;

    document.querySelector('#player-panel-0').classList.add('active');
    document.querySelector('#player-panel-1').classList.remove('active');

    document.querySelector('#final-score').value = 100;

    document.querySelector('.active-sign-0').style.display = 'initial';
    document.querySelector('.active-sign-1').style.display = 'none';

    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';

}


// Next player's turn Function
function nextPlayer () {
    if (gamePlaying) {
        activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0

        document.querySelector('#player-panel-0').classList.toggle('active')
        document.querySelector('#player-panel-1').classList.toggle('active')

        if (activePlayer === 0) {
            document.querySelector('.active-sign-0').style.display = 'initial';
            document.querySelector('.active-sign-1').style.display = 'none';
        } else {
            document.querySelector('.active-sign-1').style.display = 'initial';
            document.querySelector('.active-sign-0').style.display = 'none';
        }
    }
}


