import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface DigitalProduct_Key {
  id: UUIDString;
  __typename?: 'DigitalProduct_Key';
}

export interface EliminarProductoData {
  digitalProduct_delete?: DigitalProduct_Key | null;
}

export interface EliminarProductoVariables {
  id: UUIDString;
}

export interface EliminarProductorData {
  producer_delete?: Producer_Key | null;
}

export interface EliminarProductorVariables {
  id: UUIDString;
}

export interface ListarProductoresData {
  producers: ({
    id: UUIDString;
    fullName: string;
    contactEmail: string;
    bankAccount: string;
  } & Producer_Key)[];
}

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

export interface Producer_Key {
  id: UUIDString;
  __typename?: 'Producer_Key';
}

export interface RegistrarProductoData {
  digitalProduct_insert: DigitalProduct_Key;
}

export interface RegistrarProductoVariables {
  title: string;
  format: string;
  niche: string;
  basePrice: number;
  affiliateCommission: number;
  producerId: UUIDString;
}

export interface RegistrarProductorData {
  producer_insert: Producer_Key;
}

export interface RegistrarProductorVariables {
  fullName: string;
  contactEmail: string;
  bankAccount: string;
}

interface RegistrarProductorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarProductorVariables): MutationRef<RegistrarProductorData, RegistrarProductorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RegistrarProductorVariables): MutationRef<RegistrarProductorData, RegistrarProductorVariables>;
  operationName: string;
}
export const registrarProductorRef: RegistrarProductorRef;

export function registrarProductor(vars: RegistrarProductorVariables): MutationPromise<RegistrarProductorData, RegistrarProductorVariables>;
export function registrarProductor(dc: DataConnect, vars: RegistrarProductorVariables): MutationPromise<RegistrarProductorData, RegistrarProductorVariables>;

interface RegistrarProductoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarProductoVariables): MutationRef<RegistrarProductoData, RegistrarProductoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RegistrarProductoVariables): MutationRef<RegistrarProductoData, RegistrarProductoVariables>;
  operationName: string;
}
export const registrarProductoRef: RegistrarProductoRef;

export function registrarProducto(vars: RegistrarProductoVariables): MutationPromise<RegistrarProductoData, RegistrarProductoVariables>;
export function registrarProducto(dc: DataConnect, vars: RegistrarProductoVariables): MutationPromise<RegistrarProductoData, RegistrarProductoVariables>;

interface EliminarProductoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarProductoVariables): MutationRef<EliminarProductoData, EliminarProductoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarProductoVariables): MutationRef<EliminarProductoData, EliminarProductoVariables>;
  operationName: string;
}
export const eliminarProductoRef: EliminarProductoRef;

export function eliminarProducto(vars: EliminarProductoVariables): MutationPromise<EliminarProductoData, EliminarProductoVariables>;
export function eliminarProducto(dc: DataConnect, vars: EliminarProductoVariables): MutationPromise<EliminarProductoData, EliminarProductoVariables>;

interface EliminarProductorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarProductorVariables): MutationRef<EliminarProductorData, EliminarProductorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarProductorVariables): MutationRef<EliminarProductorData, EliminarProductorVariables>;
  operationName: string;
}
export const eliminarProductorRef: EliminarProductorRef;

export function eliminarProductor(vars: EliminarProductorVariables): MutationPromise<EliminarProductorData, EliminarProductorVariables>;
export function eliminarProductor(dc: DataConnect, vars: EliminarProductorVariables): MutationPromise<EliminarProductorData, EliminarProductorVariables>;

interface ListarProductoresRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarProductoresData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarProductoresData, undefined>;
  operationName: string;
}
export const listarProductoresRef: ListarProductoresRef;

export function listarProductores(options?: ExecuteQueryOptions): QueryPromise<ListarProductoresData, undefined>;
export function listarProductores(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarProductoresData, undefined>;

interface ListarProductosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarProductosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarProductosData, undefined>;
  operationName: string;
}
export const listarProductosRef: ListarProductosRef;

export function listarProductos(options?: ExecuteQueryOptions): QueryPromise<ListarProductosData, undefined>;
export function listarProductos(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarProductosData, undefined>;

