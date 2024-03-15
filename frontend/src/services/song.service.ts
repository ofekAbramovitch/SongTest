import { ISong } from "../interfaces/song-interface"
import { httpService } from "./http.service"

const BASE_URL = 'song'

export const songService = {
    getSongs,
    deleteSong
}

async function getSongs(): Promise<ISong[]> {
    return await httpService.get(BASE_URL)
}

async function deleteSong(id: number): Promise<void> {
    return await httpService.delete(`${BASE_URL}/${id}`)
}