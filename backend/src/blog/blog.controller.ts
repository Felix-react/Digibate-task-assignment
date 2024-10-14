import { Controller, Post, UploadedFile, Body, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OpenaiService } from '../openai/openai.service';
import { diskStorage } from 'multer';
import { promises as fs } from 'fs';
import path from 'path';

@Controller('blog')
export class BlogController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('generate')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
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

    // Read the JSON content from the file
    let fileData;

    try {
      const filePath = path.join(__dirname, '../../uploads', file.filename); // Adjust path as necessary
      const fileContent = await fs.readFile(filePath, 'utf-8');
      fileData = JSON.parse(fileContent); // Parse the JSON content
    } catch (error) {
      // Use type assertion to access 'message' property
      const err = error as Error; // Assert error to Error type
      throw new Error('Error reading or parsing the uploaded file: ' + err.message);
    }

    const data = {
      description: body.description,
      structure: body.structure,
      length: body.length,
      companyDetails: fileData,
    };
    
    return await this.openaiService.generateBlog(data);
  }
}
