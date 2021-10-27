# Sensorthings client

This package is a JavaScript client library for the [SensorThings API](https://github.com/opengeospatial/sensorthings).
It currently supports `v1.0` version only.

## Examples

### CRUD

```typescript
Thing thing = new Thing('thermometer', 'Sensor system monitoring area temperature');
await service.create(thing);

thing.name = 'Office thermometer';
await service.update(thing);

await service.delete(thing);
```

### Queries

The `Query` class allows you to request data by using SensorThings query parameters.

```typescript
Thing[] things = await service.things.query()
    .top(50)
    .skip(5)
    .orderBy('description')
    .select('description')
    .list();
```

## Notes

### Errors handling

This library will try to avoid making API calls it knows will fail.

For example, the following request would result in a `400` response from the server, because top argument shall be a non-negative integer:

```typescript
Thing[] things = await service.things.query()
    .top(-7)
    .list();
```

Instead of calling the service with this request, the library would directly raise a `NegativeValueError`.

### Compatibility layer

This library includes a compatibility package (located in `src/service/compatibility` folder) that enables the library to run against different
SensorThings API implementations.

We tested the library against following backends:
* [FROST-Server](https://github.com/FraunhoferIOSB/FROST-Server)
* [gost](https://github.com/gost/server)

#### Location encoding type

If you want to run this library against a backend only supporting `'application/vnd.geo+json'` encoding for Location entities, you can
specify it in your service declaration:

```typescript
const service = new SensorThingsService(
    'https://example.org',
    { locationEncodingType: 'application/vnd.geo+json' }
);
```
