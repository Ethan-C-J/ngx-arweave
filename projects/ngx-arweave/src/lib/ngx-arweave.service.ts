import { Inject, Injectable, Input, Optional } from '@angular/core';
import Arweave from 'arweave';

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
export class ArweaveService extends Object {

  @Input() ar!: Arweave;
  public _arClient!: Arweave;

  constructor(
    @Inject('arweaveConfig') @Optional() public arConfig: ApiConfig
  ) { 
    super();
    this._arClient = new Arweave(arConfig);
  }
  
}
