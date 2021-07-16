import Phaser from "phaser";

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
    
    anims.create({
        key:'right',
        frames: anims.generateFrameNames('character2', {start:0, end:5 }),
        repeat : -1,
        frameRate : 5
    })
    anims.create({
        key:'up',
        frames:   anims.generateFrameNames('character2', {start:6 , end:11 }),
        repeat : -1,
        frameRate : 5
    })
    anims.create({
        key:'left',
        frames:     anims.generateFrameNames('character2', {start:12, end:17 }),
        repeat : -1,
        frameRate : 5
    })
    anims.create({
        key:'down',
        frames:   anims.generateFrameNames('character2', {start:18, end:23 }),
        repeat : -1,
        frameRate : 5
    })
    anims.create({
        key:'idle-down',
        frames : anims.generateFrameNames('character2', {start:20,end:20} )
    })
    anims.create({
        key:'idle-up',
        frames : anims.generateFrameNames('character2', {start:6,end:6} )
    })
    anims.create({
        key:'idle-right',
        frames : anims.generateFrameNames('character2', {start:2,end:2} )
    })
    anims.create({
        key:'idle-left',
        frames : anims.generateFrameNames('character2', {start:14,end:14})
    })

}

export {createCharacterAnims}