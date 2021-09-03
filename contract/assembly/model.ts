import { context, PersistentVector, PersistentMap } from "near-sdk-as";

@nearBindgen
export class TrustRecord {
  trust: boolean;
  accountId: string;
  comment: string;
  relatedTx: string;
  sender: string;
  constructor(_trust: boolean, _accountId: string, _comment: string, _relatedTx: string) {
    this.trust = _trust;
    this.comment = _comment;
    this.relatedTx = _relatedTx;
    this.accountId = _accountId;
    this.sender = context.sender;
  }
}

@nearBindgen
export class TrustCounters {
  trustCount: number;
  mistrustCount: number;
  constructor(_trustCount: number, _missTrustCount: number) {
    this.trustCount = _trustCount;
    this.mistrustCount = _missTrustCount;
  }
}
// store trust records.
export let trustRecords = new PersistentVector<TrustRecord>("r");
// store number of trusted records. 
export let trustedCounter = new PersistentMap<string, i32>("t");
// store number of mistrusted records.
export let mistrustedCounter = new PersistentMap<string, i32>("m");
