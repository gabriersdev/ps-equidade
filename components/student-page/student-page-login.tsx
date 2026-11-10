"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatBirthDateInput, isValidBirthDateStr, isValidStudentName } from "@/libs/student-auth-validation";
import { APPLE_REDUCED_TRANSITION, APPLE_SPRING_SNAPPY } from "@/libs/apple-motion";
import { StudentLoginField } from "@/components/student-page/student-login-field";

export default function StudentPageLogin() {
  const usernameInput = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { formatted, digits } = formatBirthDateInput(e.target.value);
    setPassword(formatted);
    if (digits.length === 8) {
      setPasswordError(isValidBirthDateStr(formatted) ? "" : "Insira uma data de nascimento válida.");
    } else if (passwordError) {
      setPasswordError("");
    }
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
    if (usernameError) setUsernameError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setSubmitError("");
    let hasError = false;
    if (!isValidStudentName(username)) {
      setUsernameError("Insira um nome e sobrenome válidos.");
      hasError = true;
    }
    if (!isValidBirthDateStr(password)) {
      setPasswordError("Insira uma data de nascimento válida.");
      hasError = true;
    }
    if (hasError) return;
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) router.push("/docs/#");
      else {
        const data = await res.json();
        setSubmitError(data.message || "Credenciais inválidas.");
      }
    } catch {
      setSubmitError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const frameId = requestAnimationFrame(() => usernameInput.current?.focus());
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex w-full max-w-sm flex-col gap-4">
        <StudentLoginField id="student-user" label="Nome e sobrenome" inputMode="text" placeholder="Seu nome e sobrenome" value={username} error={usernameError} disabled={loading} inputRef={usernameInput} onChange={handleUsernameChange} onBlur={() => { if (username && !isValidStudentName(username)) setUsernameError("Insira um nome e sobrenome válidos."); }} />
        <StudentLoginField id="student-password" label="Data de nascimento" hint="Apenas números" inputMode="numeric" placeholder="00 00 0000" value={password} error={passwordError} disabled={loading} onChange={handlePasswordChange} onBlur={() => { if (password && !isValidBirthDateStr(password)) setPasswordError("Insira uma data de nascimento válida."); }} />
        <div className="mt-1 flex flex-col gap-3">
          <button type="submit" disabled={loading} className="w-full rounded-md border border-brand-primary bg-brand-primary px-4 py-2.5 text-base font-medium text-white transition-[transform,background-color,border-color,opacity] duration-100 ease-out hover:border-brand-tertiary hover:bg-brand-tertiary active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <AnimatePresence>
            {submitError && (
              <motion.span role="alert" initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }} animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }} exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }} transition={prefersReducedMotion ? APPLE_REDUCED_TRANSITION : APPLE_SPRING_SNAPPY} className="text-small block text-center font-medium text-brand-secondary">
                {submitError}
              </motion.span>
            )}
          </AnimatePresence>
          <div className="hidden">
            <Link href="#0" className="text-small text-center text-brand-primary hover:text-brand-tertiary">Não consigo entrar</Link>
          </div>
        </div>
      </div>
    </form>
  );
}
