import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { OpenaiService } from '../openai/openai.service';

/**
 * BlogModule is responsible for managing the blog-related features of the application.
 * It includes the BlogController for handling blog requests and the OpenaiService 
 * for generating blog content using the OpenAI API.
 */
@Module({
  controllers: [BlogController], // List of controllers in this module
  providers: [OpenaiService], // List of providers (services) available in this module
})
export class BlogModule {}
