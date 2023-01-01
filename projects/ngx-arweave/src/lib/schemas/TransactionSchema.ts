export interface TransactionSchema {
    format: number;
    id: string;
    last_tx: string;
    owner: string;
    tags: Array<string>;
    target: string;
    quantity: string;
    data: string;
    data_tree: string[];
    data_root: string;
    data_size: string;
    reward: string;
    signature: string;
}

export interface TransactionStatusSchema {
    block_height: number;
    block_indep_hash: string;
    number_of_confirmations: number;
}

export interface TransactionFieldSchema {
    content: string
}

export interface TransactionOffsetAndSizeSchema {
    offset: string;
    size: string;
}
