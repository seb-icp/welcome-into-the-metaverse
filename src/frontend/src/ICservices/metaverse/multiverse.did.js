export default ({ IDL }) => {
  const Character_2 = IDL.Record({
    'name' : IDL.Text,
    'message' : IDL.Text,
    'avatar' : IDL.Nat,
  });
  const Character = Character_2;
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Null });
  return IDL.Service({
    'addACharacter' : IDL.Func([Character], [Result], []),
    'getAllCharacters' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, Character))],
        [],
      ),
    'getAllCharactersInsecure' : IDL.Func (
      [],
      [IDL.Vec(IDL.Tuple(IDL.Principal, Character))],
      ['query']
    ),
    'numberOfCharacter' : IDL.Func([], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => { return []; };