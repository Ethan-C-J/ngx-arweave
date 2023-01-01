
import { NgxArweaveTransactionService } from './ngx-arweave-transaction.service';
import { ApiConfig } from '../ngx-arweave.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TransactionOffsetAndSizeSchema, TransactionSchema, TransactionStatusSchema } from '../schemas/TransactionSchema';

describe('NgxArweaveTransactionService', () => {
  let service: NgxArweaveTransactionService;
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
    service = new NgxArweaveTransactionService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain GetTransaction function', () => {
    expect(service.GetTransaction).toBeDefined();
  })

  it('GetTransaction should return type of observable', () => {
    httpClientSpy.get.and.returnValues(of(""))
    let obs = service.GetTransaction(config, "")

    expect(obs).toBeInstanceOf(Observable)
  })

  it('GetTransaction should return the correct result from the web request', () => {

    
    let expected:TransactionSchema = {"format":1,"id":"BNttzDav3jHVnNiV7nYbQv-GY0HQ-4XXsdkE5K9ylHQ","last_tx":"jUcuEDZQy2fC6T3fHnGfYsw0D0Zl4NfuaXfwBOLiQtA","owner":"posmEh5k2_h7fgj-0JwB2l2AU72u-UizJOA2m8gyYYcVjh_6N3A3DhwbLmnbIWjVWmsidgQZDDibiJhhyHsy28ARxrt5BJ3OCa1VRAk2ffhbaUaGUoIkVt6G8mnnTScN9JNPS7UYEqG_L8J48c2tQNsydbon2ImKIwCYmnMHKcpyEgXcgLDGhtGhIKtkuI-QOAu-TMqVjn5EaWsfJTW5J-ty8mswAMSxepgsUbUB3GXZfCyOAK0EGjrClZ1MLvyc8ANGQfLPjwTipMcUtX47Udy8i4C-c-vLC9oB_z5ZCDCat-5wGh2OA-lyghro2SpkxX0e-D-nbi91Pp9LORwDZIRQ5RCMDvtQx1-QD2adxn_P2zDN0hk5IWXoCnHyeoj-IdNIyCXNkDzT2A184CxjReE5XOUF7UFeOmvVwbUTMfnNBOSWeRz3U_e3MPNlc2JTIprRLC8IegyfS6NdCr90lYnuviEr0g75NE6-muJdHAd9gu2QZ1MpkX9OnsbtvCvvFje-K_p_4AR9l43CLemfdSZeHHMIzdPwKe75SFMbsuklsyc-ieq-OHrJCeL0WrkLT4Gf6rpGVkS8MjORuMOBRFrHRE7XKswzhwmV2SuzeU6ojtPNP87aNdiUGHtYCIyt7cRN5bRbrVjdCAXj2NnuWMzM6J6dme4e2R8gqNpsEok","tags":[],"target":"","quantity":"0","data":"","data_size":"0","data_tree":[],"data_root":"","reward":"124145681682","signature":"HZRG_G6oGaJoAZt0FzJy4ZyW1csa2eoS7jgA4_u5J75Fe7Y6a2Sarg7Mkc9zGfWmqQBMRd7EUMQEMgz2qxtTLM4VyuDfEiz-YeY90JGo2MPbBTMd0Zs_GUz2C26Roe6LrwS40NLo7Am5SfWK-i324JYAUhsXboD-OIKN1458-J-jsUjSBF9ym45KnBRud2Bb-ac5qCCnEtK-gBr66FAlnlooGjZxXQ9P-LVUl11Xan3ej3c-WD6wIp5VQZ4mTjnFcvM4-Tf-GuyorU3TgBdTL2ahgWB-hrBeFALsiWYpMc0Zz0EpR_OvaKeBZD-8Z_SkjGTuS5a-hQnNI2rG0kMfdhIVzI95XkkoBSPwe1xf6LZmqJwwvY3tFJbdlQN0xUOgtQcGqO1ZNF_Il_X9mSJZgTqqNEsNJAFFiAF2AaFxj8SCQYTr3tp95xnilWk1TWE63imwHhKIxtjN6FUEjssSzHiL7XITUava7jlrNVhUEXyNyt8cUPV3mlx6cs0zkgctkUPfK4SkbyJSPspd46UOUZOIpBnbwv9xNz4heXj4GCcl5k55boAlvYqfeapZlZGEHv2czuLIUXTQ33RnPaFx5RneNv44jc6hd09ojPEnkYzKkwnJSg5K16qN9Ph_g3wgybaN9YGBcJnuu_fcvcSmd7WD14rJNsEtCt2j0jRGB-M"}

    httpClientSpy.get.and.returnValues(of(expected))
    let obs = service.GetTransaction(config, "BNttzDav3jHVnNiV7nYbQv-GY0HQ-4XXsdkE5K9ylHQ")
    let actual = {}

    obs.subscribe(v => {
      actual = v
    })
    expect(actual).toEqual(expected) 

  });

  it('GetTransaction should return 202 message from a transaction that is not finished mining', () => {
    
    httpClientSpy.get.and.returnValues(of("Pending"))
    let obs = service.GetTransaction(config, "BNttzDav3jHVnNiV7nYbQv-GY0HQ-4XXsdkE5K9ylHQ")
    let actual = {}

    obs.subscribe(v => {
      actual = v
    })
    expect(actual).toEqual("Pending") 

  });

  it('GetTransaction should return 400 message from a transaction that is not a valid hash', () => {
    
    httpClientSpy.get.and.returnValues(of("Invalid hash."))
    let obs = service.GetTransaction(config, "not_a_hash")
    let actual = {}

    obs.subscribe(v => {
      actual = v
    })
    expect(actual).toEqual("Invalid hash.")

  });

  it('GetTransaction should return 404 message from a transaction that is not found', () => {
    
    httpClientSpy.get.and.returnValues(of("Not Found."))
    let obs = service.GetTransaction(config, "not_found")
    let actual = {}

    obs.subscribe(v => {
      actual = v
    })
    expect(actual).toEqual("Not Found.")

  });

  it('should contain GetTransactionStatus function', () => {
    expect(service.GetTransactionStatus).toBeDefined();
  });

  it('GetTransactionStatus should return type of observable', () => {
    httpClientSpy.get.and.returnValues(of(""))
    let obs = service.GetTransactionStatus(config, "")

    expect(obs).toBeInstanceOf(Observable)
  });

  it('GetTransactionStatus should return the correct response', () => {
    let expected: TransactionStatusSchema = {
      "block_height":73132,
      "block_indep_hash":"EsFQ6g7S3MGzCw1K1DthRBi-vkgAsBt58qwP--Df_w1GUbwrgoa1ogPo3q6RARPO",
      "number_of_confirmations":1015949
    }
    
    httpClientSpy.get.and.returnValues(of(expected))
    let obs = service.GetTransactionStatus(config, "BNttzDav3jHVnNiV7nYbQv-GY0HQ-4XXsdkE5K9ylHQ")

    let actual = {};
    obs.subscribe((value: TransactionStatusSchema) => {
      actual = value;
    })

    expect(actual).toEqual(expected)
  })

  it('GetTransactionStatus should return 404 message from a transaction that is not found', () => {
    let expected = {
      status: 404,
      error: "Not Found"
    }

    httpClientSpy.get.and.returnValues(of(expected))
    let obs = service.GetTransactionStatus(config, "not_found")
    let actual = {}

    obs.subscribe(v => {
      actual = v
    })
    expect(actual).toEqual(expected)

  });

  it('should contain GetTransactionOffsetAndSize function', () => {
    expect(service.GetTransactionOffsetAndSize).toBeDefined();
  })

  it('GetTransactionOffsetAndSize should return the offset and size from a mined transaction', () => {
    let expected: TransactionOffsetAndSizeSchema = {"size":"1033478","offset":"125744031"}

    httpClientSpy.get.and.returnValues(of(expected))
    let obs = service.GetTransactionOffsetAndSize(config, "BNttzDav3jHVnNiV7nYbQv-GY0HQ-4XXsdkE5K9ylHQ")
    let actual = {}

    obs.subscribe((v: TransactionOffsetAndSizeSchema) => {
      actual = v
    })

    expect(actual).toEqual(expected)

  });

  it('GetTransactionOffsetAndSize should return 400 message from a transaction that doesn\'t have a valid address', () => {
    let expected = {"error": "invalid_address"}

    httpClientSpy.get.and.returnValues(of(expected))
    let obs = service.GetTransactionOffsetAndSize(config, "not_found")
    let actual = {}

    obs.subscribe(v => {
      actual = v
    })
    expect(actual).toEqual(expected)

  });

  it('GetTransactionOffsetAndSize should return 503 message from a node that is not joined to the the network', () => {
    let expected = {"error": "not_joined"}

    httpClientSpy.get.and.returnValues(of(expected))
    let obs = service.GetTransactionOffsetAndSize(config, "not_found")
    let actual = {}

    obs.subscribe(v => {
      actual = v
    })
    expect(actual).toEqual(expected)

  });

  it('GetTransactionOffsetAndSize should return 503 message if the request times out', () => {
    let expected = {"error": "timeout"}

    httpClientSpy.get.and.returnValues(of(expected))
    let obs = service.GetTransactionOffsetAndSize(config, "not_found")
    let actual = {}

    obs.subscribe(v => {
      actual = v
    })
    expect(actual).toEqual(expected)

  });
  
  it('should contain GetTransactionField function', () => {
    expect(service.GetTransactionField).toBeDefined();
  });

  it('GetTransactionField should return correct field from a transaction that exists', () => {
    
    httpClientSpy.get.and.returnValues(of("BNttzDav3jHVnNiV7nYbQv-GY0HQ-4XXsdkE5K9ylHQ"))
    let obs = service.GetTransactionField(config, "BNttzDav3jHVnNiV7nYbQv-GY0HQ-4XXsdkE5K9ylHQ", "id")
    let actual = {}

    obs.subscribe((v: string) => {
      actual = v
    })
    expect(actual).toEqual("BNttzDav3jHVnNiV7nYbQv-GY0HQ-4XXsdkE5K9ylHQ")

  });

  it('GetTransactionField should return correct field from a transaction that exists but has not been mined', () => {
    
    httpClientSpy.get.and.returnValues(of("Pending"))
    let obs = service.GetTransactionField(config, "BNttzDav3jHVnNiV7nYbQv-GY0HQ-4XXsdkE5K9ylHQ", "owner")
    let actual = {}

    obs.subscribe((v: string) => {
      actual = v
    })
    expect(actual).toEqual("Pending")

  });

  it('GetTransactionField should return 400 field from a transaction that is not a valid hash', () => {
    
    httpClientSpy.get.and.returnValues(of("Invalid hash."))
    let obs = service.GetTransactionField(config, "not_a_hash", "id")
    let actual = {}

    obs.subscribe((v: string) => {
      actual = v
    })
    expect(actual).toEqual("Invalid hash.")

  });

  it('GetTransactionField should return 404 response from a transaction that does not exist', () => {
    
    httpClientSpy.get.and.returnValues(of("Not Found."))
    let obs = service.GetTransactionField(config, "not_found", "id")
    let actual = {}

    obs.subscribe((v: string) => {
      actual = v
    })
    expect(actual).toEqual("Not Found.")

  });

  it('GetTransactionField should return 400 response from a transaction that is a valid hash but not a valid field', () => {
    
    httpClientSpy.get.and.returnValues(of({"error":"invalid_field"}))
    let obs = service.GetTransactionField(config, "BNttzDav3jHVnNiV7nYbQv-GY0HQ-4XXsdkE5K9ylHQ", "not_a_field")
    let actual = {}

    obs.subscribe((v: string) => {
      actual = v
    })
    expect(actual).toEqual({"error":"invalid_field"})

  });

});
