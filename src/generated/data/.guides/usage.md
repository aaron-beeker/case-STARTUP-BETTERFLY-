# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { registrarProveedor, registrarBeneficio, eliminarBeneficio, eliminarProveedor, listarProveedores, listarBeneficios } from '@hotmart-srm/data';


// Operation RegistrarProveedor:  For variables, look at type RegistrarProveedorVars in ../index.d.ts
const { data } = await RegistrarProveedor(dataConnect, registrarProveedorVars);

// Operation RegistrarBeneficio:  For variables, look at type RegistrarBeneficioVars in ../index.d.ts
const { data } = await RegistrarBeneficio(dataConnect, registrarBeneficioVars);

// Operation EliminarBeneficio:  For variables, look at type EliminarBeneficioVars in ../index.d.ts
const { data } = await EliminarBeneficio(dataConnect, eliminarBeneficioVars);

// Operation EliminarProveedor:  For variables, look at type EliminarProveedorVars in ../index.d.ts
const { data } = await EliminarProveedor(dataConnect, eliminarProveedorVars);

// Operation ListarProveedores: 
const { data } = await ListarProveedores(dataConnect);

// Operation ListarBeneficios: 
const { data } = await ListarBeneficios(dataConnect);


```