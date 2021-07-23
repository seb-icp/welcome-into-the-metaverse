import Phaser from 'phaser'

const createAvatarAnims = (anims : Phaser.Animations.AnimationManager) => {

   anims.create({
        key:'avatar1',
        frames:   anims.generateFrameNames('avatar1', {start:18 , end:23 }),
        repeat : -1,
        frameRate : 5
    })

    anims.create({
        key:'avatar2',
        frames:   anims.generateFrameNames('avatar2', {start:18 , end:23 }),
        repeat : -1,
        frameRate : 5
    })

    anims.create({
        key:'avatar3',
        frames:   anims.generateFrameNames('avatar3', {start:18 , end:23 }),
        repeat : -1,
        frameRate : 5
    })

    anims.create({
        key:'avatar4',
        frames:   anims.generateFrameNames('avatar4', {start:18 , end:23 }),
        repeat : -1,
        frameRate : 5
    })

    anims.create({
        key:'avatar5',
        frames:   anims.generateFrameNames('avatar5', {start:0 , end:17 }),
        repeat : -1,
        frameRate : 5
    })

    anims.create({
        key:'avatar6',
        frames:   anims.generateFrameNames('avatar6', {start:0 , end:8 }),
        repeat : -1,
        frameRate : 5
    })

    anims.create({
        key:'avatar7',
        frames:   anims.generateFrameNames('avatar7', {start:0 , end:17 }),
        repeat : -1,
        frameRate : 5
    })

    anims.create({
        key:'avatar8',
        frames:   anims.generateFrameNames('avatar8', {start:0 , end:17 }),
        repeat : -1,
        frameRate : 6
    })

    anims.create({
        key:'avatar9',
        frames:   anims.generateFrameNames('avatar9', {start:18 , end:23 }),
        repeat : -1,
        frameRate : 5
    })
    anims.create({
        key:'avatar10',
        frames:   anims.generateFrameNames('avatar10', {start:18 , end:23 }),
        repeat : -1,
        frameRate : 5
    })
    anims.create({
        key:'santa',
        frames: anims.generateFrameNames('santa', {start:0, end:10}),
        repeat: -1,
        frameRate:6
    })
}

export {createAvatarAnims}

