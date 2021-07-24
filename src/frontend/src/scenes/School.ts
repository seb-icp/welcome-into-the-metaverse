import Phaser from "phaser";
import { createCharacterAnims } from "../anims/MainCharacter";
import { createSchoolAnims } from "../anims/SchoolCharacter";
import AnimationOnInput from "../components/AnimationOnInput";
import DataPeople from "../components/DataPeople";
import DialogBox from "../components/DialogBox";
import KeyboardMovement from "../components/KeyboardMovements";
import SelectionCursor from "../components/SelectionCursor";
import ComponentService from "../services/ComponentService";

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
        this.load.audio('schoolSong', './audio/mahali-pazuri.mp3')

        this.load.spritesheet('peopleInSchool', './tileset/0_All_reading.png', {frameWidth:16, frameHeight: 32})
        this.load.spritesheet('guyComputer', './character/Adam_sit2_16x16.png', {frameWidth:32, frameHeight :32})
        this.load.spritesheet('girlComputer', './character/Conference_woman_sit2_16x16.png', {frameWidth:32, frameHeight :32})
        this.load.spritesheet('guyBar',"./character/Conference_man_idle_anim_16x16.png" , {frameWidth: 16 , frameHeight:32})
        this.load.spritesheet('girlSit',"./character/Amelia_sit3_16x16.png", {frameWidth:16, frameHeight:32})
        this.load.spritesheet('ghostReal' , './character/Ghost_1_angry_idle_16x16.png', {frameWidth: 16, frameHeight: 32})
        this.load.spritesheet('ghostFalse', './character/Ghost_1_angry_idle_16x16.png', {frameWidth: 10, frameHeight: 20})
        
        // this.load.spritesheet('door', './objects/animated_door_4.png', {frameWidth:15.3, frameHeight:32}) //Not clean borders
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
        //Items to interact with using the "ghost" trick: temporary solutions to interact with items

        const board = this.physics.add.sprite(115,12,'ghostFalse',0)

        const computer1 = this.physics.add.sprite(180,45,'ghostFalse',0)
        const computer2 = this.physics.add.sprite(180,80,'ghostFalse',0)

        const books1 = this.physics.add.sprite(215,160,'ghostFalse',0)
        const books2 = this.physics.add.sprite(350,218,'ghostFalse',0)

        const locker1 = this.physics.add.sprite(170,220,'ghostFalse',0)
        const locker2 = this.physics.add.sprite(105,220,'ghostFalse',0)  

        const poolTable = this.physics.add.sprite(300,100,'ghostFalse',0)    
        const wall = this.physics.add.sprite(240,220,'ghostFalse',0)

        const ghost2 = this.physics.add.sprite(190,390,'ghostFalse', 0)
        const ghost3 = this.physics.add.sprite(210,390,'ghostFalse', 0)
        const ghost4 = this.physics.add.sprite(230,390,'ghostFalse', 0)
        


        //Create map and tileset
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
        this.layers.push(map.createLayer('collision', tileset7))
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
        this.character2 = this.physics.add.sprite(300,250, 'character2')
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
        const ghost = this.physics.add.sprite(190,300,'ghost',0)

        //Items to interact with using the "ghost" trick

      

        this.characters = [teacher, girl, boyComputer, girlComputer, boyBar, girlSit, ghost, ghost2,ghost3,ghost4,board, computer1, computer2, books1, books2, locker1, locker2, poolTable, wall]
      
        this.characters.forEach(character => {
            character.body.setSize(16 , 25, true)
            character.body.offset.y = 5
            if (!(character === ghost || ghost2 || ghost3 || ghost4)) {
                this.physics.add.collider(this.character2, character)
            }
            
            character.setImmovable()
        });
        
        createSchoolAnims(this.anims)
        teacher.play('teacher')
        girl.play('girl')
        girlComputer.play('girlComputer')
        boyComputer.play('guyComputer')
        girlSit.play('girlSit')
        boyBar.play('guyBar')
        ghost.play('ghost')

        this.components.addComponent(teacher , new DataPeople("teacher", 'Welcome to the Motoko School! Take a seat and start a quizz' , 18))
        this.components.addComponent(girl , new DataPeople("girl", 'Have you tried writing on the board on my left ? You should...' , 18))
        this.components.addComponent(girlComputer , new DataPeople("girlComputer", 'I"m building Bunchd!' , 18))
        this.components.addComponent(boyComputer , new DataPeople("boyComputer", 'Woah!' , 18))
        this.components.addComponent(girlSit , new DataPeople("girl2", "I'm playing Saga tarot, do you want your fortune to be told? 🔮 \n \n * More infos at : l2jyf-nqaaa-aaaah-qadha-cai. raw.ic0.app *" , 18))
        this.components.addComponent(boyBar , new DataPeople("bar", 'Do you want something to drink ?' , 18))

        this.components.addComponent(ghost, new DataPeople ("ghost", "I'm a ghost in the shell, will you catch me?", 18))
        this.components.addComponent(ghost2, new DataPeople ("ghost2", "I'm a ghost in the shell, will you catch me?", 18))
        this.components.addComponent(ghost3, new DataPeople ("ghost3", "I'm a ghost in the shell, will you catch me?", 18))
        this.components.addComponent(ghost4, new DataPeople ("ghost4", "I'm a ghost in the shell, will you catch me?", 18))

        this.components.addComponent(board, new DataPeople  ("item", 'There are currently 214 nodes around the world that powers the Interner Computer 🌍  \n \n* More infos on ic.rocks🧊 *',18))
        this.components.addComponent(computer1, new DataPeople  ("item", 'Get started at dfinity.org/developers/ 💾' ,18))
        this.components.addComponent(computer2, new DataPeople  ("itemRandom", 'Join the Dfinity Dev Discord',18))
        this.components.addComponent(books1, new DataPeople  ("item", 'Non-interactive distributed key generation and key resharing. March 13,2021. Jens Groth. \n \n *Woah I have no idea what this means*',18))
        this.components.addComponent(books2, new DataPeople  ("item", 'The ICP guide - The ultimate guide to everything related to the Internet Computer Protocol.📚  \n \n *More infos on icp.guide *',18))
        this.components.addComponent(locker1, new DataPeople  ("item", '*This locker is locked for 8 years* 🔐 ',18))
        this.components.addComponent(locker2, new DataPeople  ("item", 'There seems to be 1 ICP inside this locker... how can I open this? 🤔 \n \n',18))
        this.components.addComponent(poolTable, new DataPeople  ("item", 'd ',18))
        this.components.addComponent(wall, new DataPeople  ("item", 'This is a wall seems I can write on it',18))
       
        
      
        
        this.components.addComponent(this.character2, new DialogBox(this.character2))
        const dialogBox = this.components.findComponent(this.character2, DialogBox)
        dialogBox!.createWindow()
        dialogBox!._toggleWindow()

        const pnjs = this.physics.add.staticGroup()
        this.components.addComponent(this.character2, new SelectionCursor (this.cursors, pnjs, this.character2, 8,'school'))

        
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




        
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // this.layers.forEach((layer) => {
        //     layer.renderDebug(debugGraphics, {
        //         tileColor:null,
        //         collidingTileColor:  new Phaser.Display.Color(243,234,48,255),
        //         faceColor: new Phaser.Display.Color(40,39,37,255)
        //         })
        //     })

        //Audio

        // this.sound.play('schoolSong')
    }

    update(_t : number , dt : number) {
        this.components.update(dt) 
    }
}