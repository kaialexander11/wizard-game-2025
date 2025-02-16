function start(state, game) {

    game.createWizard(state.wizard);

    window.requestAnimationFrame(gameLoop.bind(null, state, game));

}


function gameLoop(state, game) {

    const { wizard } = state;
    const { wizardElement } = game;

    //console.log(state.player);
    //console.log(state.keys);

    // Move wizard:
    if (state.keys.KeyD) {
        //console.log(state.keys); => works!
        wizard.posX += 10;
    }

    // Render
    wizardElement.style.left = wizard.posX + 'px';

    window.requestAnimationFrame(gameLoop.bind(null, state, game));

}