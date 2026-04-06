import { Cl } from '@stacks/transactions';
import { describe, expect, it } from 'vitest';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get('wallet_1')!;
const wallet2 = accounts.get('wallet_2')!;
const authorizedCaller = 'ST000000000000000000002AMW42H';

describe('credit-badge', () => {
  it('mint-badge called from the authorized contract principal stores the badge and returns (ok u1)', () => {
    const streamId = 1;
    const amount = 5000;
    
    const { result } = simnet.callPublicFn(
      'credit-badge', 
      'mint-badge', 
      [Cl.principal(wallet2), Cl.uint(streamId), Cl.uint(amount)], 
      authorizedCaller
    );
    
    expect(result).toBeOk(Cl.uint(1));
    
    const { result: badgeResult } = simnet.callReadOnlyFn('credit-badge', 'get-badge', [Cl.uint(1)], wallet1);
    expect(badgeResult).toBeSome(Cl.tuple({
      recipient: Cl.principal(wallet2),
      'stream-id': Cl.uint(streamId),
      amount: Cl.uint(amount),
      'minted-at': Cl.uint(simnet.blockHeight)
    }));
  });

  it('mint-badge called from an unauthorized principal returns an err', () => {
    const { result } = simnet.callPublicFn(
      'credit-badge', 
      'mint-badge', 
      [Cl.principal(wallet2), Cl.uint(1), Cl.uint(5000)], 
      wallet1
    );
    
    expect(result).toBeErr(Cl.uint(403));
  });
});
