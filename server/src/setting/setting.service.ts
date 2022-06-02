import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, In, Repository } from 'typeorm';
import { SettingEntity } from './setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SettingEntity)
    private readonly settingRepository: Repository<SettingEntity>,
  ) {}

  async saveSettings(data: { [key: string]: string }) {
    if (Object.keys(data).length === 0) {
      return null;
    }

    const values = Object.keys(data)
      .map((key) => [{ key, value: data[key], updatedAt: new Date() }])
      .flat();
    await getRepository(SettingEntity)
      .createQueryBuilder('settings')
      .insert()
      .values(values)
      .onConflict(
        `("key") DO UPDATE SET "value" = excluded."value", "updatedAt" = excluded."updatedAt"`,
      )
      .execute();

    return values;
  }

  async getSettings(settings: string[] | string) {
    if (typeof settings === 'string') {
      const data = await this.settingRepository.findOne({
        key: settings,
      });
      return Object.fromEntries([[settings, data.value]]);
    }
    const data = await this.settingRepository.find({
      key: In(settings),
    });
    return Object.fromEntries(data.map((item) => [item.key, item.value]));
  }
}
