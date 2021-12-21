export class SensorAPIResponses {
    static get sensors(): Record<string, unknown> {
        return {
            "@iot.count":2,
            "value":[
                {"@iot.id":4,"@iot.selfLink":"https://toronto-bike-snapshot.sensorup.com/v1.0/Sensors(4)","description":"A sensor for tracking how many docks are available in a bike station","name":"available_docks","encodingType":"text/plan","metadata":"https://member.bikesharetoronto.com/stations","Datastreams@iot.navigationLink":"https://toronto-bike-snapshot.sensorup.com/v1.0/Sensors(4)/Datastreams"},
                {"@iot.id":3,"@iot.selfLink":"https://toronto-bike-snapshot.sensorup.com/v1.0/Sensors(3)","description":"A sensor for tracking how many bikes are available in a bike station","name":"available_bikes","encodingType":"text/plan","metadata":"https://member.bikesharetoronto.com/stations","Datastreams@iot.navigationLink":"https://toronto-bike-snapshot.sensorup.com/v1.0/Sensors(3)/Datastreams"}
            ]
        };
    }
}