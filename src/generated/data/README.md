# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `srm-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListarProductores*](#listarproductores)
  - [*ListarProductos*](#listarproductos)
- [**Mutations**](#mutations)
  - [*RegistrarProductor*](#registrarproductor)
  - [*RegistrarProducto*](#registrarproducto)
  - [*EliminarProducto*](#eliminarproducto)
  - [*EliminarProductor*](#eliminarproductor)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `srm-connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@hotmart-srm/data` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@hotmart-srm/data';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@hotmart-srm/data';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `srm-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListarProductores
You can execute the `ListarProductores` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
listarProductores(options?: ExecuteQueryOptions): QueryPromise<ListarProductoresData, undefined>;

interface ListarProductoresRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarProductoresData, undefined>;
}
export const listarProductoresRef: ListarProductoresRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarProductores(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarProductoresData, undefined>;

interface ListarProductoresRef {
  ...
  (dc: DataConnect): QueryRef<ListarProductoresData, undefined>;
}
export const listarProductoresRef: ListarProductoresRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarProductoresRef:
```typescript
const name = listarProductoresRef.operationName;
console.log(name);
```

### Variables
The `ListarProductores` query has no variables.
### Return Type
Recall that executing the `ListarProductores` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarProductoresData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarProductoresData {
  producers: ({
    id: UUIDString;
    fullName: string;
    contactEmail: string;
    bankAccount: string;
  } & Producer_Key)[];
}
```
### Using `ListarProductores`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarProductores } from '@hotmart-srm/data';


// Call the `listarProductores()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarProductores();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarProductores(dataConnect);

console.log(data.producers);

// Or, you can use the `Promise` API.
listarProductores().then((response) => {
  const data = response.data;
  console.log(data.producers);
});
```

### Using `ListarProductores`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarProductoresRef } from '@hotmart-srm/data';


// Call the `listarProductoresRef()` function to get a reference to the query.
const ref = listarProductoresRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarProductoresRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.producers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.producers);
});
```

## ListarProductos
You can execute the `ListarProductos` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
listarProductos(options?: ExecuteQueryOptions): QueryPromise<ListarProductosData, undefined>;

interface ListarProductosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarProductosData, undefined>;
}
export const listarProductosRef: ListarProductosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarProductos(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarProductosData, undefined>;

interface ListarProductosRef {
  ...
  (dc: DataConnect): QueryRef<ListarProductosData, undefined>;
}
export const listarProductosRef: ListarProductosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarProductosRef:
```typescript
const name = listarProductosRef.operationName;
console.log(name);
```

### Variables
The `ListarProductos` query has no variables.
### Return Type
Recall that executing the `ListarProductos` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarProductosData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarProductosData {
  digitalProducts: ({
    id: UUIDString;
    title: string;
    format: string;
    niche: string;
    basePrice: number;
    affiliateCommission: number;
    producer?: {
      id: UUIDString;
      fullName: string;
      contactEmail: string;
    } & Producer_Key;
  } & DigitalProduct_Key)[];
}
```
### Using `ListarProductos`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarProductos } from '@hotmart-srm/data';


// Call the `listarProductos()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarProductos();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarProductos(dataConnect);

console.log(data.digitalProducts);

// Or, you can use the `Promise` API.
listarProductos().then((response) => {
  const data = response.data;
  console.log(data.digitalProducts);
});
```

### Using `ListarProductos`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarProductosRef } from '@hotmart-srm/data';


// Call the `listarProductosRef()` function to get a reference to the query.
const ref = listarProductosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarProductosRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.digitalProducts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.digitalProducts);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `srm-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## RegistrarProductor
You can execute the `RegistrarProductor` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
registrarProductor(vars: RegistrarProductorVariables): MutationPromise<RegistrarProductorData, RegistrarProductorVariables>;

interface RegistrarProductorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarProductorVariables): MutationRef<RegistrarProductorData, RegistrarProductorVariables>;
}
export const registrarProductorRef: RegistrarProductorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registrarProductor(dc: DataConnect, vars: RegistrarProductorVariables): MutationPromise<RegistrarProductorData, RegistrarProductorVariables>;

interface RegistrarProductorRef {
  ...
  (dc: DataConnect, vars: RegistrarProductorVariables): MutationRef<RegistrarProductorData, RegistrarProductorVariables>;
}
export const registrarProductorRef: RegistrarProductorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registrarProductorRef:
```typescript
const name = registrarProductorRef.operationName;
console.log(name);
```

### Variables
The `RegistrarProductor` mutation requires an argument of type `RegistrarProductorVariables`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RegistrarProductorVariables {
  fullName: string;
  contactEmail: string;
  bankAccount: string;
}
```
### Return Type
Recall that executing the `RegistrarProductor` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegistrarProductorData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegistrarProductorData {
  producer_insert: Producer_Key;
}
```
### Using `RegistrarProductor`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registrarProductor, RegistrarProductorVariables } from '@hotmart-srm/data';

// The `RegistrarProductor` mutation requires an argument of type `RegistrarProductorVariables`:
const registrarProductorVars: RegistrarProductorVariables = {
  fullName: ..., 
  contactEmail: ..., 
  bankAccount: ..., 
};

// Call the `registrarProductor()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registrarProductor(registrarProductorVars);
// Variables can be defined inline as well.
const { data } = await registrarProductor({ fullName: ..., contactEmail: ..., bankAccount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registrarProductor(dataConnect, registrarProductorVars);

console.log(data.producer_insert);

// Or, you can use the `Promise` API.
registrarProductor(registrarProductorVars).then((response) => {
  const data = response.data;
  console.log(data.producer_insert);
});
```

### Using `RegistrarProductor`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registrarProductorRef, RegistrarProductorVariables } from '@hotmart-srm/data';

// The `RegistrarProductor` mutation requires an argument of type `RegistrarProductorVariables`:
const registrarProductorVars: RegistrarProductorVariables = {
  fullName: ..., 
  contactEmail: ..., 
  bankAccount: ..., 
};

// Call the `registrarProductorRef()` function to get a reference to the mutation.
const ref = registrarProductorRef(registrarProductorVars);
// Variables can be defined inline as well.
const ref = registrarProductorRef({ fullName: ..., contactEmail: ..., bankAccount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registrarProductorRef(dataConnect, registrarProductorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.producer_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.producer_insert);
});
```

## RegistrarProducto
You can execute the `RegistrarProducto` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
registrarProducto(vars: RegistrarProductoVariables): MutationPromise<RegistrarProductoData, RegistrarProductoVariables>;

interface RegistrarProductoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarProductoVariables): MutationRef<RegistrarProductoData, RegistrarProductoVariables>;
}
export const registrarProductoRef: RegistrarProductoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registrarProducto(dc: DataConnect, vars: RegistrarProductoVariables): MutationPromise<RegistrarProductoData, RegistrarProductoVariables>;

interface RegistrarProductoRef {
  ...
  (dc: DataConnect, vars: RegistrarProductoVariables): MutationRef<RegistrarProductoData, RegistrarProductoVariables>;
}
export const registrarProductoRef: RegistrarProductoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registrarProductoRef:
```typescript
const name = registrarProductoRef.operationName;
console.log(name);
```

### Variables
The `RegistrarProducto` mutation requires an argument of type `RegistrarProductoVariables`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RegistrarProductoVariables {
  title: string;
  format: string;
  niche: string;
  basePrice: number;
  affiliateCommission: number;
  producerId: UUIDString;
}
```
### Return Type
Recall that executing the `RegistrarProducto` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegistrarProductoData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegistrarProductoData {
  digitalProduct_insert: DigitalProduct_Key;
}
```
### Using `RegistrarProducto`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registrarProducto, RegistrarProductoVariables } from '@hotmart-srm/data';

// The `RegistrarProducto` mutation requires an argument of type `RegistrarProductoVariables`:
const registrarProductoVars: RegistrarProductoVariables = {
  title: ..., 
  format: ..., 
  niche: ..., 
  basePrice: ..., 
  affiliateCommission: ..., 
  producerId: ..., 
};

// Call the `registrarProducto()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registrarProducto(registrarProductoVars);
// Variables can be defined inline as well.
const { data } = await registrarProducto({ title: ..., format: ..., niche: ..., basePrice: ..., affiliateCommission: ..., producerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registrarProducto(dataConnect, registrarProductoVars);

console.log(data.digitalProduct_insert);

// Or, you can use the `Promise` API.
registrarProducto(registrarProductoVars).then((response) => {
  const data = response.data;
  console.log(data.digitalProduct_insert);
});
```

### Using `RegistrarProducto`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registrarProductoRef, RegistrarProductoVariables } from '@hotmart-srm/data';

// The `RegistrarProducto` mutation requires an argument of type `RegistrarProductoVariables`:
const registrarProductoVars: RegistrarProductoVariables = {
  title: ..., 
  format: ..., 
  niche: ..., 
  basePrice: ..., 
  affiliateCommission: ..., 
  producerId: ..., 
};

// Call the `registrarProductoRef()` function to get a reference to the mutation.
const ref = registrarProductoRef(registrarProductoVars);
// Variables can be defined inline as well.
const ref = registrarProductoRef({ title: ..., format: ..., niche: ..., basePrice: ..., affiliateCommission: ..., producerId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registrarProductoRef(dataConnect, registrarProductoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.digitalProduct_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.digitalProduct_insert);
});
```

## EliminarProducto
You can execute the `EliminarProducto` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
eliminarProducto(vars: EliminarProductoVariables): MutationPromise<EliminarProductoData, EliminarProductoVariables>;

interface EliminarProductoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarProductoVariables): MutationRef<EliminarProductoData, EliminarProductoVariables>;
}
export const eliminarProductoRef: EliminarProductoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarProducto(dc: DataConnect, vars: EliminarProductoVariables): MutationPromise<EliminarProductoData, EliminarProductoVariables>;

interface EliminarProductoRef {
  ...
  (dc: DataConnect, vars: EliminarProductoVariables): MutationRef<EliminarProductoData, EliminarProductoVariables>;
}
export const eliminarProductoRef: EliminarProductoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarProductoRef:
```typescript
const name = eliminarProductoRef.operationName;
console.log(name);
```

### Variables
The `EliminarProducto` mutation requires an argument of type `EliminarProductoVariables`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarProductoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarProducto` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarProductoData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarProductoData {
  digitalProduct_delete?: DigitalProduct_Key | null;
}
```
### Using `EliminarProducto`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarProducto, EliminarProductoVariables } from '@hotmart-srm/data';

// The `EliminarProducto` mutation requires an argument of type `EliminarProductoVariables`:
const eliminarProductoVars: EliminarProductoVariables = {
  id: ..., 
};

// Call the `eliminarProducto()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarProducto(eliminarProductoVars);
// Variables can be defined inline as well.
const { data } = await eliminarProducto({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarProducto(dataConnect, eliminarProductoVars);

console.log(data.digitalProduct_delete);

// Or, you can use the `Promise` API.
eliminarProducto(eliminarProductoVars).then((response) => {
  const data = response.data;
  console.log(data.digitalProduct_delete);
});
```

### Using `EliminarProducto`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarProductoRef, EliminarProductoVariables } from '@hotmart-srm/data';

// The `EliminarProducto` mutation requires an argument of type `EliminarProductoVariables`:
const eliminarProductoVars: EliminarProductoVariables = {
  id: ..., 
};

// Call the `eliminarProductoRef()` function to get a reference to the mutation.
const ref = eliminarProductoRef(eliminarProductoVars);
// Variables can be defined inline as well.
const ref = eliminarProductoRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarProductoRef(dataConnect, eliminarProductoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.digitalProduct_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.digitalProduct_delete);
});
```

## EliminarProductor
You can execute the `EliminarProductor` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
eliminarProductor(vars: EliminarProductorVariables): MutationPromise<EliminarProductorData, EliminarProductorVariables>;

interface EliminarProductorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarProductorVariables): MutationRef<EliminarProductorData, EliminarProductorVariables>;
}
export const eliminarProductorRef: EliminarProductorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarProductor(dc: DataConnect, vars: EliminarProductorVariables): MutationPromise<EliminarProductorData, EliminarProductorVariables>;

interface EliminarProductorRef {
  ...
  (dc: DataConnect, vars: EliminarProductorVariables): MutationRef<EliminarProductorData, EliminarProductorVariables>;
}
export const eliminarProductorRef: EliminarProductorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarProductorRef:
```typescript
const name = eliminarProductorRef.operationName;
console.log(name);
```

### Variables
The `EliminarProductor` mutation requires an argument of type `EliminarProductorVariables`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarProductorVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarProductor` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarProductorData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarProductorData {
  producer_delete?: Producer_Key | null;
}
```
### Using `EliminarProductor`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarProductor, EliminarProductorVariables } from '@hotmart-srm/data';

// The `EliminarProductor` mutation requires an argument of type `EliminarProductorVariables`:
const eliminarProductorVars: EliminarProductorVariables = {
  id: ..., 
};

// Call the `eliminarProductor()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarProductor(eliminarProductorVars);
// Variables can be defined inline as well.
const { data } = await eliminarProductor({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarProductor(dataConnect, eliminarProductorVars);

console.log(data.producer_delete);

// Or, you can use the `Promise` API.
eliminarProductor(eliminarProductorVars).then((response) => {
  const data = response.data;
  console.log(data.producer_delete);
});
```

### Using `EliminarProductor`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarProductorRef, EliminarProductorVariables } from '@hotmart-srm/data';

// The `EliminarProductor` mutation requires an argument of type `EliminarProductorVariables`:
const eliminarProductorVars: EliminarProductorVariables = {
  id: ..., 
};

// Call the `eliminarProductorRef()` function to get a reference to the mutation.
const ref = eliminarProductorRef(eliminarProductorVars);
// Variables can be defined inline as well.
const ref = eliminarProductorRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarProductorRef(dataConnect, eliminarProductorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.producer_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.producer_delete);
});
```

