import { TestBed } from '@angular/core/testing';

import { ConfigurarComponentService } from './configurar-component.service';

describe('ConfigurarComponentService', () => {
  let service: ConfigurarComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurarComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
