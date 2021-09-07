import { context, PersistentVector, PersistentMap, PersistentUnorderedMap } from "near-sdk-as";

@nearBindgen
export class TrustRecord {
  trust: boolean;
  accountId: string;
  comment: string;
  relatedTx: string;
  sender: string;
  constructor(_trust: boolean, _accountId: string, _comment: string, _relatedTx: string, _sender: string) {
    this.trust = _trust;
    this.comment = _comment;
    this.relatedTx = _relatedTx;
    this.accountId = _accountId;
    this.sender = _sender;
  }
}

@nearBindgen
export class TrustCounters {
  trustCount: i32;
  mistrustCount: i32;
  constructor(_trustCount: i32, _missTrustCount: i32) {
    this.trustCount = _trustCount;
    this.mistrustCount = _missTrustCount;
  }
}

// store trust records.
export let trustRecords = new PersistentVector<TrustRecord>("r");
// store number of trusted and mistrusted records of a given account 
export let trustCounter = new PersistentUnorderedMap<string, TrustCounters>("t");
