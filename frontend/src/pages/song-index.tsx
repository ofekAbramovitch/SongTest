import { Action, ThunkDispatch } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { getSongs } from "../store/song/song.slice"

type Dispatch = ThunkDispatch<RootState, undefined, Action>

export default function SongIndex() {
	const dispatch: Dispatch = useDispatch()
	const songs = useSelector((storeState: RootState) => storeState.songs.songs)


    useEffect(() => {
		dispatch(getSongs())
    }, [])
	
	console.log(songs)
    return (
        <section className="song-index">
			
        </section>
    )
}