import { Context, logging, ReceiptIndex, MapEntry } from "near-sdk-as";
import { trustCounter, trustRecords, TrustRecord, TrustCounters } from "./model";

// Obtener el nivel de confianza de un usuario
export function getConfianza(accountId: string): TrustCounters | null {
  if (trustCounter.contains(accountId)) {
    return trustCounter.getSome(accountId);
  }
  return null;
}

// Obtener los confiantes de un usuario. [Aquellos en los que confian en el usuario] 
export function getConfiantes(accountId: string) : Array<TrustRecord> {
  assert(trustCounter.contains(accountId), "la cuenta no existe en los registros")
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
  assert(trustRecords.length > 0, "no existen registros");
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
  assert(trustCounter.contains(accountId), "no tienes registros de confianza")
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
  assert(trustRecords.length > 0, "no existen registros");
  const accountId = Context.sender;
  const result = new Array<TrustRecord>();
  for(let i = 0; i < trustRecords.length; i++) {
    if (trustRecords[i].sender == accountId && trustRecords[i].trust) {
      result.push(trustRecords[i]);
    }
  }
  return result;
}

// Registrar confianza. Retorna cantidad de registros de confianza y cantidad de registros de desconfianza del usuario. 
export function confiar(accountId: string, comment: string, relatedTx: string): TrustCounters {
  const record = new TrustRecord(true, accountId, comment, relatedTx, Context.sender);
  trustRecords.push(record);
  if (trustCounter.contains(accountId)) {
    const accountTrust = trustCounter.getSome(accountId);
    accountTrust.trustCount = accountTrust.trustCount + 1;
    trustCounter.set(accountId, accountTrust);
  } else {
    trustCounter.set(accountId, new TrustCounters(1,0));
  }
  
  return trustCounter.getSome(accountId);
}

// Registrar desconfianza. Retorna cantidad de registros de confianza y cantidad de registros de desconfianza del usuario. 
export function desconfiar(accountId: string, comment: string, relatedTx: string): TrustCounters {
  const record = new TrustRecord(false, accountId, comment, relatedTx, Context.sender);
  trustRecords.push(record);
  if (trustCounter.contains(accountId)) {
    const accountTrust = trustCounter.getSome(accountId);
    accountTrust.mistrustCount = accountTrust.mistrustCount + 1;
    trustCounter.set(accountId, accountTrust);
  } else {
    trustCounter.set(accountId, new TrustCounters(0,1));
  }
  
  return trustCounter.getSome(accountId);
}

export function getAllRecords(): Array<TrustRecord> {
  const result = new Array<TrustRecord>();
  for(let i = 0; i < trustRecords.length; i++) {
      result.push(trustRecords[i]);
  }
  return result;
}

export function getTopTrusted(limit: i32): Array<MapEntry<string, TrustCounters>> {
  assert(trustRecords.length > 0, "no existen registros");
  const values = trustCounter.entries().sort((a, b) => 
    { 
      if (a.value.trustCount - a.value.mistrustCount > b.value.trustCount - b.value.mistrustCount) return -1;
      if (a.value.trustCount - a.value.mistrustCount < b.value.trustCount - b.value.mistrustCount) return 1;
      return 0;
    });
  return values.slice(0, limit);
}

export function getBottomTrusted(limit: i32): Array<MapEntry<string, TrustCounters>> {
  assert(trustRecords.length > 0, "no existen registros");
  const values = trustCounter.entries().sort((a, b) => 
    {  
      if (a.value.trustCount - a.value.mistrustCount > b.value.trustCount - b.value.mistrustCount) return 1;
      if (a.value.trustCount - a.value.mistrustCount < b.value.trustCount - b.value.mistrustCount) return -1;
      return 0;
     });
  return values.slice(0, limit);
}