# PROHIBITION TEST SPECIFICATION: Writes & Knowledge
**Scope:** Engine 0 (Ledger) & Engine 4 (Knowledge)

## 1. Prohibition: Partial Writes
**Rule:** A Write Bundle must be atomic. It cannot partially succeed.

**Test Scenario (Internal):**
If Engine 9 (LLM) proposes a bundle with 5 entries, and the 3rd entry is invalid (e.g., missing text):
- **Expected Result:** The ENTIRE bundle is rejected. `wrote` = false.
- **Verification:** Subsequent `ProjectionOutput` shows NONE of the 5 entries.

## 2. Prohibition: Private Leakage
**Rule:** `ProjectionOutput` MUST NOT contain entries with `visibility.scope = PRIVATE` unless the viewer is authorized.

**Test Scenario (Internal):**
1. Commit a PRIVATE entry visible only to "REBECCA".
2. Request Projection for "USER" (Public/George).
3. **Expected Result:** The private entry is ABSENT from `stream.entries`.
