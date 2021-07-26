import Phaser from "phaser"
import { getData } from "../ICservices/game/data"

export default class Preloader extends Phaser.Scene {

    constructor() {
        super('prepeloader')
    }
    preload() {
        this.add.text(100,100,"Transfering your brain.... ")
        this.load.audio('schoolSong', './audio/POL.mp3')
        this.load.audio('inTheCity', './audio/in-the-city.mp3')

        //Special characters :
        this.load.spritesheet('santa', './character/santa.png', {frameWidth:48, frameHeight : 32})
        this.load.spritesheet('character2', './character/Alex_run_16x16.png',{frameWidth:16, frameHeight : 32});
          
        //Characters coming from the metaverse
        this.load.spritesheet('avatar1', './character/avatar1.png',{frameWidth:16, frameHeight : 32});
        this.load.spritesheet('avatar2', './character/avatar2.png' , {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar3', './character/avatar3.png', {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar4', './character/avatar4.png', {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar5', './character/avatar5.png' , {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar6', './character/avatar6.png', {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar7', './character/avatar7.png',{frameWidth:16, frameHeight : 32});
        this.load.spritesheet('avatar8', './character/avatar8.png', {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar9', './character/avatar9.png' , {frameWidth:16, frameHeight : 32})
        this.load.spritesheet('avatar10', './character/avatar10.png', {frameWidth:16, frameHeight : 32})

       //Spritesheet for characters in the school
        this.load.spritesheet('peopleInSchool', './tileset/0_All_reading.png', {frameWidth:16, frameHeight: 32})
        this.load.spritesheet('guyComputer', './character/Adam_sit2_16x16.png', {frameWidth:32, frameHeight :32})
        this.load.spritesheet('girlComputer', './character/Conference_woman_sit2_16x16.png', {frameWidth:32, frameHeight :32})
        this.load.spritesheet('guyBar',"./character/Conference_man_idle_anim_16x16.png" , {frameWidth: 16 , frameHeight:32})
        this.load.spritesheet('girlSit',"./character/Amelia_sit3_16x16.png", {frameWidth:16, frameHeight:32})
        this.load.spritesheet('ghostReal' , './character/Ghost_1_angry_idle_16x16.png', {frameWidth: 16, frameHeight: 32})
        this.load.spritesheet('ghostFalseSchool', './character/Ghost_1_angry_idle_16x16.png', {frameWidth: 10, frameHeight: 20})
        this.load.spritesheet('ghostFalseCity', './character/Ghost_1_angry_idle_16x16.png', {frameWidth: 32, frameHeight: 32})
       // Tileset for the school
       
  
        // Load the map city and it tileset
        
        this.load.image('tiles', './map/tilemap_packed.png')
        this.load.tilemapTiledJSON('city', './map/city.json')


        //Load the map school and its tilesets
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

    create() {

        getData().then( (data) => {
            
          
            this.game.cache.addCustom('customCache'); //Creates a new custom cache for storing any type of data I want
            this.game.cache.custom.customCache.add('characters', data) 
         }).then( () => this.scene.start('city'))
     
        
    }
}