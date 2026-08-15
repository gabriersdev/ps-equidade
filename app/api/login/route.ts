import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Função para normalizar nome e sobrenome (ex: "Paulo Silva", "PAULO SILVA" -> "paulo.silva")
const normalizeInputUsername = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .trim()
    .replace(/\s+/g, "."); // Substitui múltiplos espaços por um único ponto
};

// Função para normalizar o username vindo do .env (ignorar case, trim)
const normalizeEnvUsername = (name: string) => {
  return name.toLowerCase().trim();
};

// Função para manter apenas os números da data de nascimento (ex: "01/01/2000", "01012000" -> "01012000")
const normalizePassword = (password: string) => {
  return password.replace(/\D/g, "");
};

// Validar se o nome tem pelo menos nome e sobrenome (com ou sem 'e')
const isValidName = (name: string) => {
  return /^[a-zA-ZÀ-ÿ]+(?:\s+(?:[eE]\s+)?[a-zA-ZÀ-ÿ]+)+$/.test(name.trim());
};

// Validar se a data é real e tem 8 dígitos
const isValidDateStr = (dateStr: string) => {
  const cleanDate = normalizePassword(dateStr);
  if (cleanDate.length !== 8) return false;
  
  const day = parseInt(cleanDate.substring(0, 2), 10);
  const month = parseInt(cleanDate.substring(2, 4), 10);
  const year = parseInt(cleanDate.substring(4, 8), 10);
  
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Nome e data de nascimento são obrigatórios" },
        { status: 400 }
      );
    }

    if (!isValidName(username)) {
      return NextResponse.json(
        { success: false, message: "Insira nome e sobrenome válidos" },
        { status: 400 }
      );
    }

    if (!isValidDateStr(password)) {
      return NextResponse.json(
        { success: false, message: "Insira uma data de nascimento válida" },
        { status: 400 }
      );
    }

    const normalizedUser = normalizeInputUsername(username);
    const normalizedPass = normalizePassword(password);

    const credentials = process.env.CREDENTIALS || "";
    const users = credentials.split(";").filter(Boolean);

    for (const user of users) {
      // Formato atualizado: firstname.lastname=birthdate=id
      const [expectedUsername, expectedPassword, expectedId] = user.split("=");
      
      const envUser = normalizeEnvUsername(expectedUsername || "");
      const envPass = normalizePassword(expectedPassword || "");

      // Compara os valores normalizados com o que está no .env ignorando case/formatações extras
      if (normalizedUser === envUser && normalizedPass === envPass) {
        const cookieStore = await cookies();
        
        const cookieOptions = { 
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 7 // 1 semana
        };
        
        cookieStore.set("auth", "true", cookieOptions);
        
        // Salva o id do aluno em um cookie para posterior implementação (se existir)
        if (expectedId) {
          cookieStore.set("student_id", expectedId.trim(), cookieOptions);
        }
        
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json(
      { success: false, message: "Credenciais inválidas" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
