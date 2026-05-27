# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { registrarProductor, registrarProducto, eliminarProducto, eliminarProductor, listarProductores, listarProductos } from '@hotmart-srm/data';


// Operation RegistrarProductor:  For variables, look at type RegistrarProductorVars in ../index.d.ts
const { data } = await RegistrarProductor(dataConnect, registrarProductorVars);

// Operation RegistrarProducto:  For variables, look at type RegistrarProductoVars in ../index.d.ts
const { data } = await RegistrarProducto(dataConnect, registrarProductoVars);

// Operation EliminarProducto:  For variables, look at type EliminarProductoVars in ../index.d.ts
const { data } = await EliminarProducto(dataConnect, eliminarProductoVars);

// Operation EliminarProductor:  For variables, look at type EliminarProductorVars in ../index.d.ts
const { data } = await EliminarProductor(dataConnect, eliminarProductorVars);

// Operation ListarProductores: 
const { data } = await ListarProductores(dataConnect);

// Operation ListarProductos: 
const { data } = await ListarProductos(dataConnect);


```