
import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private character! : Phaser.Physics.Arcade.Sprite

    constructor() {
        super('preload')
       

    }

    preload() {
        this.load.atlas('character', './character/texture.png', './character/texture.json')


        this.load.image('tiles', './map/tilemap_packed.png')
        this.load.tilemapTiledJSON('city', './map/city.json')


        this.load.audio('inTheCity', './audio/in-the-city.mp3')

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    create() {
        //Create and display the map
        const map = this.make.tilemap({ key : 'city' })
        const tileset = map.addTilesetImage('tilemap_packed', 'tiles')
        map.createLayer('ground', tileset)

        //Sound 
        // const backgroundSound = this.sound.add('inTheCity')
        // backgroundSound.play()

        //

        this.character = this.physics.add.sprite(200,200, 'character' , 'character/up.png')

        this.anims.create({
            key:'character_idle',
            frames: [{key : 'character' , frame: 'character/down.png' }]
        })

        
        this.anims.create({
            key:'character_walk_down',
            frames: this.anims.generateFrameNames('character', {start:1, end:2 , prefix: 'character/walk_down', suffix: '.png'}),
            repeat : -1,
            frameRate : 5
        })
        this.anims.create({
            key:'character_walk_up',
            frames: this.anims.generateFrameNames('character', {start:1, end:2 , prefix: 'character/walk_up', suffix: '.png'}),
            repeat : -1,
            frameRate : 5
        })
        this.anims.create({
            key:'character_walk_right',
            frames: this.anims.generateFrameNames('character', {start:1, end:2 , prefix: 'character/walk_right', suffix: '.png'}),
            repeat : -1,
            frameRate : 5
        })
        this.anims.create({
            key:'character_walk_left',
            frames: this.anims.generateFrameNames('character', {start:1, end:2 , prefix: 'character/walk_left', suffix: '.png'}),
            repeat : -1,
            frameRate : 5
        })




        this.character.anims.play('character_idle')
        this.character.anims.play('character_walk_left')
        
    }

    update (t : number , dt:number) {

        if(!this.cursors || !this.character) {
            return
        }

        const speed = 100;

        if (this.cursors.left?.isDown) {

            this.character.anims.play('character_walk_left', true)
            this.character.setVelocity(-speed, 0)
        }

        else if (this.cursors.right?.isDown) {
            this.character.anims.play('character_walk_right', true)
            this.character.setVelocity(speed,0)
        }
        
        else if (this.cursors.up?.isDown) {
            this.character.anims.play('character_walk_up', true)
            this.character.setVelocity(0,-speed)
        }

        else if (this.cursors.down?.isDown) {
            this.character.anims.play('character_walk_left', true)
            this.character.setVelocity(0,speed)
        }
        else {
            this.character.setVelocity(0,0)
        }
    }
}