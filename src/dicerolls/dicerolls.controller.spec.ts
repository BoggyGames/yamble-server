import { Test, TestingModule } from '@nestjs/testing';
import { DicerollsController } from './dicerolls.controller';
import { DicerollsService } from './dicerolls.service';

describe('DicerollsController', () => {
  let controller: DicerollsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DicerollsController],
      providers: [DicerollsService],
    }).compile();

    controller = module.get<DicerollsController>(DicerollsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
