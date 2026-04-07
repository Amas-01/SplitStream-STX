import { Cl } from '@stacks/transactions';
import { describe, expect, it } from 'vitest';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get('wallet_1')!;
const wallet2 = accounts.get('wallet_2')!;

describe('split-core', () => {
  it('register-stream with valid basis points summing to 10000 returns (ok u1)', () => {
    const recipients = Cl.list([
      Cl.tuple({ recipient: Cl.principal(wallet1), 'basis-points': Cl.uint(5000) }),
      Cl.tuple({ recipient: Cl.principal(wallet2), 'basis-points': Cl.uint(5000) }),
    ]);
    const { result } = simnet.callPublicFn('split-core', 'register-stream', [recipients], wallet1);
    expect(result).toBeOk(Cl.uint(1));
  });

  it('register-stream with basis points not summing to 10000 returns an err', () => {
    const recipients = Cl.list([
      Cl.tuple({ recipient: Cl.principal(wallet1), 'basis-points': Cl.uint(5000) }),
      Cl.tuple({ recipient: Cl.principal(wallet2), 'basis-points': Cl.uint(4000) }),
    ]);
    const { result } = simnet.callPublicFn('split-core', 'register-stream', [recipients], wallet1);
    expect(result).toBeErr(Cl.uint(400));
  });

  it('get-stream returns the correct owner after a successful registration', () => {
    const recipients = Cl.list([
      Cl.tuple({ recipient: Cl.principal(wallet1), 'basis-points': Cl.uint(10000) }),
    ]);
    simnet.callPublicFn('split-core', 'register-stream', [recipients], wallet1);

    const { result } = simnet.callReadOnlyFn('split-core', 'get-stream', [Cl.uint(1)], wallet1);
    // In newer SDK, result is a ClarityValue (optional in this case)
    expect(result).toBeSome(
      Cl.tuple({
        owner: Cl.principal(wallet1),
        'total-basis-points': Cl.uint(10000),
        active: Cl.bool(true),
      }),
    );
  });
});
