import Phaser from 'phaser'

const createSchoolAnims = (anims : Phaser.Animations.AnimationManager) => {

   anims.create({
        key:'teacher',
        frames:   anims.generateFrameNames('peopleInSchool', {start:252 , end:269 }),
        repeat : -1,
        frameRate : 5
    })

    anims.create({
        key:'girl',
        frames: anims.generateFrameNames('peopleInSchool', {start:54 , end:70 }),
        repeat : -1 ,
        frameRate : 8
    })
    anims.create({
        key:'guyComputer',
        frames : anims.generateFrameNames('guyComputer', {start:0 , end:5 }),
        repeat : -1,
        frameRate : 7
    })
    anims.create({
        key:'girlComputer',
        frames : anims.generateFrameNames('girlComputer', {start:6 , end:8 }),
        repeat : -1,
        frameRate : 3
    })
    anims.create({
        key:'guySit',
        frames : anims.generateFrameNames('guyBar', {start:6 , end:8 }),
        repeat : -1,
        frameRate : 3
    })
    anims.create({
        key:'girlSit',
        frames: anims.generateFrameNumbers('girlSit', {start:0, end:5}),
        repeat: -1,
        frameRate : 4
    })
    anims.create({
        key:'guyBar',
        frames : anims.generateFrameNames('guyBar', {start:18,end:23}),
        repeat:-1,
        frameRate:2
    })
    anims.create({
        key:'ghost',
        frames: anims.generateFrameNames('ghostReal', {start:0 , end : 3}),
        repeat : -1,
        frameRate:3
    })
    

    
}

export {createSchoolAnims}
