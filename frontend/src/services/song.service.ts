import { ISong } from "../interfaces/song-interface"
import { httpService } from "./http.service"

const BASE_URL = 'song'

export const songService = {
    getSongs
}

async function getSongs(): Promise<ISong[]> {
    return await httpService.get(BASE_URL)
}