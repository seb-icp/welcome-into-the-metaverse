import Phaser from "phaser";

import {IComponent} from "../services/ComponentService"

export default class SelectionCursor implements IComponent {
    
    private readonly cursors! : Phaser.Types.Input.Keyboard.CursorKeys
    private selector!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    private gameObject! : Phaser.GameObjects.Sprite


    constructor(cursors : Phaser.Types.Input.Keyboard.CursorKeys) {
        this.cursors = cursors
    }

    init(go : Phaser.GameObjects.GameObject) {
        this.gameObject =  go as Phaser.GameObjects.Sprite
    }
    
    awake () {

        const {scene} = this.gameObject

        const box = scene.add.rectangle(0,0,16,16,0xffffff,0)
        scene.physics.add.existing(box)

        this.selector = box as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    }

    update(dt : number) {
        const {x , y} = this.gameObject

        if (this.cursors.left.isDown) {

            this.selector.setPosition(x - 16 , y)
        }
        else if  (this.cursors.right.isDown) {
            this.selector.setPosition(x + 16 , y)
        }
        else if (this.cursors.up.isDown) {
            this.selector.setPosition(x , y - 16)
        }
        else if (this.cursors.down.isDown) {
            this.selector.setPosition(x , y + 16)
        }
    
    }
}
