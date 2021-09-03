import { Context, logging, ReceiptIndex } from "near-sdk-as";
import { trustedCounter, mistrustedCounter, trustRecords, TrustRecord, TrustCounters } from "./model";

// Obtener el nivel de confianza de un usuario
export function getConfianza(accountId: string): TrustCounters | null {
  if (trustedCounter.contains(accountId) && mistrustedCounter.contains(accountId)) {
    const trustCount = trustedCounter.getSome(accountId);
    const mistrustCount = mistrustedCounter.getSome(accountId)
    const trustCounters = new TrustCounters(trustCount, mistrustCount);
    return trustCounters;
  }
  return null;
}

// Obtener los confiantes de un usuario. [Aquellos en los que confian en el usuario] 
export function getConfiantes(accountId: string) : Array<TrustRecord> {
  assert(trustedCounter.contains(accountId), "la cuenta no existe en los registros")
  const result = new Array<TrustRecord>();
  for(let i = 0; i < trustRecords.length; i++) {
    if (trustRecords[i].accountId == accountId && trustRecords[i].trust) {
      result.push(trustRecords[i]);
    }
  }
  return result;
}

// Obtener los confidentes de un usuario. [Aquellos en los que el usuario confia] 
export function getConfidentes(accountId: string) : Array<TrustRecord> {
  const result = new Array<TrustRecord>();
  for(let i = 0; i < trustRecords.length; i++) {
    if (trustRecords[i].sender == accountId && trustRecords[i].trust) {
      result.push(trustRecords[i]);
    }
  }
  return result;
}

// Obtener mis confiantes. [Aquellos en los que confian en mi]
export function getMisConfiantes() : Array<TrustRecord> {
  const accountId = Context.sender;
  assert(trustedCounter.contains(accountId), "no tienes registros de confianza")
  const result = new Array<TrustRecord>();
  for(let i = 0; i < trustRecords.length; i++) {
    if (trustRecords[i].accountId == accountId && trustRecords[i].trust) {
      result.push(trustRecords[i]);
    }
  }
  return result;
}

// Obtener mis confidentes. [Aquellos en los que yo confio] 
export function getMisConfidentes() : Array<TrustRecord> {
  const accountId = Context.sender;
  logging.log(`sender ${Context.sender}`);
  const result = new Array<TrustRecord>();
  for(let i = 0; i < trustRecords.length; i++) {
    if (trustRecords[i].sender == accountId && trustRecords[i].trust) {
      result.push(trustRecords[i]);
    }
  }
  return result;
}

// Confiar.
export function confiar(accountId: string, comment: string, relatedTx: string): TrustCounters {
  const record = new TrustRecord(true, accountId, comment, relatedTx);
  trustRecords.push(record);
  if (trustedCounter.contains(accountId)) {
    const trustCount = trustedCounter.getSome(accountId);
    trustedCounter.set(accountId, trustCount + 1);
  } else {
    trustedCounter.set(accountId, 1);
  }
  // inicializar contador de desconfianza si no existe registro aun
  if (!mistrustedCounter.contains(accountId)) {
    mistrustedCounter.set(accountId, 0);
  }
  const trustCount = trustedCounter.getSome(accountId);
  const mistrustCount = mistrustedCounter.getSome(accountId)
  const trustCounters = new TrustCounters(trustCount, mistrustCount);
  return trustCounters;
}

// Desconfiar
export function desconfiar(accountId: string, comment: string, relatedTx: string): TrustCounters {
  const record = new TrustRecord(false, accountId, comment, relatedTx);
  trustRecords.push(record);
  if (mistrustedCounter.contains(accountId)) {
    const mistrustCount = mistrustedCounter.getSome(accountId);
    mistrustedCounter.set(accountId, mistrustCount + 1);
  } else {
    mistrustedCounter.set(accountId, 1);
  }
  // inicializar contador de confianza si no existe registro aun
  if (!trustedCounter.contains(accountId)) {
    trustedCounter.set(accountId, 0);
  }
  const trustCount = trustedCounter.getSome(accountId);
  const mistrustCount = mistrustedCounter.getSome(accountId)
  const trustCounters = new TrustCounters(trustCount, mistrustCount);
  return trustCounters;
}

export function getAllRecords(): Array<TrustRecord> {
  const result = new Array<TrustRecord>();
  for(let i = 0; i < trustRecords.length; i++) {
      result.push(trustRecords[i]);
  }
  return result;
}