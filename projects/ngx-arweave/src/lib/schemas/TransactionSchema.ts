export interface TransactionSchema {
    status: number;
    format?: number;
    id?: string;
    lastTransaction?: string;
    owner?: string;
    tags?: Array<string>;
    target?: string;
    quantity?: string;
    dataRoot?: string;
    dataSize?: string;
    reward?: string;
    signature?: string;
    error?: string;
}

export interface TransactionStatusSchema {
    status: number;
    blockHeight?: number;
    blockHash?: string;
    confirmations?: number;
    error?: string;
}

export interface TransactionFieldSchema {
    status: number;
    content?: string
    error?: string;
}

export interface TransactionOffsetAndSizeSchema {
    status: number;
    offset?: string;
    size?: string;
    error?: string;
}
