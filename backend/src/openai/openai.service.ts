import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateBlog(data: any, callback: (chunk: string) => void) {
    const { description, structure, length, companyDetails } = data;

    const prompt = `Generate a ${structure} blog post about ${description}. It should be ${length} words long. Here are the company details: ${JSON.stringify(companyDetails)}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      stream: true, // Enable streaming
    });

    for await (const chunk of response) {
      callback(chunk.choices[0].delta.content);
    }
  }
}
