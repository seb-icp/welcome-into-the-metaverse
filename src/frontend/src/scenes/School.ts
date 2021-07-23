import Phaser from "phaser";

import { createCharacterAnims } from "../anims/MainCharacter";

import ComponentService from "../services/ComponentService";
import KeyboardMovement from "../components/KeyboardMovements";
import AnimationOnInput from "../components/AnimationOnInput";

import { createSchoolAnims } from "../anims/SchoolCharacter";
import DataPeople from "../components/DataPeople";
import DialogBox from "../components/DialogBox";
import SelectionCursor from "../components/SelectionCursor";



export default class School extends Phaser.Scene {


    private components! : ComponentService
    private cursors! : Phaser.Types.Input.Keyboard.CursorKeys
    private character2! : Phaser.Physics.Arcade.Sprite

    private layers! : any[]
    private characters : Phaser.Physics.Arcade.Sprite[] = []

    constructor () {
        super("school")
    }

    preload () {
        this.load.image('tiles1' , './tileset/0_All_reading.png')
        this.load.image('tiles2' , './tileset/5_Classroom_and_library_16x16.png')
        this.load.image('tiles3' , './tileset/Adam_16x16.png')
        this.load.image('tiles4' , './tileset/Bob_16x16.png')
        this.load.image('tiles5' , './tileset/Interiors_16x16.png')
        this.load.image('tiles6' , './tileset/Room_Builder_borders_16x16.png')
        this.load.image('tiles7' , './tileset/Room_Builder_Floors_16x16.png')
        this.load.image('tiles8' , './tileset/Room_Builder_Walls_16x16.png')

        this.load.tilemapTiledJSON('school', './tileset/school.json')
       
    }
    init () {
        this.components = new ComponentService()
        this.cursors = this.input.keyboard.createCursorKeys();
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.components.destroy()
        })
    } 

    create() {

        // Create anims 
        createCharacterAnims(this.anims) 
   
         
        const map = this.make.tilemap({key : 'school'})

        const tileset1 = map.addTilesetImage('0_All_reading', 'tiles1')
        const tileset2 = map.addTilesetImage('5_Classroom_and_library_16x16', 'tiles2')
        //tileset 3 and 4 deleted not usefull anymore : flemme de changer les indices
        const tileset5 = map.addTilesetImage('Interiors_16x16', 'tiles5')
        const tileset6 = map.addTilesetImage('Room_Builder_borders_16x16', 'tiles6')
        const tileset7 = map.addTilesetImage('Room_Builder_Floors_16x16', 'tiles7')
        const tileset8 = map.addTilesetImage('Room_Builder_Walls_16x16', 'tiles8')

        //This is probably the worst thing I've done in my life
        this.layers = []

        this.layers.push(map.createLayer('border', tileset6))
        this.layers.push(map.createLayer('floor', tileset7))
        this.layers.push(map.createLayer('wall', tileset8))
        this.layers.push(map.createLayer('character front', tileset1))
        this.layers.push(map.createLayer('objet bar1',tileset5))
        this.layers.push(map.createLayer('table', tileset5))
        this.layers.push(map.createLayer('objet bar 2', tileset5))
        this.layers.push(map.createLayer('objet bar 3', tileset5))
        this.layers.push(map.createLayer('object1', tileset2))
        this.layers.push(map.createLayer('objet2',  tileset5 )) //Problem with this one
        this.layers.push(map.createLayer('objet2bis', tileset2))
        this.layers.push(map.createLayer('objet3', tileset5))
        this.layers.push(map.createLayer('objet3bis', tileset2))
        this.layers.push(map.createLayer('objet4', tileset2))
       
        
        //
        this.character2 = this.physics.add.sprite(100,100, 'character2')
        this.character2.body.setSize(this.character2.width - 5,15,true)
        this.character2.body.offset.y = 15;
        this.character2.setCollideWorldBounds(true); //Prevent the character from moving out of the screen 
        this.components.addComponent(this.character2, new KeyboardMovement(this.cursors)) //Allow the character to move
        this.components.addComponent(this.character2, new AnimationOnInput (this.cursors)) //Animations with cursors movements


        //Create and anims sprite
        const teacher = this.physics.add.sprite(60,35,'peopleInSchool',252)
        const girl = this.physics.add.sprite(200,223,'peopleInSchool',55)
        const boyComputer = this.physics.add.sprite(170,120,'guyComputer', 0)
        const girlComputer = this.physics.add.sprite(213,53,'girlComputer',8)
        const boyBar = this.physics.add.sprite(320,26,'guyBar',18)
        const girlSit = this.physics.add.sprite(350,150, 'girlSit',0)

        this.characters = [teacher, girl, boyComputer, girlComputer, boyBar, girlSit]
      
        this.characters.forEach(character => {
            character.body.setSize(16 , 25, true)
            character.body.offset.y = 5
            this.physics.add.collider(this.character2, character)
            character.setImmovable()
        });
        
        createSchoolAnims(this.anims)
        teacher.play('teacher')
        girl.play('girl')
        girlComputer.play('girlComputer')
        boyComputer.play('guyComputer')
        girlSit.play('girlSit')
        boyBar.play('guyBar')
        this.components.addComponent(teacher , new DataPeople("teacher", 'Welcome to the Motoko School! Take a seat' , 18))
        this.components.addComponent(girl , new DataPeople("girl", 'Have you tried writing on the board on my left ? You should...' , 18))
        this.components.addComponent(girlComputer , new DataPeople("santa", 'hohoho!' , 18))
        this.components.addComponent(boyComputer , new DataPeople("santa", 'hohoho!' , 18))
        this.components.addComponent(girlSit , new DataPeople("santa", 'hohoho!' , 18))
        this.components.addComponent(boyBar , new DataPeople("santa", 'hohoho!' , 18))
        
        this.components.addComponent(this.character2, new DialogBox(this.character2))
        const dialogBox = this.components.findComponent(this.character2, DialogBox)
        dialogBox!.createWindow()
        dialogBox!._toggleWindow()
        const pnjs = this.physics.add.staticGroup()
        this.components.addComponent(this.character2, new SelectionCursor (this.cursors, pnjs, this.character2, 8,'school'))
        
        this.components.addComponent(this.character2, new DialogBox(this.character2))
        
        // We need a static group to use the SelectionCursors component because we use the getChildren() function inside of it... not the time to fix that
        pnjs.addMultiple(this.characters)
        

        // Add collision by property as set it Tiled

        this.layers.forEach((layer) => {
            layer.setCollisionByProperty({collide : true})
            
        })

        //Add collider 
        this.layers.forEach((layer) => {
           this.physics.add.collider(this.character2, layer)
        })




        //Debug
    //     const debugGraphics = this.add.graphics().setAlpha(0.7)
    //     this.layers.forEach((layer) => {
    //         layer.renderDebug(debugGraphics, {
    //             tileColor:null,
    //             collidingTileColor:  new Phaser.Display.Color(243,234,48,255),
    //             faceColor: new Phaser.Display.Color(40,39,37,255)
    //             })
    //         })
    }

    update(_t : number , dt : number) {
        this.components.update(dt) 
    }
}