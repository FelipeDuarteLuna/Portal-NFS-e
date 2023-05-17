import { TestBed } from '@angular/core/testing';
import { SamplePoTableTransportService } from './configurar-component.service';


describe('SamplePoTableTransportService', () => {
  let service: SamplePoTableTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [ SamplePoTableTransportService ]
    });

    service = TestBed.inject(SamplePoTableTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
