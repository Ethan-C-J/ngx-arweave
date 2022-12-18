export interface BlockSchema {
    status: number;
    nonce?: string;
    previousBlock?: string;
    timestamp?: number;
    lastRetarget?: number;
    diff?: string;
    height?: number;
    hash?: string;
    txRoot?: string;
    txTree?: Array<string>;
    walletList?: string;
    rewardAddr?: string;
    tags?: Array<string>;
    rewardPool?: number;
    weaveSize?: number;
    blockSize?: number;
    cumulativeDiff?: string;
    hashListMerkle?: string;
    poa?: __Poa;
    error?: string;
}

export interface __Poa {
    option: string;
    txPath: string;
    dataPath: string;
    chunk: string;
}