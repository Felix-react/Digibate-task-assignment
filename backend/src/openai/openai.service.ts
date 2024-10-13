import { Injectable } from '@nestjs/common';
import OpenAI from 'openai'; // Updated import

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Set your OpenAI API key in .env
    });
  }

  async generateBlog(data: any): Promise<string> {
    const { description, structure, length, companyDetails } = data;
    const prompt = `Generate a ${structure} blog post about ${description}. It should be ${length} words long. Here are the company details: ${JSON.stringify(companyDetails)}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // You can adjust this model as needed
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    return response.choices[0].message.content; // Updated to match new response structure
  }
}
