import { useEffect, useMemo, useState } from "react";
import { openDB } from "idb";
import MiranteSVG from "/mirante1024.png";
import DataTable from "react-data-table-component";

const defaultItems = [
  { id: 1, name: "Chope Pilsen", type: "Bar", checked: false },
  { id: 2, name: "Chope IPA", type: "Bar", checked: false },
  { id: 3, name: "Original 600", type: "Bar", checked: false },
  { id: 4, name: "Heineken 600", type: "Bar", checked: false },
  { id: 5, name: "Long Neck Zero", type: "Bar", checked: false },
  { id: 6, name: "Coca-Cola", type: "Bar", checked: false },
  { id: 7, name: "Coca-Cola Zero", type: "Bar", checked: false },
  { id: 8, name: "Guarana", type: "Bar", checked: false },
  { id: 9, name: "Guarana Zero", type: "Bar", checked: false },
  { id: 10, name: "Suco de Laranja", type: "Bar", checked: false },
  { id: 11, name: "Suco de Uva", type: "Bar", checked: false },
  { id: 12, name: "Agua", type: "Bar", checked: false },
  { id: 13, name: "Agua Gaseificada", type: "Bar", checked: false },
  { id: 14, name: "Vinho", type: "Bar", checked: false },
  { id: 15, name: "Vinho Branco", type: "Bar", checked: false },
  { id: 16, name: "Vinho Branco Rose", type: "Bar", checked: false },
  { id: 17, name: "Espumante Brut", type: "Bar", checked: false },
  { id: 18, name: "Espumante Moscatel", type: "Bar", checked: false },
  { id: 19, name: "Espumante Demi-Sec", type: "Bar", checked: false },
  { id: 20, name: "Queijo Mussarela", type: "Cozinha", checked: false },
  { id: 21, name: "Queijo Gorgonzola", type: "Cozinha", checked: false },
  { id: 22, name: "Queijo Provolone", type: "Cozinha", checked: false },
  { id: 23, name: "Queijo Vegano", type: "Cozinha", checked: false },
  { id: 24, name: "Creme de Queijo Vegano", type: "Cozinha", checked: false },
  { id: 25, name: "Massa de Pizza", type: "Cozinha", checked: false },
  { id: 26, name: "File Mignon", type: "Cozinha", checked: false },
  { id: 27, name: "Calabresa Defumada", type: "Cozinha", checked: false },
  { id: 28, name: "Peito de Frango", type: "Cozinha", checked: false },
  { id: 29, name: "Carne de Panela", type: "Cozinha", checked: false },
  { id: 30, name: "Cebola Caramelizada", type: "Cozinha", checked: false },
  { id: 31, name: "Alface", type: "Cozinha", checked: false },
  { id: 32, name: "Tomate", type: "Cozinha", checked: false },
  { id: 33, name: "Picles", type: "Cozinha", checked: false },
  { id: 34, name: "Azeitona", type: "Cozinha", checked: false },
  { id: 35, name: "Cebola", type: "Cozinha", checked: false },
  { id: 36, name: "Ovo de Codorna", type: "Cozinha", checked: false },
  { id: 37, name: "Pao Cervejinha", type: "Cozinha", checked: false },
  { id: 38, name: "Batata", type: "Cozinha", checked: false },
  { id: 39, name: "Azeite", type: "Cozinha", checked: false },
  { id: 40, name: "Shoyu", type: "Cozinha", checked: false },
  { id: 41, name: "Molho de Tomate", type: "Cozinha", checked: false },
  { id: 42, name: "Molho de Pimenta", type: "Cozinha", checked: false },
  { id: 43, name: "Maionese", type: "Cozinha", checked: false },
  { id: 44, name: "Oregano", type: "Cozinha", checked: false },
  { id: 45, name: "Papricas", type: "Cozinha", checked: false },
  { id: 46, name: "Curry", type: "Cozinha", checked: false },
  { id: 47, name: "Conhaque de Gengibre", type: "Cozinha", checked: false },
  { id: 48, name: "Acucar", type: "Cozinha", checked: false },
  { id: 49, name: "Sal", type: "Cozinha", checked: false },
  { id: 50, name: "Sache de Ketchup", type: "ArmazAcm", checked: false },
  { id: 51, name: "Sache de Mostarda", type: "ArmazAcm", checked: false },
  { id: 52, name: "Sache de Maionese", type: "ArmazAcm", checked: false },
  { id: 53, name: "Palito de Dente", type: "ArmazAcm", checked: false },
  { id: 54, name: "Palito para Ninho", type: "ArmazAcm", checked: false },
  { id: 55, name: "Embalagem para Pizza", type: "ArmazAcm", checked: false },
  { id: 56, name: "Embalagem para Bauru", type: "ArmazAcm", checked: false },
  { id: 57, name: "Guardanapo", type: "ArmazAcm", checked: false },
  { id: 58, name: "Papel Toalha", type: "ArmazAcm", checked: false },
  { id: 59, name: "Papel Manteiga", type: "ArmazAcm", checked: false },
  { id: 60, name: "Papel Higienico", type: "ArmazAcm", checked: false },
  { id: 61, name: "Limao", type: "ArmazAcm", checked: false },
  { id: 62, name: "Morango", type: "ArmazAcm", checked: false },
  { id: 63, name: "Gelo", type: "ArmazAcm", checked: false },
  { id: 64, name: "Vodka", type: "ArmazAcm", checked: false },
  { id: 65, name: "Cachaca", type: "ArmazAcm", checked: false },
  { id: 66, name: "Creme de Leite", type: "Cozinha", checked: false },
  { id: 67, name: "Copo Plastico", type: "ArmazAcm", checked: false },
  { id: 68, name: "Leite Condensado", type: "Cozinha", checked: false },
  { id: 69, name: "Gas de Macarico", type: "Cozinha", checked: false },
  { id: 70, name: "Canudo", type: "ArmazAcm", checked: false },
  { id: 71, name: "Soda Caustica", type: "ArmazAcm", checked: false },
  { id: 72, name: "Sabao Liquido", type: "ArmazAcm", checked: false },
  { id: 73, name: "Chocolate", type: "Cozinha", checked: false },
];

const emojiMap = {
  "Chope Pilsen": "🍺",
  "Chope IPA": "🍺",
  "Original 600": "🍻",
  "Heineken 600": "🍻",
  "Long Neck Zero": "🍺",
  "Coca-Cola": "🥤",
  "Coca-Cola Zero": "🥤",
  "Guarana": "🥤🍃",
  "Guarana Zero": "🥤🍃",
  "Suco de Laranja": "🍊🥤",
  "Suco de Uva": "🍇🥤",
  "Agua": "💧",
  "Agua Gaseificada": "💧✨",
  "Vinho": "🍷",
  "Vinho Branco": "🥂",
  "Vinho Branco Rose": "🌹🥂",
  "Espumante Brut": "🍾✨",
  "Espumante Moscatel": "🍾🍇",
  "Espumante Demi-Sec": "🍾🍬",
  "Queijo Mussarela": "🧀",
  "Queijo Gorgonzola": "🧀🍄",
  "Queijo Provolone": "🧀",
  "Queijo Vegano": "🌱🧀",
  "Creme de Queijo Vegano": "🌱🥣",
  "Massa de Pizza": "🍕🫓",
  "File Mignon": "🥩",
  "Calabresa Defumada": "🌭🔥",
  "Peito de Frango": "🍗",
  "Carne de Panela": "🍲🥩",
  "Cebola Caramelizada": "🧅🍯",
  "Alface": "🥬",
  "Tomate": "🍅",
  "Picles": "🥒",
  "Azeitona": "🫒",
  "Cebola": "🧅",
  "Ovo de Codorna": "🥚",
  "Pao Cervejinha": "🥖🍺",
  "Batata": "🍟",
  "Azeite": "🫒🧴",
  "Shoyu": "🍱🧂",
  "Molho de Tomate": "🍅🧂",
  "Molho de Pimenta": "🌶️🧂",
  "Maionese": "🥫",
  "Oregano": "🌿",
  "Papricas": "🌶️🍛",
  "Curry": "🍛",
  "Conhaque de Gengibre": "🥃🫚",
  "Acucar": "🍬",
  "Sal": "🧂",
  "Sache de Ketchup": "🍅📦",
  "Sache de Mostarda": "🌭📦",
  "Sache de Maionese": "🥫📦",
  "Palito de Dente": "🪵",
  "Palito para Ninho": "🪵🐥",
  "Embalagem para Pizza": "🍕📦",
  "Embalagem para Bauru": "🥪📦",
  "Guardanapo": "🧻",
  "Papel Toalha": "🧻🧼",
  "Papel Manteiga": "🧻🍪",
  "Papel Higienico": "🧻🚽",
  "Limao": "🍋",
  "Morango": "🍓",
  "Gelo": "🧊",
  "Vodka": "🍸🇷🇺",
  "Cachaca": "🥃🇧🇷",
  "Creme de Leite": "🥛🥣",
  "Copo Plastico": "🥤🧊",
  "Leite Condensado": "🥛🍯",
  "Gas de Macarico": "🔥🧯",
  "Canudo": "🥤🪈",
  "Soda Caustica": "⚠️🧴",
  "Sabao Liquido": "🧴🫧",
  "Chocolate": "🍫",
};

const formatNameWithEmoji = (name) => {
  const emoji = emojiMap[name];
  return emoji ? `${emoji} ${name}` : name;
};

const typeLabels = {
  Bar: "Bar",
  Cozinha: "Cozinha",
  ArmazAcm: "Armazém",
  Casa: "Casa",
};

const typeBadgeClasses = {
  Bar: "bg-cyan-100/10 text-cyan-100 border border-cyan-500/40",
  Cozinha: "bg-amber-100/10 text-amber-100 border border-amber-400/40",
  ArmazAcm: "bg-indigo-100/10 text-indigo-100 border border-indigo-400/40",
  Casa: "bg-lime-100/10 text-lime-100 border border-lime-400/40",
};

const formatType = (type) => typeLabels[type] || type;

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newType, setNewType] = useState("Bar");

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installable, setInstallable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB("shoppingDB", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("items")) {
            db.createObjectStore("items", { keyPath: "id", autoIncrement: true });
          }
        },
      });
      const tx = db.transaction("items", "readwrite");
      const store = tx.objectStore("items");
      let allItems = await store.getAll();

      if (!allItems.length) {
        const seeded = defaultItems.map((item) => ({ ...item, checked: false }));
        await Promise.all(seeded.map((item) => store.add(item)));
        allItems = seeded;
      }

      setItems(allItems);
      setLoading(false);
    };
    initDB();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // Função para instalar o PWA manualmente
  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setInstallable(false);
      }
      setDeferredPrompt(null);
    }
  };

  const addItem = async () => {
    const trimmed = newItem.trim();
    if (!trimmed) return;

    const db = await openDB("shoppingDB", 1);
    const tx = db.transaction("items", "readwrite");
    const store = tx.objectStore("items");
    const id = await store.add({ name: trimmed, type: newType, checked: false });

    setItems((prev) => [...prev, { id, name: trimmed, type: newType, checked: false }]);
    setNewItem("");
  };

  const toggleCheck = async (id) => {
    const db = await openDB("shoppingDB", 1);
    const tx = db.transaction("items", "readwrite");
    const store = tx.objectStore("items");
    const item = await store.get(id);
    const updated = { ...item, checked: !item.checked };
    await store.put(updated);
    setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
  };

  const toggleAll = async (checked) => {
    const db = await openDB("shoppingDB", 1);
    const tx = db.transaction("items", "readwrite");
    const store = tx.objectStore("items");
    const allItems = await store.getAll();
    const updatedItems = allItems.map((item) => ({ ...item, checked }));

    await Promise.all(updatedItems.map((item) => store.put(item)));
    setItems(updatedItems);
  };

  const sendToWhatsApp = () => {
    const missingItems = items.filter((item) => item.checked);

    if (missingItems.length === 0) {
      alert("Selecione os itens que estão em falta antes de enviar.");
      return;
    }

    const groupedItems = missingItems.reduce((acc, item) => {
      const group = formatType(item.type);
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(formatNameWithEmoji(item.name));
      return acc;
    }, {});

    let message = "*Itens para comprar:*\n\n";
    for (const [type, products] of Object.entries(groupedItems)) {
      message += `*${type}:*\n`;
      message += products.map((product) => `- ${product}`).join("\n");
      message += "\n\n";
    }

    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message.trim())}`;
    window.open(whatsappURL, "_blank");
  };

  const resetItems = async () => {
    const db = await openDB("shoppingDB", 1);
    const tx = db.transaction("items", "readwrite");
    const store = tx.objectStore("items");

    await store.clear();
    await tx.done;

    const txAdd = db.transaction("items", "readwrite");
    const storeAdd = txAdd.objectStore("items");

    const seeded = defaultItems.map((item) => ({ ...item, checked: false }));
    for (let item of seeded) {
      await storeAdd.add(item);
    }
    await txAdd.done;

    setItems(seeded);
  };

  const selectedCount = useMemo(() => items.filter((item) => item.checked).length, [items]);
  const categoryCount = useMemo(
    () => new Set(items.map((item) => formatType(item.type))).size,
    [items]
  );

  const columns = [
    {
      name: "Produto",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "220px",
      grow: 2,
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-50">{row.name}</span>
        </div>
      ),
    },
    {
      name: "Categoria",
      selector: (row) => formatType(row.type),
      sortable: true,
      minWidth: "140px",
      maxWidth: "180px",
      cell: (row) => (
        <span
          className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            typeBadgeClasses[row.type] || "bg-slate-800 text-slate-200 border border-slate-700"
          }`}
        >
          {formatType(row.type)}
        </span>
      ),
    },
  ];

  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const customStyles = {
    table: {
      style: {
        width: "100%",
        borderRadius: 0,
        backgroundColor: "transparent",
        overflow: "hidden",
      },
    },
    rows: {
      style: {
        minHeight: "60px",
        backgroundColor: "transparent",
        color: "#e2e8f0",
        fontSize: "15px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        cursor: "pointer",
        userSelect: "none",
      },
      highlightOnHoverStyle: {
        backgroundColor: "rgba(255,255,255,0.06)",
        color: "#e2e8f0",
      },
    },
    headCells: {
      style: {
        backgroundColor: "rgba(255,255,255,0.05)",
        color: "#0f172a",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderBottom: "2px solid rgba(255,255,255,0.12)",
        userSelect: "none",
      },
    },
    pagination: {
      style: {
        borderRadius: 0,
        overflow: "hidden",
        backgroundColor: "transparent",
        color: "#ffffff",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      },
      pageButtonsStyle: {
        color: "#ffffff",
        fill: "#ffffff",
        backgroundColor: "transparent",
        borderRadius: 0,
        stroke: "#ffffff",
        "& svg": {
          fill: "#ffffff",
          stroke: "#ffffff",
        },
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.08)",
        },
        "&:disabled": {
          opacity: 0.35,
          color: "#ffffff",
          fill: "#ffffff",
          stroke: "#ffffff",
        },
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.checked,
      style: {
        backgroundColor: "rgba(16, 185, 129, 0.25)",
        color: "#ecfdf3",
      },
    },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 relative overflow-x-hidden">
      <main className="relative w-full px-2 sm:px-4 py-6">
        <div className="w-full border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-xl flex flex-col gap-8 p-4 sm:p-6">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <img src={MiranteSVG} alt="Mirante-Logo" className="h-14 w-14 bg-white/5 p-2 shadow-inner" />
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.3em] text-emerald-300">Mirante</span>
                <h1 className="text-2xl sm:text-3xl font-semibold leading-tight text-white">Lista de Compras</h1>
                <p className="text-sm text-slate-400">
                  Clique sobre o item para marcar/desmarcar. Selecione o que está em falta e envie pelo WhatsApp.
                </p>
              </div>
            </div>
            {installable && (
              <button
                onClick={installPWA}
                className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-emerald-500/40"
              >
                Instalar app
              </button>
            )}
          </header>

          <section className="grid gap-3 sm:grid-cols-3 w-full">
            <div className="border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Selecionados</p>
              <p className="text-3xl font-semibold text-emerald-300">{selectedCount}</p>
              <p className="text-xs text-slate-500">Itens marcados para comprar</p>
            </div>
            <div className="border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Itens</p>
              <p className="text-3xl font-semibold text-white">{items.length}</p>
              <p className="text-xs text-slate-500">Total cadastrado no app</p>
            </div>
            <div className="border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Setores</p>
              <p className="text-3xl font-semibold text-white">{categoryCount}</p>
              <p className="text-xs text-slate-500">Categorias diferentes</p>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[2fr_1fr] w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem();
              }}
              className="flex flex-col gap-3 border border-white/10 bg-white/5 p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="text"
                  placeholder="Nome do produto"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
                />
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full border border-white/10 bg-slate-950/60 px-3 py-3 text-sm text-white outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30 sm:w-48"
                >
                  <option value="Bar">Bar</option>
                  <option value="Cozinha">Cozinha</option>
                  <option value="ArmazAcm">Armazém</option>
                  <option value="Casa">Casa</option>
                </select>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="w-full rounded-md bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-emerald-500/40 sm:w-48"
                >
                  Adicionar item
                </button>
                <p className="text-xs text-slate-500">
                  Dica: selecione apenas o que está em falta. O WhatsApp envia somente os itens selecionados.
                </p>
              </div>
            </form>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => toggleAll(true)}
                type="button"
                className="rounded-md border border-emerald-400/60 bg-emerald-500/20 px-3 py-3 text-sm font-semibold text-emerald-200 transition hover:-translate-y-0.5 hover:border-emerald-400/80 hover:bg-emerald-500/30"
              >
                Selecionar todos
              </button>
              <button
                onClick={() => toggleAll(false)}
                type="button"
                className="rounded-md border border-white/20 bg-white/10 px-3 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15"
              >
                Limpar seleção
              </button>
              <button
                onClick={resetItems}
                type="button"
                className="col-span-2 rounded-md border border-red-500/60 bg-red-500/15 px-3 py-3 text-sm font-semibold text-red-100 transition hover:-translate-y-0.5 hover:border-red-400 hover:bg-red-500/25"
              >
                Resetar banco de dados
              </button>
            </div>
          </section>

          <section className="border border-white/10 bg-slate-950/70 p-3 w-full">
            <DataTable
              className="w-full"
              customStyles={customStyles}
              columns={columns}
              data={items}
              pagination
              paginationComponentOptions={paginationOptions}
              conditionalRowStyles={conditionalRowStyles}
              highlightOnHover
              pointerOnHover
              onRowClicked={(row) => toggleCheck(row.id)}
              progressPending={loading}
              progressComponent={<div className="py-6 text-center text-slate-400">Carregando itens...</div>}
              noDataComponent={<div className="py-6 text-center text-slate-400">Nenhum item cadastrado.</div>}
            />
          </section>

          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 w-full">
            <button
              onClick={sendToWhatsApp}
              type="button"
              className="rounded-md border border-emerald-400/60 bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/40 transition hover:-translate-y-0.5 hover:shadow-emerald-500/60"
            >
              Enviar itens selecionados pelo WhatsApp
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              type="button"
              className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15"
            >
              Voltar ao topo
            </button>
            {!installable && (
              <div className="hidden lg:block border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                Dica: adicione o app à tela inicial para usar offline como PWA.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
