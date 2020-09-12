
export const LISTOFFAVORITES = 'LISTOFFAVORITES';

export const storeListOfFavorites = (listOfFavorites: any)=>{
    return {
        type: LISTOFFAVORITES,
        listOfFavorites
    }
}