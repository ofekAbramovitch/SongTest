import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { SongModule } from './api/song/song.module'
const path = require('path')

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, '..', 'public'),
			exclude: ['/api*'],
		}),
		SongModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST || 'localhost',
			port: +process.env.DB_PORT || 5432,
			username: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASSWORD || 'postgres',
			database: process.env.DB_NAME || 'songs_DB',
			autoLoadEntities: true,
			synchronize: true,
		})],
})
export class AppModule { }
