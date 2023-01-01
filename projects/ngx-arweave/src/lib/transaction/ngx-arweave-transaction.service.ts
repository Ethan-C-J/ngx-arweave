import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockResponse } from '../schemas/BlockSchema';
import { Observable } from 'rxjs';
import { ApiConfig } from '../ngx-arweave.service';

@Injectable({
  providedIn: 'root'
})
export class NgxArweaveTransactionService {

  constructor(private http: HttpClient) {}

  public GetTransaction(config: ApiConfig, txid: string): Observable<BlockResponse> {

    let port = typeof config.port == "number" 
              ? config.port 
              : config.port == "https" 
                ? 443 
                : config.port == "http" ? 80 : 80

    return this.http.get<BlockResponse>(`${config.protocol}://${config.host}:${port}/tx/${txid}`);
  }
}
