export interface InfoSchema {
    network: string;
    version: number;
    release: number;
    height: number;
    current: string;
    blocks: number;
    peers: number;
    queue_length: number;
    node_state_latency: number;
}

export interface PeersSchema {
    peers: Array<string>;
}

export interface WalletSchema {
    status: number;
    balance?: number;
    lastTx?: string;
    error?: string;
}
