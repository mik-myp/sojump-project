import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer, AnswerDocument } from './entities/answer.entity';
import {
  Questionnaire,
  QuestionnaireDocument,
} from '@/questionnaire/entities/questionnaire.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name)
    private readonly answerModel: Model<AnswerDocument>,
    @InjectModel(Questionnaire.name)
    private readonly questionnaireModel: Model<QuestionnaireDocument>,
  ) {}

  async create(questionnaireId: string, createAnswerDto: CreateAnswerDto) {
    if (!Types.ObjectId.isValid(questionnaireId)) {
      throw new HttpException({ code: 404, message: '问卷不存在', data: null }, HttpStatus.OK);
    }

    const questionnaire = await this.questionnaireModel.findOne({
      _id: questionnaireId,
      isDeleted: false,
    });

    if (!questionnaire) {
      throw new HttpException({ code: 404, message: '问卷不存在', data: null }, HttpStatus.OK);
    }

    await this.answerModel.create({
      questionnaireId,
      answers: createAnswerDto.answers,
    });

    await this.questionnaireModel.updateOne({ _id: questionnaireId }, { $inc: { answerCount: 1 } });

    return { code: 0, data: null, message: 'success' };
  }

  async findAll(questionnaireId: string, userId: string) {
    if (!Types.ObjectId.isValid(questionnaireId)) {
      throw new HttpException({ code: 404, message: '问卷不存在', data: null }, HttpStatus.OK);
    }

    const questionnaire = await this.questionnaireModel.findOne({
      _id: questionnaireId,
      userId,
      isDeleted: false,
    });

    if (!questionnaire) {
      throw new HttpException(
        { code: 404, message: '问卷不存在或无权查看', data: null },
        HttpStatus.OK,
      );
    }

    const filter = { questionnaireId };

    const data = await this.answerModel.find(filter).sort({ createdAt: -1 }).exec();

    return { code: 0, data, message: 'success' };
  }
}
