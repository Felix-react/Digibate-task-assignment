import {
    Controller,
    Post,
    UploadedFile,
    Body,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { OpenaiService } from '../openai/openai.service';
  import { diskStorage } from 'multer';
  
  @Controller('blog')
  export class BlogController {
    constructor(private readonly openaiService: OpenaiService) {}
  
    @Post('generate')
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        // Set up disk storage options if you need to save the file, otherwise keep it in memory.
        destination: './uploads', // Change as necessary
        filename: (req, file, cb) => {
          cb(null, file.originalname); // Use original file name
        },
      }),
    }))
    async generateBlogPost(
      @UploadedFile() file: Express.Multer.File,
      @Body() body: any,
    ) {
      // Ensure file exists before parsing
      if (!file) {
        throw new Error('No file uploaded');
      }
  
      const fileData = JSON.parse(file.buffer.toString()); // Read JSON content from the uploaded file
      const data = {
        description: body.description,
        structure: body.structure,
        length: body.length,
        companyDetails: fileData,
      };
      
      return await this.openaiService.generateBlog(data);
    }
  }
  