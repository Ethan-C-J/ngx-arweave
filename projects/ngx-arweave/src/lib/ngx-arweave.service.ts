import { Inject, Injectable, Input, Optional } from '@angular/core';
import { InfoSchema } from './schemas/InfoSchema';
import Arweave from 'arweave';
import { Observable, from } from 'rxjs';

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
  private _arClient!: Arweave;

  constructor(
    @Inject('arweaveConfig') @Optional() public arConfig: ApiConfig
  ) { 
    super();
    this._arClient = new Arweave(arConfig);
  }

  
  GetInfo(): Observable<InfoSchema> {

    let obs = new Observable<InfoSchema>((observer) => {
      this._arClient.network.getInfo().then( info => {
        let ret: InfoSchema = {
          status: 200,
          network: info.network,
          version: info.version,
          release: info.release,
          height: info.height,
          currentBlock: info.current,
          blockCount: info.blocks,
          peerCount: info.peers,
          queueLength: info.queue_length,
          nodeStateLatency: info.node_state_latency
        }

        observer.next(ret);
      })
    });

    return obs;

  }
  
}
