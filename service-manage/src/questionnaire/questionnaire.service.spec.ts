import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './entities/questionnaire.entity';

describe('QuestionnaireService', () => {
  let service: QuestionnaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionnaireService,
        {
          provide: getModelToken(Questionnaire.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            deleteMany: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<QuestionnaireService>(QuestionnaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
