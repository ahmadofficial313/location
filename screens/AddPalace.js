import PlaceForm from "../components/place/PlaceForm";
import { insertPlace } from "../util/database";

function AddPalace({navigation}){
async function createPlaceHandler(place){
    await insertPlace(place)
    navigation.navigate('AllPlaces');

}
    return(
        <PlaceForm onCreatePlace={createPlaceHandler}/>
    )
}
export default AddPalace;