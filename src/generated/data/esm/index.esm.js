import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'srm-connector',
  service: 'startup-homart-service',
  location: 'us-east4'
};
export const registrarProductorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegistrarProductor', inputVars);
}
registrarProductorRef.operationName = 'RegistrarProductor';

export function registrarProductor(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registrarProductorRef(dcInstance, inputVars));
}

export const registrarProductoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegistrarProducto', inputVars);
}
registrarProductoRef.operationName = 'RegistrarProducto';

export function registrarProducto(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registrarProductoRef(dcInstance, inputVars));
}

export const eliminarProductoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarProducto', inputVars);
}
eliminarProductoRef.operationName = 'EliminarProducto';

export function eliminarProducto(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarProductoRef(dcInstance, inputVars));
}

export const eliminarProductorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarProductor', inputVars);
}
eliminarProductorRef.operationName = 'EliminarProductor';

export function eliminarProductor(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarProductorRef(dcInstance, inputVars));
}

export const listarProductoresRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarProductores');
}
listarProductoresRef.operationName = 'ListarProductores';

export function listarProductores(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarProductoresRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listarProductosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarProductos');
}
listarProductosRef.operationName = 'ListarProductos';

export function listarProductos(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarProductosRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

