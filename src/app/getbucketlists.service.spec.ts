import { TestBed, inject } from '@angular/core/testing';

import { GetbucketlistsService } from './getbucketlists.service';

describe('GetbucketlistsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetbucketlistsService]
    });
  });

  it('should be created', inject([GetbucketlistsService], (service: GetbucketlistsService) => {
    expect(service).toBeTruthy();
  }));
});
