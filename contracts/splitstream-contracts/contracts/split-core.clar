;; split-core.clar
;; Standard Stacks revenue routing logic

(define-map streams 
    { stream-id: uint } 
    { owner: principal, total-basis-points: uint, active: bool }
)

(define-map split-maps 
    { stream-id: uint, recipient: principal } 
    { basis-points: uint }
)

(define-data-var stream-nonce uint u0)

;; Register a new revenue stream
(define-public (register-stream (recipients (list 20 { recipient: principal, basis-points: uint })))
    (let (
        (new-id (+ (var-get stream-nonce) u1))
        (total-bp (fold add-basis-points recipients u0))
    )
        (asserts! (is-eq total-bp u10000) (err u400))
        (begin
            (map-set streams { stream-id: new-id } { owner: tx-sender, total-basis-points: total-bp, active: true })
            (var-set stream-nonce new-id)
            (map store-split-entry recipients)
            (ok new-id)
        )
    )
)

(define-read-only (get-stream (stream-id uint))
    (map-get? streams { stream-id: stream-id })
)

(define-read-only (get-split (stream-id uint) (recipient principal))
    (map-get? split-maps { stream-id: stream-id, recipient: recipient })
)

(define-private (add-basis-points (recipient { recipient: principal, basis-points: uint }) (sum-so-far uint))
    (+ sum-so-far (get basis-points recipient))
)

(define-private (store-split-entry (recipient { recipient: principal, basis-points: uint }))
    (map-set split-maps 
        { stream-id: (var-get stream-nonce), recipient: (get recipient recipient) } 
        { basis-points: (get basis-points recipient) }
    )
)
