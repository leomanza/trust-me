import {
  getConfianza,
  confiar,
  desconfiar,
  getConfiantes,
  getConfidentes,
  getTopTrusted,
  getBottomTrusted,
  getMisConfiantes,
  getMisConfidentes,
} from "../index";
import {
  TrustCounters,
  TrustRecord,
  trustRecords,
  trustCounter,
} from "../model";
import { Context } from "near-sdk-as";
function initializeRecords(): void {
  trustRecords.push(new TrustRecord(true, "user1.near", "a comment", "tx", "user2.near"));
  trustRecords.push(new TrustRecord(true, "user1.near", "a comment", "tx", "user3.near"));
  trustRecords.push(new TrustRecord(false, "user1.near", "a comment", "tx", "user4.near"));
  trustRecords.push(new TrustRecord(true, "user2.near", "a comment", "tx", "user1.near"));
  trustRecords.push(new TrustRecord(true, "user2.near", "a comment", "tx", "user3.near"));
  trustRecords.push(new TrustRecord(true, "user2.near", "a comment", "tx", "user4.near"));
  trustRecords.push(new TrustRecord(false, "user3.near", "a comment", "tx", "user2.near"));
  trustRecords.push(new TrustRecord(true, "user4.near", "a comment", "tx", "user1.near"));
  trustRecords.push(new TrustRecord(false, "user4.near", "a comment", "tx", "user2.near"));
  trustRecords.push(new TrustRecord(true, "user5.near", "a comment", "tx", "user1.near"));
  trustRecords.push(new TrustRecord(true, "user5.near", "a comment", "tx", "user3.near"));
  trustCounter.set("user1.near", new TrustCounters(2, 1));
  trustCounter.set("user2.near", new TrustCounters(3, 0));
  trustCounter.set("user3.near", new TrustCounters(0, 1));
  trustCounter.set("user4.near", new TrustCounters(1, 1));
  trustCounter.set("user5.near", new TrustCounters(2, 0));
}

describe("getConfianza", () => {
  it("should return null if no record found", () => {
    const result = getConfianza("user.near");
    expect(result).toBeNull;
  });
  it("should return trust/misstrust count", () => {
    confiar("user.near", "a comment", "tx");
    const result = <TrustCounters>getConfianza("user.near");
    expect(result.trustCount).toBe(1);
    expect(result.mistrustCount).toBe(0);
  });
});

describe("confiar", () => {
  it("should add trustRecord and increase trust count", () => {
    confiar("user.near", "a comment", "tx");
    expect(trustRecords.length).toBe(1);
    expect(trustRecords[0].sender).toBe(Context.sender);
    expect(trustRecords[0].accountId).toBe("user.near");
    expect(trustRecords[0].comment).toBe("a comment");
    expect(trustRecords[0].relatedTx).toBe("tx");
    expect(trustRecords[0].trust).toBeTruthy();
    expect(trustCounter.getSome("user.near").trustCount).toBe(1);
    expect(trustCounter.getSome("user.near").mistrustCount).toBe(0);
  });
});

describe("desconfiar", () => {
  it("should add trustRecord and increase misstrust count", () => {
    desconfiar("user.near", "a comment", "tx");
    expect(trustRecords.length).toBe(1);
    expect(trustRecords[0].sender).toBe(Context.sender);
    expect(trustRecords[0].accountId).toBe("user.near");
    expect(trustRecords[0].comment).toBe("a comment");
    expect(trustRecords[0].relatedTx).toBe("tx");
    expect(trustRecords[0].trust).toBeFalsy();
    expect(trustCounter.getSome("user.near").mistrustCount).toBe(1);
    expect(trustCounter.getSome("user.near").trustCount).toBe(0);
  });
});

describe("getConfiantes", () => {
  it("should fail if no records found for the accountId", () => {
    expect(() => {
      getConfiantes("user.near");
    }).toThrow();
  });
  it("should return a trust record", () => {
    confiar("user.near", "a comment", "tx");
    const result = getConfiantes("user.near");
    expect(result.length).toBe(1);
    expect(result[0].accountId).toBe("user.near");
    expect(result[0].comment).toBe("a comment");
    expect(result[0].relatedTx).toBe("tx");
    expect(result[0].sender).toBe(Context.sender);
    expect(result[0].trust).toBeTruthy();
  });
});

describe("getConfidentes", () => {
  it("should fail if no records found", () => {
    expect(() => {
      getConfidentes("user.near");
    }).toThrow();
  });
  it("should return a trust record", () => {
    const record = new TrustRecord(
      true,
      "user.near",
      "a comment",
      "tx",
      "user2.near"
    );
    trustRecords.push(record);
    trustCounter.set("user.near", new TrustCounters(1, 0));
    const result = getConfidentes("user2.near");
    expect(result.length).toBe(1);
    expect(result[0].accountId).toBe("user.near");
    expect(result[0].comment).toBe("a comment");
    expect(result[0].relatedTx).toBe("tx");
    expect(result[0].sender).toBe("user2.near");
    expect(result[0].trust).toBeTruthy();
  });
});

describe("getMisConfiantes", () => {
  it("should fail if no records found for the accountId", () => {
    expect(() => {
      getMisConfiantes();
    }).toThrow();
  });
  it("should return a trust record", () => {
    const record = new TrustRecord(
      true,
      Context.sender,
      "a comment",
      "tx",
      "user2.near"
    );
    trustRecords.push(record);
    trustCounter.set(Context.sender, new TrustCounters(1, 0));
    const result = getMisConfiantes();
    expect(result.length).toBe(1);
    expect(result[0].accountId).toBe(Context.sender);
    expect(result[0].comment).toBe("a comment");
    expect(result[0].relatedTx).toBe("tx");
    expect(result[0].sender).toBe("user2.near");
    expect(result[0].trust).toBeTruthy();
  });
});

describe("getMisConfidentes", () => {
  it("should fail if no records found", () => {
    expect(() => {
      getMisConfidentes();
    }).toThrow();
  });
  it("should return a trust record", () => {
    const record = new TrustRecord(
      true,
      "user.near",
      "a comment",
      "tx",
      Context.sender
    );
    trustRecords.push(record);
    trustCounter.set("user.near", new TrustCounters(1, 0));
    const result = getMisConfidentes();
    expect(result.length).toBe(1);
    expect(result[0].accountId).toBe("user.near");
    expect(result[0].comment).toBe("a comment");
    expect(result[0].relatedTx).toBe("tx");
    expect(result[0].sender).toBe(Context.sender);
    expect(result[0].trust).toBeTruthy();
  });
});

describe("getTopTrusted", () => {
  it("should fail if no records found", () => {
    expect(() => {
      getTopTrusted(1);
    }).toThrow();
  });
  it("should return 2 top rated accounts", () => {
    initializeRecords();
    const result = getTopTrusted(2);
    expect(result.length).toBe(2);
    expect(result[0].key).toBe('user2.near');
    expect(result[1].key).toBe('user5.near');
  });
  it("should return 5 top rated accounts", () => {
    initializeRecords();
    const result = getTopTrusted(5);
    expect(result.length).toBe(5);
    expect(result[0].key).toBe('user2.near');
    expect(result[1].key).toBe('user5.near');
    expect(result[2].key).toBe('user1.near');
    expect(result[3].key).toBe('user4.near');
    expect(result[4].key).toBe('user3.near');
  });
});

describe("getBottomTrusted", () => {
  it("should fail if no records found", () => {
    expect(() => {
      getBottomTrusted(1);
    }).toThrow();
  });
  it("should return 2 bottom rated accounts", () => {
    initializeRecords();
    const result = getBottomTrusted(2);
    expect(result.length).toBe(2);
    expect(result[0].key).toBe('user3.near');
    expect(result[1].key).toBe('user4.near');
  });
  it("should return 5 bottom rated accounts", () => {
    initializeRecords();
    const result = getBottomTrusted(5);
    expect(result.length).toBe(5);
    expect(result[0].key).toBe('user3.near');
    expect(result[1].key).toBe('user4.near');
    expect(result[2].key).toBe('user1.near');
    expect(result[3].key).toBe('user5.near');
    expect(result[4].key).toBe('user2.near');
  });
});
