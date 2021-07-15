import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    constructor(){
        super('game')
    }

    preload() {
        
    }

    create () {
       
        this.add.image(200,200,'character')


    }
}