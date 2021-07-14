import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    constructor(){
        super('game')
    }

    preload() {
        this.load.image('logo', "./Banner.png")
    }

    create () {
        this.add.image(400,300,'logo')
    }
}