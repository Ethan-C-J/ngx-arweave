import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../ngx-arweave.service';
import { TransactionFieldSchema, TransactionOffsetAndSizeSchema, TransactionSchema, TransactionStatusSchema } from '../schemas/TransactionSchema';
import { GetPortNumber } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class NgxArweaveTransactionService {

  constructor(private http: HttpClient) {}

  public GetTransaction(config: ApiConfig, txid: string): Observable<TransactionSchema> {
    let port = GetPortNumber(config.port)
    return this.http.get<TransactionSchema>(`${config.protocol}://${config.host}:${port}/tx/${txid}`);
  }

  public GetTransactionStatus(config: ApiConfig, txid: string): Observable<TransactionStatusSchema> {
    let port = GetPortNumber(config.port)
    return this.http.get<TransactionStatusSchema>(`${config.protocol}://${config.host}:${port}/tx/${txid}/status`);
  }

  public GetTransactionOffsetAndSize(config: ApiConfig, txid: string): Observable<TransactionOffsetAndSizeSchema> {
    let port = GetPortNumber(config.port)
    return this.http.get<TransactionOffsetAndSizeSchema>(`${config.protocol}://${config.host}:${port}/tx/${txid}/offset`);
  }

  public GetTransactionField(config: ApiConfig, txid: string, field:string): Observable<string> {
    let port = GetPortNumber(config.port)
    return this.http.get<string>(`${config.protocol}://${config.host}:${port}/tx/${txid}/${field}`);
  }
}
