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
// store trust records.
export let trustRecords = new PersistentVector<TrustRecord>("r");
// store trust ranking. 
export let trustRanking = new PersistentMap<string, i32>("c");
