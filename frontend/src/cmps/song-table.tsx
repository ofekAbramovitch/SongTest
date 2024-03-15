import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { ISong } from "../interfaces/song-interface"
import { deleteSong } from "../store/song/song.slice"
import SongFilter from "./song-filter"
import { AppDispatch } from "../store/store"

interface Props {
    songs: ISong[]
}

export default function SongTable({ songs }: Props) {
    const filterBy = useSelector((storeState: RootState) => storeState.songs.filterBy)
    const headers = Object.keys(songs[0]).filter(header => header !== "id")
    const [filteredSongs, setFilteredSongs] = useState<ISong[]>([...songs])
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [orderBy, setOrderBy] = useState<keyof ISong>('band')
    const [selectedSong, setSelectedSong] = useState<number | null>(null)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        let filteredSongs = [...songs]

        if (filterBy.txt) {
            filteredSongs = filteredSongs.filter(song => {
                return song.songName.includes(filterBy.txt) ||
                    song.band.includes(filterBy.txt) ||
                    song.year.toString().includes(filterBy.txt)
            })
        }
        setFilteredSongs(filteredSongs)
    }, [songs, filterBy.txt])

    function handleSort(prop: keyof ISong) {
        const isAsc = orderBy === prop && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(prop)

        setFilteredSongs([...filteredSongs].sort((a, b) => {
            if (isAsc) {
                return b[prop].toString().localeCompare(a[prop].toString())
            } else {
                return a[prop].toString().localeCompare(b[prop].toString())
            }
        }))
    }

    async function onDelete() {
        if (selectedSong) {
            dispatch(deleteSong(selectedSong))
            setSelectedSong(null)
        }
    }

    return (
        <>
            <section className="action-bar">
                <SongFilter />
                {selectedSong && (
                    <IconButton className="delete-btn" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </section>
            <TableContainer component={Paper} className="table-container">
                <Table stickyHeader sx={{ minWidth: 400 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {headers.map((header, idx) => {
                                return <TableCell key={idx}>
                                    <TableSortLabel active={orderBy === header}
                                        direction={orderBy === header ? order : 'asc'}
                                        onClick={() => handleSort(header as keyof ISong)}
                                    >
                                        {header === 'songName' ? 'Song Name' :
                                            header.charAt(0).toUpperCase() + header.slice(1)}
                                    </TableSortLabel>
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!filteredSongs.length && <h2>No Songs Found</h2>}
                        {filteredSongs.map(song => <TableRow key={song.id}>
                            <TableCell className="checkbox">
                                <Checkbox checked={selectedSong === song.id}
                                    onChange={() => setSelectedSong(prev => (
                                        prev === song.id ? null : song.id
                                    ))} />
                            </TableCell>
                            <TableCell>{song.songName}</TableCell>
                            <TableCell>{song.band}</TableCell>
                            <TableCell>{song.year}</TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}