import { TestBed, inject } from '@angular/core/testing';
import { AnalyzerApiService } from './analyzer-api.service';

describe('AnalyzerApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyzerApiService]
    });
  });

  it('should ...', inject([AnalyzerApiService], (service: AnalyzerApiService) => {
    expect(service).toBeTruthy();
  }));
});
