import Hashmap "mo:base/HashMap";
import Types "./types";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Array "mo:base/Array";

actor {


    //Doing that because I'm becoming crazy I can't get to create an Actor for my canister that is already live on the IC even if I have the did.js file there is something that breaks because this canister is not in this project (??? look for a solution later)

    public type Character = {
        name : Text;
        message : Text;
        avatar : Nat ;//Doesn't make sense without associated front-end but user will be able to choose their character based on a few avatars.
    };

    public type OtherCanister = actor {
        getAllCharacters : () -> async [(Principal,Character)];
    };

    let otherCanister : OtherCanister = actor("h2oii-vyaaa-aaaah-aae2a-cai"); //On the IC 

    public func getCharacters() : async [(Principal,Character)] {
        return (await otherCanister.getAllCharacters())
    };

   
   
};
    