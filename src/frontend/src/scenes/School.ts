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
        
    }
    
    init () {
        this.components = new ComponentService()
        this.cursors = this.input.keyboard.createCursorKeys();
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.components.destroy()
        })
    } 

    create() {

        this.sound.stopAll()
        this.sound.play('schoolSong')

        // console.log("School creation")
        // Create anims 
        createCharacterAnims(this.anims) 
        //Items to interact with using the "ghost" trick: temporary solutions to interact with items

        const board = this.physics.add.sprite(115,12,'ghostFalseSchool',0)

        const computer1 = this.physics.add.sprite(180,45,'ghostFalseSchool',0)
        const computer2 = this.physics.add.sprite(180,80,'ghostFalseSchool',0)

        const books1 = this.physics.add.sprite(215,160,'ghostFalseSchool',0)
        const books2 = this.physics.add.sprite(350,218,'ghostFalseSchool',0)

        const locker1 = this.physics.add.sprite(170,220,'ghostFalseSchool',0)
        const locker2 = this.physics.add.sprite(105,220,'ghostFalseSchool',0)  

        const poolTable = this.physics.add.sprite(300,100,'ghostFalseSchool',0)    
        const wall = this.physics.add.sprite(240,220,'ghostFalseSchool',0)

        const ghost2 = this.physics.add.sprite(190,390,'ghostFalseSchool', 0)
        const ghost3 = this.physics.add.sprite(210,390,'ghostFalseSchool', 0)
        const ghost4 = this.physics.add.sprite(230,390,'ghostFalseSchool', 0)
        const ghost5 = this.physics.add.sprite(160,10,'ghostFalseSchool',0)
        const ghost6 = this.physics.add.sprite(120,70,'ghostFalseSchool',0)
        


        //Create map and tileset
        const map = this.make.tilemap({key : 'school'})

        const tileset1 = map.addTilesetImage('0_All_reading', 'tiles1')
        const tileset2 = map.addTilesetImage('5_Classroom_and_library_16x16', 'tiles2')
        // const tileset3 = map.addTilesetImage('Adam_16x16' ,'tiles3')
        const tileset4 = map.addTilesetImage('Bob_16x16', 'tiles4')
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
        this.layers.push(map.createLayer('character class3', tileset4))
        this.layers.push(map.createLayer('objet4', tileset2))
       
        
        //
        this.character2 = this.physics.add.sprite(211,375, 'character2')
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
        


        let ghost = this.physics.add.sprite(500,500,"ghostReal",0)
         //@ts-ignore
         if (!window.ghostInSchool === true) {
            ghost = this.physics.add.sprite(190,300,'ghostReal',0)
            //@ts-ignore
            window.ghostInSchool = !(window.ghostInSchool)
            this.components.addComponent(ghost, new DataPeople ("ghost", "I'm a ghost in the shell, will you catch me?", 18))
            this.characters = [teacher, girl, boyComputer, girlComputer, boyBar, girlSit, ghost, ghost2,ghost3,ghost4, ghost5, ghost6, board, computer1, computer2, books1, books2, locker1, locker2, poolTable, wall]
        } else {
            this.characters = [teacher, girl, boyComputer, girlComputer, boyBar, girlSit, ghost, ghost2,ghost3,ghost4, ghost5, ghost6, board, computer1, computer2, books1, books2, locker1, locker2, poolTable, wall]
        }
    
      
        this.characters.forEach(character => {
            character.body.setSize(15 , 25, true)
            character.body.offset.y = 5
            if (!(character === ghost || ghost2 || ghost3 || ghost4 || ghost5)) {
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

        //@ts-ignore
        


        const randomForGirlComputer : string[] = ["I'm building Distrikt, a decentralized professional social network! Come, go and expand your distrikt!", "I'm building Bunchd, I'm experimenting crazy stuffs and I'm eating ramen 🍜", "Motoko School will be awesome :)", "Hello I'm Liz, what FUD is there today ? 🥊"]
        const randomForGuyComputer : string[] = ["I'm hard at work building Sudograph..check out beta 0.3.0 already! Oh and don't forget to listen to Demergence! 🎧", "Bonjour! I'm building Aedile, a management project that I'll help you collaborate and build other projects on the Internet Computer! 🛠", "I'm building Stoic Wallet and Rise of The Magni, check out our lab : Toniq Labs! 🧪" , "I'm building Fleek and I'm plugging in the metaverse 🔌", "Hey, I'm building DSCVR, you're favorite Internet Computer application! Hmm what do you think about Hackathon #2? 💭 ", "Hello I'm Kyle Peacock, I'm recording an awesome tutorial serie and.... 0.80 is out! 📹", "Hello it's me Nico, I love Web 3.0, governance but above all I love when my code compile and there is no error. ✨" , "Welcome to the Dfinity Developer community, my name is Igor,I can help you if you need any assistance here! 👨🏻‍🏫 " , "Hello! I'm Bob and I write a ton of stuff to explain how the Internet Computer works, check out my guide somewhere in the building! 📚"]
        const randomForComputer  : string [] =  ["List your canisters on Canlista!", "Join the Dfinity Dev Discord and be there on Friday : 12 PM PT / 3 PM ET / 9 PM CET / 7 PM UTC ... not 6PM UTC!" , "Join the ICP maximalist network and becomes an ambassador!" , "Claim your cycles!" , "Join the ICP squad and becomes a contributor!", "Get started at dfinity.org/developers/ "]
        const randomForGirl : string [] = ["I'm playing Saga tarot, do you want your fortune to be told? 🔮 \n * More infos at : l2jyf-nqaaa-aaaah-qadha-cai. raw.ic0.app *" , "I'm playing FudBuster, who said there is no ressource to learn here? 📚 \n * More infos at https://zxkrk-xyaaa-aaaad-qad5q-cai.ic.fleek.co/ *", "I'm playing at Rise of the Magni, show me your strategy! 🧠 \n * More infos at https://riseofthemagni.com/ *", "I'm playing Motoko Runner, I love this game! Did you know that I've installed it on one of our computer here? 👨‍💻" , "I'm playing at Fly Aves! Daaaaaamn this is hard  \n * More infos at https://bjv3y-niaaa-aaaah-aadsq-cai.ic0.app/ *"]
        const randomForTelevision : string[] = ["ICP-NEWS The Internet Computer Reporter 📺" , "BREAKING NEWS - Dominic Williams just announced Ethereum and IC intereropability through Chain Key Cryptography 🔑" , "Mercury Launch Event 🎤 - Announcing the Internet Computer Mainnet and a 20 year Roadmap!" , "BREAKING NEWS - There is no trace of COVID 🦠 in the metaverse 🙌" , "BREAKING NEWS - The Internet Computer blockchain recently surpassed 100MM blocks 💯 of Friday, July 23, 2021 09:15:28 AM"]

        function getARandomMessage (array : string []) {
            let l = array.length
            // console.log(l)
            const x = Math.floor(Math.random() * l);
            return (array[x])
        }

        const messageA = getARandomMessage(randomForGirlComputer)
        // console.log(messageA)

        const messageB = getARandomMessage(randomForGuyComputer)
        // console.log(messageB)

        const messageC = getARandomMessage(randomForComputer)
        // console.log(messageC)

        const messageD = getARandomMessage(randomForGirl)
        // console.log(messageD)

        const messageE = getARandomMessage(randomForTelevision)

    

        this.components.addComponent(teacher , new DataPeople("teacher", "Welcome to the Motoko School, my name is Steve, I will be your teacher for today! Take a seat and start a quizz *To come*-" , 18))
        this.components.addComponent(girl , new DataPeople("girl", 'I love those olds books where they talk about Bitcoin' , 18))
        this.components.addComponent(girlComputer , new DataPeople("girlComputer", messageA , 18))
        this.components.addComponent(boyComputer , new DataPeople("boyComputer", messageB , 18))
        this.components.addComponent(girlSit , new DataPeople("girl2", messageD , 18))
        this.components.addComponent(boyBar , new DataPeople("bar", 'Hmmm coding is exhausting... do you want something to drink ?' , 18))

       
        this.components.addComponent(ghost2, new DataPeople ("ghost2", "I'm a ghost in the shell, will you catch me?", 18))
        this.components.addComponent(ghost3, new DataPeople ("ghost3", "I'm a ghost in the shell, will you catch me?", 18))
        this.components.addComponent(ghost4, new DataPeople ("ghost4", "I'm a ghost in the shell, will you catch me?", 18))
        this.components.addComponent(ghost5, new DataPeople ("item", messageE , 18))
        this.components.addComponent(ghost6, new DataPeople('item',"Shhhh.. I'm trying to concentrate.", 18 ))
        

        this.components.addComponent(board, new DataPeople  ("item", 'There are currently 214 nodes around the world that powers the Interner Computer 🌍  \n \n* More infos on ic.rocks🧊 *',18))
        this.components.addComponent(computer1, new DataPeople  ("item", messageC ,18))
        this.components.addComponent(computer2, new DataPeople  ("gameInTheGame", 'd' ,18))
        this.components.addComponent(books1, new DataPeople  ("item", 'Non-interactive distributed key generation and key resharing. March 13,2021. Jens Groth. \n \n *Woah I have no idea what this means*',18))
        this.components.addComponent(books2, new DataPeople  ("item", 'The ICP guide - The ultimate guide to everything related to the Internet Computer Protocol.📚  \n \n *More infos on icp.guide *',18))
        this.components.addComponent(locker1, new DataPeople  ("locker", '*This locker is locked for 8 years* 🔐 ',18))
        this.components.addComponent(locker2, new DataPeople  ("item", 'There seems to be 1 ICP inside this locker... how can I open this? 🤔 \n \n',18))
        this.components.addComponent(poolTable, new DataPeople  ("item", 'd ',18))
        this.components.addComponent(wall, new DataPeople  ("wall", 'Should I try to write on this wall ?',18))
       
        
      
        
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
        this.physics.add.collider(this.character2, teacher)
        this.physics.add.collider(this.character2, girl)
        this.physics.add.collider(this.character2, boyComputer)
        this.physics.add.collider(this.character2, girlComputer)
        this.physics.add.collider(this.character2, boyBar)




        
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // this.layers.forEach((layer) => {
        //     layer.renderDebug(debugGraphics, {
        //         tileColor:null,
        //         collidingTileColor:  new Phaser.Display.Color(243,234,48,255),
        //         faceColor: new Phaser.Display.Color(40,39,37,255)
        //         })
        //     })

        //Audio

        this.sound.stopAll()
        this.sound.play('schoolSong')

        
    }

    update(_t : number , dt : number) {
        this.components.update(dt) 
    }
}