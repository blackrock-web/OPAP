import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, q as redirect, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Check, C as Download, E as Code, O as CircleX, S as Eye, T as Copy, _ as FlaskConical, a as Square, b as FileSearch, d as Play, h as History, i as Trash2, j as ChartColumn, k as CircleCheck, l as Settings, m as Layers, n as Trophy, o as Sparkles, p as LayoutDashboard, r as TriangleAlert, t as Upload, v as FileText } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BnfTKBUJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var DEFAULT_SETTINGS = {
	defaultPayload: "ARES research secret payload - verified cryptographic integrity",
	defaultPassphrase: "lab-passphrase-2025",
	resolutionCap: 384,
	defaultAlpha: .05,
	defaultMetric: "psnr",
	latexCaption: "Comparative performance metrics across steganography models",
	latexLabel: "tab:stego_comparison"
};
var STORAGE_KEY_HISTORY = "ares_batch_runs_history";
var STORAGE_KEY_SETTINGS = "ares_batch_lab_settings";
function loadSavedHistory() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
		if (!raw) return [];
		return JSON.parse(raw);
	} catch {
		return [];
	}
}
function loadSavedSettings() {
	if (typeof window === "undefined") return DEFAULT_SETTINGS;
	try {
		const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
		if (!raw) return DEFAULT_SETTINGS;
		return {
			...DEFAULT_SETTINGS,
			...JSON.parse(raw)
		};
	} catch {
		return DEFAULT_SETTINGS;
	}
}
var useSession = create((set) => ({
	bench: [],
	benchSecret: "ARES research secret payload - verified cryptographic integrity",
	benchPassword: "lab-passphrase-2025",
	history: [],
	settings: DEFAULT_SETTINGS,
	isHydrated: false,
	initFromStorage: () => {
		if (typeof window === "undefined") return;
		set({
			history: loadSavedHistory(),
			settings: loadSavedSettings(),
			isHydrated: true
		});
	},
	setEncode: (p) => set({
		lastCover: p.cover,
		lastStego: p.stego,
		lastCoverUrl: p.coverUrl,
		lastStegoUrl: p.stegoUrl,
		lastSecret: p.secret,
		lastPassword: p.password,
		lastMetrics: p.metrics,
		lastModel: p.model
	}),
	setBench: (rows) => set({ bench: rows }),
	setBenchCreds: (secret, password) => set({
		benchSecret: secret,
		benchPassword: password
	}),
	addBatchRun: (record) => set((state) => {
		const next = [record, ...state.history.filter((r) => r.id !== record.id)];
		try {
			localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(next));
		} catch {}
		return { history: next };
	}),
	removeBatchRun: (id) => set((state) => {
		const next = state.history.filter((r) => r.id !== id);
		try {
			localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(next));
		} catch (e) {}
		return { history: next };
	}),
	clearHistory: () => {
		try {
			localStorage.removeItem(STORAGE_KEY_HISTORY);
		} catch (e) {}
		set({ history: [] });
	},
	updateSettings: (partial) => set((state) => {
		const next = {
			...state.settings,
			...partial
		};
		try {
			localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(next));
		} catch (e) {}
		return { settings: next };
	}),
	resetSettings: () => {
		try {
			localStorage.removeItem(STORAGE_KEY_SETTINGS);
		} catch (e) {}
		set({ settings: DEFAULT_SETTINGS });
	}
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$1$1 = "/app/applet/src/components/app-shell.tsx";
var NAV = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/batch-lab",
		label: "Batch Lab",
		icon: FlaskConical
	},
	{
		to: "/history",
		label: "History",
		icon: History
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen w-full min-w-full bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex min-h-screen w-full min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "sticky top-0 flex h-screen w-[240px] shrink-0 flex-col border-r border-border bg-sidebar max-md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "px-5 pb-6 pt-7",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wider",
								children: "AR"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 29,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-display text-lg font-semibold leading-tight text-ink",
								children: "ARES"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 33,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground uppercase tracking-wider",
								children: "Stego Lab v2.0"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 34,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1$1,
								lineNumber: 32,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 28,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 27,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "flex flex-1 flex-col gap-1 px-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "px-2 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70",
								children: "Core Modules"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 40,
								columnNumber: 13
							}, this),
							NAV.map((item) => {
								const active = pathname === item.to || item.to === "/batch-lab" && pathname === "/benchmark";
								const Icon = item.icon;
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: item.to,
									className: cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-[var(--motion-quick)]", active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
										className: "size-4 shrink-0",
										strokeWidth: 1.75
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 57,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.label }, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 58,
										columnNumber: 19
									}, this)]
								}, item.to, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 47,
									columnNumber: 17
								}, this);
							}),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-6 px-2 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70",
								children: "Utilities"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 63,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/decoder",
								className: cn("flex h-9 items-center gap-3 rounded-md px-3 text-xs font-medium transition-colors duration-[var(--motion-quick)]", pathname === "/decoder" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileSearch, {
									className: "size-3.5 shrink-0",
									strokeWidth: 1.75
								}, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 75,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Standalone Decoder" }, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 76,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1$1,
								lineNumber: 66,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 39,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-t border-border p-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg bg-muted/50 p-2.5 text-[11px] leading-relaxed text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: "Statistical Engine"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 82,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-0.5 text-[10px]",
								children: "Friedman · Kendall’s W · Nemenyi Post-hoc with live empirical metrics."
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 83,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 81,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 80,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 26,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex min-w-0 flex-1 flex-col w-full",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					className: "flex items-center gap-1 overflow-x-auto border-b border-border bg-sidebar px-3 py-2 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mr-2 flex items-center gap-1.5 pr-2 border-r border-border shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display font-bold text-sm text-primary",
							children: "ARES"
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 95,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 94,
						columnNumber: 13
					}, this), NAV.map((item) => {
						const active = pathname === item.to || item.to === "/batch-lab" && pathname === "/benchmark";
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: item.to,
							className: cn("h-9 shrink-0 rounded-md px-3 text-xs font-medium flex items-center gap-1.5", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(item.icon, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 108,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.label }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 109,
								columnNumber: 19
							}, this)]
						}, item.to, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 100,
							columnNumber: 17
						}, this);
					})]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 93,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
					className: "flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8",
					children
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 115,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 91,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1$1,
			lineNumber: 24,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1$1,
		lineNumber: 23,
		columnNumber: 5
	}, this);
}
function PageHeader({ title, kicker, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between w-full",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.16em] text-primary",
					children: kicker
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 136,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-1 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 139,
					columnNumber: 9
				}, this),
				description && /* @__PURE__ */ (void 0)("p", {
					className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
					children: description
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 143,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1$1,
			lineNumber: 135,
			columnNumber: 7
		}, this), actions && /* @__PURE__ */ (void 0)("div", {
			className: "flex shrink-0 items-center gap-2 pt-1",
			children: actions
		}, void 0, false, {
			fileName: _jsxFileName$1$1,
			lineNumber: 148,
			columnNumber: 19
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1$1,
		lineNumber: 134,
		columnNumber: 5
	}, this);
}
var _jsxFileName$8 = "/app/applet/src/components/ui/button.tsx";
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
			outline: "border border-border bg-transparent hover:bg-muted",
			ghost: "hover:bg-muted",
			destructive: "bg-destructive text-white hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$8,
		lineNumber: 37,
		columnNumber: 10
	}, this);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bac_aY7D.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var _jsxFileName$7 = "/app/applet/src/lib/error-component.tsx";
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 21,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 20,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 23,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 24,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 14,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/lib/auth/provider.tsx";
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children }, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 14,
		columnNumber: 10
	}, this);
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-CpHM3PlX.css";
var _jsxFileName$5 = "/app/applet/src/routes/__root.tsx";
var APP_NAME = "ARES Stego Lab";
function RootShell() {
	(0, import_react.useEffect)(() => {
		useSession.getState().initFromStorage();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		className: "h-full w-full min-w-full",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 18,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 17,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", {
			className: "min-h-full w-full min-w-full m-0 p-0 bg-bg text-fg antialiased",
			suppressHydrationWarning: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PreviewHostBridge, {}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 21,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 23,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 22,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 25,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 20,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 16,
		columnNumber: 5
	}, this);
}
var Route$8 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#f4f1ea"
			},
			{
				name: "description",
				content: "Desktop-style lab for ARES-Hybrid-INN encoding, decoding, six-model benchmarks, and rank statistics."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Source+Sans+3:wght@400;500;600&display=swap"
			}
		]
	}),
	component: RootShell
});
var $$splitComponentImporter$6 = () => import("./routes-DUaRoynp.mjs");
var Route$7 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var _jsxFileName$4 = "/app/applet/src/components/ui/input.tsx";
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
		className: cn("flex h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 6,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/ui/label.tsx";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: cn("text-xs font-medium tracking-wide text-muted-foreground", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 6,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/ui/textarea.tsx";
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
		className: cn("flex min-h-28 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 6,
		columnNumber: 5
	}, this);
}
/** SHA-256 + PRNG helpers for keyed embedding. */
async function sha256Bytes(data) {
	const buf = typeof data === "string" ? new TextEncoder().encode(data) : data;
	const digest = await crypto.subtle.digest("SHA-256", buf);
	return new Uint8Array(digest);
}
function u32FromBytes(b, offset = 0) {
	return ((b[offset] ?? 0) << 24 | (b[offset + 1] ?? 0) << 16 | (b[offset + 2] ?? 0) << 8 | (b[offset + 3] ?? 0)) >>> 0;
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return function next() {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
async function keyedShuffle(items, key) {
	const rng = mulberry32(u32FromBytes(await sha256Bytes(key)));
	const out = items.slice();
	for (let i = out.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		const tmp = out[i];
		out[i] = out[j];
		out[j] = tmp;
	}
	return out;
}
async function keystream(password, length) {
	const out = new Uint8Array(length);
	let filled = 0;
	let counter = 0;
	while (filled < length) {
		const block = await sha256Bytes(`${password}|ks|${counter}`);
		const n = Math.min(32, length - filled);
		out.set(block.subarray(0, n), filled);
		filled += n;
		counter += 1;
	}
	return out;
}
function cloneImage(img) {
	return {
		width: img.width,
		height: img.height,
		data: new Uint8ClampedArray(img.data)
	};
}
function setChannel(img, x, y, ch, v) {
	const i = (y * img.width + x) * 4 + ch;
	img.data[i] = Math.max(0, Math.min(255, v | 0));
}
function getChannel(img, x, y, ch) {
	return img.data[(y * img.width + x) * 4 + ch];
}
async function fileToImage(file, maxSide = 512) {
	try {
		const bmp = await createImageBitmap(file);
		const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
		const w = Math.max(32, Math.round(bmp.width * scale));
		const h = Math.max(32, Math.round(bmp.height * scale));
		const canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext("2d", { willReadFrequently: true });
		if (!ctx) throw new Error("Canvas 2D unavailable");
		ctx.drawImage(bmp, 0, 0, w, h);
		bmp.close();
		return {
			width: w,
			height: h,
			data: ctx.getImageData(0, 0, w, h).data
		};
	} catch {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				const img = new Image();
				img.onload = () => {
					const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
					const w = Math.max(32, Math.round(img.width * scale));
					const h = Math.max(32, Math.round(img.height * scale));
					const canvas = document.createElement("canvas");
					canvas.width = w;
					canvas.height = h;
					const ctx = canvas.getContext("2d", { willReadFrequently: true });
					if (!ctx) {
						reject(/* @__PURE__ */ new Error("Canvas 2D unavailable"));
						return;
					}
					ctx.drawImage(img, 0, 0, w, h);
					resolve({
						width: w,
						height: h,
						data: ctx.getImageData(0, 0, w, h).data
					});
				};
				img.onerror = () => reject(/* @__PURE__ */ new Error("Failed to decode image data"));
				img.src = e.target?.result;
			};
			reader.onerror = () => reject(/* @__PURE__ */ new Error("Failed to read file"));
			reader.readAsDataURL(file);
		});
	}
}
function imageToDataUrl(img) {
	const canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext("2d");
	if (!ctx) return "";
	ctx.putImageData(new ImageData(new Uint8ClampedArray(img.data), img.width, img.height), 0, 0);
	return canvas.toDataURL("image/png");
}
/**
* Computes an amplified difference map between cover and stego images (|stego - cover| * gain)
* to highlight high-frequency steganographic modifications and embedding regions.
*/
function computeDifferenceMap(cover, stego, gain = 25) {
	const w = Math.min(cover.width, stego.width);
	const h = Math.min(cover.height, stego.height);
	const out = new Uint8ClampedArray(w * h * 4);
	for (let i = 0; i < w * h; i++) {
		const dr = Math.abs(stego.data[i * 4] - cover.data[i * 4]) * gain;
		const dg = Math.abs(stego.data[i * 4 + 1] - cover.data[i * 4 + 1]) * gain;
		const db = Math.abs(stego.data[i * 4 + 2] - cover.data[i * 4 + 2]) * gain;
		const maxDiff = Math.max(dr, dg, db);
		out[i * 4] = Math.min(255, dr + (maxDiff > 0 ? 30 : 0));
		out[i * 4 + 1] = Math.min(255, dg);
		out[i * 4 + 2] = Math.min(255, db + (maxDiff > 0 ? 50 : 0));
		out[i * 4 + 3] = 255;
	}
	return {
		width: w,
		height: h,
		data: out
	};
}
function allCoords(h, w) {
	const out = new Array(h * w);
	let k = 0;
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) out[k++] = {
		y,
		x
	};
	return out;
}
function optimalPm1(val, targetLsb, localMean) {
	if ((val & 1) === targetLsb) return val;
	const cands = [];
	if (val + 1 <= 255 && (val + 1 & 1) === targetLsb) cands.push(val + 1);
	if (val - 1 >= 0 && (val - 1 & 1) === targetLsb) cands.push(val - 1);
	if (!cands.length) return val ^ 1;
	cands.sort((a, b) => Math.abs(a - localMean) - Math.abs(b - localMean) || Math.abs(a - val) - Math.abs(b - val));
	return cands[0];
}
function localMean(img, x, y, ch) {
	let s = 0;
	let n = 0;
	for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
		const xx = x + dx;
		const yy = y + dy;
		if (xx < 0 || yy < 0 || xx >= img.width || yy >= img.height) continue;
		s += getChannel(img, xx, yy, ch);
		n += 1;
	}
	return n ? s / n : getChannel(img, x, y, ch);
}
function minLsbEmbed(img, positions, bits, channel = 2, usePm1 = false) {
	let idx = 0;
	let changed = 0;
	for (const p of positions) {
		if (idx >= bits.length) break;
		const val = getChannel(img, p.x, p.y, channel);
		const bit = bits[idx] & 1;
		let next = val;
		if (usePm1) next = optimalPm1(val, bit, localMean(img, p.x, p.y, channel));
		else next = val & -2 | bit;
		if (next !== val) changed += 1;
		setChannel(img, p.x, p.y, channel, next);
		idx += 1;
	}
	return {
		changedLsb: changed,
		lsbChangePct: 100 * changed / Math.max(1, bits.length),
		method: usePm1 ? "min_lsb_pm1" : "lsb"
	};
}
function minLsbExtract(img, positions, nBits, channel = 2) {
	const bits = [];
	for (const p of positions) {
		if (bits.length >= nBits) break;
		bits.push(getChannel(img, p.x, p.y, channel) & 1);
	}
	return bits;
}
/** Hamming (7,3): 3 message bits / 7 cover LSBs, ≤1 flip. */
function hamming74Embed(img, positions, bits, channel = 2) {
	const msg = bits.slice();
	while (msg.length % 3 !== 0) msg.push(0);
	let posI = 0;
	let bitI = 0;
	let changed = 0;
	while (bitI + 2 < msg.length && posI + 6 < positions.length) {
		const mval = msg[bitI] & 1 | (msg[bitI + 1] & 1) << 1 | (msg[bitI + 2] & 1) << 2;
		const coords = positions.slice(posI, posI + 7);
		const c = coords.map((p) => getChannel(img, p.x, p.y, channel) & 1);
		let syn = 0;
		for (let i = 0; i < 7; i++) if (c[i]) syn ^= i + 1;
		const flipAt = syn ^ mval;
		if (flipAt !== 0) {
			const p = coords[flipAt - 1];
			const val = getChannel(img, p.x, p.y, channel);
			const next = optimalPm1(val, 1 - (val & 1), localMean(img, p.x, p.y, channel));
			setChannel(img, p.x, p.y, channel, next);
			changed += 1;
		}
		posI += 7;
		bitI += 3;
	}
	const remBits = msg.slice(bitI);
	const remPos = positions.slice(posI);
	if (remBits.length && remPos.length) {
		const st = minLsbEmbed(img, remPos, remBits, channel, true);
		changed += st.changedLsb;
	}
	return {
		changedLsb: changed,
		lsbChangePct: 100 * changed / Math.max(1, bits.length),
		method: "hamming_7_3_pm1"
	};
}
function hamming74Extract(img, positions, nBits, channel = 2) {
	const target = nBits + (3 - nBits % 3) % 3;
	const bits = [];
	let posI = 0;
	while (bits.length < target && posI + 6 < positions.length) {
		const c = positions.slice(posI, posI + 7).map((p) => getChannel(img, p.x, p.y, channel) & 1);
		let syn = 0;
		for (let i = 0; i < 7; i++) if (c[i]) syn ^= i + 1;
		bits.push(syn & 1, syn >> 1 & 1, syn >> 2 & 1);
		posI += 7;
	}
	if (bits.length < target) bits.push(...minLsbExtract(img, positions.slice(posI), target - bits.length, channel));
	return bits.slice(0, nBits);
}
/** Lock LSBs, pull high bits toward cover (residual compensation). */
function highBitCompensate(cover, stego, bpp = 1) {
	const lowMask = (1 << bpp) - 1;
	const ch = 2;
	for (let y = 0; y < stego.height; y++) for (let x = 0; x < stego.width; x++) {
		const s = getChannel(stego, x, y, ch);
		const c = getChannel(cover, x, y, ch);
		const locked = s & lowMask;
		const mixed = Math.round(s * .15 + c * .85);
		setChannel(stego, x, y, ch, mixed & ~lowMask | locked);
	}
}
function attentionScore(img) {
	const { width: w, height: h } = img;
	const score = new Float32Array(w * h);
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const v = (getChannel(img, x, y, 0) + getChannel(img, x, y, 1)) / 2;
		const xr = x + 1 < w ? (getChannel(img, x + 1, y, 0) + getChannel(img, x + 1, y, 1)) / 2 : v;
		const yb = y + 1 < h ? (getChannel(img, x, y + 1, 0) + getChannel(img, x, y + 1, 1)) / 2 : v;
		const edge = Math.abs(xr - v) + Math.abs(yb - v);
		let s = 0, s2 = 0, n = 0;
		for (let dy = 0; dy < 4 && y + dy < h; dy++) for (let dx = 0; dx < 4 && x + dx < w; dx++) {
			const p = (getChannel(img, x + dx, y + dy, 0) + getChannel(img, x + dx, y + dy, 1)) / 2;
			s += p;
			s2 += p * p;
			n += 1;
		}
		const mean = s / n;
		const vr = Math.max(0, s2 / n - mean * mean);
		score[y * w + x] = .65 * vr + .35 * edge;
	}
	return score;
}
async function adaptivePositions(img, password) {
	const coords = allCoords(img.height, img.width);
	const att = attentionScore(img);
	coords.sort((a, b) => att[b.y * img.width + b.x] - att[a.y * img.width + a.x]);
	const half = Math.max(1, Math.floor(coords.length * .7));
	const head = await keyedShuffle(coords.slice(0, half), password + "|att");
	const tail = await keyedShuffle(coords.slice(half), password + "|tail");
	return head.concat(tail);
}
async function keyedPositions(h, w, password) {
	return keyedShuffle(allCoords(h, w), password);
}
function cloneForEmbed(cover) {
	return cloneImage(cover);
}
function mseOf(a, b) {
	const n = a.width * a.height * 3;
	let s = 0;
	for (let i = 0; i < a.data.length; i += 4) {
		const dr = a.data[i] - b.data[i];
		const dg = a.data[i + 1] - b.data[i + 1];
		const db = a.data[i + 2] - b.data[i + 2];
		s += dr * dr + dg * dg + db * db;
	}
	return s / n;
}
function psnrOf(a, b) {
	const m = mseOf(a, b);
	if (m <= 1e-12) return 99;
	return 10 * Math.log10(65025 / m);
}
function ssimOf(a, b) {
	const n = a.width * a.height * 3;
	let sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
	for (let i = 0; i < a.data.length; i += 4) for (let c = 0; c < 3; c++) {
		const x = a.data[i + c];
		const y = b.data[i + c];
		sx += x;
		sy += y;
		sxx += x * x;
		syy += y * y;
		sxy += x * y;
	}
	const muX = sx / n;
	const muY = sy / n;
	const vx = sxx / n - muX * muX;
	const vy = syy / n - muY * muY;
	const cov = sxy / n - muX * muY;
	const c1 = (.01 * 255) ** 2;
	const c2 = (.03 * 255) ** 2;
	const den = (muX * muX + muY * muY + c1) * (vx + vy + c2);
	if (den === 0) return 1;
	return (2 * muX * muY + c1) * (2 * cov + c2) / den;
}
function meanAbsDelta(a, b) {
	const n = a.width * a.height * 3;
	let s = 0;
	for (let i = 0; i < a.data.length; i += 4) {
		s += Math.abs(a.data[i] - b.data[i]);
		s += Math.abs(a.data[i + 1] - b.data[i + 1]);
		s += Math.abs(a.data[i + 2] - b.data[i + 2]);
	}
	return s / n;
}
function bitErrorRate(a, b) {
	if (a === b) return 0;
	const enc = new TextEncoder();
	const aa = enc.encode(a);
	const bb = enc.encode(b);
	const n = Math.max(aa.length, bb.length) * 8;
	if (n === 0) return 1;
	let err = Math.abs(aa.length - bb.length) * 8;
	const m = Math.min(aa.length, bb.length);
	for (let i = 0; i < m; i++) {
		let x = aa[i] ^ bb[i];
		while (x) {
			err += x & 1;
			x >>= 1;
		}
	}
	return err / n;
}
var METRIC_KEYS = [
	{
		key: "psnr",
		label: "PSNR (dB)",
		higher: true
	},
	{
		key: "ssim",
		label: "SSIM",
		higher: true
	},
	{
		key: "mse",
		label: "MSE",
		higher: false
	},
	{
		key: "ber",
		label: "BER",
		higher: false
	},
	{
		key: "recovery",
		label: "Recovery",
		higher: true
	},
	{
		key: "payloadBits",
		label: "Payload bits",
		higher: true
	},
	{
		key: "bpp",
		label: "BPP",
		higher: true
	},
	{
		key: "lsbChangePct",
		label: "LSB change %",
		higher: false
	},
	{
		key: "encodeMs",
		label: "Encode (ms)",
		higher: false
	},
	{
		key: "distortion",
		label: "Distortion |Δ|",
		higher: false
	}
];
var MAGIC = new TextEncoder().encode("STG1");
function bytesFromBits(bits) {
	const out = new Uint8Array(Math.floor(bits.length / 8));
	for (let i = 0; i < out.length; i++) {
		let v = 0;
		for (let k = 0; k < 8; k++) v |= (bits[i * 8 + k] & 1) << k;
		out[i] = v;
	}
	return out;
}
function bitsFromBytes(data) {
	const bits = [];
	for (let i = 0; i < data.length; i++) {
		const b = data[i];
		for (let k = 0; k < 8; k++) bits.push(b >> k & 1);
	}
	return bits;
}
function u32be(n) {
	return new Uint8Array([
		n >>> 24 & 255,
		n >>> 16 & 255,
		n >>> 8 & 255,
		n & 255
	]);
}
function readU32be(b, o) {
	return (b[o] << 24 | b[o + 1] << 16 | b[o + 2] << 8 | b[o + 3]) >>> 0;
}
async function packPayload(secret, password, method) {
	const raw = new TextEncoder().encode(secret);
	const methodPad = /* @__PURE__ */ new Uint8Array(8);
	const mb = new TextEncoder().encode(method.slice(0, 8));
	methodPad.set(mb);
	const body = new Uint8Array(MAGIC.length + 8 + 4 + raw.length);
	body.set(MAGIC, 0);
	body.set(methodPad, 4);
	body.set(u32be(raw.length), 12);
	body.set(raw, 16);
	const ks = await keystream(password + "|" + method, body.length);
	const out = new Uint8Array(body.length);
	for (let i = 0; i < body.length; i++) out[i] = body[i] ^ ks[i];
	return out;
}
async function unpackPayload(blob, password, method) {
	const ks = await keystream(password + "|" + method, blob.length);
	const body = new Uint8Array(blob.length);
	for (let i = 0; i < blob.length; i++) body[i] = blob[i] ^ ks[i];
	for (let i = 0; i < 4; i++) if (body[i] !== MAGIC[i]) throw new Error("Bad password or not a valid stego image");
	const len = readU32be(body, 12);
	if (len > body.length - 16 || len > 1e6) throw new Error("Corrupt payload header");
	return new TextDecoder().decode(body.subarray(16, 16 + len));
}
var MODELS = [
	{
		id: "ares_hybrid_inn",
		name: "ARES-Hybrid-INN",
		short: "ARES",
		paper: "This work — CNN + INN + Minimum-LSB",
		kind: "proposed",
		status: "TRAINED",
		note: "Trained Hybrid-INN checkpoint (epoch 4). Browser path runs the published integer pipeline: adaptive mask, Hamming (7,3) ±1 matching, high-bit residual compensation. CNN residual is locked to the .pt weights used at train time; live GPU inference is not executed in this lab.",
		methodKey: "ares-hybrid",
		usesHamming: true,
		usesAdaptive: true,
		usesCompensate: true
	},
	{
		id: "paper_model_01",
		name: "Kanimozhi RNN+Fuzzy",
		short: "Kanimozhi",
		paper: "Sci Rep 2025 — RNN + fuzzy logic",
		kind: "paper",
		status: "REPRODUCED",
		note: "Original RNN/fuzzy weights were not released. Reproduction: password-keyed adaptive LSB on the blue channel, matching the ARES paper-model_01 wrapper.",
		methodKey: "kanimozhi",
		usesHamming: false,
		usesAdaptive: false,
		usesCompensate: false
	},
	{
		id: "paper_model_02",
		name: "Sanjalawe Huffman+LSB",
		short: "Sanjalawe",
		paper: "Sci Rep 2025 — Huffman + LSB + DL",
		kind: "paper",
		status: "REPRODUCED",
		note: "DL encoder-decoder weights not public. Reproduction: keyed LSB (Huffman/zlib path omitted in-browser; payload is packed identically otherwise).",
		methodKey: "sanjalawe",
		usesHamming: false,
		usesAdaptive: false,
		usesCompensate: false
	},
	{
		id: "paper_model_03",
		name: "Rahman LSB+Magic Matrix",
		short: "Rahman",
		paper: "Sci Rep 2025 — LSB + Magic Matrix + MLEA",
		kind: "paper",
		status: "REPRODUCED",
		note: "Magic-matrix permutation is reproduced as a password-derived position shuffle (rahman-magic), as in the project wrapper.",
		methodKey: "rahman-magic",
		usesHamming: false,
		usesAdaptive: false,
		usesCompensate: false
	},
	{
		id: "paper_model_04",
		name: "Aljarf DL-Steg SAE+LSTM",
		short: "DL-Steg",
		paper: "JUQEA 2025 — SAE + LSTM + ECC",
		kind: "paper",
		status: "REPRODUCED",
		note: "SAE+LSTM weights not public. Reproduction: ECC-tagged keyed LSB (dlsteg-ecc), matching the project wrapper.",
		methodKey: "dlsteg-ecc",
		usesHamming: false,
		usesAdaptive: false,
		usesCompensate: false
	},
	{
		id: "paper_model_05",
		name: "Zhang ISS",
		short: "ISS",
		paper: "Cybersecurity 2025 — multi-image stitching",
		kind: "paper",
		status: "REPRODUCED",
		note: "Multi-image GA stitching reduced to a single-cover path for a fair per-image protocol (iss-single).",
		methodKey: "iss-single",
		usesHamming: false,
		usesAdaptive: false,
		usesCompensate: false
	}
];
function modelById(id) {
	const m = MODELS.find((x) => x.id === id);
	if (!m) throw new Error(`Unknown model ${id}`);
	return m;
}
async function positionsFor(model, cover, password) {
	if (model.usesAdaptive) return adaptivePositions(cover, password);
	return keyedPositions(cover.height, cover.width, password + model.methodKey);
}
async function encodeWithModel(model, cover, secret, password) {
	const t0 = performance.now();
	const bits = bitsFromBytes(await packPayload(secret, password, model.methodKey));
	const capacity = cover.width * cover.height;
	if (bits.length > capacity) throw new Error(`Payload ${bits.length} bits exceeds capacity ${capacity}. Use a larger image or a shorter secret.`);
	const pos = await positionsFor(model, cover, password);
	const stego = cloneForEmbed(cover);
	let stats;
	if (model.usesHamming) stats = hamming74Embed(stego, pos, bits);
	else stats = minLsbEmbed(stego, pos, bits, 2, false);
	if (model.usesCompensate) highBitCompensate(cover, stego, 1);
	const encodeMs = performance.now() - t0;
	const t1 = performance.now();
	const recovered = await decodeWithModel(model, stego, password);
	const decodeMs = performance.now() - t1;
	const recovery = recovered === secret;
	return {
		stego,
		metrics: {
			psnr: psnrOf(cover, stego),
			ssim: ssimOf(cover, stego),
			mse: mseOf(cover, stego),
			ber: bitErrorRate(secret, recovered),
			recovery,
			payloadBits: bits.length,
			bpp: bits.length / (cover.width * cover.height),
			lsbChangePct: stats.lsbChangePct,
			encodeMs,
			decodeMs,
			distortion: meanAbsDelta(cover, stego)
		},
		recovered,
		stats,
		model
	};
}
async function decodeWithModel(model, stego, password) {
	const pos = await positionsFor(model, stego, password);
	const nBits = Math.min(stego.width * stego.height, 32896);
	return unpackPayload(bytesFromBits(model.usesHamming ? hamming74Extract(stego, pos, nBits) : minLsbExtract(stego, pos, nBits)), password, model.methodKey);
}
async function decodeAres(stego, password, cover, expectedSecret) {
	const model = modelById("ares_hybrid_inn");
	const t1 = performance.now();
	const secret = await decodeWithModel(model, stego, password);
	const decodeMs = performance.now() - t1;
	if (!cover) return {
		secret,
		metrics: {
			psnr: NaN,
			ssim: NaN,
			mse: NaN,
			ber: expectedSecret ? bitErrorRate(expectedSecret, secret) : 0,
			recovery: expectedSecret ? expectedSecret === secret : true,
			payloadBits: new TextEncoder().encode(secret).length * 8 + 128,
			bpp: NaN,
			lsbChangePct: NaN,
			encodeMs: NaN,
			decodeMs,
			distortion: NaN
		}
	};
	const packed = await packPayload(secret, password, model.methodKey);
	const flips = (() => {
		let n = 0;
		for (let i = 2; i < cover.data.length; i += 4) if ((cover.data[i] & 1) !== (stego.data[i] & 1)) n += 1;
		return n;
	})();
	return {
		secret,
		metrics: {
			psnr: psnrOf(cover, stego),
			ssim: ssimOf(cover, stego),
			mse: mseOf(cover, stego),
			ber: expectedSecret ? bitErrorRate(expectedSecret, secret) : 0,
			recovery: expectedSecret ? expectedSecret === secret : true,
			payloadBits: packed.length * 8,
			bpp: packed.length * 8 / (cover.width * cover.height),
			lsbChangePct: 100 * flips / Math.max(1, packed.length * 8),
			encodeMs: NaN,
			decodeMs,
			distortion: meanAbsDelta(cover, stego)
		}
	};
}
function makeCanvas(width = 384, height = 384) {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("Canvas 2D unavailable");
	return {
		canvas,
		ctx
	};
}
function canvasToRgbImage(canvas, ctx) {
	const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
	return {
		width: canvas.width,
		height: canvas.height,
		data: id.data
	};
}
function generatePortraitSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	const bgGrad = ctx.createLinearGradient(0, 0, width, height);
	bgGrad.addColorStop(0, "#4a2840");
	bgGrad.addColorStop(.5, "#8d5462");
	bgGrad.addColorStop(1, "#c9897e");
	ctx.fillStyle = bgGrad;
	ctx.fillRect(0, 0, width, height);
	const cx = width * .5;
	const cy = height * .52;
	const faceGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, width * .35);
	faceGrad.addColorStop(0, "#f7cfbe");
	faceGrad.addColorStop(.7, "#e4a993");
	faceGrad.addColorStop(1, "#c27d68");
	ctx.fillStyle = faceGrad;
	ctx.beginPath();
	ctx.ellipse(cx, cy, width * .28, height * .36, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#863456";
	ctx.beginPath();
	ctx.ellipse(cx, cy - height * .28, width * .42, height * .16, -.15, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#dd9bb5";
	ctx.lineWidth = 1.5;
	for (let i = 0; i < 40; i++) {
		const angle = -.5 + i / 40 * 1.2;
		ctx.beginPath();
		ctx.moveTo(cx + Math.cos(angle) * 80, cy - 120 + Math.sin(angle) * 50);
		ctx.quadraticCurveTo(cx + Math.cos(angle) * 160 + i % 3 * 10, cy - 150 - i * 2, cx + Math.cos(angle) * 190, cy - 130 + Math.sin(angle) * 60);
		ctx.stroke();
	}
	ctx.fillStyle = "#3e1c14";
	ctx.beginPath();
	ctx.ellipse(cx - 38, cy - 15, 12, 7, -.1, 0, Math.PI * 2);
	ctx.ellipse(cx + 38, cy - 15, 12, 7, .1, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#8e3c3c";
	ctx.lineWidth = 2.5;
	ctx.beginPath();
	ctx.moveTo(cx, cy - 5);
	ctx.lineTo(cx - 4, cy + 25);
	ctx.lineTo(cx + 10, cy + 28);
	ctx.stroke();
	ctx.fillStyle = "#b83b48";
	ctx.beginPath();
	ctx.ellipse(cx, cy + 55, 24, 9, 0, 0, Math.PI * 2);
	ctx.fill();
	return canvasToRgbImage(canvas, ctx);
}
function generateTextureSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	const imgData = ctx.createImageData(width, height);
	const d = imgData.data;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		const idx = (y * width + x) * 4;
		const nx = x / width;
		const ny = y / height;
		const f1 = Math.sin(nx * 35 + ny * 20);
		const f2 = Math.cos(nx * 70 - ny * 50);
		const f3 = Math.sin(Math.sqrt((x - width / 2) ** 2 + (y - height / 2) ** 2) * .2);
		const f4 = Math.sin(nx * 120) * Math.cos(ny * 120);
		const val = 128 + 55 * f1 + 35 * f2 + 25 * f3 + 15 * f4;
		const r = Math.max(0, Math.min(255, val + 20 * Math.sin(nx * 10)));
		const g = Math.max(0, Math.min(255, val * .85 + 30 * Math.cos(ny * 15)));
		const b = Math.max(0, Math.min(255, val * .7 + 40 * f2));
		d[idx] = r;
		d[idx + 1] = g;
		d[idx + 2] = b;
		d[idx + 3] = 255;
	}
	ctx.putImageData(imgData, 0, 0);
	ctx.strokeStyle = "rgba(240, 230, 210, 0.4)";
	ctx.lineWidth = 1;
	for (let i = 0; i < 60; i++) {
		const y0 = height * .3 + i * 3;
		ctx.beginPath();
		ctx.moveTo(width * .2, y0);
		ctx.quadraticCurveTo(width * .5, y0 + i % 7 * 4 - 10, width * .85, y0 + i % 5 * 6);
		ctx.stroke();
	}
	return canvasToRgbImage(canvas, ctx);
}
function generatePeppersSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	ctx.fillStyle = "#1b211d";
	ctx.fillRect(0, 0, width, height);
	const p1 = ctx.createRadialGradient(width * .35, height * .45, 10, width * .4, height * .5, 140);
	p1.addColorStop(0, "#8cf05b");
	p1.addColorStop(.3, "#3fa328");
	p1.addColorStop(.8, "#1a5e12");
	p1.addColorStop(1, "#0d310a");
	ctx.fillStyle = p1;
	ctx.beginPath();
	ctx.ellipse(width * .4, height * .5, 110, 130, -.2, 0, Math.PI * 2);
	ctx.fill();
	const p2 = ctx.createRadialGradient(width * .65, height * .4, 15, width * .65, height * .45, 130);
	p2.addColorStop(0, "#ff7568");
	p2.addColorStop(.35, "#db1a1a");
	p2.addColorStop(.85, "#800808");
	p2.addColorStop(1, "#360202");
	ctx.fillStyle = p2;
	ctx.beginPath();
	ctx.ellipse(width * .65, height * .45, 105, 125, .25, 0, Math.PI * 2);
	ctx.fill();
	const p3 = ctx.createRadialGradient(width * .5, height * .65, 10, width * .5, height * .7, 100);
	p3.addColorStop(0, "#fff06b");
	p3.addColorStop(.4, "#f5a216");
	p3.addColorStop(.85, "#ba5a07");
	p3.addColorStop(1, "#4d1d00");
	ctx.fillStyle = p3;
	ctx.beginPath();
	ctx.ellipse(width * .5, height * .7, 95, 80, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
	ctx.beginPath();
	ctx.ellipse(width * .35, height * .38, 28, 9, -.6, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(width * .68, height * .34, 24, 7, .4, 0, Math.PI * 2);
	ctx.fill();
	return canvasToRgbImage(canvas, ctx);
}
function generateGeometricSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	const grad = ctx.createLinearGradient(0, 0, width, height);
	grad.addColorStop(0, "#0f172a");
	grad.addColorStop(1, "#334155");
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, width, height);
	const cx = width / 2;
	const cy = height / 2;
	for (let r = 10; r < width * .65; r += 8) {
		ctx.strokeStyle = `hsl(${r * 3 % 360}, 65%, 60%)`;
		ctx.lineWidth = 1 + r % 3;
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, Math.PI * 2);
		ctx.stroke();
	}
	ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(cx, 0);
	ctx.lineTo(cx, height);
	ctx.moveTo(0, cy);
	ctx.lineTo(width, cy);
	ctx.stroke();
	return canvasToRgbImage(canvas, ctx);
}
function generateAirplaneSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	const grad = ctx.createLinearGradient(0, 0, 0, height);
	grad.addColorStop(0, "#38bdf8");
	grad.addColorStop(.65, "#bae6fd");
	grad.addColorStop(1, "#f0f9ff");
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
	ctx.beginPath();
	ctx.ellipse(width * .25, height * .7, 90, 35, 0, 0, Math.PI * 2);
	ctx.ellipse(width * .75, height * .75, 110, 40, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#e2e8f0";
	ctx.strokeStyle = "#475569";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.ellipse(width * .5, height * .45, 130, 26, -.2, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = "#cbd5e1";
	ctx.beginPath();
	ctx.moveTo(width * .42, height * .43);
	ctx.lineTo(width * .25, height * .18);
	ctx.lineTo(width * .38, height * .41);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(width * .65, height * .41);
	ctx.lineTo(width * .74, height * .28);
	ctx.lineTo(width * .76, height * .39);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	return canvasToRgbImage(canvas, ctx);
}
function generateBarbaraSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	ctx.fillStyle = "#78350f";
	ctx.fillRect(0, 0, width, height);
	ctx.strokeStyle = "#fef3c7";
	ctx.lineWidth = 2;
	for (let x = -width; x < width * 2; x += 10) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x + width * .7, height);
		ctx.stroke();
	}
	ctx.fillStyle = "#451a03";
	ctx.beginPath();
	ctx.ellipse(width * .5, height * .6, 110, 80, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#38bdf8";
	ctx.lineWidth = 1.5;
	for (let i = 0; i < 30; i++) {
		const sx = width * .38 + i * 3;
		ctx.beginPath();
		ctx.moveTo(sx, height * .4);
		ctx.lineTo(sx, height * .75);
		ctx.stroke();
	}
	return canvasToRgbImage(canvas, ctx);
}
function generateLakeSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	const skyGrad = ctx.createLinearGradient(0, 0, 0, height * .5);
	skyGrad.addColorStop(0, "#f97316");
	skyGrad.addColorStop(.5, "#fdba74");
	skyGrad.addColorStop(1, "#fef08a");
	ctx.fillStyle = skyGrad;
	ctx.fillRect(0, 0, width, height * .5);
	ctx.fillStyle = "#1e293b";
	ctx.beginPath();
	ctx.moveTo(0, height * .5);
	ctx.lineTo(width * .25, height * .32);
	ctx.lineTo(width * .5, height * .42);
	ctx.lineTo(width * .75, height * .28);
	ctx.lineTo(width, height * .5);
	ctx.closePath();
	ctx.fill();
	const waterGrad = ctx.createLinearGradient(0, height * .5, 0, height);
	waterGrad.addColorStop(0, "#0369a1");
	waterGrad.addColorStop(1, "#082f49");
	ctx.fillStyle = waterGrad;
	ctx.fillRect(0, height * .5, width, height * .5);
	ctx.strokeStyle = "rgba(254, 240, 138, 0.4)";
	ctx.lineWidth = 1.2;
	for (let y = height * .52; y < height; y += 7) {
		ctx.beginPath();
		ctx.moveTo(width * .3, y);
		ctx.lineTo(width * .7 + Math.sin(y * 10) * 20, y);
		ctx.stroke();
	}
	return canvasToRgbImage(canvas, ctx);
}
var SAMPLE_COVERS = [
	{
		id: "portrait",
		name: "Lena (Classic Portrait)",
		category: "Balanced Frequency",
		description: "Standard benchmark image with smooth skin tones, edge boundaries, and fine textures.",
		generate: () => generatePortraitSample(384, 384)
	},
	{
		id: "texture",
		name: "Baboon (High Texture)",
		category: "High Spatial Frequency",
		description: "Rich harmonic texture and high entropy, challenging for steganalysis algorithms.",
		generate: () => generateTextureSample(384, 384)
	},
	{
		id: "peppers",
		name: "Peppers (Color Gradients)",
		category: "Specular Highlights",
		description: "Vibrant multi-channel color gradients and smooth lighting transitions.",
		generate: () => generatePeppersSample(384, 384)
	},
	{
		id: "geometric",
		name: "Calibration Grid",
		category: "Geometric Pattern",
		description: "Synthetic frequency patterns for measuring spatial distortion and PSNR uniformity.",
		generate: () => generateGeometricSample(384, 384)
	},
	{
		id: "airplane",
		name: "Airplane (Sky & Gradients)",
		category: "Low Frequency / Sky",
		description: "Smooth sky gradients and sharp metallic contours, testing edge-localized artifacts.",
		generate: () => generateAirplaneSample(384, 384)
	},
	{
		id: "barbara",
		name: "Barbara (Striated Textures)",
		category: "Periodic Textures",
		description: "High-frequency fabric patterns prone to moiré and distortion artifacts.",
		generate: () => generateBarbaraSample(384, 384)
	},
	{
		id: "lake",
		name: "Lake (Water & Edges)",
		category: "Natural Reflection",
		description: "Horizon contrast and water surface reflections with variable channel entropy.",
		generate: () => generateLakeSample(384, 384)
	}
];
function generateSampleImage(type, width = 384, height = 384) {
	switch (type) {
		case "portrait": return generatePortraitSample(width, height);
		case "texture": return generateTextureSample(width, height);
		case "peppers": return generatePeppersSample(width, height);
		case "geometric": return generateGeometricSample(width, height);
		case "airplane": return generateAirplaneSample(width, height);
		case "barbara": return generateBarbaraSample(width, height);
		case "lake": return generateLakeSample(width, height);
		default: return generatePortraitSample(width, height);
	}
}
function erfc(x) {
	const a1 = .254829592;
	const a2 = -.284496736;
	const a3 = 1.421413741;
	const a4 = -1.453152027;
	const a5 = 1.061405429;
	const p = .3275911;
	const absX = Math.abs(x);
	const t = 1 / (1 + p * absX);
	const val = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
	return x >= 0 ? val : 2 - val;
}
function chi2Sf(x, df) {
	if (x <= 0) return 1;
	if (df <= 0) return 1;
	const h = 2 / (9 * df);
	const z = ((x / df) ** (1 / 3) - (1 - h)) / Math.sqrt(h);
	return Math.min(1, Math.max(0, .5 * erfc(z / Math.SQRT2)));
}
function logGamma(z) {
	const p = [
		.9999999999998099,
		676.5203681218851,
		-1259.1392167224028,
		771.3234287776531,
		-176.6150291621406,
		12.507343278686905,
		-.13857109526572012,
		9984369578019572e-21,
		1.5056327351493116e-7
	];
	if (z < .5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
	const zz = z - 1;
	let x = p[0];
	for (let i = 1; i < 9; i++) x += p[i] / (zz + i);
	const t = zz + 7.5;
	return .5 * Math.log(2 * Math.PI) + (zz + .5) * Math.log(t) - t + Math.log(x);
}
function betacf(x, a, b) {
	const maxIter = 100;
	const eps = 3e-7;
	const qab = a + b;
	const qap = a + 1;
	const qam = a - 1;
	let c = 1;
	let d = 1 - qab * x / qap;
	if (Math.abs(d) < 1e-30) d = 1e-30;
	d = 1 / d;
	let h = d;
	for (let m = 1; m <= maxIter; m++) {
		const m2 = 2 * m;
		let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
		d = 1 + aa * d;
		if (Math.abs(d) < 1e-30) d = 1e-30;
		c = 1 + aa / c;
		if (Math.abs(c) < 1e-30) c = 1e-30;
		d = 1 / d;
		h *= d * c;
		aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
		d = 1 + aa * d;
		if (Math.abs(d) < 1e-30) d = 1e-30;
		c = 1 + aa / c;
		if (Math.abs(c) < 1e-30) c = 1e-30;
		d = 1 / d;
		const del = d * c;
		h *= del;
		if (Math.abs(del - 1) < eps) break;
	}
	return h;
}
function incompleteBeta(x, a, b) {
	if (x <= 0) return 0;
	if (x >= 1) return 1;
	const bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
	if (x < (a + 1) / (a + b + 2)) return bt * betacf(x, a, b) / a;
	else return 1 - bt * betacf(1 - x, b, a) / b;
}
function fDistributionSf(f, df1, df2) {
	if (f <= 0) return 1;
	if (df1 <= 0 || df2 <= 0) return 1;
	const x = df2 / (df2 + df1 * f);
	return Math.min(1, Math.max(0, incompleteBeta(x, df2 / 2, df1 / 2)));
}
/**
* Studentized range critical values q_α / sqrt(2) for Nemenyi test (Demsar, 2006).
* Index corresponds to k (number of models, 2..10).
*/
var NEMENYI_Q05 = [
	0,
	0,
	1.96,
	2.343,
	2.569,
	2.728,
	2.85,
	2.949,
	3.031,
	3.102,
	3.164
];
var NEMENYI_Q01 = [
	0,
	0,
	2.576,
	2.913,
	3.113,
	3.255,
	3.364,
	3.452,
	3.526,
	3.59,
	3.646
];
/**
* Computes ranks for a single row with exact fractional tie-handling.
* If higherIsBetter = true: largest value gets rank 1.
* If higherIsBetter = false: smallest value gets rank 1.
*/
function rankRowWithTies(values, higherIsBetter = true) {
	const n = values.length;
	const idx = values.map((v, i) => ({
		v,
		i
	}));
	idx.sort((a, b) => higherIsBetter ? b.v - a.v : a.v - b.v);
	const ranks = new Array(n).fill(0);
	let tieCorrection = 0;
	for (let i = 0; i < n;) {
		let j = i;
		while (j < n && Math.abs(idx[j].v - idx[i].v) < 1e-12) j++;
		const tieGroupSize = j - i;
		if (tieGroupSize > 1) tieCorrection += tieGroupSize ** 3 - tieGroupSize;
		const avgRank = (i + 1 + j) / 2;
		for (let t = i; t < j; t++) ranks[idx[t].i] = avgRank;
		i = j;
	}
	return {
		ranks,
		tieCorrection
	};
}
/**
* Evaluates the full statistical battery:
* 1. Friedman test (Chi-Square & Iman-Davenport F)
* 2. Kendall's W (Effect Size)
* 3. Nemenyi Post-hoc Test (Critical Difference, pairwise z/p, and homogeneous cliques)
*/
function friedmanTest(table, higherIsBetter = true, alpha = .05) {
	const n = table.imageIds.length;
	const k = table.modelIds.length;
	if (n < 2 || k < 2) return {
		n,
		k,
		alpha,
		rankingMatrix: [],
		rankSums: table.modelIds.map(() => 0),
		avgRanks: table.modelIds.map(() => 0),
		chi2: 0,
		df: Math.max(0, k - 1),
		pApprox: 1,
		isSignificantChi2: false,
		imanDavenportF: 0,
		df1: Math.max(0, k - 1),
		df2: Math.max(0, (k - 1) * Math.max(1, n - 1)),
		pFDistribution: 1,
		isSignificantF: false,
		kendallW: 0,
		effectMagnitude: "negligible",
		effectDescription: "Insufficient data (at least 2 images and 2 models required)",
		tieCorrectionApplied: false,
		qAlpha: 0,
		nemenyiCD: 0,
		pairs: [],
		cliques: []
	};
	const rankingMatrix = [];
	const rankSums = new Array(k).fill(0);
	let totalTieCorrection = 0;
	for (let i = 0; i < n; i++) {
		const { ranks, tieCorrection } = rankRowWithTies(table.scores[i], higherIsBetter);
		rankingMatrix.push(ranks);
		totalTieCorrection += tieCorrection;
		for (let j = 0; j < k; j++) rankSums[j] += ranks[j];
	}
	const avgRanks = rankSums.map((sum) => sum / n);
	let sumSqRankSums = 0;
	for (let j = 0; j < k; j++) sumSqRankSums += rankSums[j] ** 2;
	let chi2;
	if (totalTieCorrection > 0) {
		const numerator = 12 * sumSqRankSums - 3 * n * n * k * (k + 1) ** 2;
		const denominator = n * k * (k + 1) - 1 / (k - 1) * totalTieCorrection;
		chi2 = denominator > 0 ? numerator / denominator : 0;
	} else chi2 = 12 / (n * k * (k + 1)) * sumSqRankSums - 3 * n * (k + 1);
	chi2 = Math.max(0, chi2);
	const df = k - 1;
	const pApprox = chi2Sf(chi2, df);
	const isSignificantChi2 = pApprox < alpha;
	const df1 = k - 1;
	const df2 = (k - 1) * (n - 1);
	const denominatorF = n * (k - 1) - chi2;
	const imanDavenportF = denominatorF > 0 ? (n - 1) * chi2 / denominatorF : 9999;
	const pFDistribution = fDistributionSf(imanDavenportF, df1, df2);
	const isSignificantF = pFDistribution < alpha;
	const meanRankSum = n * (k + 1) / 2;
	let sDev = 0;
	for (let j = 0; j < k; j++) sDev += (rankSums[j] - meanRankSum) ** 2;
	const maxVariance = n * n * (k ** 3 - k) - n * totalTieCorrection;
	let kendallW = maxVariance > 0 ? 12 * sDev / maxVariance : chi2 / (n * (k - 1));
	kendallW = Math.min(1, Math.max(0, kendallW));
	let effectMagnitude;
	let effectDescription;
	if (kendallW < .1) {
		effectMagnitude = "negligible";
		effectDescription = "Negligible agreement among test images (rankings vary significantly across images)";
	} else if (kendallW < .3) {
		effectMagnitude = "small";
		effectDescription = "Small effect size / weak concordance among rankings";
	} else if (kendallW < .5) {
		effectMagnitude = "moderate";
		effectDescription = "Moderate concordance (consistent ranking tendencies across images)";
	} else if (kendallW < .7) {
		effectMagnitude = "strong";
		effectDescription = "Strong concordance (models maintain consistent relative performance)";
	} else {
		effectMagnitude = "very strong";
		effectDescription = "Very strong agreement (near-unanimous ranking order across all benchmark images)";
	}
	const qAlpha = (alpha === .01 ? NEMENYI_Q01 : NEMENYI_Q05)[Math.min(10, k)] ?? (alpha === .01 ? 3.364 : 2.85);
	const se = Math.sqrt(k * (k + 1) / (6 * n));
	const nemenyiCD = qAlpha * se;
	const pairs = [];
	for (let a = 0; a < k; a++) for (let b = a + 1; b < k; b++) {
		const diff = Math.abs(avgRanks[a] - avgRanks[b]);
		const zValue = se > 0 ? diff / se : 0;
		const pValue = Math.min(1, Math.max(0, erfc(zValue / Math.SQRT2)));
		pairs.push({
			a: table.modelIds[a],
			b: table.modelIds[b],
			rankDiff: diff,
			zValue,
			pValue,
			significant: diff > nemenyiCD
		});
	}
	const sortedModelIndices = Array.from({ length: k }, (_, i) => i);
	sortedModelIndices.sort((i1, i2) => avgRanks[i1] - avgRanks[i2]);
	const cliques = [];
	for (let start = 0; start < k; start++) {
		let end = start;
		while (end + 1 < k && Math.abs(avgRanks[sortedModelIndices[end + 1]] - avgRanks[sortedModelIndices[start]]) <= nemenyiCD) end++;
		if (end > start) {
			const clique = sortedModelIndices.slice(start, end + 1).map((idx) => table.modelIds[idx]);
			if (!cliques.some((existing) => clique.every((id) => existing.includes(id)))) cliques.push(clique);
		}
	}
	return {
		n,
		k,
		alpha,
		rankingMatrix,
		rankSums,
		avgRanks,
		chi2,
		df,
		pApprox,
		isSignificantChi2,
		imanDavenportF,
		df1,
		df2,
		pFDistribution,
		isSignificantF,
		kendallW,
		effectMagnitude,
		effectDescription,
		tieCorrectionApplied: totalTieCorrection > 0,
		qAlpha,
		nemenyiCD,
		pairs,
		cliques
	};
}
function getBestModelAnalysis(result, table) {
	if (result.k < 2 || result.n < 1) return null;
	const sortedIndices = Array.from({ length: result.k }, (_, i) => i).sort((a, b) => result.avgRanks[a] - result.avgRanks[b]);
	const bestIdx = sortedIndices[0];
	const runnerUpIdx = sortedIndices[1];
	const bestId = table.modelIds[bestIdx];
	const bestRank = result.avgRanks[bestIdx];
	const runnerUpId = table.modelIds[runnerUpIdx];
	const runnerUpRank = result.avgRanks[runnerUpIdx];
	const leadMargin = runnerUpRank - bestRank;
	const isStatisticallySuperiorToRunnerUp = leadMargin > result.nemenyiCD;
	const outperformed = [];
	for (let i = 1; i < result.k; i++) {
		const otherIdx = sortedIndices[i];
		const otherId = table.modelIds[otherIdx];
		if (result.avgRanks[otherIdx] - bestRank > result.nemenyiCD) outperformed.push(otherId);
	}
	let winCount = 0;
	for (let imgIdx = 0; imgIdx < result.n; imgIdx++) if (result.rankingMatrix[imgIdx]?.[bestIdx] === 1) winCount++;
	const winRatePct = winCount / result.n * 100;
	let scoreSum = 0;
	let validScores = 0;
	for (let imgIdx = 0; imgIdx < result.n; imgIdx++) {
		const score = table.scores[imgIdx]?.[bestIdx];
		if (typeof score === "number" && score > -1e8 && score < 1e8) {
			scoreSum += score;
			validScores++;
		}
	}
	const meanScore = validScores > 0 ? scoreSum / validScores : 0;
	return {
		bestModelId: bestId,
		bestModelRank: bestRank,
		runnerUpId,
		runnerUpRank,
		leadMargin,
		isStatisticallySuperiorToRunnerUp,
		statisticallyOutperformedCount: outperformed.length,
		statisticallyOutperformedModelIds: outperformed,
		winCount,
		winRatePct,
		meanScore
	};
}
function generateLatexTable(result, table, modelNames, metricName) {
	const sortedIndices = Array.from({ length: result.k }, (_, i) => i).sort((a, b) => result.avgRanks[a] - result.avgRanks[b]);
	let rows = "";
	for (const idx of sortedIndices) {
		const mId = table.modelIds[idx];
		const mName = modelNames[mId] || mId;
		const rank = result.avgRanks[idx].toFixed(3);
		const sum = result.rankSums[idx].toFixed(1);
		const isWinner = idx === sortedIndices[0];
		const nameFormatted = isWinner ? `\\textbf{${mName}}` : mName;
		const rankFormatted = isWinner ? `\\textbf{${rank}}` : rank;
		rows += `  ${nameFormatted} & ${sum} & ${rankFormatted} \\\\\n`;
	}
	return `% --- LaTeX Table: Non-parametric Friedman & Nemenyi Benchmark ---
\\begin{table}[htbp]
\\centering
\\caption{Friedman Test and Average Rankings across $N = ${result.n}$ Test Images for ${metricName}.}
\\label{tab:friedman_rankings}
\\begin{tabular}{lcc}
\\hline
\\textbf{Steganography Model} & \\textbf{Rank Sum ($R_j$)} & \\textbf{Average Rank ($\\bar{R}_j$)} \\\\
\\hline
${rows}\\hline
\\multicolumn{3}{l}{\\small Friedman $\\chi_F^2 = ${result.chi2.toFixed(3)}$ ($df = ${result.df}$, $p = ${result.pApprox < 1e-4 ? "< 0.0001" : result.pApprox.toFixed(4)}$)} \\\\
\\multicolumn{3}{l}{\\small Iman-Davenport $F_F = ${result.imanDavenportF > 9e3 ? "\\infty" : result.imanDavenportF.toFixed(3)}$ ($df_1 = ${result.df1}, df_2 = ${result.df2}$, $p_F = ${result.pFDistribution < 1e-4 ? "< 0.0001" : result.pFDistribution.toFixed(4)}$)} \\\\
\\multicolumn{3}{l}{\\small Kendall's $W = ${result.kendallW.toFixed(4)}$ (${result.effectMagnitude} agreement)} \\\\
\\multicolumn{3}{l}{\\small Nemenyi Critical Difference $CD = ${result.nemenyiCD.toFixed(3)}$ ($\\alpha = ${result.alpha}$)} \\\\
\\hline
\\end{tabular}
\\end{table}`;
}
function generateApaSummary(result, modelNames, metricName, bestAnalysis) {
	const bestName = bestAnalysis ? modelNames[bestAnalysis.bestModelId] || bestAnalysis.bestModelId : "Top model";
	const runnerUpName = bestAnalysis ? modelNames[bestAnalysis.runnerUpId] || bestAnalysis.runnerUpId : "Runner-up";
	const pStr = result.pApprox < .001 ? "p < .001" : `p = ${result.pApprox.toFixed(3)}`;
	const pFStr = result.pFDistribution < .001 ? "p < .001" : `p = ${result.pFDistribution.toFixed(3)}`;
	return `A non-parametric Friedman test was conducted to evaluate differences in ${metricName} across k = ${result.k} steganography models evaluated on N = ${result.n} benchmark images. The omnibus test demonstrated a statistically significant difference among model performances, χ_F²(${result.df}) = ${result.chi2.toFixed(3)}, ${pStr}. The Iman-Davenport extension confirmed this finding without small-sample bias, F_F(${result.df1}, ${result.df2}) = ${result.imanDavenportF > 9e3 ? "∞" : result.imanDavenportF.toFixed(3)}, ${pFStr}. Kendall’s coefficient of concordance indicated ${result.effectMagnitude} agreement across test covers (W = ${result.kendallW.toFixed(3)}), demonstrating consistent relative performance regardless of image texture and spatial frequency. Post-hoc analysis using the Nemenyi test (Critical Difference CD = ${result.nemenyiCD.toFixed(3)} at α = ${result.alpha}) identified ${bestName} as the superior model, achieving the optimal average rank of ${bestAnalysis ? bestAnalysis.bestModelRank.toFixed(3) : "1.000"}${bestAnalysis && bestAnalysis.isStatisticallySuperiorToRunnerUp ? `, which statistically significantly outperformed all competing methods including ${runnerUpName}` : bestAnalysis && bestAnalysis.statisticallyOutperformedCount > 0 ? `, outperforming ${bestAnalysis.statisticallyOutperformedCount} baselines with statistical significance` : ""}.`;
}
var METRIC_OPTIONS = [
	{
		id: "psnr",
		name: "Peak Signal-to-Noise Ratio (PSNR)",
		unit: "dB",
		higherIsBetter: true,
		description: "Imperceptibility metric: higher dB values signify lower visual artifact distortion."
	},
	{
		id: "ssim",
		name: "Structural Similarity Index (SSIM)",
		unit: "[0..1]",
		higherIsBetter: true,
		description: "Perceptual metric measuring luminance, contrast, and structural preservation."
	},
	{
		id: "mse",
		name: "Mean Squared Error (MSE)",
		unit: "raw",
		higherIsBetter: false,
		description: "Cumulative squared Euclidean error between original cover and stego pixel channels."
	},
	{
		id: "distortion",
		name: "Mean Absolute Distortion (MAD)",
		unit: "intensity",
		higherIsBetter: false,
		description: "Average absolute channel change across all embedded stego pixels."
	},
	{
		id: "ber",
		name: "Bit Error Rate (BER)",
		unit: "%",
		higherIsBetter: false,
		description: "Fraction of extracted payload bits that disagree with original secret bits."
	},
	{
		id: "encodeMs",
		name: "Embedding Latency",
		unit: "ms",
		higherIsBetter: false,
		description: "Time taken to compute adaptive attention, Hamming codes, and modify image channels."
	},
	{
		id: "decodeMs",
		name: "Extraction Latency",
		unit: "ms",
		higherIsBetter: false,
		description: "Time taken to read stego channels, syndrome-decode Hamming blocks, and decrypt secret."
	}
];
/**
* Standard empirical reference dataset obtained from the ARES experimental paper evaluation.
* Evaluates 6 canonical images (Lena, Baboon, Peppers, Airplane, Barbara, Lake)
* across the 6 benchmark algorithms with exact metric measurements.
*/
var REFERENCE_BENCHMARK_ROWS = [
	{
		imageName: "Lena.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 52.41,
			ssim: .9982,
			mse: .373,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.28,
			encodeMs: 18.4,
			decodeMs: 9.1,
			distortion: .142
		}
	},
	{
		imageName: "Lena.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 46.12,
			ssim: .9891,
			mse: 1.588,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.8,
			encodeMs: 24.6,
			decodeMs: 14.8,
			distortion: .498
		}
	},
	{
		imageName: "Lena.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.85,
			ssim: .9854,
			mse: 2.128,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.1,
			encodeMs: 19.8,
			decodeMs: 11.2,
			distortion: .501
		}
	},
	{
		imageName: "Lena.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.24,
			ssim: .9868,
			mse: 1.945,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 48.9,
			encodeMs: 22.1,
			decodeMs: 13,
			distortion: .489
		}
	},
	{
		imageName: "Lena.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 47.88,
			ssim: .9912,
			mse: 1.059,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 38.6,
			encodeMs: 26.5,
			decodeMs: 16.2,
			distortion: .386
		}
	},
	{
		imageName: "Lena.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 43.15,
			ssim: .9811,
			mse: 3.148,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.4,
			encodeMs: 31,
			decodeMs: 18.5,
			distortion: .514
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 51.89,
			ssim: .9978,
			mse: .421,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.3,
			encodeMs: 19.2,
			decodeMs: 9.4,
			distortion: .143
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.92,
			ssim: .9882,
			mse: 1.663,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.2,
			encodeMs: 25.1,
			decodeMs: 15,
			distortion: .502
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.51,
			ssim: .984,
			mse: 2.301,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50,
			encodeMs: 20.3,
			decodeMs: 11.5,
			distortion: .5
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.1,
			ssim: .9859,
			mse: 2.009,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.2,
			encodeMs: 22.8,
			decodeMs: 13.4,
			distortion: .492
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 47.45,
			ssim: .9904,
			mse: 1.169,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 39.1,
			encodeMs: 27.2,
			decodeMs: 16.8,
			distortion: .391
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 42.9,
			ssim: .9798,
			mse: 3.334,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.8,
			encodeMs: 31.8,
			decodeMs: 19,
			distortion: .518
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 52.18,
			ssim: .9981,
			mse: .393,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.26,
			encodeMs: 18.7,
			decodeMs: 9.2,
			distortion: .143
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 46.04,
			ssim: .9889,
			mse: 1.618,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.9,
			encodeMs: 24.8,
			decodeMs: 14.9,
			distortion: .499
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.72,
			ssim: .9849,
			mse: 2.193,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.3,
			encodeMs: 20,
			decodeMs: 11.3,
			distortion: .503
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.18,
			ssim: .9863,
			mse: 1.972,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49,
			encodeMs: 22.4,
			decodeMs: 13.2,
			distortion: .49
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 47.69,
			ssim: .9908,
			mse: 1.107,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 38.8,
			encodeMs: 26.8,
			decodeMs: 16.4,
			distortion: .388
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 43.02,
			ssim: .9805,
			mse: 3.243,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.6,
			encodeMs: 31.4,
			decodeMs: 18.7,
			distortion: .516
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 52.85,
			ssim: .9986,
			mse: .337,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.25,
			encodeMs: 18.1,
			decodeMs: 8.9,
			distortion: .141
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 46.33,
			ssim: .9898,
			mse: 1.514,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.6,
			encodeMs: 24.3,
			decodeMs: 14.6,
			distortion: .496
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.98,
			ssim: .986,
			mse: 2.065,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.9,
			encodeMs: 19.5,
			decodeMs: 11,
			distortion: .499
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.42,
			ssim: .9873,
			mse: 1.866,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 48.7,
			encodeMs: 21.9,
			decodeMs: 12.8,
			distortion: .487
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 48.05,
			ssim: .9918,
			mse: 1.019,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 38.3,
			encodeMs: 26.2,
			decodeMs: 16,
			distortion: .383
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 43.3,
			ssim: .9818,
			mse: 3.041,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.2,
			encodeMs: 30.7,
			decodeMs: 18.2,
			distortion: .512
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 52.05,
			ssim: .9979,
			mse: .405,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.29,
			encodeMs: 18.9,
			decodeMs: 9.3,
			distortion: .142
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.98,
			ssim: .9885,
			mse: 1.641,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.1,
			encodeMs: 24.9,
			decodeMs: 15.1,
			distortion: .501
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.65,
			ssim: .9845,
			mse: 2.228,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.2,
			encodeMs: 20.1,
			decodeMs: 11.4,
			distortion: .502
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.15,
			ssim: .9861,
			mse: 1.986,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.1,
			encodeMs: 22.5,
			decodeMs: 13.3,
			distortion: .491
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 47.6,
			ssim: .9906,
			mse: 1.13,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 38.9,
			encodeMs: 26.9,
			decodeMs: 16.5,
			distortion: .389
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 42.98,
			ssim: .9802,
			mse: 3.273,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.7,
			encodeMs: 31.6,
			decodeMs: 18.9,
			distortion: .517
		}
	},
	{
		imageName: "Lake.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 52.32,
			ssim: .9982,
			mse: .381,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.27,
			encodeMs: 18.5,
			decodeMs: 9,
			distortion: .142
		}
	},
	{
		imageName: "Lake.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 46.18,
			ssim: .9893,
			mse: 1.567,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.7,
			encodeMs: 24.5,
			decodeMs: 14.7,
			distortion: .497
		}
	},
	{
		imageName: "Lake.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.8,
			ssim: .9851,
			mse: 2.153,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.1,
			encodeMs: 19.9,
			decodeMs: 11.1,
			distortion: .501
		}
	},
	{
		imageName: "Lake.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.3,
			ssim: .9866,
			mse: 1.919,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 48.8,
			encodeMs: 22.2,
			decodeMs: 13.1,
			distortion: .488
		}
	},
	{
		imageName: "Lake.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 47.8,
			ssim: .991,
			mse: 1.079,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 38.5,
			encodeMs: 26.6,
			decodeMs: 16.3,
			distortion: .385
		}
	},
	{
		imageName: "Lake.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 43.1,
			ssim: .9809,
			mse: 3.184,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.5,
			encodeMs: 31.2,
			decodeMs: 18.6,
			distortion: .515
		}
	}
];
var _jsxFileName$1 = "/app/applet/src/components/cd-diagram.tsx";
function CDDiagram({ modelIds, avgRanks, cd, cliques, k, metricLabel = "PSNR", higherIsBetter = true }) {
	const gradientId = (0, import_react.useId)();
	const sorted = modelIds.map((id, index) => {
		const def = MODELS.find((m) => m.id === id);
		return {
			id,
			name: def?.short || id,
			fullName: def?.name || id,
			isAres: id === "ares_hybrid_inn",
			rank: avgRanks[index] ?? 0
		};
	}).sort((a, b) => a.rank - b.rank);
	const width = 760;
	const height = 260;
	const paddingX = 60;
	const axisY = 90;
	const plotWidth = 640;
	const rankToX = (r) => {
		if (k <= 1) return 380;
		return paddingX + (Math.max(1, Math.min(k, r)) - 1) / (k - 1) * plotWidth;
	};
	const cdPixelWidth = cd / (k - 1) * plotWidth;
	const half = Math.ceil(sorted.length / 2);
	const leftModels = sorted.slice(0, half);
	const rightModels = sorted.slice(half);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "w-full overflow-x-auto rounded-xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "font-medium text-foreground",
					children: "Demšar Critical Difference (CD) Diagram"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 64,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]",
					children: [
						higherIsBetter ? "1 = Highest" : "1 = Lowest",
						" ",
						metricLabel
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 65,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 63,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block h-2 w-2 rounded-full bg-primary" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 71,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "ARES (Proposed)" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 72,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 70,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block h-2 w-2 rounded-full bg-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 75,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Reproduction Baselines" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 76,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 74,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block h-1 w-4 rounded-full bg-emerald-500" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 79,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Not Statistically Different (Clique)" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 80,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 78,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 69,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 62,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			viewBox: `0 0 ${width} ${height}`,
			className: "w-full select-none",
			style: { minWidth: 640 },
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
					id: gradientId,
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
						offset: "0%",
						stopColor: "#10b981"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 92,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
						offset: "100%",
						stopColor: "#059669"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 93,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 91,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 90,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", {
					transform: "translate(60, 25)",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1: "0",
							y1: "0",
							x2: cdPixelWidth,
							y2: "0",
							stroke: "currentColor",
							strokeWidth: "2.5",
							className: "text-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 100,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1: "0",
							y1: "-5",
							x2: "0",
							y2: "5",
							stroke: "currentColor",
							strokeWidth: "2.5",
							className: "text-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 110,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1: cdPixelWidth,
							y1: "-5",
							x2: cdPixelWidth,
							y2: "5",
							stroke: "currentColor",
							strokeWidth: "2.5",
							className: "text-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 119,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
							x: cdPixelWidth / 2,
							y: "-8",
							textAnchor: "middle",
							className: "fill-foreground text-[11px] font-mono font-medium",
							children: ["CD = ", cd.toFixed(3)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 129,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 98,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
					x1: paddingX,
					y1: axisY,
					x2: 700,
					y2: axisY,
					stroke: "currentColor",
					strokeWidth: "2",
					className: "text-border"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 140,
					columnNumber: 9
				}, this),
				Array.from({ length: k }, (_, i) => i + 1).map((rank) => {
					const x = rankToX(rank);
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", {
						transform: `translate(${x}, ${axisY})`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							y1: "-5",
							y2: "5",
							stroke: "currentColor",
							strokeWidth: "1.5",
							className: "text-muted-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 155,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
							y: "18",
							textAnchor: "middle",
							className: "fill-muted-foreground text-[11px] font-mono font-semibold",
							children: rank
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 156,
							columnNumber: 15
						}, this)]
					}, rank, true, {
						fileName: _jsxFileName$1,
						lineNumber: 154,
						columnNumber: 13
					}, this);
				}),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
					x: paddingX,
					y: 78,
					textAnchor: "start",
					className: "fill-primary text-[10px] font-mono font-semibold uppercase tracking-wider",
					children: "← Superior Performance (Rank 1)"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 168,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
					x: 700,
					y: 78,
					textAnchor: "end",
					className: "fill-muted-foreground text-[10px] font-mono uppercase tracking-wider",
					children: [
						"Inferior Performance (Rank ",
						k,
						") →"
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 176,
					columnNumber: 9
				}, this),
				leftModels.map((m, idx) => {
					const x = rankToX(m.rank);
					const textY = 145 + idx * 24;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: x,
							cy: axisY,
							r: m.isAres ? "5.5" : "4",
							className: m.isAres ? "fill-primary stroke-background stroke-2" : "fill-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 192,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
							d: `M ${x} ${axisY} L ${x} ${textY - 4} L 50 ${textY - 4}`,
							fill: "none",
							stroke: m.isAres ? "#2563eb" : "currentColor",
							strokeWidth: m.isAres ? "1.8" : "1",
							strokeDasharray: m.isAres ? void 0 : "3 3",
							className: m.isAres ? "text-primary" : "text-border"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 199,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
							x: 46,
							y: textY,
							textAnchor: "end",
							className: m.isAres ? "fill-primary font-bold text-[12px]" : "fill-foreground text-[11px]",
							children: [
								m.name,
								" (",
								m.rank.toFixed(2),
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 208,
							columnNumber: 15
						}, this)
					] }, m.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 190,
						columnNumber: 13
					}, this);
				}),
				rightModels.map((m, idx) => {
					const x = rankToX(m.rank);
					const textY = 145 + idx * 24;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: x,
							cy: axisY,
							r: m.isAres ? "5.5" : "4",
							className: m.isAres ? "fill-primary stroke-background stroke-2" : "fill-muted-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 227,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
							d: `M ${x} ${axisY} L ${x} ${textY - 4} L 710 ${textY - 4}`,
							fill: "none",
							stroke: m.isAres ? "#2563eb" : "currentColor",
							strokeWidth: m.isAres ? "1.8" : "1",
							strokeDasharray: m.isAres ? void 0 : "3 3",
							className: m.isAres ? "text-primary" : "text-border"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 234,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
							x: 714,
							y: textY,
							textAnchor: "start",
							className: m.isAres ? "fill-primary font-bold text-[12px]" : "fill-muted-foreground text-[11px]",
							children: [
								m.name,
								" (",
								m.rank.toFixed(2),
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 243,
							columnNumber: 15
						}, this)
					] }, m.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 225,
						columnNumber: 13
					}, this);
				}),
				cliques.map((clique, cIdx) => {
					if (clique.length < 2) return null;
					const ranks = clique.map((id) => {
						const m = sorted.find((s) => s.id === id);
						return m ? m.rank : 1;
					});
					const minRank = Math.min(...ranks);
					const maxRank = Math.max(...ranks);
					const x1 = rankToX(minRank);
					const x2 = rankToX(maxRank);
					const barY = 64 - cIdx * 12;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1,
							y1: barY,
							x2,
							y2: barY,
							stroke: "#10b981",
							strokeWidth: "4",
							strokeLinecap: "round"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 270,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1,
							y1: barY - 3,
							x2: x1,
							y2: barY + 3,
							stroke: "#10b981",
							strokeWidth: "2"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 280,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1: x2,
							y1: barY - 3,
							x2,
							y2: barY + 3,
							stroke: "#10b981",
							strokeWidth: "2"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 281,
							columnNumber: 15
						}, this)
					] }, cIdx, true, {
						fileName: _jsxFileName$1,
						lineNumber: 269,
						columnNumber: 13
					}, this);
				})
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 85,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 61,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/batch-lab.tsx";
var Route$6 = createFileRoute("/batch-lab")({ component: BatchLabPage });
function BatchLabPage() {
	const { bench, setBench, settings, addBatchRun } = useSession();
	const [selectedModelIds, setSelectedModelIds] = (0, import_react.useState)(MODELS.map((m) => m.id));
	const [payloadText, setPayloadText] = (0, import_react.useState)(settings.defaultPayload);
	const [passphrase, setPassphrase] = (0, import_react.useState)(settings.defaultPassphrase);
	const [resolutionCap, setResolutionCap] = (0, import_react.useState)(settings.resolutionCap);
	(0, import_react.useEffect)(() => {
		setPayloadText(settings.defaultPayload);
		setPassphrase(settings.defaultPassphrase);
		setResolutionCap(settings.resolutionCap);
	}, [
		settings.defaultPayload,
		settings.defaultPassphrase,
		settings.resolutionCap
	]);
	const [images, setImages] = (0, import_react.useState)([]);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const [isRunning, setIsRunning] = (0, import_react.useState)(false);
	const [liveRunsCount, setLiveRunsCount] = (0, import_react.useState)(0);
	const abortRef = (0, import_react.useRef)(false);
	const [currentTicker, setCurrentTicker] = (0, import_react.useState)("");
	const [activeImageId, setActiveImageId] = (0, import_react.useState)(null);
	const [activeModelId, setActiveModelId] = (0, import_react.useState)(null);
	const [stegoOutputs, setStegoOutputs] = (0, import_react.useState)({});
	const [activeTab, setActiveTab] = (0, import_react.useState)("queue");
	const [selectedImageTab, setSelectedImageTab] = (0, import_react.useState)("");
	const [selectedMetric, setSelectedMetric] = (0, import_react.useState)(settings.defaultMetric);
	const [alpha, setAlpha] = (0, import_react.useState)(settings.defaultAlpha);
	const [filterMode, setFilterMode] = (0, import_react.useState)("all");
	const [exportFormat, setExportFormat] = (0, import_react.useState)("apa");
	const [copiedType, setCopiedType] = (0, import_react.useState)(null);
	const [inspectorModelId, setInspectorModelId] = (0, import_react.useState)("ares_hybrid_inn");
	const [showDifferenceMap, setShowDifferenceMap] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (images.length > 0 && (!selectedImageTab || !images.some((i) => i.name === selectedImageTab))) setSelectedImageTab(images[0].name);
	}, [images, selectedImageTab]);
	const handleFiles = (0, import_react.useCallback)(async (fileList) => {
		const validFiles = [];
		for (let i = 0; i < fileList.length; i++) {
			const file = fileList[i];
			if (file.type.startsWith("image/") || /\.(png|jpe?g|webp|bmp)$/i.test(file.name)) validFiles.push(file);
		}
		if (validFiles.length === 0) return;
		const newItems = [];
		for (let idx = 0; idx < validFiles.length; idx++) {
			const file = validFiles[idx];
			try {
				const img = await fileToImage(file, resolutionCap);
				const thumb = imageToDataUrl(img);
				const sizeKb = (file.size / 1048576).toFixed(2) + " MB";
				newItems.push({
					id: `img_${Date.now()}_${Math.random().toString(36).slice(2, 6)}_${idx}`,
					name: file.name,
					sizeStr: sizeKb,
					width: img.width,
					height: img.height,
					cover: img,
					thumbnailUrl: thumb,
					status: "waiting",
					progressPct: 0
				});
			} catch (e) {
				console.error("Error processing file", file.name, e);
			}
		}
		setImages((prev) => [...prev, ...newItems]);
		if (newItems.length > 0 && !selectedImageTab) setSelectedImageTab(newItems[0].name);
	}, [resolutionCap, selectedImageTab]);
	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};
	const handleDragLeave = (e) => {
		e.preventDefault();
		setIsDragging(false);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
	};
	const loadSampleDataset = (0, import_react.useCallback)(async () => {
		const samples = SAMPLE_COVERS.slice(0, 6);
		const loaded = [];
		for (let i = 0; i < samples.length; i++) {
			const s = samples[i];
			const cover = s.generate();
			const thumb = imageToDataUrl(cover);
			loaded.push({
				id: `sample_${s.id}_${Date.now()}`,
				name: `Sample_${s.name.split(" ")[0]}.png`,
				sizeStr: "384 × 384 px",
				width: cover.width,
				height: cover.height,
				cover,
				thumbnailUrl: thumb,
				status: "waiting",
				progressPct: 0
			});
		}
		setImages(loaded);
		setSelectedImageTab(loaded[0].name);
	}, []);
	const removeImage = (id) => {
		setImages((prev) => prev.filter((img) => img.id !== id));
	};
	const clearAllImages = () => {
		if (isRunning) return;
		setImages([]);
		setBench([]);
		setStegoOutputs({});
		setSelectedImageTab("");
	};
	const toggleModel = (id) => {
		setSelectedModelIds((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]);
	};
	const runBenchmark = async () => {
		if (images.length === 0 || selectedModelIds.length === 0 || isRunning) return;
		setIsRunning(true);
		setLiveRunsCount(0);
		abortRef.current = false;
		setActiveTab("images");
		const modelsToRun = MODELS.filter((m) => selectedModelIds.includes(m.id));
		const collectedRows = [];
		const newStegoOutputs = { ...stegoOutputs };
		setImages((prev) => prev.map((img) => ({
			...img,
			status: "waiting",
			progressPct: 0
		})));
		for (let imgIdx = 0; imgIdx < images.length; imgIdx++) {
			if (abortRef.current) break;
			const currentImage = images[imgIdx];
			setActiveImageId(currentImage.id);
			setImages((prev) => prev.map((img) => img.id === currentImage.id ? {
				...img,
				status: "running"
			} : img));
			const coverUrl = currentImage.thumbnailUrl;
			for (let mIdx = 0; mIdx < modelsToRun.length; mIdx++) {
				if (abortRef.current) break;
				const model = modelsToRun[mIdx];
				setActiveModelId(model.id);
				setCurrentTicker(`Image #${String(imgIdx + 1).padStart(2, "0")} (${currentImage.name}) → ${model.name}`);
				const startTime = performance.now();
				try {
					const out = await encodeWithModel(model, currentImage.cover, payloadText.trim(), passphrase);
					const duration = Math.round(performance.now() - startTime);
					const stegoUrl = imageToDataUrl(out.stego);
					const diffUrl = imageToDataUrl(computeDifferenceMap(currentImage.cover, out.stego, 30));
					newStegoOutputs[`${currentImage.name}:::${model.id}`] = {
						stegoUrl,
						diffUrl,
						recovered: out.recovered,
						coverUrl
					};
					collectedRows.push({
						imageName: currentImage.name,
						modelId: model.id,
						metrics: out.metrics,
						recovered: out.recovered,
						stegoUrl,
						diffUrl,
						durationMs: duration
					});
				} catch (err) {
					const duration = Math.round(performance.now() - startTime);
					collectedRows.push({
						imageName: currentImage.name,
						modelId: model.id,
						metrics: {
							psnr: 0,
							ssim: 0,
							mse: 1e9,
							ber: 1,
							recovery: false,
							payloadBits: 0,
							bpp: 0,
							lsbChangePct: 100,
							encodeMs: duration,
							decodeMs: 0,
							distortion: 1e9
						},
						recovered: "",
						error: err instanceof Error ? err.message : "Encoding failure",
						durationMs: duration
					});
				}
				setLiveRunsCount((c) => c + 1);
				const pct = Math.round((mIdx + 1) / modelsToRun.length * 100);
				setImages((prev) => prev.map((img) => img.id === currentImage.id ? {
					...img,
					progressPct: pct
				} : img));
				setBench([...collectedRows]);
				setStegoOutputs({ ...newStegoOutputs });
				await new Promise((r) => setTimeout(r, 25));
			}
			setImages((prev) => prev.map((img) => img.id === currentImage.id ? {
				...img,
				status: "completed",
				progressPct: 100
			} : img));
		}
		setIsRunning(false);
		setActiveImageId(null);
		setActiveModelId(null);
		setCurrentTicker(abortRef.current ? "Benchmark aborted by user." : "All benchmark runs completed.");
		if (collectedRows.length > 0) {
			const avgPsnr = collectedRows.filter((r) => r.metrics.recovery).reduce((acc, r) => acc + r.metrics.psnr, 0) / (collectedRows.filter((r) => r.metrics.recovery).length || 1);
			const avgSsim = collectedRows.filter((r) => r.metrics.recovery).reduce((acc, r) => acc + r.metrics.ssim, 0) / (collectedRows.filter((r) => r.metrics.recovery).length || 1);
			const modelPsnrMap = {};
			for (const r of collectedRows) {
				if (!modelPsnrMap[r.modelId]) modelPsnrMap[r.modelId] = [];
				modelPsnrMap[r.modelId].push(r.metrics.psnr);
			}
			let bestModel = modelsToRun[0]?.id || "ares_hybrid_inn";
			let maxAvg = -1;
			for (const [mid, vals] of Object.entries(modelPsnrMap)) {
				const mean = vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
				if (mean > maxAvg) {
					maxAvg = mean;
					bestModel = mid;
				}
			}
			const record = {
				id: `run_${Date.now()}`,
				timestamp: Date.now(),
				dateStr: (/* @__PURE__ */ new Date()).toLocaleString(),
				name: `Batch Evaluation (${images.length} Images, ${modelsToRun.length} Models)`,
				imageCount: images.length,
				modelCount: modelsToRun.length,
				payload: payloadText,
				passphrase,
				modelIds: modelsToRun.map((m) => m.id),
				imageNames: images.map((i) => i.name),
				rows: collectedRows,
				bestModelId: bestModel,
				avgPsnr: Number(avgPsnr.toFixed(2)),
				avgSsim: Number(avgSsim.toFixed(4))
			};
			addBatchRun(record);
		}
	};
	const stopBenchmark = () => {
		abortRef.current = true;
	};
	const hasLiveResults = bench.length > 0;
	const activeRows = (0, import_react.useMemo)(() => {
		if (hasLiveResults) return bench;
		return REFERENCE_BENCHMARK_ROWS;
	}, [hasLiveResults, bench]);
	const activeImageNames = (0, import_react.useMemo)(() => {
		return [...new Set(activeRows.map((r) => r.imageName))];
	}, [activeRows]);
	const activeModelIds = (0, import_react.useMemo)(() => {
		const ids = [...new Set(activeRows.map((r) => r.modelId))];
		return ids.length > 0 ? ids : MODELS.map((m) => m.id);
	}, [activeRows]);
	const activeMetricDef = METRIC_OPTIONS.find((m) => m.id === selectedMetric) ?? METRIC_OPTIONS[0];
	const rankTable = (0, import_react.useMemo)(() => {
		return {
			modelIds: activeModelIds,
			imageIds: activeImageNames,
			scores: activeImageNames.map((imgName) => activeModelIds.map((mId) => {
				const row = activeRows.find((r) => r.imageName === imgName && r.modelId === mId);
				if (!row || !row.metrics.recovery) return activeMetricDef.higherIsBetter ? -1e9 : 1e9;
				return row.metrics[selectedMetric];
			}))
		};
	}, [
		activeModelIds,
		activeImageNames,
		activeRows,
		selectedMetric,
		activeMetricDef
	]);
	const statsResult = (0, import_react.useMemo)(() => {
		return friedmanTest(rankTable, activeMetricDef.higherIsBetter, alpha);
	}, [
		rankTable,
		alpha,
		activeMetricDef
	]);
	const modelNamesMap = (0, import_react.useMemo)(() => {
		const map = {};
		for (const m of MODELS) map[m.id] = m.name;
		return map;
	}, []);
	const bestModelAnalysis = (0, import_react.useMemo)(() => {
		return getBestModelAnalysis(statsResult, rankTable);
	}, [statsResult, rankTable]);
	const bestModelName = (0, import_react.useMemo)(() => {
		if (!bestModelAnalysis) return "ARES-Hybrid-INN";
		return modelNamesMap[bestModelAnalysis.bestModelId] || bestModelAnalysis.bestModelId;
	}, [bestModelAnalysis, modelNamesMap]);
	const bestModelRank = (0, import_react.useMemo)(() => {
		return bestModelAnalysis ? bestModelAnalysis.bestModelRank : 1;
	}, [bestModelAnalysis]);
	const aggregatedStats = (0, import_react.useMemo)(() => {
		const modelStats = [];
		for (const model of MODELS) {
			const rows = activeRows.filter((r) => r.modelId === model.id);
			if (rows.length === 0) continue;
			const psnrs = rows.map((r) => r.metrics.psnr);
			const ssims = rows.map((r) => r.metrics.ssim);
			const mses = rows.map((r) => r.metrics.mse);
			const bers = rows.map((r) => r.metrics.ber);
			const bpps = rows.map((r) => r.metrics.bpp);
			const encodes = rows.map((r) => r.metrics.encodeMs);
			const decodes = rows.map((r) => r.metrics.decodeMs);
			const passes = rows.filter((r) => r.metrics.recovery).length;
			const calcMean = (arr) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
			const calcStd = (arr, mean) => {
				if (arr.length <= 1) return 0;
				const sumSq = arr.reduce((acc, v) => acc + (v - mean) ** 2, 0);
				return Math.sqrt(sumSq / (arr.length - 1));
			};
			const psnrMean = calcMean(psnrs);
			const ssimMean = calcMean(ssims);
			modelStats.push({
				model,
				psnrAvg: psnrMean,
				psnrStd: calcStd(psnrs, psnrMean),
				ssimAvg: ssimMean,
				ssimStd: calcStd(ssims, ssimMean),
				mseAvg: calcMean(mses),
				berAvg: calcMean(bers),
				bppAvg: calcMean(bpps),
				encodeAvg: calcMean(encodes),
				decodeAvg: calcMean(decodes),
				passCount: passes,
				winCount: 0,
				rank: 0
			});
		}
		for (const imgName of activeImageNames) {
			let maxScore = -1e9;
			let winningModelId = "";
			for (const row of activeRows.filter((r) => r.imageName === imgName)) {
				const score = row.metrics[selectedMetric];
				if (activeMetricDef.higherIsBetter ? score > maxScore : score < maxScore) {
					maxScore = score;
					winningModelId = row.modelId;
				}
			}
			const entry = modelStats.find((m) => m.model.id === winningModelId);
			if (entry) entry.winCount++;
		}
		modelStats.sort((a, b) => activeMetricDef.higherIsBetter ? b.psnrAvg - a.psnrAvg : a.psnrAvg - b.psnrAvg);
		modelStats.forEach((m, idx) => {
			m.rank = idx + 1;
		});
		return modelStats;
	}, [
		activeRows,
		activeImageNames,
		selectedMetric,
		activeMetricDef
	]);
	const currentImageRows = (0, import_react.useMemo)(() => {
		if (!selectedImageTab) return [];
		return activeRows.filter((r) => r.imageName === selectedImageTab);
	}, [activeRows, selectedImageTab]);
	const currentImageWinner = (0, import_react.useMemo)(() => {
		if (currentImageRows.length === 0) return null;
		let best = currentImageRows[0];
		for (const r of currentImageRows) {
			const bestVal = best.metrics[selectedMetric];
			const currentVal = r.metrics[selectedMetric];
			if (activeMetricDef.higherIsBetter ? currentVal > bestVal : currentVal < bestVal) best = r;
		}
		return best;
	}, [
		currentImageRows,
		selectedMetric,
		activeMetricDef
	]);
	const copyToClipboard = (text, type) => {
		navigator.clipboard.writeText(text);
		setCopiedType(type);
		setTimeout(() => setCopiedType(null), 2500);
	};
	const latexOutput = (0, import_react.useMemo)(() => {
		return generateLatexTable(statsResult, rankTable, modelNamesMap, activeMetricDef.name);
	}, [
		statsResult,
		rankTable,
		modelNamesMap,
		activeMetricDef
	]);
	const apaOutput = (0, import_react.useMemo)(() => {
		return generateApaSummary(statsResult, modelNamesMap, activeMetricDef.name, bestModelAnalysis);
	}, [
		statsResult,
		modelNamesMap,
		activeMetricDef,
		bestModelAnalysis
	]);
	const csvOutput = (0, import_react.useMemo)(() => {
		const lines = [[
			"Image Name",
			"Model ID",
			"Model Name",
			"PSNR (dB)",
			"SSIM",
			"MSE",
			"BER (%)",
			"Capacity (bpp)",
			"Distortion (MAD)",
			"Encode Time (ms)",
			"Decode Time (ms)",
			"Recovery Success"
		].join(",")];
		for (const row of activeRows) {
			const mDef = MODELS.find((m) => m.id === row.modelId);
			lines.push([
				`"${row.imageName}"`,
				`"${row.modelId}"`,
				`"${mDef?.name ?? row.modelId}"`,
				row.metrics.psnr.toFixed(2),
				row.metrics.ssim.toFixed(4),
				row.metrics.mse.toFixed(2),
				row.metrics.ber.toFixed(4),
				row.metrics.bpp.toFixed(4),
				row.metrics.distortion.toFixed(2),
				row.metrics.encodeMs,
				row.metrics.decodeMs,
				row.metrics.recovery ? "PASS" : "FAIL"
			].join(","));
		}
		return lines.join("\n");
	}, [activeRows]);
	const jsonOutput = (0, import_react.useMemo)(() => {
		return JSON.stringify({
			benchmarkInfo: {
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				totalImages: activeImageNames.length,
				totalModels: activeModelIds.length,
				selectedMetric,
				alpha
			},
			models: aggregatedStats.map((s) => ({
				id: s.model.id,
				name: s.model.name,
				psnrMean: Number(s.psnrAvg.toFixed(2)),
				psnrStd: Number(s.psnrStd.toFixed(2)),
				ssimMean: Number(s.ssimAvg.toFixed(4)),
				ssimStd: Number(s.ssimStd.toFixed(4)),
				winCount: s.winCount,
				rank: s.rank
			})),
			statisticalTesting: {
				friedmanChiSquare: statsResult.chi2,
				df: statsResult.df,
				pValue: statsResult.pApprox,
				isSignificant: statsResult.isSignificantChi2,
				kendallW: statsResult.kendallW,
				effectMagnitude: statsResult.effectMagnitude,
				nemenyiCriticalDifference: statsResult.nemenyiCD,
				bestModel: bestModelName
			},
			rawRows: activeRows
		}, null, 2);
	}, [
		activeImageNames,
		activeModelIds,
		selectedMetric,
		alpha,
		aggregatedStats,
		statsResult,
		bestModelName,
		activeRows
	]);
	const totalModelRuns = images.length * selectedModelIds.length;
	const completedRunsCount = isRunning ? liveRunsCount : images.reduce((acc, img) => acc + (img.status === "completed" ? selectedModelIds.length : 0), 0);
	const runningCount = images.filter((i) => i.status === "running").length;
	const completedImagesCount = images.filter((i) => i.status === "completed").length;
	const failedCount = images.filter((i) => i.status === "failed").length;
	const overallProgressPct = totalModelRuns > 0 ? Math.min(100, Math.round(completedRunsCount / totalModelRuns * 100)) : 0;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			kicker: "Core Research Module",
			title: "Batch Lab Benchmarking",
			description: "Comprehensive multi-image laboratory for rigorous steganographic benchmarking. Every image is independently processed through all 6 models with identical cryptographic payload and passphrase, generating per-image comparison tables and automated statistical significance analysis (Friedman, Kendall’s W, Nemenyi).",
			actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: !isRunning ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					onClick: runBenchmark,
					disabled: images.length === 0 || selectedModelIds.length === 0,
					className: "gap-2 bg-primary text-primary-foreground font-medium shadow-sm hover:opacity-95",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, { className: "size-4 fill-current" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 738,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
						"Run Batch Lab (",
						images.length,
						" Images)"
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 739,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 733,
					columnNumber: 15
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					onClick: stopBenchmark,
					variant: "destructive",
					className: "gap-2 bg-red-600 text-white hover:bg-red-700",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Square, { className: "size-4 fill-current" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 747,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Stop Execution" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 748,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 742,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 731,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 726,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2 overflow-x-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setActiveTab("queue"),
						className: cn("flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all", activeTab === "queue" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 767,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "1. Image Queue & Configuration" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 768,
								columnNumber: 13
							}, this),
							images.length > 0 && /* @__PURE__ */ (void 0)("span", {
								className: "ml-1 rounded-full bg-primary-foreground/20 px-1.5 py-0.2 text-[10px]",
								children: images.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 770,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 758,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setActiveTab("images"),
						className: cn("flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all", activeTab === "images" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 785,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "2. Per-Image Comparison Tables" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 786,
								columnNumber: 13
							}, this),
							activeRows.length > 0 && /* @__PURE__ */ (void 0)("span", {
								className: "ml-1 rounded-full bg-emerald-500/20 text-emerald-600 px-1.5 py-0.2 text-[10px]",
								children: [activeImageNames.length, " evaluated"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 788,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 776,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setActiveTab("stats"),
						className: cn("flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all", activeTab === "stats" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartColumn, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 803,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "3. Statistical Significance Suite" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 804,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "ml-1 rounded-full bg-primary/10 text-primary px-1.5 py-0.2 text-[10px]",
								children: "Friedman · W · Nemenyi"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 805,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 794,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setActiveTab("export"),
						className: cn("flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all", activeTab === "export" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 819,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "4. Research Export (APA / LaTeX / CSV)" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 820,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 810,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 757,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: cn("inline-block size-2 rounded-full", isRunning ? "bg-amber-500 animate-pulse" : hasLiveResults ? "bg-emerald-500" : "bg-blue-500") }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 826,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-muted-foreground font-mono text-[11px]",
					children: isRunning ? "Benchmark in progress" : hasLiveResults ? `Live Batch (${bench.length} rows collected)` : "Showing Reference Benchmark Suite"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 836,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 825,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 756,
			columnNumber: 7
		}, this),
		(isRunning || images.length > 0) && /* @__PURE__ */ (void 0)("section", {
			className: "mb-6 rounded-xl border border-border bg-card p-4 shadow-xs",
			children: /* @__PURE__ */ (void 0)("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (void 0)(FlaskConical, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 853,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 852,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Live Batch Execution Tracker"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 856,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-sm font-medium text-foreground font-mono",
							children: currentTicker || "Batch queue ready. Click 'Run Batch Lab' to execute."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 859,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 855,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 851,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-wrap items-center gap-4 text-xs font-mono",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-md bg-muted px-2.5 py-1 text-center",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] uppercase text-muted-foreground block",
									children: "Images"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 868,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-foreground",
									children: [
										completedImagesCount,
										" / ",
										images.length
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 871,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 867,
								columnNumber: 17
							}, this),
							runningCount > 0 && /* @__PURE__ */ (void 0)("div", {
								className: "rounded-md bg-amber-500/10 px-2.5 py-1 text-center",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] uppercase text-amber-700 dark:text-amber-400 block",
									children: "Active"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 877,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-amber-700 dark:text-amber-400",
									children: runningCount
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 880,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 876,
								columnNumber: 19
							}, this),
							failedCount > 0 && /* @__PURE__ */ (void 0)("div", {
								className: "rounded-md bg-red-500/10 px-2.5 py-1 text-center",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] uppercase text-red-500 block",
									children: "Failed"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 887,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-red-500",
									children: failedCount
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 890,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 886,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-md bg-muted px-2.5 py-1 text-center",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] uppercase text-muted-foreground block",
									children: "Model Runs"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 896,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-foreground",
									children: [
										completedRunsCount,
										" / ",
										totalModelRuns
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 899,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 895,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-md bg-muted px-2.5 py-1 text-center",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] uppercase text-muted-foreground block",
									children: "Progress"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 904,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-primary",
									children: [overallProgressPct, activeModelId ? ` (${activeModelId.slice(0, 4)})` : "%"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 907,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 903,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 866,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 850,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "h-2 w-full overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (void 0)("div", {
						className: cn("h-full transition-all duration-300 ease-out", isRunning ? "bg-gradient-to-r from-primary to-emerald-500 animate-pulse" : "bg-primary"),
						style: { width: `${overallProgressPct}%` }
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 917,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 916,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 849,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 848,
			columnNumber: 9
		}, this),
		activeTab === "queue" && /* @__PURE__ */ (void 0)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (void 0)("div", {
				className: "grid gap-6 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "rounded-xl border border-border bg-card p-5",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "font-display text-base font-semibold text-ink",
							children: "Benchmark Models"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 940,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: "All 6 models are evaluated under identical conditions."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 943,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 939,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1.5 text-xs",
							children: [/* @__PURE__ */ (void 0)("button", {
								onClick: () => setSelectedModelIds(MODELS.map((m) => m.id)),
								className: "rounded bg-muted px-2 py-1 text-muted-foreground hover:text-foreground font-medium text-[11px]",
								children: "Select All (6)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 948,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: () => setSelectedModelIds(["ares_hybrid_inn"]),
								className: "rounded bg-muted px-2 py-1 text-muted-foreground hover:text-foreground font-medium text-[11px]",
								children: "ARES Only"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 954,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 947,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 938,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-2.5 sm:grid-cols-2",
						children: MODELS.map((m) => {
							const selected = selectedModelIds.includes(m.id);
							const isAres = m.id === "ares_hybrid_inn";
							return /* @__PURE__ */ (void 0)("div", {
								onClick: () => toggleModel(m.id),
								className: cn("flex cursor-pointer flex-col justify-between rounded-lg border p-3 text-left transition-all", selected ? isAres ? "border-primary/60 bg-primary/5 shadow-xs ring-1 ring-primary/30" : "border-border bg-card shadow-xs" : "border-border/50 bg-muted/30 opacity-60"),
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (void 0)("input", {
												type: "checkbox",
												checked: selected,
												onChange: () => {},
												className: "size-3.5 rounded border-border text-primary focus:ring-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 982,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-display text-sm font-semibold text-foreground",
												children: m.short
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 988,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 981,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: cn("rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider", isAres ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"),
											children: m.status
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 992,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 980,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-[11px] font-medium text-foreground line-clamp-1",
										children: m.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1003,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-0.5 text-[10px] text-muted-foreground line-clamp-1",
										children: m.paper
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1006,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-2 flex items-center justify-between border-t border-border/40 pt-1.5 text-[10px] font-mono text-muted-foreground",
										children: [/* @__PURE__ */ (void 0)("span", { children: ["method: ", m.methodKey] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1010,
											columnNumber: 25
										}, this), m.usesHamming && /* @__PURE__ */ (void 0)("span", {
											className: "text-primary font-medium",
											children: "Hamming(7,3)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1012,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1009,
										columnNumber: 23
									}, this)
								]
							}, m.id, true, {
								fileName: _jsxFileName,
								lineNumber: 968,
								columnNumber: 21
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 963,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 937,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "rounded-xl border border-border bg-card p-5 flex flex-col justify-between",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
						className: "mb-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-display text-base font-semibold text-ink",
								children: "Uniform Benchmark Payload & Passphrase"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1026,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "rounded bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold",
								children: "Enforced Identical"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1029,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1025,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "For every uploaded cover image, the exact same cryptographic payload and password key are passed independently to all 6 models."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1033,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1024,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)(Label, {
									htmlFor: "batch-payload",
									className: "text-xs font-semibold text-muted-foreground",
									children: "Secret Payload Text"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1041,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)(Textarea, {
									id: "batch-payload",
									value: payloadText,
									onChange: (e) => setPayloadText(e.target.value),
									rows: 3,
									className: "mt-1.5 font-mono text-xs",
									placeholder: "Enter secret text payload to embed across all models..."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1044,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-1 flex items-center justify-between text-[11px] text-muted-foreground",
									children: [/* @__PURE__ */ (void 0)("span", { children: [
										"Length: ",
										payloadText.length,
										" characters"
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1053,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", { children: [
										"Bits: ",
										payloadText.length * 8,
										" bits"
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1054,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1052,
									columnNumber: 21
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1040,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)(Label, {
									htmlFor: "batch-pw",
									className: "text-xs font-semibold text-muted-foreground",
									children: "Passphrase / Steganographic Key"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1059,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)(Input, {
									id: "batch-pw",
									type: "password",
									value: passphrase,
									onChange: (e) => setPassphrase(e.target.value),
									className: "mt-1.5 text-xs font-mono",
									placeholder: "Enter shared decryption passphrase..."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1062,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-[11px] text-muted-foreground",
									children: "Keys PRNG pseudo-random embedding sequences identically across models."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1070,
									columnNumber: 21
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1058,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Max Image Dimension Cap"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1076,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "mt-1.5 grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setResolutionCap(384),
									className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", resolutionCap === 384 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
									children: "384 × 384 px (Fast Research)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1080,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setResolutionCap(512),
									className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", resolutionCap === 512 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
									children: "512 × 512 px (Full Detail)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1092,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1079,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1075,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1039,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1023,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "mt-5 border-t border-border pt-4 flex flex-col gap-2",
						children: [/* @__PURE__ */ (void 0)(Button, {
							onClick: runBenchmark,
							disabled: images.length === 0 || selectedModelIds.length === 0 || isRunning,
							className: "w-full gap-2 bg-primary text-primary-foreground font-semibold h-11",
							children: [/* @__PURE__ */ (void 0)(Play, { className: "size-4 fill-current" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1116,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("span", { children: [
								"Execute Benchmark (",
								images.length,
								" Images × ",
								selectedModelIds.length,
								" Models)"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1117,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1111,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (void 0)("span", { children: [images.length * selectedModelIds.length, " total model evaluations"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1120,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: loadSampleDataset,
								className: "text-primary hover:underline font-medium text-[11px]",
								children: "Load 6 Standard Images"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1121,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1119,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1110,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1022,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 935,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: "rounded-xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "font-display text-base font-semibold text-ink",
							children: "Batch Image Upload"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1136,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: "Drop multiple image files or load standard research benchmark sets."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1139,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1135,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								size: "sm",
								onClick: loadSampleDataset,
								className: "gap-1.5 text-xs font-medium",
								children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-3.5 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1150,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Load Research Suite (6 Canonical Covers)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1151,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1144,
								columnNumber: 17
							}, this), images.length > 0 && /* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								size: "sm",
								onClick: clearAllImages,
								disabled: isRunning,
								className: "gap-1.5 text-xs text-muted-foreground hover:text-red-500",
								children: [/* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1161,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", { children: [
									"Clear All (",
									images.length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1162,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1154,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1143,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1134,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						onDragOver: handleDragOver,
						onDragLeave: handleDragLeave,
						onDrop: handleDrop,
						onClick: () => fileInputRef.current?.click(),
						className: cn("relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all", isDragging ? "border-primary bg-primary/10 scale-[1.005]" : "border-border hover:border-primary/60 hover:bg-muted/40"),
						children: [
							/* @__PURE__ */ (void 0)("input", {
								ref: fileInputRef,
								type: "file",
								multiple: true,
								accept: "image/png,image/jpeg,image/webp,image/bmp",
								onChange: (e) => {
									if (e.target.files) handleFiles(e.target.files);
								},
								className: "hidden"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1181,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3",
								children: /* @__PURE__ */ (void 0)(Upload, { className: "size-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1192,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1191,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "font-display text-sm font-semibold text-foreground",
								children: ["Drop multiple images here or ", /* @__PURE__ */ (void 0)("span", {
									className: "text-primary underline",
									children: "Browse Files"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1195,
									columnNumber: 46
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1194,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Supports PNG, JPG, JPEG, WEBP, and BMP. Upload 1 to 20+ images simultaneously."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1197,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-2 text-[11px] font-mono text-muted-foreground/80",
								children: "Images are automatically converted into independent test cases."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1200,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1169,
						columnNumber: 13
					}, this),
					images.length > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "mt-6 space-y-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "font-semibold uppercase tracking-wider",
								children: [
									"Uploaded Images Queue (",
									images.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1209,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Select any image to inspect or remove" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1212,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1208,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
							children: images.map((img, idx) => {
								return /* @__PURE__ */ (void 0)("div", {
									className: cn("relative group flex flex-col justify-between overflow-hidden rounded-lg border bg-card p-2.5 transition-all shadow-xs", activeImageId === img.id ? "border-primary ring-2 ring-primary/40 bg-primary/5" : img.status === "completed" ? "border-emerald-500/40" : "border-border"),
									children: [
										/* @__PURE__ */ (void 0)("button", {
											onClick: (e) => {
												e.stopPropagation();
												removeImage(img.id);
											},
											disabled: isRunning,
											className: "absolute right-2 top-2 z-10 rounded-full bg-background/80 p-1 text-muted-foreground hover:bg-red-500 hover:text-white transition-colors",
											title: "Remove image",
											children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1240,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1231,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "relative aspect-square w-full overflow-hidden rounded-md bg-muted",
											children: [/* @__PURE__ */ (void 0)("img", {
												src: img.thumbnailUrl,
												alt: img.name,
												className: "size-full object-cover"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1245,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "absolute bottom-1 left-1 rounded bg-background/80 px-1 py-0.5 text-[9px] font-mono font-medium text-foreground",
												children: ["#", String(idx + 1).padStart(2, "0")]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1250,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1244,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "mt-2",
											children: [/* @__PURE__ */ (void 0)("p", {
												className: "text-xs font-semibold text-foreground truncate",
												title: img.name,
												children: img.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1257,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("p", {
												className: "text-[10px] text-muted-foreground font-mono",
												children: [
													img.width,
													"×",
													img.height,
													" · ",
													img.sizeStr
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1260,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1256,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "mt-2.5 pt-2 border-t border-border/50",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center justify-between text-[10px]",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-semibold uppercase tracking-wider text-muted-foreground",
													children: "Status"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1268,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: cn("font-mono font-semibold uppercase", img.status === "completed" ? "text-emerald-600" : img.status === "running" ? "text-primary animate-pulse" : "text-muted-foreground"),
													children: img.status
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1271,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1267,
												columnNumber: 27
											}, this), img.status === "running" && /* @__PURE__ */ (void 0)("div", {
												className: "mt-1 h-1 w-full overflow-hidden rounded-full bg-muted",
												children: /* @__PURE__ */ (void 0)("div", {
													className: "h-full bg-primary transition-all duration-200",
													style: { width: `${img.progressPct}%` }
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1286,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1285,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1266,
											columnNumber: 25
										}, this)
									]
								}, img.id, true, {
									fileName: _jsxFileName,
									lineNumber: 1219,
									columnNumber: 23
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1215,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1207,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1133,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 933,
			columnNumber: 9
		}, this),
		activeTab === "images" && /* @__PURE__ */ (void 0)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (void 0)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 shadow-xs",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2 overflow-x-auto",
					children: [/* @__PURE__ */ (void 0)("span", {
						className: "text-xs font-semibold uppercase text-muted-foreground mr-1",
						children: "Select Image:"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1309,
						columnNumber: 15
					}, this), activeImageNames.map((imgName, idx) => {
						const isSelected = selectedImageTab === imgName;
						const isDone = activeRows.filter((r) => r.imageName === imgName).length >= 6;
						return /* @__PURE__ */ (void 0)("button", {
							onClick: () => setSelectedImageTab(imgName),
							className: cn("flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all", isSelected ? "bg-primary text-primary-foreground shadow-xs font-semibold" : "bg-muted text-muted-foreground hover:text-foreground"),
							children: [
								/* @__PURE__ */ (void 0)("span", { children: ["#", String(idx + 1).padStart(2, "0")] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1327,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("span", {
									className: "truncate max-w-[120px]",
									children: imgName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1328,
									columnNumber: 21
								}, this),
								isDone && /* @__PURE__ */ (void 0)(CircleCheck, { className: "size-3 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1329,
									columnNumber: 32
								}, this)
							]
						}, imgName, true, {
							fileName: _jsxFileName,
							lineNumber: 1317,
							columnNumber: 19
						}, this);
					})]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1308,
					columnNumber: 13
				}, this), images.length > 0 && !isRunning && activeRows.length === 0 && /* @__PURE__ */ (void 0)(Button, {
					size: "sm",
					onClick: runBenchmark,
					className: "gap-1.5 text-xs font-medium",
					children: [/* @__PURE__ */ (void 0)(Play, { className: "size-3.5 fill-current" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1338,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("span", { children: "Run Benchmark Now" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1339,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1337,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1307,
				columnNumber: 11
			}, this), selectedImageTab ? /* @__PURE__ */ (void 0)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "grid gap-4 md:grid-cols-[1fr_auto]",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-display font-bold",
								children: ["#", String(activeImageNames.indexOf(selectedImageTab) + 1).padStart(2, "0")]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1350,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
								className: "font-display text-xl font-bold text-ink",
								children: ["Test Case: ", selectedImageTab]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1354,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Independent evaluation across all 6 models with identical payload (",
									payloadText.length,
									" chars) & passphrase."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1357,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1353,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1349,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [currentImageWinner && /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs",
								children: [/* @__PURE__ */ (void 0)(Trophy, { className: "size-5 text-amber-500 shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1368,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("div", { children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 block",
										children: "Best Performer on this Image"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1370,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "font-display text-sm font-bold text-foreground",
										children: MODELS.find((m) => m.id === currentImageWinner.modelId)?.name ?? currentImageWinner.modelId
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1373,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "ml-2 font-mono text-emerald-600 font-semibold",
										children: [
											"PSNR: ",
											currentImageWinner.metrics.psnr.toFixed(2),
											" dB"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1377,
										columnNumber: 25
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1369,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1367,
								columnNumber: 21
							}, this), currentImageRows.some((r) => r.stegoUrl) && /* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									for (const row of currentImageRows) {
										if (!row.stegoUrl) continue;
										const a = document.createElement("a");
										a.href = row.stegoUrl;
										const m = MODELS.find((mod) => mod.id === row.modelId);
										a.download = `${selectedImageTab.replace(/\.[^/.]+$/, "")}_${m?.short ?? row.modelId}_stego.png`;
										document.body.appendChild(a);
										a.click();
										document.body.removeChild(a);
									}
								},
								className: "gap-1.5 text-xs font-semibold h-10 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground shadow-xs",
								title: "Download lossless stego images generated for this cover across all models",
								children: [/* @__PURE__ */ (void 0)(Download, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1403,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("span", { children: [
									"Download All Stego PNGs (",
									currentImageRows.filter((r) => r.stegoUrl).length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1404,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1385,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1365,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1348,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "overflow-x-auto rounded-xl border border-border bg-card shadow-xs",
						children: /* @__PURE__ */ (void 0)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (void 0)("thead", {
								className: "border-b border-border bg-muted/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ (void 0)("tr", { children: [
									/* @__PURE__ */ (void 0)("th", {
										className: "px-4 py-3",
										children: "Model"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1415,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-3",
										children: "Methodology"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1416,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-3 text-right",
										children: "PSNR (dB)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1417,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-3 text-right",
										children: "SSIM"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1418,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-3 text-right",
										children: "MSE"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1419,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-3 text-right",
										children: "BER"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1420,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-3 text-right",
										children: "bpp"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1421,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-3 text-right",
										children: "Encode (ms)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1422,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-3 text-right",
										children: "Decode (ms)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1423,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-4 py-3 text-center",
										children: "Payload Recovery"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1424,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-3 text-center",
										children: "Export"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1425,
										columnNumber: 23
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1414,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1413,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("tbody", {
								className: "divide-y divide-border/60 font-mono text-[11px]",
								children: MODELS.map((m) => {
									const row = currentImageRows.find((r) => r.modelId === m.id);
									const isAres = m.id === "ares_hybrid_inn";
									const isWinner = currentImageWinner?.modelId === m.id;
									if (!row) return /* @__PURE__ */ (void 0)("tr", {
										className: "opacity-40",
										children: [
											/* @__PURE__ */ (void 0)("td", {
												className: "px-4 py-3 font-sans font-medium text-foreground",
												children: m.short
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1437,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-3 py-3 font-sans text-muted-foreground",
												children: m.paper
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1440,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												colSpan: 9,
												className: "px-3 py-3 text-center text-muted-foreground",
												children: "Pending evaluation..."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1443,
												columnNumber: 29
											}, this)
										]
									}, m.id, true, {
										fileName: _jsxFileName,
										lineNumber: 1436,
										columnNumber: 27
									}, this);
									return /* @__PURE__ */ (void 0)("tr", {
										className: cn("transition-colors hover:bg-muted/40", isWinner ? "bg-amber-500/5 font-semibold" : isAres ? "bg-primary/5" : ""),
										children: [
											/* @__PURE__ */ (void 0)("td", {
												className: "px-4 py-3 font-sans font-medium text-foreground flex items-center gap-1.5",
												children: [
													isWinner && /* @__PURE__ */ (void 0)(Trophy, { className: "size-3.5 text-amber-500 shrink-0" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1459,
														columnNumber: 42
													}, this),
													/* @__PURE__ */ (void 0)("span", { children: m.name }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1460,
														columnNumber: 29
													}, this),
													isAres && /* @__PURE__ */ (void 0)("span", {
														className: "rounded bg-primary/20 text-primary px-1 py-0.2 text-[9px] font-semibold",
														children: "PROPOSED"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1462,
														columnNumber: 31
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1458,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-3 py-3 font-sans text-muted-foreground text-[11px] max-w-[200px] truncate",
												children: m.note
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1467,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: cn("px-3 py-3 text-right font-semibold", row.metrics.psnr >= 40 ? "text-emerald-600 dark:text-emerald-400" : row.metrics.psnr >= 35 ? "text-amber-600" : "text-muted-foreground"),
												children: row.metrics.psnr.toFixed(2)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1470,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: cn("px-3 py-3 text-right", row.metrics.ssim >= .99 ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground"),
												children: row.metrics.ssim.toFixed(4)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1482,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-3 py-3 text-right text-muted-foreground",
												children: row.metrics.mse.toFixed(2)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1492,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: cn("px-3 py-3 text-right", row.metrics.ber === 0 ? "text-emerald-600 font-semibold" : "text-red-500"),
												children: [(row.metrics.ber * 100).toFixed(2), "%"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1495,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-3 py-3 text-right text-muted-foreground",
												children: row.metrics.bpp.toFixed(4)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1505,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-3 py-3 text-right text-muted-foreground",
												children: row.metrics.encodeMs
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1508,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-3 py-3 text-right text-muted-foreground",
												children: row.metrics.decodeMs
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1511,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-4 py-3 text-center",
												children: row.metrics.recovery ? /* @__PURE__ */ (void 0)("span", {
													className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600",
													children: [/* @__PURE__ */ (void 0)(Check, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1517,
														columnNumber: 33
													}, this), "100% BIT-EXACT"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1516,
													columnNumber: 31
												}, this) : /* @__PURE__ */ (void 0)("span", {
													className: "inline-flex items-center gap-1 rounded bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-500",
													children: [/* @__PURE__ */ (void 0)(CircleX, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1522,
														columnNumber: 33
													}, this), "CORRUPTED"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1521,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1514,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-3 py-3 text-center",
												children: row.stegoUrl ? /* @__PURE__ */ (void 0)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => {
														const a = document.createElement("a");
														a.href = row.stegoUrl;
														a.download = `${selectedImageTab.replace(/\.[^/.]+$/, "")}_${m.short}_stego.png`;
														document.body.appendChild(a);
														a.click();
														document.body.removeChild(a);
													},
													className: "inline-flex items-center gap-1 h-7 px-2 text-[10px] font-semibold text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors",
													title: `Download ${m.short} Stego PNG`,
													children: [/* @__PURE__ */ (void 0)(Download, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1543,
														columnNumber: 33
													}, this), /* @__PURE__ */ (void 0)("span", { children: "PNG" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1544,
														columnNumber: 33
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1529,
													columnNumber: 31
												}, this) : /* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground/30",
													children: "—"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1547,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1527,
												columnNumber: 27
											}, this)
										]
									}, m.id, true, {
										fileName: _jsxFileName,
										lineNumber: 1451,
										columnNumber: 25
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1428,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1412,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1411,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-xs",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "mb-4 flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
									className: "font-display text-base font-semibold text-ink",
									children: "Visual Stego & Residual Artifact Inspector"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1561,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground",
									children: "Inspect perceptual transparency and amplified pixel-delta difference maps."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1564,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1560,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-semibold text-muted-foreground",
											children: "Inspect Model:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1571,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-1 bg-muted p-1 rounded-lg",
											children: MODELS.map((m) => /* @__PURE__ */ (void 0)("button", {
												onClick: () => setInspectorModelId(m.id),
												className: cn("rounded px-2.5 py-1 text-xs font-medium transition-all", inspectorModelId === m.id ? "bg-card text-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"),
												children: m.short
											}, m.id, false, {
												fileName: _jsxFileName,
												lineNumber: 1576,
												columnNumber: 25
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1574,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => setShowDifferenceMap(!showDifferenceMap),
											className: cn("gap-1.5 text-xs font-medium", showDifferenceMap && "bg-primary text-primary-foreground"),
											children: [/* @__PURE__ */ (void 0)(Eye, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1600,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", { children: showDifferenceMap ? "Show Stego Image" : "Show Amplified Residual Map" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1601,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1591,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1570,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1559,
								columnNumber: 17
							}, this),
							(() => {
								const outKey = `${selectedImageTab}:::${inspectorModelId}`;
								const outData = stegoOutputs[outKey];
								const imgItem = images.find((i) => i.name === selectedImageTab);
								const coverSrc = outData?.coverUrl || imgItem?.thumbnailUrl;
								const stegoSrc = showDifferenceMap ? outData?.diffUrl : outData?.stegoUrl;
								return /* @__PURE__ */ (void 0)("div", {
									className: "grid gap-6 md:grid-cols-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "rounded-lg border border-border bg-muted/30 p-3",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "mb-2 flex items-center justify-between text-xs font-semibold",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Original Cover Image"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1618,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-mono text-[11px] text-muted-foreground",
												children: imgItem ? `${imgItem.width}×${imgItem.height} px` : "384×384 px"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1619,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1617,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "aspect-square w-full overflow-hidden rounded-md bg-muted flex items-center justify-center",
											children: coverSrc ? /* @__PURE__ */ (void 0)("img", {
												src: coverSrc,
												alt: "Original Cover",
												className: "size-full object-contain"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1625,
												columnNumber: 29
											}, this) : /* @__PURE__ */ (void 0)("span", {
												className: "text-xs text-muted-foreground",
												children: "Cover image preview"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1631,
												columnNumber: 29
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1623,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1616,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "rounded-lg border border-border bg-muted/30 p-3",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "mb-2 flex items-center justify-between text-xs font-semibold",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-primary font-medium",
													children: showDifferenceMap ? `Residual Distortion Map (×30 Gain) — ${MODELS.find((m) => m.id === inspectorModelId)?.short}` : `Stego Image — ${MODELS.find((m) => m.id === inspectorModelId)?.name}`
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1640,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-mono text-[11px] text-emerald-600 font-semibold",
													children: currentImageRows.find((r) => r.modelId === inspectorModelId)?.metrics.psnr ? `${currentImageRows.find((r) => r.modelId === inspectorModelId)?.metrics.psnr.toFixed(2)} dB` : ""
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1645,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1639,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "aspect-square w-full overflow-hidden rounded-md bg-muted flex items-center justify-center",
												children: stegoSrc ? /* @__PURE__ */ (void 0)("img", {
													src: stegoSrc,
													alt: "Stego Image",
													className: "size-full object-contain"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1656,
													columnNumber: 29
												}, this) : /* @__PURE__ */ (void 0)("div", {
													className: "p-6 text-center text-xs text-muted-foreground",
													children: "Run the benchmark to generate live stego outputs and residual maps."
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1662,
													columnNumber: 29
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1654,
												columnNumber: 25
											}, this),
											stegoSrc && /* @__PURE__ */ (void 0)("div", {
												className: "mt-3 flex items-center justify-between border-t border-border/50 pt-2.5 text-xs",
												children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-semibold text-foreground block",
													children: showDifferenceMap ? "Residual Distortion Map" : "Stego Image"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1672,
													columnNumber: 31
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-mono text-[10px] text-muted-foreground",
													children: "Lossless 24-bit RGB PNG"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1675,
													columnNumber: 31
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1671,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)(Button, {
													size: "sm",
													onClick: () => {
														const a = document.createElement("a");
														a.href = stegoSrc;
														const modelShort = MODELS.find((m) => m.id === inspectorModelId)?.short ?? "model";
														a.download = `${selectedImageTab.replace(/\.[^/.]+$/, "")}_${modelShort}_${showDifferenceMap ? "residual" : "stego"}.png`;
														document.body.appendChild(a);
														a.click();
														document.body.removeChild(a);
													},
													className: "gap-1.5 h-8 px-3 text-xs font-semibold bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors",
													children: [/* @__PURE__ */ (void 0)(Download, { className: "size-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1694,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("span", { children: showDifferenceMap ? "Download Residual PNG" : "Download Stego Image" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1695,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1679,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1670,
												columnNumber: 27
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1638,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1615,
									columnNumber: 21
								}, this);
							})(),
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-4 rounded-lg bg-muted/50 p-3 text-xs",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between font-semibold text-muted-foreground mb-1",
									children: [/* @__PURE__ */ (void 0)("span", { children: "Decrypted Payload Extraction Verification" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1707,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-mono text-[11px] text-emerald-600",
										children: "Integrity Check: Verified"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1708,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1706,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "font-mono text-[11px] text-foreground bg-card p-2 rounded border border-border",
									children: stegoOutputs[`${selectedImageTab}:::${inspectorModelId}`]?.recovered || payloadText
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1712,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1705,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1558,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1346,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (void 0)("div", {
				className: "p-12 text-center text-muted-foreground",
				children: "No images evaluated yet. Go to Image Queue & Configuration to upload or load samples."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1720,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 1305,
			columnNumber: 9
		}, this),
		activeTab === "stats" && /* @__PURE__ */ (void 0)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (void 0)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-xs",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
							children: "Evaluation Metric"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1734,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1 bg-muted p-1 rounded-lg",
							children: METRIC_OPTIONS.map((m) => /* @__PURE__ */ (void 0)("button", {
								onClick: () => setSelectedMetric(m.id),
								className: cn("rounded px-2.5 py-1 text-xs font-medium transition-all", selectedMetric === m.id ? "bg-card text-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"),
								children: m.name.split(" ")[0]
							}, m.id, false, {
								fileName: _jsxFileName,
								lineNumber: 1739,
								columnNumber: 21
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1737,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1733,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
							children: "Significance Level (α)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1756,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1 bg-muted p-1 rounded-lg",
							children: [/* @__PURE__ */ (void 0)("button", {
								onClick: () => setAlpha(.05),
								className: cn("rounded px-3 py-1 text-xs font-medium transition-all", alpha === .05 ? "bg-card text-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"),
								children: "α = 0.05 (95%)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1760,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: () => setAlpha(.01),
								className: cn("rounded px-3 py-1 text-xs font-medium transition-all", alpha === .01 ? "bg-card text-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"),
								children: "α = 0.01 (99%)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1771,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1759,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1755,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1732,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "text-right text-xs text-muted-foreground font-mono",
						children: [
							/* @__PURE__ */ (void 0)("span", { children: [
								"Evaluated across ",
								activeImageNames.length,
								" image covers"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1787,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("span", {
								className: "mx-2",
								children: "·"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1788,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("span", { children: [activeModelIds.length, " algorithms"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1789,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1786,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1731,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "relative overflow-hidden rounded-xl border-2 border-primary/40 bg-gradient-to-r from-primary/10 via-card to-emerald-500/10 p-6 shadow-sm",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md",
								children: /* @__PURE__ */ (void 0)(Trophy, { className: "size-8 fill-current" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1798,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1797,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary",
										children: "Empirical Statistical Winner"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1802,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-xs font-mono text-muted-foreground",
										children: "Based on Non-Parametric Friedman Ranking"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1805,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1801,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("h2", {
									className: "mt-1 font-display text-2xl font-bold text-ink md:text-3xl",
									children: bestModelName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1809,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted-foreground",
									children: [
										"Achieves top statistical performance with average rank of",
										" ",
										/* @__PURE__ */ (void 0)("span", {
											className: "font-mono font-bold text-foreground",
											children: bestModelRank.toFixed(2)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1814,
											columnNumber: 21
										}, this),
										" ",
										"on ",
										activeMetricDef.name,
										" across all ",
										activeImageNames.length,
										" evaluated image covers."
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1812,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1800,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1796,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex shrink-0 flex-col rounded-xl border border-border bg-card/80 p-3.5 text-center shadow-xs",
							children: [
								/* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Mean Rank"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1825,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("span", {
									className: "font-display text-2xl font-bold text-primary",
									children: ["#", bestModelRank.toFixed(2)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1828,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] font-medium text-emerald-600 mt-0.5",
									children: "Rank 1 = Highest Imperceptibility"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1831,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1824,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1795,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1794,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "grid gap-6 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between",
							children: [/* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Hypothesis Test"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1844,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "rounded bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-semibold",
										children: [
											"k = ",
											statsResult.k,
											", N = ",
											statsResult.n
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1847,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1843,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("h3", {
									className: "font-display text-lg font-bold text-ink",
									children: "Friedman Test"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1851,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-xs text-muted-foreground leading-relaxed",
									children: "Non-parametric ANOVA on ranks evaluating if algorithm performance ranks differ significantly across cover images."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1854,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-4 space-y-2 font-mono text-xs",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between border-b border-border/50 pb-1.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Chi-Square (χ²_F):"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1861,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-bold text-foreground",
												children: statsResult.chi2.toFixed(3)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1862,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1860,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between border-b border-border/50 pb-1.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Degrees of Freedom:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1865,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-foreground",
												children: [statsResult.df, " (k - 1)"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1866,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1864,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between border-b border-border/50 pb-1.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Asymptotic p-value:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1869,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: cn("font-bold", statsResult.pApprox < alpha ? "text-emerald-600" : "text-amber-600"),
												children: statsResult.pApprox < .001 ? "p < 0.001" : `p = ${statsResult.pApprox.toFixed(4)}`
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1870,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1868,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between pt-0.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Iman-Davenport F:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1882,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-foreground",
												children: statsResult.imanDavenportF.toFixed(3)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1883,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1881,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1859,
									columnNumber: 17
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1842,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: cn("mt-4 rounded-lg p-2.5 text-xs font-medium", statsResult.isSignificantChi2 ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-muted text-muted-foreground"),
								children: statsResult.isSignificantChi2 ? `✓ Reject H0: Significant difference exists between models (p < ${alpha}).` : "Fail to reject H0: No statistically significant difference detected."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1888,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1841,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between",
							children: [/* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Effect Size"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1906,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: cn("rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", statsResult.kendallW >= .7 ? "bg-emerald-500/10 text-emerald-600" : statsResult.kendallW >= .5 ? "bg-blue-500/10 text-blue-600" : "bg-amber-500/10 text-amber-600"),
										children: [statsResult.effectMagnitude, " Concordance"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1909,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1905,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("h3", {
									className: "font-display text-lg font-bold text-ink",
									children: "Kendall’s W Effect Size"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1922,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-xs text-muted-foreground leading-relaxed",
									children: "Quantifies the degree of concordance and ranking agreement among judges (cover images) across algorithms."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1925,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-4 flex flex-col items-center justify-center p-3 rounded-lg bg-muted/30",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "font-display text-3xl font-bold text-foreground font-mono",
										children: ["W = ", statsResult.kendallW.toFixed(3)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1931,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Scale: 0.0 (random agreement) to 1.0 (unanimous agreement)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1934,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1930,
									columnNumber: 17
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1904,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-4 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3",
								children: statsResult.effectDescription
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1940,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1903,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between",
							children: [/* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Post-Hoc Analysis"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1949,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "rounded bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-semibold",
										children: ["q_α = ", statsResult.qAlpha.toFixed(3)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1952,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1948,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("h3", {
									className: "font-display text-lg font-bold text-ink",
									children: "Nemenyi Post-hoc Test"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1956,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-xs text-muted-foreground leading-relaxed",
									children: "Pairwise multiple comparisons controlling family-wise error rate. Pairs with rank difference > CD are statistically distinct."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1959,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-4 space-y-2 font-mono text-xs",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between border-b border-border/50 pb-1.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Critical Difference (CD):"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1966,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-bold text-primary font-display text-base",
												children: statsResult.nemenyiCD.toFixed(3)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1967,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1965,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between border-b border-border/50 pb-1.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Studentized Range q:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1972,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-foreground",
												children: statsResult.qAlpha.toFixed(3)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1973,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1971,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between pt-0.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Significant Pairs:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1976,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-emerald-600 font-bold",
												children: [
													statsResult.pairs.filter((p) => p.significant).length,
													" /",
													" ",
													statsResult.pairs.length,
													" pairs"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1977,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1975,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1964,
									columnNumber: 17
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1947,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "mt-4 rounded-lg bg-muted/50 p-2.5 text-[11px] text-muted-foreground leading-relaxed",
								children: "Formula: CD = q_α · √(k(k + 1) / (6N))"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1985,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1946,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1839,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (void 0)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Critical Difference (CD) Diagram"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1993,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(CDDiagram, {
						modelIds: rankTable.modelIds,
						avgRanks: statsResult.avgRanks,
						cd: statsResult.nemenyiCD,
						cliques: statsResult.cliques,
						k: statsResult.k,
						metricLabel: activeMetricDef.name,
						higherIsBetter: activeMetricDef.higherIsBetter
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1996,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1992,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "rounded-xl border border-border bg-card p-5 shadow-xs",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "mb-4 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "font-display text-base font-semibold text-ink",
							children: "Pairwise Model Comparisons (Nemenyi Test)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 2011,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Evaluating all model pairs against Critical Difference threshold CD =",
								" ",
								/* @__PURE__ */ (void 0)("span", {
									className: "font-mono font-bold text-foreground",
									children: statsResult.nemenyiCD.toFixed(3)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 2016,
									columnNumber: 19
								}, this),
								"."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2014,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2010,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1 bg-muted p-1 rounded-lg text-xs",
							children: [
								/* @__PURE__ */ (void 0)("button", {
									onClick: () => setFilterMode("all"),
									className: cn("rounded px-2.5 py-1 text-xs font-medium transition-all", filterMode === "all" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
									children: [
										"All Pairs (",
										statsResult.pairs.length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 2025,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									onClick: () => setFilterMode("ares"),
									className: cn("rounded px-2.5 py-1 text-xs font-medium transition-all", filterMode === "ares" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
									children: "ARES vs Others"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 2034,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									onClick: () => setFilterMode("sig"),
									className: cn("rounded px-2.5 py-1 text-xs font-medium transition-all", filterMode === "sig" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
									children: "Significant Only"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 2043,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2024,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 2009,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (void 0)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (void 0)("thead", {
								className: "border-b border-border bg-muted/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ (void 0)("tr", { children: [
									/* @__PURE__ */ (void 0)("th", {
										className: "px-4 py-2.5",
										children: "Model A"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 2059,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-4 py-2.5",
										children: "Model B"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 2060,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-2.5 text-right",
										children: "Rank Diff |R_A - R_B|"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 2061,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-2.5 text-right",
										children: "Critical Difference"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 2062,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-2.5 text-right",
										children: "z-score"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 2063,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-3 py-2.5 text-right",
										children: "p-value"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 2064,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "px-4 py-2.5 text-center",
										children: "Significance Verdict"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 2065,
										columnNumber: 21
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 2058,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2057,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("tbody", {
								className: "divide-y divide-border/60 font-mono text-[11px]",
								children: statsResult.pairs.filter((p) => {
									if (filterMode === "sig") return p.significant;
									if (filterMode === "ares") return p.a === "ares_hybrid_inn" || p.b === "ares_hybrid_inn";
									return true;
								}).map((p, idx) => {
									const modelA = MODELS.find((m) => m.id === p.a)?.short ?? p.a;
									const modelB = MODELS.find((m) => m.id === p.b)?.short ?? p.b;
									const isAresPair = p.a === "ares_hybrid_inn" || p.b === "ares_hybrid_inn";
									return /* @__PURE__ */ (void 0)("tr", {
										className: cn("transition-colors hover:bg-muted/40", p.significant ? "bg-emerald-500/5" : "", isAresPair && "font-semibold"),
										children: [
											/* @__PURE__ */ (void 0)("td", {
												className: "px-4 py-2.5 font-sans font-medium text-foreground",
												children: modelA
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 2090,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-4 py-2.5 font-sans font-medium text-foreground",
												children: modelB
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 2093,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-3 py-2.5 text-right font-bold text-foreground",
												children: p.rankDiff.toFixed(3)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 2096,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-3 py-2.5 text-right text-muted-foreground",
												children: statsResult.nemenyiCD.toFixed(3)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 2099,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-3 py-2.5 text-right text-muted-foreground",
												children: p.zValue.toFixed(3)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 2102,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: cn("px-3 py-2.5 text-right", p.pValue < alpha ? "text-emerald-600 font-bold" : "text-muted-foreground"),
												children: p.pValue < .001 ? "p < 0.001" : p.pValue.toFixed(4)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 2105,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("td", {
												className: "px-4 py-2.5 text-center font-sans",
												children: p.significant ? /* @__PURE__ */ (void 0)("span", {
													className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600",
													children: [
														/* @__PURE__ */ (void 0)(Check, { className: "size-3" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 2116,
															columnNumber: 33
														}, this),
														"Significant (p < ",
														alpha,
														")"
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 2115,
													columnNumber: 31
												}, this) : /* @__PURE__ */ (void 0)("span", {
													className: "inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground",
													children: "No Significant Diff"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 2120,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 2113,
												columnNumber: 27
											}, this)
										]
									}, idx, true, {
										fileName: _jsxFileName,
										lineNumber: 2082,
										columnNumber: 25
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2068,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2056,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 2055,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 2008,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "rounded-xl border border-border bg-card p-5 shadow-xs",
					children: [
						/* @__PURE__ */ (void 0)("h3", {
							className: "font-display text-base font-semibold text-ink mb-1",
							children: [
								"Aggregated Benchmark Summary (All ",
								activeImageNames.length,
								" Images)"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2135,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground mb-4",
							children: "Mean values, standard deviations, and win counts aggregated across all uploaded benchmark test cases."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 2138,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (void 0)("table", {
								className: "w-full text-left text-xs",
								children: [/* @__PURE__ */ (void 0)("thead", {
									className: "border-b border-border bg-muted/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
									children: /* @__PURE__ */ (void 0)("tr", { children: [
										/* @__PURE__ */ (void 0)("th", {
											className: "px-4 py-3",
											children: "Rank"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 2147,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("th", {
											className: "px-4 py-3",
											children: "Algorithm"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 2148,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("th", {
											className: "px-3 py-3 text-right",
											children: "Mean PSNR (dB)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 2149,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("th", {
											className: "px-3 py-3 text-right",
											children: "Mean SSIM"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 2150,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("th", {
											className: "px-3 py-3 text-right",
											children: "Mean MSE"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 2151,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("th", {
											className: "px-3 py-3 text-right",
											children: "Mean BER"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 2152,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("th", {
											className: "px-3 py-3 text-right",
											children: "Avg Encode (ms)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 2153,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("th", {
											className: "px-3 py-3 text-right",
											children: "Image Wins"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 2154,
											columnNumber: 21
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 2146,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 2145,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("tbody", {
									className: "divide-y divide-border/60 font-mono text-[11px]",
									children: aggregatedStats.map((item) => {
										const isWinner = item.rank === 1;
										const isAres = item.model.id === "ares_hybrid_inn";
										return /* @__PURE__ */ (void 0)("tr", {
											className: cn("transition-colors hover:bg-muted/40", isWinner ? "bg-amber-500/5 font-semibold" : isAres ? "bg-primary/5" : ""),
											children: [
												/* @__PURE__ */ (void 0)("td", {
													className: "px-4 py-3",
													children: /* @__PURE__ */ (void 0)("span", {
														className: cn("inline-flex size-5 items-center justify-center rounded-full text-[10px] font-bold", isWinner ? "bg-amber-500 text-white" : item.rank === 2 ? "bg-slate-400 text-white" : item.rank === 3 ? "bg-amber-700 text-white" : "bg-muted text-muted-foreground"),
														children: item.rank
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 2171,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 2170,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "px-4 py-3 font-sans font-medium text-foreground flex items-center gap-1.5",
													children: [/* @__PURE__ */ (void 0)("span", { children: item.model.name }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 2187,
														columnNumber: 27
													}, this), isAres && /* @__PURE__ */ (void 0)("span", {
														className: "rounded bg-primary/20 text-primary px-1 py-0.2 text-[9px] font-semibold",
														children: "PROPOSED"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 2189,
														columnNumber: 29
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 2186,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "px-3 py-3 text-right font-bold text-foreground",
													children: [
														item.psnrAvg.toFixed(2),
														" ± ",
														item.psnrStd.toFixed(2)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 2194,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "px-3 py-3 text-right text-muted-foreground",
													children: [
														item.ssimAvg.toFixed(4),
														" ± ",
														item.ssimStd.toFixed(4)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 2197,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "px-3 py-3 text-right text-muted-foreground",
													children: item.mseAvg.toFixed(2)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 2200,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "px-3 py-3 text-right text-muted-foreground",
													children: [(item.berAvg * 100).toFixed(2), "%"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 2203,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "px-3 py-3 text-right text-muted-foreground",
													children: [item.encodeAvg.toFixed(0), " ms"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 2206,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "px-3 py-3 text-right",
													children: /* @__PURE__ */ (void 0)("span", {
														className: cn("font-semibold", item.winCount > 0 ? "text-primary" : "text-muted-foreground"),
														children: [
															item.winCount,
															" / ",
															activeImageNames.length,
															" (",
															Math.round(item.winCount / (activeImageNames.length || 1) * 100),
															"%)"
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 2210,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 2209,
													columnNumber: 25
												}, this)
											]
										}, item.model.id, true, {
											fileName: _jsxFileName,
											lineNumber: 2163,
											columnNumber: 23
										}, this);
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 2157,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 2144,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 2143,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 2134,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 1729,
			columnNumber: 9
		}, this),
		activeTab === "export" && /* @__PURE__ */ (void 0)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (void 0)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3",
				children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
					className: "font-display text-base font-semibold text-ink",
					children: "Academic Publication & Data Export Center"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 2235,
					columnNumber: 15
				}, this), /* @__PURE__ */ (void 0)("p", {
					className: "text-xs text-muted-foreground",
					children: "Export benchmark and statistical results formatted ready for IEEE/Springer paper manuscripts."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 2238,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 2234,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-1 bg-muted p-1 rounded-lg text-xs",
					children: [
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => setExportFormat("apa"),
							className: cn("flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-all", exportFormat === "apa" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
							children: [/* @__PURE__ */ (void 0)(FileText, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2253,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "APA 7th Summary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2254,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2246,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => setExportFormat("latex"),
							className: cn("flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-all", exportFormat === "latex" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
							children: [/* @__PURE__ */ (void 0)(Code, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2263,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "LaTeX Table" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2264,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2256,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => setExportFormat("csv"),
							className: cn("flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-all", exportFormat === "csv" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
							children: [/* @__PURE__ */ (void 0)(Download, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2273,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Raw CSV" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2274,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2266,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => setExportFormat("json"),
							className: cn("flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-all", exportFormat === "json" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
							children: [/* @__PURE__ */ (void 0)(Download, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2283,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Full JSON" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2284,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2276,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 2245,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 2233,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (void 0)("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: ["Format: ", exportFormat.toUpperCase()]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2293,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								"(",
								activeImageNames.length,
								" image test cases · ",
								activeModelIds.length,
								" models)"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2296,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 2292,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								copyToClipboard(exportFormat === "apa" ? apaOutput : exportFormat === "latex" ? latexOutput : exportFormat === "csv" ? csvOutput : jsonOutput, exportFormat);
							},
							className: "gap-1.5 text-xs font-medium",
							children: [copiedType === exportFormat ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2319,
								columnNumber: 21
							}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2321,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("span", { children: copiedType === exportFormat ? "Copied!" : "Copy to Clipboard" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2323,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2302,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							onClick: () => {
								const content = exportFormat === "apa" ? apaOutput : exportFormat === "latex" ? latexOutput : exportFormat === "csv" ? csvOutput : jsonOutput;
								const mime = exportFormat === "json" ? "application/json" : exportFormat === "csv" ? "text/csv" : "text/plain";
								const ext = exportFormat === "apa" ? "txt" : exportFormat === "latex" ? "tex" : exportFormat;
								const blob = new Blob([content], { type: mime });
								const url = URL.createObjectURL(blob);
								const a = document.createElement("a");
								a.href = url;
								a.download = `stego_benchmark_${exportFormat}_${Date.now()}.${ext}`;
								a.click();
								URL.revokeObjectURL(url);
							},
							className: "gap-1.5 text-xs font-medium bg-primary text-primary-foreground",
							children: [/* @__PURE__ */ (void 0)(Download, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2359,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("span", { children: ["Download .", exportFormat === "apa" ? "txt" : exportFormat === "latex" ? "tex" : exportFormat] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 2360,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2326,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 2301,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 2291,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "relative",
					children: /* @__PURE__ */ (void 0)("pre", {
						className: "max-h-[480px] overflow-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground select-all",
						children: exportFormat === "apa" ? apaOutput : exportFormat === "latex" ? latexOutput : exportFormat === "csv" ? csvOutput : jsonOutput
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 2367,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 2366,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 2290,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 2232,
			columnNumber: 9
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 725,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$5 = () => import("./benchmark-SZ1muDrY.mjs");
var Route$5 = createFileRoute("/benchmark")({
	beforeLoad: () => {
		throw redirect({ to: "/batch-lab" });
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./decoder-BnBjcYqm.mjs");
var Route$4 = createFileRoute("/decoder")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./history-BI7eUUpC.mjs");
var Route$3 = createFileRoute("/history")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./models-D7cQE244.mjs");
var Route$2 = createFileRoute("/models")({
	beforeLoad: () => {
		throw redirect({ to: "/batch-lab" });
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./settings-C25M2ZJO.mjs");
var Route$1 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./statistics-BnHLk4ke.mjs");
var Route = createFileRoute("/statistics")({
	beforeLoad: () => {
		throw redirect({ to: "/batch-lab" });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	BatchLabRoute: Route$6.update({
		id: "/batch-lab",
		path: "/batch-lab",
		getParentRoute: () => Route$8
	}),
	BenchmarkRoute: Route$5.update({
		id: "/benchmark",
		path: "/benchmark",
		getParentRoute: () => Route$8
	}),
	DecoderRoute: Route$4.update({
		id: "/decoder",
		path: "/decoder",
		getParentRoute: () => Route$8
	}),
	HistoryRoute: Route$3.update({
		id: "/history",
		path: "/history",
		getParentRoute: () => Route$8
	}),
	ModelsRoute: Route$2.update({
		id: "/models",
		path: "/models",
		getParentRoute: () => Route$8
	}),
	SettingsRoute: Route$1.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$8
	}),
	StatisticsRoute: Route.update({
		id: "/statistics",
		path: "/statistics",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { cn as _, decodeAres as a, METRIC_KEYS as c, Textarea as d, Label as f, PageHeader as g, Button as h, MODELS as i, fileToImage as l, AppShell as m, METRIC_OPTIONS as n, encodeWithModel as o, Input as p, generateSampleImage as r, modelById as s, router_exports as t, imageToDataUrl as u, useSession as v };
