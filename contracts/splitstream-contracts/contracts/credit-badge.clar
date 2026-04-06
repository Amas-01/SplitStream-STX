;; credit-badge.clar
;; Minting credit badges for revenue stream participants

(define-constant authorized-caller 'ST000000000000000000002AMW42H)

(define-map badges 
    { badge-id: uint } 
    { recipient: principal, stream-id: uint, amount: uint, minted-at: uint }
)

(define-data-var badge-nonce uint u0)

;; Mint a new credit badge
(define-public (mint-badge (recipient principal) (stream-id uint) (amount uint))
    (begin
        (asserts! (is-eq tx-sender authorized-caller) (err u403))
        (let ((new-id (+ (var-get badge-nonce) u1)))
            (map-set badges { badge-id: new-id } { 
                recipient: recipient, 
                stream-id: stream-id, 
                amount: amount, 
                minted-at: block-height 
            })
            (var-set badge-nonce new-id)
            (ok new-id)
        )
    )
)

(define-read-only (get-badge (badge-id uint))
    (map-get? badges { badge-id: badge-id })
)

(define-read-only (get-badge-nonce)
    (var-get badge-nonce)
)
