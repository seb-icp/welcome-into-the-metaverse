import Phaser from "phaser";

export default class School extends Phaser.Scene {
    constructor () {
        super("school")
    }

    preload () {
        this.load.image('tiles1' , './tileset/0_All_reading.png')
        this.load.image('tiles2' , './tileset/5_Classroom_and_library_16x16.png')
        this.load.image('tiles3' , './tileset/Adam_16x16.png')
        this.load.image('tiles4' , './tileset/Bob_16x16.png')
        this.load.image('tiles5' , './tileset/Interiors_16x16.png')
        this.load.image('tiles6' , './tileset/Room_Builder_borders_16x16.png')
        this.load.image('tiles7' , './tileset/Room_Builder_Floors_16x16.png')
        this.load.image('tiles8' , './tileset/Room_Builder_Walls_16x16.png')

        this.load.tilemapTiledJSON('school', './tileset/school.json')
       
    }

    create() {
        const map = this.make.tilemap({key : 'school'})

        const tileset1 = map.addTilesetImage('0_All_reading', 'tiles1')
        // const tileset2 = map.addTilesetImage('5_Classroom_and_library_16x16', 'tiles2')
        // const tileset3 = map.addTilesetImage('Adam_16x16', 'tiles3')
        // const tileset4 = map.addTilesetImage('Bob_16x16', 'tiles4')
        // const tileset5 = map.addTilesetImage('Interiors_16x16', 'tiles5')
        const tileset6 = map.addTilesetImage('Room_Builder_borders_16x16', 'tiles6')
        const tileset7 = map.addTilesetImage('Room_Builder_Floors_16x16', 'tiles7')
        const tileset8 = map.addTilesetImage('Room_Builder_Walls_16x16', 'tiles8')

        map.createLayer('border', tileset6)
        map.createLayer('floor', tileset7)
        map.createLayer('wall', tileset8)
        // map.createLayer('doors', tileset8)
        map.createLayer('character front', tileset1)
        map.createLayer('wall', tileset8)
        map.createLayer('wall', tileset8)


    }
}