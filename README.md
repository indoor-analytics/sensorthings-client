# Sensorthings client

This package is a JavaScript client library for the [SensorThings API](https://github.com/opengeospatial/sensorthings).
It aims to reproduce the [FROST-Client](https://github.com/FraunhoferIOSB/FROST-Client) Java API.

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

## Errors handling

This library will try to avoid making API calls it knows will fail.

For example, the following request would result in a `400` response from the server, because top argument shall be a non-negative integer:

```typescript
Thing[] things = await service.things.query()
    .top(-7)
    .list();
```


Instead of calling the service with this request, the library would directly raise a `NegativeValueError`.
