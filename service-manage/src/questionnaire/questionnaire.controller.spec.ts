import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';

describe('QuestionnaireController', () => {
  let controller: QuestionnaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnaireController],
      providers: [
        {
          provide: QuestionnaireService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            duplicate: jest.fn(),
          },
        },
        {
          provide: JwtAuthGuard,
          useValue: { canActivate: jest.fn().mockResolvedValue(true) },
        },
      ],
    }).compile();

    controller = module.get<QuestionnaireController>(QuestionnaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
