import test from "node:test";
import assert from "node:assert/strict";
import {auditPackageFiles} from "../main.js";
test("reports manifest-only dependencies",()=>{const result=auditPackageFiles({dependencies:{a:"^1.0.0"}},{lockfileVersion:3,packages:{"":{dependencies:{}}}});assert.equal(result[0].code,"manifest-only");});
test("reports mismatched ranges",()=>{const result=auditPackageFiles({devDependencies:{vite:"^5"}},{lockfileVersion:3,packages:{"":{devDependencies:{vite:"^4"}}}});assert.equal(result[0].code,"range-mismatch");});
test("warns for legacy lockfiles",()=>{const result=auditPackageFiles({dependencies:{}},{lockfileVersion:1});assert.equal(result[0].code,"legacy-lockfile");});
