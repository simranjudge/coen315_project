# arduino to server protocol

`POST \<baseUrl>/\<sensorType>/?[values]`

for example:
3.17.66.141:3000/waterLevels/?30
3.17.66.141:3000/waterMoistureLevels/?12,34,88
3.17.66.141:3000/LightSensorStates/?
3.17.66.141:3000/LightBulbStates/?

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
