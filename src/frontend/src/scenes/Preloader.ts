import Phaser from "phaser";

import { createCharacterAnims } from "../anims/MainCharacter";
import ComponentService from "../services/ComponentService";
import KeyboardMovement from "../components/KeyboardMovements";
import AnimationOnInput from "../components/AnimationOnInput";
import SelectionCursor from "../components/SelectionCursor";
import People from "../components/People";





export default class Preloader extends Phaser.Scene {

   
    private components! : ComponentService
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    
    
    private character2! : Phaser.Physics.Arcade.Sprite
    private santa! : Phaser.Physics.Arcade.Sprite

    
    constructor() {
        super('preloader')
        
    }
    init () {
        this.components = new ComponentService()
        this.cursors = this.input.keyboard.createCursorKeys();
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.components.destroy()
        })
    } 

    preload() {
        
        
        //Spritesheet for all characters 
        
        //Special characters :
        this.load.spritesheet('santa', './pnj/santa.png', {frameWidth:48, frameHeight : 32})
        this.load.spritesheet('character2', './character/Alex_run_16x16.png',{frameWidth:16, frameHeight : 32});

        //Characters coming from the multiverse 
        this.load.spritesheet('avatar1', './character/avatar1.png',{frameWidth:16, frameHeight : 32});
        this.load.spritesheet('avatar2', './character/avatar2.png' , {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar3', './character/avatar3.png', {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar4', './character/avatar4.png', {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar5', './character/avatar5.png' , {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar6', './character/avatar6.png', {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar7', './character/avatar7.png',{frameWidth:16, frameHeight : 32});
        this.load.spritesheet('avatar8', './character/avatar8.png', {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avata9', './character/avatar9.png' , {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar10', './character/avatar10.png', {frameWidth:16, frameHeight : 32})
    

        // Load the map

        this.load.image('tiles', './map/tilemap_packed.png')
        this.load.tilemapTiledJSON('city', './map/city.json')

        
        //Load audio

        this.load.audio('inTheCity', './audio/in-the-city.mp3')


       
    }

    create() {
        
        
    
         //Create and display the map
         const map = this.make.tilemap({ key : 'city' })
         const tileset = map.addTilesetImage('tilemap_packed', 'tiles')
         map.createLayer('ground', tileset)
         const objectLayer = map.createLayer('object', tileset)
         const otherLayer =  map.createLayer('uplayer', tileset)

        objectLayer.setCollisionByProperty({collide:true})
        otherLayer.setCollisionByProperty({collide:true})


        //Create player and characters 

        this.character2 = this.physics.add.sprite(100,100, 'character2')
        this.santa = this.physics.add.sprite(200,200,'santa',0)
        this.hazel = this.physics.add.sprite(250,250,'hazel',0)
        this.jordan = this.physics.add.sprite(300,300, 'jordan',0)

        this.character2.body.setSize(this.character2.width,25,true)
        this.character2.body.offset.y = 8;
        this.character2.setCollideWorldBounds(true); //Prevent the character from moving out of the screen 

        this.jordan.body.setSize(this.character2.width,25,true)
        this.jordan.body.offset.y = 8;

        this.hazel.body.setSize(this.character2.width,25,true)
        this.hazel.body.offset.y = 8;

        this.santa.body.setSize(35,25,true)
        this.santa.body.offset.x = -4
        this.santa.body.offset.y = 8;

        this.jordan.setImmovable();
        this.hazel.setImmovable();
        this.santa.setImmovable();

        //Add components 

        this.components.addComponent(this.character2, new KeyboardMovement(this.cursors)) //Allow the character to move
        this.components.addComponent(this.character2, new AnimationOnInput (this.cursors))
        this.components.addComponent(this.character2, new SelectionCursor (this.cursors, this.jordan))


        // Add people (??)

        
        this.components.addComponent(this.jordan, new People("Jordan Last", "I'm hard at work, building Sudograph!"))
        

       

        //Add colliders 


        this.physics.add.collider(this.character2, objectLayer)
        this.physics.add.collider(this.character2,otherLayer )
        this.physics.add.collider(this.character2, this.jordan)
        this.physics.add.collider(this.character2, this.hazel)
        this.physics.add.collider(this.character2, this.santa)

    

        // Create anims 
        createCharacterAnims(this.anims)



        this.anims.create({
            key:'santa',
            frames: this.anims.generateFrameNames('santa', {start:0, end:10}),
            repeat: -1,
            frameRate:5
        })
        this.anims.create({
            key:'jordan',
            frames: this.anims.generateFrameNames('jordan', {start:0, end:17}),
            repeat: -1,
            frameRate:5
        })


        //Play anims

        this.jordan.play('jordan')
        this.santa.play('santa')

    
        //Sounds
       
        // const backgroundSound = this.sound.add('inTheCity')
        // backgroundSound.play()
        
        //Debug functionality

        const debugGraphics = this.add.graphics().setAlpha(0.7)
        objectLayer.renderDebug(debugGraphics, {
            tileColor:null,
            collidingTileColor:  new Phaser.Display.Color(243,234,48,255),
            faceColor: new Phaser.Display.Color(40,39,37,255)
        })
        otherLayer.renderDebug(debugGraphics, {
            tileColor:null,
            collidingTileColor:  new Phaser.Display.Color(243,234,48,255),
            faceColor: new Phaser.Display.Color(40,39,37,255)
        })

       

        // this.components.addComponent(this.character2, new Dialog("hello"))

        

    
        


       

        


    


}
       

    


    update (_t : number, dt:number) {
        
        this.components.update(dt) // Part of the component specification
        

    
    }
}