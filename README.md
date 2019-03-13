# arduino to server protocol

`POST \<baseUrl>/\<sensorType>/?sensor=[values]`

for example:
3.17.66.141:3000/waterLevels/?sensor=30
3.17.66.141:3000/waterMoistureLevels/?sensor=12,34,88
3.17.66.141:3000/LightSensorStates/?sensor=12,34,88
3.17.66.141:3000/LightBulbStates/?sensor=12,34,88

# client request protocol

`GET \<baseUrl>/plants/:id -> JSON({waterLevels,waterMoistureLevels,LightSensorStates,LightBulbStates})`
`GET \<baseUrl>/plants/ -> JSON([{waterLevels,waterMoistureLevels,LightSensorStates,LightBulbStates}])`

`POST \<baseUrl>/plants/:id?light=true ->`
`POST \<baseUrl>/plants/:id?light=false ->`
`POST \<baseUrl>/plants/:id?relay ->`

baseUrl = 3.17.66.141:3000

# useful bits

## String interpolation on the arduino

`std::stringstream ss;`
`ss << "error! value was " << actualValue << " but I expected " << expectedValue << endl;`

`//example usage`
`throw MyException(ss.str())`

## Resource Handling on the Server

```javascript
global.resources = {
  waterLevels: [0, 0, 0],
  moistureLevels: [0, 0, 0],
  plantTubes: [0, 0, 0],
  lightBulbs: [0, 0, 0]
};
```

# UPDATES!!

## handle the water level resource

```javascript
app.post("/:resource", (req, res) => {
  vals = req.query.sensor.split(",");
  finalVals = vals.length === 1 ? _.fill(Array(arrayLength), vals[0]) : vals; //handle waterLevel variable
  resources[req.params.resource] = finalVals;
});
```

and on the arduino, `POST \<baseUrl>/\<sensorType>/?sensor=[values]`.

note the `?sensor=` addition.

## Handling client `GET /plant`

```js
app.get("/plants", (req, res) => {
  Object.entries(resources).reduce((listOfPlants, [key, plantValues]) => {
    plantValues.forEach(([value, id]) => listOfPlants[id][key] = value));
    return listOfPlants;
  },{});
})
```
