# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `srm-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListarProveedores*](#listarproveedores)
  - [*ListarBeneficios*](#listarbeneficios)
- [**Mutations**](#mutations)
  - [*RegistrarProveedor*](#registrarproveedor)
  - [*RegistrarBeneficio*](#registrarbeneficio)
  - [*EliminarBeneficio*](#eliminarbeneficio)
  - [*EliminarProveedor*](#eliminarproveedor)

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

## ListarProveedores
You can execute the `ListarProveedores` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
listarProveedores(options?: ExecuteQueryOptions): QueryPromise<ListarProveedoresData, undefined>;

interface ListarProveedoresRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarProveedoresData, undefined>;
}
export const listarProveedoresRef: ListarProveedoresRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarProveedores(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarProveedoresData, undefined>;

interface ListarProveedoresRef {
  ...
  (dc: DataConnect): QueryRef<ListarProveedoresData, undefined>;
}
export const listarProveedoresRef: ListarProveedoresRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarProveedoresRef:
```typescript
const name = listarProveedoresRef.operationName;
console.log(name);
```

### Variables
The `ListarProveedores` query has no variables.
### Return Type
Recall that executing the `ListarProveedores` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarProveedoresData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarProveedoresData {
  proveedorAsociados: ({
    id: UUIDString;
    razonSocial: string;
    tipoSocio: string;
    emailContacto: string;
  } & ProveedorAsociado_Key)[];
}
```
### Using `ListarProveedores`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarProveedores } from '@hotmart-srm/data';


// Call the `listarProveedores()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarProveedores();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarProveedores(dataConnect);

console.log(data.proveedorAsociados);

// Or, you can use the `Promise` API.
listarProveedores().then((response) => {
  const data = response.data;
  console.log(data.proveedorAsociados);
});
```

### Using `ListarProveedores`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarProveedoresRef } from '@hotmart-srm/data';


// Call the `listarProveedoresRef()` function to get a reference to the query.
const ref = listarProveedoresRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarProveedoresRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.proveedorAsociados);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.proveedorAsociados);
});
```

## ListarBeneficios
You can execute the `ListarBeneficios` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
listarBeneficios(options?: ExecuteQueryOptions): QueryPromise<ListarBeneficiosData, undefined>;

interface ListarBeneficiosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarBeneficiosData, undefined>;
}
export const listarBeneficiosRef: ListarBeneficiosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarBeneficios(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarBeneficiosData, undefined>;

interface ListarBeneficiosRef {
  ...
  (dc: DataConnect): QueryRef<ListarBeneficiosData, undefined>;
}
export const listarBeneficiosRef: ListarBeneficiosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarBeneficiosRef:
```typescript
const name = listarBeneficiosRef.operationName;
console.log(name);
```

### Variables
The `ListarBeneficios` query has no variables.
### Return Type
Recall that executing the `ListarBeneficios` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarBeneficiosData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarBeneficiosData {
  beneficioCatalogos: ({
    id: UUIDString;
    nombreBeneficio: string;
    categoria: string;
    valorEconomico: number;
    costoPuntosGamificacion: number;
    proveedor: {
      id: UUIDString;
      razonSocial: string;
    } & ProveedorAsociado_Key;
  } & BeneficioCatalogo_Key)[];
}
```
### Using `ListarBeneficios`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarBeneficios } from '@hotmart-srm/data';


// Call the `listarBeneficios()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarBeneficios();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarBeneficios(dataConnect);

console.log(data.beneficioCatalogos);

// Or, you can use the `Promise` API.
listarBeneficios().then((response) => {
  const data = response.data;
  console.log(data.beneficioCatalogos);
});
```

### Using `ListarBeneficios`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarBeneficiosRef } from '@hotmart-srm/data';


// Call the `listarBeneficiosRef()` function to get a reference to the query.
const ref = listarBeneficiosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarBeneficiosRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.beneficioCatalogos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.beneficioCatalogos);
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

## RegistrarProveedor
You can execute the `RegistrarProveedor` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
registrarProveedor(vars: RegistrarProveedorVariables): MutationPromise<RegistrarProveedorData, RegistrarProveedorVariables>;

interface RegistrarProveedorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarProveedorVariables): MutationRef<RegistrarProveedorData, RegistrarProveedorVariables>;
}
export const registrarProveedorRef: RegistrarProveedorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registrarProveedor(dc: DataConnect, vars: RegistrarProveedorVariables): MutationPromise<RegistrarProveedorData, RegistrarProveedorVariables>;

interface RegistrarProveedorRef {
  ...
  (dc: DataConnect, vars: RegistrarProveedorVariables): MutationRef<RegistrarProveedorData, RegistrarProveedorVariables>;
}
export const registrarProveedorRef: RegistrarProveedorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registrarProveedorRef:
```typescript
const name = registrarProveedorRef.operationName;
console.log(name);
```

### Variables
The `RegistrarProveedor` mutation requires an argument of type `RegistrarProveedorVariables`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RegistrarProveedorVariables {
  razonSocial: string;
  tipoSocio: string;
  emailContacto: string;
}
```
### Return Type
Recall that executing the `RegistrarProveedor` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegistrarProveedorData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegistrarProveedorData {
  proveedorAsociado_insert: ProveedorAsociado_Key;
}
```
### Using `RegistrarProveedor`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registrarProveedor, RegistrarProveedorVariables } from '@hotmart-srm/data';

// The `RegistrarProveedor` mutation requires an argument of type `RegistrarProveedorVariables`:
const registrarProveedorVars: RegistrarProveedorVariables = {
  razonSocial: ..., 
  tipoSocio: ..., 
  emailContacto: ..., 
};

// Call the `registrarProveedor()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registrarProveedor(registrarProveedorVars);
// Variables can be defined inline as well.
const { data } = await registrarProveedor({ razonSocial: ..., tipoSocio: ..., emailContacto: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registrarProveedor(dataConnect, registrarProveedorVars);

console.log(data.proveedorAsociado_insert);

// Or, you can use the `Promise` API.
registrarProveedor(registrarProveedorVars).then((response) => {
  const data = response.data;
  console.log(data.proveedorAsociado_insert);
});
```

### Using `RegistrarProveedor`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registrarProveedorRef, RegistrarProveedorVariables } from '@hotmart-srm/data';

// The `RegistrarProveedor` mutation requires an argument of type `RegistrarProveedorVariables`:
const registrarProveedorVars: RegistrarProveedorVariables = {
  razonSocial: ..., 
  tipoSocio: ..., 
  emailContacto: ..., 
};

// Call the `registrarProveedorRef()` function to get a reference to the mutation.
const ref = registrarProveedorRef(registrarProveedorVars);
// Variables can be defined inline as well.
const ref = registrarProveedorRef({ razonSocial: ..., tipoSocio: ..., emailContacto: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registrarProveedorRef(dataConnect, registrarProveedorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.proveedorAsociado_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.proveedorAsociado_insert);
});
```

## RegistrarBeneficio
You can execute the `RegistrarBeneficio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
registrarBeneficio(vars: RegistrarBeneficioVariables): MutationPromise<RegistrarBeneficioData, RegistrarBeneficioVariables>;

interface RegistrarBeneficioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarBeneficioVariables): MutationRef<RegistrarBeneficioData, RegistrarBeneficioVariables>;
}
export const registrarBeneficioRef: RegistrarBeneficioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registrarBeneficio(dc: DataConnect, vars: RegistrarBeneficioVariables): MutationPromise<RegistrarBeneficioData, RegistrarBeneficioVariables>;

interface RegistrarBeneficioRef {
  ...
  (dc: DataConnect, vars: RegistrarBeneficioVariables): MutationRef<RegistrarBeneficioData, RegistrarBeneficioVariables>;
}
export const registrarBeneficioRef: RegistrarBeneficioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registrarBeneficioRef:
```typescript
const name = registrarBeneficioRef.operationName;
console.log(name);
```

### Variables
The `RegistrarBeneficio` mutation requires an argument of type `RegistrarBeneficioVariables`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RegistrarBeneficioVariables {
  nombreBeneficio: string;
  categoria: string;
  valorEconomico: number;
  costoPuntosGamificacion: number;
  proveedorId: UUIDString;
}
```
### Return Type
Recall that executing the `RegistrarBeneficio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegistrarBeneficioData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegistrarBeneficioData {
  beneficioCatalogo_insert: BeneficioCatalogo_Key;
}
```
### Using `RegistrarBeneficio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registrarBeneficio, RegistrarBeneficioVariables } from '@hotmart-srm/data';

// The `RegistrarBeneficio` mutation requires an argument of type `RegistrarBeneficioVariables`:
const registrarBeneficioVars: RegistrarBeneficioVariables = {
  nombreBeneficio: ..., 
  categoria: ..., 
  valorEconomico: ..., 
  costoPuntosGamificacion: ..., 
  proveedorId: ..., 
};

// Call the `registrarBeneficio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registrarBeneficio(registrarBeneficioVars);
// Variables can be defined inline as well.
const { data } = await registrarBeneficio({ nombreBeneficio: ..., categoria: ..., valorEconomico: ..., costoPuntosGamificacion: ..., proveedorId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registrarBeneficio(dataConnect, registrarBeneficioVars);

console.log(data.beneficioCatalogo_insert);

// Or, you can use the `Promise` API.
registrarBeneficio(registrarBeneficioVars).then((response) => {
  const data = response.data;
  console.log(data.beneficioCatalogo_insert);
});
```

### Using `RegistrarBeneficio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registrarBeneficioRef, RegistrarBeneficioVariables } from '@hotmart-srm/data';

// The `RegistrarBeneficio` mutation requires an argument of type `RegistrarBeneficioVariables`:
const registrarBeneficioVars: RegistrarBeneficioVariables = {
  nombreBeneficio: ..., 
  categoria: ..., 
  valorEconomico: ..., 
  costoPuntosGamificacion: ..., 
  proveedorId: ..., 
};

// Call the `registrarBeneficioRef()` function to get a reference to the mutation.
const ref = registrarBeneficioRef(registrarBeneficioVars);
// Variables can be defined inline as well.
const ref = registrarBeneficioRef({ nombreBeneficio: ..., categoria: ..., valorEconomico: ..., costoPuntosGamificacion: ..., proveedorId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registrarBeneficioRef(dataConnect, registrarBeneficioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.beneficioCatalogo_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.beneficioCatalogo_insert);
});
```

## EliminarBeneficio
You can execute the `EliminarBeneficio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
eliminarBeneficio(vars: EliminarBeneficioVariables): MutationPromise<EliminarBeneficioData, EliminarBeneficioVariables>;

interface EliminarBeneficioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarBeneficioVariables): MutationRef<EliminarBeneficioData, EliminarBeneficioVariables>;
}
export const eliminarBeneficioRef: EliminarBeneficioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarBeneficio(dc: DataConnect, vars: EliminarBeneficioVariables): MutationPromise<EliminarBeneficioData, EliminarBeneficioVariables>;

interface EliminarBeneficioRef {
  ...
  (dc: DataConnect, vars: EliminarBeneficioVariables): MutationRef<EliminarBeneficioData, EliminarBeneficioVariables>;
}
export const eliminarBeneficioRef: EliminarBeneficioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarBeneficioRef:
```typescript
const name = eliminarBeneficioRef.operationName;
console.log(name);
```

### Variables
The `EliminarBeneficio` mutation requires an argument of type `EliminarBeneficioVariables`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarBeneficioVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarBeneficio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarBeneficioData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarBeneficioData {
  beneficioCatalogo_delete?: BeneficioCatalogo_Key | null;
}
```
### Using `EliminarBeneficio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarBeneficio, EliminarBeneficioVariables } from '@hotmart-srm/data';

// The `EliminarBeneficio` mutation requires an argument of type `EliminarBeneficioVariables`:
const eliminarBeneficioVars: EliminarBeneficioVariables = {
  id: ..., 
};

// Call the `eliminarBeneficio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarBeneficio(eliminarBeneficioVars);
// Variables can be defined inline as well.
const { data } = await eliminarBeneficio({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarBeneficio(dataConnect, eliminarBeneficioVars);

console.log(data.beneficioCatalogo_delete);

// Or, you can use the `Promise` API.
eliminarBeneficio(eliminarBeneficioVars).then((response) => {
  const data = response.data;
  console.log(data.beneficioCatalogo_delete);
});
```

### Using `EliminarBeneficio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarBeneficioRef, EliminarBeneficioVariables } from '@hotmart-srm/data';

// The `EliminarBeneficio` mutation requires an argument of type `EliminarBeneficioVariables`:
const eliminarBeneficioVars: EliminarBeneficioVariables = {
  id: ..., 
};

// Call the `eliminarBeneficioRef()` function to get a reference to the mutation.
const ref = eliminarBeneficioRef(eliminarBeneficioVars);
// Variables can be defined inline as well.
const ref = eliminarBeneficioRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarBeneficioRef(dataConnect, eliminarBeneficioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.beneficioCatalogo_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.beneficioCatalogo_delete);
});
```

## EliminarProveedor
You can execute the `EliminarProveedor` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data/index.d.ts](./index.d.ts):
```typescript
eliminarProveedor(vars: EliminarProveedorVariables): MutationPromise<EliminarProveedorData, EliminarProveedorVariables>;

interface EliminarProveedorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarProveedorVariables): MutationRef<EliminarProveedorData, EliminarProveedorVariables>;
}
export const eliminarProveedorRef: EliminarProveedorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarProveedor(dc: DataConnect, vars: EliminarProveedorVariables): MutationPromise<EliminarProveedorData, EliminarProveedorVariables>;

interface EliminarProveedorRef {
  ...
  (dc: DataConnect, vars: EliminarProveedorVariables): MutationRef<EliminarProveedorData, EliminarProveedorVariables>;
}
export const eliminarProveedorRef: EliminarProveedorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarProveedorRef:
```typescript
const name = eliminarProveedorRef.operationName;
console.log(name);
```

### Variables
The `EliminarProveedor` mutation requires an argument of type `EliminarProveedorVariables`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarProveedorVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarProveedor` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarProveedorData`, which is defined in [data/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarProveedorData {
  proveedorAsociado_delete?: ProveedorAsociado_Key | null;
}
```
### Using `EliminarProveedor`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarProveedor, EliminarProveedorVariables } from '@hotmart-srm/data';

// The `EliminarProveedor` mutation requires an argument of type `EliminarProveedorVariables`:
const eliminarProveedorVars: EliminarProveedorVariables = {
  id: ..., 
};

// Call the `eliminarProveedor()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarProveedor(eliminarProveedorVars);
// Variables can be defined inline as well.
const { data } = await eliminarProveedor({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarProveedor(dataConnect, eliminarProveedorVars);

console.log(data.proveedorAsociado_delete);

// Or, you can use the `Promise` API.
eliminarProveedor(eliminarProveedorVars).then((response) => {
  const data = response.data;
  console.log(data.proveedorAsociado_delete);
});
```

### Using `EliminarProveedor`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarProveedorRef, EliminarProveedorVariables } from '@hotmart-srm/data';

// The `EliminarProveedor` mutation requires an argument of type `EliminarProveedorVariables`:
const eliminarProveedorVars: EliminarProveedorVariables = {
  id: ..., 
};

// Call the `eliminarProveedorRef()` function to get a reference to the mutation.
const ref = eliminarProveedorRef(eliminarProveedorVars);
// Variables can be defined inline as well.
const ref = eliminarProveedorRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarProveedorRef(dataConnect, eliminarProveedorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.proveedorAsociado_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.proveedorAsociado_delete);
});
```

