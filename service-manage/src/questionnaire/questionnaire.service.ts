import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { Questionnaire, QuestionnaireDocument } from './entities/questionnaire.entity';

type ListQuery = {
  page?: number;
  pageSize?: number;
  isStar?: boolean;
  isDeleted?: boolean;
};

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name)
    private readonly questionnaireModel: Model<QuestionnaireDocument>,
  ) {}

  async create(userId: string) {
    const doc = await this.questionnaireModel.create({
      title: `新建 ${Date.now()}`,
      questionList: [],
      isPublished: false,
      isStar: false,
      isDeleted: false,
      answerCount: 0,
      userId,
    });

    return { code: 0, data: { id: doc._id } };
  }

  async findAll(userId: string, query: ListQuery) {
    const page = Number.isFinite(query.page) && (query.page as number) > 0 ? Number(query.page) : 1;
    const pageSize =
      Number.isFinite(query.pageSize) && (query.pageSize as number) > 0
        ? Number(query.pageSize)
        : 10;

    const filter: Record<string, unknown> & { userId: string } = { userId };
    console.log(query, typeof query.isDeleted, typeof query.isStar);

    if (typeof query.isDeleted === 'string') {
      filter.isDeleted = query.isDeleted === 'true';
    }
    if (typeof query.isStar === 'string') {
      filter.isStar = query.isStar === 'true';
    }

    const [list, total] = await Promise.all([
      this.questionnaireModel
        .find(filter)
        .sort({ updatedAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      this.questionnaireModel.countDocuments(filter),
    ]);

    return { code: 0, data: { list, total } };
  }

  async findOne(id: string, userId: string) {
    if (!Types.ObjectId.isValid(id)) {
      return { code: 404, message: '未找到问卷', data: null };
    }

    const questionnaire = await this.questionnaireModel.findOne({
      _id: id,
      userId,
      isDeleted: false,
    });

    if (!questionnaire) {
      return { code: 404, message: '未找到问卷', data: null };
    }

    return { code: 0, data: questionnaire };
  }

  async update(id: string, updateQuestionnaireDto: UpdateQuestionnaireDto, userId: string) {
    if (!Types.ObjectId.isValid(id)) {
      return { code: 404, message: '未找到问卷', data: null };
    }

    const payload: Record<string, unknown> = {};
    (
      ['title', 'questionList', 'isPublished', 'isStar', 'isDeleted', 'answerCount'] as const
    ).forEach(key => {
      const value = updateQuestionnaireDto[key];
      if (value !== undefined) {
        payload[key] = value;
      }
    });

    const questionnaire = await this.questionnaireModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: payload },
      { new: true },
    );

    if (!questionnaire) {
      return { code: 404, message: '未找到问卷', data: null };
    }

    return { code: 0, data: questionnaire };
  }

  async restore(ids: string[], userId: string) {
    if (!Array.isArray(ids) || ids.length === 0) {
      return { code: 400, message: '未提供问卷ID', data: null };
    }

    const validIds = ids.filter(item => Types.ObjectId.isValid(item));
    if (validIds.length === 0) {
      return { code: 400, message: '未提供有效的问卷ID', data: null };
    }

    await this.questionnaireModel.updateMany(
      {
        _id: { $in: validIds },
        userId,
        isDeleted: true,
      },
      {
        isDeleted: false,
      },
    );

    return { code: 0 };
  }
  async remove(ids: string[], userId: string) {
    if (!Array.isArray(ids) || ids.length === 0) {
      return { code: 400, message: '未提供问卷ID', data: null };
    }

    const validIds = ids.filter(item => Types.ObjectId.isValid(item));
    if (validIds.length === 0) {
      return { code: 400, message: '未提供有效的问卷ID', data: null };
    }

    await this.questionnaireModel.deleteMany({
      _id: { $in: validIds },
      userId,
    });

    return { code: 0 };
  }

  async duplicate(id: string, userId: string) {
    if (!Types.ObjectId.isValid(id)) {
      return { code: 404, message: '未找到问卷', data: null };
    }

    const questionnaire = await this.questionnaireModel.findOne({
      _id: id,
      userId,
      isDeleted: false,
    });

    if (!questionnaire) {
      return { code: 404, message: '未找到问卷', data: null };
    }

    const duplicated = await this.questionnaireModel.create({
      title: `${questionnaire.title} - 复制`,
      questionList: questionnaire.questionList ?? [],
      isPublished: false,
      isStar: false,
      isDeleted: false,
      answerCount: 0,
      userId,
    });

    return { code: 0, data: { id: duplicated._id } };
  }
}
