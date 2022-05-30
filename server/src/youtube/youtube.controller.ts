import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
    constructor(
        private readonly youtubeService: YoutubeService,
    ) {}

    @Get(':channelId/index.m3u8')
    @Redirect()
    async getChannelStream(
        @Param('channelId') channelId: string
    ) {
        const videoId = await this.youtubeService.getChannelLives(channelId);
        if (videoId) {
            const url = await this.youtubeService.getLiveStream(videoId);
            return { url };
        }
    }

    @Get(':videoId/video.m3u8')
    @Redirect()
    async getLiveStream(
        @Param('videoId') videoId: string,
    ) {
        const url = await this.youtubeService.getLiveStream(videoId);
        return { url };
    }

    @Get(':videoId/info')
    async getVideoInfo(
        @Param('videoId') videoId: string,
    ) {
        return await this.youtubeService.getVideoInfo(videoId);
    }
}
