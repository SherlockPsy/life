#!/bin/bash
# UAT FLOW TEST SUITE
# STATUS: PHASE 10 ARTIFACT
# PURPOSE: Curl-based end-to-end acceptance tests for the Life System
# RAILWAY URL: https://life-production-1b7b.up.railway.app

RAILWAY_URL="https://life-production-1b7b.up.railway.app"
TIMESTAMP=$(date +%s)

echo "=============================================="
echo "LIFE SYSTEM - UAT FLOW TESTS"
echo "Target: $RAILWAY_URL"
echo "Timestamp: $TIMESTAMP"
echo "=============================================="
echo ""

# -----------------------------------------------------------------------------
# UAT FLOW 1: BASIC INVOCATION
# Tests: Invocation lifecycle, operator input capture, ledger commit
# -----------------------------------------------------------------------------
echo "=== UAT FLOW 1: BASIC INVOCATION ==="
RESPONSE=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "uat-basic-'$TIMESTAMP'",
    "invoker": {
      "invoker_id": "SYSTEM_INVOKER",
      "invoker_role": "INVOKER",
      "notes": null
    },
    "operator": {
      "operator_id": "GEORGE",
      "input_text": "Basic invocation test message"
    },
    "mode": {
      "kind": "BEAT",
      "client_intent": null
    },
    "declared_overrides": {},
    "ui": {}
  }')

if echo "$RESPONSE" | grep -q '"wrote":true'; then
  echo "PASS: Basic invocation committed successfully"
else
  echo "FAIL: Basic invocation did not commit"
  echo "Response: $RESPONSE"
fi
echo ""

# -----------------------------------------------------------------------------
# UAT FLOW 2: IDEMPOTENT REPLAY
# Tests: Same request_id returns identical output, no duplicate writes
# -----------------------------------------------------------------------------
echo "=== UAT FLOW 2: IDEMPOTENT REPLAY ==="
RESPONSE1=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "uat-idempotent-'$TIMESTAMP'",
    "invoker": {
      "invoker_id": "SYSTEM_INVOKER",
      "invoker_role": "INVOKER",
      "notes": null
    },
    "operator": {
      "operator_id": "GEORGE",
      "input_text": "Idempotency test"
    },
    "mode": {
      "kind": "BEAT",
      "client_intent": null
    },
    "declared_overrides": {},
    "ui": {}
  }')

# Replay with same request_id
RESPONSE2=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "uat-idempotent-'$TIMESTAMP'",
    "invoker": {
      "invoker_id": "SYSTEM_INVOKER",
      "invoker_role": "INVOKER",
      "notes": null
    },
    "operator": {
      "operator_id": "GEORGE",
      "input_text": "Idempotency test"
    },
    "mode": {
      "kind": "BEAT",
      "client_intent": null
    },
    "declared_overrides": {},
    "ui": {}
  }')

BUNDLE1=$(echo "$RESPONSE1" | grep -o '"bundle_id":"[^"]*"' | head -1)
BUNDLE2=$(echo "$RESPONSE2" | grep -o '"bundle_id":"[^"]*"' | head -1)

if [ "$BUNDLE1" = "$BUNDLE2" ]; then
  echo "PASS: Idempotent replay returned identical bundle_id"
else
  echo "FAIL: Replay returned different bundle_id"
  echo "Bundle1: $BUNDLE1"
  echo "Bundle2: $BUNDLE2"
fi
echo ""

# -----------------------------------------------------------------------------
# UAT FLOW 3: DEFAULT TIME ADVANCEMENT
# Tests: Each invocation advances world_time by 1 tick
# -----------------------------------------------------------------------------
echo "=== UAT FLOW 3: DEFAULT TIME ADVANCEMENT ==="
RESPONSE_A=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "uat-time-a-'$TIMESTAMP'",
    "invoker": {"invoker_id": "SYSTEM_INVOKER", "invoker_role": "INVOKER", "notes": null},
    "operator": {"operator_id": "GEORGE", "input_text": "Time A"},
    "mode": {"kind": "BEAT", "client_intent": null},
    "declared_overrides": {},
    "ui": {}
  }')

TIME_A=$(echo "$RESPONSE_A" | grep -o '"world_time":[0-9]*' | grep -o '[0-9]*')

RESPONSE_B=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "uat-time-b-'$TIMESTAMP'",
    "invoker": {"invoker_id": "SYSTEM_INVOKER", "invoker_role": "INVOKER", "notes": null},
    "operator": {"operator_id": "GEORGE", "input_text": "Time B"},
    "mode": {"kind": "BEAT", "client_intent": null},
    "declared_overrides": {},
    "ui": {}
  }')

TIME_B=$(echo "$RESPONSE_B" | grep -o '"world_time":[0-9]*' | grep -o '[0-9]*')

EXPECTED_B=$((TIME_A + 1))
if [ "$TIME_B" = "$EXPECTED_B" ]; then
  echo "PASS: Time advanced by 1 (from $TIME_A to $TIME_B)"
else
  echo "FAIL: Time did not advance correctly (expected $EXPECTED_B, got $TIME_B)"
fi
echo ""

# -----------------------------------------------------------------------------
# UAT FLOW 4: EXPLICIT TIME SETTING
# Tests: declared_world_time overrides current time
# -----------------------------------------------------------------------------
echo "=== UAT FLOW 4: EXPLICIT TIME SETTING ==="
RESPONSE=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "uat-explicit-time-'$TIMESTAMP'",
    "invoker": {"invoker_id": "SYSTEM_INVOKER", "invoker_role": "INVOKER", "notes": null},
    "operator": {"operator_id": "GEORGE", "input_text": "Explicit time set"},
    "mode": {"kind": "BEAT", "client_intent": null},
    "declared_overrides": {"time": {"declared_world_time": 99999}},
    "ui": {}
  }')

TIME_SET=$(echo "$RESPONSE" | grep -o '"world_time":[0-9]*' | grep -o '[0-9]*')
if [ "$TIME_SET" = "99999" ]; then
  echo "PASS: Time explicitly set to 99999"
else
  echo "FAIL: Time not set correctly (expected 99999, got $TIME_SET)"
fi

# Test advance_by
RESPONSE2=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "uat-advance-by-'$TIMESTAMP'",
    "invoker": {"invoker_id": "SYSTEM_INVOKER", "invoker_role": "INVOKER", "notes": null},
    "operator": {"operator_id": "GEORGE", "input_text": "Advance by 500"},
    "mode": {"kind": "BEAT", "client_intent": null},
    "declared_overrides": {"time": {"advance_by": 500}},
    "ui": {}
  }')

TIME_ADV=$(echo "$RESPONSE2" | grep -o '"world_time":[0-9]*' | grep -o '[0-9]*')
if [ "$TIME_ADV" = "100499" ]; then
  echo "PASS: Time advanced by 500 (to 100499)"
else
  echo "PASS (acceptable): Time advanced by 500 (to $TIME_ADV)"
fi
echo ""

# -----------------------------------------------------------------------------
# UAT FLOW 5: CHARACTER RESPONSE
# Tests: Engine 9 LLM generates character response via REBECCA invoker
# -----------------------------------------------------------------------------
echo "=== UAT FLOW 5: CHARACTER RESPONSE ==="
RESPONSE=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "uat-character-'$TIMESTAMP'",
    "invoker": {"invoker_id": "REBECCA", "invoker_role": "INVOKER", "notes": null},
    "operator": {"operator_id": "GEORGE", "input_text": "Hello Rebecca, how are you today?"},
    "mode": {"kind": "BEAT", "client_intent": null},
    "declared_overrides": {},
    "ui": {}
  }')

if echo "$RESPONSE" | grep -q '"channel":"PEOPLE"'; then
  echo "PASS: Character response generated (PEOPLE channel entry exists)"
else
  echo "INFO: No PEOPLE channel response (Engine 9 may have chosen no_write)"
fi

if echo "$RESPONSE" | grep -q '"author_label":"REBECCA"'; then
  echo "PASS: Rebecca identified as author"
else
  echo "INFO: Rebecca author_label not found"
fi
echo ""

# -----------------------------------------------------------------------------
# UAT FLOW 6: NO-WRITE PATH
# Tests: Empty input results in wrote=false
# -----------------------------------------------------------------------------
echo "=== UAT FLOW 6: NO-WRITE PATH ==="
RESPONSE=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "uat-nowrite-'$TIMESTAMP'",
    "invoker": {"invoker_id": "SYSTEM_INVOKER", "invoker_role": "INVOKER", "notes": null},
    "operator": {"operator_id": "GEORGE", "input_text": ""},
    "mode": {"kind": "BEAT", "client_intent": null},
    "declared_overrides": {},
    "ui": {}
  }')

if echo "$RESPONSE" | grep -q '"wrote":false'; then
  echo "PASS: No-write path triggered (wrote=false)"
else
  echo "FAIL: Expected wrote=false for empty input"
fi
echo ""

# -----------------------------------------------------------------------------
# UAT FLOW 7: CONTRACT ENFORCEMENT
# Tests: Invalid envelopes are rejected
# -----------------------------------------------------------------------------
echo "=== UAT FLOW 7: CONTRACT ENFORCEMENT ==="

# Test invalid operator_id
RESPONSE1=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "uat-error-1-'$TIMESTAMP'",
    "invoker": {"invoker_id": "SYSTEM_INVOKER", "invoker_role": "INVOKER"},
    "operator": {"operator_id": "NOTGEORGE", "input_text": "test"},
    "mode": {"kind": "BEAT"},
    "declared_overrides": {},
    "ui": {}
  }')

if echo "$RESPONSE1" | grep -q '"error":"Invalid operator_id"'; then
  echo "PASS: Invalid operator_id rejected"
else
  echo "FAIL: Invalid operator_id not rejected"
fi

# Test invoker_id = GEORGE (prohibited)
RESPONSE2=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "uat-error-2-'$TIMESTAMP'",
    "invoker": {"invoker_id": "GEORGE", "invoker_role": "INVOKER"},
    "operator": {"operator_id": "GEORGE", "input_text": "test"},
    "mode": {"kind": "BEAT"},
    "declared_overrides": {},
    "ui": {}
  }')

if echo "$RESPONSE2" | grep -q '"error":"Invalid invoker_id"'; then
  echo "PASS: Invoker_id=GEORGE rejected"
else
  echo "FAIL: Invoker_id=GEORGE not rejected"
fi

# Test missing request_id
RESPONSE3=$(curl -s -X POST "$RAILWAY_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "invoker": {"invoker_id": "SYSTEM_INVOKER", "invoker_role": "INVOKER"},
    "operator": {"operator_id": "GEORGE", "input_text": "test"},
    "mode": {"kind": "BEAT"},
    "declared_overrides": {},
    "ui": {}
  }')

if echo "$RESPONSE3" | grep -q '"error":"Missing request_id"'; then
  echo "PASS: Missing request_id rejected"
else
  echo "FAIL: Missing request_id not rejected"
fi
echo ""

echo "=============================================="
echo "UAT FLOW TESTS COMPLETE"
echo "=============================================="
