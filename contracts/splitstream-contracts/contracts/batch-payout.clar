;; batch-payout.clar
;; Executing batch STX transfers for revenue segments

(define-public (execute-batch (payouts (list 200 { recipient: principal, amount: uint })))
    (begin
        (fold execute-payout-iter payouts (ok true))
    )
)

(define-read-only (get-contract-version)
    (ok "1.0.0")
)

(define-private (execute-payout-iter (payout { recipient: principal, amount: uint }) (previous-result (response bool uint)))
    (begin
        (try! previous-result)
        (stx-transfer? (get amount payout) tx-sender (get recipient payout))
    )
)
