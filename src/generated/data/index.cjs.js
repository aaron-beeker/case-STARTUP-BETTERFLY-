const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'srm-connector',
  service: 'startup-homart-service',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const registrarProveedorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegistrarProveedor', inputVars);
}
registrarProveedorRef.operationName = 'RegistrarProveedor';
exports.registrarProveedorRef = registrarProveedorRef;

exports.registrarProveedor = function registrarProveedor(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registrarProveedorRef(dcInstance, inputVars));
}
;

const registrarBeneficioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegistrarBeneficio', inputVars);
}
registrarBeneficioRef.operationName = 'RegistrarBeneficio';
exports.registrarBeneficioRef = registrarBeneficioRef;

exports.registrarBeneficio = function registrarBeneficio(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registrarBeneficioRef(dcInstance, inputVars));
}
;

const eliminarBeneficioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarBeneficio', inputVars);
}
eliminarBeneficioRef.operationName = 'EliminarBeneficio';
exports.eliminarBeneficioRef = eliminarBeneficioRef;

exports.eliminarBeneficio = function eliminarBeneficio(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarBeneficioRef(dcInstance, inputVars));
}
;

const eliminarProveedorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarProveedor', inputVars);
}
eliminarProveedorRef.operationName = 'EliminarProveedor';
exports.eliminarProveedorRef = eliminarProveedorRef;

exports.eliminarProveedor = function eliminarProveedor(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarProveedorRef(dcInstance, inputVars));
}
;

const listarProveedoresRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarProveedores');
}
listarProveedoresRef.operationName = 'ListarProveedores';
exports.listarProveedoresRef = listarProveedoresRef;

exports.listarProveedores = function listarProveedores(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarProveedoresRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listarBeneficiosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarBeneficios');
}
listarBeneficiosRef.operationName = 'ListarBeneficios';
exports.listarBeneficiosRef = listarBeneficiosRef;

exports.listarBeneficios = function listarBeneficios(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarBeneficiosRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
