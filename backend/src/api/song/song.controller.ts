import { Controller, Delete, Get, InternalServerErrorException, Param } from '@nestjs/common'
import { SongService } from './song.service'
import { Song } from './song.entity'

@Controller('song')
export class SongController {
	constructor(private songService: SongService) { }

	@Get()
	async getSongs(): Promise<Song[]> {
		try {
			return await this.songService.getSongs()
		} catch (err) {
			throw new InternalServerErrorException('Couldn\'t fetch songs', err)
		}
	}

	@Delete(':id')
	async deleteSong(@Param('id') id: number): Promise<void> {
		try {
			await this.songService.deleteSong(id)
		} catch (err) {
			throw new InternalServerErrorException('Couldn\'t delete song', err)
		}
	}
}
