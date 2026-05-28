import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface BeneficioCatalogo_Key {
  id: UUIDString;
  __typename?: 'BeneficioCatalogo_Key';
}

export interface EliminarBeneficioData {
  beneficioCatalogo_delete?: BeneficioCatalogo_Key | null;
}

export interface EliminarBeneficioVariables {
  id: UUIDString;
}

export interface EliminarProveedorData {
  proveedorAsociado_delete?: ProveedorAsociado_Key | null;
}

export interface EliminarProveedorVariables {
  id: UUIDString;
}

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

export interface ListarProveedoresData {
  proveedorAsociados: ({
    id: UUIDString;
    razonSocial: string;
    tipoSocio: string;
    emailContacto: string;
  } & ProveedorAsociado_Key)[];
}

export interface ProveedorAsociado_Key {
  id: UUIDString;
  __typename?: 'ProveedorAsociado_Key';
}

export interface RegistrarBeneficioData {
  beneficioCatalogo_insert: BeneficioCatalogo_Key;
}

export interface RegistrarBeneficioVariables {
  nombreBeneficio: string;
  categoria: string;
  valorEconomico: number;
  costoPuntosGamificacion: number;
  proveedorId: UUIDString;
}

export interface RegistrarProveedorData {
  proveedorAsociado_insert: ProveedorAsociado_Key;
}

export interface RegistrarProveedorVariables {
  razonSocial: string;
  tipoSocio: string;
  emailContacto: string;
}

interface RegistrarProveedorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarProveedorVariables): MutationRef<RegistrarProveedorData, RegistrarProveedorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RegistrarProveedorVariables): MutationRef<RegistrarProveedorData, RegistrarProveedorVariables>;
  operationName: string;
}
export const registrarProveedorRef: RegistrarProveedorRef;

export function registrarProveedor(vars: RegistrarProveedorVariables): MutationPromise<RegistrarProveedorData, RegistrarProveedorVariables>;
export function registrarProveedor(dc: DataConnect, vars: RegistrarProveedorVariables): MutationPromise<RegistrarProveedorData, RegistrarProveedorVariables>;

interface RegistrarBeneficioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarBeneficioVariables): MutationRef<RegistrarBeneficioData, RegistrarBeneficioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RegistrarBeneficioVariables): MutationRef<RegistrarBeneficioData, RegistrarBeneficioVariables>;
  operationName: string;
}
export const registrarBeneficioRef: RegistrarBeneficioRef;

export function registrarBeneficio(vars: RegistrarBeneficioVariables): MutationPromise<RegistrarBeneficioData, RegistrarBeneficioVariables>;
export function registrarBeneficio(dc: DataConnect, vars: RegistrarBeneficioVariables): MutationPromise<RegistrarBeneficioData, RegistrarBeneficioVariables>;

interface EliminarBeneficioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarBeneficioVariables): MutationRef<EliminarBeneficioData, EliminarBeneficioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarBeneficioVariables): MutationRef<EliminarBeneficioData, EliminarBeneficioVariables>;
  operationName: string;
}
export const eliminarBeneficioRef: EliminarBeneficioRef;

export function eliminarBeneficio(vars: EliminarBeneficioVariables): MutationPromise<EliminarBeneficioData, EliminarBeneficioVariables>;
export function eliminarBeneficio(dc: DataConnect, vars: EliminarBeneficioVariables): MutationPromise<EliminarBeneficioData, EliminarBeneficioVariables>;

interface EliminarProveedorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarProveedorVariables): MutationRef<EliminarProveedorData, EliminarProveedorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarProveedorVariables): MutationRef<EliminarProveedorData, EliminarProveedorVariables>;
  operationName: string;
}
export const eliminarProveedorRef: EliminarProveedorRef;

export function eliminarProveedor(vars: EliminarProveedorVariables): MutationPromise<EliminarProveedorData, EliminarProveedorVariables>;
export function eliminarProveedor(dc: DataConnect, vars: EliminarProveedorVariables): MutationPromise<EliminarProveedorData, EliminarProveedorVariables>;

interface ListarProveedoresRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarProveedoresData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarProveedoresData, undefined>;
  operationName: string;
}
export const listarProveedoresRef: ListarProveedoresRef;

export function listarProveedores(options?: ExecuteQueryOptions): QueryPromise<ListarProveedoresData, undefined>;
export function listarProveedores(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarProveedoresData, undefined>;

interface ListarBeneficiosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarBeneficiosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarBeneficiosData, undefined>;
  operationName: string;
}
export const listarBeneficiosRef: ListarBeneficiosRef;

export function listarBeneficios(options?: ExecuteQueryOptions): QueryPromise<ListarBeneficiosData, undefined>;
export function listarBeneficios(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarBeneficiosData, undefined>;

