import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { KstvService } from './kstv.service';

@Controller('kstv')
export class KstvController {
    constructor(private readonly kstvService: KstvService) {}

    @Post('/auth')
    @UsePipes(new ValidationPipe())
    async saveAuth(@Body() body: LoginDto) {
        const authData = await this.kstvService.getAuthData(body);
        return authData;
    }
}
