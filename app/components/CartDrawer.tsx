"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import {
  X,
  Minus,
  Plus,
  ArrowLeft,
  Send,
  ShoppingBag,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { CartItem, Product, UserInfo } from "../types";
import { formatPrice, calcAddonsTotal, calcTotalItems } from "../utils/format";

interface Props {
  isOpen: boolean;
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onAdd: (p: Product) => void;
  onRemove: (id: number, size?: string) => void;
  onSend: (formData: UserInfo) => void;
}

type CepStatus = "idle" | "loading" | "found" | "error";

export function CartDrawer({
  isOpen,
  cart,
  total,
  onClose,
  onAdd,
  onRemove,
  onSend,
}: Props) {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [cepStatus, setCepStatus] = useState<CepStatus>("idle");

  const {
    register,
    control,
    trigger,
    getValues,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<UserInfo>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      payment: "Pix",
      change: "",
    },
    mode: "onBlur",
  });

  const payment = watch("payment");
  const city = watch("city");
  const state = watch("state");

  const handleCepChange = async (maskedValue: string) => {
    const digits = maskedValue.replace(/\D/g, "");
    if (digits.length < 8) {
      if (cepStatus !== "idle") {
        setCepStatus("idle");
        setValue("street", "");
        setValue("neighborhood", "");
        setValue("city", "");
        setValue("state", "");
      }
      return;
    }
    setCepStatus("loading");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.erro) {
        setCepStatus("error");
        return;
      }
      setValue("street", data.logradouro ?? "");
      setValue("neighborhood", data.bairro ?? "");
      setValue("city", data.localidade ?? "");
      setValue("state", data.uf ?? "");
      setCepStatus("found");
      setTimeout(() => setFocus("number"), 50);
    } catch {
      setCepStatus("error");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setStep("cart");
      setCepStatus("idle");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.documentElement.classList.add("overflow-hidden");
    else document.documentElement.classList.remove("overflow-hidden");
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [isOpen]);

  const handleFinish = async () => {
    const valid = await trigger();
    if (!valid) return;
    onSend(getValues());
  };

  const totalItems = calcTotalItems(cart);

  const inputCls = (hasError: boolean) =>
    [
      "w-full px-3 py-2.5 bg-zinc-900 border text-zinc-100 text-sm focus:outline-none focus:ring-1 transition-colors placeholder:text-zinc-600",
      hasError
        ? "border-red-700/60 focus:ring-red-700/30"
        : "border-zinc-700 focus:ring-zinc-500/40",
    ].join(" ");

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
    >
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-zinc-950 border-l-2 border-zinc-800 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-4 h-14 border-b border-zinc-800 shrink-0">
          {step === "checkout" && (
            <button
              onClick={() => setStep("cart")}
              aria-label="Voltar ao carrinho"
              className="p-1 -ml-1 text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <ShoppingBag size={16} className="text-[#7A2215] shrink-0" />
            <h2 className="font-black uppercase tracking-tight text-zinc-100 text-sm truncate">
              {step === "cart"
                ? `Carrinho (${totalItems})`
                : "Dados de Entrega"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="p-1 -mr-1 text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 py-20 text-zinc-700">
                  <ShoppingBag size={44} strokeWidth={1} />
                  <p className="text-sm font-semibold">Carrinho vazio</p>
                </div>
              ) : (
                cart.map((item) => {
                  const itemTotal =
                    (item.price + calcAddonsTotal(item.addons)) * item.quantity;
                  return (
                    <div
                      key={`${item.id}-${item.selectedSize ?? ""}`}
                      className="flex gap-3 items-center bg-zinc-900 p-2.5 border border-zinc-800"
                    >
                      <div className="w-14 h-14 relative shrink-0 bg-zinc-800 overflow-hidden">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-[11px] uppercase tracking-tight text-zinc-100 line-clamp-1">
                          {item.name}
                        </p>
                        {item.selectedSize && (
                          <p className="text-[10px] text-zinc-500 mt-0.5">
                            Tam. {item.selectedSize}
                          </p>
                        )}
                        {item.addons.length > 0 && (
                          <p className="text-[10px] text-zinc-600 mt-0.5">
                            {item.addons.map((a) => a.name).join(" · ")}
                          </p>
                        )}
                        <p className="text-[#7A2215] text-xs font-bold mt-0.5">
                          R$ {formatPrice(itemTotal)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => onRemove(item.id, item.selectedSize)}
                          aria-label="Remover um item"
                          className="w-6 h-6 flex items-center justify-center text-zinc-500 hover:text-zinc-200 bg-zinc-800 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-5 text-center text-xs font-black text-zinc-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onAdd(item)}
                          aria-label="Adicionar mais um item"
                          className="w-6 h-6 flex items-center justify-center text-zinc-500 hover:text-zinc-200 bg-zinc-800 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-zinc-800 space-y-3 shrink-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-zinc-500 text-sm">Subtotal</span>
                  <span className="text-zinc-100 font-black text-xl">
                    R$ {formatPrice(total)}
                  </span>
                </div>
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full bg-zinc-100 text-zinc-950 py-3.5 font-black uppercase tracking-wider text-sm active:scale-95 transition-transform"
                >
                  Continuar para Entrega →
                </button>
              </div>
            )}
          </>
        )}

        {step === "checkout" && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  Nome <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: João da Silva"
                  className={inputCls(!!errors.name)}
                  {...register("name", { required: "Informe seu nome" })}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  WhatsApp <span className="text-red-600">*</span>
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Informe seu WhatsApp",
                    validate: (v) =>
                      v.replace(/\D/g, "").length === 11 ||
                      "Inclua DDD + 9 dígitos",
                  }}
                  render={({ field }) => (
                    <IMaskInput
                      mask="(00) 00000-0000"
                      placeholder="(21) 99999-9999"
                      className={inputCls(!!errors.phone)}
                      value={field.value}
                      onAccept={(v) => field.onChange(v)}
                      onBlur={field.onBlur}
                      inputMode="numeric"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  E-mail{" "}
                  <span className="font-normal normal-case text-zinc-700">
                    (opcional)
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className={inputCls(!!errors.email)}
                  {...register("email", {
                    validate: (v) =>
                      !v ||
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
                      "E-mail inválido",
                  })}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  CEP <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Controller
                    name="cep"
                    control={control}
                    rules={{
                      required: "Informe o CEP",
                      validate: (v) => {
                        if (v.replace(/\D/g, "").length !== 8)
                          return "CEP inválido";
                        if (cepStatus === "error") return "CEP não encontrado";
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <IMaskInput
                        mask="00000-000"
                        placeholder="00000-000"
                        inputMode="numeric"
                        className={inputCls(!!errors.cep)}
                        value={field.value}
                        onAccept={(v) => {
                          field.onChange(v);
                          handleCepChange(v);
                        }}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    {cepStatus === "loading" && (
                      <Loader2
                        size={14}
                        className="animate-spin text-zinc-500"
                      />
                    )}
                    {cepStatus === "found" && (
                      <CheckCircle2 size={14} className="text-green-500" />
                    )}
                    {cepStatus === "error" && (
                      <AlertCircle size={14} className="text-red-500" />
                    )}
                  </div>
                </div>
                {errors.cep && (
                  <p className="text-[11px] text-red-500">
                    {errors.cep.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  Rua / Logradouro <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Preenchido automaticamente"
                  className={inputCls(!!errors.street)}
                  {...register("street", { required: "Informe o logradouro" })}
                />
                {errors.street && (
                  <p className="text-[11px] text-red-500">
                    {errors.street.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Número <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Ex: 42"
                    className={inputCls(!!errors.number)}
                    {...register("number", { required: "Obrigatório" })}
                  />
                  {errors.number && (
                    <p className="text-[11px] text-red-500">
                      {errors.number.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Complemento
                  </label>
                  <input
                    type="text"
                    placeholder="Apto, bloco..."
                    className={inputCls(false)}
                    {...register("complement")}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  Bairro <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Preenchido automaticamente"
                  className={inputCls(!!errors.neighborhood)}
                  {...register("neighborhood", {
                    required: "Informe o bairro",
                  })}
                />
                {errors.neighborhood && (
                  <p className="text-[11px] text-red-500">
                    {errors.neighborhood.message}
                  </p>
                )}
              </div>

              {cepStatus === "found" && city && (
                <div className="flex items-center gap-2 animate-in fade-in duration-300">
                  <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                  <p className="text-[11px] text-zinc-400">
                    {city} — {state}
                  </p>
                  <input type="hidden" {...register("city")} />
                  <input type="hidden" {...register("state")} />
                </div>
              )}
              {cepStatus !== "found" && (
                <>
                  <input type="hidden" {...register("city")} />
                  <input type="hidden" {...register("state")} />
                </>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  Pagamento
                </label>
                <select
                  className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-1 ring-zinc-500/40 text-zinc-100 text-sm cursor-pointer"
                  {...register("payment", {
                    onChange: (e) => {
                      if (e.target.value !== "Dinheiro") setValue("change", "");
                    },
                  })}
                >
                  <option value="Pix">Pix</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão (Entregador)">
                    Cartão (Levar maquininha)
                  </option>
                </select>
              </div>

              {payment === "Dinheiro" && (
                <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-[10px] font-black text-[#7A2215]/80 uppercase tracking-widest">
                    Troco para quanto?
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Ex: 50 (ou deixe em branco)"
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-1 ring-zinc-500/40 text-zinc-100 text-sm placeholder:text-zinc-600"
                    {...register("change")}
                  />
                </div>
              )}

              <p className="text-[10px] text-zinc-700 pt-1">
                <span className="text-red-600">*</span> Campos obrigatórios
              </p>
            </div>

            <div className="p-4 border-t border-zinc-800 shrink-0 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-zinc-500 text-xs uppercase tracking-wider font-bold">
                  Total do pedido
                </span>
                <span className="text-zinc-100 font-black text-xl">
                  R$ {formatPrice(total)}
                </span>
              </div>
              <button
                onClick={handleFinish}
                className="w-full bg-zinc-100 text-zinc-950 py-3.5 font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                Finalizar no WhatsApp <Send size={15} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
