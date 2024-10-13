import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { OpenaiService } from '../openai/openai.service';

@Module({
  controllers: [BlogController],
  providers: [OpenaiService],
})
export class BlogModule {}
