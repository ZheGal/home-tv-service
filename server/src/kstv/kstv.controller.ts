import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SettingService } from 'src/setting/setting.service';
import { LoginDto } from './dto/login.dto';
import { KstvService } from './kstv.service';

@Controller('kstv')
export class KstvController {
    constructor(
        private readonly kstvService: KstvService,
        private readonly settingService: SettingService,
    ) {}

    @Post('/auth')
    @UsePipes(new ValidationPipe())
    async saveAuth(@Body() body: LoginDto) {
        const authData = await this.kstvService.getAuthData(body);
        const saveSettingsData = this.kstvService.getSaveSettingsData(body, authData);
        return await this.settingService.saveSettings(saveSettingsData);
    }

    @Get('/updateList')
    async updateList() {
        const sessionId = (await this.settingService.getSettings('kstvSession'))?.kstvSession;
        if (!sessionId) {
            return null;
        }
        const list = await this.kstvService.getListFromServer(sessionId);
        return list;
    }
}
