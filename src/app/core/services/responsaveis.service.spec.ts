/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResponsaveisService } from './responsaveis.service';

describe('Service: Responsaveis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponsaveisService]
    });
  });

  it('should ...', inject([ResponsaveisService], (service: ResponsaveisService) => {
    expect(service).toBeTruthy();
  }));
});
