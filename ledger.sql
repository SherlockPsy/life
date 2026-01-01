-- REALITY LEDGER SCHEMA
-- PHASE 4: ATOMICITY & PERSISTENCE
-- AUTHORITY: ENGINE_0_REALITY_LEDGER_ENGINE

-- 1. INVOCATIONS
-- Stores the raw input envelope for idempotency and audit.
-- request_id is the primary key and idempotency token.
CREATE TABLE IF NOT EXISTS invocations (
    request_id TEXT PRIMARY KEY,
    envelope JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. BUNDLES
-- Atomic commit unit.
-- bundle_id is assigned on commit.
CREATE TABLE IF NOT EXISTS bundles (
    request_id TEXT PRIMARY KEY REFERENCES invocations(request_id),
    bundle_id TEXT UNIQUE, -- Nullable if wrote=false
    proposed_by JSONB NOT NULL,
    wrote BOOLEAN NOT NULL,
    rejection JSONB NOT NULL,
    committed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ENTRIES
-- The atomic units of reality.
-- entry_id is assigned on commit.
CREATE TABLE IF NOT EXISTS entries (
    entry_id TEXT PRIMARY KEY,
    bundle_id TEXT NOT NULL REFERENCES bundles(bundle_id),
    request_id TEXT NOT NULL REFERENCES invocations(request_id),
    created_at_world TEXT NOT NULL,
    author JSONB NOT NULL,
    visibility JSONB NOT NULL,
    channel TEXT NOT NULL,
    text TEXT NOT NULL,
    -- Ordering is implicit by serial ID or committed_at, but we rely on bundle atomicity.
    -- We add a sequence for strict ordering if needed, but bundle_id + array index in bundle is usually enough.
    -- Let's add a global serial for absolute ordering.
    sequence_id BIGSERIAL
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_entries_request_id ON entries(request_id);
CREATE INDEX IF NOT EXISTS idx_bundles_request_id ON bundles(request_id);
CREATE INDEX IF NOT EXISTS idx_entries_sequence_id ON entries(sequence_id);

-- COMMENTS
COMMENT ON TABLE invocations IS 'Registry of all incoming requests for idempotency.';
COMMENT ON TABLE bundles IS 'Atomic commit units. Either all entries exist or none.';
COMMENT ON TABLE entries IS 'The append-only log of reality.';
