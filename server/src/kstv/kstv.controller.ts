import { Body, Controller, Get, Param, Post, Redirect, UsePipes, ValidationPipe } from '@nestjs/common';
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

    @Get('/:id/index.m3u8')
    async initLiveStream(
        @Param('id') id: string,
    ) {
        const sessionId = (await this.settingService.getSettings('kstvSession'))?.kstvSession;
        if (!sessionId) {
            return null;
        }
        const url = await this.kstvService.getLiveStreamUrl(id, sessionId);
        const data = await this.kstvService.getLiveStreamData(url);
        return data;
    }

    @Get('/:id/:stream\.m3u8')
    async playLiveStream(
        @Param('id') id: string,
        @Param('stream') stream: string,
    ) {
        const sessionId = (await this.settingService.getSettings('kstvSession'))?.kstvSession;
        if (!sessionId) {
            return null;
        }
        const url = await this.kstvService.getLiveStreamUrl(id, sessionId);
        const parsePlaylistUrl = await this.kstvService.parsePlaylistUrl(url, stream);
        return parsePlaylistUrl;
    }

    @Get('/:id/:segment\.ts')
    @Redirect()
    async playSegment(
        @Param('id') id: string,
        @Param('segment') segment: string,
    ) {
        const sessionId = (await this.settingService.getSettings('kstvSession'))?.kstvSession;
        if (!sessionId) {
            return null;
        }
        const url = await this.kstvService.getLiveStreamUrl(id, sessionId);
        const parseSegment = await this.kstvService.getVideoSegment(url, segment);
        return { url: parseSegment };
    }
}
