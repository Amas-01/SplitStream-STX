import { Cl } from '@stacks/transactions';
import { describe, expect, it } from 'vitest';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get('wallet_1')!;
const wallet2 = accounts.get('wallet_2')!;

describe('batch-payout', () => {
  it('execute-batch with a single recipient transfers the correct STX amount', () => {
    const amount = 1000000n; // 1 STX
    const payouts = Cl.list([
      Cl.tuple({ recipient: Cl.principal(wallet2), amount: Cl.uint(amount) })
    ]);
    
    const { result, events } = simnet.callPublicFn('batch-payout', 'execute-batch', [payouts], wallet1);
    expect(result).toBeOk(Cl.bool(true));
    
    // Check for STX transfer event
    const transferEvent = events.find(e => e.event === 'stx_transfer_event');
    expect(transferEvent).toBeDefined();
    expect(transferEvent?.data.amount).toBe(Cl.uint(amount).value.toString());
    expect(transferEvent?.data.recipient).toBe(wallet2);
  });

  it('execute-batch with an empty list returns (ok true) without error', () => {
    const payouts = Cl.list([]);
    const { result } = simnet.callPublicFn('batch-payout', 'execute-batch', [payouts], wallet1);
    expect(result).toBeOk(Cl.bool(true));
  });
});
