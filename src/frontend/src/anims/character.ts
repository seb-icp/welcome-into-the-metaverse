import Phaser from "phaser";

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {



    anims.create({
        key:'character_idle',
        frames: [{key : 'character' , frame: 'character/down.png' }]
    })

    
    anims.create({
        key:'character_walk_down',
        frames: anims.generateFrameNames('character', {start:1, end:2 , prefix: 'character/walk_down', suffix: '.png'}),
        repeat : -1,
        frameRate : 5
    })
    anims.create({
        key:'character_walk_up',
        frames:   anims.generateFrameNames('character', {start:1, end:2 , prefix: 'character/walk_up', suffix: '.png'}),
        repeat : -1,
        frameRate : 5
    })
    anims.create({
        key:'character_walk_right',
        frames:     anims.generateFrameNames('character', {start:1, end:2 , prefix: 'character/walk_right', suffix: '.png'}),
        repeat : -1,
        frameRate : 5
    })
    anims.create({
        key:'character_walk_left',
        frames:     anims.generateFrameNames('character', {start:1, end:2 , prefix: 'character/walk_left', suffix: '.png'}),
        repeat : -1,
        frameRate : 5
    })

}

export {createCharacterAnims}