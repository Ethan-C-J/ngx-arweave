import { TestBed, fakeAsync, flushMicrotasks, waitForAsync } from '@angular/core/testing';

import { NgxArweaveBlockService } from './ngx-arweave-block.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiConfig } from '../ngx-arweave.service';
import { TestScheduler } from 'rxjs/testing';
import { BlockResponse, isBlockResponse } from '../schemas/BlockSchema';
import { Observable, firstValueFrom, lastValueFrom, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('NgxArweaveBlockService', () => {
  let service: NgxArweaveBlockService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let config: ApiConfig = {
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new NgxArweaveBlockService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain GetBlock function', () => {
    expect(service.GetBlock).toBeDefined();
  })

  it('should return the correct result from the web request', () => {

    let expected:BlockResponse = {
      "nonce":"D07OxjrkzQkKNOoNw0AYHQZnclb8PU1bH99HginMHYI",
      "previous_block":"xbn8Svg4bPXqCv4QX_Ef81K0NdzS6R-vje4exNgvlFTZCFsSqqH0mZhLlHsoMa63",
      "timestamp":1586440779,
      "last_retarget":1586439908,
      "diff":"115792089002057110506772654243663536896239655809974678884057128306262323232768",
      "height":422249,
      "hash":"_____GPjn_gSkBfkwYbeH-hYUiQnKpKFG35fO8s-_w0",
      "indep_hash":"YuTyalVBTNB9t5KhuRezcIgxVz9PbQsbrcY4Tpkiu8XBPgglGM_Yql5qZd0c9PVG",
      "txs":[
        "_KzR5qIYWW6YIHiAfQyvz-Y34Z0V0kuxuku3UN1abnQ",
        "m9kg0DbEkxdgc6EzO1LAf-d3k6lYpuSXbYLBnPVmxAs",
        "Sgvww7BbUiprCaWcV3gtUX7OvwuU_yxtHX2Gn2KSJDE",
        "NYYjZeubyIOmsPErR6r6jAkNXaEDD9sAh8lGRxwnNy8",
        "hMcqrINlBd2HJugWgUVrdzVbJo7KbvRy4TQzIlrndBs",
        "L6dEP2JUrFQbqHeaGPZAms07eQ7OpseCbeA9Ee2YQyI",
        "yLiLu9X0p6EGWIeTjdVxN6f9d1hcZfmJvaInjOsNqvM",
        "scyoHhmjhBjc0mFikQFQr3LfL8kKhxnVyuFc79HRyAQ",
        "I4qUw1ZweGwb75sxDCU2tCa5UgVqzoRwlLhw5nMi3dQ",
        "BqRRNSv9fjOT_dKF9rOr1NoMsduyfbLWubk9D6AmABM"
      ],
      "tx_root":"",
      "tx_tree":[],
      "wallet_list":"2-VSX-DrLJyRvYKmLbRI2VB3GEy5oEwgvytlRIHDjdY",
      "reward_addr":"V12aL_AA2IiL3ltx44e4TTVQXuEaSdgy3qswrToFcJc",
      "tags":[],
      "reward_pool":3026098169696371,
      "weave_size":407671482589,
      "block_size":5390819,
      "cumulative_diff":"99415996190900",
      "hash_list_merkle":"cStQkT7i9CbQ_Tx1xOngN_rPlePD3Ly0X-GpriXJCETrAGIpPE0D7LhaOdaxSno6",
      "poa":{
        "option":"1",
        "tx_path":"",
        "data_path":"",
        "chunk":""
      }
    }

    httpClientSpy.get.and.returnValues(of(expected))
    let obs = service.GetBlock(config, "YuTyalVBTNB9t5KhuRezcIgxVz9PbQsbrcY4Tpkiu8XBPgglGM_Yql5qZd0c9PVG")
    let actual = {} 

    expect(obs).toBeInstanceOf(Observable)

    obs.subscribe(v => {
      actual = v
    })
    expect(actual).toBe(expected) 

  });

  it('should return 404 message from a block that doesn\'t exist', () => {
    
    httpClientSpy.get.and.returnValues(of("Block not found."))
    let obs = service.GetBlock(config, "not_found")
    let actual = {}

    expect(obs).toBeInstanceOf(Observable)

    obs.subscribe(v => {
      actual = v
    })
    expect(actual).toEqual("Block not found.") 

  })
});
