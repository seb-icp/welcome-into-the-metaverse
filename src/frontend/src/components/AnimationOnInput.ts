import Phaser from "phaser"

import { IComponent } from "../services/ComponentService"

export default class AnimationOnInput implements IComponent {


    private gameObject! : Phaser.GameObjects.Sprite
    private readonly cursors : Phaser.Types.Input.Keyboard.CursorKeys
   
    private dir! : Phaser.Animations.Animation

    constructor(cursors : Phaser.Types.Input.Keyboard.CursorKeys) {
        this.cursors = cursors
        
    }

    init(go : Phaser.GameObjects.GameObject) {
        this.gameObject = go as Phaser.GameObjects.Sprite
    }

    update () {

        if (this.cursors.left.isDown) {
            this.gameObject.play('left',true)
            this.dir = this.gameObject.anims.currentAnim
        }

        else if (this.cursors.right.isDown) {
            
            this.gameObject.play('right', true)
            this.dir = this.gameObject.anims.currentAnim
            
        }
        
        else if (this.cursors.up.isDown) {
            this.gameObject.play('up', true)
            this.dir = this.gameObject.anims.currentAnim
            
        }

        else if (this.cursors.down.isDown) {
            this.gameObject.play('down', true)
            this.dir = this.gameObject.anims.currentAnim
            
        }
        else if (this.dir) {
            const direction = this.dir.key
            this.gameObject.play(`idle-${direction}`)
        }
        else {
            return
        }
    }
}