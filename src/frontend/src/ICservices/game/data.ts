import type { Principal } from '@dfinity/agent';
import { Actor,HttpAgent } from "@dfinity/agent";
import DataPeople from '../../components/DataPeople';
import {idlFactory as multiverse_idl , canisterId as multiverse_id} from "../metaverse/multiverse.js"


type Character = Character_2;
    interface Character_2 {
  'name' : string,
  'message' : string,
  'avatar' : bigint,
};

const agent = new HttpAgent();
const multi = Actor.createActor(multiverse_idl, {agent , canisterId : multiverse_id})

let data: Array<[Principal,Character]>;


const getData = async () =>  {
    data = await multi.getAllCharacters() as Array<[Principal,Character]>
    
    const numberOfPeople = data.length

    const randomInts = (quantity : number, max : number) => {
        const set = new Set()
        while(set.size < quantity) {
          set.add(Math.floor(Math.random() * max) + 1)
        }
        return set
      }

    const myRandomInts = randomInts(10, numberOfPeople) as Set<number>
    let dataPeoples : DataPeople[] = []
    for (let item of myRandomInts) {
        let newPeople = new DataPeople(data[item][1].name , data[item][1].message , Number(data[item][1].avatar))
        dataPeoples.push(newPeople)
    }
    return dataPeoples
}

export {getData}









