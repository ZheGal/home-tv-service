import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'settings'})
export class SettingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    key: string;

    @Column()
    value: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}