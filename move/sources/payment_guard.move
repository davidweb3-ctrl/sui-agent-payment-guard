module sui_agent_payment_guard::payment_guard {
    use std::string::String;
    use sui::clock::{Self, Clock};
    use sui::event;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    const E_INVALID_RISK_SCORE: u64 = 1;

    public struct IntentReceipt has key, store {
        id: UID,
        owner: address,
        recipient: address,
        asset_symbol: String,
        amount_mist: u64,
        policy_limit_mist: u64,
        risk_score_bps: u64,
        model_hash: vector<u8>,
        intent_hash: vector<u8>,
        approved: bool,
        created_ms: u64,
    }

    public struct IntentRecorded has copy, drop {
        owner: address,
        recipient: address,
        amount_mist: u64,
        policy_limit_mist: u64,
        risk_score_bps: u64,
        approved: bool,
        created_ms: u64,
    }

    public fun record_intent(
        recipient: address,
        asset_symbol: String,
        amount_mist: u64,
        policy_limit_mist: u64,
        risk_score_bps: u64,
        model_hash: vector<u8>,
        intent_hash: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): IntentReceipt {
        assert!(risk_score_bps <= 10000, E_INVALID_RISK_SCORE);

        let owner = tx_context::sender(ctx);
        let created_ms = clock::timestamp_ms(clock);
        let approved = amount_mist <= policy_limit_mist && risk_score_bps <= 7000;

        event::emit(IntentRecorded {
            owner,
            recipient,
            amount_mist,
            policy_limit_mist,
            risk_score_bps,
            approved,
            created_ms,
        });

        IntentReceipt {
            id: object::new(ctx),
            owner,
            recipient,
            asset_symbol,
            amount_mist,
            policy_limit_mist,
            risk_score_bps,
            model_hash,
            intent_hash,
            approved,
            created_ms,
        }
    }

    #[allow(lint(public_entry))]
    public entry fun record_intent_to_sender(
        recipient: address,
        asset_symbol: String,
        amount_mist: u64,
        policy_limit_mist: u64,
        risk_score_bps: u64,
        model_hash: vector<u8>,
        intent_hash: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext,
    ) {
        let owner = tx_context::sender(ctx);
        let receipt = record_intent(
            recipient,
            asset_symbol,
            amount_mist,
            policy_limit_mist,
            risk_score_bps,
            model_hash,
            intent_hash,
            clock,
            ctx,
        );
        transfer::public_transfer(receipt, owner);
    }

    public fun owner(receipt: &IntentReceipt): address {
        receipt.owner
    }

    public fun approved(receipt: &IntentReceipt): bool {
        receipt.approved
    }

    public fun risk_score_bps(receipt: &IntentReceipt): u64 {
        receipt.risk_score_bps
    }
}
