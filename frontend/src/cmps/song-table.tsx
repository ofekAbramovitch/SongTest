import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { ISong } from "../interfaces/song-interface"

interface Props {
    songs: ISong[]
}

export default function SongTable({ songs }: Props) {
    const filterBy = useSelector((storeState: RootState) => storeState.songs.filterBy)
    const headers = Object.keys(songs[0]).filter(header => header !== "id")

    useEffect(() => {
        let filteredSongs = [...songs]

        if (filterBy.txt) {
            filteredSongs = filteredSongs.filter(song => {
                return song.songName.includes(filterBy.txt) ||
                    song.band.includes(filterBy.txt) ||
                    song.year.toString().includes(filterBy.txt)
            })
        }
    }, [songs, filterBy.txt])

    return (
        <TableContainer component={Paper} className="table-container">
            <Table stickyHeader sx={{ minWidth: 400 }} aria-label="simple table" >
                <TableHead>
                    <TableRow>
                        {headers.map((header, idx) => {
                            return <TableCell key={idx}>
                                {header === 'songName' ? 'Song Name' : header.charAt(0).toUpperCase() + header.slice(1)}
                            </TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songs.map(song => <TableRow key={song.id}>
                        <TableCell>{song.songName}</TableCell>
                        <TableCell>{song.band}</TableCell>
                        <TableCell>{song.year}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer >
    )
}