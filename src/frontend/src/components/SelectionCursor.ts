// @ts-ignore
import Phaser, { GameObjects } from "phaser";

import {IComponent, IComponentsService} from "../services/ComponentService"



import DataPeople from "./DataPeople";
import DialogBox from "./DialogBox";


export default class SelectionCursor implements IComponent {
    
    private readonly cursors! : Phaser.Types.Input.Keyboard.CursorKeys
    private readonly distance : number
    private readonly pnjs : Phaser.Physics.Arcade.StaticGroup
    private readonly character : Phaser.GameObjects.GameObject

    private selector!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    private gameObject! : Phaser.GameObjects.Shape
    private components !: IComponentsService 
    private dialog : DialogBox | undefined

    private selectedPeople : Phaser.GameObjects.GameObject | undefined

    constructor(cursors : Phaser.Types.Input.Keyboard.CursorKeys, pnjs : Phaser.Physics.Arcade.StaticGroup, character : Phaser.GameObjects.GameObject , distance = 24) {
        this.cursors = cursors
        this.pnjs = pnjs
        this.distance = distance
        this.character = character
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
       
        if (!Phaser.Input.Keyboard.JustUp(this.cursors.space))
		{
			return
		}

        

      if (this.dialog === undefined) {
          console.log("problem...")
          return;
      }
      if (this.dialog.isDialogBoxVisible()) {
          return; //Means we are alredy talking to someone
        }
        
        this.selectedPeople = pnj
        const data = this.components.findComponent(this.selectedPeople, DataPeople)
        this.dialog!._toggleWindow() 
        let text = `Hello my name is ${data.name}! ${data.message}`
        if (data.name === 'santa') {
            text = "Do you want some ICP ?"
        }
      
      

        this.dialog!.setText(text, true)

    }
}
