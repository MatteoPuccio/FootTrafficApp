
//Model of map marker, store location and description
export default class MarkerModel {

    constructor(data) {
        data = data == null ? {
            geometry: { location: { lat: 0, lng: 0 } },
            name: "Nessun luogo selezionato",
            types: "Seleziona un luogo con la barra di ricerca",
            address: null,
        } : data;

        this.coordinate = {
            latitude: data.geometry.location.lat,
            longitude: data.geometry.location.lng
        };
        this.title = data.name != null ? data.name : data.description.split(',')[0];
        this.description = JSON.stringify(data.types);
        this.address = data.address;
    }
}