import { IComponent } from "../services/ComponentService";
//Will be used to store data

export default class DataPeople implements IComponent {


    readonly name : string
    readonly message : string
    readonly avatarNumber : number

    gameObject! : Phaser.GameObjects.GameObject

    constructor(name: string, message : string, avatarNumber : number ) {
        this.name = name 
        this.message = message
        this.avatarNumber = avatarNumber
    }

    init (go: Phaser.GameObjects.GameObject) {
        this.gameObject = go 
    }

}