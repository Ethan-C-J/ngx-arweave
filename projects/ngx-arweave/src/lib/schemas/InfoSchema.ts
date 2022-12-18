export interface InfoSchema {
    status: number;
    network: string;
    version: number;
    release: number;
    height: number;
    currentBlock: string;
    blockCount: number;
    peerCount: number;
    queueLength: number;
    nodeStateLatency: number;
}

export interface PeersSchema {
    status: number;
    peers: Array<string>;
}

export interface WalletSchema {
    status: number;
    balance?: number;
    lastTx?: string;
    error?: string;
}
