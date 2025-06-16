import { Test, TestingModule } from '@nestjs/testing';
import { HighscoresController } from './highscores.controller';
import { HighscoresService } from './highscores.service';

describe('HighscoresController', () => {
  let controller: HighscoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HighscoresController],
      providers: [HighscoresService],
    }).compile();

    controller = module.get<HighscoresController>(HighscoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
