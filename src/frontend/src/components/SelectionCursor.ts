// @ts-ignore
import Phaser from "phaser";

import {IComponent, IComponentsService} from "../services/ComponentService"

import People from "./People";
import DialogTry from "../plugin/DialogTry";


export default class SelectionCursor implements IComponent {
    
    private readonly cursors! : Phaser.Types.Input.Keyboard.CursorKeys
    private readonly distance : number
    private readonly people : Phaser.Physics.Arcade.Sprite

    private selector!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    private gameObject! : Phaser.GameObjects.Shape
    private components !: IComponentsService 

    private selectedPeople? : People

    constructor(cursors : Phaser.Types.Input.Keyboard.CursorKeys, people : Phaser.Physics.Arcade.Sprite,  distance = 24) {
        this.cursors = cursors
        this.people = people
        this.distance = distance
    }

    init(go : Phaser.GameObjects.GameObject, components : IComponentsService) {
        this.gameObject =  go as Phaser.GameObjects.Shape
        this.components = components
    }
    
    awake () {

        const {scene} = this.gameObject

        const box = scene.add.rectangle(0,0,16,16,0xffffff,0)
        scene.physics.add.existing(box)

        this.selector = box as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
        scene.physics.add.overlap(this.selector, this.people , this.handleOverlap, undefined , this)
    }

    update() {
        const {x , y} = this.gameObject

        if (this.cursors.left.isDown) {

            this.selector.setPosition(x - this.distance , y)
        }
        else if  (this.cursors.right.isDown) {
            this.selector.setPosition(x + this.distance , y)
        }
        else if (this.cursors.up.isDown) {
            this.selector.setPosition(x , y - this.distance)
        }
        else if (this.cursors.down.isDown) {
            this.selector.setPosition(x , y + this.distance)
        }
    
    }

    private handleOverlap (_obj1 : Phaser.GameObjects.GameObject, people : Phaser.GameObjects.GameObject) {
       
        
        if (this.selectedPeople?.gameObject === people) {
            return
        }
        console.log(this.components) //this is undefined
        
        

        this.selectedPeople = this.components.findComponent(people , People)
        let dialog = new DialogTry (this.gameObject)

        dialog.createWindow()
        dialog.setText(`Hello my name is ${this.selectedPeople?.name},  ${this.selectedPeople?.message}`, true)

    }
}
