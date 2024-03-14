const path = require('path')
import * as fs from 'fs'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { SongModule } from './api/song/song.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, '..', 'public'),
			exclude: ['/api*'],
		}),
		SongModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST || 'song-test-db-song-test-db.a.aivencloud.com',
			port: +process.env.DB_PORT || 24649,
			username: process.env.DB_USER || 'avnadmin',
			password: process.env.DB_PASSWORD || 'AVNS_rM3lfhsIfrSiB8eoSnb',
			database: process.env.DB_NAME || 'defaultdb',
			autoLoadEntities: true,
			synchronize: true,
			ssl: {
				ca: fs.readFileSync(path.join(__dirname, '..','ca.pem')).toString(),
			
			},
		})],
})
export class AppModule { }
