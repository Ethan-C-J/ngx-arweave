import { Inject, Injectable, Input, Optional } from '@angular/core';
import { InfoSchema } from './schemas/InfoSchema';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgxArweaveBlockService } from './block/ngx-arweave-block.service';
import { BlockResponse } from './schemas/BlockSchema';
import { GetPortNumber } from './utils';
import { NgxArweaveTransactionService } from './transaction/ngx-arweave-transaction.service';
import { TransactionOffsetAndSizeSchema, TransactionSchema, TransactionStatusSchema } from './schemas/TransactionSchema';

export interface ApiConfig {
  host?: string;
  protocol?: string;
  port?: string | number;
  timeout?: number;
  logging?: boolean;
  logger?: Function;
  network?: string;
}

@Injectable()
export class ArweaveService {

  private config: ApiConfig;
  
  constructor(
    private http: HttpClient,
    private blockService: NgxArweaveBlockService,
    private txService: NgxArweaveTransactionService,
    @Inject('arweaveConfig') @Optional() public arConfig: ApiConfig,
  ) {
    this.config = arConfig;
  }

  
  GetInfo(): Observable<InfoSchema> {
    let port = GetPortNumber(this.config.port)
    return this.http.get<InfoSchema>(`${this.config.protocol}://${this.config.host}:${port}/info`);
  }
  
  // Block Methods
  GetBlock(id: string): Observable<BlockResponse> {
    return this.blockService.GetBlock(this.arConfig, id);
  }
  GetCurrentBlock = this.GetInfo;

  // Transaction Methods
  GetTransaction(txid: string): Observable<TransactionSchema> {
    return this.txService.GetTransaction(this.config, txid);
  }

  GetTransactionStatus(txid: string): Observable<TransactionStatusSchema> {
    return this.txService.GetTransactionStatus(this.config, txid);
  }

  GetTransactionOffsetAndSize(txid: string): Observable<TransactionOffsetAndSizeSchema> {
    return this.txService.GetTransactionOffsetAndSize(this.config, txid);
  }

  GetTransactionField(txid: string, field: string): Observable<string> {
    return this.txService.GetTransactionField(this.config, txid, field);
  }

}
