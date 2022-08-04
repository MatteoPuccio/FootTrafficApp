

export default class MarkerModel {

    constructor(data) {
        data = data == null ? {
            geometry: { location: { lat: 0, lng: 0 } },
            name: "Nessun luogo selezionato",
            types: "Seleziona un luogo con la barra di ricerca"
        } : data;
        this.coordinate = {
            latitude: data.geometry.location.lat,
            longitude: data.geometry.location.lng
        }
        this.title = data.name
        this.description = JSON.stringify(data.types)
    }
}