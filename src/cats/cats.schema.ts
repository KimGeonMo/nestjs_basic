import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'aaaa@email.com',
    description: 'email',
    required: true,
  })
  email: string;

  @Prop({ required: true })
  @IsString()
  @ApiProperty({
    example: 'name',
    description: 'name',
    required: true,
  })
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: 'password',
    required: true,
  })
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
