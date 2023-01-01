import { ArweaveService, ApiConfig } from './ngx-arweave.service';
import { HttpClient } from '@angular/common/http';
import { NgxArweaveBlockService } from './block/ngx-arweave-block.service';
import { Observable, of } from 'rxjs';
import { InfoSchema } from './schemas/InfoSchema';
import { NgxArweaveTransactionService } from './transaction/ngx-arweave-transaction.service';

describe('ArweaveService', () => {

  let service: ArweaveService;
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
    let blockService = new NgxArweaveBlockService(httpClientSpy);
    let txService = new NgxArweaveTransactionService(httpClientSpy);
    service = new ArweaveService(httpClientSpy, blockService, txService, config);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain GetAddressBalance function', () => {
    pending("Not currently implemented");
    expect(service.hasOwnProperty('GetAddressBalance')).toBe(true);
  });

  it('should contain GetWalletLastTransaction function', () => {
    pending("Not currently implemented");
    expect(service.hasOwnProperty('GetWalletLastTransaction')).toBe(true);
  })

  it('should contain CreateTransaction function', () => {
    pending("Not currently implemented");
    expect(service.hasOwnProperty('CreateTransaction')).toBe(true);
  });

  it('should contain CreateWalletToWalletTransaction function', () => {
    pending("Not currently implemented");
    expect(service.hasOwnProperty('CreateWalletToWalletTransaction')).toBe(true);
  });

  it('should contain SignTransaction function', () => {
    pending("Not currently implemented");
    expect(service.hasOwnProperty('SignTransaction')).toBe(true);
  });

  it('should contain PostTransaction function', () => {
    pending("Not currently implemented");
    expect(service.hasOwnProperty('PostTransaction')).toBe(true);
  });

  it('should contain GetTransactionStatus function', () => {
    expect(typeof service.GetTransactionStatus).toBe("function");
  });

  it('should contain GetTransaction function', () => {
    expect(typeof service.GetTransaction).toBe("function");
  });
  
  it('should contain GetTransactionField function', () => {
    expect(typeof service.GetTransactionField).toBe("function");
  });

  it('should contain GetTransactionOffsetAndSize function', () => {
    expect(typeof service.GetTransactionOffsetAndSize).toBe("function");
  });

  it('should contain GetBlock function', () => {
    expect(typeof service.GetBlock).toBe("function");
  });

  it('should contain GetCurrentBlock function', () => {
    expect(service.hasOwnProperty('GetCurrentBlock')).toBe(true);
  });

  it('should contain GetInfo function', () => {
    expect(typeof service.GetInfo).toBe("function");
  });

  it('GetInfo\'s result should be of type Observable', () => {
    let expected: InfoSchema = {"network":"arweave.N.1","version":5,"release":53,"height":1088950,"current":"3Wkp10gHvrjBodBjvJ3btQzvXJTANisW6zFNU0HM8XXrMS1I-kzTyOVA7DpwPoyM","blocks":1088951,"peers":68580,"queue_length":0,"node_state_latency":1}
    httpClientSpy.get.and.returnValues(of(expected))

    expect(service.GetInfo()).toBeInstanceOf(Observable);
  })

  it('GetInfo should be a non-empty response', () => {
    let expected: InfoSchema = {"network":"arweave.N.1","version":5,"release":53,"height":1088950,"current":"3Wkp10gHvrjBodBjvJ3btQzvXJTANisW6zFNU0HM8XXrMS1I-kzTyOVA7DpwPoyM","blocks":1088951,"peers":68580,"queue_length":0,"node_state_latency":1}
    
    httpClientSpy.get.and.returnValues(of(expected))
    let obs = service.GetInfo();

    let res = {}
    
    obs.subscribe(value => {
      res = value
    })
    expect(res).toBeDefined()
    expect(res).toBe(expected)
  })

});
