let state = initState();
let game = initGameObject();

game.startScreen.addEventListener('click', (e) => {


    //console.log('Start game!');
    game.startScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden');

    // Start game
    start(state, game);

});