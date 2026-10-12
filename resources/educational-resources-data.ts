import {ResourceCardProps} from "@/components/resource-card/resource-card";

export const educationalResourcesData: ResourceCardProps[] = [
  {
    title: "Scratch",
    description: "Recursos para criar scripts em Scratch:",
    links: [
      {
        title: "Baixe o Scratch para computador - Windows",
        url: "https://www.microsoft.com/store/apps/9pfgj25jl6x3",
      },
      {
        title: "Baixe o Scratch para celular - Android",
        url: "https://play.google.com/store/apps/details?id=org.scratch",
      },
      {
        title: "Use o Scratch no seu navegador",
        url: "https://scratch.mit.edu/join",
      }
    ]
  },
  {
    title: "Robótica - Simulador de robôs",
    description: "Recursos para aprendizado e criar scripts para robótica:",
    links: [
      {
        title: "GEARSBOT - Simulador de robôs",
        url: "https://gears.aposteriori.com.sg/"
      },
      {
        title: "Manuais de montagem do LEGO EV3 - EV3 Lessons",
        url: "https://ev3lessons.com/pt/RobotDesigns.html"
      }
    ]
  },
  {
    title: "Programação em Python",
    description: "Recursos para fazer download e programar em Python!",
    links: [
      {
        title: "Baixe o Python 3.15 para Windows",
        url: "https://www.python.org/ftp/python/3.15.0/python-3.15.0-amd64.exe",
      },
      {
        title: "(Opcional) Baixe a IDE PyCharm Community Edition para Windows",
        url: "https://download.jetbrains.com/python/pycharm-2025.3.exe"
      },
      {
        title: "(Opcional) Baixe o Editor de Texto VSCodium para Windows",
        url: "https://github.com/VSCodium/vscodium/releases/download/1.135.06055/VSCodiumUserSetup-x64-1.135.06055.exe"
      }
    ]
  }
].reverse()
