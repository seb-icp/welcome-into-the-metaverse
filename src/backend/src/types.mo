module {
    public type Character = {
        name : Text;
        message : Text;
        avatar : Nat //Doesn't make sense without associated front-end but user will be able to choose their character based on a few avatars.
    }
}