import { ChangeEvent } from "react"
import { useDispatch } from "react-redux"
import { TextField } from "@mui/material"
import { songActions } from "../store/song/song.slice"

export default function SongFilter() {
	const dispatch = useDispatch()

	function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
		dispatch(songActions.setFilterBy(target.value))
	}

	return (
		<section className="song-filter">
			<TextField id="standard-search" label="Looking for..." type="search"
				onChange={handleChange}
				variant="outlined"
			/>
		</section>
	)
}