import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { ISong } from "../interfaces/song-interface"

interface Props {
    songs: ISong[]
}

export default function SongTable({ songs }: Props) {
    const filterBy = useSelector((storeState: RootState) => storeState.songs.filterBy)
    const headers = Object.keys(songs[0]).filter(header => header !== "id")
    const [filteredSongs, setFilteredSongs] = useState<ISong[]>([...songs])
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [orderBy, setOrderBy] = useState<keyof ISong>('band')

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

    return (
        <TableContainer component={Paper} className="table-container">
            <Table stickyHeader sx={{ minWidth: 400 }} aria-label="simple table" >
                <TableHead>
                    <TableRow>
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
                        <TableCell>{song.songName}</TableCell>
                        <TableCell>{song.band}</TableCell>
                        <TableCell>{song.year}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}