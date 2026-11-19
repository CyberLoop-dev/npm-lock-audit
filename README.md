<p align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0f766e&height=170&section=header&text=NPM%20Lock%20Audit&fontColor=ffffff&fontSize=34" alt="NPM Lock Audit banner"/></p>
<p align="center"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=19&duration=2800&pause=900&center=true&vCenter=true&width=620&lines=Check+npm+lockfile+consistency;Find+stale+dependency+declarations;No+network+requests" alt="Typing title"/></p>
<p align="center"><img src="https://img.shields.io/github/license/CyberLoop-dev/npm-lock-audit?style=flat-square"/> <img src="https://img.shields.io/github/languages/top/CyberLoop-dev/npm-lock-audit?style=flat-square"/> <img src="https://img.shields.io/github/stars/CyberLoop-dev/npm-lock-audit?style=flat-square"/> <img src="https://img.shields.io/github/last-commit/CyberLoop-dev/npm-lock-audit?style=flat-square"/></p>
<p align="center"><img src="assets/mark.svg" width="520" alt="Two package manifests connected by a consistency check"/></p>

## 🧭 Overview
NPM Lock Audit compares dependency groups in `package.json` with the root package metadata in `package-lock.json`. It is read-only and works entirely with local files.

## ✨ Features
- 📦 Compare dependencies, devDependencies, and optionalDependencies
- 🔍 Detect missing or mismatched root lockfile declarations
- ⚠️ Explain when a legacy lockfile cannot be compared fully
- 🔒 No package installation and no registry access

## 🖥️ Demo
No hosted demo is provided. Run the tool locally using the quick-start command.

## 🚀 Quick Start
Requires Node.js 18 or newer.

```bash
npm start -- ./package.json ./package-lock.json
```

Run checks with `npm test`.

## 🧰 Tech Stack
- Node.js built-in modules
- JSON parsing and Node.js built-in test runner

## 🗂️ Folder Structure
```text
.
├── .github/workflows/ci.yml
├── assets/mark.svg
├── tests/audit.test.js
├── main.js
├── package.json
└── README.md
```

## 🗺️ Roadmap
- [ ] Add support for additional lockfile edge cases
- [ ] Improve machine-readable reports
- [ ] Keep the tool registry-independent

## 🤝 Contributing
Issues and focused pull requests are welcome. Add regression tests when changing comparison behavior.

## 📄 License
MIT License. See [LICENSE](LICENSE).
<p align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f766e,100:0f172a&height=100&section=footer" alt="Animated wave footer"/></p>
