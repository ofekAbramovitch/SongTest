import * as fs from 'fs'
import * as csv from 'csv-parser'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Song } from './song.entity'

const filePath = './src/data/song_list.csv'

@Injectable()
export class SongService {
	constructor(@InjectRepository(Song) private songRepo: Repository<Song>) {
		this.songRepo.clear()
		this.loadSongsFromCSV()
	}

	private loadSongsFromCSV() {
		try {
			fs.createReadStream(filePath)
				.pipe(csv({
					separator: ';',
					mapHeaders: ({ header, index }) => header.toLowerCase()
				}))
				.on('data', async (row) => {
					const song = new Song()
					song.songName = row['song name'].toLowerCase()
					song.band = row['band'].toLowerCase()
					song.year = row['year']
					await this.songRepo.save(song)
				})
				.on('end', () => {
					console.log('Songs loaded successfully from csv file')
				})
		} catch (err) {
			console.error('Couldn\'t read from csv file: ', err)
		}
	}

	async getSongs(): Promise<Song[]> {
		try {
			return this.songRepo.find({ order: { band: 'ASC' } })
		} catch (err) {
			console.error('Couldn\'t get songs: ', err)
		}
	}

	async deleteSong(id: number): Promise<void> {
		try {
			await this.songRepo.delete(id)
		} catch (err) {
			console.error('Couldn\'t delete song: ', err)
		}
	}
}