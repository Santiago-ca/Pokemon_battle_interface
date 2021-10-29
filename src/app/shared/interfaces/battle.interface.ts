export interface Battle{
    winner: string,
    pokemon1Points: number,
    pokemon2Points: number,
    pointsRecount: [{
        pokemon1Move: string,
        pokemon2Move: string
    }]
}