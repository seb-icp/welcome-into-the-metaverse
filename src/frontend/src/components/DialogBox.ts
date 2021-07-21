import { IComponent } from "../services/ComponentService";


export default class DialogBox implements IComponent
{

    private gameObject !  : Phaser.GameObjects.Container

    init(go : Phaser.GameObjects.Container) {
        this.gameObject = go
    }

    awake () {
        const {scene} = this.gameObject //Every gameobject contains a reference to it's scene
        var graphics = scene.add.graphics()
        graphics.lineStyle(2, 0xffff00,1)
        graphics.strokeRoundedRect(100,200,200,200,32)

         
    }

}