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

  async findAll(questionnaireId: string, userId: string, page?: number, pageSize?: number) {
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

    const currentPage = Number.isFinite(page) && (page as number) > 0 ? Number(page) : 1;
    const currentPageSize =
      Number.isFinite(pageSize) && (pageSize as number) > 0 ? Number(pageSize) : 10;

    const filter = { questionnaireId };

    const [list, total] = await Promise.all([
      this.answerModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * currentPageSize)
        .limit(currentPageSize)
        .exec(),
      this.answerModel.countDocuments(filter),
    ]);

    return { code: 0, data: { list, total }, message: 'success' };
  }
}
