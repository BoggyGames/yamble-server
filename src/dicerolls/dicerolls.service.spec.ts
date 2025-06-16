import { Test, TestingModule } from '@nestjs/testing';
import { DicerollsService } from './dicerolls.service';

describe('DicerollsService', () => {
  let service: DicerollsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DicerollsService],
    }).compile();

    service = module.get<DicerollsService>(DicerollsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
