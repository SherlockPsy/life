const fs = require('fs');
const path = require('path');

const CHARACTERS_ROOT = path.join(__dirname, '../characters');
const ARCHETYPES_ROOT = path.join(CHARACTERS_ROOT, 'archetypes');

/**
 * Loads character payload files for a given agent ID.
 * Returns a dictionary of filename -> content.
 * Returns null if no payloads found or directory missing.
 * 
 * GUARANTEES:
 * - Read-only access.
 * - No side effects.
 * - Graceful failure (removability).
 */
function loadCharacterPayload(agentId) {
    if (!agentId) return null;
    
    // Normalize and sanitize
    const safeId = agentId.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    const charDir = path.join(CHARACTERS_ROOT, safeId);

    if (!fs.existsSync(charDir)) {
        return null;
    }

    const payloads = {};
    try {
        // DETERMINISTIC ORDERING: Sort files alphabetically
        const files = fs.readdirSync(charDir).sort();
        
        for (const file of files) {
            // RESTRICTION: Only load .md files. JSON is reserved for archetypes.
            if (file.endsWith('.md')) {
                const filePath = path.join(charDir, file);
                // Ensure it is a file, not a directory
                if (fs.statSync(filePath).isFile()) {
                    const content = fs.readFileSync(filePath, 'utf8');
                    payloads[file] = content;
                }
            }
        }
    } catch (err) {
        // Log but do not crash. This ensures removability.
        console.warn(`[CHARACTER_LOADER] Could not load payloads for ${safeId}:`, err.message);
        return null;
    }

    if (Object.keys(payloads).length === 0) {
        return null;
    }

    return payloads;
}

/**
 * Loads a specific archetype definition.
 * Archetypes are semantic substrates, not agents.
 */
function loadArchetype(archetypeName) {
    if (!archetypeName) return null;

    const safeName = archetypeName.toUpperCase().replace(/[^A-Z0-9_]/g, '');
    const filePath = path.join(ARCHETYPES_ROOT, `${safeName}.json`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.warn(`[CHARACTER_LOADER] Could not load archetype ${safeName}:`, err.message);
        return null;
    }
}

module.exports = {
    loadCharacterPayload,
    loadArchetype
};
