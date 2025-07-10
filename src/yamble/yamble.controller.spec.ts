import { Test, TestingModule } from '@nestjs/testing';
import { YambleController } from './yamble.controller';
import { YambleService } from './yamble.service';

describe('YambleController', () => {
  let controller: YambleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YambleController],
      providers: [YambleService],
    }).compile();

    controller = module.get<YambleController>(YambleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
