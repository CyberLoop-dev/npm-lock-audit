import {readFile} from "node:fs/promises";

export function auditPackageFiles(pkg, lock) {
  const findings = [];
  if (!pkg || typeof pkg !== "object") return [{level:"error",code:"invalid-package-json",message:"package.json must contain an object."}];
  if (!lock || typeof lock !== "object") return [{level:"error",code:"invalid-lockfile",message:"package-lock.json must contain an object."}];
  if (!Number.isInteger(lock.lockfileVersion)) findings.push({level:"warning",code:"missing-lockfile-version",message:"Lockfile version is missing."});
  if (pkg.name && lock.name && pkg.name !== lock.name) findings.push({level:"warning",code:"name-mismatch",message:"Package names differ."});
  if (pkg.version && lock.version && pkg.version !== lock.version) findings.push({level:"warning",code:"version-mismatch",message:"Package versions differ."});
  const root = lock.packages?.[""];
  if (!root) {
    findings.push({level:"warning",code:"legacy-lockfile",message:"No packages[\"\"] root entry; dependency declarations cannot be compared exactly."});
    return findings;
  }
  for (const group of ["dependencies","devDependencies","optionalDependencies"]) {
    const declared = pkg[group] || {};
    const locked = root[group] || {};
    for (const name of new Set([...Object.keys(declared),...Object.keys(locked)])) {
      if (!(name in declared)) findings.push({level:"error",code:"lock-only",group,name,message:"Present in lockfile root but absent from package.json."});
      else if (!(name in locked)) findings.push({level:"error",code:"manifest-only",group,name,message:"Declared in package.json but absent from lockfile root."});
      else if (declared[name] !== locked[name]) findings.push({level:"error",code:"range-mismatch",group,name,message:"Version range differs between manifest and lockfile root."});
    }
  }
  return findings;
}
async function main() {
  const [pkgPath="package.json",lockPath="package-lock.json"] = process.argv.slice(2);
  try {
    const [pkg,lock] = await Promise.all([readFile(pkgPath,"utf8"),readFile(lockPath,"utf8")]);
    const findings = auditPackageFiles(JSON.parse(pkg),JSON.parse(lock));
    if (findings.length) {
      for (const item of findings) console.log("[" + item.level + "] " + item.code + ": " + item.message);
      process.exitCode = findings.some(item=>item.level==="error") ? 1 : 0;
    } else console.log("package.json and package-lock.json root declarations are consistent.");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 2;
  }
}
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replaceAll("\\","/"))) main();
