import { TestBed } from '@angular/core/testing';

import { AnalyseTypeService } from './analyse-type.service';

describe('AnalyseTypeService', () => {
  let service: AnalyseTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyseTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
