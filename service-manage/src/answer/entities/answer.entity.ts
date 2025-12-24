import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema({ timestamps: true })
export class Answer {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Questionnaire', required: true })
  questionnaireId: Types.ObjectId;

  @Prop({ type: SchemaTypes.Mixed, required: true })
  answers: Record<string, unknown>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
