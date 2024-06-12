import { FollowerType, StartFollowType } from '../models/followersModel';
import { appConfig } from '../utils/appConfig';
import axios from "axios"

export const getAllFollowerService = async (): Promise<FollowerType[]> => {

    const response = await axios.get<FollowerType[]>(appConfig.followUrl)

    const data = response.data

    return data
}

export const getAllFollowerCsvService = async (): Promise<Blob> => {

    const response = await axios.get(`${appConfig.followUrl}/csv`, { responseType: 'blob' });
    
    return response.data;
}

export const getFollowersByVacationsService = async (vacationId: number): Promise<FollowerType[]> => {

    const response = await axios.get<FollowerType[]>(`${appConfig.followUrl}/${vacationId}`)

    const data = response.data

    return data
}

export const startFollowingService = async (startFollow: StartFollowType): Promise<void> => {
    try {

        const response = await axios.post<FollowerType>(appConfig.followUrl, startFollow)

        const data = response.data

        return 

    } catch (err) {
        console.log(err)
    }
}

export const getFollowersByUserIdService = async (userId: string): Promise<FollowerType[]> => {

    const response = await axios.get<FollowerType[]>(`${appConfig.followUrl}/userId/${userId}`)

    const data = response.data

    return data
}