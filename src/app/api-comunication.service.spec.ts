/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiComunicationService } from './api-comunication.service';

describe('Service: ApiComunication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiComunicationService]
    });
  });

  it('should ...', inject([ApiComunicationService], (service: ApiComunicationService) => {
    expect(service).toBeTruthy();
  }));
});
