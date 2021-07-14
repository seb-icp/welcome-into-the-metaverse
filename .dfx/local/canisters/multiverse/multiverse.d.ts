import type { Principal } from '@dfinity/agent';
export default interface _SERVICE {
  'getValue' : () => Promise<bigint>,
  'increment' : () => Promise<undefined>,
};