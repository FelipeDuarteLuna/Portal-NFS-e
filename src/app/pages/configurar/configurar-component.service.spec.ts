import { TestBed } from '@angular/core/testing';
import { SamplePoTableTransportService } from './configurar-component.service';


describe('ConfigurarComponentService', () => {
  let service: SamplePoTableTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SamplePoTableTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
