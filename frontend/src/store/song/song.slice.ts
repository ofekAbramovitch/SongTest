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
	}
})

export const songActions = songsSlice.actions

export default songsSlice.reducer