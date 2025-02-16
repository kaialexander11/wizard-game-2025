function start(state, game) {

    game.createWizard(state.wizard);

    window.requestAnimationFrame(gameLoop.bind(null, state, game));

}


function gameLoop(state, game) {

    const { wizard } = state;
    const { wizardElement } = game;

    modifyWizardPosition(state, game);

    // Spawn bugs:
    game.createBug(state.bugStats);

    // Render
    wizardElement.style.left = wizard.posX + 'px';
    wizardElement.style.top = wizard.posY + 'px';

    window.requestAnimationFrame(gameLoop.bind(null, state, game));

}

function modifyWizardPosition(state, game) {

    const { wizard } = state;

    // Move wizard:

    if (state.keys.KeyA) {
        // wizard.posX -= wizard.speed; => valid!
        wizard.posX = Math.max(wizard.posX - wizard.speed, 0);
    }

    if (state.keys.KeyS) {
        //wizard.posY += wizard.speed;
        wizard.posY = Math.min(wizard.posY + wizard.speed, game.gameScreen.offsetHeight - wizard.height);
    }

    if (state.keys.KeyD) {
        //wizard.posX += wizard.speed;
        wizard.posX = Math.min(wizard.posX + wizard.speed, game.gameScreen.offsetWidth - wizard.width);
    }

    if (state.keys.KeyW) {
        // wizard.posY -= wizard.speed; => valid!
        wizard.posY = Math.max(wizard.posY - wizard.speed, 0);
    }
}