import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Action, ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../store/store"
import { getSongs } from "../store/song/song.slice"
import SongTable from "../cmps/song-table"
import SongFilter from "../cmps/song-filter"

type Dispatch = ThunkDispatch<RootState, undefined, Action>

export default function SongIndex() {
	const dispatch: Dispatch = useDispatch()
	const songs = useSelector((storeState: RootState) => storeState.songs.songs)

	useEffect(() => {
		dispatch(getSongs())
	}, [])

	return (
		<main className="song-index main-layout">
			{songs.length !== 0 && <SongTable songs={songs} />}
		</main>
	)
}