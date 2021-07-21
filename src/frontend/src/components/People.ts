import { IComponent } from "../services/ComponentService";


export default class People implements IComponent {


    readonly name : string
    readonly message : string
    readonly avatarNumber : number

    gameObject! : Phaser.GameObjects.GameObject
    private readonly scene : Phaser.Scene
    constructor(name: string, message : string, avatarNumber : number, scene : Phaser.Scene) {
        this.name = name 
        this.message = message
        this.avatarNumber = avatarNumber
        this.scene = scene
    }

    init (go: Phaser.GameObjects.GameObject) {
        this.gameObject = go //Probably the main character
    }



    _loadAssets = () => {
        this.scene.load.spritesheet(`avatar${this.avatarNumber}`, './character/avatar1.png'
    }
}