export type FollowerType = {
    numberOfFollowers: number;
    destination: string
    userId?: string,
    vacationId: number,
}
export type StartFollowType = {
    userId?: string,
    vacationId: number,
}