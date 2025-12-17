import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type QuestionnaireDocument = HydratedDocument<Questionnaire>;

@Schema({ timestamps: true })
export class Questionnaire {
  @Prop({ required: true, default: 'Untitled Questionnaire' })
  title: string;

  @Prop({ type: [SchemaTypes.Mixed], default: [] })
  questionList: Array<Record<string, unknown>>;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: false })
  isStar: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: 0 })
  answerCount: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
