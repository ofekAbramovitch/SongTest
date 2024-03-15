import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISong } from "../../interfaces/song-interface"
import { songService } from "../../services/song.service"

const initialState = {
	songs: [] as ISong[],
	filterBy: { txt: '' }
}

export const getSongs = createAsyncThunk('songs', async () => {
	try {
		return songService.getSongs()
	} catch (err: any) {
		throw new Error('Failed to get songs', err)
	}
})

export const deleteSong = createAsyncThunk('songs/delete', async (id: number) => {
	try {
		await songService.deleteSong(id)
		return id
	} catch (err: any) {
		throw new Error('Failed to delete song', err)
	}
})

const songsSlice = createSlice({
	name: 'songs',
	initialState,
	reducers: {
		setFilterBy: (state, action: PayloadAction<string>) => {
			state.filterBy.txt = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getSongs.fulfilled, (state, action) => {
			state.songs = action.payload
		})
			.addCase(getSongs.pending, (state) => {
				state.songs = []
			})
			.addCase(getSongs.rejected, (state) => {
				state.songs = []
			})
			.addCase(deleteSong.fulfilled, (state, action) => {
				state.songs = state.songs.filter(song => song.id !== action.payload)
			
			})
	}
})

export const songActions = songsSlice.actions

export default songsSlice.reducer