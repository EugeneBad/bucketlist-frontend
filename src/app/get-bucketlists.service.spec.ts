import { TestBed, inject } from '@angular/core/testing';

import { GetBucketlistsService } from './get-bucketlists.service';

describe('GetBucketlistsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetBucketlistsService]
    });
  });

  it('should be created', inject([GetBucketlistsService], (service: GetBucketlistsService) => {
    expect(service).toBeTruthy();
  }));
});
