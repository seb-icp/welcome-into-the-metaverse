export default ({ IDL }) => {
    const message = IDL.Record({
      'title' : IDL.Text,
      'content' : IDL.Text,
      'likes' : IDL.Nat32,
    });
    const wall = IDL.Service({
      'addALikeToMessage' : IDL.Func([IDL.Nat32], [], []),
      'addMessage' : IDL.Func([IDL.Text, IDL.Text], [], []),
      'deleteACard' : IDL.Func([IDL.Nat32], [], []),
      'showAllMessages' : IDL.Func([], [IDL.Vec(IDL.Opt(message))], ['query']),
      'showMessage' : IDL.Func([IDL.Nat32], [IDL.Opt(message)], ['query']),
      'test' : IDL.Func([], [], []),
    });
    return wall;
  };
  export const init = ({ IDL }) => { return []; };