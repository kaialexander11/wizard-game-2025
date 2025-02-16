function start(state, game) {

    game.createWizard(state.wizard);

    window.requestAnimationFrame(timestamp => gameLoop(state, game, timestamp));

}


function gameLoop(state, game, timestamp) {

    const { wizard } = state;
    const { wizardElement } = game;

    modifyWizardPosition(state, game);

    if (state.keys.Space) {

        game.wizardElement.style.backgroundImage = 'url("/src/images/wizard-fire.png")';

        game.createFireBall(wizard, state.fireball);

    } else {
        game.wizardElement.style.backgroundImage = 'url("/src/images/wizard.png")';
    }

    // Detect fireball collision:




    // Spawn bugs:
    if (timestamp > state.bugStats.nextSpawnTimestamp) {

        game.createBug(state.bugStats);
        state.bugStats.nextSpawnTimestamp = timestamp + Math.random() * state.bugStats.maxSpawnInterval;

    }


    // Render bugs: // =>  Move and remove bugs!: => 

    let bugElements = document.querySelectorAll('.bug');


    bugElements.forEach(bug => {

        let posX = parseInt(bug.style.left);

        if (posX > 0) {
            bug.style.left = posX - state.bugStats.speed + 'px';
        } else {
            bug.remove();
        }
    });

    // Fireballs movement! Render fireballs: 
    document.querySelectorAll('.fireball').forEach(fireball => {

        let posX = parseInt(fireball.style.left);

        //Detect collision:

        bugElements.forEach(bug => {
            if (detectCollision(bug, fireball)) {
                bug.remove();
                fireball.remove();
            }
        });


        if (posX > game.gameScreen.offsetWidth) {
            fireball.remove();
        } else {
            fireball.style.left = posX + state.fireball.speed + 'px';
        }

    });

    //console.log(timestamp);
    
    // Render wizard: 
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


function detectCollision(objectA, objectB) {

    let first = objectA.getBoundingClientRect();
    let second = objectB.getBoundingClientRect();

    let hasCollision = !(first.top > second.bottom 
                        || first.bottom < second.top 
                        || first.right < second.left
                        || first.left > second.right);

    return hasCollision;                    

}