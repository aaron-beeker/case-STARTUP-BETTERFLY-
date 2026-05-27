const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'srm-connector',
  service: 'startup-homart-service',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const registrarProductorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegistrarProductor', inputVars);
}
registrarProductorRef.operationName = 'RegistrarProductor';
exports.registrarProductorRef = registrarProductorRef;

exports.registrarProductor = function registrarProductor(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registrarProductorRef(dcInstance, inputVars));
}
;

const registrarProductoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegistrarProducto', inputVars);
}
registrarProductoRef.operationName = 'RegistrarProducto';
exports.registrarProductoRef = registrarProductoRef;

exports.registrarProducto = function registrarProducto(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registrarProductoRef(dcInstance, inputVars));
}
;

const eliminarProductoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarProducto', inputVars);
}
eliminarProductoRef.operationName = 'EliminarProducto';
exports.eliminarProductoRef = eliminarProductoRef;

exports.eliminarProducto = function eliminarProducto(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarProductoRef(dcInstance, inputVars));
}
;

const eliminarProductorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarProductor', inputVars);
}
eliminarProductorRef.operationName = 'EliminarProductor';
exports.eliminarProductorRef = eliminarProductorRef;

exports.eliminarProductor = function eliminarProductor(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarProductorRef(dcInstance, inputVars));
}
;

const listarProductoresRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarProductores');
}
listarProductoresRef.operationName = 'ListarProductores';
exports.listarProductoresRef = listarProductoresRef;

exports.listarProductores = function listarProductores(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarProductoresRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listarProductosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarProductos');
}
listarProductosRef.operationName = 'ListarProductos';
exports.listarProductosRef = listarProductosRef;

exports.listarProductos = function listarProductos(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarProductosRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;
