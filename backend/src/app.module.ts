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
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			autoLoadEntities: true,
			synchronize: true,
			ssl: {
				ca: fs.readFileSync(path.join(__dirname, '..','ca.pem')).toString(),
			
			},
		})],
})
export class AppModule { }
