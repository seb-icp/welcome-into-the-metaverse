import Phaser from "phaser"
// import { getData } from "../data"

export default class Prepeloader extends Phaser.Scene {

    constructor() {
        super('prepeloader')
    }
    preload() {
        this.add.text(200,200,"Game is loading...")

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
       
  
          // Load the map
  
          this.load.image('tiles', './map/tilemap_packed.png')
          this.load.tilemapTiledJSON('city', './map/city.json')
  
          
          //Load audio
  
          this.load.audio('inTheCity', './audio/in-the-city.mp3')
 
    }

    create() {
        console.log("start of create")


        // getData().then( (data) => {
            
        //     console.log(data)
        //     this.game.cache.addCustom('customCache'); //Creates a new custom cache for storing any type of data I want
        //     this.game.cache.custom.customCache.add('characters', data) 
        //  }).then( () => this.scene.start('preloader'))
        this.scene.start('school')
    }
}