import { FollowType } from "../Models/followModels";
import { mySqlCommand } from "../Utils/dal";
import { unauthorizedError } from "../Models/ErrorModels";
import { OkPacket } from "mysql";


export const getAllFollowersLogic = async (): Promise<FollowType[]> => {

    const sqlCommand = `SELECT v.vacationId, v.destination, COUNT(f.userId) AS numberOfFollowers FROM vacations v LEFT JOIN follows f ON v.vacationId = f.vacationId GROUP BY v.vacationId, v.destination;`

    const getAllFollowers = await mySqlCommand(sqlCommand) as FollowType[]

    return getAllFollowers
    ///output of [vacationId,destination,numberOfFollowers]
}
export const getAllFollowersCsvLogic = async (): Promise<FollowType[]> => {

    const sqlCommand = `SELECT  v.destination, COUNT(f.userId) AS numberOfFollowers FROM vacations v LEFT JOIN follows f ON v.vacationId = f.vacationId GROUP BY v.vacationId, v.destination`;

    const getAllFollowers = await mySqlCommand(sqlCommand) as FollowType[]

    return getAllFollowers
}

export const getFollowByUserLogic = async (userId: string): Promise<FollowType[]> => {

    const sqlCommand = ` 
    SELECT  vacations.*
    FROM follows 
    INNER JOIN users ON follows.userId = users.userId 
    INNER JOIN vacations ON follows.vacationId = vacations.vacationId  WHERE follows.userId = '${userId}'`

    const getAllFollowers = await mySqlCommand(sqlCommand) as FollowType[]

    return getAllFollowers
}

export const getAllFollowByVactionLogic = async (vacationId: number): Promise<FollowType[]> => {

    const sqlCommand = ` SELECT v.vacationId, COUNT(f.userId) AS numberOfFollowers 
FROM vacations v 
LEFT JOIN follows f ON v.vacationId = f.vacationId 
WHERE v.vacationId = ${vacationId}
GROUP BY v.vacationId, v.destination;`

    const getAllFollowers = await mySqlCommand(sqlCommand) as FollowType[]

    return getAllFollowers
}
// SELECT u.userId, COUNT(f.vacationId) AS numberOfFollows FROM users u JOIN follows f ON u.userId = f.userId WHERE u.userId = '72579452-e97f-11ee-9cec-2c3b70b07622' GROUP BY u.userId;
// SELECT v.vacationId, COUNT(f.userId) AS numberOfFollowers FROM vactions as v JOIN follows as f ON v.vacationId = f.vacationId GROUP BY v.vacationId;

export const addFollowLogic = async (newFollow: FollowType) => {

    const checkIfFollows = `select * from follows where userId = '${newFollow.userId}' and vacationId = '${newFollow.vacationId}'`

    const userAlreadyFollow = await mySqlCommand(checkIfFollows)

    if (userAlreadyFollow.length >= 1) {

        const dele = `DELETE FROM follows WHERE userId = '${newFollow.userId}' and vacationId = ${newFollow.vacationId}`

        const info = await mySqlCommand(dele)
        console.log('got herr')

    } else {

        const sqlCommand = `INSERT INTO follows (userId,vacationId) VALUES ('${newFollow.userId}' ,${newFollow.vacationId}) `

        await mySqlCommand(sqlCommand)

    }
}

