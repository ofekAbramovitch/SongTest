import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SongModule } from './api/song/song.module'

@Module({
	imports: [SongModule, TypeOrmModule.forRoot({
		type: 
  })],
})
export class AppModule { }
