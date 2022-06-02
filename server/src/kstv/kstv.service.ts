import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestHeaders } from 'axios';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class KstvService {
  async getAuthData(body: LoginDto) {
    const { login, password } = body;
    const data = {
      operationName: 'LoginV2',
      variables: {
        login: login,
        password: password,
        isOtp: false,
      },
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash:
            'c7de4034900794707fd542f484417766729de52f5a52b37c0fc4550ab380a0c9',
        },
      },
    };
    const headers = {
      authority: 'sundog.production.vidmind.com',
      'content-type': 'application/json',
      'x-vidmind-app-version': 'default',
      'x-vidmind-device-id': '192561847',
      'x-vidmind-device-type': 'web',
    };
    return await this.sendKyivstarRequest(data, headers);
  }

  async getListFromServer(sessionId: string) {
    const data = {
      "operationName": "GetAssets",
      "variables": {
        "id": "5754c30dff94042b8022a2aa",
        "offset": 0,
        "limit": 9999
      },
      "extensions": {
        "persistedQuery": {
          "version": 1,
          "sha256Hash": "b52fbb7f6401f4d7f39d1e6bc61229b8c02467909363186cb08d20067bc3ed81"
        }
      }
    };
    const headers = {
      authority: 'sundog.production.vidmind.com',
      'content-type': 'application/json',
      'x-vidmind-app-version': 'default',
      'x-vidmind-authorization': sessionId, 
      'x-vidmind-device-id': '192561847',
      'x-vidmind-device-type': 'web',
    };
    return await this.sendKyivstarRequest(data, headers);
  }

  async sendKyivstarRequest(data: object, headers: AxiosRequestHeaders) {
    const result = await axios.post(
      'https://sundog.production.vidmind.com/sundog/graphql',
      data,
      { headers },
    );
    return result.data;
  }

  getSaveSettingsData(body: LoginDto, authData) {
    const { login, password } = body;
    const { sessionUuid, uuid, accountId } = authData.data.loginV2;

    return {
      kstvLogin: login, 
      kstvPassword: password, 
      kstvSession: sessionUuid, 
      kstvId: uuid, 
      kstvAccountId: accountId
    };
  }
}
