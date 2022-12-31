import { Inject, Injectable, Input, Optional } from '@angular/core';
import { InfoSchema } from './schemas/InfoSchema';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgxArweaveBlockService } from './block/ngx-arweave-block.service';

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
    @Inject('arweaveConfig') @Optional() public arConfig: ApiConfig,
  ) {
    this.config = arConfig;
  }

  
  GetInfo(): Observable<InfoSchema> {
    let port = typeof this.arConfig.port == "number" 
              ? this.arConfig.port 
              : this.arConfig.port == "https" 
                ? 443 
                : this.arConfig.port == "http" ? 80 : 80
    return this.http.get<InfoSchema>(`${this.config.protocol}://${this.config.host}:${port}/info`);
  }
  
  GetBlock = this.blockService.GetBlock;
  GetCurrentBlock = this.GetInfo;

}
