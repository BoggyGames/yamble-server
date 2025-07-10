import { Test, TestingModule } from '@nestjs/testing';
import { YambleService } from './yamble.service';

describe('YambleService', () => {
  let service: YambleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YambleService],
    }).compile();

    service = module.get<YambleService>(YambleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
