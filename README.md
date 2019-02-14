### JSONX

#### Usage

input.json

```json
{
    "myName": "John Doe",
    "ageInYears": 21
}
```

demo.js

```ts
import {prop, JSONX, x} from "jsonx"

class InputModel {
    @prop("myName")
    readonly name: string;

    @prop("ageInYears")
    readonly age: number;
}

const input = require("input.json");

// JSONX.parse(<input>, <model>).
const result = JSONX.parse(input, InputModel);

/*
    {
        "name": "John Doe",
        "age": 21
    }
 */
console.log(result);
```

#### Advanced Models

Linking models:

```ts
import {prop, x} from "jsonx"

class FriendModel {
    @x.string()
    readonly name: string;
}

class AdvancedModel {
    @prop("myName")
    @x.string()
    readonly name: string;
    
    @prop("ageInYears")
    @x.unsignedInteger()
    @x.minMax(1, 100)
    readonly age: number;

    @x.unsignedDecimal()
    readonly weight: number;

    @x.model(FriendModel)
    readonly friend: FriendModel;
}
```

Practical example:

```ts
import {prop, x, ConstraintUnion} from "jsonx"

// Join two constraints in a single, re-usable one.
const age: ConstraintUnion = [x.unsignedInteger(), x.minMax(1, 100)];

class DataModel {
    @x.string()
    readonly name: string;

    @x.union(age)
    readonly age: number;
}

class ResponseModel {
    @x.either("ok", "failed")
    readonly status: "ok" | "failed";

    @x.modelArray(DataModel)
    @x.maxLength(50)
    readonly data: DatalModel[];
}
```
