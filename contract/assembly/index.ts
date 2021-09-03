import { Context, logging, ReceiptIndex } from "near-sdk-as";
import { trustRanking, trustRecords, TrustRecord } from "./model";

// Obtener el nivel de confianza de un usuario
export function getConfianza(accountId: string): number | null {
  if (trustRanking.contains(accountId)){
    return <i32>trustRanking.get(accountId);
  }
  return 0;
}

// Obtener los confiantes de un usuario
export function getConfiantes(accountId: string) : Array<TrustRecord> {
  const result = new Array<TrustRecord>();
  for(let i = 0; i < trustRecords.length; i++) {
    if (trustRecords[i].accountId === accountId && trustRecords[i].trust) {
      result.push(trustRecords[i]);
    }
  }
  return result;
}

// Obtener los confidentes de un usuario
export function getConfidentes(accountId: string) : Array<TrustRecord> {
  const result = new Array<TrustRecord>();
  for(let i = 0; i < trustRecords.length; i++) {
    if (trustRecords[i].sender === accountId && trustRecords[i].trust) {
      result.push(trustRecords[i]);
    }
  }
  return result;
}

// Obtener mis confiantes
export function getMisConfiantes() : Array<TrustRecord> {
  const accountId = Context.sender;
  const result = new Array<TrustRecord>();
  for(let i = 0; i < trustRecords.length; i++) {
    if (trustRecords[i].accountId === accountId && trustRecords[i].trust) {
      result.push(trustRecords[i]);
    }
  }
  return result;
}

// Obtener mis confidentes
export function getMisConfidentes() : Array<TrustRecord> {
  const accountId = Context.sender;
  const result = new Array<TrustRecord>();
  for(let i = 0; i < trustRecords.length; i++) {
    if (trustRecords[i].sender === accountId && trustRecords[i].trust) {
      result.push(trustRecords[i]);
    }
  }
  return result;
}

// Confiar
export function confiar(accountId: string, comment: string, relatedTx: string): number {
  const record = new TrustRecord(true, accountId, comment, relatedTx);
  trustRecords.push(record);
  if (trustRanking.contains(accountId)) {
    const currentRanking = trustRanking.getSome(accountId);
    trustRanking.set(accountId, currentRanking + 1);
  } else {
    trustRanking.set(accountId, 1);
  }
  return trustRanking.getSome(accountId);
}

// Desconfiar
export function desconfiar(accountId: string, comment: string, relatedTx: string): void {
  const record = new TrustRecord(false, accountId, comment, relatedTx);
  trustRecords.push(record);
  if (trustRanking.contains(accountId)) {
    const currentRanking = trustRanking.getSome(accountId);
    trustRanking.set(accountId, currentRanking - 1);
  } else {
    trustRanking.set(accountId, -1);
  }
}