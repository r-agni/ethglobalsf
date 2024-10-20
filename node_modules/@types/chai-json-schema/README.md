# Installation
> `npm install --save @types/chai-json-schema`

# Summary
This package contains type definitions for chai-json-schema (https://github.com/chaijs/chai-json-schema/).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/chai-json-schema.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/chai-json-schema/index.d.ts)
````ts
// <reference types="chai" />
import tv4 = require("tv4");

declare global {
    namespace Chai {
        interface Assert {
            jsonSchema(value: any, schema: any, msg?: string): void;
            notJsonSchema(value: any, schema: any, msg?: string): void;
        }

        interface LanguageChains {
            jsonSchema(schema: any, msg?: string): void;
        }

        interface ChaiStatic {
            tv4: tv4.TV4;
        }
    }
}

declare const chaiJsonSchema: Chai.ChaiPlugin;
declare namespace chaiJsonSchema {}
export = chaiJsonSchema;

````

### Additional Details
 * Last updated: Fri, 01 Mar 2024 00:50:47 GMT
 * Dependencies: [@types/chai](https://npmjs.com/package/@types/chai), [@types/tv4](https://npmjs.com/package/@types/tv4)

# Credits
These definitions were written by [Ulrich Heiniger](https://github.com/ulrichheiniger).
