import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockError, BlockResponse } from '../schemas/BlockSchema';
import { Observable, map, tap } from 'rxjs';
import { ApiConfig } from '../ngx-arweave.service';

@Injectable({
  providedIn: 'root'
})
export class NgxArweaveBlockService {

  constructor(private http: HttpClient) {}

  public GetBlock(config: ApiConfig, id: string): Observable<BlockResponse> {

    let port = typeof config.port == "number" 
              ? config.port 
              : config.port == "https" 
                ? 443 
                : config.port == "http" ? 80 : 80

    return this.http.get<BlockResponse>(`${config.protocol}://${config.host}:${port}/block/hash/${id}`);
  }
}
