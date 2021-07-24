// @ts-ignore
import Phaser from "phaser";
import {IComponent, IComponentsService} from "../services/ComponentService"

import DataPeople from "./DataPeople";
import DialogBox from "./DialogBox";
import { playWithWall } from "../ICservices/game/wall";

export default class SelectionCursor implements IComponent {
    
    private readonly cursors! : Phaser.Types.Input.Keyboard.CursorKeys
    private readonly distance : number
    private readonly pnjs : Phaser.Physics.Arcade.StaticGroup
    private readonly character : Phaser.GameObjects.GameObject

    private selector!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    private gameObject! : Phaser.GameObjects.Shape
    private components !: IComponentsService 
    private dialog : DialogBox | undefined

    private sceneName : string //Temporary solution

    private selectedPeople : Phaser.GameObjects.GameObject | undefined

    constructor(cursors : Phaser.Types.Input.Keyboard.CursorKeys, pnjs : Phaser.Physics.Arcade.StaticGroup, character : Phaser.GameObjects.GameObject , distance = 8, sceneName :string) {
        this.cursors = cursors
        this.pnjs = pnjs
        this.distance = distance
        this.character = character
        this.sceneName = sceneName
    }

    init(go : Phaser.GameObjects.GameObject, components : IComponentsService) {
        this.gameObject =  go as Phaser.GameObjects.Shape
        this.components = components
        this.dialog = this.components.findComponent(this.character,DialogBox)
    }
    
    awake () {

        const {scene} = this.gameObject

        const box = scene.add.rectangle(0,0,16,16,0xffffff,0)
        scene.physics.add.existing(box)

        this.selector = box as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
        scene.physics.add.overlap(this.selector, this.pnjs.getChildren() , this.handleOverlap, undefined , this)
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

    private handleOverlap (_obj1 : Phaser.GameObjects.GameObject, pnj : Phaser.GameObjects.GameObject) {
       
        if (!this.cursors.space.isDown)
		{
			return
		}

        

      if (this.dialog === undefined) {
          console.log("problem...")
          return;
      }
      if (this.dialog.isDialogBoxVisible()) {
          console.log('already talking to someone')
          return; //Means we are alredy talking to someone
          
        }

        
        this.selectedPeople = pnj
        const data = this.components.findComponent(pnj, DataPeople)
        this.dialog!._toggleWindow() 
        
        let text : string = '....'
        //This is fucked but will fix that later

        if (this.sceneName === 'city') {
                text = `Hello my name is ${data.name}! ${data.message}`
            if (data.name === 'santa') {
                text = "Do you want some ICP ?"
            }
        }

        else if (this.sceneName === 'school') {
            if (data.name === 'girl') {
                playWithWall()
            }

            if (data.name === 'ghost') {
                text = `${data.message}`
                this.dialog!.setText(text, true)
                pnj.destroy()
                return;
            }

            if(data.name === 'ghost2'|| data.name === 'ghost3' || data.name === 'ghost4') { //To move from school to city scene
                const {scene} = this.gameObject
                scene.scene.start('city')
                return;
            }
            
            if(data.name === 'item') {
                text = data.message
            }
            else {
                text = data.message
            }
        }

        else {
            text = 'Hmm this is strange, probably a bug you shouldnt be here'
        }
        

        this.dialog!.setText(text, true)

    }
}
