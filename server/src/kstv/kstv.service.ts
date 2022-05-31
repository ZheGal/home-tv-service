import { Injectable } from '@nestjs/common';
import axios from 'axios';
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
    const result = await axios.post(
      'https://sundog.production.vidmind.com/sundog/graphql',
      data,
      { headers },
    );
    return result.data;
  }
}
