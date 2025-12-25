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
      title: `新建问卷 ${Date.now()}`,
      componentList: [],
      isPublished: false,
      isStar: false,
      isDeleted: false,
      answerCount: 0,
      userId,
      pageSetting: { px: 8, py: 0 },
    });

    return { code: 0, data: { id: doc._id }, message: 'success' };
  }

  async findAll(userId: string, query: ListQuery) {
    const page = Number.isFinite(query.page) && (query.page as number) > 0 ? Number(query.page) : 1;
    const pageSize =
      Number.isFinite(query.pageSize) && (query.pageSize as number) > 0
        ? Number(query.pageSize)
        : 10;

    const filter: Record<string, unknown> & { userId: string; isDeleted: boolean } = {
      userId,
      isDeleted: false,
    };

    if (typeof query.isDeleted === 'string') {
      filter.isDeleted = query.isDeleted === 'true';
    } else if (typeof query.isDeleted === 'boolean') {
      filter.isDeleted = query.isDeleted;
    }

    if (typeof query.isStar === 'string') {
      filter.isStar = query.isStar === 'true';
    } else if (typeof query.isStar === 'boolean') {
      filter.isStar = query.isStar;
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

    return { code: 0, data: { list, total }, message: 'success' };
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

    return { code: 0, data: questionnaire, message: 'success' };
  }

  async findOneNoAuth(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      return { code: 404, message: '未找到问卷', data: null };
    }

    const questionnaire = await this.questionnaireModel.findOne({
      _id: id,
      isDeleted: false,
      isPublished: true,
    });

    if (!questionnaire) {
      return { code: 404, message: '未找到问卷', data: null };
    }

    return { code: 0, data: questionnaire, message: 'success' };
  }

  async update(id: string, updateQuestionnaireDto: UpdateQuestionnaireDto, userId: string) {
    if (!Types.ObjectId.isValid(id)) {
      return { code: 404, message: '未找到问卷', data: null };
    }

    const payload: Record<string, unknown> = {};
    (
      [
        'title',
        'componentList',
        'isPublished',
        'isStar',
        'isDeleted',
        'answerCount',
        'pageSetting',
      ] as const
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

    return { code: 0, data: questionnaire, message: 'success' };
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

    return { code: 0, data: null, message: 'success' };
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

    return { code: 0, data: null, message: 'success' };
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
      componentList: questionnaire.componentList ?? [],
      isPublished: false,
      isStar: false,
      isDeleted: false,
      answerCount: 0,
      userId,
      pageSetting: questionnaire.pageSetting || { px: 8, py: 0 },
    });

    return { code: 0, data: { id: duplicated._id }, message: 'success' };
  }
}
