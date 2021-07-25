import Phaser from "phaser";

import { createCharacterAnims } from "../anims/MainCharacter";
import { createAvatarAnims } from "../anims/CityCharacter";

import ComponentService from "../services/ComponentService";
import KeyboardMovement from "../components/KeyboardMovements";
import AnimationOnInput from "../components/AnimationOnInput";
import SelectionCursor from "../components/SelectionCursor";
import DataPeople from "../components/DataPeople";
import DialogBox from "../components/DialogBox";
// import GameInTheGame from "./GameInTheGame";



export default class City extends Phaser.Scene {

   
    private components! : ComponentService
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private character2! : Phaser.Physics.Arcade.Sprite
    private santa! : Phaser.Physics.Arcade.Sprite

    private dialogBox : DialogBox | undefined

    private characters : Phaser.Physics.Arcade.Sprite[] = []
   

    
    constructor() {
        super('city')
        
    }
    init () {
        this.components = new ComponentService()
        this.cursors = this.input.keyboard.createCursorKeys();
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.components.destroy()
        })
    } 


    preload() {
    
    }

    create() {
        console.log("City creation")
        //@ts-ignore
        console.log(window.ghostInSchool)

        const ghost = this.physics.add.sprite(235,95,'ghostFalseCity',0)
        
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        
        
         //Create and display the map
         const map = this.make.tilemap({ key : 'city' })
         const tileset = map.addTilesetImage('tilemap_packed', 'tiles')
         map.createLayer('ground', tileset)
         const objectLayer = map.createLayer('object', tileset)
         const otherLayer =  map.createLayer('uplayer', tileset)

        objectLayer.setCollisionByProperty({collide:true})
        otherLayer.setCollisionByProperty({collide:true})

        
        //Add sprite to characters


        this.character2 = this.physics.add.sprite(100,100, 'character2')
       
                
        let peoples = [
            {
                "name": "dukes",
                "message": "Hello. I am dukes. I am hungry. Where can I find some chips and guac in this Dfinity Metaverse? ",
                "avatarNumber": 2
            },
            {
                "name": "First10digits",
                "message": "Follow me!",
                "avatarNumber": 10
            },
            {
                "name": "Howellikeawolf",
                "message": "Do I really have to?",
                "avatarNumber": 6
            },
            {
                "name": "whizwang",
                "message": "Roses are red, chai is tea, learn Motoko and build on the IC!",
                "avatarNumber": 4
            },
            {
                "name": "The Bob Blob",
                "message": "Blub... Blurb... Blooooob...",
                "avatarNumber": 10
            },
            {
                "name": "lastmjs",
                "message": "Greetings from the digital world",
                "avatarNumber": 4
            },
            {
                "name": "Chamfa",
                "message": "Pairplay",
                "avatarNumber": 10
            },
            {
                "name": "Hazel",
                "message": "Woah!",
                "avatarNumber": 10
            },
            {
                "name": "Jumbo",
                "message": "The might Jumbo\nUndefeated ",
                "avatarNumber": 9
            },
            {
                "name": "Jingo McMuffin",
                "message": "Felonious greetings from the ninth realm of Covfefed",
                "avatarNumber": 1
            }
        ]

        // let peoples = this.game.cache.custom.customCache.get('characters') as DataPeople[]
        const randomPosition : [x : number , y : number][] = [[320,100],[300,250],[200,228],[150,50],[150,280],[20,64],[180,350],[170,130],[320,30],[391,360]]
 

        for (let i = 0 ; i<10 ; i++) {

            let avatarNumber = peoples[i].avatarNumber
            let avatar = `avatar${avatarNumber}`
            this.characters[i] = this.physics.add.sprite(randomPosition[i][0] , randomPosition[i][1], avatar, 0)
            this.components.addComponent(this.characters[i], new DataPeople(peoples[i].name, peoples[i].message, peoples[i].avatarNumber))
            this.characters[i].body.setSize(15,25)
            this.characters[i].body.offset.y = 8
            this.physics.add.collider(this.character2, this.characters[i])
            this.characters[i].setImmovable();
            
        }
        this.santa = this.physics.add.sprite(110,235,'santa',0)
       
       
        
    
        this.character2.body.setSize(this.character2.width - 5,15,true)
        
        this.character2.body.offset.y = 15;
        this.character2.setCollideWorldBounds(true); //Prevent the character from moving out of the screen 

        

        //Few improvements regarding the collide body 

        this.santa.body.setSize(35,25,true)
        this.santa.body.offset.x = -4
        this.santa.body.offset.y = 8;

        
        this.santa.setImmovable();

        //Add components 

        this.components.addComponent(this.character2, new KeyboardMovement(this.cursors)) //Allow the character to move
        this.components.addComponent(this.character2, new AnimationOnInput (this.cursors))

        const pnjs = this.physics.add.staticGroup()
        pnjs.addMultiple(this.characters)
        pnjs.add(this.santa)
        pnjs.add(ghost)
    
        //Secret ghost
        //@ts-ignore
        if (window.ghostInSchool === true) {
            var ghostSecret = this.physics.add.sprite(0,150,'ghostFalseCity',0)
            ghostSecret.body.setSize(15,15)
            this.components.addComponent(ghostSecret, new DataPeople("secretGhost", "Secret",18))
        }
        
        this.components.addComponent(this.character2, new DialogBox (this.character2))
        this.dialogBox = this.components.findComponent(this.character2, DialogBox)
        this.dialogBox!.createWindow()
        this.dialogBox!._toggleWindow()
        this.components.addComponent(this.character2, new SelectionCursor (this.cursors, pnjs , this.character2, 8, 'city'))
        
        this.components.addComponent(this.santa , new DataPeople("santa", 'hohoho!' , 18)) //We need to add a Data component if we want to interact with Santa because the Selection Cursor uses it ...
        this.components.addComponent(ghost, new DataPeople  ("ghostCity", 'Enter the school',18)) 
       
       

        //Add colliders 


        this.physics.add.collider(this.character2, objectLayer)
        this.physics.add.collider(this.character2, otherLayer)
        this.physics.add.collider(this.character2, this.santa)
    
    

        // Create anims 
        createCharacterAnims(this.anims) 
        createAvatarAnims(this.anims)


        //Play anims

    
        this.santa.play('santa')
        this.characters.forEach ( (character) => {
           let dataCharacter = this.components.findComponent(character, DataPeople) as DataPeople
           character.play(`avatar${dataCharacter.avatarNumber}`)
        })

    
        //Sounds
       
        this.sound.stopAll()
        // const backgroundSound = this.sound.add('inTheCity')
        // backgroundSound.play()
        
        //Debug functionality

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
       
}
       


    update (_t : number, dt:number) {
        // Part of the component specification
        this.components.update(dt) 

    
    }
}