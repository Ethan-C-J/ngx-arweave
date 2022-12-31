import { Tag } from "arweave/node/lib/transaction";
export interface BlockResponse {
    "nonce": string;
    "previous_block": string;
    "timestamp": number;
    "last_retarget": number;
    "diff": string;
    "height": number;
    "hash": string;
    "indep_hash": string;
    "txs": Array<string>;
    "tx_root": string;
    "tx_tree": Array<string>;
    "wallet_list": string;
    "reward_addr": string;
    "tags": Array<Tag>;
    "reward_pool": number;
    "weave_size": number;
    "block_size": number;
    "cumulative_diff": string;
    "hash_list_merkle": string;
    "poa": {
        "option": string;
        "tx_path": string;
        "data_path": string;
        "chunk": string;
    };
}

export interface BlockError {
    status: number;
    error: string;
}

export function isBlockResponse(data: any): data is BlockResponse { 
    return data.hasOwnProperty("previous_block")
}