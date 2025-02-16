let state = initState();
let game = initGameObject();

const availableKeys = [
    'KeyA',
    'KeyS',
    'KeyD',
    'KeyW',
];

document.addEventListener('keydown', (e) => {
    //console.log(e.key);
    //console.log(e.code);

    if (availableKeys.includes(e.code)) {
        state.keys[e.code] = true;
    }

}); 

document.addEventListener('keyup', (e) => {
    if (availableKeys.includes(e.code)) {
        state.keys[e.code] = false;
    }
}); 

game.startScreen.addEventListener('click', (e) => {


    //console.log('Start game!');
    game.startScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden');

    // Start game
    start(state, game);

});