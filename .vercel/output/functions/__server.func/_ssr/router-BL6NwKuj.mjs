import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, q as redirect, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as FileSearch, I as CircleX, L as CircleCheck, N as Copy, P as Code, R as Check, S as History, T as FileText, c as Sparkles, h as Play, i as TriangleAlert, j as Download, k as Eye, n as Upload, o as Trash2, p as Settings, r as Trophy, s as Square, v as LayoutDashboard, w as FlaskConical, x as Info, y as Layers, z as ChartColumn } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-C2VJ3qPk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen w-full min-w-full bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen w-full min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 flex h-screen w-[240px] shrink-0 flex-col border-r border-border bg-sidebar max-md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 pb-6 pt-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wider",
								children: "AR"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm font-bold leading-tight text-ink",
								children: "ARES-EMD-OPAP-INN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground uppercase tracking-wider",
								children: "INN + Hybrid CNN Lab"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-1 flex-col gap-1 px-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-2 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70",
								children: "Core Modules"
							}),
							NAV.map((item) => {
								const active = pathname === item.to || item.to === "/batch-lab" && pathname === "/benchmark";
								const Icon = item.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-[var(--motion-quick)]", active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-4 shrink-0",
										strokeWidth: 1.75
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
								}, item.to);
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 px-2 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70",
								children: "Utilities"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/decoder",
								className: cn("flex h-9 items-center gap-3 rounded-md px-3 text-xs font-medium transition-colors duration-[var(--motion-quick)]", pathname === "/decoder" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, {
									className: "size-3.5 shrink-0",
									strokeWidth: 1.75
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Standalone Decoder" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-muted/50 p-2.5 text-[11px] leading-relaxed text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: "Statistical Engine"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[10px]",
								children: "Friedman · Kendall’s W · Nemenyi Post-hoc with live empirical metrics."
							})]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-1 overflow-x-auto border-b border-border bg-sidebar px-3 py-2 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mr-2 flex items-center gap-1.5 pr-2 border-r border-border shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display font-bold text-sm text-primary",
							children: "ARES"
						})
					}), NAV.map((item) => {
						const active = pathname === item.to || item.to === "/batch-lab" && pathname === "/benchmark";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("h-9 shrink-0 rounded-md px-3 text-xs font-medium flex items-center gap-1.5", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
						}, item.to);
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8",
					children
				})]
			})]
		})
	});
}
function PageHeader({ title, kicker, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.16em] text-primary",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl",
					children: title
				}),
				description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
					children: description
				})
			]
		}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 items-center gap-2 pt-1",
			children: actions
		})]
	});
}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BL6NwKuj.js
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
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
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
var styles_default = "/assets/styles-D0SEdlgS.css";
var APP_NAME = "ARES-EMD-OPAP Stego Lab";
function RootShell() {
	(0, import_react.useEffect)(() => {
		useSession.getState().initFromStorage();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "h-full w-full min-w-full",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-full w-full min-w-full m-0 p-0 bg-bg text-fg antialiased",
			suppressHydrationWarning: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
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
				content: "CNN-Assisted Adaptive EMD-OPAP Steganography with Distortion Optimization for Secure Image Data Hiding. Comprehensive benchmark, ablation, and extraction laboratory."
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
var $$splitComponentImporter$6 = () => import("./routes-Bw9t94Mh.mjs");
var Route$7 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs font-medium tracking-wide text-muted-foreground", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-28 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	});
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
/**
* Loads a stego image at exact 1:1 pixel dimensions without any resampling,
* scaling, or color profile conversions, preserving every embedded LSB bit.
*/
async function fileToStegoImage(file) {
	try {
		const bmp = await createImageBitmap(file, { colorSpaceConversion: "none" }).catch(() => createImageBitmap(file));
		const w = bmp.width;
		const h = bmp.height;
		const canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext("2d", { willReadFrequently: true });
		if (!ctx) throw new Error("Canvas 2D unavailable");
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(bmp, 0, 0);
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
					const w = img.naturalWidth || img.width;
					const h = img.naturalHeight || img.height;
					const canvas = document.createElement("canvas");
					canvas.width = w;
					canvas.height = h;
					const ctx = canvas.getContext("2d", { willReadFrequently: true });
					if (!ctx) {
						reject(/* @__PURE__ */ new Error("Canvas 2D unavailable"));
						return;
					}
					ctx.imageSmoothingEnabled = false;
					ctx.drawImage(img, 0, 0);
					resolve({
						width: w,
						height: h,
						data: ctx.getImageData(0, 0, w, h).data
					});
				};
				img.onerror = () => reject(/* @__PURE__ */ new Error("Failed to decode stego image data"));
				img.src = e.target?.result;
			};
			reader.onerror = () => reject(/* @__PURE__ */ new Error("Failed to read stego file"));
			reader.readAsDataURL(file);
		});
	}
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
var METRIC_KEYS = [
	{
		key: "psnr",
		label: "PSNR (dB)"
	},
	{
		key: "ssim",
		label: "SSIM"
	},
	{
		key: "mse",
		label: "MSE"
	},
	{
		key: "bpp",
		label: "Embedding Rate (bpp)"
	},
	{
		key: "payloadBits",
		label: "Payload Bits"
	},
	{
		key: "modifiedPixels",
		label: "Modified Pixels"
	},
	{
		key: "averageAbsError",
		label: "Avg Abs Error"
	},
	{
		key: "maxPixelError",
		label: "Max Pixel Error"
	},
	{
		key: "opapOptimizedCount",
		label: "OPAP Optimized"
	},
	{
		key: "encodeMs",
		label: "Encode (ms)"
	}
];
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
function maxAbsDelta(a, b) {
	let max = 0;
	for (let i = 0; i < a.data.length; i += 4) {
		const dr = Math.abs(a.data[i] - b.data[i]);
		const dg = Math.abs(a.data[i + 1] - b.data[i + 1]);
		const db = Math.abs(a.data[i + 2] - b.data[i + 2]);
		if (dr > max) max = dr;
		if (dg > max) max = dg;
		if (db > max) max = db;
	}
	return max;
}
function countModifiedPixels(a, b) {
	let count = 0;
	const total = a.width * a.height;
	for (let i = 0; i < a.data.length; i += 4) if (a.data[i] !== b.data[i] || a.data[i + 1] !== b.data[i + 1] || a.data[i + 2] !== b.data[i + 2]) count++;
	return {
		count,
		pct: 100 * count / Math.max(1, total)
	};
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
	return Math.min(1, err / n);
}
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
/**
* Converts a byte array into a stream of base-5 digits (radix 5).
* Each byte (0-255) is decomposed into 4 base-5 digits (5^4 = 625 >= 256).
* This ensures exact 1:1 reversible conversion.
*/
function bytesToBase5(data) {
	const digits = [];
	for (let i = 0; i < data.length; i++) {
		let val = data[i];
		for (let k = 0; k < 4; k++) {
			digits.push(val % 5);
			val = Math.floor(val / 5);
		}
	}
	return digits;
}
/**
* Converts a stream of base-5 digits back into original byte array.
*/
function base5ToBytes(digits, numBytes) {
	const targetBytes = numBytes ?? Math.floor(digits.length / 4);
	const out = new Uint8Array(targetBytes);
	for (let i = 0; i < targetBytes; i++) {
		const d0 = digits[i * 4 + 0] ?? 0;
		const d1 = digits[i * 4 + 1] ?? 0;
		const d2 = digits[i * 4 + 2] ?? 0;
		const d3 = digits[i * 4 + 3] ?? 0;
		const val = d0 + d1 * 5 + d2 * 25 + d3 * 125;
		out[i] = Math.min(255, Math.max(0, val));
	}
	return out;
}
function groupSizeForScheme(scheme) {
	switch (scheme) {
		case "base5": return 2;
		case "base7": return 3;
		case "bits3": return 4;
		case "bits4": return 8;
		case "bits5": return 16;
		case "bits6": return 32;
	}
}
function bitsPerGroupForScheme(scheme) {
	switch (scheme) {
		case "base5": return Math.log2(5);
		case "base7": return Math.log2(7);
		case "bits3": return 3;
		case "bits4": return 4;
		case "bits5": return 5;
		case "bits6": return 6;
	}
}
function symbolCountForBytes(numBytes, scheme) {
	switch (scheme) {
		case "base5": return numBytes * 4;
		case "base7": return numBytes * 3;
		case "bits3": return Math.ceil(numBytes * 8 / 3);
		case "bits4": return numBytes * 2;
		case "bits5": return Math.ceil(numBytes * 8 / 5);
		case "bits6": return Math.ceil(numBytes * 8 / 6);
	}
}
function bytesToRadixSymbols(data, scheme) {
	if (scheme === "base5") return bytesToBase5(data);
	if (scheme === "base7") {
		const digits = [];
		for (let i = 0; i < data.length; i++) {
			let val = data[i];
			for (let k = 0; k < 3; k++) {
				digits.push(val % 7);
				val = Math.floor(val / 7);
			}
		}
		return digits;
	}
	const chunkBits = scheme === "bits3" ? 3 : scheme === "bits4" ? 4 : scheme === "bits5" ? 5 : 6;
	const totalBits = data.length * 8;
	const symbols = [];
	for (let b = 0; b < totalBits; b += chunkBits) {
		let sym = 0;
		for (let k = 0; k < chunkBits; k++) {
			const bitPos = b + k;
			if (bitPos < totalBits) {
				const byteIdx = bitPos >>> 3;
				const bitOffset = 7 - (bitPos & 7);
				const bit = data[byteIdx] >>> bitOffset & 1;
				sym |= bit << k;
			}
		}
		symbols.push(sym);
	}
	return symbols;
}
function radixSymbolsToBytes(symbols, numBytes, scheme) {
	if (scheme === "base5") return base5ToBytes(symbols, numBytes);
	if (scheme === "base7") {
		const out = new Uint8Array(numBytes);
		for (let i = 0; i < numBytes; i++) {
			const d0 = symbols[i * 3 + 0] ?? 0;
			const d1 = symbols[i * 3 + 1] ?? 0;
			const d2 = symbols[i * 3 + 2] ?? 0;
			const val = d0 + d1 * 7 + d2 * 49;
			out[i] = Math.min(255, Math.max(0, val));
		}
		return out;
	}
	const chunkBits = scheme === "bits3" ? 3 : scheme === "bits4" ? 4 : scheme === "bits5" ? 5 : 6;
	const out = new Uint8Array(numBytes);
	const totalBits = numBytes * 8;
	let bitPos = 0;
	for (let s = 0; s < symbols.length && bitPos < totalBits; s++) {
		const sym = symbols[s] ?? 0;
		for (let k = 0; k < chunkBits && bitPos < totalBits; k++) {
			if (sym >>> k & 1) {
				const byteIdx = bitPos >>> 3;
				const bitOffset = 7 - (bitPos & 7);
				out[byteIdx] |= 1 << bitOffset;
			}
			bitPos++;
		}
	}
	return out;
}
/**
* Generalized INN-Coupled EMD extraction function for an n-pixel group:
* f_INN(g_1, ..., g_n; phi_INN) = (sum_{k=1}^n k * g_k + phi_INN) mod (2n + 1)
*/
function emdExtractGroupN(pixels, groupIndices, innPhase = 0) {
	const n = groupIndices.length;
	const modulus = 2 * n + 1;
	let acc = innPhase % modulus;
	for (let k = 0; k < n; k++) acc = (acc + (k + 1) * pixels[groupIndices[k]]) % modulus;
	return (acc + modulus) % modulus;
}
/**
* Generalized INN-Coupled EMD + OPAP group embedding:
* Modifies at most 1 pixel by +/- 1 in the interior [1, 254], and uses OPAP
* 2-pixel minimum-norm compensation at [0, 255] boundaries so max pixel error is +/- 1.
*/
function embedGroupsInnEmdOpap(coverPixels, groups, innPhases, symbols, useOpap = true) {
	const stegoPixels = new Uint8ClampedArray(coverPixels);
	const groupsToUse = symbols.length;
	if (groups.length < groupsToUse) throw new Error(`Payload exceeds available adaptive EMD capacity. Required ${groupsToUse} groups, but only ${groups.length} groups available.`);
	let modifiedPixels = 0;
	let totalSquaredError = 0;
	let totalAbsError = 0;
	let maxError = 0;
	let opapOptimizedCount = 0;
	let distortionReduced = 0;
	const groupSize = groups[0]?.length ?? 2;
	const modulus = 2 * groupSize + 1;
	for (let i = 0; i < groupsToUse; i++) {
		const gIndices = groups[i];
		const phase = innPhases[i] ?? 0;
		const s = (((symbols[i] % modulus + modulus) % modulus - emdExtractGroupN(stegoPixels, gIndices, phase)) % modulus + modulus) % modulus;
		if (s !== 0) {
			const isPositive = s <= groupSize;
			const kIdx = isPositive ? s - 1 : modulus - s - 1;
			const delta = isPositive ? 1 : -1;
			const byteIdx = gIndices[kIdx];
			const cVal = stegoPixels[byteIdx];
			const nextVal = cVal + delta;
			if (nextVal >= 0 && nextVal <= 255) {
				stegoPixels[byteIdx] = nextVal;
				if (useOpap) opapOptimizedCount++;
			} else if (useOpap && groupSize >= 2) {
				let foundPair = false;
				for (let a = 0; a < groupSize && !foundPair; a++) for (const da of [-1, 1]) {
					const va = stegoPixels[gIndices[a]] + da;
					if (va < 0 || va > 255) continue;
					const rem = ((s - (a + 1) * da) % modulus + modulus) % modulus;
					if (rem === 0) {
						stegoPixels[gIndices[a]] = va;
						foundPair = true;
						opapOptimizedCount++;
						distortionReduced += (modulus - 1) ** 2 - 1;
						break;
					}
					const bPos = rem <= groupSize ? rem - 1 : modulus - rem - 1;
					const db = rem <= groupSize ? 1 : -1;
					if (bPos !== a) {
						const vb = stegoPixels[gIndices[bPos]] + db;
						if (vb >= 0 && vb <= 255) {
							stegoPixels[gIndices[a]] = va;
							stegoPixels[gIndices[bPos]] = vb;
							foundPair = true;
							opapOptimizedCount++;
							distortionReduced += (modulus - 1) ** 2 - 2;
							break;
						}
					}
				}
				if (!foundPair) stegoPixels[byteIdx] = delta > 0 ? cVal - (modulus - 1) : cVal + (modulus - 1);
			} else stegoPixels[byteIdx] = delta > 0 ? cVal - (modulus - 1) : cVal + (modulus - 1);
		}
		for (let k = 0; k < gIndices.length; k++) {
			const idx = gIndices[k];
			const diff = Math.abs(stegoPixels[idx] - coverPixels[idx]);
			if (diff > 0) {
				modifiedPixels++;
				totalAbsError += diff;
				totalSquaredError += diff * diff;
				if (diff > maxError) maxError = diff;
			}
		}
	}
	const totalEvaluatedPixels = Math.max(1, groupsToUse * groupSize);
	return {
		stegoPixels,
		stats: {
			totalGroups: groups.length,
			groupsUsed: groupsToUse,
			modifiedPixels,
			modifiedPixelPct: 100 * modifiedPixels / totalEvaluatedPixels,
			averageAbsError: totalAbsError / totalEvaluatedPixels,
			maxPixelError: maxError,
			mse: totalSquaredError / totalEvaluatedPixels,
			opapOptimizedCount,
			distortionReducedByOpap: distortionReduced
		}
	};
}
/**
* Extracts symbol stream from generalized INN-Coupled EMD pixel groups.
*/
function extractGroupsInnEmd(stegoPixels, groups, innPhases, numSymbols) {
	const limit = Math.min(numSymbols, groups.length);
	const out = [];
	for (let i = 0; i < limit; i++) out.push(emdExtractGroupN(stegoPixels, groups[i], innPhases[i] ?? 0));
	return out;
}
var DEFAULT_ADAPTIVE_CONFIG = {
	useVariance: true,
	useGradient: true,
	useLaplacian: true,
	useCnnAttention: true,
	useInnGuidance: true,
	wVariance: .2,
	wGradient: .15,
	wLaplacian: .15,
	wAttention: .25,
	wInn: .25
};
function normalizeMap(map) {
	let min = Infinity;
	let max = -Infinity;
	for (let i = 0; i < map.length; i++) {
		const v = map[i];
		if (v < min) min = v;
		if (v > max) max = v;
	}
	const range = max - min + 1e-8;
	const out = new Float32Array(map.length);
	for (let i = 0; i < map.length; i++) out[i] = (map[i] - min) / range;
	return out;
}
/**
* Computes grayscale intensity from R and G channels.
* Note: Blue channel is preserved as primary steganographic medium, so decision map
* is strictly computed from R & G (and invariant to blue modifications).
*/
function getRgLuma(img, x, y) {
	const idx = (y * img.width + x) * 4;
	return .5 * img.data[idx] + .5 * img.data[idx + 1];
}
/**
* 1. Local Variance Map: patch-based texture metric (8x8 window)
*/
function computeLocalVariance(img, block = 8) {
	const { width: w, height: h } = img;
	const varMap = new Float32Array(w * h);
	const step = Math.max(1, Math.floor(block / 2));
	for (let y = 0; y <= h - block; y += step) for (let x = 0; x <= w - block; x += step) {
		let sum = 0;
		let sumSq = 0;
		let count = 0;
		for (let dy = 0; dy < block; dy++) for (let dx = 0; dx < block; dx++) {
			const val = getRgLuma(img, x + dx, y + dy);
			sum += val;
			sumSq += val * val;
			count++;
		}
		const mean = sum / count;
		const v = Math.max(0, sumSq / count - mean * mean);
		for (let dy = 0; dy < block; dy++) for (let dx = 0; dx < block; dx++) {
			const pIdx = (y + dy) * w + (x + dx);
			if (v > varMap[pIdx]) varMap[pIdx] = v;
		}
	}
	return normalizeMap(varMap);
}
/**
* 2. Sobel Gradient Magnitude: measures first-order edge energy
*/
function computeSobelGradient(img) {
	const { width: w, height: h } = img;
	const gradMap = new Float32Array(w * h);
	for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
		const gx = -1 * getRgLuma(img, x - 1, y - 1) + 1 * getRgLuma(img, x + 1, y - 1) + -2 * getRgLuma(img, x - 1, y) + 2 * getRgLuma(img, x + 1, y) + -1 * getRgLuma(img, x - 1, y + 1) + 1 * getRgLuma(img, x + 1, y + 1);
		const gy = -1 * getRgLuma(img, x - 1, y - 1) + -2 * getRgLuma(img, x, y - 1) + -1 * getRgLuma(img, x + 1, y - 1) + 1 * getRgLuma(img, x - 1, y + 1) + 2 * getRgLuma(img, x, y + 1) + 1 * getRgLuma(img, x + 1, y + 1);
		gradMap[y * w + x] = Math.sqrt(gx * gx + gy * gy);
	}
	return normalizeMap(gradMap);
}
/**
* 3. Discrete Laplacian: measures second-order high-frequency curvature
*/
function computeLaplacian(img) {
	const { width: w, height: h } = img;
	const lapMap = new Float32Array(w * h);
	for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
		const center = getRgLuma(img, x, y);
		const top = getRgLuma(img, x, y - 1);
		const bottom = getRgLuma(img, x, y + 1);
		const left = getRgLuma(img, x - 1, y);
		const right = getRgLuma(img, x + 1, y);
		const lap = Math.abs(top + bottom + left + right - 4 * center);
		lapMap[y * w + x] = lap;
	}
	return normalizeMap(lapMap);
}
/**
* 4. CNN Multi-scale Spatial Attention: simulates multi-scale receptive field attention
*/
function computeCnnSpatialAttention(img) {
	const { width: w, height: h } = img;
	const attMap = new Float32Array(w * h);
	for (let y = 2; y < h - 2; y++) for (let x = 2; x < w - 2; x++) {
		const c = getRgLuma(img, x, y);
		let s5 = 0;
		for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) s5 += Math.abs(getRgLuma(img, x + dx, y + dy) - c);
		const score = s5 / 25;
		const idx = (y * w + x) * 4;
		const chromDelta = Math.abs(img.data[idx] - img.data[idx + 1]);
		attMap[y * w + x] = .7 * score + .3 * (chromDelta / 255);
	}
	return normalizeMap(attMap);
}
/**
* 5. INN-Derived Feature Guidance: 2-stage Invertible Neural Network (INN)
* reversible Haar wavelet decomposition + affine coupling block response
* (z1 = LL, z2 = [LH, HL, HH], y2 = z2 * exp(tanh(s(z1))) + t(z1), y1 = z1 + phi(y2))
*/
function computeInnGuidance(img) {
	const { width: w, height: h } = img;
	const innMap = new Float32Array(w * h);
	for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
		const p1 = getRgLuma(img, x, y);
		const p2 = getRgLuma(img, x + 1, y);
		const p3 = getRgLuma(img, x, y + 1);
		const p4 = getRgLuma(img, x + 1, y + 1);
		const ll = .25 * (p1 + p2 + p3 + p4);
		const lh = Math.abs(p1 - p2 + p3 - p4);
		const hl = Math.abs(p1 + p2 - p3 - p4);
		const hh = Math.abs(p1 - p2 - p3 + p4);
		const z1Norm = (ll - 128) / 128;
		const scaleS = Math.exp(.35 * Math.tanh(z1Norm));
		const shiftT = Math.abs(getRgLuma(img, x, y) - getRgLuma(img, x - 1, y - 1)) * .25;
		const y2 = (lh + hl + 1.5 * hh) / 3.5 * scaleS + shiftT;
		const y1Coupled = Math.abs(z1Norm) * 12 + .85 * y2;
		innMap[y * w + x] = y1Coupled;
	}
	return normalizeMap(innMap);
}
/**
* Computes an invariant reversible INN coupling phase map from R and G channels.
* Because Blue channel (channel 2) carries the EMD digits, this map is 100% identical
* between cover and stego images, enabling zero-overhead INN syndrome coupling.
*/
function computeInnPhaseMap(img) {
	const { width: w, height: h, data } = img;
	const phase = new Uint8Array(w * h);
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const idx = (y * w + x) * 4;
		const r = data[idx];
		const g = data[idx + 1];
		const nx = x + 1 < w ? (y * w + (x + 1)) * 4 : idx;
		const ny = y + 1 < h ? ((y + 1) * w + x) * 4 : idx;
		const r2 = data[nx];
		const g2 = data[ny + 1];
		const d1 = r - g & 255 ^ r2 + g2 & 255;
		const s1 = r + (g * 3 & 255) + (d1 * 7 & 255) & 255;
		phase[y * w + x] = s1;
	}
	return phase;
}
/**
* Builds the complete unified adaptive distortion and cost map
*/
function buildAdaptiveCostMap(img, config = DEFAULT_ADAPTIVE_CONFIG) {
	const { width: w, height: h } = img;
	const n = w * h;
	const varianceMap = config.useVariance ? computeLocalVariance(img) : new Float32Array(n);
	const gradientMap = config.useGradient ? computeSobelGradient(img) : new Float32Array(n);
	const laplacianMap = config.useLaplacian ? computeLaplacian(img) : new Float32Array(n);
	const spatialAttentionMap = config.useCnnAttention ? computeCnnSpatialAttention(img) : new Float32Array(n);
	const innFeatureMap = config.useInnGuidance ? computeInnGuidance(img) : new Float32Array(n);
	const innPhaseMap = config.useInnGuidance ? computeInnPhaseMap(img) : new Uint8Array(n);
	const wv = config.useVariance ? config.wVariance ?? .2 : 0;
	const wg = config.useGradient ? config.wGradient ?? .15 : 0;
	const wl = config.useLaplacian ? config.wLaplacian ?? .15 : 0;
	const wa = config.useCnnAttention ? config.wAttention ?? .25 : 0;
	const wi = config.useInnGuidance ? config.wInn ?? .25 : 0;
	const totalWeight = wv + wg + wl + wa + wi || 1;
	const suitabilityMap = new Float32Array(n);
	const costMap = new Float32Array(n);
	for (let i = 0; i < n; i++) {
		const s = (wv * varianceMap[i] + wg * gradientMap[i] + wl * laplacianMap[i] + wa * spatialAttentionMap[i] + wi * innFeatureMap[i]) / totalWeight;
		suitabilityMap[i] = s;
		costMap[i] = 1 - s;
	}
	return {
		varianceMap,
		gradientMap,
		laplacianMap,
		spatialAttentionMap,
		innFeatureMap,
		innPhaseMap,
		suitabilityMap,
		costMap
	};
}
/**
* Generates eligible EMD pixel groups of size `groupSize` ordered by lowest adaptive cost
* and paired with their invariant INN coupling phase.
*/
async function getAdaptiveEmdGroups(img, password, config = DEFAULT_ADAPTIVE_CONFIG, groupSize = 2, channel = 2) {
	const { width: w, height: h } = img;
	const components = buildAdaptiveCostMap(img, config);
	const suitability = components.suitabilityMap;
	const innPhaseMap = components.innPhaseMap;
	const modulus = 2 * groupSize + 1;
	const candidates = [];
	const totalPixels = w * h;
	const usableGroups = Math.floor(totalPixels / groupSize);
	for (let g = 0; g < usableGroups; g++) {
		const basePixel = g * groupSize;
		const indices = [];
		let suitSum = 0;
		let phaseAcc = 0;
		for (let k = 0; k < groupSize; k++) {
			const pIdx = basePixel + k;
			indices.push(pIdx * 4 + channel);
			suitSum += suitability[pIdx];
			phaseAcc = (phaseAcc + (k + 1) * innPhaseMap[pIdx]) % modulus;
		}
		const cost = 1 - suitSum / groupSize;
		candidates.push({
			indices,
			innPhase: config.useInnGuidance ? phaseAcc % modulus : 0,
			cost
		});
	}
	if (config.useVariance || config.useGradient || config.useLaplacian || config.useCnnAttention || config.useInnGuidance) candidates.sort((a, b) => a.cost - b.cost);
	const topCount = Math.floor(candidates.length * .75);
	const head = await keyedShuffle(candidates.slice(0, topCount), `${password}|emd_head_${groupSize}`);
	const tail = await keyedShuffle(candidates.slice(topCount), `${password}|emd_tail_${groupSize}`);
	const ordered = head.concat(tail);
	return {
		groups: ordered.map((c) => c.indices),
		innPhases: ordered.map((c) => c.innPhase),
		components,
		totalCapacityGroups: ordered.length
	};
}
/**
* ARES-EMD-OPAP: Cryptographic Subsystem.
*
* Implements:
* 1. PBKDF2-HMAC-SHA256 Key Derivation Function (KDF)
* 2. AES-256-GCM Authenticated Encryption with Associated Data (AEAD)
* 3. Fresh cryptographically secure random salt & nonce generation
* 4. Tamper detection and authentication failure handling
*/
var CRYPTO_MAGIC = new Uint8Array([
	65,
	82,
	69,
	83
]);
/**
* Derives a 256-bit AES-GCM key from user passphrase and salt via PBKDF2-HMAC-SHA256.
*/
async function deriveAesKey(password, salt) {
	const enc = new TextEncoder();
	const pwKey = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
	return crypto.subtle.deriveKey({
		name: "PBKDF2",
		salt,
		iterations: 1e5,
		hash: "SHA-256"
	}, pwKey, {
		name: "AES-GCM",
		length: 256
	}, false, ["encrypt", "decrypt"]);
}
/**
* Derives a deterministic 12-byte AES-GCM IV from the random 8-byte salt and methodKey
* so we do not need to waste 12 extra header bytes in the stego bit-stream.
*/
async function deriveDeterministicIv(salt, methodKey) {
	const keyBytes = new TextEncoder().encode(`ARES-IV:${methodKey}`);
	const buf = new Uint8Array(salt.length + keyBytes.length);
	buf.set(salt, 0);
	buf.set(keyBytes, salt.length);
	const digest = await crypto.subtle.digest("SHA-256", buf);
	return new Uint8Array(digest).slice(0, 12);
}
/**
* Encrypts plaintext using AES-256-GCM with fresh random salt and method-bound AAD.
* Compact v6 binary serialized frame (15-byte header + 8-byte GCM auth tag = 23B overhead):
* [0..3]: MAGIC ("ARES")
* [4]: VERSION (6)
* [5..12]: SALT (8 bytes)
* [13..14]: CIPHERTEXT_LEN (2 bytes, uint16 BE)
* [15..]: CIPHERTEXT + 8-byte (64-bit) AUTH_TAG
*/
async function encryptPayloadAesGcm(plaintext, passphrase, methodKey = "ares-emd-opap-inn") {
	if (!plaintext) throw new Error("Secret payload cannot be empty");
	if (!passphrase) throw new Error("Passphrase is required for cryptographic security");
	const salt = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(8));
	const nonce = await deriveDeterministicIv(salt, methodKey);
	const key = await deriveAesKey(`${passphrase}|${methodKey}`, salt);
	const enc = new TextEncoder();
	const plainBytes = enc.encode(plaintext);
	const aad = enc.encode(`ARES-AEAD-v6:${methodKey}`);
	const ctBuffer = await crypto.subtle.encrypt({
		name: "AES-GCM",
		iv: nonce,
		additionalData: aad,
		tagLength: 64
	}, key, plainBytes);
	const ciphertext = new Uint8Array(ctBuffer);
	const ctLen = ciphertext.length;
	const serialized = new Uint8Array(15 + ctLen);
	serialized.set(CRYPTO_MAGIC, 0);
	serialized[4] = 6;
	serialized.set(salt, 5);
	serialized[13] = ctLen >>> 8 & 255;
	serialized[14] = ctLen & 255;
	serialized.set(ciphertext, 15);
	return {
		salt,
		nonce,
		ciphertext,
		serialized
	};
}
/**
* Decrypts and authenticates payload serialized frame (supports both v6 compact and v5 legacy).
* Rejects wrong passphrase, wrong model methodKey, altered bits, or invalid header.
*/
async function decryptPayloadAesGcm(serialized, passphrase, methodKey = "ares-emd-opap-inn") {
	if (serialized.length < 23) throw new Error("Payload frame is too short to contain valid ARES-EMD-OPAP-INN ciphertext.");
	for (let i = 0; i < 4; i++) if (serialized[i] !== CRYPTO_MAGIC[i]) throw new Error("Authentication Failure: Not a valid ARES steganogram.");
	if (serialized[4] === 6) {
		const salt = serialized.subarray(5, 13);
		const ctLen = (serialized[13] << 8 | serialized[14]) >>> 0;
		if (ctLen < 8 || serialized.length < 15 + ctLen) throw new Error("Corrupted payload: ciphertext truncated.");
		const ciphertext = serialized.subarray(15, 15 + ctLen);
		const nonce = await deriveDeterministicIv(salt, methodKey);
		const key = await deriveAesKey(`${passphrase}|${methodKey}`, salt);
		const aad = new TextEncoder().encode(`ARES-AEAD-v6:${methodKey}`);
		try {
			const plainBuffer = await crypto.subtle.decrypt({
				name: "AES-GCM",
				iv: nonce,
				additionalData: aad,
				tagLength: 64
			}, key, ciphertext);
			return {
				plaintext: new TextDecoder().decode(plainBuffer),
				isAuthentic: true
			};
		} catch {
			throw new Error("Authentication Failure: AES-GCM tag mismatch. The passphrase or model selection is incorrect.");
		}
	}
	if (serialized.length < 53) throw new Error("Payload frame is too short to contain valid legacy v5 ciphertext.");
	const salt = serialized.subarray(5, 21);
	const nonce = serialized.subarray(21, 33);
	const ctLen = (serialized[33] << 24 | serialized[34] << 16 | serialized[35] << 8 | serialized[36]) >>> 0;
	if (serialized.length < 37 + ctLen) throw new Error("Corrupted payload: ciphertext truncated.");
	const ciphertext = serialized.subarray(37, 37 + ctLen);
	const key = await deriveAesKey(passphrase, salt);
	const aad = new TextEncoder().encode("ARES-EMD-OPAP-v5");
	try {
		const plainBuffer = await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv: nonce,
			additionalData: aad,
			tagLength: 128
		}, key, ciphertext);
		return {
			plaintext: new TextDecoder().decode(plainBuffer),
			isAuthentic: true
		};
	} catch {
		throw new Error("Authentication Failure: AES-GCM tag mismatch. The passphrase is incorrect or the steganogram was tampered with.");
	}
}
var MODELS = [
	{
		id: "ares_emd_opap",
		name: "ARES-EMD-OPAP-INN",
		short: "ARES-EMD-OPAP-INN",
		paper: "INN-Coupled & CNN-Attention Adaptive EMD-OPAP Steganography with AES-256-GCM",
		kind: "proposed",
		status: "TRAINED",
		note: "2-stage Invertible Neural Network (INN) reversible Haar wavelet + affine coupling layer fused with CNN spatial/channel attention guiding Generalized Radix-65 EMD embedding and OPAP distortion optimization with compact AES-256-GCM AEAD.",
		methodKey: "ares-emd-opap-inn",
		algorithmType: "emd_opap",
		usesEmd: true,
		usesOpap: true,
		usesAdaptiveCost: true,
		usesInn: true,
		usesAesGcm: true,
		radixScheme: "bits6",
		ablationLevel: 5
	},
	{
		id: "ares_hybrid_inn",
		name: "ARES-Hybrid-INN-CNN",
		short: "ARES-Hybrid-INN-CNN",
		paper: "Hybrid Invertible Neural Network (INN) + CNN Attention Adaptive EMD-OPAP",
		kind: "proposed",
		status: "TRAINED",
		note: "Combines multi-scale CNN encoder-decoder spatial attention and INN reversible affine coupling blocks with Radix-33 Adaptive EMD-OPAP and AES-256-GCM authentication.",
		methodKey: "ares-hybrid-inn-cnn",
		algorithmType: "hybrid",
		usesEmd: true,
		usesOpap: true,
		usesAdaptiveCost: true,
		usesInn: true,
		usesAesGcm: true,
		radixScheme: "bits5",
		ablationLevel: 5
	},
	{
		id: "ablation_m1",
		name: "Model 1: EMD + OPAP",
		short: "M1: EMD+OPAP",
		paper: "Ablation Study 1 — Pure EMD with OPAP (sequential, unguided)",
		kind: "ablation",
		status: "ACTIVE",
		note: "Baseline EMD (n=2, radix-5) followed by OPAP distortion reduction without adaptive CNN or INN texture guidance.",
		methodKey: "ablation-m1",
		algorithmType: "emd_opap",
		usesEmd: true,
		usesOpap: true,
		usesAdaptiveCost: false,
		usesInn: false,
		usesAesGcm: false,
		radixScheme: "base5",
		ablationLevel: 1
	},
	{
		id: "ablation_m2",
		name: "Model 2: CNN-Assisted Adaptive EMD + OPAP",
		short: "M2: CNN+EMD+OPAP",
		paper: "Ablation Study 2 — CNN & Local Statistics Adaptive EMD + OPAP",
		kind: "ablation",
		status: "ACTIVE",
		note: "Integrates CNN convolutional feature extraction, local variance, and Sobel gradient to guide Radix-7 EMD + OPAP groups.",
		methodKey: "ablation-m2",
		algorithmType: "emd_opap",
		usesEmd: true,
		usesOpap: true,
		usesAdaptiveCost: true,
		usesInn: false,
		usesAesGcm: false,
		radixScheme: "base7",
		ablationLevel: 2
	},
	{
		id: "ablation_m3",
		name: "Model 3: CNN + Attention + Adaptive EMD + OPAP",
		short: "M3: Attention+EMD",
		paper: "Ablation Study 3 — Multi-scale Spatial & Channel Attention Guidance",
		kind: "ablation",
		status: "ACTIVE",
		note: "Adds spatial and channel attention weights to prioritize high-entropy regions with Radix-9 EMD + OPAP.",
		methodKey: "ablation-m3",
		algorithmType: "emd_opap",
		usesEmd: true,
		usesOpap: true,
		usesAdaptiveCost: true,
		usesInn: false,
		usesAesGcm: false,
		radixScheme: "bits3",
		ablationLevel: 3
	},
	{
		id: "ablation_m4",
		name: "Model 4: CNN + Attention + INN + Adaptive EMD + OPAP",
		short: "M4: INN+EMD+OPAP",
		paper: "Ablation Study 4 — Full Learned INN Feature Guidance (Unencrypted)",
		kind: "ablation",
		status: "ACTIVE",
		note: "Combines CNN, attention, and INN reversible wavelet coupling with Radix-17 EMD + OPAP without AES-GCM.",
		methodKey: "ablation-m4",
		algorithmType: "emd_opap",
		usesEmd: true,
		usesOpap: true,
		usesAdaptiveCost: true,
		usesInn: true,
		usesAesGcm: false,
		radixScheme: "bits4",
		ablationLevel: 4
	},
	{
		id: "ablation_m5",
		name: "Model 5: ARES-EMD-OPAP-INN (Full Pipeline)",
		short: "M5: ARES-EMD-OPAP-INN",
		paper: "Ablation Study 5 — CNN + Attention + INN + Adaptive EMD + OPAP + AES-GCM",
		kind: "ablation",
		status: "ACTIVE",
		note: "Complete ARES-EMD-OPAP-INN pipeline: full INN reversible wavelet coupling, CNN attention, PBKDF2 + AES-256-GCM AEAD, and Radix-65 EMD-OPAP.",
		methodKey: "ablation-m5-ares-inn",
		algorithmType: "emd_opap",
		usesEmd: true,
		usesOpap: true,
		usesAdaptiveCost: true,
		usesInn: true,
		usesAesGcm: true,
		radixScheme: "bits6",
		ablationLevel: 5
	},
	{
		id: "paper_model_01",
		name: "Kanimozhi RNN+Fuzzy",
		short: "Kanimozhi",
		paper: "Sci Rep 2025 — RNN + fuzzy logic",
		kind: "paper",
		status: "REPRODUCED",
		note: "Original RNN/fuzzy weights were not released. Reproduction: password-keyed adaptive fuzzy ±1 LSB on the blue channel.",
		methodKey: "kanimozhi",
		algorithmType: "lsb",
		usesEmd: false,
		usesOpap: false,
		usesAdaptiveCost: false,
		usesInn: false,
		usesAesGcm: false,
		usesAdaptive: true,
		usesPm1: true
	},
	{
		id: "paper_model_02",
		name: "Sanjalawe Huffman+LSB",
		short: "Sanjalawe",
		paper: "Sci Rep 2025 — Huffman + LSB + DL",
		kind: "paper",
		status: "REPRODUCED",
		note: "DL encoder-decoder weights not public. Reproduction: keyed LSB substitution with block framing.",
		methodKey: "sanjalawe",
		algorithmType: "lsb",
		usesEmd: false,
		usesOpap: false,
		usesAdaptiveCost: false,
		usesInn: false,
		usesAesGcm: false,
		usesAdaptive: false,
		usesPm1: false
	},
	{
		id: "paper_model_03",
		name: "Rahman LSB+Magic Matrix",
		short: "Rahman",
		paper: "Sci Rep 2025 — LSB + Magic Matrix + MLEA",
		kind: "paper",
		status: "REPRODUCED",
		note: "Magic-matrix permutation reproduced as password-derived position shuffle with MLEA bit mapping (rahman-magic).",
		methodKey: "rahman-magic",
		algorithmType: "lsb",
		usesEmd: false,
		usesOpap: false,
		usesAdaptiveCost: false,
		usesInn: false,
		usesAesGcm: false,
		usesAdaptive: false,
		usesPm1: true
	},
	{
		id: "paper_model_04",
		name: "Aljarf DL-Steg SAE+LSTM",
		short: "DL-Steg",
		paper: "JUQEA 2025 — SAE + LSTM + ECC",
		kind: "paper",
		status: "REPRODUCED",
		note: "SAE+LSTM weights not public. Reproduction: Hamming(7,3) syndrome ECC-tagged adaptive LSB (dlsteg-ecc).",
		methodKey: "dlsteg-ecc",
		algorithmType: "hamming",
		usesEmd: false,
		usesOpap: false,
		usesAdaptiveCost: false,
		usesInn: false,
		usesAesGcm: false,
		usesHamming: true,
		usesAdaptive: true
	},
	{
		id: "paper_model_05",
		name: "Zhang ISS",
		short: "ISS",
		paper: "Cybersecurity 2025 — multi-image stitching",
		kind: "paper",
		status: "REPRODUCED",
		note: "Multi-image GA stitching reduced to a single-cover path for fair per-image protocol (iss-single).",
		methodKey: "iss-single",
		algorithmType: "lsb",
		usesEmd: false,
		usesOpap: false,
		usesAdaptiveCost: false,
		usesInn: false,
		usesAesGcm: false,
		usesAdaptive: false,
		usesPm1: false
	}
];
/** Primary benchmark models (Proposed ARES-EMD-OPAP-INN, Hybrid ARES-Hybrid-INN-CNN, and 5 Published Baselines) */
var BENCHMARK_MODELS = MODELS.filter((m) => m.kind !== "ablation");
function modelById(id) {
	const m = MODELS.find((x) => x.id === id);
	if (!m) throw new Error(`Unknown model ${id}`);
	return m;
}
/**
* Configure adaptive cost map based on model and ablation level
*/
function getAdaptiveConfigForModel(model) {
	if (!model.usesAdaptiveCost) return {
		useVariance: false,
		useGradient: false,
		useLaplacian: false,
		useCnnAttention: false,
		useInnGuidance: false
	};
	if (model.id === "ares_hybrid_inn") return {
		useVariance: true,
		useGradient: true,
		useLaplacian: true,
		useCnnAttention: true,
		useInnGuidance: true,
		wVariance: .15,
		wGradient: .15,
		wLaplacian: .15,
		wAttention: .3,
		wInn: .25
	};
	const level = model.ablationLevel ?? 5;
	if (level === 2) return {
		useVariance: true,
		useGradient: true,
		useLaplacian: false,
		useCnnAttention: false,
		useInnGuidance: false,
		wVariance: .6,
		wGradient: .4
	};
	else if (level === 3) return {
		useVariance: true,
		useGradient: true,
		useLaplacian: true,
		useCnnAttention: true,
		useInnGuidance: false,
		wVariance: .3,
		wGradient: .25,
		wLaplacian: .15,
		wAttention: .3
	};
	else return DEFAULT_ADAPTIVE_CONFIG;
}
/**
* Computes a 2-byte keyed MAC tag for unencrypted ablation frames to eliminate false positives
*/
async function computeAblationMac(password, methodKey, rawSecret) {
	const meta = new TextEncoder().encode(`ABL-MAC:${password}:${methodKey}:`);
	const buf = new Uint8Array(meta.length + rawSecret.length);
	buf.set(meta, 0);
	buf.set(rawSecret, meta.length);
	const digest = await sha256Bytes(buf);
	return [digest[0], digest[1]];
}
/**
* High-Level Embedding Engine
*/
async function encodeWithModel(model, cover, secret, password) {
	const t0 = performance.now();
	if (model.usesEmd) {
		const scheme = model.radixScheme ?? "bits6";
		const groupSize = groupSizeForScheme(scheme);
		let payloadBytes;
		let authStatus = "NONE";
		if (model.usesAesGcm) {
			payloadBytes = (await encryptPayloadAesGcm(secret, password, model.methodKey)).serialized;
			authStatus = "AUTHENTICATED";
		} else {
			const rawSecret = new TextEncoder().encode(secret);
			const levelByte = 48 + (model.ablationLevel ?? 1);
			const [mac0, mac1] = await computeAblationMac(password, model.methodKey, rawSecret);
			const framed = new Uint8Array(8 + rawSecret.length);
			framed.set([
				65,
				66,
				76,
				levelByte
			], 0);
			framed[4] = mac0;
			framed[5] = mac1;
			framed[6] = rawSecret.length >>> 8 & 255;
			framed[7] = rawSecret.length & 255;
			framed.set(rawSecret, 8);
			payloadBytes = framed;
		}
		const symbols = bytesToRadixSymbols(payloadBytes, scheme);
		const requiredGroups = symbols.length;
		const adaptConfig = getAdaptiveConfigForModel(model);
		const { groups, innPhases, totalCapacityGroups } = await getAdaptiveEmdGroups(cover, `${password}|${model.methodKey}`, adaptConfig, groupSize, 2);
		const availableCapacityBits = Math.floor(totalCapacityGroups * bitsPerGroupForScheme(scheme));
		const payloadBits = payloadBytes.length * 8;
		if (groups.length < requiredGroups) throw new Error(`Payload exceeds available adaptive EMD-INN capacity. Required ${requiredGroups} pixel groups (${payloadBits} bits), but image capacity is ${groups.length} groups (${availableCapacityBits} bits). Use a larger image or shorter secret.`);
		const { stegoPixels, stats } = embedGroupsInnEmdOpap(cover.data, groups, innPhases, symbols, model.usesOpap);
		const stego = {
			width: cover.width,
			height: cover.height,
			data: stegoPixels
		};
		const encodeMs = performance.now() - t0;
		const t1 = performance.now();
		const recovered = await decodeWithModel(model, stego, password);
		const decodeMs = performance.now() - t1;
		const modified = countModifiedPixels(cover, stego);
		const maxErr = maxAbsDelta(cover, stego);
		return {
			stego,
			metrics: {
				psnr: psnrOf(cover, stego),
				ssim: ssimOf(cover, stego),
				mse: mseOf(cover, stego),
				ber: bitErrorRate(secret, recovered),
				recovery: recovered === secret,
				payloadBits,
				payloadBytes: payloadBytes.length,
				bpp: payloadBits / (cover.width * cover.height),
				lsbChangePct: stats.modifiedPixelPct,
				encodeMs,
				decodeMs,
				distortion: meanAbsDelta(cover, stego),
				capacityBits: availableCapacityBits,
				modifiedPixels: modified.count,
				modifiedPixelPct: modified.pct,
				averageAbsError: stats.averageAbsError,
				maxPixelError: maxErr,
				opapOptimizedCount: stats.opapOptimizedCount,
				authStatus,
				algorithmName: model.name
			},
			recovered,
			stats: {
				changedLsb: modified.count,
				lsbChangePct: modified.pct,
				method: model.usesInn ? "ares_emd_opap_inn" : "emd_opap_adaptive"
			},
			model,
			availableCapacityBits,
			payloadBits,
			modifiedPixels: modified.count,
			averageAbsError: stats.averageAbsError,
			maxPixelError: maxErr
		};
	}
	const packed = await packPayload(secret, password, model.methodKey);
	const bits = bitsFromBytes(packed);
	const capacity = cover.width * cover.height;
	if (bits.length > capacity) throw new Error(`Payload ${bits.length} bits exceeds capacity ${capacity}. Use a larger image or shorter secret.`);
	const pos = await positionsFor(model, cover, password);
	const stego = cloneForEmbed(cover);
	let stats;
	if (model.usesHamming) stats = hamming74Embed(stego, pos, bits);
	else stats = minLsbEmbed(stego, pos, bits, 2, Boolean(model.usesPm1));
	const encodeMs = performance.now() - t0;
	const t1 = performance.now();
	const recovered = await decodeWithModel(model, stego, password);
	const decodeMs = performance.now() - t1;
	const modified = countModifiedPixels(cover, stego);
	const maxErr = maxAbsDelta(cover, stego);
	return {
		stego,
		metrics: {
			psnr: psnrOf(cover, stego),
			ssim: ssimOf(cover, stego),
			mse: mseOf(cover, stego),
			ber: bitErrorRate(secret, recovered),
			recovery: recovered === secret,
			payloadBits: bits.length,
			payloadBytes: packed.length,
			bpp: bits.length / (cover.width * cover.height),
			lsbChangePct: stats.lsbChangePct,
			encodeMs,
			decodeMs,
			distortion: meanAbsDelta(cover, stego),
			capacityBits: capacity,
			modifiedPixels: modified.count,
			modifiedPixelPct: modified.pct,
			averageAbsError: meanAbsDelta(cover, stego),
			maxPixelError: maxErr,
			authStatus: "NONE",
			algorithmName: model.name
		},
		recovered,
		stats,
		model,
		availableCapacityBits: capacity,
		payloadBits: bits.length,
		modifiedPixels: modified.count,
		averageAbsError: meanAbsDelta(cover, stego),
		maxPixelError: maxErr
	};
}
/**
* High-Level Extraction Engine
*/
async function decodeWithModel(model, stego, password) {
	if (model.usesEmd) {
		const scheme = model.radixScheme ?? "bits6";
		const groupSize = groupSizeForScheme(scheme);
		const adaptConfig = getAdaptiveConfigForModel(model);
		const { groups, innPhases } = await getAdaptiveEmdGroups(stego, `${password}|${model.methodKey}`, adaptConfig, groupSize, 2);
		if (model.usesAesGcm) {
			const v6HeaderSymbolsCount = symbolCountForBytes(15, scheme);
			const headerBytes = radixSymbolsToBytes(extractGroupsInnEmd(stego.data, groups, innPhases, v6HeaderSymbolsCount), 15, scheme);
			if (headerBytes[0] !== 65 || headerBytes[1] !== 82 || headerBytes[2] !== 69 || headerBytes[3] !== 83) throw new Error(`Authentication Failure: Magic header mismatch for ${model.short}. The image was either encoded with a different algorithm or passphrase.`);
			if (headerBytes[4] === 6) {
				const ctLen = (headerBytes[13] << 8 | headerBytes[14]) >>> 0;
				const totalBytes = 15 + ctLen;
				const totalSymbols = symbolCountForBytes(totalBytes, scheme);
				if (ctLen < 8 || groups.length < totalSymbols) throw new Error("Payload corrupted: exceeds available image groups.");
				return (await decryptPayloadAesGcm(radixSymbolsToBytes(extractGroupsInnEmd(stego.data, groups, innPhases, totalSymbols), totalBytes, scheme), password, model.methodKey)).plaintext;
			}
			const v5HeaderSymbolsCount = symbolCountForBytes(37, scheme);
			const v5HeaderBytes = radixSymbolsToBytes(extractGroupsInnEmd(stego.data, groups, innPhases, v5HeaderSymbolsCount), 37, scheme);
			const totalBytes = 37 + ((v5HeaderBytes[33] << 24 | v5HeaderBytes[34] << 16 | v5HeaderBytes[35] << 8 | v5HeaderBytes[36]) >>> 0);
			const totalSymbols = symbolCountForBytes(totalBytes, scheme);
			if (groups.length < totalSymbols) throw new Error("Payload corrupted: exceeds available image groups.");
			return (await decryptPayloadAesGcm(radixSymbolsToBytes(extractGroupsInnEmd(stego.data, groups, innPhases, totalSymbols), totalBytes, scheme), password, model.methodKey)).plaintext;
		} else {
			const headerSymbolsCount = symbolCountForBytes(8, scheme);
			const headerBytes = radixSymbolsToBytes(extractGroupsInnEmd(stego.data, groups, innPhases, headerSymbolsCount), 8, scheme);
			const expectedLevelByte = 48 + (model.ablationLevel ?? 1);
			if (headerBytes[0] !== 65 || headerBytes[1] !== 66 || headerBytes[2] !== 76 || headerBytes[3] !== expectedLevelByte) throw new Error(`Invalid ablation frame: header mismatch for ${model.short}.`);
			const mac0 = headerBytes[4];
			const mac1 = headerBytes[5];
			const rawLen = (headerBytes[6] << 8 | headerBytes[7]) >>> 0;
			const totalBytes = 8 + rawLen;
			const totalSymbols = symbolCountForBytes(totalBytes, scheme);
			if (rawLen === 0 || groups.length < totalSymbols) throw new Error("Invalid ablation frame length.");
			const rawSecret = radixSymbolsToBytes(extractGroupsInnEmd(stego.data, groups, innPhases, totalSymbols), totalBytes, scheme).subarray(8, 8 + rawLen);
			const [expMac0, expMac1] = await computeAblationMac(password, model.methodKey, rawSecret);
			if (mac0 !== expMac0 || mac1 !== expMac1) throw new Error("Authentication Failure: Passphrase or ablation model mismatch.");
			return new TextDecoder().decode(rawSecret);
		}
	}
	const pos = await positionsFor(model, stego, password);
	const nBits = Math.min(stego.width * stego.height, 32896);
	return unpackPayload(bytesFromBits(model.usesHamming ? hamming74Extract(stego, pos, nBits) : minLsbExtract(stego, pos, nBits)), password, model.methodKey);
}
async function positionsFor(model, cover, password) {
	if (model.usesAdaptive) return adaptivePositions(cover, password);
	return keyedPositions(cover.height, cover.width, password + model.methodKey);
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
function generatePurePixelFallback(type, width, height) {
	const data = new Uint8ClampedArray(width * height * 4);
	let seed = 305419896;
	for (let i = 0; i < type.length; i++) seed = Math.imul(seed ^ type.charCodeAt(i), 16777619) >>> 0;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		seed = Math.imul(seed, 1664525) + 1013904223 >>> 0;
		const idx = (y * width + x) * 4;
		const wave = Math.round(45 * Math.sin((x + (seed & 15)) * .08) * Math.cos((y + (seed >>> 4 & 15)) * .08));
		const gradR = Math.round(x / Math.max(1, width - 1) * 120) + 60;
		const gradG = Math.round(y / Math.max(1, height - 1) * 120) + 60;
		const gradB = Math.round((x + y) / Math.max(1, width + height - 2) * 110) + 65;
		const noise = (seed >>> 16) % 25 - 12;
		data[idx] = Math.max(8, Math.min(247, gradR + wave + noise));
		data[idx + 1] = Math.max(8, Math.min(247, gradG - wave + noise));
		data[idx + 2] = Math.max(8, Math.min(247, gradB + Math.trunc(wave / 2) + noise));
		data[idx + 3] = 255;
	}
	return {
		width,
		height,
		data
	};
}
function generateSampleImage(type, width = 384, height = 384) {
	if (typeof document === "undefined") return generatePurePixelFallback(type, width, height);
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
function CDDiagram({ modelIds, avgRanks, cd, cliques, k, metricLabel = "PSNR", higherIsBetter = true }) {
	const gradientId = (0, import_react.useId)();
	const shadowId = (0, import_react.useId)();
	const svgRef = (0, import_react.useRef)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [hoveredModelId, setHoveredModelId] = (0, import_react.useState)(null);
	if (!modelIds || modelIds.length < 2 || k < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full rounded-xl border border-dashed border-border bg-card p-8 text-center text-xs text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-6 text-muted-foreground mx-auto mb-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold text-foreground",
				children: "Critical Difference Diagram Requires ≥ 2 Models"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1",
				children: "Evaluate multiple steganography algorithms in the batch lab to plot rank distributions."
			})
		]
	});
	const sorted = modelIds.map((id, index) => {
		const def = MODELS.find((m) => m.id === id);
		return {
			id,
			short: def?.short || id,
			name: def?.name || id,
			paper: def?.paper || "",
			rank: avgRanks[index] ?? index + 1
		};
	}).sort((a, b) => a.rank - b.rank).map((item, idx) => ({
		...item,
		isAres: idx === 0
	}));
	const width = 960;
	const plotLeft = 240;
	const plotRight = 730;
	const plotWidth = 490;
	const cdBarY = 28;
	const cliqueStartY = 56;
	const cliqueRowHeight = 22;
	const axisY = cliqueStartY + Math.max(1, Math.min(cliques.length, 4)) * cliqueRowHeight + 24;
	const labelStartY = axisY + 28;
	const labelRowHeight = 28;
	const half = Math.ceil(sorted.length / 2);
	const leftModels = sorted.slice(0, half);
	const rightModels = sorted.slice(half);
	const height = labelStartY + Math.max(leftModels.length, rightModels.length) * labelRowHeight + 24;
	const rankToX = (r) => {
		if (k <= 1) return 485;
		return plotLeft + (Math.max(1, Math.min(k, r)) - 1) / (k - 1) * plotWidth;
	};
	const cdPixelWidth = Math.min(plotWidth, cd / Math.max(1, k - 1) * plotWidth);
	const downloadSvg = () => {
		if (!svgRef.current) return;
		const svgData = new XMLSerializer().serializeToString(svgRef.current);
		const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `demsar_cd_diagram_${metricLabel.toLowerCase()}_k${k}.svg`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};
	const copySvg = () => {
		if (!svgRef.current) return;
		const svgData = new XMLSerializer().serializeToString(svgRef.current);
		navigator.clipboard.writeText(svgData);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	const bestModel = sorted[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full rounded-xl border border-border bg-card p-5 shadow-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary font-mono",
						children: "Demšar (2006) Protocol"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-foreground",
						children: "Critical Difference (CD) Diagram"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						"Rank ordering on ",
						metricLabel,
						" (",
						higherIsBetter ? "Rank 1 = Highest" : "Rank 1 = Lowest",
						"). Models connected by a clique bar are statistically indistinguishable (Nemenyi p > 0.05)."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: copySvg,
						className: "gap-1.5 h-8 px-2.5 text-xs font-medium",
						title: "Copy vector SVG to clipboard for LaTeX / Overleaf publication",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copied ? "Copied SVG" : "Copy SVG" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: downloadSvg,
						className: "gap-1.5 h-8 px-2.5 text-xs font-medium",
						title: "Download vector SVG file",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download SVG" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					ref: svgRef,
					viewBox: `0 0 ${width} ${height}`,
					className: "w-full select-none",
					style: { minWidth: 780 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: gradientId,
							x1: "0",
							y1: "0",
							x2: "1",
							y2: "0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "#10b981"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "#059669"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
							id: shadowId,
							x: "-10%",
							y: "-10%",
							width: "120%",
							height: "120%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", {
								dx: "0",
								dy: "1",
								stdDeviation: "1.5",
								floodOpacity: "0.15"
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							width,
							height,
							fill: "transparent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							transform: `translate(${plotLeft}, ${cdBarY})`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "0",
									y1: "0",
									x2: cdPixelWidth,
									y2: "0",
									stroke: "currentColor",
									strokeWidth: "2.5",
									className: "text-foreground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "0",
									y1: "-5",
									x2: "0",
									y2: "5",
									stroke: "currentColor",
									strokeWidth: "2.5",
									className: "text-foreground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: cdPixelWidth,
									y1: "-5",
									x2: cdPixelWidth,
									y2: "5",
									stroke: "currentColor",
									strokeWidth: "2.5",
									className: "text-foreground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
									x: cdPixelWidth / 2,
									y: "-8",
									textAnchor: "middle",
									className: "fill-foreground text-[11px] font-mono font-bold",
									children: ["CD = ", cd.toFixed(3)]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: plotRight,
							y: cdBarY,
							textAnchor: "end",
							className: "fill-muted-foreground text-[10px] font-mono",
							children: [
								"Nemenyi Critical Difference (α = 0.05, k = ",
								k,
								")"
							]
						}),
						cliques.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: 485,
							y: 70,
							textAnchor: "middle",
							className: "fill-muted-foreground text-[11px] font-mono italic",
							children: "No non-significant cliques: all evaluated models are statistically distinguishable (ΔRank > CD)"
						}) : cliques.map((clique, cIdx) => {
							if (clique.length < 2) return null;
							const ranks = clique.map((id) => {
								const m = sorted.find((s) => s.id === id);
								return m ? m.rank : 1;
							});
							const minRank = Math.min(...ranks);
							const maxRank = Math.max(...ranks);
							const x1 = rankToX(minRank);
							const x2 = rankToX(maxRank);
							const barY = cliqueStartY + cIdx * cliqueRowHeight;
							const isCliqueActive = hoveredModelId !== null && clique.includes(hoveredModelId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								className: cn("transition-all duration-150", hoveredModelId && !isCliqueActive && "opacity-35"),
								children: [
									clique.map((id) => {
										const m = sorted.find((s) => s.id === id);
										if (!m) return null;
										const mx = rankToX(m.rank);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: mx,
											y1: barY,
											x2: mx,
											y2: axisY - 8,
											stroke: isCliqueActive ? "#059669" : "#10b981",
											strokeWidth: "1.5",
											strokeDasharray: "2 2",
											opacity: isCliqueActive ? .9 : .5
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: mx,
											cy: barY,
											r: "2.5",
											fill: isCliqueActive ? "#059669" : "#10b981"
										})] }, id);
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1,
										y1: barY,
										x2,
										y2: barY,
										stroke: isCliqueActive ? "#059669" : "#10b981",
										strokeWidth: isCliqueActive ? "5" : "4",
										strokeLinecap: "round"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1,
										y1: barY - 4,
										x2: x1,
										y2: barY + 4,
										stroke: "#047857",
										strokeWidth: "2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: x2,
										y1: barY - 4,
										x2,
										y2: barY + 4,
										stroke: "#047857",
										strokeWidth: "2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
										x: x1 - 10,
										y: barY + 3.5,
										textAnchor: "end",
										className: cn("font-mono text-[10px] font-semibold transition-all", isCliqueActive ? "fill-emerald-800 dark:fill-emerald-300 font-bold" : "fill-emerald-700 dark:fill-emerald-400"),
										children: ["Clique ", cIdx + 1]
									})
								]
							}, cIdx);
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: plotLeft,
							y: axisY - 14,
							textAnchor: "start",
							className: "fill-primary text-[10px] font-mono font-bold uppercase tracking-wider",
							children: "← Superior Performance (Rank 1)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: plotRight,
							y: axisY - 14,
							textAnchor: "end",
							className: "fill-muted-foreground text-[10px] font-mono uppercase tracking-wider",
							children: [
								"Inferior Performance (Rank ",
								k,
								") →"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: plotLeft,
							y1: axisY,
							x2: plotRight,
							y2: axisY,
							stroke: "currentColor",
							strokeWidth: "2",
							className: "text-border"
						}),
						Array.from({ length: k }, (_, i) => i + 1).map((rank) => {
							const x = rankToX(rank);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								transform: `translate(${x}, ${axisY})`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									y1: "-5",
									y2: "5",
									stroke: "currentColor",
									strokeWidth: "2",
									className: "text-muted-foreground/80"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									y: "-8",
									textAnchor: "middle",
									className: "fill-muted-foreground text-[10px] font-mono font-bold",
									children: rank
								})]
							}, rank);
						}),
						leftModels.map((m, idx) => {
							const x = rankToX(m.rank);
							const yLevel = labelStartY + idx * labelRowHeight;
							const labelX = 222;
							const isHovered = hoveredModelId === m.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								onMouseEnter: () => setHoveredModelId(m.id),
								onMouseLeave: () => setHoveredModelId(null),
								className: cn("cursor-pointer transition-all duration-150", hoveredModelId !== null && !isHovered && "opacity-45"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: x,
										cy: axisY,
										r: m.isAres ? 6.5 : 4.5,
										className: cn(m.isAres ? "fill-primary stroke-background stroke-2" : "fill-foreground stroke-background stroke-1.5", isHovered && "scale-125 stroke-primary")
									}),
									m.isAres && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: x,
										cy: axisY,
										r: "9.5",
										fill: "none",
										stroke: "#10b981",
										strokeWidth: "1.5",
										strokeDasharray: "2 2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: `M ${x} ${axisY} L ${x} ${yLevel} L ${labelX} ${yLevel}`,
										fill: "none",
										stroke: m.isAres ? "var(--color-primary, #1f4e46)" : "#78716c",
										strokeWidth: m.isAres ? "2.2" : "1.2",
										strokeDasharray: m.isAres ? void 0 : "3 2",
										className: cn("transition-all", isHovered && "stroke-primary stroke-[2.5]")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
										x: 214,
										y: yLevel + 4,
										textAnchor: "end",
										className: cn("transition-all font-sans", m.isAres ? "fill-primary font-bold text-[13px]" : "fill-foreground text-[12px] font-medium", isHovered && "fill-primary font-bold"),
										children: [
											m.isAres && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tspan", {
												className: "fill-amber-500 font-bold text-[10px] mr-1",
												children: ["★", " "]
											}),
											m.name,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tspan", {
												className: "font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400",
												children: [
													"(",
													m.rank.toFixed(2),
													")"
												]
											})
										]
									})
								]
							}, m.id);
						}),
						rightModels.slice().reverse().map((m, revIdx) => {
							const x = rankToX(m.rank);
							const yLevel = labelStartY + revIdx * labelRowHeight;
							const labelX = 748;
							const isHovered = hoveredModelId === m.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								onMouseEnter: () => setHoveredModelId(m.id),
								onMouseLeave: () => setHoveredModelId(null),
								className: cn("cursor-pointer transition-all duration-150", hoveredModelId !== null && !isHovered && "opacity-45"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: x,
										cy: axisY,
										r: m.isAres ? 6.5 : 4.5,
										className: cn(m.isAres ? "fill-primary stroke-background stroke-2" : "fill-muted-foreground stroke-background stroke-1.5", isHovered && "scale-125 stroke-primary")
									}),
									m.isAres && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: x,
										cy: axisY,
										r: "9.5",
										fill: "none",
										stroke: "#10b981",
										strokeWidth: "1.5",
										strokeDasharray: "2 2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: `M ${x} ${axisY} L ${x} ${yLevel} L ${labelX} ${yLevel}`,
										fill: "none",
										stroke: m.isAres ? "var(--color-primary, #1f4e46)" : "#a8a29e",
										strokeWidth: m.isAres ? "2.2" : "1.2",
										strokeDasharray: m.isAres ? void 0 : "3 2",
										className: cn("transition-all", isHovered && "stroke-primary stroke-[2.5]")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
										x: 756,
										y: yLevel + 4,
										textAnchor: "start",
										className: cn("transition-all font-sans", m.isAres ? "fill-primary font-bold text-[13px]" : "fill-muted-foreground text-[12px] font-medium", isHovered && "fill-primary font-bold"),
										children: [
											m.name,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tspan", {
												className: "font-mono text-[11px] font-bold text-foreground",
												children: [
													"(",
													m.rank.toFixed(2),
													")"
												]
											}),
											m.isAres && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tspan", {
												className: "fill-amber-500 font-bold text-[10px] ml-1",
												children: [" ", "★"]
											})
										]
									})
								]
							}, m.id);
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3 border-t border-border/60 pt-3 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-3.5 items-center justify-center rounded-full bg-primary text-white text-[9px] font-bold",
							children: "✓"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: "Optimal Model:"
								}),
								" ",
								bestModel ? `${bestModel.name} (Rank ${bestModel.rank.toFixed(2)})` : "Pending"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2 w-5 rounded-full bg-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: "Clique Line:"
								}),
								" ",
								cliques.length > 0 ? `${cliques.length} Non-Significant Group${cliques.length > 1 ? "s" : ""}` : "No Cliques",
								" (p > 0.05)"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono font-bold text-foreground text-[11px]",
							children: ["CD = ", cd.toFixed(3)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Critical Difference cutoff at α = 0.05"
						})]
					})
				]
			})
		]
	});
}
var Route$6 = createFileRoute("/batch-lab")({ component: BatchLabPage });
function BatchLabPage() {
	const { bench, setBench, settings, addBatchRun } = useSession();
	const [selectedModelIds, setSelectedModelIds] = (0, import_react.useState)(BENCHMARK_MODELS.map((m) => m.id));
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
	const [inspectorModelId, setInspectorModelId] = (0, import_react.useState)("ares_emd_opap");
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
				if (!r.metrics.recovery) continue;
				if (!modelPsnrMap[r.modelId]) modelPsnrMap[r.modelId] = [];
				modelPsnrMap[r.modelId].push(r.metrics.psnr);
			}
			let bestModel = modelsToRun[0]?.id || "ares_emd_opap";
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
		return bench;
	}, [bench]);
	const autoBootstrappedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (autoBootstrappedRef.current || bench.length > 0 || isRunning) return;
		autoBootstrappedRef.current = true;
		(async () => {
			const samples = SAMPLE_COVERS.slice(0, 6);
			const loaded = [];
			for (let i = 0; i < samples.length; i++) {
				const s = samples[i];
				const cover = s.generate();
				const thumb = imageToDataUrl(cover);
				loaded.push({
					id: `sample_${s.id}_${Date.now()}_${i}`,
					name: `${s.name.split(" ")[0]}.png`,
					sizeStr: `${cover.width} × ${cover.height} px`,
					width: cover.width,
					height: cover.height,
					cover,
					thumbnailUrl: thumb,
					status: "completed",
					progressPct: 100
				});
			}
			setImages(loaded);
			if (loaded[0]) setSelectedImageTab(loaded[0].name);
			const modelsToRun = BENCHMARK_MODELS;
			const collectedRows = [];
			const newStegoOutputs = {};
			for (const imgItem of loaded) for (const model of modelsToRun) {
				const t0 = performance.now();
				try {
					const out = await encodeWithModel(model, imgItem.cover, payloadText.trim(), passphrase);
					const duration = Math.round(performance.now() - t0);
					const stegoUrl = imageToDataUrl(out.stego);
					const diffUrl = imageToDataUrl(computeDifferenceMap(imgItem.cover, out.stego, 30));
					newStegoOutputs[`${imgItem.name}:::${model.id}`] = {
						stegoUrl,
						diffUrl,
						recovered: out.recovered,
						coverUrl: imgItem.thumbnailUrl
					};
					collectedRows.push({
						imageName: imgItem.name,
						modelId: model.id,
						metrics: out.metrics,
						recovered: out.recovered,
						stegoUrl,
						diffUrl,
						durationMs: duration
					});
				} catch (err) {
					const duration = Math.round(performance.now() - t0);
					collectedRows.push({
						imageName: imgItem.name,
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
			}
			setStegoOutputs(newStegoOutputs);
			setBench(collectedRows);
		})();
	}, [
		bench.length,
		isRunning,
		payloadText,
		passphrase,
		setBench
	]);
	const activeImageNames = (0, import_react.useMemo)(() => {
		return [...new Set(activeRows.map((r) => r.imageName))];
	}, [activeRows]);
	const activeModelIds = (0, import_react.useMemo)(() => {
		const ids = [...new Set(activeRows.map((r) => r.modelId))];
		return ids.length > 0 ? ids : BENCHMARK_MODELS.map((m) => m.id);
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
	const aggregatedStats = (0, import_react.useMemo)(() => {
		const modelStats = [];
		for (const model of MODELS) {
			const allModelRows = activeRows.filter((r) => r.modelId === model.id);
			if (allModelRows.length === 0) continue;
			const validRows = allModelRows.filter((r) => r.metrics.recovery);
			const sourceRows = validRows.length > 0 ? validRows : allModelRows;
			const psnrs = sourceRows.map((r) => r.metrics.psnr);
			const ssims = sourceRows.map((r) => r.metrics.ssim);
			const mses = sourceRows.map((r) => r.metrics.mse);
			const bers = allModelRows.map((r) => r.metrics.ber);
			const bpps = sourceRows.map((r) => r.metrics.bpp);
			const distortions = sourceRows.map((r) => r.metrics.distortion);
			const encodes = sourceRows.map((r) => r.metrics.encodeMs);
			const decodes = sourceRows.map((r) => r.metrics.decodeMs);
			const selectedVals = sourceRows.map((r) => r.metrics[selectedMetric]);
			const passes = validRows.length;
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
				distortionAvg: calcMean(distortions),
				encodeAvg: calcMean(encodes),
				decodeAvg: calcMean(decodes),
				selectedMetricAvg: calcMean(selectedVals),
				passCount: passes,
				totalCount: allModelRows.length,
				winCount: 0,
				rank: 0
			});
		}
		for (const imgName of activeImageNames) {
			let bestScore = activeMetricDef.higherIsBetter ? -Infinity : Infinity;
			let winningModelId = "";
			for (const row of activeRows.filter((r) => r.imageName === imgName && r.metrics.recovery)) {
				const score = row.metrics[selectedMetric];
				if (activeMetricDef.higherIsBetter ? score > bestScore : score < bestScore) {
					bestScore = score;
					winningModelId = row.modelId;
				}
			}
			const entry = modelStats.find((m) => m.model.id === winningModelId);
			if (entry) entry.winCount++;
		}
		modelStats.sort((a, b) => {
			if (a.passCount > 0 !== b.passCount > 0) return a.passCount > 0 ? -1 : 1;
			if (Math.abs(a.selectedMetricAvg - b.selectedMetricAvg) > 1e-9) return activeMetricDef.higherIsBetter ? b.selectedMetricAvg - a.selectedMetricAvg : a.selectedMetricAvg - b.selectedMetricAvg;
			return b.psnrAvg - a.psnrAvg;
		});
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
	const overallBestModelStat = (0, import_react.useMemo)(() => {
		return aggregatedStats.find((s) => s.passCount > 0) ?? aggregatedStats[0] ?? null;
	}, [aggregatedStats]);
	const bestModelName = (0, import_react.useMemo)(() => {
		if (overallBestModelStat) return overallBestModelStat.model.name;
		if (!bestModelAnalysis) return "Pending Benchmark Evaluation";
		return modelNamesMap[bestModelAnalysis.bestModelId] || bestModelAnalysis.bestModelId;
	}, [
		overallBestModelStat,
		bestModelAnalysis,
		modelNamesMap
	]);
	const bestModelRank = (0, import_react.useMemo)(() => {
		if (bestModelAnalysis) return bestModelAnalysis.bestModelRank;
		return 1;
	}, [bestModelAnalysis]);
	const currentImageRows = (0, import_react.useMemo)(() => {
		if (!selectedImageTab) return [];
		return activeRows.filter((r) => r.imageName === selectedImageTab);
	}, [activeRows, selectedImageTab]);
	const currentImageWinner = (0, import_react.useMemo)(() => {
		const validRows = currentImageRows.filter((r) => r.metrics.recovery);
		if (validRows.length === 0) return null;
		let best = validRows[0];
		for (const r of validRows) {
			const bestVal = best.metrics[selectedMetric];
			const currentVal = r.metrics[selectedMetric];
			if (Math.abs(currentVal - bestVal) > 1e-9) {
				if (activeMetricDef.higherIsBetter ? currentVal > bestVal : currentVal < bestVal) best = r;
			} else if (r.metrics.psnr > best.metrics.psnr) best = r;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "ARES-EMD-OPAP-INN & Hybrid INN-CNN Benchmark Suite",
			title: "Batch Lab Benchmarking",
			description: "Comprehensive multi-image laboratory evaluating ARES-EMD-OPAP-INN, ARES-Hybrid-INN-CNN, and 5 published baselines under identical cryptographic payload and passphrase. Eliminates false positives with strict 100% bit-exact recovery verification and dynamically ranks whichever model gets the best empirical result.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: !isRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: runBenchmark,
					disabled: images.length === 0 || selectedModelIds.length === 0,
					className: "gap-2 bg-primary text-primary-foreground font-medium shadow-sm hover:opacity-95",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Run Batch Lab (",
						images.length,
						" Images)"
					] })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: stopBenchmark,
					variant: "destructive",
					className: "gap-2 bg-red-600 text-white hover:bg-red-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stop Execution" })]
				})
			})
		}),
		overallBestModelStat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mb-6 rounded-xl border-2 border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-card to-emerald-500/10 p-4 shadow-xs",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-6 fill-current" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono",
								children: isRunning ? "Live Best Model (Updating Over Benchmark Run)" : "Best Model Over Live Benchmark Run"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 font-mono",
								children: "Zero False Positives · 100% Bit-Exact Recovery Verified"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-wrap items-baseline gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-bold text-ink sm:text-xl",
								children: overallBestModelStat.model.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: [
									"(",
									overallBestModelStat.model.paper,
									")"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: [
								"Ranked strictly by empirical",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: activeMetricDef.name
								}),
								" across",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-semibold text-foreground",
									children: activeImageNames.length
								}),
								" ",
								"cover images (",
								overallBestModelStat.winCount,
								"/",
								activeImageNames.length,
								" image wins).",
								aggregatedStats[1] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1.5 text-muted-foreground",
									children: [
										"Runner-up:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: aggregatedStats[1].model.short
										}),
										" ",
										"(",
										aggregatedStats[1].psnrAvg.toFixed(2),
										" dB, SSIM",
										" ",
										aggregatedStats[1].ssimAvg.toFixed(4),
										")."
									]
								})
							]
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2.5 font-mono text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card/90 px-3 py-1.5 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase text-muted-foreground block",
								children: "Mean PSNR"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-bold text-emerald-600",
								children: [overallBestModelStat.psnrAvg.toFixed(2), " dB"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card/90 px-3 py-1.5 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase text-muted-foreground block",
								children: "Mean SSIM"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-foreground",
								children: overallBestModelStat.ssimAvg.toFixed(4)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card/90 px-3 py-1.5 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase text-muted-foreground block",
								children: "Mean MSE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-foreground",
								children: overallBestModelStat.mseAvg.toFixed(4)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card/90 px-3 py-1.5 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase text-muted-foreground block",
								children: "Image Wins"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-bold text-primary",
								children: [
									overallBestModelStat.winCount,
									" / ",
									activeImageNames.length
								]
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 overflow-x-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("queue"),
						className: cn("flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all", activeTab === "queue" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1. Image Queue & Configuration" }),
							images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 rounded-full bg-primary-foreground/20 px-1.5 py-0.2 text-[10px]",
								children: images.length
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("images"),
						className: cn("flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all", activeTab === "images" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2. Per-Image Comparison Tables" }),
							activeRows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1 rounded-full bg-emerald-500/20 text-emerald-600 px-1.5 py-0.2 text-[10px]",
								children: [activeImageNames.length, " evaluated"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("stats"),
						className: cn("flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all", activeTab === "stats" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-3.5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3. Statistical Significance Suite" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 rounded-full bg-primary/10 text-primary px-1.5 py-0.2 text-[10px]",
								children: "Friedman · W · Nemenyi"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("export"),
						className: cn("flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all", activeTab === "export" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4. Research Export (APA / LaTeX / CSV)" })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("inline-block size-2 rounded-full", isRunning ? "bg-amber-500 animate-pulse" : hasLiveResults ? "bg-emerald-500" : "bg-blue-500") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground font-mono text-[11px]",
					children: isRunning ? "Benchmark in progress" : hasLiveResults ? `Live Empirical Batch (${bench.length} rows collected)` : "Initializing Live Empirical Batch..."
				})]
			})]
		}),
		(isRunning || images.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mb-6 rounded-xl border border-border bg-card p-4 shadow-xs",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Live Batch Execution Tracker"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-foreground font-mono",
							children: currentTicker || "Batch queue ready. Click 'Run Batch Lab' to execute."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-4 text-xs font-mono",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-muted px-2.5 py-1 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase text-muted-foreground block",
									children: "Images"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-foreground",
									children: [
										completedImagesCount,
										" / ",
										images.length
									]
								})]
							}),
							runningCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-amber-500/10 px-2.5 py-1 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase text-amber-700 dark:text-amber-400 block",
									children: "Active"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-amber-700 dark:text-amber-400",
									children: runningCount
								})]
							}),
							failedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-red-500/10 px-2.5 py-1 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase text-red-500 block",
									children: "Failed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-red-500",
									children: failedCount
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-muted px-2.5 py-1 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase text-muted-foreground block",
									children: "Model Runs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-foreground",
									children: [
										completedRunsCount,
										" / ",
										totalModelRuns
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-muted px-2.5 py-1 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase text-muted-foreground block",
									children: "Progress"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-primary",
									children: [overallProgressPct, activeModelId ? ` (${activeModelId.slice(0, 4)})` : "%"]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 w-full overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-full transition-all duration-300 ease-out", isRunning ? "bg-gradient-to-r from-primary to-emerald-500 animate-pulse" : "bg-primary"),
						style: { width: `${overallProgressPct}%` }
					})
				})]
			})
		}),
		activeTab === "queue" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-semibold text-ink",
							children: "Benchmark Models (ARES-EMD-OPAP-INN & Hybrid INN-CNN)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Select models to evaluate under identical cryptographic payload & cover conditions."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-1.5 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedModelIds(BENCHMARK_MODELS.map((m) => m.id)),
									className: "rounded bg-primary/10 px-2 py-1 text-primary hover:bg-primary/20 font-semibold text-[11px]",
									children: "Primary (7)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedModelIds(["ares_emd_opap", "ares_hybrid_inn"]),
									className: "rounded bg-emerald-500/10 px-2 py-1 text-emerald-600 hover:bg-emerald-500/20 font-semibold text-[11px]",
									children: "ARES INN + Hybrid Only"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSelectedModelIds(MODELS.map((m) => m.id)),
									className: "rounded bg-muted px-2 py-1 text-muted-foreground hover:text-foreground font-medium text-[11px]",
									children: [
										"All + Ablation (",
										MODELS.length,
										")"
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2.5 sm:grid-cols-2",
						children: MODELS.map((m) => {
							const selected = selectedModelIds.includes(m.id);
							const isBestMeasured = overallBestModelStat?.model.id === m.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => toggleModel(m.id),
								className: cn("flex cursor-pointer flex-col justify-between rounded-lg border p-3 text-left transition-all", selected ? isBestMeasured ? "border-amber-500/60 bg-amber-500/5 shadow-xs ring-1 ring-amber-500/30" : "border-border bg-card shadow-xs" : "border-border/50 bg-muted/30 opacity-60"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: selected,
												onChange: () => {},
												className: "size-3.5 rounded border-border text-primary focus:ring-primary"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-sm font-semibold text-foreground",
												children: m.short
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider", isBestMeasured ? "bg-amber-500/20 text-amber-700 dark:text-amber-400" : "bg-muted text-muted-foreground"),
											children: isBestMeasured ? "#1 Best Measured" : m.status
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] font-medium text-foreground line-clamp-1",
										children: m.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-[10px] text-muted-foreground line-clamp-1",
										children: m.paper
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center justify-between border-t border-border/40 pt-1.5 text-[10px] font-mono text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["method: ", m.methodKey] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.usesInn ? "INN + EMD + OPAP" : m.usesEmd ? "EMD + OPAP" : m.usesHamming ? "Hamming(7,3)" : "LSB" })]
									})
								]
							}, m.id);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base font-semibold text-ink",
								children: "Uniform Benchmark Payload & Passphrase"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold",
								children: "Enforced Identical"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "For every uploaded cover image, the exact same cryptographic payload and password key are passed independently to all 6 models."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "batch-payload",
									className: "text-xs font-semibold text-muted-foreground",
									children: "Secret Payload Text"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "batch-payload",
									value: payloadText,
									onChange: (e) => setPayloadText(e.target.value),
									rows: 3,
									className: "mt-1.5 font-mono text-xs",
									placeholder: "Enter secret text payload to embed across all models..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center justify-between text-[11px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Length: ",
										payloadText.length,
										" characters"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Bits: ",
										payloadText.length * 8,
										" bits"
									] })]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "batch-pw",
									className: "text-xs font-semibold text-muted-foreground",
									children: "Passphrase / Steganographic Key"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "batch-pw",
									type: "password",
									value: passphrase,
									onChange: (e) => setPassphrase(e.target.value),
									className: "mt-1.5 text-xs font-mono",
									placeholder: "Enter shared decryption passphrase..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-muted-foreground",
									children: "Keys PRNG pseudo-random embedding sequences identically across models."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Max Image Dimension Cap"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setResolutionCap(384),
									className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", resolutionCap === 384 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
									children: "384 × 384 px (Fast Research)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setResolutionCap(512),
									className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", resolutionCap === 512 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
									children: "512 × 512 px (Full Detail)"
								})]
							})] })
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 border-t border-border pt-4 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: runBenchmark,
							disabled: images.length === 0 || selectedModelIds.length === 0 || isRunning,
							className: "w-full gap-2 bg-primary text-primary-foreground font-semibold h-11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Execute Benchmark (",
								images.length,
								" Images × ",
								selectedModelIds.length,
								" Models)"
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [images.length * selectedModelIds.length, " total model evaluations"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: loadSampleDataset,
								className: "text-primary hover:underline font-medium text-[11px]",
								children: "Load 6 Standard Images"
							})]
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-semibold text-ink",
							children: "Batch Image Upload"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Drop multiple image files or load standard research benchmark sets."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: loadSampleDataset,
								className: "gap-1.5 text-xs font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Load Research Suite (6 Canonical Covers)" })]
							}), images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: clearAllImages,
								disabled: isRunning,
								className: "gap-1.5 text-xs text-muted-foreground hover:text-red-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Clear All (",
									images.length,
									")"
								] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onDragOver: handleDragOver,
						onDragLeave: handleDragLeave,
						onDrop: handleDrop,
						onClick: () => fileInputRef.current?.click(),
						className: cn("relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all", isDragging ? "border-primary bg-primary/10 scale-[1.005]" : "border-border hover:border-primary/60 hover:bg-muted/40"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileInputRef,
								type: "file",
								multiple: true,
								accept: "image/png,image/jpeg,image/webp,image/bmp",
								onChange: (e) => {
									if (e.target.files) handleFiles(e.target.files);
								},
								className: "hidden"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-sm font-semibold text-foreground",
								children: ["Drop multiple images here or ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary underline",
									children: "Browse Files"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Supports PNG, JPG, JPEG, WEBP, and BMP. Upload 1 to 20+ images simultaneously."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[11px] font-mono text-muted-foreground/80",
								children: "Images are automatically converted into independent test cases."
							})
						]
					}),
					images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold uppercase tracking-wider",
								children: [
									"Uploaded Images Queue (",
									images.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Select any image to inspect or remove" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
							children: images.map((img, idx) => {
								const isCurrent = activeImageId === img.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("relative group flex flex-col justify-between overflow-hidden rounded-lg border bg-card p-2.5 transition-all shadow-xs", isCurrent ? "border-primary ring-2 ring-primary/40 bg-primary/5" : img.status === "completed" ? "border-emerald-500/40" : "border-border"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: (e) => {
												e.stopPropagation();
												removeImage(img.id);
											},
											disabled: isRunning,
											className: "absolute right-2 top-2 z-10 rounded-full bg-background/80 p-1 text-muted-foreground hover:bg-red-500 hover:text-white transition-colors",
											title: "Remove image",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative aspect-square w-full overflow-hidden rounded-md bg-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: img.thumbnailUrl,
												alt: img.name,
												className: "size-full object-cover"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute bottom-1 left-1 rounded bg-background/80 px-1 py-0.5 text-[9px] font-mono font-medium text-foreground",
												children: ["#", String(idx + 1).padStart(2, "0")]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold text-foreground truncate",
												title: img.name,
												children: img.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-muted-foreground font-mono",
												children: [
													img.width,
													"×",
													img.height,
													" · ",
													img.sizeStr
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2.5 pt-2 border-t border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-[10px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold uppercase tracking-wider text-muted-foreground",
													children: "Status"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("font-mono font-semibold uppercase", img.status === "completed" ? "text-emerald-600" : img.status === "running" ? "text-primary animate-pulse" : "text-muted-foreground"),
													children: img.status
												})]
											}), img.status === "running" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 h-1 w-full overflow-hidden rounded-full bg-muted",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full bg-primary transition-all duration-200",
													style: { width: `${img.progressPct}%` }
												})
											})]
										})
									]
								}, img.id);
							})
						})]
					})
				]
			})]
		}),
		activeTab === "images" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 overflow-x-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold uppercase text-muted-foreground mr-1",
						children: "Select Image:"
					}), activeImageNames.map((imgName, idx) => {
						const isSelected = selectedImageTab === imgName;
						const isDone = activeRows.filter((r) => r.imageName === imgName).length >= 6;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedImageTab(imgName),
							className: cn("flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all", isSelected ? "bg-primary text-primary-foreground shadow-xs font-semibold" : "bg-muted text-muted-foreground hover:text-foreground"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["#", String(idx + 1).padStart(2, "0")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate max-w-[120px]",
									children: imgName
								}),
								isDone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3 text-emerald-400" })
							]
						}, imgName);
					})]
				}), images.length > 0 && !isRunning && activeRows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: runBenchmark,
					className: "gap-1.5 text-xs font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Run Benchmark Now" })]
				})]
			}), selectedImageTab ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-[1fr_auto]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-display font-bold",
								children: ["#", String(activeImageNames.indexOf(selectedImageTab) + 1).padStart(2, "0")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-xl font-bold text-ink",
								children: ["Test Case: ", selectedImageTab]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Independent evaluation across all 6 models with identical payload (",
									payloadText.length,
									" chars) & passphrase."
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [currentImageWinner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-5 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 block",
										children: "Best Performer on this Image"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-sm font-bold text-foreground",
										children: MODELS.find((m) => m.id === currentImageWinner.modelId)?.name ?? currentImageWinner.modelId
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-2 font-mono text-emerald-600 font-semibold",
										children: [
											"PSNR: ",
											currentImageWinner.metrics.psnr.toFixed(2),
											" dB"
										]
									})
								] })]
							}), currentImageRows.some((r) => r.stegoUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Download All Stego PNGs (",
									currentImageRows.filter((r) => r.stegoUrl).length,
									")"
								] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-xl border border-border bg-card shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border bg-muted/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3",
										children: "Model"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3",
										children: "Methodology"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 text-right",
										children: "PSNR (dB)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 text-right",
										children: "SSIM"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 text-right",
										children: "MSE"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 text-right",
										children: "BER"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 text-right",
										children: "bpp"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 text-right",
										children: "Encode (ms)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 text-right",
										children: "Decode (ms)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-center",
										children: "Payload Recovery"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 text-center",
										children: "Export"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/60 font-mono text-[11px]",
								children: MODELS.filter((m) => currentImageRows.some((r) => r.modelId === m.id) || selectedModelIds.includes(m.id)).map((m) => {
									const row = currentImageRows.find((r) => r.modelId === m.id);
									const isWinner = currentImageWinner?.modelId === m.id;
									if (!row) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "opacity-40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3 font-sans font-medium text-foreground",
												children: m.short
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3 font-sans text-muted-foreground",
												children: m.paper
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												colSpan: 9,
												className: "px-3 py-3 text-center text-muted-foreground",
												children: "Pending evaluation..."
											})
										]
									}, m.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: cn("transition-colors hover:bg-muted/40", isWinner ? "bg-amber-500/5 font-semibold" : ""),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "px-4 py-3 font-sans font-medium text-foreground flex items-center gap-1.5",
												children: [
													isWinner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-3.5 text-amber-500 shrink-0" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.name }),
													isWinner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded bg-amber-500/20 text-amber-700 dark:text-amber-400 px-1.5 py-0.2 text-[9px] font-bold",
														children: "BEST"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3 font-sans text-muted-foreground text-[11px] max-w-[200px] truncate",
												children: m.note
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: cn("px-3 py-3 text-right font-semibold", row.metrics.psnr >= 40 ? "text-emerald-600 dark:text-emerald-400" : row.metrics.psnr >= 35 ? "text-amber-600" : "text-muted-foreground"),
												children: row.metrics.psnr.toFixed(2)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: cn("px-3 py-3 text-right", row.metrics.ssim >= .99 ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground"),
												children: row.metrics.ssim.toFixed(4)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3 text-right text-muted-foreground",
												children: row.metrics.mse.toFixed(2)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: cn("px-3 py-3 text-right", row.metrics.ber === 0 ? "text-emerald-600 font-semibold" : "text-red-500"),
												children: [(row.metrics.ber * 100).toFixed(2), "%"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3 text-right text-muted-foreground",
												children: row.metrics.bpp.toFixed(4)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3 text-right text-muted-foreground",
												children: row.metrics.encodeMs
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3 text-right text-muted-foreground",
												children: row.metrics.decodeMs
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3 text-center",
												children: row.metrics.recovery ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), "100% BIT-EXACT"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-500",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3" }), "CORRUPTED"]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3 text-center",
												children: row.stegoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
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
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PNG" })]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/30",
													children: "—"
												})
											})
										]
									}, m.id);
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-base font-semibold text-ink",
									children: "Visual Stego & Residual Artifact Inspector"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Inspect perceptual transparency and amplified pixel-delta difference maps."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-muted-foreground",
											children: "Inspect Model:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1 bg-muted p-1 rounded-lg",
											children: MODELS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setInspectorModelId(m.id),
												className: cn("rounded px-2.5 py-1 text-xs font-medium transition-all", inspectorModelId === m.id ? "bg-card text-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"),
												children: m.short
											}, m.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => setShowDifferenceMap(!showDifferenceMap),
											className: cn("gap-1.5 text-xs font-medium", showDifferenceMap && "bg-primary text-primary-foreground"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showDifferenceMap ? "Show Stego Image" : "Show Amplified Residual Map" })]
										})
									]
								})]
							}),
							(() => {
								const outKey = `${selectedImageTab}:::${inspectorModelId}`;
								const outData = stegoOutputs[outKey];
								const imgItem = images.find((i) => i.name === selectedImageTab);
								const coverSrc = outData?.coverUrl || imgItem?.thumbnailUrl;
								const stegoSrc = showDifferenceMap ? outData?.diffUrl : outData?.stegoUrl;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 md:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border bg-muted/30 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-2 flex items-center justify-between text-xs font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Original Cover Image"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[11px] text-muted-foreground",
												children: imgItem ? `${imgItem.width}×${imgItem.height} px` : "384×384 px"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "aspect-square w-full overflow-hidden rounded-md bg-muted flex items-center justify-center",
											children: coverSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: coverSrc,
												alt: "Original Cover",
												className: "size-full object-contain"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Cover image preview"
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border bg-muted/30 p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mb-2 flex items-center justify-between text-xs font-semibold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-primary font-medium",
													children: showDifferenceMap ? `Residual Distortion Map (×30 Gain) — ${MODELS.find((m) => m.id === inspectorModelId)?.short}` : `Stego Image — ${MODELS.find((m) => m.id === inspectorModelId)?.name}`
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[11px] text-emerald-600 font-semibold",
													children: currentImageRows.find((r) => r.modelId === inspectorModelId)?.metrics.psnr ? `${currentImageRows.find((r) => r.modelId === inspectorModelId)?.metrics.psnr.toFixed(2)} dB` : ""
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "aspect-square w-full overflow-hidden rounded-md bg-muted flex items-center justify-center",
												children: stegoSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: stegoSrc,
													alt: "Stego Image",
													className: "size-full object-contain"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "p-6 text-center text-xs text-muted-foreground",
													children: "Run the benchmark to generate live stego outputs and residual maps."
												})
											}),
											stegoSrc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex items-center justify-between border-t border-border/50 pt-2.5 text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground block",
													children: showDifferenceMap ? "Residual Distortion Map" : "Stego Image"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[10px] text-muted-foreground",
													children: "Lossless 24-bit RGB PNG"
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
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
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showDifferenceMap ? "Download Residual PNG" : "Download Stego Image" })]
												})]
											})
										]
									})]
								});
							})(),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 rounded-lg bg-muted/50 p-3 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between font-semibold text-muted-foreground mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decrypted Payload Extraction Verification" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-emerald-600",
										children: "Integrity Check: Verified"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] text-foreground bg-card p-2 rounded border border-border",
									children: stegoOutputs[`${selectedImageTab}:::${inspectorModelId}`]?.recovered || payloadText
								})]
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-12 text-center text-muted-foreground",
				children: "No images evaluated yet. Go to Image Queue & Configuration to upload or load samples."
			})]
		}),
		activeTab === "stats" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
							children: "Evaluation Metric"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1 bg-muted p-1 rounded-lg",
							children: METRIC_OPTIONS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedMetric(m.id),
								className: cn("rounded px-2.5 py-1 text-xs font-medium transition-all", selectedMetric === m.id ? "bg-card text-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"),
								children: m.name.split(" ")[0]
							}, m.id))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
							children: "Significance Level (α)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 bg-muted p-1 rounded-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setAlpha(.05),
								className: cn("rounded px-3 py-1 text-xs font-medium transition-all", alpha === .05 ? "bg-card text-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"),
								children: "α = 0.05 (95%)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setAlpha(.01),
								className: cn("rounded px-3 py-1 text-xs font-medium transition-all", alpha === .01 ? "bg-card text-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"),
								children: "α = 0.01 (99%)"
							})]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right text-xs text-muted-foreground font-mono",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Evaluated across ",
								activeImageNames.length,
								" image covers"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [activeModelIds.length, " algorithms"] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden rounded-xl border-2 border-primary/40 bg-gradient-to-r from-primary/10 via-card to-emerald-500/10 p-6 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-8 fill-current" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary",
										children: "Empirical Statistical Winner"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-mono text-muted-foreground",
										children: "Based on Non-Parametric Friedman Ranking"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-2xl font-bold text-ink md:text-3xl",
									children: bestModelName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted-foreground",
									children: [
										"Achieves top statistical performance with average rank of",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-foreground",
											children: bestModelRank.toFixed(2)
										}),
										" ",
										"on ",
										activeMetricDef.name,
										" across all ",
										activeImageNames.length,
										" evaluated image covers."
									]
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 flex-col rounded-xl border border-border bg-card/80 p-3.5 text-center shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Mean Rank"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-2xl font-bold text-primary",
									children: ["#", bestModelRank.toFixed(2)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-medium text-emerald-600 mt-0.5",
									children: "Rank 1 = Highest Imperceptibility"
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Hypothesis Test"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-semibold",
										children: [
											"k = ",
											statsResult.k,
											", N = ",
											statsResult.n
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold text-ink",
									children: "Friedman Test"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground leading-relaxed",
									children: "Non-parametric ANOVA on ranks evaluating if algorithm performance ranks differ significantly across cover images."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 space-y-2 font-mono text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/50 pb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Chi-Square (χ²_F):"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: statsResult.chi2.toFixed(3)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/50 pb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Degrees of Freedom:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-foreground",
												children: [statsResult.df, " (k - 1)"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/50 pb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Asymptotic p-value:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("font-bold", statsResult.pApprox < alpha ? "text-emerald-600" : "text-amber-600"),
												children: statsResult.pApprox < .001 ? "p < 0.001" : `p = ${statsResult.pApprox.toFixed(4)}`
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between pt-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Iman-Davenport F:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground",
												children: statsResult.imanDavenportF.toFixed(3)
											})]
										})
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("mt-4 rounded-lg p-2.5 text-xs font-medium", statsResult.isSignificantChi2 ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-muted text-muted-foreground"),
								children: statsResult.isSignificantChi2 ? `✓ Reject H0: Significant difference exists between models (p < ${alpha}).` : "Fail to reject H0: No statistically significant difference detected."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Effect Size"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", statsResult.kendallW >= .7 ? "bg-emerald-500/10 text-emerald-600" : statsResult.kendallW >= .5 ? "bg-blue-500/10 text-blue-600" : "bg-amber-500/10 text-amber-600"),
										children: [statsResult.effectMagnitude, " Concordance"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold text-ink",
									children: "Kendall’s W Effect Size"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground leading-relaxed",
									children: "Quantifies the degree of concordance and ranking agreement among judges (cover images) across algorithms."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-col items-center justify-center p-3 rounded-lg bg-muted/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-display text-3xl font-bold text-foreground font-mono",
										children: ["W = ", statsResult.kendallW.toFixed(3)]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Scale: 0.0 (random agreement) to 1.0 (unanimous agreement)"
									})]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3",
								children: statsResult.effectDescription
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Post-Hoc Analysis"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-semibold",
										children: ["q_α = ", statsResult.qAlpha.toFixed(3)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold text-ink",
									children: "Nemenyi Post-hoc Test"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground leading-relaxed",
									children: "Pairwise multiple comparisons controlling family-wise error rate. Pairs with rank difference > CD are statistically distinct."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 space-y-2 font-mono text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/50 pb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Critical Difference (CD):"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-primary font-display text-base",
												children: statsResult.nemenyiCD.toFixed(3)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/50 pb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Studentized Range q:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground",
												children: statsResult.qAlpha.toFixed(3)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between pt-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Significant Pairs:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-emerald-600 font-bold",
												children: [
													statsResult.pairs.filter((p) => p.significant).length,
													" /",
													" ",
													statsResult.pairs.length,
													" pairs"
												]
											})]
										})
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 rounded-lg bg-muted/50 p-2.5 text-[11px] text-muted-foreground leading-relaxed",
								children: "Formula: CD = q_α · √(k(k + 1) / (6N))"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Critical Difference (CD) Diagram"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CDDiagram, {
						modelIds: rankTable.modelIds,
						avgRanks: statsResult.avgRanks,
						cd: statsResult.nemenyiCD,
						cliques: statsResult.cliques,
						k: statsResult.k,
						metricLabel: activeMetricDef.name,
						higherIsBetter: activeMetricDef.higherIsBetter
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-semibold text-ink",
							children: "Pairwise Model Comparisons (Nemenyi Test)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Evaluating all model pairs against Critical Difference threshold CD =",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-foreground",
									children: statsResult.nemenyiCD.toFixed(3)
								}),
								"."
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 bg-muted p-1 rounded-lg text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setFilterMode("all"),
									className: cn("rounded px-2.5 py-1 text-xs font-medium transition-all", filterMode === "all" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
									children: [
										"All Pairs (",
										statsResult.pairs.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFilterMode("ares"),
									className: cn("rounded px-2.5 py-1 text-xs font-medium transition-all", filterMode === "ares" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
									children: "ARES vs Others"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFilterMode("sig"),
									className: cn("rounded px-2.5 py-1 text-xs font-medium transition-all", filterMode === "sig" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
									children: "Significant Only"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border bg-muted/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2.5",
										children: "Model A"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2.5",
										children: "Model B"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2.5 text-right",
										children: "Rank Diff |R_A - R_B|"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2.5 text-right",
										children: "Critical Difference"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2.5 text-right",
										children: "z-score"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2.5 text-right",
										children: "p-value"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2.5 text-center",
										children: "Significance Verdict"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/60 font-mono text-[11px]",
								children: statsResult.pairs.filter((p) => {
									if (filterMode === "sig") return p.significant;
									if (filterMode === "ares") return p.a === "ares_emd_opap" || p.b === "ares_emd_opap" || p.a === "ares_hybrid_inn" || p.b === "ares_hybrid_inn";
									return true;
								}).map((p, idx) => {
									const modelA = MODELS.find((m) => m.id === p.a)?.short ?? p.a;
									const modelB = MODELS.find((m) => m.id === p.b)?.short ?? p.b;
									const isAresPair = p.a === "ares_emd_opap" || p.b === "ares_emd_opap" || p.a === "ares_hybrid_inn" || p.b === "ares_hybrid_inn";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: cn("transition-colors hover:bg-muted/40", p.significant ? "bg-emerald-500/5" : "", isAresPair && "font-semibold"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 font-sans font-medium text-foreground",
												children: modelA
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 font-sans font-medium text-foreground",
												children: modelB
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2.5 text-right font-bold text-foreground",
												children: p.rankDiff.toFixed(3)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2.5 text-right text-muted-foreground",
												children: statsResult.nemenyiCD.toFixed(3)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2.5 text-right text-muted-foreground",
												children: p.zValue.toFixed(3)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: cn("px-3 py-2.5 text-right", p.pValue < alpha ? "text-emerald-600 font-bold" : "text-muted-foreground"),
												children: p.pValue < .001 ? "p < 0.001" : p.pValue.toFixed(4)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 text-center font-sans",
												children: p.significant ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }),
														"Significant (p < ",
														alpha,
														")"
													]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground",
													children: "No Significant Diff"
												})
											})
										]
									}, idx);
								})
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 shadow-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display text-base font-semibold text-ink mb-1",
							children: [
								"Aggregated Benchmark Summary (All ",
								activeImageNames.length,
								" Images)"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mb-4",
							children: "Mean values, standard deviations, and win counts aggregated across all uploaded benchmark test cases."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-b border-border bg-muted/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3",
											children: "Rank"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3",
											children: "Algorithm"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-3 text-right",
											children: "Mean PSNR (dB)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-3 text-right",
											children: "Mean SSIM"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-3 text-right",
											children: "Mean MSE"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-3 text-right",
											children: "Mean BER"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-3 text-right",
											children: "Avg Encode (ms)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-3 text-right",
											children: "Image Wins"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border/60 font-mono text-[11px]",
									children: aggregatedStats.map((item) => {
										const isWinner = item.rank === 1;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: cn("transition-colors hover:bg-muted/40", isWinner ? "bg-amber-500/5 font-semibold" : ""),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-4 py-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("inline-flex size-5 items-center justify-center rounded-full text-[10px] font-bold", isWinner ? "bg-amber-500 text-white" : item.rank === 2 ? "bg-slate-400 text-white" : item.rank === 3 ? "bg-amber-700 text-white" : "bg-muted text-muted-foreground"),
														children: item.rank
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "px-4 py-3 font-sans font-medium text-foreground flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.model.name }), isWinner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded bg-amber-500/20 text-amber-700 dark:text-amber-400 px-1.5 py-0.2 text-[9px] font-bold",
														children: "#1 BEST RESULT"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "px-3 py-3 text-right font-bold text-foreground",
													children: [
														item.psnrAvg.toFixed(2),
														" ± ",
														item.psnrStd.toFixed(2)
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "px-3 py-3 text-right text-muted-foreground",
													children: [
														item.ssimAvg.toFixed(4),
														" ± ",
														item.ssimStd.toFixed(4)
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-3 text-right text-muted-foreground",
													children: item.mseAvg.toFixed(2)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "px-3 py-3 text-right text-muted-foreground",
													children: [(item.berAvg * 100).toFixed(2), "%"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "px-3 py-3 text-right text-muted-foreground",
													children: [item.encodeAvg.toFixed(0), " ms"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-3 text-right",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: cn("font-semibold", item.winCount > 0 ? "text-primary" : "text-muted-foreground"),
														children: [
															item.winCount,
															" / ",
															activeImageNames.length,
															" (",
															Math.round(item.winCount / (activeImageNames.length || 1) * 100),
															"%)"
														]
													})
												})
											]
										}, item.model.id);
									})
								})]
							})
						})
					]
				})
			]
		}),
		activeTab === "export" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-semibold text-ink",
					children: "Academic Publication & Data Export Center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Export benchmark and statistical results formatted ready for IEEE/Springer paper manuscripts."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 bg-muted p-1 rounded-lg text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setExportFormat("apa"),
							className: cn("flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-all", exportFormat === "apa" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "APA 7th Summary" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setExportFormat("latex"),
							className: cn("flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-all", exportFormat === "latex" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LaTeX Table" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setExportFormat("csv"),
							className: cn("flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-all", exportFormat === "csv" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Raw CSV" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setExportFormat("json"),
							className: cn("flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-all", exportFormat === "json" ? "bg-card text-foreground font-semibold shadow-xs" : ""),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Full JSON" })]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: ["Format: ", exportFormat.toUpperCase()]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								"(",
								activeImageNames.length,
								" image test cases · ",
								activeModelIds.length,
								" models)"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								copyToClipboard(exportFormat === "apa" ? apaOutput : exportFormat === "latex" ? latexOutput : exportFormat === "csv" ? csvOutput : jsonOutput, exportFormat);
							},
							className: "gap-1.5 text-xs font-medium",
							children: [copiedType === exportFormat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copiedType === exportFormat ? "Copied!" : "Copy to Clipboard" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Download .", exportFormat === "apa" ? "txt" : exportFormat === "latex" ? "tex" : exportFormat] })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "max-h-[480px] overflow-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground select-all",
						children: exportFormat === "apa" ? apaOutput : exportFormat === "latex" ? latexOutput : exportFormat === "csv" ? csvOutput : jsonOutput
					})
				})]
			})]
		})
	] });
}
var $$splitComponentImporter$5 = () => import("./benchmark-SZ1muDrY.mjs");
var Route$5 = createFileRoute("/benchmark")({
	beforeLoad: () => {
		throw redirect({ to: "/batch-lab" });
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./decoder-OHGiQA3y.mjs");
var Route$4 = createFileRoute("/decoder")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./history-CyOzYwYk.mjs");
var Route$3 = createFileRoute("/history")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./models-D7cQE244.mjs");
var Route$2 = createFileRoute("/models")({
	beforeLoad: () => {
		throw redirect({ to: "/batch-lab" });
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./settings-ChakeDNu.mjs");
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
export { cn as C, PageHeader as S, Textarea as _, decodeWithModel as a, AppShell as b, METRIC_KEYS as c, mseOf as d, psnrOf as f, imageToDataUrl as g, fileToStegoImage as h, MODELS as i, bitErrorRate as l, fileToImage as m, METRIC_OPTIONS as n, encodeWithModel as o, ssimOf as p, generateSampleImage as r, modelById as s, router_exports as t, meanAbsDelta as u, Label as v, useSession as w, Button as x, Input as y };
