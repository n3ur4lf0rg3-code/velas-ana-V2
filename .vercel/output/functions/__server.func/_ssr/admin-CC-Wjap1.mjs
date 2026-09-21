import { o as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as deleteScent, c as loadAdmin, d as saveProduct, f as saveScent, g as cn, h as Button, i as deleteProduct, m as useCurrentUserState, r as deleteColor, u as saveColor } from "./ornament-BtZfPFdQ.mjs";
import { d as RedirectToSignIn } from "./router-XIM6apER.mjs";
import { n as Label, r as Textarea, t as Input } from "./textarea-DzygO-4r.mjs";
import { n as shapeLabel, t as SHAPES } from "./products-BBFMn6GJ.mjs";
import { t as GoogleSignIn } from "./google-sign-in-B2JcHwj6.mjs";
import { n as formatPrice, t as formatDate } from "./format-DPQ7lO7W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CC-Wjap1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function readImageFile(file) {
	return new Promise((resolve, reject) => {
		if (!file.type.startsWith("image/")) {
			reject(/* @__PURE__ */ new Error("Elige una imagen"));
			return;
		}
		const img = new Image();
		const url = URL.createObjectURL(file);
		img.onload = () => {
			const scale = Math.min(1, 1200 / Math.max(img.width, img.height));
			const width = Math.max(1, Math.round(img.width * scale));
			const height = Math.max(1, Math.round(img.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("No se pudo leer la imagen"));
				return;
			}
			ctx.drawImage(img, 0, 0, width, height);
			URL.revokeObjectURL(url);
			resolve(canvas.toDataURL("image/jpeg", .82));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("No se pudo leer la imagen"));
		};
		img.src = url;
	});
}
function AdminProductForm({ product, scents, colors, onCancel, onSave }) {
	const [name, setName] = (0, import_react.useState)(product?.name ?? "");
	const [tagline, setTagline] = (0, import_react.useState)(product?.tagline ?? "");
	const [description, setDescription] = (0, import_react.useState)(product?.description ?? "");
	const [care, setCare] = (0, import_react.useState)(product?.care ?? "");
	const [price, setPrice] = (0, import_react.useState)(String(product?.price ?? ""));
	const [stock, setStock] = (0, import_react.useState)(String(product?.stock ?? "0"));
	const [shape, setShape] = (0, import_react.useState)(product?.shape ?? "rosa");
	const [scentId, setScentId] = (0, import_react.useState)(product?.scentId ?? scents[0]?.id ?? "");
	const [colorId, setColorId] = (0, import_react.useState)(product?.colorId ?? colors[0]?.id ?? "");
	const [notes, setNotes] = (0, import_react.useState)(product?.notes.join(", ") ?? "");
	const [burnHours, setBurnHours] = (0, import_react.useState)(product?.burnHours ?? "");
	const [weight, setWeight] = (0, import_react.useState)(product?.weight ?? "");
	const [featured, setFeatured] = (0, import_react.useState)(product?.featured ?? false);
	const [isNew, setIsNew] = (0, import_react.useState)(product?.isNew ?? false);
	const [image, setImage] = (0, import_react.useState)(product?.image ?? "");
	const [error, setError] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		setSaving(true);
		setError(null);
		try {
			await onSave({
				id: product?.id,
				name,
				tagline,
				description,
				care,
				price: Number(price),
				stock: Number(stock),
				shape,
				scentId,
				colorId,
				notes: notes.split(",").map((n) => n.trim()).filter(Boolean),
				burnHours,
				weight,
				featured,
				isNew,
				image
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "No se pudo guardar");
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (event) => void onSubmit(event),
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nombre",
					htmlFor: "p-name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "p-name",
						value: name,
						onChange: (e) => setName(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Frase corta",
					htmlFor: "p-tag",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "p-tag",
						value: tagline,
						onChange: (e) => setTagline(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Descripción",
				htmlFor: "p-desc",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "p-desc",
					value: description,
					onChange: (e) => setDescription(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Cuidado",
				htmlFor: "p-care",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "p-care",
					value: care,
					onChange: (e) => setCare(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Precio (MXN)",
						htmlFor: "p-price",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "p-price",
							type: "number",
							min: 0,
							value: price,
							onChange: (e) => setPrice(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Stock",
						htmlFor: "p-stock",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "p-stock",
							type: "number",
							min: 0,
							value: stock,
							onChange: (e) => setStock(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Quema",
						htmlFor: "p-burn",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "p-burn",
							value: burnHours,
							onChange: (e) => setBurnHours(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Peso",
						htmlFor: "p-weight",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "p-weight",
							value: weight,
							onChange: (e) => setWeight(e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Forma",
						htmlFor: "p-shape",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "p-shape",
							className: "h-11 w-full rounded-md border border-border bg-raised px-3.5 text-sm",
							value: shape,
							onChange: (e) => setShape(e.target.value),
							children: SHAPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Aroma",
						htmlFor: "p-scent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "p-scent",
							className: "h-11 w-full rounded-md border border-border bg-raised px-3.5 text-sm",
							value: scentId,
							onChange: (e) => setScentId(e.target.value),
							children: scents.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.name
							}, item.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Color",
						htmlFor: "p-color",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "p-color",
							className: "h-11 w-full rounded-md border border-border bg-raised px-3.5 text-sm",
							value: colorId,
							onChange: (e) => setColorId(e.target.value),
							children: colors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.name
							}, item.id))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notas de aroma (separadas por coma)",
				htmlFor: "p-notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "p-notes",
					value: notes,
					onChange: (e) => setNotes(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "p-image",
					children: "Imagen"
				}),
				image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: "",
					className: "mt-2 h-40 w-32 rounded-lg object-cover bg-surface"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "p-image",
					type: "file",
					accept: "image/*",
					className: "mt-2",
					onChange: (e) => {
						const file = e.target.files?.[0];
						if (!file) return;
						readImageFile(file).then(setImage).catch((err) => setError(err.message));
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-subtle",
					children: "JPG o PNG. Se guarda con la pieza."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-6 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: featured,
						onChange: (e) => setFeatured(e.target.checked)
					}), "Destacada en inicio"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: isNew,
						onChange: (e) => setIsNew(e.target.checked)
					}), "Marcar como nueva"]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: saving,
					children: saving ? "Guardando…" : "Guardar pieza"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: onCancel,
					children: "Cancelar"
				})]
			})
		]
	});
}
function Field({ label, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		htmlFor,
		children: label
	}), children] });
}
function AdminPage() {
	const { user, isPending } = useCurrentUserState();
	const [tab, setTab] = (0, import_react.useState)("productos");
	const [products, setProducts] = (0, import_react.useState)([]);
	const [scents, setScents] = (0, import_react.useState)([]);
	const [colors, setColors] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("loading");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const refresh = (0, import_react.useCallback)(async () => {
		const data = await loadAdmin();
		setProducts(data.products);
		setScents(data.scents);
		setColors(data.colors);
		setOrders(data.orders);
		setStatus("ready");
	}, []);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		refresh().catch((error) => {
			if (error.message === "Unauthorized") setStatus("loading");
			else setStatus("forbidden");
		});
	}, [
		isPending,
		user,
		refresh
	]);
	if (isPending || user && status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-48 animate-pulse rounded-md bg-surface" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-64 animate-pulse rounded-xl bg-surface" })]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, { to: "/login" });
	if (status === "forbidden") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-md px-4 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-headline",
				children: "Entra con Google"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "La administración de Velas Ana solo se abre con una cuenta de Google. La sesión de Grok no alcanza."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleSignIn, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Volver a la tienda"
					})
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.22em] uppercase text-gold",
				children: "Atelier"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-headline",
				children: "Administración"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Productos, aromas, colores, stock, precios e imágenes. Los cambios se ven en la tienda al momento."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [
					["productos", "Productos"],
					["aromas", "Aromas"],
					["colores", "Colores"],
					["pedidos", "Pedidos"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setTab(id);
						setEditing(null);
					},
					className: cn("h-11 rounded-full px-4 text-sm", tab === id ? "bg-primary text-primary-fg" : "border border-border bg-raised text-fg"),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [
					tab === "productos" ? editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminProductForm, {
						product: editing === "new" ? null : editing,
						scents,
						colors,
						onCancel: () => setEditing(null),
						onSave: async (input) => {
							await saveProduct({ data: input });
							setEditing(null);
							await refresh();
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsTab, {
						products,
						onNew: () => setEditing("new"),
						onEdit: setEditing,
						onDelete: async (id) => {
							if (!window.confirm("¿Quitar esta pieza del catálogo?")) return;
							await deleteProduct({ data: id });
							await refresh();
						}
					}) : null,
					tab === "aromas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScentTab, {
						scents,
						onSave: async (input) => {
							await saveScent({ data: input });
							await refresh();
						},
						onDelete: async (id) => {
							await deleteScent({ data: id });
							await refresh();
						}
					}) : null,
					tab === "colores" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorTab, {
						colors,
						onSave: async (input) => {
							await saveColor({ data: input });
							await refresh();
						},
						onDelete: async (id) => {
							await deleteColor({ data: id });
							await refresh();
						}
					}) : null,
					tab === "pedidos" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersTab, { orders }) : null
				]
			})
		]
	});
}
function ProductsTab({ products, onNew, onEdit, onDelete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-title",
			children: "Piezas"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: onNew,
			children: "Nueva pieza"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-3 font-medium",
						children: "Pieza"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-3 font-medium",
						children: "Aroma"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-3 font-medium",
						children: "Color"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-3 font-medium",
						children: "Precio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-3 font-medium",
						children: "Stock"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "py-3 font-medium" })
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [product.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product.image,
								alt: "",
								className: "size-12 rounded-md object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-12 rounded-md bg-surface" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: product.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: shapeLabel(product.shape)
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-3",
						children: product.scentName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-3 rounded-full border border-border",
								style: { backgroundColor: product.colorHex }
							}), product.colorName]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-3 tabular-nums",
						children: formatPrice(product.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-3 tabular-nums",
						children: product.stock
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-3 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-primary hover:underline",
							onClick: () => onEdit(product),
							children: "Editar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ml-3 text-sm text-muted hover:text-danger",
							onClick: () => void onDelete(product.id),
							children: "Borrar"
						})]
					})
				]
			}, product.id)) })]
		})
	})] });
}
function ScentTab({ scents, onSave, onDelete }) {
	const [name, setName] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-title",
				children: "Aromas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 flex flex-col gap-3 sm:flex-row",
				onSubmit: (event) => {
					event.preventDefault();
					setError(null);
					onSave({
						id: editing?.id,
						name
					}).then(() => {
						setName("");
						setEditing(null);
					}).catch((err) => setError(err.message));
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					placeholder: editing ? "Nuevo nombre" : "Nombre del aroma",
					onChange: (e) => setName(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: editing ? "Actualizar" : "Agregar"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 divide-y divide-border border-y border-border",
				children: scents.map((scent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex h-14 items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: scent.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-primary",
							onClick: () => {
								setEditing(scent);
								setName(scent.name);
							},
							children: "Editar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-muted hover:text-danger",
							onClick: () => void onDelete(scent.id).catch((err) => setError(err.message)),
							children: "Borrar"
						})]
					})]
				}, scent.id))
			})
		]
	});
}
function ColorTab({ colors, onSave, onDelete }) {
	const [name, setName] = (0, import_react.useState)("");
	const [hex, setHex] = (0, import_react.useState)("#C9A3A8");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-title",
				children: "Colores de cera"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]",
				onSubmit: (event) => {
					event.preventDefault();
					setError(null);
					onSave({
						id: editing?.id,
						name,
						hex
					}).then(() => {
						setName("");
						setHex("#C9A3A8");
						setEditing(null);
					}).catch((err) => setError(err.message));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						placeholder: "Nombre del color",
						onChange: (e) => setName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "color",
						value: hex,
						className: "h-11 w-16 cursor-pointer p-1",
						onChange: (e) => setHex(e.target.value),
						"aria-label": "Tono"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: editing ? "Actualizar" : "Agregar"
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 divide-y divide-border border-y border-border",
				children: colors.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex h-14 items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-6 rounded-full border border-border",
							style: { backgroundColor: color.hex }
						}), color.name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-primary",
							onClick: () => {
								setEditing(color);
								setName(color.name);
								setHex(color.hex);
							},
							children: "Editar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-muted hover:text-danger",
							onClick: () => void onDelete(color.id).catch((err) => setError(err.message)),
							children: "Borrar"
						})]
					})]
				}, color.id))
			})
		]
	});
}
function OrdersTab({ orders }) {
	if (orders.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Todavía no hay pedidos."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl border border-border bg-raised p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-title",
						children: order.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm tabular-nums",
						children: formatPrice(order.total)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						order.customer.name,
						" · ",
						order.customer.email,
						" · ",
						order.customer.phone
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-subtle",
					children: order.customer.address
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-subtle",
					children: formatDate(order.createdAt)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1 text-sm",
					children: order.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						line.name,
						" × ",
						line.quantity
					] }, `${order.id}-${line.productId}`))
				})
			]
		}, order.id))
	});
}
//#endregion
export { AdminPage as component };
