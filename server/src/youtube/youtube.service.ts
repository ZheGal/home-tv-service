import { Injectable } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import * as ytpl from 'ytpl';

@Injectable()
export class YoutubeService {
    async getChannelLives(channelId: string) {
        const playlist = await ytpl(channelId);
        if (playlist.items) {
            const lives = playlist.items.filter(item => item.isLive);
            console.log(lives);
            if (lives[0]) {
                return lives[0].id;
            }
        }
        return null;
    }

    async getLiveStream(videoId: string) {
        const info = await ytdl.getInfo(videoId);
        const formats = info.formats;
        return formats[0].url;
    }

    async getVideoInfo(videoId: string) {
        const info = await ytdl.getInfo(videoId);
        return info;
    }
}
