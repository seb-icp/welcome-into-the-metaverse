import Phaser from "phaser";

import { createCharacterAnims } from "../anims/character";

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

        // Create anims 

        createCharacterAnims(this.anims)
        //Create and display the map
        const map = this.make.tilemap({ key : 'city' })
        const tileset = map.addTilesetImage('tilemap_packed', 'tiles')
        map.createLayer('ground', tileset)
        const objectLayer = map.createLayer('object', tileset)
        const otherLayer =  map.createLayer('uplayer', tileset)
    

        objectLayer.setCollisionByProperty({collide:true})
        otherLayer.setCollisionByProperty({collide:true})

        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // objectLayer.renderDebug(debugGraphics, {
        //     tileColor:null,
        //     collidingTileColor:  new Phaser.Display.Color(243,234,48,255),
        //     faceColor: new Phaser.Display.Color(40,39,37,255)
        // })
        // otherLayer.renderDebug(debugGraphics, {
        //     tileColor:null,
        //     collidingTileColor:  new Phaser.Display.Color(243,234,48,255),
        //     faceColor: new Phaser.Display.Color(40,39,37,255)
        // })


        //Sounds
       
        const backgroundSound = this.sound.add('inTheCity')
        backgroundSound.play()

        

        this.character = this.physics.add.sprite(200,200, 'character' , 'character/up.png')





        this.physics.add.collider(this.character, objectLayer)
        this.physics.add.collider(this.character,otherLayer )
        this.character.setCollideWorldBounds(true); //Prevent the character from moving out of the screen 
        
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
            this.character.anims.play('character_walk_down', true)
            this.character.setVelocity(0,speed)
        }
        else {
            this.character.anims.play('character_idle',true)
            this.character.setVelocity(0,0)
        }
    }
}