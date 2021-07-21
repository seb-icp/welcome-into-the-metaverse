import Phaser from "phaser"
import { getData } from "../data"

export default class Prepeloader extends Phaser.Scene {

    constructor() {
        super('prepeloader')
    }

    create() {
        console.log("start of create")

        getData().then( (data) => {
            console.log(data)
            //Stores data in cache
        })

        this.scene.start('preloader')
    
    }
}