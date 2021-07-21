import type { Principal } from '@dfinity/agent';
import { Actor,HttpAgent } from "@dfinity/agent";
import People from "./components/People"
import {idlFactory as multiverse_idl , canisterId as multiverse_id} from "./multiverse.js"

type Character = Character_2;
    interface Character_2 {
  'name' : string,
  'message' : string,
  'avatar' : bigint,
};

const agent = new HttpAgent();
const multi = Actor.createActor(multiverse_idl, {agent , canisterId : multiverse_id})

let data: Array<[Principal,Character]>;
let selectedCharacters : Array<[Principal,Character]>

const getData = async () =>  {
    data = await multi.getAllCharacters() as Array<[Principal,Character]>
    
    const dataShuffled = data.sort(() => 0.5 - Math.random())
    selectedCharacters = dataShuffled.slice(0,9)
    console.log(selectedCharacters)
    let peoples : People[] = []
    selectedCharacters.forEach( (character) => {
    let newPeople : People = new People(character[1].name , character[1].message, Number(character[1].avatar))
    peoples.push(newPeople)
    console.log(peoples)
});
    return peoples
}

export {getData}









