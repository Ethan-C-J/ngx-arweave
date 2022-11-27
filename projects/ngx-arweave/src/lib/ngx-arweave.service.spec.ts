import { TestBed } from '@angular/core/testing';

import { ArweaveService, ApiConfig } from './ngx-arweave.service';

describe('ArweaveService', () => {
  let service: ArweaveService;
  let config: ApiConfig = {
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
  }

  beforeEach(() => {
    service = new ArweaveService(config);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain Arweave Class Object', () => {
    expect(service._arClient).toBeTruthy();
  });

  it('should contain GetAddressBalance function', () => {
      expect(service.hasOwnProperty('GetAddressBalance')).toBe(true);
  });

  it('should contain CreateTransaction function', () => {
    expect(service.hasOwnProperty('CreateTransaction')).toBeDefined();
  });

  it('should contain CreateWalletToWalletTransaction function', () => {
    expect(service.hasOwnProperty('CreateWalletToWalletTransaction')).toBeDefined();
  });

  it('should contain SignTransaction function', () => {
    expect(service.hasOwnProperty('SignTransaction')).toBeDefined();
  });

  it('should contain PostTransaction function', () => {
    expect(service.hasOwnProperty('PostTransaction')).toBeDefined();
  });

  it('should contain GetTransactionStatus function', () => {
    expect(service.hasOwnProperty('GetTransactionStatus')).toBeDefined();
  });

  it('should contain GetTransaction function', () => {
    expect(service.hasOwnProperty('GetTransaction')).toBeDefined();
  });
  
  it('should contain GetTransactionData function', () => {
    expect(service.hasOwnProperty('GetTransactionData')).toBeDefined();
  });

  it('should contain GetTransactionStatus function', () => {
    expect(service.hasOwnProperty('GetTransactionStatus')).toBeDefined();
  });

  it('should contain GetBlock function', () => {
    expect(service.hasOwnProperty('GetBlock')).toBeDefined();
  });

  it('should contain GetCurrentBlock function', () => {
    expect(service.hasOwnProperty('GetCurrentBlock')).toBeDefined();
  });

});
