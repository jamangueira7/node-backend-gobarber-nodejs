import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import upload from '@config/upload'

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url'})
    getAvatarUrl(): string | null {
        if(!this.avatar) {
            return null;
        }

        switch (upload.driver) {
            case "disk":
                return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case "s3":
                return `https://${upload.config.aws.bucket}.s3.amazonws.com/${this.avatar}`;
            default:
                return null;
        }
    }
}

export default User;
