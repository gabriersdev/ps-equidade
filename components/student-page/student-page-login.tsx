"use client";

import {Button, Form, FormControl, FormLabel} from "react-bootstrap";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";

export default function StudentPageLogin() {
  // @ts-ignore
  const usernameInput = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const isValidName = (name: string) => {
    return /^[a-zA-ZÀ-ÿ]+(?:\s+(?:[eE]\s+)?[a-zA-ZÀ-ÿ]+)+$/.test(name.trim());
  };
  
  const isValidDateStr = (dateStr: string) => {
    const cleanDate = dateStr.replace(/\D/g, "");
    if (cleanDate.length !== 8) return false;
    
    const day = parseInt(cleanDate.substring(0, 2), 10);
    const month = parseInt(cleanDate.substring(2, 4), 10);
    const year = parseInt(cleanDate.substring(4, 8), 10);
    
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 8) val = val.substring(0, 8);
    
    let formatted = val;
    if (val.length > 4) {
      formatted = `${val.substring(0, 2)} ${val.substring(2, 4)} ${val.substring(4)}`;
    } else if (val.length > 2) {
      formatted = `${val.substring(0, 2)} ${val.substring(2)}`;
    }
    
    setPassword(formatted);
    
    if (val.length === 8) {
      if (!isValidDateStr(formatted)) {
        setPasswordError("Insira uma data de nascimento válida.");
      } else {
        setPasswordError("");
      }
    } else {
      if (passwordError) setPasswordError("");
    }
  };
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (usernameError) setUsernameError("");
  };
  
  const handleUsernameBlur = () => {
    if (username && !isValidName(username)) {
      setUsernameError("Insira um nome e sobrenome válidos.");
    }
  };
  
  const handlePasswordBlur = () => {
    if (password && !isValidDateStr(password)) {
      setPasswordError("Insira uma data de nascimento válida.");
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setSubmitError("");
    
    let hasError = false;
    
    if (!isValidName(username)) {
      setUsernameError("Insira um nome e sobrenome válidos.");
      hasError = true;
    }
    
    if (!isValidDateStr(password)) {
      setPasswordError("Insira uma data de nascimento válida.");
      hasError = true;
    }
    
    if (hasError) return;
    
    setLoading(true);
    
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
      });
      
      if (res.ok) {
        router.push("/docs/#");
      } else {
        const data = await res.json();
        setSubmitError(data.message || "Credenciais inválidas.");
      }
    } catch (err) {
      setSubmitError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (usernameInput.current) setTimeout(() => {
      usernameInput.current?.focus();
    }, 500);
  }, []);
  
  // @ts-ignore
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <div className={"d-flex flex-column gap-3 col-lg-4 col-md-5 col-sm-8 col-12"}>
        <div>
          <FormLabel htmlFor={"student-user"}>Nome e sobrenome</FormLabel>
          <FormControl
            type="text"
            inputMode={"text"}
            placeholder="Seu nome e sobrenome"
            className={`rounded-1 ${usernameError ? 'is-invalid' : ''}`}
            id="student-user"
            value={username}
            ref={usernameInput}
            onChange={handleUsernameChange}
            onBlur={handleUsernameBlur}
            required
            disabled={loading}
            autoComplete={"off"}
          />
          
          {usernameError && (
            <span className={"text-danger text-sm d-block mt-1"}>{usernameError}</span>
          )}
        </div>
        
        <div className={"mt-1"}>
          <FormLabel htmlFor={"student-password"}>
            <span>Data de nascimento</span>
            <span className={"text-body-secondary text-sm d-block"}>Apenas números</span>
          </FormLabel>
          
          <FormControl
            type="text"
            inputMode={"numeric"}
            placeholder="00 00 0000"
            className={`rounded-1 ${passwordError ? 'is-invalid' : ''}`}
            id="student-password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            required
            disabled={loading}
            autoComplete={"off"}
          />
          
          {passwordError && (
            <span className={"text-danger text-sm d-block mt-1"}>{passwordError}</span>
          )}
        </div>
        
        <div className="d-flex flex-column gap-3 mt-2">
          <Button type="submit" className={"rounded-1 w-100"} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          
          {submitError && (
            <span className={"text-danger text-sm d-block mt-1 text-center"}>{submitError}</span>
          )}
          
          <Link href={"#0"} className={"text-center text-sm text-decoration-none text-primary"}>Não consigo entrar</Link>
        </div>
      </div>
    </Form>
  )
}
